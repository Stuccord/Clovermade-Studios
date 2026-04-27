import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, X, Maximize2 } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { usePortfolio } from '../context/PortfolioContext'
import { useCMS } from '../context/CMSContext'
import './Portfolio.css'

const CATEGORIES = ['All', 'Portrait', 'Wedding', 'Event']

export default function Portfolio() {
  useReveal()
  const { portfolio: WORKS } = usePortfolio()
  const { content } = useCMS()
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = active === 'All' ? WORKS : WORKS.filter(w => w.category === active)

  return (
    <div className="portfolio-page" style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Hero */}
      <section className="page-hero portfolio-hero">
        <div className="portfolio-hero-bg">
          <img src={content.portfolio?.heroImage || "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=85&fit=crop"} alt="Portfolio hero" />
          <div className="overlay-dark" />
        </div>
        <div className="container page-hero-content">
          <span className="section-label">Our Work</span>
          <h1 className="display-lg" style={{ marginTop: 16 }}>{content.portfolio?.heroTitle || 'Portfolio'}</h1>
          <p className="body-lg" style={{ maxWidth: 440, marginTop: 16 }}>
            {content.portfolio?.heroSubtitle || 'A curated collection of moments, stories, and visual art spanning five years of craft.'}
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="portfolio-filter-bar">
        <div className="container">
          <div className="filter-pills">
            {CATEGORIES.map(c => (
              <button
                key={c}
                className={`filter-pill ${active === c ? 'active' : ''}`}
                onClick={() => setActive(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <span className="body-sm">{filtered.length} works</span>
        </div>
      </section>

      {/* Masonry grid */}
      <section className="section">
        <div className="container">
          <div className="portfolio-grid stagger">
            {filtered.map(work => (
              <div
                key={work.id}
                className="portfolio-item"
                onClick={() => setLightbox(work)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setLightbox(work)}
              >
                <div className="portfolio-item-img">
                  <img src={work.mainImage} alt={work.title} loading="lazy" />
                  <div className="portfolio-item-hover">
                    <span className="serif">{work.title}</span>
                    <Maximize2 size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ textAlign: 'center', paddingTop: 0 }}>
        <div className="container reveal">
          <div className="divider divider-center" />
          <h2 className="display-md" style={{ marginBottom: 20 }}>Ready to Add to This Collection?</h2>
          <p className="body-lg" style={{ maxWidth: 460, margin: '0 auto 36px' }}>
            Book your session today and let us craft something unforgettable for you.
          </p>
          <Link to="/contact" className="btn btn-primary">
            Book a Session <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">
            <X size={24} />
          </button>
          <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
            <img src={lightbox.mainImage} alt={lightbox.title} />
            <div className="lightbox-caption">
              <span className="tag tag-gold" style={{ marginBottom: 8, display: 'inline-block' }}>{lightbox.category}</span>
              <h3 className="serif" style={{ fontSize: '1.8rem' }}>{lightbox.title}</h3>
              <p className="body-sm" style={{ marginTop: 8 }}>{lightbox.description}</p>
              {lightbox.images?.length > 0 && (
                <div className="flex gap-12" style={{ marginTop: 24, overflowX: 'auto', paddingBottom: 8 }}>
                  {lightbox.images.map((img, idx) => (
                    <img key={idx} src={img} alt="" style={{ height: 80, borderRadius: 4 }} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
