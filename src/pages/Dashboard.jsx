import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  Download, Maximize2, X, Image as ImageIcon, 
  ShoppingBag, Settings, LogOut, ChevronRight,
  MessageSquare, Loader2, Activity, Clock, ArrowLeft
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './Dashboard.css'

export default function Dashboard() {
  const { user, logout, updateUser } = useAuth()
  const navigate = useNavigate()
  
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [isDownloadingAll, setIsDownloadingAll] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  })

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { message: "Please login to access your dashboard", from: '/dashboard' } });
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Activity size={20} /> },
    { id: 'photos', label: 'Photos', icon: <ImageIcon size={20} /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingBag size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> }
  ]

  return (
    <div className="dashboard-page">
      <div className="container dashboard-container">
        {/* HEADER */}
        <div className="flex-between align-end" style={{ marginBottom: 48 }}>
          <div>
            <span className="section-label" style={{ color: 'var(--color-gold)' }}>Member Portal</span>
            <h1 className="serif" style={{ fontSize: '3rem', marginTop: 12 }}>Welcome, {user.name.split(' ')[0]}</h1>
          </div>
          <button onClick={handleLogout} className="btn-ghost flex-center gap-8" style={{ color: 'var(--color-muted)', marginBottom: 12 }}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        {/* NAV */}
        <nav className="dashboard-nav-tabs">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}>
              {tab.label}
            </button>
          ))}
        </nav>

        {/* SECTIONS */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            
            {/* 1. OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="overview-grid">
                {/* Card 1: Total Orders */}
                <div className="dashboard-card stat-item" onClick={() => setActiveTab('orders')}>
                  <ShoppingBag size={24} style={{ color: 'var(--color-gold)', marginBottom: 20 }} />
                  <span className="section-label">Total Orders</span>
                  <h3 className="serif" style={{ fontSize: '2rem', marginTop: 8 }}>{user.orders?.length || 0}</h3>
                  <p className="body-xs" style={{ color: 'var(--color-muted)', marginTop: 8 }}>View history <ChevronRight size={12} /></p>
                </div>

                {/* Card 2: Photos Available */}
                <div className="dashboard-card stat-item" onClick={() => setActiveTab('photos')}>
                  <ImageIcon size={24} style={{ color: 'var(--color-gold)', marginBottom: 20 }} />
                  <span className="section-label">Photos Available</span>
                  <h3 className="serif" style={{ fontSize: '2rem', marginTop: 8 }}>{user.photos?.length || 0}</h3>
                  <p className="body-xs" style={{ color: 'var(--color-muted)', marginTop: 8 }}>Access gallery <ChevronRight size={12} /></p>
                </div>

                {/* Card 3: Recent Activity */}
                <div className="dashboard-card stat-item" style={{ textAlign: 'left' }}>
                  <Activity size={24} style={{ color: 'var(--color-gold)', marginBottom: 20 }} />
                  <span className="section-label">Recent Activity</span>
                  <div className="stack gap-12" style={{ marginTop: 16 }}>
                    {user.messages?.slice(0, 2).map((m, i) => (
                      <div key={i} className="flex gap-12">
                        <Clock size={12} style={{ marginTop: 4, color: 'var(--color-muted)' }} />
                        <div>
                          <p className="body-xs" style={{ color: 'var(--color-soft)' }}>{m.text}</p>
                          <span className="body-xs" style={{ fontSize: '0.6rem', color: 'var(--color-muted)' }}>{m.date}</span>
                        </div>
                      </div>
                    )) || <p className="body-xs" style={{ color: 'var(--color-muted)' }}>No recent activity.</p>}
                  </div>
                </div>
              </div>
            )}

            {/* 2. MY PHOTOS */}
            {activeTab === 'photos' && (
              <div className="stack gap-40">
                <div className="flex-between align-center">
                  <h2 className="serif" style={{ fontSize: '2.4rem' }}>My Photos</h2>
                  <button className="btn btn-primary" onClick={() => { setIsDownloadingAll(true); setTimeout(() => { setIsDownloadingAll(false); alert('Downloading ZIP...'); }, 2000); }} disabled={isDownloadingAll}>
                    {isDownloadingAll ? <Loader2 size={16} className="spin" /> : <Download size={16} />} Download All
                  </button>
                </div>
                {user.photos?.length > 0 ? (
                  <div className="gallery-grid">
                    {user.photos.map((photo, idx) => (
                      <motion.div key={photo.id} className="photo-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }}>
                        <img src={photo.url} alt={photo.title} loading="lazy" onLoad={(e) => e.target.classList.add('loaded')} />
                        <div className="premium-photo-overlay" onClick={() => setSelectedPhoto(photo)}>
                          <span className="view-label">View</span>
                          <Maximize2 size={18} color="white" />
                        </div>
                        <button className="photo-action-btn" onClick={() => alert('Downloading...')}>
                          <Download size={14} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="dashboard-card" style={{ textAlign: 'center', padding: '100px 20px' }}>
                    <ImageIcon size={48} style={{ color: '#fff', opacity: 0.4, marginBottom: 20 }} />
                    <p className="body-md">Your gallery is currently empty.</p>
                  </div>
                )}
              </div>
            )}

            {/* 3. MY ORDERS */}
            {activeTab === 'orders' && (
              <div className="stack gap-40">
                <h2 className="serif" style={{ fontSize: '2.4rem' }}>My Orders</h2>
                {user.orders?.length > 0 ? (
                  <div className="stack gap-24">
                    {user.orders.map(order => (
                      <div key={order.id} className="dashboard-card order-item">
                        <div className="flex-between" style={{ marginBottom: 24 }}>
                          <div>
                            <span className="section-label">{order.id}</span>
                            <p className="body-xs" style={{ color: 'var(--color-muted)', marginTop: 4 }}>{order.date}</p>
                          </div>
                          <span className={`status-pill ${order.status.toLowerCase()}`}>{order.status}</span>
                        </div>
                        <div className="stack gap-20" style={{ borderTop: '1px solid var(--color-border)', padding: '24px 0' }}>
                          {order.items?.map((item, i) => (
                            <div key={i} className="flex-between align-center">
                              <div className="flex-center gap-24">
                                <img src={item.image} alt={item.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4 }} />
                                <div>
                                  <h4 className="serif" style={{ fontSize: '1.2rem' }}>{item.name}</h4>
                                  <p className="body-xs" style={{ color: 'var(--color-gold)', marginTop: 4 }}>${item.price.toFixed(2)}</p>
                                </div>
                              </div>
                              <div className="hide-mobile">
                                <span className="section-label" style={{ fontSize: '0.6rem' }}>Product Type</span>
                                <p className="body-xs" style={{ color: 'var(--color-muted)' }}>{item.type || 'Physical'}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="dashboard-card" style={{ textAlign: 'center', padding: '100px 20px' }}>
                    <ShoppingBag size={48} style={{ color: '#fff', opacity: 0.4, marginBottom: 20 }} />
                    <p className="body-md">No orders found.</p>
                  </div>
                )}
              </div>
            )}

            {/* 4. SETTINGS */}
            {activeTab === 'settings' && (
              <div className="stack gap-40">
                <div className="dashboard-card" style={{ maxWidth: 700 }}>
                  <h2 className="serif" style={{ fontSize: '2.4rem', marginBottom: 32 }}>Account Details</h2>
                  <form className="stack gap-24">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input className="form-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Delivery Address</label>
                      <textarea className="form-input" rows={3} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => updateUser(formData)}>Save Changes</button>
                  </form>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div className="photo-lightbox" onClick={() => setSelectedPhoto(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="lightbox-close"><X size={24} /></button>
            <motion.div className="lightbox-content" onClick={e => e.stopPropagation()} initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <img src={selectedPhoto.url} alt="" />
              <div className="lightbox-footer">
                <h3 className="serif">{selectedPhoto.title}</h3>
                <button className="btn btn-primary" onClick={() => alert('Downloading...')}>Download High-Res</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE BOTTOM NAV */}
      <nav className="dashboard-mobile-nav">
        {tabs.map(tab => (
          <button 
            key={tab.id} 
            onClick={() => setActiveTab(tab.id)} 
            className={`mobile-nav-item ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
