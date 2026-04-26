import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useReveal } from '../hooks/useReveal'
import './Store.css'

const STORE_PRODUCTS = [
  // Prints
  { id: 1, title: 'Morning Mist', category: 'Prints', type: 'Landscape', price: 150, image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=85&fit=crop' },
  { id: 2, title: 'The Architect', category: 'Prints', type: 'Architecture', price: 180, image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=85&fit=crop' },
  { id: 3, title: 'Desert Gold', category: 'Prints', type: 'Landscape', price: 165, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=85&fit=crop' },
  
  // Digital
  { id: 4, title: 'Noir Collection (Digital)', category: 'Digital Downloads', type: 'High-Res ZIP', price: 40, image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=85&fit=crop' },
  { id: 5, title: 'Velvet Hour (Digital)', category: 'Digital Downloads', type: 'High-Res ZIP', price: 45, image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=85&fit=crop' },

  // Presets
  { id: 6, title: 'Cinematic Film Presets', category: 'Presets', type: 'Lightroom Pack', price: 25, image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=85&fit=crop' },
  { id: 7, title: 'Golden Hour Presets', category: 'Presets', type: 'Lightroom Pack', price: 25, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=85&fit=crop' },

  // Dresses
  { 
    id: 8, 
    title: 'Clovermade Silk Slip', 
    category: 'Dresses', 
    type: 'Luxury Silk', 
    price: 220, 
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&q=85&fit=crop',
    desc: 'Crafted from 100% pure Mulberry silk. A bias-cut silhouette that effortlessly drapes for a flawless, elegant fit.'
  },
  { 
    id: 9, 
    title: 'The Editor Maxi', 
    category: 'Dresses', 
    type: 'Evening Wear', 
    price: 340, 
    image: 'https://images.unsplash.com/photo-1566206091558-f6224d081831?w=600&q=85&fit=crop',
    desc: 'Structured matte crepe fabric. Features a plunging v-neckline and a high slit, tailored for modern sophistication.'
  },
]

const STORE_CATEGORIES = ['All', 'Prints', 'Digital', 'Dresses']

export default function Store() {
  useReveal()
  const { addItem } = useCart()
  const [toast, setToast] = useState(false)
  const [activeTab, setActiveTab] = useState('All')

  const filteredProducts = activeTab === 'All' 
    ? STORE_PRODUCTS 
    : activeTab === 'Digital' 
      ? STORE_PRODUCTS.filter(p => p.category === 'Digital Downloads' || p.category === 'Presets')
      : STORE_PRODUCTS.filter(p => p.category === activeTab)

  const handleAdd = (product, variant) => {
    addItem(product, variant)
    setToast(true)
    setTimeout(() => setToast(false), 3000)
  }

  return (
    <div className="store-page" style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Toast */}
      <div className={`toast ${toast ? 'show' : ''}`}>
        Added to cart successfully
      </div>

      <section className="page-hero">
        <div className="store-hero-bg">
          <img src="https://images.unsplash.com/photo-1445011083072-b61fccc8a5db?w=1600&q=85&fit=crop" alt="Store hero" />
          <div className="overlay-dark" />
        </div>
        <div className="container page-hero-content">
          <span className="section-label">The Store</span>
          <h1 className="display-lg" style={{ marginTop: 16 }}>Curated Goods</h1>
          <p className="body-lg" style={{ maxWidth: 500, marginTop: 16 }}>
            High-quality prints delivered to your door. Instant download for digital products and presets.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 60 }}>
        <div className="container">
          
          {/* Store Tabs */}
          <div className="store-tabs reveal" style={{ display: 'flex', gap: 16, marginBottom: 40, justifyContent: 'center', flexWrap: 'wrap' }}>
            {STORE_CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveTab(cat)}
                style={{
                  background: 'transparent',
                  border: `1px solid ${activeTab === cat ? 'var(--color-gold)' : 'var(--color-border)'}`,
                  color: activeTab === cat ? 'var(--color-gold)' : 'var(--color-cream)',
                  padding: '8px 24px',
                  borderRadius: '40px',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="store-grid stagger">
            {filteredProducts.map(p => (
              <div key={p.id} className="product-card">
                <div className="product-card-img">
                  <img src={p.image} alt={p.title} loading="lazy" />
                  <div className="overlay-dark" />
                  <div className="product-add-overlay">
                    <div className="product-add-options">
                      {p.category === 'Prints' ? (
                        <>
                          <button onClick={() => handleAdd(p, 'Small')}>
                            <span>Small (12x18")</span>
                            <span>${p.price}</span>
                          </button>
                          <button onClick={() => handleAdd(p, 'Medium')}>
                            <span>Medium (16x24")</span>
                            <span>${(p.price * 1.6).toFixed(0)}</span>
                          </button>
                          <button onClick={() => handleAdd(p, 'Large')}>
                            <span>Large (24x36")</span>
                            <span>${(p.price * 2.4).toFixed(0)}</span>
                          </button>
                        </>
                      ) : p.category === 'Dresses' ? (
                        <>
                          <button onClick={() => handleAdd(p, 'Small')}>
                            <span>Size S</span>
                            <span>${p.price}</span>
                          </button>
                          <button onClick={() => handleAdd(p, 'Medium')}>
                            <span>Size M</span>
                            <span>${p.price}</span>
                          </button>
                          <button onClick={() => handleAdd(p, 'Large')}>
                            <span>Size L</span>
                            <span>${p.price}</span>
                          </button>
                          <button onClick={() => handleAdd(p, 'X-Large')}>
                            <span>Size XL</span>
                            <span>${p.price}</span>
                          </button>
                        </>
                      ) : (
                        <button onClick={() => handleAdd(p, p.category === 'Presets' ? 'Preset' : 'Digital')} style={{ padding: '16px', background: 'var(--color-gold)', color: '#000', border: 'none', fontWeight: 600 }}>
                          Buy Now — ${p.price}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="product-card-info">
                  <div>
                    <h3 className="serif">{p.title}</h3>
                    <span className="body-sm">{p.type}</span>
                    {p.desc && (
                      <p className="body-sm" style={{ marginTop: 8, fontSize: '0.8rem', lineHeight: 1.4 }}>
                        {p.desc}
                      </p>
                    )}
                  </div>
                  <span className="serif price-label">
                    {p.category === 'Prints' ? `From $${p.price}` : `$${p.price}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="section" style={{ background: 'var(--color-charcoal)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="grid-2 align-center reveal">
            <div>
              <span className="section-label">Quality & Craft</span>
              <h2 className="display-md" style={{ marginTop: 16, marginBottom: 24 }}>Archival Quality</h2>
              <p className="body-lg" style={{ marginBottom: 16 }}>
                Every print is produced on 310gsm Hahnemühle Photo Rag — a museum-grade, 100% cotton paper with a smooth surface texture. 
              </p>
              <p className="body-lg">
                We use archival pigment inks designed to last over 100 years without fading. Each piece arrives accompanied by a certificate of authenticity.
              </p>
            </div>
            <div className="quality-img">
               <img src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=800&q=85&fit=crop" alt="Print Quality" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
