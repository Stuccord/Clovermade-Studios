import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import './Footer.css'

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="navbar-logo" style={{ marginBottom: 20 }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1"/>
                <path d="M9 14 Q14 7 19 14 Q14 21 9 14Z" fill="currentColor" opacity="0.6"/>
                <circle cx="14" cy="14" r="2" fill="currentColor"/>
              </svg>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', letterSpacing: '0.08em', color: 'var(--color-cream)' }}>
                Clovermade Studios
              </span>
            </div>
            <p className="body-sm" style={{ maxWidth: 280, lineHeight: 1.9 }}>
              Premium fine art photography — crafting images that move, stories that last, and moments that transcend time.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Instagram"><InstagramIcon size={18} /></a>
              <a href="mailto:hello@clovermade.com" aria-label="Email"><Mail size={18} /></a>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <h4 className="footer-heading">Navigate</h4>
            <ul className="footer-links">
              {[
                ['/', 'Home'], 
                ['/portfolio', 'Portfolio'], 
                ['/shop/clothing', 'Clothing'], 
                ['/shop/digital', 'Digital Assets'], 
                ['/about', 'About'], 
                ['/contact', 'Contact']
              ].map(([to, label]) => (
                <li key={to}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              {['Portrait Sessions', 'Wedding Photography', 'Editorial & Fashion', 'Architecture', 'Event Coverage', 'Fine Art Prints'].map(s => (
                <li key={s}><span>{s}</span></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-heading">Studio</h4>
            <ul className="footer-contact-list">
              <li>
                <MapPin size={14} />
                <span>New York, NY 10001</span>
              </li>
              <li>
                <Phone size={14} />
                <span>+1 (212) 000-0000</span>
              </li>
              <li>
                <Mail size={14} />
                <a href="mailto:hello@clovermade.com">hello@clovermade.com</a>
              </li>
            </ul>
            <Link to="/contact" className="btn btn-outline" style={{ marginTop: 24, padding: '12px 24px', fontSize: '0.72rem' }}>
              Book a Session
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="body-sm">© {new Date().getFullYear()} Clovermade Studios. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#" className="body-sm">Privacy Policy</a>
            <a href="#" className="body-sm">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
