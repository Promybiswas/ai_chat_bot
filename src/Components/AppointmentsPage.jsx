import React, { useState, useEffect } from 'react'
import { api } from '../utils/api'
import './FeaturePages.css'

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading]   = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving]     = useState(false)
  const [form, setForm]         = useState({ title:'', doctorName:'', location:'', date:'', notes:'' })

  useEffect(() => {
    api.get('/appointments')
      .then(d => setAppointments(d.appointments || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const data = await api.post('/appointments', form)
      setAppointments(prev => [...prev, data.appointment].sort((a,b) => new Date(a.date)-new Date(b.date)))
      setForm({ title:'', doctorName:'', location:'', date:'', notes:'' })
      setShowForm(false)
    } catch (err) { alert(err.message) }
    finally { setSaving(false) }
  }

  const updateStatus = async (id, status) => {
    const data = await api.put(`/appointments/${id}`, { status })
    setAppointments(prev => prev.map(a => a._id === id ? data.appointment : a))
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this appointment?')) return
    await api.delete(`/appointments/${id}`)
    setAppointments(prev => prev.filter(a => a._id !== id))
  }

  const dayTag = (dateStr) => {
    const d = new Date(dateStr); d.setHours(0,0,0,0)
    const today = new Date(); today.setHours(0,0,0,0)
    const tom = new Date(today); tom.setDate(today.getDate()+1)
    if (d.getTime() === today.getTime()) return 'Today'
    if (d.getTime() === tom.getTime())   return 'Tomorrow'
    return null
  }

  if (loading) return <div className="page-loading"><div className="loader"></div></div>

  return (
    <div className="feature-page">
      <div className="page-header">
        <div>
          <h1><i className="bx bx-calendar"></i> Appointments</h1>
          <p>Schedule and track your doctor visits</p>
        </div>
        <button className="btn-primary-action" onClick={() => setShowForm(!showForm)}>
          <i className={`bx ${showForm ? 'bx-x' : 'bx-plus'}`}></i>
          {showForm ? 'Cancel' : 'Add Appointment'}
        </button>
      </div>

      {showForm && (
        <form className="feature-form" onSubmit={handleAdd}>
          <h3>New Appointment</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Title *</label>
              <input type="text" placeholder="e.g. Annual Checkup" required
                value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Doctor Name</label>
              <input type="text" placeholder="Dr. Smith"
                value={form.doctorName} onChange={e => setForm({...form, doctorName: e.target.value})} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date *</label>
              <input type="datetime-local" required
                value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Location / Hospital</label>
              <input type="text" placeholder="City Hospital, Room 3"
                value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
            </div>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea rows={2} placeholder="Any notes..."
              value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
          </div>
          <button type="submit" className="btn-submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Appointment'}
          </button>
        </form>
      )}

      {appointments.length === 0 ? (
        <div className="empty-page">
          <i className="bx bx-calendar-x"></i>
          <h3>No appointments yet</h3>
          <p>Schedule your first appointment using the button above</p>
        </div>
      ) : (
        <div className="appt-list">
          {appointments.map(a => {
            const tag  = dayTag(a.date)
            const past = new Date(a.date) < new Date() && a.status === 'upcoming'
            return (
              <div key={a._id} className={`appt-card ${a.status}`}>
                <div className="appt-date-col">
                  <p className="appt-day">{new Date(a.date).toLocaleDateString('en-US',{month:'short',day:'numeric'})}</p>
                  <p className="appt-time">{new Date(a.date).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</p>
                </div>
                <div className="appt-body">
                  <div className="appt-title-row">
                    <h4>{a.title}</h4>
                    {tag && <span className="day-tag">{tag}</span>}
                    {past && <span className="day-tag overdue">Overdue</span>}
                  </div>
                  {a.doctorName && <p><i className="bx bx-user-md"></i> Dr. {a.doctorName}</p>}
                  {a.location   && <p><i className="bx bx-map-pin"></i> {a.location}</p>}
                  {a.notes      && <p className="appt-notes">{a.notes}</p>}
                </div>
                <div className="appt-actions">
                  <span className={`status-pill ${a.status}`}>{a.status}</span>
                  {a.status === 'upcoming' && (
                    <button onClick={() => updateStatus(a._id,'completed')} title="Mark completed">
                      <i className="bx bx-check-circle"></i>
                    </button>
                  )}
                  <button className="del" onClick={() => handleDelete(a._id)} title="Delete">
                    <i className="bx bx-trash"></i>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default AppointmentsPage
