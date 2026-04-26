import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { usePortfolio } from '../context/PortfolioContext'
import { useCMS } from '../context/CMSContext'
import { 
  UserPlus, Mail, Phone, Image as ImageIcon, 
  Plus, Trash2, Edit2, ChevronRight, 
  BarChart3, MessageCircle, ShoppingCart, 
  Settings, LogOut, LayoutDashboard, Layers, 
  Package, Search, Bell, CheckCircle, ExternalLink,
  Filter, Eye, Send, X, AlertCircle, RefreshCw, Menu, ArrowLeft
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './AdminDashboard.css'

export default function AdminDashboard() {
  const { 
    user, clients, adminCreateClient, adminAssignPhotos, 
    adminDeletePhoto, adminUpdateClientStatus, 
    adminSendMessage, logout, setUser, adminUpdateOrderStatus 
  } = useAuth()
  const { portfolio, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } = usePortfolio()
  const { content: cmsContent, updateContent } = useCMS()
  const navigate = useNavigate()
  
  const [activeSection, setActiveSection] = useState('overview')
  const [editingPortfolioId, setEditingPortfolioId] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  // Photo Assignment State
  const [assigningToEmail, setAssigningToEmail] = useState(null)
  const [photoInputs, setPhotoInputs] = useState([{ title: '', url: '' }])
  
  // Messaging State
  const [messagingEmail, setMessagingEmail] = useState(null)
  const [msgText, setMsgText] = useState('')

  const [statusMessage, setStatusMessage] = useState(null)

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login', { state: { message: "Administrative access required.", from: '/admin' } });
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') return null;

  const showNotification = (text, type = 'success') => {
    setStatusMessage({ text, type })
    setTimeout(() => setStatusMessage(null), 4000)
  }

  // --- FORM HANDLERS ---
  const handleCreateClient = (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    
    if (!email.includes('@')) return showNotification('Invalid email format', 'error')
    
    const res = adminCreateClient({ name, email })
    if (res.success) {
      showNotification('Client registered successfully')
      form.reset()
      setAssigningToEmail(null)
    }
  }

  const handleAssignPhotos = (e) => {
    e.preventDefault()
    const validPhotos = photoInputs.filter(p => p.url.trim() !== '')
    if (validPhotos.length === 0) return showNotification('Add at least one photo URL', 'error')
    
    adminAssignPhotos(assigningToEmail, validPhotos)
    showNotification(`Successfully assigned ${validPhotos.length} photos`)
    setAssigningToEmail(null)
    setPhotoInputs([{ title: '', url: '' }])
  }

  const handleImpersonate = (client) => {
    setUser(client)
    navigate('/dashboard')
  }

  const handlePortfolioSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const data = {
      title: form.title.value,
      category: form.category.value,
      description: form.description.value,
      mainImage: form.mainImage.value,
      images: form.images.value.split(',').map(url => url.trim()).filter(u => u !== '')
    }

    if (!data.mainImage.startsWith('http')) return showNotification('Invalid image URL', 'error')

    if (editingPortfolioId) {
      updatePortfolioItem(editingPortfolioId, data)
      setEditingPortfolioId(null)
      showNotification('Portfolio project updated')
    } else {
      addPortfolioItem(data)
      showNotification('Project published to portfolio')
    }
    form.reset()
  }

  return (
    <div className="admin-layout">
      {/* MOBILE OVERLAY */}
      <div className={`admin-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)} />

      {/* SIDEBAR */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="admin-brand">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="var(--color-gold)" strokeWidth="1"/>
            <path d="M9 14 Q14 7 19 14 Q14 21 9 14Z" fill="var(--color-gold)" opacity="0.6"/>
          </svg>
          <span className="serif" style={{ fontSize: '1.2rem', letterSpacing: '0.1em' }}>CONTROL</span>
        </div>

        <nav className="admin-nav">
          {[
            { id: 'overview', icon: <LayoutDashboard size={18} />, label: 'Overview' },
            { id: 'clients', icon: <UserPlus size={18} />, label: 'Client Registry' },
            { id: 'portfolio', icon: <Layers size={18} />, label: 'Portfolio' },
            { id: 'orders', icon: <ShoppingCart size={18} />, label: 'Orders' },
            { id: 'settings', icon: <Settings size={18} />, label: 'CMS' },
          ].map(item => (
            <button 
              key={item.id} 
              onClick={() => { setActiveSection(item.id); setIsSidebarOpen(false); }} 
              className={`admin-nav-item ${activeSection === item.id ? 'active' : ''}`}
            >
              {item.icon} <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-footer">
          <button onClick={() => { logout(); navigate('/'); }} className="admin-nav-item" style={{ color: 'var(--color-muted)' }}>
            <LogOut size={18} /> <span>Exit</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="flex align-center gap-16">
            <button className="mobile-toggle" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div>
              <span className="section-label" style={{ color: 'var(--color-gold)' }}>Studio Manager</span>
              <h1 className="serif" style={{ fontSize: '2.4rem', marginTop: 8 }}>
                {activeSection.toUpperCase()}
              </h1>
            </div>
          </div>
          <div className="flex-center gap-12">
            <span className="body-xs" style={{ color: 'var(--color-muted)' }}>Admin: {user.name}</span>
            <div className="header-avatar" style={{ width: 28, height: 28 }}>A</div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div key={activeSection} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            
            {/* 1. OVERVIEW */}
            {activeSection === 'overview' && (
              <div className="stack gap-40">
                <div className="admin-stats-grid">
                  <div className="admin-card stat-card">
                    <div className="flex-between">
                      <span className="section-label">Total Reach</span>
                      <BarChart3 size={14} color="var(--color-gold)" />
                    </div>
                    <span className="stat-val serif">{clients.length}</span>
                    <p className="body-xs" style={{ color: 'var(--color-soft)' }}>Registered studio members</p>
                  </div>
                  <div className="admin-card stat-card">
                    <div className="flex-between">
                      <span className="section-label">Revenue</span>
                      <ShoppingCart size={14} color="var(--color-gold)" />
                    </div>
                    <span className="stat-val serif">$24.8k</span>
                    <p className="body-xs" style={{ color: '#4CAF50' }}>+12% this month</p>
                  </div>
                  <div className="admin-card stat-card">
                    <div className="flex-between">
                      <span className="section-label">Gallery Assets</span>
                      <ImageIcon size={14} color="var(--color-gold)" />
                    </div>
                    <span className="stat-val serif">142</span>
                    <p className="body-xs" style={{ color: 'var(--color-soft)' }}>Delivered high-res photos</p>
                  </div>
                  <div className="admin-card stat-card">
                    <div className="flex-between">
                      <span className="section-label">System Health</span>
                      <RefreshCw size={14} color="var(--color-gold)" />
                    </div>
                    <span className="stat-val serif">100%</span>
                    <p className="body-xs" style={{ color: '#4CAF50' }}>All systems operational</p>
                  </div>
                </div>

                <div className="grid col-2 gap-32">
                  <div className="admin-card">
                    <h3 className="serif" style={{ marginBottom: 20 }}>Quick Actions</h3>
                    <div className="grid col-2 gap-12">
                      <button className="btn btn-outline" style={{ justifyContent: 'center' }} onClick={() => setActiveSection('clients')}><Plus size={14} /> New Client</button>
                      <button className="btn btn-outline" style={{ justifyContent: 'center' }} onClick={() => setActiveSection('portfolio')}><ImageIcon size={14} /> New Project</button>
                    </div>
                  </div>
                  <div className="admin-card">
                    <h3 className="serif" style={{ marginBottom: 20 }}>Studio Notifications</h3>
                    <p className="body-xs" style={{ color: 'var(--color-muted)' }}>No critical alerts today.</p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. CLIENT REGISTRY */}
            {activeSection === 'clients' && (
              <div className="stack gap-32">
                <div className="admin-card flex-between align-center">
                  <div className="flex gap-16">
                    <div className="admin-search-bar" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--admin-border)', borderRadius: 4, display: 'flex', alignItems: 'center', padding: '0 12px' }}>
                      <Search size={16} color="var(--color-muted)" />
                      <input 
                        type="text" 
                        placeholder="Search by name or email..." 
                        style={{ background: 'none', border: 'none', color: '#fff', padding: '10px 12px', width: 300, fontSize: '0.85rem' }} 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <button className="btn btn-primary" onClick={() => setAssigningToEmail('NEW')}><UserPlus size={16} /> Register Client</button>
                </div>

                <div className="admin-card admin-table-card">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Member</th>
                        <th>Status</th>
                        <th>History</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map(c => (
                        <tr key={c.email}>
                          <td>
                            <p className="body-sm" style={{ fontWeight: 600 }}>{c.name}</p>
                            <p className="body-xs" style={{ color: 'var(--color-muted)' }}>{c.email}</p>
                          </td>
                          <td><span className={`status-pill ${c.status?.toLowerCase().replace(' ', '-') || 'member'}`}>{c.status || 'Member'}</span></td>
                          <td>
                            <p className="body-xs">{c.photos?.length || 0} Photos</p>
                            <p className="body-xs" style={{ color: 'var(--color-muted)' }}>{c.orders?.length || 0} Orders</p>
                          </td>
                          <td>
                            <div className="flex gap-12">
                              <button className="btn-ghost" title="Assign Photos" onClick={() => setAssigningToEmail(c.email)}><ImageIcon size={14} /></button>
                              <button className="btn-ghost" title="Impersonate View" onClick={() => handleImpersonate(c)}><Eye size={14} /></button>
                              <button className="btn-ghost" title="Delete Account" style={{ color: '#ff5050' }}><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. PORTFOLIO */}
            {activeSection === 'portfolio' && (
              <div className="stack gap-32">
                <div className="grid col-2 gap-32">
                  <div className="admin-card">
                    <h3 className="serif" style={{ fontSize: '1.4rem', marginBottom: 24 }}>
                      {editingPortfolioId ? 'Update Project' : 'Publish New Project'}
                    </h3>
                    <form className="stack gap-20" onSubmit={handlePortfolioSubmit}>
                      <div className="admin-form-group">
                        <label className="section-label">Title</label>
                        <input name="title" className="admin-input" required />
                      </div>
                      <div className="grid col-2 gap-16">
                        <div className="admin-form-group">
                          <label className="section-label">Category</label>
                          <select name="category" className="admin-input">
                            <option>Wedding</option>
                            <option>Portrait</option>
                            <option>Event</option>
                          </select>
                        </div>
                        <div className="admin-form-group">
                          <label className="section-label">Feature URL</label>
                          <input name="mainImage" className="admin-input" required placeholder="https://..." />
                        </div>
                      </div>
                      <div className="admin-form-group">
                        <label className="section-label">Narrative</label>
                        <textarea name="description" className="admin-input" rows={2} required />
                      </div>
                      <div className="admin-form-group">
                        <label className="section-label">Gallery Strip (Comma Separated)</label>
                        <textarea name="images" className="admin-input" rows={2} />
                      </div>
                      <div className="flex gap-12">
                        <button className="btn btn-primary" type="submit">Publish Work</button>
                        {editingPortfolioId && <button className="btn btn-outline" onClick={() => setEditingPortfolioId(null)}>Cancel</button>}
                      </div>
                    </form>
                  </div>
                  <div className="admin-card">
                    <h3 className="serif" style={{ marginBottom: 20 }}>Live Preview</h3>
                    <div className="portfolio-preview-box" style={{ background: '#000', height: 300, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--admin-border)' }}>
                      <p className="body-xs" style={{ color: 'var(--color-muted)' }}>Select an image URL to see a preview.</p>
                    </div>
                  </div>
                </div>

                <div className="admin-card admin-table-card">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Asset</th>
                        <th>Project</th>
                        <th>Visibility</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {portfolio.map(p => (
                        <tr key={p.id}>
                          <td><img src={p.mainImage} alt="" style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }} /></td>
                          <td>
                            <p className="body-sm" style={{ fontWeight: 500 }}>{p.title}</p>
                            <p className="body-xs" style={{ color: 'var(--color-muted)' }}>{p.category}</p>
                          </td>
                          <td><span className="status-pill delivered">Live</span></td>
                          <td>
                            <div className="flex gap-12">
                              <button className="btn-ghost" onClick={() => setEditingPortfolioId(p.id)}><Edit2 size={14} /></button>
                              <button className="btn-ghost" style={{ color: '#ff5050' }} onClick={() => deletePortfolioItem(p.id)}><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. ORDERS */}
            {activeSection === 'orders' && (
              <div className="admin-card admin-table-card">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Customer</th>
                      <th>Fulfillment</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.flatMap(c => (c.orders || []).map(o => ({...o, owner: c.name}))).map(order => (
                      <tr key={order.id}>
                        <td><p className="body-sm">{order.id}</p><p className="body-xs" style={{ color: 'var(--color-muted)' }}>{order.date}</p></td>
                        <td><p className="body-sm">{order.owner}</p></td>
                        <td>
                          <select 
                            className="admin-input" 
                            style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                            value={order.status}
                            onChange={(e) => {
                              adminUpdateOrderStatus(order.id, e.target.value)
                              showNotification(`Order status updated to ${e.target.value}`)
                            }}
                          >
                            <option>Processing</option>
                            <option>Shipped</option>
                            <option>Delivered</option>
                          </select>
                        </td>
                        <td><span className={`status-pill ${order.status.toLowerCase()}`}>{order.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 5. CMS */}
            {activeSection === 'settings' && (
              <div className="grid col-2 gap-32">
                <div className="admin-card">
                  <h3 className="serif" style={{ marginBottom: 20 }}>Homepage Editor</h3>
                  <form className="stack gap-16" onSubmit={(e) => {
                    e.preventDefault()
                    updateContent('home', { heroTitle: e.target.title.value, heroSubtitle: e.target.sub.value })
                    showNotification('Homepage copy updated')
                  }}>
                    <div className="admin-form-group">
                      <label className="section-label">Headline</label>
                      <input name="title" className="admin-input" defaultValue={cmsContent.home.heroTitle} />
                    </div>
                    <div className="admin-form-group">
                      <label className="section-label">Subheadline</label>
                      <textarea name="sub" className="admin-input" rows={3} defaultValue={cmsContent.home.heroSubtitle} />
                    </div>
                    <button className="btn btn-primary" type="submit">Apply Updates</button>
                  </form>
                </div>
                <div className="admin-card">
                  <h3 className="serif" style={{ marginBottom: 20 }}>About Narrative</h3>
                  <form className="stack gap-16" onSubmit={(e) => {
                    e.preventDefault()
                    updateContent('about', { title: e.target.title.value, description: e.target.desc.value })
                    showNotification('About page copy updated')
                  }}>
                    <div className="admin-form-group">
                      <label className="section-label">Section Title</label>
                      <input name="title" className="admin-input" defaultValue={cmsContent.about.title} />
                    </div>
                    <div className="admin-form-group">
                      <label className="section-label">Body Text</label>
                      <textarea name="desc" className="admin-input" rows={6} defaultValue={cmsContent.about.description} />
                    </div>
                    <button className="btn btn-primary" type="submit">Update Story</button>
                  </form>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* MODAL: ASSIGN / REGISTER */}
        <AnimatePresence>
          {assigningToEmail && (
            <div className="photo-lightbox" onClick={() => setAssigningToEmail(null)}>
              <motion.div className="admin-card" style={{ width: '100%', maxWidth: 500 }} onClick={e => e.stopPropagation()} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <div className="flex-between" style={{ marginBottom: 20 }}>
                  <h3 className="serif">{assigningToEmail === 'NEW' ? 'Register Client' : 'Assign Photos'}</h3>
                  <button onClick={() => setAssigningToEmail(null)}><X size={20} /></button>
                </div>
                
                {assigningToEmail === 'NEW' ? (
                  <form onSubmit={handleCreateClient} className="stack gap-16">
                    <div className="admin-form-group">
                      <label className="section-label">Name</label>
                      <input name="name" className="admin-input" required />
                    </div>
                    <div className="admin-form-group">
                      <label className="section-label">Email</label>
                      <input name="email" type="email" className="admin-input" required />
                    </div>
                    <button className="btn btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center' }}>Create Account</button>
                  </form>
                ) : (
                  <form onSubmit={handleAssignPhotos} className="stack gap-16">
                    {photoInputs.map((p, i) => (
                      <div key={i} className="stack gap-8">
                        <div className="flex gap-8">
                          <input className="admin-input" style={{ flex: 1 }} placeholder="Title" value={p.title} onChange={e => {
                            const n = [...photoInputs]; n[i].title = e.target.value; setPhotoInputs(n)
                          }} />
                          <input className="admin-input" style={{ flex: 2 }} placeholder="URL" value={p.url} onChange={e => {
                            const n = [...photoInputs]; n[i].url = e.target.value; setPhotoInputs(n)
                          }} />
                        </div>
                        {p.url && <img src={p.url} alt="Preview" style={{ height: 60, borderRadius: 4, objectFit: 'cover' }} />}
                      </div>
                    ))}
                    <button type="button" className="btn-ghost" onClick={() => setPhotoInputs([...photoInputs, {title:'', url:'' }])}>+ Add More</button>
                    <button className="btn btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center' }}>Assign to Gallery</button>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* NOTIFICATIONS */}
        <AnimatePresence>
          {statusMessage && (
            <motion.div className={`admin-notification ${statusMessage.type}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              {statusMessage.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              <span>{statusMessage.text}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
