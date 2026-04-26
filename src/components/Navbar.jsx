import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X, User } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import CartDrawer from './CartDrawer'
import './Navbar.css'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/store', label: 'Store' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { count, setIsOpen } = useCart()
  const { user } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location])

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          {/* LEFT: LOGO */}
          <div className="navbar-left">
            <Link to="/" className="navbar-logo">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1"/>
                <path d="M9 14 Q14 7 19 14 Q14 21 9 14Z" fill="currentColor" opacity="0.6"/>
              </svg>
              <span className="navbar-logo-text">Clovermade</span>
            </Link>
          </div>

          {/* CENTER: NAV LINKS */}
          <div className="navbar-center">
            <ul className="navbar-links">
              {NAV_LINKS.map(l => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: ACTIONS */}
          <div className="navbar-right">
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link to="/admin" className="nav-btn-subtle nav-btn-admin">
                    Admin
                  </Link>
                )}
                <Link to="/dashboard" className="nav-btn-subtle">
                  <User size={14} /> My Account
                </Link>
              </>
            ) : (
              <Link to="/login" className="nav-btn-subtle">
                Login
              </Link>
            )}
            
            <button
              className="cart-btn"
              onClick={() => {
                setIsOpen(true);
                setMobileOpen(false);
              }}
              aria-label="Open cart"
            >
              <ShoppingBag size={18} />
              {count > 0 && <span className="cart-badge">{count}</span>}
            </button>

            <Link to="/contact" className="btn btn-primary nav-cta">
              Book a Session
            </Link>

            <button
              className={`menu-btn ${mobileOpen ? 'hidden' : ''}`}
              onClick={() => {
                setMobileOpen(true);
                setIsOpen(false);
              }}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div 
        className={`mobile-overlay ${mobileOpen ? 'active' : ''}`} 
        onClick={() => setMobileOpen(false)} 
      />

      {/* Mobile menu drawer */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <button 
          className="menu-btn close-btn" 
          onClick={() => setMobileOpen(false)}
        >
          <X size={28} />
        </button>

        <ul>
          {NAV_LINKS.map(l => (
            <li key={l.to}>
              <NavLink 
                to={l.to} 
                end={l.to === '/'} 
                className={({ isActive }) => isActive ? 'mobile-link active' : 'mobile-link'}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
          <div className="divider" style={{ margin: '24px 0' }} />
          {user ? (
            <>
              {user.role === 'admin' && (
                <li>
                  <Link to="/admin" className="mobile-link" onClick={() => setMobileOpen(false)} style={{ color: 'var(--color-gold)' }}>
                    Admin Suite
                  </Link>
                </li>
              )}
              <li>
                <Link to="/dashboard" className="mobile-link" onClick={() => setMobileOpen(false)}>
                  Dashboard
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="mobile-link" onClick={() => setMobileOpen(false)}>
                Sign In / Register
              </Link>
            </li>
          )}
          <li>
            <Link to="/contact" className="btn btn-primary" onClick={() => setMobileOpen(false)} style={{ marginTop: 32, width: '100%', justifyContent: 'center' }}>
              Book Now
            </Link>
          </li>
        </ul>
      </div>

      <CartDrawer />
    </>
  )
}
