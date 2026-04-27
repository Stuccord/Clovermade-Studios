import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { useCMS } from '../context/CMSContext'
import './Services.css'

const SERVICES = [
  {
    id: 'wedding',
    title: 'Wedding Photography',
    desc: 'Your love story is a masterpiece. We capture the stolen glances, the joyful tears, and the quiet intimacy of your sacred day with a cinematic eye, ensuring every fleeting emotion is preserved as a timeless work of art.',
    price: 'From $4,500',
    features: ['8 hours of continuous documentary coverage', 'Second photographer included', 'Complimentary engagement session', 'Timeline planning consultation', '800+ high-res edited images', 'Custom fine art heirloom album'],
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85&fit=crop'
  },
  {
    id: 'portrait',
    title: 'Portrait Sessions',
    desc: 'More than just a photograph—a reflection of your true essence. We use gentle direction and natural light to create an environment where your authentic self shines through, resulting in deeply emotional and striking portraiture.',
    price: 'From $800',
    features: ['2-hour on-location or natural light studio session', 'Gentle posing guidance & mood boarding', 'Multiple wardrobe changes', '50+ high-res meticulously retouched images', 'Private online viewing gallery'],
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=85&fit=crop'
  },
  {
    id: 'events',
    title: 'Event Coverage',
    desc: 'From intimate gatherings to grand celebrations, we document the atmosphere and energy of your events. Our unobtrusive approach captures the candid interactions and profound moments that define the occasion.',
    price: 'From $1,200',
    features: ['4 hours of dynamic event coverage', 'Focus on candid storytelling & atmosphere', 'Fast turnaround for press/social media', '200+ color-graded images', 'Full commercial sharing rights'],
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=85&fit=crop'
  }
]

const TESTIMONIALS = [
  {
    quote: "Working with Clovermade was transcendent. Every image felt like a painting — emotion, light, and story all woven together.",
    name: 'Sofia Marchetti', role: 'Bride, Milano 2024'
  },
  {
    quote: "Our session was incredibly relaxed yet the photos belong in a magazine. The eye for light and narrative is extraordinary.",
    name: 'James Okafor', role: 'Portrait Client'
  },
  {
    quote: "They managed to capture the entire energy of our gala. Every laugh, every tear, perfectly documented. Truly artists.",
    name: 'Anika & Rael Stern', role: 'Event Organizers'
  },
]

export default function Services() {
  useReveal()
  const { content } = useCMS()
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  // Auto-rotate testimonials
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(a => (a + 1) % TESTIMONIALS.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="services-page" style={{ paddingTop: 'var(--nav-h)' }}>
      <section className="page-hero">
        <div className="services-hero-bg">
          <img src={content.services?.heroImage || "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1600&q=85&fit=crop"} alt="Services hero" />
          <div className="overlay-dark" />
        </div>
        <div className="container page-hero-content">
          <span className="section-label">Investment</span>
          <h1 className="display-lg" style={{ marginTop: 16 }}>{content.services?.heroTitle || 'Our Services'}</h1>
          <p className="body-lg" style={{ maxWidth: 460, marginTop: 16 }}>
            {content.services?.heroSubtitle || 'Tailored photographic experiences designed to capture your narrative with cinematic elegance and uncompromising quality.'}
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 80 }}>
        <div className="container">
          <div className="services-stack">
            {SERVICES.map((s, idx) => (
              <div key={s.id} className={`service-detail-row reveal ${idx % 2 !== 0 ? 'reverse' : ''}`}>
                <div className="service-detail-img">
                  <img src={s.image} alt={s.title} loading="lazy" />
                  <div className="overlay-dark" />
                </div>
                <div className="service-detail-content">
                  <h2 className="serif" style={{ fontSize: '2.4rem', color: 'var(--color-cream)', marginBottom: 16 }}>{s.title}</h2>
                  <p className="body-lg" style={{ marginBottom: 32 }}>{s.desc}</p>
                  
                  <div className="service-features">
                    <h4 className="section-label" style={{ marginBottom: 16 }}>Includes</h4>
                    <ul className="gap-16 stack">
                      {s.features.map((f, i) => (
                        <li key={i} className="flex-center" style={{ justifyContent: 'flex-start', gap: 12 }}>
                          <Check size={16} color="var(--color-gold)" />
                          <span className="body-sm" style={{ color: 'var(--color-cream)' }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="service-price-box">
                    <span className="serif" style={{ fontSize: '1.4rem', color: 'var(--color-gold)' }}>{s.price}</span>
                    <Link to="/contact" className="btn btn-outline">Book a Session <ArrowRight size={16}/></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-charcoal)', textAlign: 'center' }}>
        <div className="container reveal">
          <span className="section-label">The Process</span>
          <h2 className="display-md" style={{ marginTop: 16, marginBottom: 48 }}>How We Work</h2>
          
          <div className="grid-3 process-grid">
            <div className="process-step">
              <span className="process-num">01</span>
              <h3 className="serif" style={{ fontSize: '1.4rem', marginBottom: 12 }}>Consultation</h3>
              <p className="body-sm">We begin with a conversation to understand your vision, aesthetic preferences, and the story you want to tell.</p>
            </div>
            <div className="process-step">
              <span className="process-num">02</span>
              <h3 className="serif" style={{ fontSize: '1.4rem', marginBottom: 12 }}>The Session</h3>
              <p className="body-sm">A relaxed, guided experience focused on authentic emotion, beautiful light, and cinematic composition.</p>
            </div>
            <div className="process-step">
              <span className="process-num">03</span>
              <h3 className="serif" style={{ fontSize: '1.4rem', marginBottom: 12 }}>Delivery</h3>
              <p className="body-sm">Images are meticulously color-graded and retouched, delivered in a beautiful private gallery within 3-4 weeks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENT TRUST / TESTIMONIALS ── */}
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
    </div>
  )
}
