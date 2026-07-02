import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../utils/api'
import './Dashboard.css'

const Dashboard = ({ onNavigate }) => {
  const { user } = useAuth()
  const [reports, setReports]         = useState([])
  const [appointments, setAppointments] = useState([])
  const [health, setHealth]           = useState([])
  const [loading, setLoading]         = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/reports'),
      api.get('/appointments'),
      api.get('/health-records'),
    ]).then(([r, a, h]) => {
      setReports(r.reports || [])
      setAppointments(a.appointments || [])
      setHealth(h.records || [])
    }).catch(console.error).finally(() => setLoading(false))
  }, [])

  const startOfToday = new Date(); startOfToday.setHours(0,0,0,0)
  const upcoming   = appointments.filter(a => a.status === 'upcoming' && new Date(a.date) >= startOfToday)
  const latestBP   = health.find(r => r.type === 'blood_pressure')
  const latestSugar = health.find(r => r.type === 'blood_sugar')

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const dayLabel = (dateStr) => {
    const d = new Date(dateStr)
    const today    = new Date(); today.setHours(0,0,0,0)
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate()+1)
    d.setHours(0,0,0,0)
    if (d.getTime() === today.getTime())    return 'today'
    if (d.getTime() === tomorrow.getTime()) return 'tomorrow'
    return null
  }

  if (loading) return (
    <div className="page-loading">
      <div className="loader"></div>
    </div>
  )

  return (
    <div className="dashboard">
      <div className="dash-header">
        <div>
          <h1>{greeting()}, {user?.name?.split(' ')[0]}</h1>
          <p>Here's your health overview</p>
        </div>
        <span className="dash-date">
          {new Date().toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' })}
        </span>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card purple" onClick={() => onNavigate('reports')}>
          <i className="bx bxs-report"></i>
          <div>
            <p className="stat-val">{reports.length}</p>
            <p className="stat-lbl">Medical Reports</p>
          </div>
        </div>
        <div className="stat-card blue" onClick={() => onNavigate('appointments')}>
          <i className="bx bx-calendar"></i>
          <div>
            <p className="stat-val">{upcoming.length}</p>
            <p className="stat-lbl">Upcoming Appointments</p>
          </div>
        </div>
        <div className="stat-card green" onClick={() => onNavigate('health')}>
          <i className="bx bx-heart-circle"></i>
          <div>
            <p className="stat-val">{latestBP ? latestBP.value : '—'}</p>
            <p className="stat-lbl">Blood Pressure (mmHg)</p>
          </div>
        </div>
        <div className="stat-card orange" onClick={() => onNavigate('health')}>
          <i className="bx bx-droplet"></i>
          <div>
            <p className="stat-val">{latestSugar ? latestSugar.value : '—'}</p>
            <p className="stat-lbl">Blood Sugar (mg/dL)</p>
          </div>
        </div>
      </div>

      <div className="dash-grid">
        {/* Recent Reports */}
        <div className="dash-card">
          <div className="card-head">
            <h3><i className="bx bxs-report"></i> Recent Reports</h3>
            <button onClick={() => onNavigate('reports')}>View all</button>
          </div>
          {reports.length === 0 ? (
            <div className="empty">
              <i className="bx bx-folder-open"></i>
              <p>No reports yet</p>
              <button onClick={() => onNavigate('reports')}>Add your first report</button>
            </div>
          ) : (
            <ul className="item-list">
              {reports.slice(0,4).map(r => (
                <li key={r._id}>
                  <i className="bx bx-file"></i>
                  <div>
                    <p className="item-title">{r.fileName}</p>
                    <p className="item-sub">{r.reportType} · {new Date(r.reportDate).toLocaleDateString()}</p>
                  </div>
                  <span className="badge purple">{r.reportType}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Upcoming Appointments */}
        <div className="dash-card">
          <div className="card-head">
            <h3><i className="bx bx-calendar"></i> Appointments</h3>
            <button onClick={() => onNavigate('appointments')}>View all</button>
          </div>
          {upcoming.length === 0 ? (
            <div className="empty">
              <i className="bx bx-calendar-x"></i>
              <p>No upcoming appointments</p>
              <button onClick={() => onNavigate('appointments')}>Schedule one</button>
            </div>
          ) : (
            <ul className="item-list">
              {upcoming.slice(0,4).map(a => {
                const tag = dayLabel(a.date)
                return (
                  <li key={a._id}>
                    <i className="bx bx-calendar-check"></i>
                    <div>
                      <p className="item-title">{a.title}</p>
                      <p className="item-sub">
                        {a.doctorName && `Dr. ${a.doctorName} · `}
                        {new Date(a.date).toLocaleDateString()}
                      </p>
                    </div>
                    {tag && <span className={`badge ${tag}`}>{tag}</span>}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-row">
          <button onClick={() => onNavigate('reports')}><i className="bx bx-upload"></i> Add Report</button>
          <button onClick={() => onNavigate('appointments')}><i className="bx bx-calendar-plus"></i> Book Appointment</button>
          <button onClick={() => onNavigate('health')}><i className="bx bx-plus-circle"></i> Log Vitals</button>
          <button onClick={() => onNavigate('chat')}><i className="bx bx-bot"></i> Chat with AI</button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
