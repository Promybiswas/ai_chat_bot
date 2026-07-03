import React, { useState, useEffect, useRef } from 'react'
import ReportUpload from './ReportUpload'
import { api } from '../utils/api'
import './ChatWithReports.css'

const ChatWithReports = ({ onGoBack }) => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [reports, setReports] = useState([])
  const [showUpload, setShowUpload] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load the user's real reports from the backend
  useEffect(() => {
    api.get('/reports')
      .then(d => setReports(d.reports || []))
      .catch(console.error)
  }, [])

  const handleAddReport = (newReport) => {
    setReports(prev => {
      const existing = prev.find(r => r._id === newReport._id)
      if (existing) {
        return prev.map(r => r._id === newReport._id ? newReport : r)
      }
      return [newReport, ...prev]
    })
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input
    setInput('')
    const priorMessages = messages
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }])
    setLoading(true)

    try {
      const data = await api.post('/chat', {
        message: userMessage,
        history: priorMessages.map(m => ({ role: m.role, content: m.content }))
      })
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.reply,
        sources: data.sources,
        timestamp: new Date()
      }])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `⚠️ ${err.message}`,
        timestamp: new Date()
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chat-with-reports">
      <div className="reports-sidebar">
        <div className="reports-sidebar-header">
          <h2>Medical Reports</h2>
          <button
            className="btn-add"
            onClick={() => setShowUpload(!showUpload)}
            title={showUpload ? 'Hide upload' : 'Add report'}
          >
            <i className="bx bx-plus"></i>
          </button>
        </div>

        {showUpload && (
          <ReportUpload
            onReportUploaded={handleAddReport}
            reports={reports}
          />
        )}

        {!showUpload && reports.length > 0 && (
          <div className="reports-quick-list">
            {reports.map(report => (
              <div key={report._id} className="report-quick-item">
                <i className="bx bxs-report"></i>
                <div>
                  <p className="name">{report.fileName}</p>
                  <p className="date">
                    {new Date(report.reportDate || report.createdAt).toLocaleDateString()}
                  </p>
                  <span className="status-badge" style={{ background: '#ede9fe', color: '#6d28d9' }}>
                    {report.reportType}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {reports.length === 0 && !showUpload && (
          <div className="no-reports">
            <p>No reports yet. Click + to upload one.</p>
          </div>
        )}
      </div>

      <div className="chat-area">
        <div className="chat-header">
          <h3>Chat with AI Doctor</h3>
          <button className="btn-back" onClick={onGoBack}>
            <i className="bx bx-arrow-back"></i> Back
          </button>
        </div>

        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="empty-state">
              <i className="bx bx-chat"></i>
              <p>Ask me anything about your medical reports!</p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <div className="message-bubble">
                  <div className="message-content">
                    {msg.content}
                  </div>
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="sources">
                      <small><strong>📋 Sources:</strong> {msg.sources.length} document(s)</small>
                    </div>
                  )}
                  <small className="timestamp">
                    {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </small>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="message assistant">
              <div className="message-bubble">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-area" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Ask about your medical reports..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading || !input.trim()}>
            <i className="bx bx-send"></i>
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatWithReports
