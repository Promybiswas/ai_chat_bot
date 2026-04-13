import React from 'react'
import './Navbar.css'

const Navbar = () => {
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
          <button className="btn-signin">Sign In</button>
          <button className="btn-signup">Get Started</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
