import React, { useState, useEffect } from 'react'
import { api } from '../utils/api'
import './FeaturePages.css'

const METRICS = {
  blood_pressure: { label: 'Blood Pressure', unit: 'mmHg', placeholder: '120/80', icon: 'bx-heart-circle' },
  blood_sugar:    { label: 'Blood Sugar',    unit: 'mg/dL', placeholder: '98',    icon: 'bx-droplet'      },
  weight:         { label: 'Weight',         unit: 'kg',    placeholder: '70.5',  icon: 'bx-body'         },
  heart_rate:     { label: 'Heart Rate',     unit: 'bpm',   placeholder: '72',    icon: 'bx-pulse'        },
  temperature:    { label: 'Temperature',    unit: '°F',    placeholder: '98.6',  icon: 'bx-thermometer'  },
  oxygen_level:   { label: 'Oxygen Level',   unit: '%',     placeholder: '98',    icon: 'bx-wind'         },
}

const getStatus = (type, value) => {
  const v = parseFloat(value)
  if (isNaN(v)) return null
  if (type === 'blood_pressure') {
    const [sys, dia] = value.split('/').map(Number)
    if (!sys || !dia) return null
    if (sys < 120 && dia < 80) return { label: 'Normal',   color: 'green'  }
    if (sys < 130 && dia < 80) return { label: 'Elevated', color: 'yellow' }
    return                            { label: 'High',      color: 'red'    }
  }
  if (type === 'blood_sugar') {
    if (v < 100) return { label: 'Normal',      color: 'green'  }
    if (v < 126) return { label: 'Pre-diabetic', color: 'yellow' }
    return               { label: 'High',         color: 'red'    }
  }
  if (type === 'heart_rate') {
    if (v < 60)  return { label: 'Low',    color: 'yellow' }
    if (v <= 100) return { label: 'Normal', color: 'green'  }
    return               { label: 'High',   color: 'red'    }
  }
  if (type === 'oxygen_level') {
    if (v >= 95) return { label: 'Normal', color: 'green'  }
    return               { label: 'Low',   color: 'red'    }
  }
  return null
}

const HealthTracker = () => {
  const [records, setRecords]     = useState([])
  const [loading, setLoading]     = useState(true)
  const [activeType, setActiveType] = useState('blood_pressure')
  const [value, setValue]         = useState('')
  const [notes, setNotes]         = useState('')
  const [saving, setSaving]       = useState(false)

  useEffect(() => {
    api.get('/health-records')
      .then(d => setRecords(d.records || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleLog = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const data = await api.post('/health-records', { type: activeType, value, notes })
      setRecords(prev => [data.record, ...prev])
      setValue(''); setNotes('')
    } catch (err) { alert(err.message) }
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    await api.delete(`/health-records/${id}`)
    setRecords(prev => prev.filter(r => r._id !== id))
  }

  const filtered = records.filter(r => r.type === activeType)
  const meta     = METRICS[activeType]

  if (loading) return <div className="page-loading"><div className="loader"></div></div>

  return (
    <div className="feature-page">
      <div className="page-header">
        <div>
          <h1><i className="bx bx-heart-circle"></i> Health Tracker</h1>
          <p>Log and monitor your vitals over time</p>
        </div>
      </div>

      {/* Metric tabs */}
      <div className="metric-tabs">
        {Object.entries(METRICS).map(([key, m]) => (
          <button
            key={key}
            className={`metric-tab ${activeType === key ? 'active' : ''}`}
            onClick={() => { setActiveType(key); setValue('') }}
          >
            <i className={`bx ${m.icon}`}></i>
            {m.label}
          </button>
        ))}
      </div>

      {/* Log form */}
      <form className="log-form" onSubmit={handleLog}>
        <div className="log-input-row">
          <div className="log-input-wrap">
            <input
              type="text"
              placeholder={`Enter ${meta.label} (e.g. ${meta.placeholder})`}
              value={value}
              onChange={e => setValue(e.target.value)}
              required
            />
            <span className="unit-badge">{meta.unit}</span>
          </div>
          <input type="text" placeholder="Notes (optional)"
            value={notes} onChange={e => setNotes(e.target.value)} className="notes-input" />
          <button type="submit" className="btn-log" disabled={saving}>
            {saving ? 'Saving...' : <><i className="bx bx-plus"></i> Log</>}
          </button>
        </div>
      </form>

      {/* History */}
      {filtered.length === 0 ? (
        <div className="empty-page">
          <i className={`bx ${meta.icon}`}></i>
          <h3>No {meta.label} readings yet</h3>
          <p>Log your first reading above</p>
        </div>
      ) : (
        <div className="health-list">
          <h3 className="list-title">Recent {meta.label} Readings</h3>
          {filtered.map(r => {
            const status = getStatus(r.type, r.value)
            return (
              <div key={r._id} className="health-row">
                <div className="health-val-wrap">
                  <span className="health-val">{r.value}</span>
                  <span className="health-unit">{r.unit}</span>
                  {status && <span className={`status-dot ${status.color}`}>{status.label}</span>}
                </div>
                <div className="health-meta">
                  <span>{new Date(r.recordedAt).toLocaleDateString()} {new Date(r.recordedAt).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</span>
                  {r.notes && <span className="health-notes">{r.notes}</span>}
                </div>
                <button className="btn-delete-sm" onClick={() => handleDelete(r._id)}>
                  <i className="bx bx-trash"></i>
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default HealthTracker
