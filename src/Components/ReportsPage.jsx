import React, { useState, useEffect } from 'react'
import { api } from '../utils/api'
import './FeaturePages.css'

const TYPES = ['General','Blood Test','X-Ray','MRI','CT Scan','ECG','Urine Test','Other']

const ReportsPage = () => {
  const [reports, setReports]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving]     = useState(false)
  const [form, setForm]         = useState({ fileName:'', reportType:'General', reportDate:'', notes:'' })

  useEffect(() => {
    api.get('/reports')
      .then(d => setReports(d.reports || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const data = await api.post('/reports', form)
      setReports(prev => [data.report, ...prev])
      setForm({ fileName:'', reportType:'General', reportDate:'', notes:'' })
      setShowForm(false)
    } catch (err) { alert(err.message) }
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this report?')) return
    await api.delete(`/reports/${id}`)
    setReports(prev => prev.filter(r => r._id !== id))
  }

  if (loading) return <div className="page-loading"><div className="loader"></div></div>

  return (
    <div className="feature-page">
      <div className="page-header">
        <div>
          <h1><i className="bx bxs-report"></i> Medical Reports</h1>
          <p>Store and manage all your medical documents</p>
        </div>
        <button className="btn-primary-action" onClick={() => setShowForm(!showForm)}>
          <i className={`bx ${showForm ? 'bx-x' : 'bx-plus'}`}></i>
          {showForm ? 'Cancel' : 'Add Report'}
        </button>
      </div>

      {showForm && (
        <form className="feature-form" onSubmit={handleAdd}>
          <h3>Add New Report</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Report / File Name *</label>
              <input type="text" placeholder="e.g. Blood Test April 2025" required
                value={form.fileName} onChange={e => setForm({...form, fileName: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Report Type</label>
              <select value={form.reportType} onChange={e => setForm({...form, reportType: e.target.value})}>
                {TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Report Date</label>
              <input type="date" value={form.reportDate} onChange={e => setForm({...form, reportDate: e.target.value})} />
            </div>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea rows={3} placeholder="Any notes about this report..."
              value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
          </div>
          <button type="submit" className="btn-submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Report'}
          </button>
        </form>
      )}

      {reports.length === 0 ? (
        <div className="empty-page">
          <i className="bx bx-folder-open"></i>
          <h3>No reports yet</h3>
          <p>Add your first medical report using the button above</p>
        </div>
      ) : (
        <div className="cards-grid">
          {reports.map(r => (
            <div key={r._id} className="report-card">
              <div className="report-icon"><i className="bx bxs-report"></i></div>
              <div className="report-body">
                <h4>{r.fileName}</h4>
                <p>{new Date(r.reportDate).toLocaleDateString()}</p>
                {r.notes && <p className="report-notes">{r.notes}</p>}
              </div>
              <div className="report-footer">
                <span className="type-badge">{r.reportType}</span>
                <button className="btn-delete" onClick={() => handleDelete(r._id)}>
                  <i className="bx bx-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ReportsPage
