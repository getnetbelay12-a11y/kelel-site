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
            Engineered in Addis · Built for Africa
          </div>

          <h1 className="site-hero-h1">
            <span>Infrastructure</span>
            <span>built for <em>African</em></span>
            <span>operations.</span>
          </h1>

          <div className="site-hero-meta">
            <div className="site-hero-meta-item">
              <span className="site-hero-meta-val">99.9%</span>
              <span className="site-hero-meta-lbl">Uptime target</span>
            </div>
            <div className="site-hero-meta-item">
              <span className="site-hero-meta-val">&lt;45ms</span>
              <span className="site-hero-meta-lbl">Latency</span>
            </div>
            <div className="site-hero-meta-item">
              <span className="site-hero-meta-val">API-first</span>
              <span className="site-hero-meta-lbl">Architecture</span>
            </div>
            <div className="site-hero-meta-item">
              <span className="site-hero-meta-val">24/7</span>
              <span className="site-hero-meta-lbl">Operations</span>
            </div>
          </div>
        </div>

      </div>
      <div className="site-hero-corner-copy">
        <span className="site-hero-corner-kicker">Operational focus</span>
        <p>
          Secure, scalable platforms for banking, insurance, and enterprise teams —
          purpose-built for the realities of African operations.
        </p>
      </div>
      <div className="site-hero-corner-actions">
        <Link href="/#contact" className="site-hero-btn-primary btn-magnetic">
          Start a project →
        </Link>
        <Link href={site.calendlyPlaceholder} className="site-hero-btn-ghost">
          Book a call
        </Link>
      </div>
    </section>
  )
}
