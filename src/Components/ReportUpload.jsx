import React, { useState } from 'react'
import './ReportUpload.css'

const ReportUpload = ({ onReportUploaded, reports }) => {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      await uploadFile(files[0])
    }
  }

  const handleChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      await uploadFile(e.target.files[0])
    }
  }

  const uploadFile = async (file) => {
    try {
      setUploading(true)
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock: Create new report
      const newReport = {
        _id: Date.now().toString(),
        fileName: file.name,
        uploadedAt: new Date(),
        processingStatus: 'processing',
        fileSize: file.size
      }

      onReportUploaded(newReport)
      alert('Report uploaded! Processing started...')

      // Simulate processing completion
      setTimeout(() => {
        onReportUploaded({ ...newReport, processingStatus: 'completed' })
      }, 3000)
    } catch (error) {
      alert('Upload failed: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="report-upload">
      <div
        className={`drop-zone ${dragActive ? 'active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {uploading ? (
          <p>Uploading...</p>
        ) : (
          <>
            <i className="bx bx-cloud-upload"></i>
            <p>Drag & drop your medical report here</p>
            <p className="small">or</p>
            <label className="file-label">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleChange}
                disabled={uploading}
              />
              Browse Files
            </label>
          </>
        )}
      </div>

      {reports && reports.length > 0 && (
        <div className="reports-list">
          <h3>Your Reports</h3>
          {reports.map((report) => (
            <div key={report._id} className="report-item">
              <div className="report-info">
                <h4>{report.fileName}</h4>
                <p>{new Date(report.uploadedAt).toLocaleDateString()}</p>
                <span className={`status ${report.processingStatus}`}>
                  {report.processingStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ReportUpload
