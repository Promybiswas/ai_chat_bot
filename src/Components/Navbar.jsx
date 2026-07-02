import React from 'react'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

const Navbar = ({ onSignIn, onSignUp, onLogout }) => {
  const { user } = useAuth()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <i className="bx bx-heart-circle"></i>
          <span>CareChat</span>
        </div>

        <ul className="navbar-menu">
          <li><a href="#features">Features</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="navbar-auth">
          {user ? (
            <>
              <span className="navbar-username">
                <i className="bx bx-user-circle"></i>
                {user.name}
              </span>
              <button className="btn-signin" onClick={onLogout}>
                <i className="bx bx-log-out"></i> Sign Out
              </button>
            </>
          ) : (
            <>
              <button className="btn-signin" onClick={onSignIn}>Sign In</button>
              <button className="btn-signup" onClick={onSignUp}>Get Started</button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
