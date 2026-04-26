import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import './Login.css'

export default function Login({ portalView = false }) {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const { login, signup } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const from = location.state?.from || '/dashboard'
  const message = location.state?.message

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (isLogin) {
      const res = await login(email, password)
      if (res.success) {
        navigate(from, { replace: true })
      } else {
        setError(res.message || 'Invalid credentials. Please try again.')
      }
    } else {
      signup(name, email)
      navigate(from, { replace: true })
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="login-card"
        >
          {/* Header */}
          <div className="login-header">
            <div className="login-logo">
              <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="13" stroke="var(--color-gold)" strokeWidth="1"/>
                <path d="M9 14 Q14 7 19 14 Q14 21 9 14Z" fill="var(--color-gold)" opacity="0.6"/>
              </svg>
            </div>
            <h2 className="serif" style={{ fontSize: '2rem', marginTop: 20 }}>
              {portalView ? 'Studio Portal' : (isLogin ? 'Welcome Back' : 'Create Account')}
            </h2>
            <p className="body-sm" style={{ color: 'var(--color-soft)', marginTop: 8 }}>
              {portalView 
                ? 'Access your private photography gallery.' 
                : (isLogin ? 'Sign in to your Clovermade account.' : 'Join our creative community.')
              }
            </p>
          </div>

          {/* Notices */}
          <AnimatePresence>
            {message && !error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="login-notice"
              >
                {message}
              </motion.div>
            )}
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="login-error"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="stack gap-20">
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" required className="form-input" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            )}
            
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" required className="form-input" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" required className="form-input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}>
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Toggle */}
          {!portalView && (
            <div className="login-footer" style={{ marginTop: 32, textAlign: 'center' }}>
              <button className="btn-ghost" style={{ fontSize: '0.85rem' }} onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
