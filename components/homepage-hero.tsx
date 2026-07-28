import Link from 'next/link'
import { site } from '@/lib/site-content'
import { AiMotionStage } from '@/components/ai-motion-stage'

export function HomepageHero() {
  return (
    <section className="site-hero" id="home">
      <div className="site-hero-motion">
        <AiMotionStage />
      </div>
      <div className="site-hero-inner">
        <div className="site-hero-copy site-hero-copy--center">
          <div className="site-eyebrow">
            <span className="site-eyebrow-dot" />
            Remote-first delivery · Serving businesses internationally
          </div>

          <h1 className="site-hero-h1">
            <span>IT Solutions</span>
            <span>for Growing</span>
            <span><em>Businesses.</em></span>
          </h1>

          <div className="site-hero-meta">
            <div className="site-hero-meta-item">
              <span className="site-hero-meta-val">Websites</span>
              <span className="site-hero-meta-lbl">Leads</span>
            </div>
            <div className="site-hero-meta-item">
              <span className="site-hero-meta-val">Software</span>
              <span className="site-hero-meta-lbl">Systems</span>
            </div>
            <div className="site-hero-meta-item">
              <span className="site-hero-meta-val">MongoDB</span>
              <span className="site-hero-meta-lbl">Consulting</span>
            </div>
            <div className="site-hero-meta-item">
              <span className="site-hero-meta-val">Cloud</span>
              <span className="site-hero-meta-lbl">Systems</span>
            </div>
          </div>
        </div>

      </div>
      <div className="site-hero-corner-copy">
        <span className="site-hero-corner-kicker">Operational focus</span>
        <p>
          Websites, software, cloud systems, and digital infrastructure for small
          businesses, service providers, and growing organizations.
        </p>
      </div>
      <div className="site-hero-corner-actions">
        <Link href="/#contact" className="site-hero-btn-primary btn-magnetic">
          Request a Consultation →
        </Link>
        <Link href={site.calendlyPlaceholder} className="site-hero-btn-ghost">
          Book a call
        </Link>
      </div>
    </section>
  )
}
