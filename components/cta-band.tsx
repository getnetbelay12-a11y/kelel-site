import type { ReactNode } from 'react'
import Link from 'next/link'
import { site } from '@/lib/site-content'

interface CtaBandProps {
  kicker?: string
  heading: ReactNode
  sub: string
  primaryLabel: string
  primaryHref: string
  ghostLabel?: string
  ghostHref?: string
}

export function CtaBand({
  kicker = 'Start a Project',
  heading,
  sub,
  primaryLabel,
  primaryHref,
  ghostLabel,
  ghostHref,
}: CtaBandProps) {
  return (
    <section className="cta-band">
      <div className="hp-section-inner">
        <div className="cta-band-inner">
          {kicker && <div className="hp-section-label cta-label">{kicker}</div>}
          <h2 className="cta-heading">{heading}</h2>
          <p className="cta-sub">{sub}</p>
          <div className="cta-actions">
            <Link href={primaryHref} className="site-hero-btn-primary btn-magnetic">
              {primaryLabel}
            </Link>
            {ghostLabel && ghostHref && (
              <Link href={ghostHref} className="site-hero-btn-ghost">
                {ghostLabel}
              </Link>
            )}
          </div>
          <div className="cta-contact-row">
            <a href={`mailto:${site.email}`} className="cta-contact-link">{site.email}</a>
            <span className="cta-contact-sep">·</span>
            <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="cta-contact-link">{site.phone}</a>
            <span className="cta-contact-sep">·</span>
            <span className="cta-contact-text">Bole Subcity, Addis Ababa</span>
          </div>
        </div>
      </div>
    </section>
  )
}
