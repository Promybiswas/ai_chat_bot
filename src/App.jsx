import React, { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage        from './Components/LoginPage'
import RegisterPage     from './Components/RegisterPage'
import ChatBotStart     from './Components/ChatBotStart'
import Sidebar          from './Components/Sidebar'
import Dashboard        from './Components/Dashboard'
import ReportsPage      from './Components/ReportsPage'
import AppointmentsPage from './Components/AppointmentsPage'
import HealthTracker    from './Components/HealthTracker'
import ChatWithReports  from './Components/ChatWithReports'
import './App.css'

const AppContent = () => {
  const { user, loading, logout } = useAuth()
  const [view, setView]           = useState('landing')   // landing | login | register | app
  const [page, setPage]           = useState('dashboard') // dashboard | reports | chat | appointments | health
  const [sidebarOpen, setSidebarOpen] = useState(true)

  if (loading) return (
    <div className="app-loading">
      <i className="bx bx-plus-medical"></i>
      <p>Loading CareChat...</p>
    </div>
  )

  /* ── Auth pages ── */
  if (view === 'login')    return <LoginPage    onSwitchToRegister={() => setView('register')} onSuccess={() => setView('app')} onBack={() => setView('landing')} />
  if (view === 'register') return <RegisterPage onSwitchToLogin={() => setView('login')}       onSuccess={() => setView('app')} onBack={() => setView('landing')} />

  /* ── Authenticated app ── */
  if (view === 'app' && user) return (
    <div className="app-layout">
      <Sidebar
        activePage={page}
        onNavigate={setPage}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(o => !o)}
      />
      <main className={`app-main ${sidebarOpen ? '' : 'sidebar-closed'}`}>
        {page === 'dashboard'    && <Dashboard        onNavigate={setPage} />}
        {page === 'reports'      && <ReportsPage />}
        {page === 'chat'         && <ChatWithReports  onGoBack={() => setPage('dashboard')} />}
        {page === 'appointments' && <AppointmentsPage />}
        {page === 'health'       && <HealthTracker />}
      </main>
    </div>
  )

  /* ── Landing page ── */
  return (
    <div className="container">
      <ChatBotStart
        onStartChat={() => user ? setView('app') : setView('register')}
        onSignIn={()   => setView('login')}
        onSignUp={()   => setView('register')}
        onLogout={()   => { logout(); setView('landing') }}
      />
    </div>
  )
}

const APP = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
)

export default APP
