import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const INITIAL_CLIENTS = [
  {
    email: 'client@clovermade.com',
    password: 'password123',
    name: 'Sarah & Mark',
    phone: '+1 234 567 8900',
    address: '456 Wedding Lane, Austin, TX',
    role: 'client',
    status: 'Delivered',
    downloadsCount: 12,
    messages: [
      { id: 1, text: 'Welcome to your portal! Your photos are being processed.', date: '2026-04-10' },
      { id: 2, text: 'Your wedding photos are now ready for download. Enjoy!', date: '2026-04-20' }
    ],
    photos: [
      { id: 1, url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80', title: 'The Vows' },
      { id: 2, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', title: 'Sunset Dance' },
      { id: 3, url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80', title: 'Reception' },
      { id: 4, url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80', title: 'Bridal Prep' }
    ],
    orders: [
      { 
        id: 'ORD-1002', 
        total: 1250.00, 
        date: '2026-04-22', 
        status: 'Delivered',
        address: '456 Wedding Lane, Austin, TX',
        updates: [
          { id: 1, text: 'Order confirmed and being prepared.', date: '2026-04-22' },
          { id: 2, text: 'Your package is out for delivery!', date: '2026-04-24' }
        ],
        items: [
          { name: 'Bridal Portrait Session', price: 1250, image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80', type: 'physical' }
        ]
      }
    ]
  },
  {
    email: 'fashion@clovermade.com',
    password: 'fashion2026',
    name: 'Elena Fashion House',
    phone: '+44 7700 900077',
    address: '10 Savile Row, London, UK',
    role: 'client',
    status: 'Photos Ready',
    downloadsCount: 0,
    messages: [
      { id: 1, text: 'Collection is ready for viewing.', date: '2026-04-25' }
    ],
    photos: [
      { id: 5, url: 'https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?w=800&q=80', title: 'Autumn Collection 01' },
      { id: 6, url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80', title: 'Silk Details' },
      { id: 7, url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80', title: 'Main Lookbook' }
    ],
    orders: [
      { 
        id: 'ORD-2001', 
        total: 245.00, 
        date: '2026-04-25', 
        status: 'Processing',
        address: '10 Savile Row, London, UK',
        items: [
          { name: 'Couture Lookbook Print', price: 245, image: 'https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?w=400&q=80', type: 'physical' }
        ]
      }
    ]
  }
]

const ADMIN_USER = {
  email: 'admin@clovermade.com',
  password: 'admin',
  name: 'Studio Admin',
  role: 'admin'
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [clients, setClients] = useState(INITIAL_CLIENTS)

  const login = (email, password) => {
    // Check Admin
    if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
      setUser(ADMIN_USER)
      return { success: true }
    }

    // Check Clients
    const client = clients.find(c => c.email === email && c.password === password)
    
    if (client) {
      const { password, ...userData } = client
      setUser(userData)
      return { success: true }
    }

    // Default store user mock
    if (email) {
      setUser({ 
        email, 
        name: email.split('@')[0],
        phone: '',
        address: '',
        role: 'customer',
        orders: [
          { 
            id: 'ORD-7832', 
            date: '2026-04-24', 
            total: 45.00, 
            status: 'Delivered',
            address: '123 Default St, City, Country',
            items: [
              { name: 'Vibrant Skin Lightroom Preset', price: 45, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80', type: 'digital' }
            ]
          }
        ]
      })
      return { success: true }
    }
    
    return { success: false, message: 'Invalid credentials' }
  }

  const signup = (name, email, phone) => {
    const newUser = { 
      name, 
      email, 
      phone, 
      role: 'customer', 
      status: 'Member',
      photos: [], 
      orders: [], 
      messages: [] 
    }
    setClients(prev => [...prev, newUser])
    setUser(newUser)
    return { success: true }
  }

  const adminCreateClient = (newClient) => {
    const client = { ...newClient, role: 'client', photos: [], orders: [], status: 'Processing', downloadsCount: 0, messages: [] }
    setClients(prev => [...prev, client])
    return { success: true }
  }

  const adminSendMessage = (email, text) => {
    const message = { id: Date.now(), text, date: new Date().toISOString().split('T')[0] }
    setClients(prev => prev.map(c => 
      c.email === email ? { ...c, messages: [message, ...(c.messages || [])] } : c
    ))
    if (user && user.email === email) {
      setUser(prev => ({ ...prev, messages: [message, ...(prev.messages || [])] }))
    }
    return { success: true }
  }

  const adminUpdateClientDetails = (email, updates) => {
    setClients(prev => prev.map(c => c.email === email ? { ...c, ...updates } : c))
    if (user && user.email === email) setUser(prev => ({ ...prev, ...updates }))
    return { success: true }
  }

  const adminUpdateClientStatus = (email, status) => {
    setClients(prev => prev.map(c => c.email === email ? { ...c, status } : c))
    if (user && user.email === email) setUser(prev => ({ ...prev, status }))
    return { success: true }
  }

  const adminDeletePhoto = (clientEmail, photoId) => {
    setClients(prev => prev.map(c => 
      c.email === clientEmail 
        ? { ...c, photos: c.photos.filter(p => p.id !== photoId) }
        : c
    ))
    if (user && user.email === clientEmail) {
      setUser(prev => ({ ...prev, photos: prev.photos.filter(p => p.id !== photoId) }))
    }
  }

  const adminUpdateOrderStatus = (orderId, newStatus) => {
    setClients(prev => prev.map(client => ({
      ...client,
      orders: client.orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    })))

    // Also update current user if they own the order
    if (user && user.orders?.some(o => o.id === orderId)) {
      setUser(prev => ({
        ...prev,
        orders: prev.orders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      }))
    }
    return { success: true }
  }

  const adminAddOrderUpdate = (clientEmail, orderId, text) => {
    const update = { id: Date.now(), text, date: new Date().toISOString().split('T')[0] }
    setClients(prev => prev.map(c => {
      if (c.email === clientEmail) {
        return {
          ...c,
          orders: c.orders.map(o => o.id === orderId ? { ...o, updates: [update, ...(o.updates || [])] } : o)
        }
      }
      return c
    }))
    if (user && user.email === clientEmail) {
      setUser(prev => ({
        ...prev,
        orders: prev.orders.map(o => o.id === orderId ? { ...o, updates: [update, ...(o.updates || [])] } : o)
      }))
    }
    return { success: true }
  }

  const trackDownload = (clientEmail) => {
    setClients(prev => prev.map(c => 
      c.email === clientEmail ? { ...c, downloadsCount: (c.downloadsCount || 0) + 1 } : c
    ))
  }

  const adminAssignPhotos = (clientEmail, newPhotos) => {
    setClients(prev => prev.map(c => 
      c.email === clientEmail 
        ? { ...c, photos: [...c.photos, ...newPhotos] }
        : c
    ))
    // If the logged in user is the client being updated, update their state too
    if (user && user.email === clientEmail) {
      setUser(prev => ({ ...prev, photos: [...prev.photos, ...newPhotos] }))
    }
    return { success: true }
  }

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }))
  }

  const addOrder = (order) => {
    setUser(prev => ({
      ...prev,
      orders: [order, ...prev.orders]
    }))
  }
  
  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ 
      user, clients, login, signup, logout, updateUser, addOrder, 
      adminCreateClient, adminAssignPhotos, adminDeletePhoto, 
      adminUpdateClientStatus, adminUpdateClientDetails, trackDownload,
      adminSendMessage, adminAddOrderUpdate, adminUpdateOrderStatus, setUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
