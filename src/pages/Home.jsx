import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, X } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { useCMS } from '../context/CMSContext'
import './Home.css'

const HERO_SLIDES = [
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1800&q=85&fit=crop',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=1800&q=85&fit=crop',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1800&q=85&fit=crop'
]

const GALLERY_CATEGORIES = ['All', 'Weddings', 'Portraits', 'Events', 'Lifestyle']

const GALLERY_ITEMS = [
  { id: 101, category: 'Weddings', title: 'The Promise', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85&fit=crop', size: 'wide' },
  { id: 102, category: 'Portraits', title: 'Quiet Light', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=85&fit=crop', size: 'tall' },
  { id: 103, category: 'Events', title: 'Midnight Gala', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=85&fit=crop', size: 'normal' },
  { id: 104, category: 'Lifestyle', title: 'Morning Coffee', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=85&fit=crop', size: 'normal' },
  { id: 105, category: 'Weddings', title: 'First Dance', image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=85&fit=crop', size: 'tall' },
  { id: 106, category: 'Portraits', title: 'In Bloom', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=85&fit=crop', size: 'wide' },
]

const STATS = [
  { value: '12+', label: 'Years of Experience' },
  { value: '2,400+', label: 'Sessions Completed' },
  { value: '38', label: 'International Awards' },
  { value: '100%', label: 'Client Satisfaction' },
]

const TESTIMONIALS = [
  {
    quote: "Working with Clovermade was transcendent. Every image felt like a painting — emotion, light, and story all woven together.",
    name: 'Sofia Marchetti', role: 'Bride, Milano 2024'
  },
  {
    quote: "Our editorial shoot exceeded every expectation. The photographer's eye for light and narrative is extraordinary.",
    name: 'James Okafor', role: 'Creative Director, Vogue Africa'
  },
  {
    quote: "The prints we ordered are museum-worthy. We have them framed throughout our home and receive compliments constantly.",
    name: 'Anika & Rael Stern', role: 'Print Store Clients'
  },
]

export default function Home() {
  useReveal()
  const { content } = useCMS()
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [activeGalleryTab, setActiveGalleryTab] = useState('All')
  const [lightboxImg, setLightboxImg] = useState(null)
  const parallaxRef = useRef(null)

  const filteredGallery = activeGalleryTab === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeGalleryTab)

  // Parallax on hero image
  useEffect(() => {
    const onScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.28}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Auto-rotate hero slides
  useEffect(() => {
    const s = setInterval(() => setActiveSlide(a => (a + 1) % HERO_SLIDES.length), 6000)
    return () => clearInterval(s)
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(a => (a + 1) % TESTIMONIALS.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="home">

      {/* ── HERO ── */}
      <section className="hero" id="hero">
        <div className="hero-bg" ref={parallaxRef}>
          {HERO_SLIDES.map((slide, idx) => {
            const slideImg = idx === 0 && content.home?.heroImage ? content.home.heroImage : slide;
            return (
              <img
                key={idx}
                src={slideImg}
                alt="Cinematic photography hero"
                className={`hero-slide ${idx === activeSlide ? 'active' : ''}`}
                onLoad={() => { if (idx === 0) setHeroLoaded(true) }}
              />
            )
          })}
        </div>
        <div className="hero-overlay" />

        <div className="container hero-content">
          <div className={`hero-text ${heroLoaded ? 'loaded' : ''}`}>
            <span className="section-label" style={{ color: 'var(--color-gold)', marginBottom: 24, display: 'block' }}>
              Fine Art Photography
            </span>
            <h1 className="display-xl hero-headline" style={{ fontSize: 'clamp(2.8rem, 6vw, 6rem)' }}>
              {content.home.heroTitle}
            </h1>
            <p className="hero-sub body-lg">
              {content.home.heroSubtitle}
            </p>
            <div className="hero-actions">
              <Link to="/portfolio" className="btn btn-primary">
                View Portfolio <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Book a Session
              </Link>
            </div>
          </div>
        </div>

        <a href="#featured" className="scroll-indicator" aria-label="Scroll down">
          <span className="body-sm">Scroll</span>
          <ArrowDown size={14} className="bounce" />
        </a>
      </section>

      {/* ── STUNNING PORTFOLIO GALLERY ── */}
      <section className="section" id="featured" style={{ paddingTop: 120 }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Selected Work</span>
            <h2 className="display-md" style={{ marginTop: 16, maxWidth: 480 }}>
              Stories Told in Light & Shadow
            </h2>
            <div className="divider" />
          </div>

          <div className="home-filter-pills reveal">
            {GALLERY_CATEGORIES.map(c => (
              <button
                key={c}
                className={`home-filter-pill ${activeGalleryTab === c ? 'active' : ''}`}
                onClick={() => setActiveGalleryTab(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="home-gallery-grid stagger">
            {filteredGallery.map(item => (
              <div 
                key={item.id} 
                className={`home-gallery-item ${item.size}`}
                onClick={() => setLightboxImg(item)}
              >
                <div className="home-gallery-img">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div className="home-gallery-overlay">
                    <span className="tag tag-gold" style={{ marginBottom: 8, display: 'inline-block' }}>{item.category}</span>
                    <h3 className="serif" style={{ fontSize: '1.4rem', color: 'var(--color-cream)' }}>{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ textAlign: 'center', marginTop: 56 }}>
            <Link to="/portfolio" className="btn btn-outline">
              View Full Gallery <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section className="stats-band">
        <div className="container">
          <div className="stats-grid stagger">
            {STATS.map(s => (
              <div key={s.label} className="stat-item">
                <span className="stat-value serif">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY / FULLSCREEN ── */}
      <section className="philosophy-section">
        <div className="philosophy-bg">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=85&fit=crop"
            alt="Photography philosophy"
            loading="lazy"
          />
          <div className="overlay-dark" />
        </div>
        <div className="container philosophy-content reveal">
          <span className="section-label">Our Philosophy</span>
          <blockquote className="philosophy-quote">
            "Photography is the pause between heartbeats—<br />
            where the world holds still, and truth reveals itself."
          </blockquote>
          <div className="divider" />
          <Link to="/about" className="btn-ghost">Discover Our Story</Link>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section className="section">
        <div className="container">
          <div className="services-header reveal">
            <div className="stack gap-16">
              <span className="section-label">What We Offer</span>
              <h2 className="display-md">Crafted For Every Moment</h2>
            </div>
            <Link to="/services" className="btn-ghost hide-mobile">View All Services</Link>
          </div>

          <div className="services-list">
            {[
              { num: '01', title: 'Portrait Sessions', desc: 'Intimate, artful portraits that reveal character and depth beyond the surface.' },
              { num: '02', title: 'Wedding Photography', desc: 'Cinematic storytelling of your most sacred day, preserved in timeless imagery.' },
              { num: '03', title: 'Editorial & Fashion', desc: 'High-concept visuals for brands, magazines, and creative campaigns.' },
              { num: '04', title: 'Fine Art Prints', desc: 'Museum-quality prints on archival paper, delivered to your door.' },
            ].map(s => (
              <div key={s.num} className="service-row reveal">
                <span className="service-num">{s.num}</span>
                <div className="service-body">
                  <h3 className="service-title">{s.title}</h3>
                  <p className="body-sm service-desc">{s.desc}</p>
                </div>
                <Link to="/services" className="service-arrow" aria-label={`Learn more about ${s.title}`}>
                  <ArrowRight size={20} />
                </Link>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ textAlign: 'center', marginTop: 16 }}>
            <Link to="/services" className="btn btn-outline">
              Explore Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRINT STORE TEASER ── */}
      <section className="store-teaser section">
        <div className="container">
          <div className="store-teaser-inner">
            <div className="store-teaser-images stagger">
              <div className="store-img store-img-1">
                <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=85&fit=crop" alt="Print 1" loading="lazy" />
              </div>
              <div className="store-img store-img-2">
                <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=85&fit=crop" alt="Print 2" loading="lazy" />
              </div>
              <div className="store-img store-img-3">
                <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=85&fit=crop" alt="Print 3" loading="lazy" />
              </div>
            </div>
            <div className="store-teaser-text reveal-right">
              <span className="section-label">Print Store</span>
              <h2 className="display-md" style={{ marginTop: 16, marginBottom: 20 }}>Own a Piece of the Moment</h2>
              <div className="divider" />
              <p className="body-lg">
                Museum-quality archival prints on premium cotton rag paper. Each piece is signed and limited to 25 editions — a collector's treasure for your home.
              </p>
              <div style={{ display: 'flex', gap: 16, marginTop: 36, flexWrap: 'wrap' }}>
                <Link to="/store" className="btn btn-primary">Browse Store <ArrowRight size={16} /></Link>
                <Link to="/store" className="btn btn-outline">View Collections</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonial-section section">
        <div className="container">
          <div className="testimonial-inner reveal">
            <span className="section-label" style={{ textAlign: 'center', display: 'block' }}>Client Stories</span>
            <div className="testimonial-carousel">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`testimonial-slide ${i === activeTestimonial ? 'active' : ''}`}>
                  <blockquote className="testimonial-quote">"{t.quote}"</blockquote>
                  <div className="testimonial-author">
                    <span className="divider-center divider" />
                    <p className="testimonial-name">{t.name}</p>
                    <p className="body-sm">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="testimonial-dots">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(i)}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-bg">
          <img
            src="https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?w=1600&q=85&fit=crop"
            alt="Book a session"
            loading="lazy"
          />
          <div className="overlay-dark" />
        </div>
        <div className="container cta-content reveal">
          <span className="section-label">Ready to Begin?</span>
          <h2 className="display-lg" style={{ marginTop: 20, marginBottom: 12 }}>
            Let's Create<br />Something Beautiful
          </h2>
          <p className="body-lg" style={{ maxWidth: 480, margin: '0 auto 40px' }}>
            Every great photograph starts with a conversation. Tell us your vision and we'll make it timeless.
          </p>
          <Link to="/contact" className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
            Start Your Booking <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightboxImg && (
        <div className="home-lightbox" onClick={() => setLightboxImg(null)}>
          <button className="home-lightbox-close" onClick={() => setLightboxImg(null)} aria-label="Close">
            <X size={24} />
          </button>
          <div className="home-lightbox-inner" onClick={e => e.stopPropagation()}>
            <img src={lightboxImg.image.replace('w=800', 'w=1600')} alt={lightboxImg.title} />
            <div className="home-lightbox-caption">
              <span className="tag tag-gold" style={{ marginBottom: 8, display: 'inline-block' }}>{lightboxImg.category}</span>
              <h3 className="serif" style={{ fontSize: '1.8rem', color: 'var(--color-cream)' }}>{lightboxImg.title}</h3>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
