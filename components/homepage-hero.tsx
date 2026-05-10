import Link from 'next/link'
import { site } from '@/lib/site-content'
import { GlobeLoader } from '@/components/globe-loader'

export function HomepageHero() {
  return (
    <section className="site-hero" id="home">
      <div className="site-hero-inner">
        {/* Left column */}
        <div className="site-hero-copy">
          <div className="site-eyebrow">
            <span className="site-eyebrow-dot" />
            Engineered in Addis · Built for Africa
          </div>

          <h1 className="site-hero-h1">
            Infrastructure built for <em>African</em> operations.
          </h1>

          <p className="site-hero-sub">
            Secure, scalable platforms for banking, insurance, and enterprise teams — purpose-built for the realities of African operations.
          </p>

          <div className="site-hero-actions">
            <Link href="/#contact" className="site-hero-btn-primary btn-magnetic">
              Start a project →
            </Link>
            <Link href={site.calendlyPlaceholder} className="site-hero-btn-ghost">
              Book a call
            </Link>
          </div>

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

        {/* Right column — 3D globe */}
        <div className="site-hero-right">
          <GlobeLoader />
        </div>
      </div>
    </section>
  )
}
