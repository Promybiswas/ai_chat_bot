import React from 'react'
import Navbar from './Navbar'
import './ChatBotStart.css'

const ChatBotStart = ({ onStartChat }) => {
  return (
    <>
      <Navbar />
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
                <button className="btn-secondary">
                  <i className="bx bx-play-circle"></i>
                  Watch Demo
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
                <h3>Upload Report</h3>
                <p>Share your medical document securely</p>
              </div>
              <div className="step-arrow">
                <i className="bx bx-arrow-to-right"></i>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h3>AI Analysis</h3>
                <p>AI processes and understands your report</p>
              </div>
              <div className="step-arrow">
                <i className="bx bx-arrow-to-right"></i>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h3>Ask Questions</h3>
                <p>Chat with AI about your medical data</p>
              </div>
              <div className="step-arrow">
                <i className="bx bx-arrow-to-right"></i>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <h3>Get Insights</h3>
                <p>Receive clear, understandable explanations</p>
              </div>
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