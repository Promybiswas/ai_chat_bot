const express = require('express')
const router  = express.Router()
const fs      = require('fs')
const path    = require('path')
const multer  = require('multer')
const pdfParse = require('pdf-parse')
const Report  = require('../models/Report')
const auth    = require('../middleware/auth')

// Keep uploaded files in memory so we can extract text, then write to disk
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
})

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads')

router.get('/', auth, async (req, res) => {
  try {
    // Don't ship the (potentially large) extracted text to the list view
    const reports = await Report.find({ userId: req.userId }).sort({ createdAt: -1 }).select('-extractedText')
    res.json({ reports })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.post('/', auth, async (req, res) => {
  try {
    const { fileName, reportType, notes, reportDate } = req.body
    if (!fileName) return res.status(400).json({ error: 'File name is required' })
    const report = await Report.create({ userId: req.userId, fileName, reportType, notes, reportDate })
    res.status(201).json({ report })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

// POST /api/reports/upload — real file upload with PDF text extraction
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
    const { originalname, mimetype, buffer, size } = req.file
    const { reportType, notes, reportDate } = req.body

    // Extract text from PDFs so the AI can read the contents
    let extractedText = ''
    if (mimetype === 'application/pdf') {
      try {
        const data = await pdfParse(buffer)
        extractedText = (data.text || '').trim().slice(0, 20000)
      } catch (e) {
        console.error('PDF parse failed:', e.message)
      }
    }

    // Persist the original file to disk
    if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true })
    const safeName = `${Date.now()}-${originalname.replace(/[^a-zA-Z0-9._-]/g, '_')}`
    fs.writeFileSync(path.join(UPLOAD_DIR, safeName), buffer)

    const report = await Report.create({
      userId: req.userId,
      fileName: originalname,
      reportType: reportType || 'General',
      notes: notes || '',
      reportDate: reportDate || Date.now(),
      extractedText,
      fileSize: size,
      storedFileName: safeName,
      mimeType: mimetype,
    })

    // Send back the report without the bulky text
    const { extractedText: _omit, ...safe } = report.toObject()
    res.status(201).json({ report: safe })
  } catch (err) {
    console.error('Upload error:', err.message)
    res.status(500).json({ error: 'Upload failed' })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    const report = await Report.findOneAndDelete({ _id: req.params.id, userId: req.userId })
    if (!report) return res.status(404).json({ error: 'Not found' })
    res.json({ message: 'Deleted' })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

module.exports = router
