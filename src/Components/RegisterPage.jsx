import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './AuthPages.css'

const RegisterPage = ({ onSwitchToLogin, onSuccess, onBack }) => {
  const { register } = useAuth()
  const [name, setName]             = useState('')
  const [email, setEmail]           = useState('')
  const [password, setPassword]     = useState('')
  const [confirm, setConfirm]       = useState('')
  const [error, setError]           = useState('')
  const [loading, setLoading]       = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      await register(name, email, password)
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
          <h2>Create your account</h2>

          {error && (
            <div className="auth-error">
              <i className="bx bx-error-circle"></i>
              {error}
            </div>
          )}

          <div className="form-group">
            <label>Full name</label>
            <div className="input-wrapper">
              <i className="bx bx-user"></i>
              <input
                type="text"
                placeholder="John Smith"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
          </div>

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
                placeholder="At least 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Confirm password</label>
            <div className="input-wrapper">
              <i className="bx bx-lock-alt"></i>
              <input
                type="password"
                placeholder="Repeat your password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? <span className="spinner"></span> : <i className="bx bx-user-plus"></i>}
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <div className="auth-divider">or</div>

        <div className="auth-switch">
          Already have an account?
          <button type="button" onClick={onSwitchToLogin}>Sign in</button>
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

export default RegisterPage
