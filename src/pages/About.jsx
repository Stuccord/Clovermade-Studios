import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { useCMS } from '../context/CMSContext'
import './About.css'

export default function About() {
  useReveal()
  const { content } = useCMS()

  return (
    <div className="about-page" style={{ paddingTop: 'var(--nav-h)' }}>
      <section className="page-hero">
        <div className="about-hero-bg">
          <img src={content.about?.heroImage || "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1600&q=85&fit=crop"} alt="About hero" />
          <div className="overlay-dark" />
        </div>
        <div className="container page-hero-content">
          <span className="section-label">Our Story</span>
          <h1 className="display-lg" style={{ marginTop: 16 }}>{content.about?.title || 'The Story Behind the Lens'}</h1>
          {content.about?.description && (
            <p className="body-lg" style={{ maxWidth: 600, marginTop: 16 }}>
              {content.about?.description}
            </p>
          )}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 100 }}>
        <div className="container">
          <div className="grid-2 gap-48 align-center reveal">
            <div className="about-text stack gap-24">
              <span className="section-label">Brand Story</span>
              <h2 className="serif" style={{ fontSize: '2.5rem', color: 'var(--color-cream)', lineHeight: 1.2 }}>
                Hello, I'm Mathias. I believe that every fleeting moment carries a profound emotional weight.
              </h2>
              <p className="body-lg">
                My journey began over a decade ago with a simple fascination for how light shapes our world. This quickly evolved into a lifelong obsession with storytelling through a camera lens. As my career blossomed, so did my creative vision. I realized that the fabrics we wear—the way a dress flows or catches the wind—are intrinsic to the stories we tell.
              </p>
              <p className="body-lg">
                This realization birthed Clovermade: a hybrid studio where cinematic photography meets bespoke fashion design. We don't just document moments; we craft the entire aesthetic experience, ensuring that your memories and your attire are both timeless masterpieces.
              </p>
              <div className="divider" style={{ margin: '16px 0' }} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/John_Hancock_Signature.svg" alt="Signature" style={{ height: 60, width: 'auto', filter: 'invert(1) opacity(0.5)' }} />
            </div>
            
            <div className="about-images stagger">
              <div className="about-img-main">
                <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=85&fit=crop" alt="Mathias photographing" />
              </div>
              <div className="about-img-sub">
                <img src="https://images.unsplash.com/photo-1516961642265-531546e84af2?w=500&q=85&fit=crop" alt="Camera gear" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-charcoal)' }}>
        <div className="container">
          <div className="grid-2 gap-48 reveal">
            <div className="stack gap-24">
              <span className="section-label">Vision & Mission</span>
              <h2 className="serif" style={{ fontSize: '2rem', color: 'var(--color-gold)' }}>Crafting Legacies</h2>
              <p className="body-lg">
                Our mission is to capture the raw, unscripted beauty of human connection. We strive to create museum-quality imagery and luxury apparel that intertwine seamlessly. 
              </p>
              <p className="body-lg">
                Our vision is to be the premier destination for clients who seek not just a service, but a transformative creative partnership. We want to craft legacies that will be cherished for generations, reminding you not just of what a day looked like, but exactly how it felt.
              </p>
            </div>
            <div className="stack gap-24">
              <span className="section-label">The Creative Process</span>
              <h2 className="serif" style={{ fontSize: '2rem', color: 'var(--color-gold)' }}>From Sketch to Lens</h2>
              <p className="body-lg">
                Every project begins with a conversation. We delve into your unique narrative, drawing inspiration from your personality and dreams. For our photography, this means scouting locations that offer the most dramatic, natural light.
              </p>
              <p className="body-lg">
                For our fashion line, it starts with sourcing the finest silks and sustainable fabrics, sketching silhouettes that flatter and empower. Whether directing an editorial shoot or tailoring a bespoke slip dress, every detail—from the first mood board to the final stitch—is intentional.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section stats-band">
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 60 }}>
            <span className="section-label">Achievements</span>
            <h2 className="display-md" style={{ marginTop: 16 }}>A Decade of Excellence</h2>
          </div>
          <div className="stats-grid stagger">
            <div className="stat-item">
              <span className="stat-value serif">12+</span>
              <span className="stat-label">Years of Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-value serif">400+</span>
              <span className="stat-label">Events Covered</span>
            </div>
            <div className="stat-item">
              <span className="stat-value serif">1000+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
            <div className="stat-item">
              <span className="stat-value serif">38</span>
              <span className="stat-label">International Awards</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-charcoal)' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 60 }}>
            <span className="section-label">The Collective</span>
            <h2 className="display-md" style={{ marginTop: 16 }}>Meet the Team</h2>
          </div>
          
          <div className="team-grid stagger">
            {[
              { 
                name: 'Mathias', 
                role: 'Founder / Photographer', 
                desc: 'The visionary behind Clovermade. Mathias specializes in cinematic storytelling and capturing authentic emotion across weddings and editorial campaigns.',
                img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&q=85&fit=crop' 
              },
              { 
                name: 'Elena Rostova', 
                role: 'Fashion Designer', 
                desc: 'Bringing haute couture aesthetics to our store. Elena designs exclusive luxury pieces, ensuring our apparel perfectly complements our visual brand.',
                img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=85&fit=crop' 
              },
              { 
                name: 'David Okafor', 
                role: 'Lead Editor', 
                desc: 'A master of light and color grading. David meticulously refines every image, giving our portfolio its signature timeless, museum-grade finish.',
                img: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=500&q=85&fit=crop' 
              },
              { 
                name: 'Sarah Jenkins', 
                role: 'Customer Support', 
                desc: 'The heart of our client experience. Sarah ensures seamless communication, timeline planning, and flawless delivery for every project and print order.',
                img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=85&fit=crop' 
              }
            ].map(member => (
              <div key={member.name} className="team-card">
                <div className="team-card-img">
                  <img src={member.img} alt={member.name} loading="lazy" />
                  <div className="overlay-dark" style={{ opacity: 0.5 }} />
                </div>
                <div className="team-card-info">
                  <h3 className="serif" style={{ fontSize: '1.4rem', color: 'var(--color-cream)', marginBottom: 4 }}>{member.name}</h3>
                  <span className="section-label" style={{ fontSize: '0.65rem', marginBottom: 12, display: 'block' }}>{member.role}</span>
                  <p className="body-sm" style={{ color: 'var(--color-muted)', lineHeight: 1.5, fontSize: '0.8rem' }}>
                    {member.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container reveal">
          <h2 className="display-md" style={{ marginBottom: 24 }}>Let's Tell Your Story</h2>
          <Link to="/contact" className="btn btn-primary">
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
