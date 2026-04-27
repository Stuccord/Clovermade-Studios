import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useReveal } from '../hooks/useReveal'
import { useCMS } from '../context/CMSContext'
import { Download, FileText, Shield, Monitor } from 'lucide-react'
import './Store.css'

const DIGITAL_PRODUCTS = [
  { 
    id: 201, 
    title: 'Editorial Preset Pack', 
    type: 'Lightroom Presets', 
    price: 35, 
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=85&fit=crop',
    specs: {
      resolution: 'N/A',
      format: 'XMP / DNG',
      compatibility: 'LR Classic & Mobile',
      license: 'Personal / Commercial'
    },
    desc: '12 high-fidelity presets designed for fashion and editorial photography.'
  },
  { 
    id: 202, 
    title: 'Texture Collection V1', 
    type: 'Asset Pack', 
    price: 25, 
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&q=85&fit=crop',
    specs: {
      resolution: '8000px+',
      format: 'JPG / PNG',
      compatibility: 'Universal',
      license: 'Personal / Commercial'
    },
    desc: '50+ high-resolution film grain and paper textures for digital art.'
  },
  { 
    id: 203, 
    title: 'Portfolio Template', 
    type: 'Framer Template', 
    price: 65, 
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=85&fit=crop',
    specs: {
      resolution: 'Responsive',
      format: 'Framer Remix',
      compatibility: 'Framer',
      license: 'Single Site'
    },
    desc: 'Clean, minimalist portfolio template for designers and photographers.'
  }
]

export default function DigitalAssets() {
  useReveal()
  const { content } = useCMS()
  const { addItem } = useCart()
  const [toast, setToast] = useState(false)

  const handleAdd = (product) => {
    addItem(product, 'Digital Download')
    setToast(true)
    setTimeout(() => setToast(false), 3000)
  }

  return (
    <div className="store-page" style={{ paddingTop: 'var(--nav-h)' }}>
      <div className={`toast ${toast ? 'show' : ''}`}>Added to cart</div>

      <section className="page-hero">
        <div className="store-hero-bg">
          <img src={content.digitalAssets?.heroImage || "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1600&q=85&fit=crop"} alt="Digital hero" />
          <div className="overlay-dark" />
        </div>
        <div className="container page-hero-content">
          <span className="section-label">Resources</span>
          <h1 className="display-lg" style={{ marginTop: 16 }}>{content.digitalAssets?.heroTitle || 'Digital Assets'}</h1>
          <p className="body-lg" style={{ maxWidth: 500, marginTop: 16 }}>
            {content.digitalAssets?.heroSubtitle || 'Professional tools and resources to elevate your creative workflow.'}
          </p>
          <div style={{ display: 'flex', gap: 24, marginTop: 32 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem' }}>
               <Download size={16} color="var(--color-gold)" /> Instant Download
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem' }}>
               <Shield size={16} color="var(--color-gold)" /> Secure Payment
             </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="store-grid stagger">
            {DIGITAL_PRODUCTS.map(p => (
              <div key={p.id} className="product-card">
                <div className="product-card-img">
                  <img src={p.image} alt={p.title} />
                  <div className="product-add-overlay">
                    <button 
                      onClick={() => handleAdd(p)}
                      style={{ 
                        background: 'var(--color-gold)', 
                        color: '#000', 
                        padding: '16px 32px', 
                        border: 'none', 
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                      }}
                    >
                      Buy Now — ${p.price}
                    </button>
                  </div>
                </div>
                <div className="product-card-info" style={{ flexDirection: 'column', gap: 16 }}>
                  <div>
                    <h3 className="serif" style={{ fontSize: '1.4rem' }}>{p.title}</h3>
                    <span className="body-sm" style={{ color: 'var(--color-gold)' }}>{p.type}</span>
                  </div>
                  
                  <div className="specs-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: '100%' }}>
                    <div className="spec-item">
                      <span className="body-xs" style={{ opacity: 0.5 }}>Format</span>
                      <p className="body-sm">{p.specs.format}</p>
                    </div>
                    <div className="spec-item">
                      <span className="body-xs" style={{ opacity: 0.5 }}>Compatibility</span>
                      <p className="body-sm">{p.specs.compatibility}</p>
                    </div>
                    <div className="spec-item">
                      <span className="body-xs" style={{ opacity: 0.5 }}>Resolution</span>
                      <p className="body-sm">{p.specs.resolution}</p>
                    </div>
                    <div className="spec-item">
                      <span className="body-xs" style={{ opacity: 0.5 }}>License</span>
                      <p className="body-sm">{p.specs.license}</p>
                    </div>
                  </div>

                  <p className="body-sm" style={{ opacity: 0.8 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
