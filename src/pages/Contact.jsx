import { useState } from 'react'
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import './Contact.css'

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

const WhatsAppIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
)

export default function Contact() {
  useReveal()
  const [status, setStatus] = useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('submitting')
    setTimeout(() => setStatus('success'), 1500)
  }

  return (
    <div className="contact-page" style={{ paddingTop: 'var(--nav-h)' }}>
      <section className="page-hero">
        <div className="contact-hero-bg">
          <img src="https://images.unsplash.com/photo-1517504734587-2890819debab?w=1600&q=85&fit=crop" alt="Contact hero" />
          <div className="overlay-dark" />
        </div>
        <div className="container page-hero-content">
          <span className="section-label">Bookings</span>
          <h1 className="display-lg" style={{ marginTop: 16 }}>Let’s Capture Your Special Moment</h1>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 80, paddingBottom: 100 }}>
        <div className="container">
          <div className="grid-2 gap-48 reveal">
            
            <div className="contact-info stack gap-48">
              <div>
                <h2 className="serif" style={{ fontSize: '2.2rem', marginBottom: 16, color: 'var(--color-cream)' }}>
                  Let's discuss your vision.
                </h2>
                <p className="body-lg" style={{ marginBottom: 16 }}>
                  Whether you're planning an intimate wedding, a brand campaign, or simply want to say hello, we'd love to hear from you. Fill out the form, and we'll get back to you within 48 hours.
                </p>
                <div style={{ padding: '12px 16px', background: 'rgba(212,175,55,0.1)', borderLeft: '3px solid var(--color-gold)', display: 'inline-block' }}>
                  <span className="body-sm" style={{ color: 'var(--color-gold)', fontWeight: 500, letterSpacing: '0.05em' }}>URGENCY: Limited bookings available each month.</span>
                </div>
              </div>

              <div className="stack gap-24">
                <div className="contact-detail">
                  <MapPin size={20} color="var(--color-gold)" />
                  <div>
                    <h4 className="section-label" style={{ marginBottom: 4 }}>Studio</h4>
                    <p className="body-sm">124 West 24th Street<br/>Suite 4B, New York, NY 10001</p>
                    <p className="body-sm" style={{ marginTop: 8, fontStyle: 'italic' }}>*By appointment only</p>
                  </div>
                </div>

                <div className="contact-detail">
                  <Phone size={20} color="var(--color-gold)" />
                  <div>
                    <h4 className="section-label" style={{ marginBottom: 4 }}>Phone</h4>
                    <p className="body-sm">+1 (212) 555-0198</p>
                  </div>
                </div>

                <div className="contact-detail">
                  <Mail size={20} color="var(--color-gold)" />
                  <div>
                    <h4 className="section-label" style={{ marginBottom: 4 }}>Email</h4>
                    <a href="mailto:hello@clovermade.com" className="body-sm contact-link">hello@clovermade.com</a>
                  </div>
                </div>
                
                <div className="contact-detail" style={{ marginTop: 16 }}>
                  <a href="https://wa.me/12125550198" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', gap: 8, borderColor: '#25D366', color: '#25D366' }}>
                    <WhatsAppIcon size={16} /> Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div>
                <h4 className="section-label" style={{ marginBottom: 16 }}>Follow Us</h4>
                <a href="#" className="social-link flex-center" style={{ width: 40, height: 40, border: '1px solid var(--color-border)', borderRadius: '50%', color: 'var(--color-cream)' }}>
                  <InstagramIcon size={18} />
                </a>
              </div>
            </div>

            <div className="contact-form-wrapper">
              {status === 'success' ? (
                <div className="form-success flex-center stack gap-16" style={{ height: '100%', textAlign: 'center', padding: 40, background: 'var(--color-charcoal)', border: '1px solid var(--color-border)' }}>
                  <h3 className="serif" style={{ fontSize: '2rem', color: 'var(--color-gold)' }}>Thank You</h3>
                  <p className="body-lg">Your message has been received. We will be in touch shortly.</p>
                  <button onClick={() => setStatus('idle')} className="btn btn-outline" style={{ marginTop: 24 }}>Send Another Message</button>
                </div>
              ) : (
                <form className="contact-form stack gap-24" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Name *</label>
                    <input type="text" id="name" required className="form-input" placeholder="Jane Doe" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address *</label>
                    <input type="email" id="email" required className="form-input" placeholder="jane@example.com" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="event" className="form-label">Event Type *</label>
                    <select id="event" required className="form-input" style={{ appearance: 'none' }}>
                      <option value="" disabled selected>Select an event type...</option>
                      <option>Wedding Photography</option>
                      <option>Portrait Session</option>
                      <option>Event Coverage</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="date" className="form-label">Event Date / Ideal Date (Optional)</label>
                    <input type="date" id="date" className="form-input" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Tell us about your vision *</label>
                    <textarea id="message" required className="form-input" placeholder="Share some details about what you're looking for..."></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary" disabled={status === 'submitting'} style={{ justifyContent: 'center' }}>
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
