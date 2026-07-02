import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './AuthPages.css'

const LoginPage = ({ onSwitchToRegister, onSuccess, onBack }) => {
  const { login } = useAuth()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      onSuccess?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <i className="bx bx-plus-medical"></i>
          <h1>CareChat</h1>
          <p>Your Medical Report Companion</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Welcome back</h2>

          {error && (
            <div className="auth-error">
              <i className="bx bx-error-circle"></i>
              {error}
            </div>
          )}

          <div className="form-group">
            <label>Email address</label>
            <div className="input-wrapper">
              <i className="bx bx-envelope"></i>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <i className="bx bx-lock-alt"></i>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? <span className="spinner"></span> : <i className="bx bx-log-in"></i>}
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="auth-divider">or</div>

        <div className="auth-switch">
          Don't have an account?
          <button type="button" onClick={onSwitchToRegister}>Create one</button>
        </div>

        {onBack && (
          <div className="auth-switch" style={{ marginTop: 12 }}>
            <button type="button" onClick={onBack}>← Back to home</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginPage
