import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useReveal } from '../hooks/useReveal'
import { useCMS } from '../context/CMSContext'
import { Filter, Ruler } from 'lucide-react'
import './Store.css'

const CLOTHING_PRODUCTS = [
  { 
    id: 101, 
    title: 'Clovermade Studio Tee', 
    category: 'Clothing', 
    type: 'T-Shirt', 
    price: 45, 
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&q=85&fit=crop',
    colors: ['Black', 'White', 'Cream'],
    sizes: ['S', 'M', 'L', 'XL'],
    desc: 'Heavyweight organic cotton. Oversized fit with high-density screen print.'
  },
  { 
    id: 102, 
    title: 'Archival Hoodie', 
    category: 'Clothing', 
    type: 'Hoodie', 
    price: 85, 
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=85&fit=crop',
    colors: ['Black', 'Slate'],
    sizes: ['M', 'L', 'XL'],
    desc: '450GSM French Terry. Double-lined hood and drop shoulder silhouette.'
  },
  { 
    id: 103, 
    title: 'Minimalist Tote', 
    category: 'Clothing', 
    type: 'Accessory', 
    price: 25, 
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=85&fit=crop',
    colors: ['Natural'],
    sizes: ['OS'],
    desc: 'Durable canvas tote with internal pocket and reinforced stitching.'
  },
  { 
    id: 104, 
    title: 'Studio Cap', 
    category: 'Clothing', 
    type: 'Accessory', 
    price: 35, 
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=85&fit=crop',
    colors: ['Black', 'Navy'],
    sizes: ['OS'],
    desc: '6-panel dad hat with embroidered logo and brass hardware.'
  }
]

export default function Clothing() {
  useReveal()
  const { content } = useCMS()
  const { addItem } = useCart()
  const [toast, setToast] = useState(false)
  const [filter, setFilter] = useState({ size: 'All', color: 'All', type: 'All' })

  const filtered = CLOTHING_PRODUCTS.filter(p => {
    return (filter.size === 'All' || p.sizes.includes(filter.size)) &&
           (filter.color === 'All' || p.colors.includes(filter.color)) &&
           (filter.type === 'All' || p.type === filter.type)
  })

  const handleAdd = (product, variant) => {
    addItem(product, variant)
    setToast(true)
    setTimeout(() => setToast(false), 3000)
  }

  return (
    <div className="store-page" style={{ paddingTop: 'var(--nav-h)' }}>
      <div className={`toast ${toast ? 'show' : ''}`}>Added to cart</div>

      <section className="page-hero">
        <div className="store-hero-bg">
          <img src={content.clothing?.heroImage || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=85&fit=crop"} alt="Clothing hero" />
          <div className="overlay-dark" />
        </div>
        <div className="container page-hero-content">
          <span className="section-label">Apparel</span>
          <h1 className="display-lg" style={{ marginTop: 16 }}>{content.clothing?.heroTitle || 'Clothing'}</h1>
          <p className="body-lg" style={{ maxWidth: 500, marginTop: 16 }}>
            {content.clothing?.heroSubtitle || 'Premium studio wear designed for comfort and longevity.'}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="store-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
            <div className="filters" style={{ display: 'flex', gap: 16 }}>
              <select onChange={(e) => setFilter({...filter, type: e.target.value})} className="filter-select">
                <option value="All">All Types</option>
                <option value="T-Shirt">T-Shirts</option>
                <option value="Hoodie">Hoodies</option>
                <option value="Accessory">Accessories</option>
              </select>
              <select onChange={(e) => setFilter({...filter, size: e.target.value})} className="filter-select">
                <option value="All">All Sizes</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">X-Large</option>
              </select>
            </div>
            
            <a href="#" className="size-guide-link" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <Ruler size={14} /> Size Guide
            </a>
          </div>

          <div className="store-grid stagger">
            {filtered.map(p => (
              <div key={p.id} className="product-card">
                <div className="product-card-img">
                  <img src={p.image} alt={p.title} />
                  <div className="product-add-overlay">
                    <div className="product-add-options">
                      {p.sizes.map(s => (
                        <button key={s} onClick={() => handleAdd(p, s)}>
                          <span>Size {s}</span>
                          <span>${p.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="product-card-info">
                  <div>
                    <h3 className="serif">{p.title}</h3>
                    <span className="body-sm">{p.type} — {p.colors.join(', ')}</span>
                  </div>
                  <span className="serif price-label">${p.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
