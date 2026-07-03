import React, { useState } from 'react'
import Navbar from './Navbar'
import './ChatBotStart.css'
import './AboutContact.css'

const ChatBotStart = ({ onStartChat, onSignIn, onSignUp, onLogout }) => {
  const [contact, setContact] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setContact({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <>
      <Navbar onSignIn={onSignIn} onSignUp={onSignUp} onLogout={onLogout} />
      <div className="start-page">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-title">Understand Your Medical Reports Better</h1>
              <p className="hero-subtitle">
                Upload your medical documents and let AI explain them in simple, easy-to-understand language.
                Get instant insights from your health data.
              </p>
              <div className="hero-buttons">
                <button className="btn-primary" onClick={onStartChat}>
                  Start Chatting
                  <i className="bx bx-arrow-right"></i>
                </button>
              </div>
            </div>
            <div className="hero-image">
              <div className="floating-card">
                <i className="bx bx-file"></i>
                <p>Medical Reports</p>
              </div>
              <div className="floating-card card-2">
                <i className="bx bx-brain"></i>
                <p>AI Analysis</p>
              </div>
              <div className="floating-card card-3">
                <i className="bx bx-message"></i>
                <p>Clear Chat</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features-section">
          <div className="features-container">
            <h2>Why Choose CareChat?</h2>
            <p className="section-subtitle">Everything you need to understand your health</p>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="bx bx-cloud-upload"></i>
                </div>
                <h3>Easy Upload</h3>
                <p>Drag and drop or browse your medical reports in PDF or image format</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="bx bx-atom"></i>
                </div>
                <h3>Advanced AI</h3>
                <p>Powered by cutting-edge AI technology for accurate analysis</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="bx bx-message-rounded-detail"></i>
                </div>
                <h3>Instant Chat</h3>
                <p>Ask questions and get instant, personalized explanations</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="bx bxs-shield-alt-2"></i>
                </div>
                <h3>Secure & Private</h3>
                <p>Your medical data is encrypted and kept completely private</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="bx bx-time"></i>
                </div>
                <h3>24/7 Available</h3>
                <p>Access your reports and chat anytime, anywhere</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="bx bx-history"></i>
                </div>
                <h3>Save History</h3>
                <p>Keep all your conversations and analyses in one place</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="how-section">
          <div className="how-container">
            <h2>How It Works</h2>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <h3>Create Your Account</h3>
                <p>Sign up free and set up your personal health profile</p>
              </div>
              <div className="step-arrow">
                <i className="bx bx-arrow-to-right"></i>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h3>Upload Reports</h3>
                <p>Add your medical PDFs — our AI reads and understands them instantly</p>
              </div>
              <div className="step-arrow">
                <i className="bx bx-arrow-to-right"></i>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h3>Chat with AI</h3>
                <p>Ask questions and get clear, plain-language explanations of your results</p>
              </div>
              <div className="step-arrow">
                <i className="bx bx-arrow-to-right"></i>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <h3>Track Your Health</h3>
                <p>Manage appointments and monitor your vitals from one dashboard</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <div className="about-container">
            <h2>About CareChat</h2>
            <p className="section-subtitle">Making your health information easy to understand</p>
            <div className="about-content">
              <div className="about-text">
                <p>
                  CareChat was built on a simple belief: understanding your own health
                  shouldn't require a medical degree. Lab reports are full of numbers and
                  jargon that leave most people confused and anxious.
                </p>
                <p>
                  We combine advanced AI with a clean, secure platform so you can upload
                  your medical reports and get clear, plain-language explanations in seconds —
                  while keeping track of your appointments and vitals all in one place.
                </p>
                <p>
                  CareChat is here to help you understand, not to replace your doctor. Always
                  consult a healthcare professional for diagnosis and treatment.
                </p>
              </div>
              <div className="about-highlights">
                <div className="about-highlight">
                  <i className="bx bx-bot"></i>
                  <h4>AI-Powered</h4>
                  <p>Reads and explains your reports instantly</p>
                </div>
                <div className="about-highlight">
                  <i className="bx bxs-lock-alt"></i>
                  <h4>Private &amp; Secure</h4>
                  <p>Your data stays protected and yours alone</p>
                </div>
                <div className="about-highlight">
                  <i className="bx bx-heart"></i>
                  <h4>All-in-One</h4>
                  <p>Reports, appointments, and vitals together</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <div className="contact-container">
            <h2>Get in Touch</h2>
            <p className="section-subtitle">Questions or feedback? We'd love to hear from you</p>
            <div className="contact-grid">
              <div className="contact-info">
                <div className="contact-item">
                  <i className="bx bx-envelope"></i>
                  <div>
                    <h4>Email</h4>
                    <p>support@carechat.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="bx bx-phone"></i>
                  <div>
                    <h4>Phone</h4>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="bx bx-map"></i>
                  <div>
                    <h4>Location</h4>
                    <p>Remote — available worldwide</p>
                  </div>
                </div>
              </div>

              <form className="contact-form" onSubmit={handleContactSubmit}>
                {sent && (
                  <div className="contact-success">
                    <i className="bx bx-check-circle"></i> Thanks! Your message has been sent.
                  </div>
                )}
                <div className="contact-field">
                  <label>Name</label>
                  <input
                    type="text" placeholder="Your name" required
                    value={contact.name}
                    onChange={e => setContact({ ...contact, name: e.target.value })}
                  />
                </div>
                <div className="contact-field">
                  <label>Email</label>
                  <input
                    type="email" placeholder="you@example.com" required
                    value={contact.email}
                    onChange={e => setContact({ ...contact, email: e.target.value })}
                  />
                </div>
                <div className="contact-field">
                  <label>Message</label>
                  <textarea
                    rows={4} placeholder="How can we help?" required
                    value={contact.message}
                    onChange={e => setContact({ ...contact, message: e.target.value })}
                  />
                </div>
                <button type="submit" className="contact-submit">Send Message</button>
              </form>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-container">
            <h2>Ready to Understand Your Health Better?</h2>
            <p>Start using CareChat today and take control of your medical information</p>
            <button className="btn-cta" onClick={onStartChat}>
              Get Started Free
              <i className="bx bx-arrow-right"></i>
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-content">
              <div className="footer-section">
                <h4>CareChat</h4>
                <p>Your Medical Report Companion</p>
              </div>
              <div className="footer-section">
                <h5>Product</h5>
                <ul>
                  <li><a href="#features">Features</a></li>
                  <li><a href="#pricing">Pricing</a></li>
                  <li><a href="#security">Security</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h5>Company</h5>
                <ul>
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#blog">Blog</a></li>
                  <li><a href="#careers">Careers</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h5>Legal</h5>
                <ul>
                  <li><a href="#privacy">Privacy</a></li>
                  <li><a href="#terms">Terms</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2026 CareChat. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default ChatBotStart