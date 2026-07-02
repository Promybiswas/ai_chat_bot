import React from 'react'
import { useAuth } from '../context/AuthContext'
import './Sidebar.css'

const NAV = [
  { id: 'dashboard',    icon: 'bx-grid-alt',       label: 'Dashboard'      },
  { id: 'reports',      icon: 'bxs-report',   label: 'Reports'        },
  { id: 'chat',         icon: 'bx-bot',            label: 'AI Chat'        },
  { id: 'appointments', icon: 'bx-calendar',       label: 'Appointments'   },
  { id: 'health',       icon: 'bx-heart-circle',   label: 'Health Tracker' },
]

const Sidebar = ({ activePage, onNavigate, isOpen, onToggle }) => {
  const { user, logout } = useAuth()

  return (
    <aside className={`sidebar ${isOpen ? '' : 'sidebar--collapsed'}`}>
      <div className="sidebar-logo">
        <i className="bx bx-plus-medical"></i>
        {isOpen && <span>CareChat</span>}
        <button className="btn-toggle" onClick={onToggle} title={isOpen ? 'Collapse' : 'Expand'}>
          <i className={`bx ${isOpen ? 'bx-chevron-left' : 'bx-chevron-right'}`}></i>
        </button>
      </div>

      <nav className="sidebar-nav">
        {NAV.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <i className={`bx ${item.icon}`}></i>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
          <div className="user-info">
            <p className="user-name">{user?.name}</p>
            <p className="user-email">{user?.email}</p>
          </div>
        </div>
        <button className="btn-logout" onClick={logout} title="Sign out">
          <i className="bx bx-log-out"></i>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
