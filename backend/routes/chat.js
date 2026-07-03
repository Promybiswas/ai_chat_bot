const express   = require('express')
const router    = express.Router()
const fs        = require('fs')
const path      = require('path')
const Anthropic = require('@anthropic-ai/sdk')
const Report    = require('../models/Report')
const auth      = require('../middleware/auth')

const MODEL = 'claude-sonnet-4-6'
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads')

const SYSTEM_PROMPT = `You are CareChat, a medical assistant that helps users understand their own medical reports.

Style:
- Write in a clear, professional, conversational tone — like a knowledgeable clinician explaining things plainly.
- Be concise. Answer the question directly first, then add only the context that matters.
- Use normal prose. Avoid emojis, decorative headers, and excessive bullet points or tables. Use a short list only when it genuinely aids clarity (e.g. listing several values).
- Do not pad responses with filler, restated questions, or long disclaimers.

Substance:
- Explain medical terms in plain language a non-expert can understand.
- Base your answers on the user's report data provided below (and any attached files). If the reports don't contain the answer, say so briefly.
- You are not a doctor. When giving interpretation, include a brief, one-line reminder to confirm with a healthcare provider — not a long disclaimer every time.`

// Text summary of the reports. Reports whose text was extracted are included
// inline; reports without text are attached as files (see attachReportFiles).
const buildReportContext = (reports) => {
  if (!reports.length) {
    return 'The user has not uploaded any medical reports yet.'
  }
  const blocks = reports.map((r, i) => {
    const date = r.reportDate ? new Date(r.reportDate).toLocaleDateString() : 'unknown date'
    let block = `Report ${i + 1}: "${r.fileName}" (type: ${r.reportType}, date: ${date})`
    if (r.notes) block += `\nNotes: ${r.notes}`
    if (r.extractedText) {
      block += `\nContents:\n${r.extractedText}`
    } else {
      block += `\n(This file's text could not be extracted — the file itself is attached below for you to read.)`
    }
    return block
  })
  return `The user's medical reports on file:\n\n${blocks.join('\n\n---\n\n')}`
}

// For reports without extracted text, attach the actual file so Claude can read
// it visually (handles scanned PDFs and images). Returns an array of content blocks.
const attachReportFiles = (reports) => {
  const blocks = []
  for (const r of reports) {
    if (r.extractedText || !r.storedFileName) continue
    const filePath = path.join(UPLOAD_DIR, r.storedFileName)
    if (!fs.existsSync(filePath)) continue
    try {
      const base64 = fs.readFileSync(filePath).toString('base64')
      if (r.mimeType === 'application/pdf') {
        blocks.push({ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: base64 } })
      } else if (r.mimeType && r.mimeType.startsWith('image/')) {
        blocks.push({ type: 'image', source: { type: 'base64', media_type: r.mimeType, data: base64 } })
      }
    } catch (e) {
      console.error(`Could not attach ${r.fileName}:`, e.message)
    }
  }
  return blocks
}

// POST /api/chat  — send a message, get an AI reply
router.post('/', auth, async (req, res) => {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(503).json({ error: 'AI is not configured. Add ANTHROPIC_API_KEY to the backend .env file.' })
    }

    const { message, history = [] } = req.body
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' })
    }

    const reports = await Report.find({ userId: req.userId }).sort({ createdAt: -1 })
    const reportContext = buildReportContext(reports)

    // Map prior conversation into the API format (only user/assistant text turns)
    const priorMessages = history
      .filter(m => (m.role === 'user' || m.role === 'assistant') && m.content)
      .map(m => ({ role: m.role, content: String(m.content) }))

    // Current turn: the user's text plus any non-text report files for Claude to read
    const currentContent = [
      { type: 'text', text: message },
      ...attachReportFiles(reports),
    ]

    const messages = [
      ...priorMessages,
      { role: 'user', content: currentContent },
    ]

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: `${SYSTEM_PROMPT}\n\n${reportContext}`,
      messages,
    })

    const reply = response.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n')

    res.json({
      reply,
      sources: reports.map(r => r._id),
    })
  } catch (err) {
    console.error('Chat error:', err.message)
    res.status(500).json({ error: 'Failed to get AI response' })
  }
})

module.exports = router
