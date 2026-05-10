'use client'

import { useRef } from 'react'
import type { MouseEvent } from 'react'
import Link from 'next/link'

const capabilities = [
  {
    num: '01',
    tag: 'Architecture',
    title: 'Platform Architecture',
    description:
      'End-to-end system design for secure, scalable, production-ready platforms. We design contracts before screens and ship observability from day one.',
    tags: ['Distributed Systems', 'Cloud-Native', 'Security-First'],
    href: '/services',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    num: '02',
    tag: 'Performance',
    title: 'Performance Optimization',
    description:
      'Diagnostics, tuning, and reliability improvement across live production systems — from database query plans to API response chains.',
    tags: ['Sub-50ms Latency', '99.9% Uptime', 'Load Testing'],
    href: '/services',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17 L8 11 L13 14 L21 5" />
        <path d="M16 5 L21 5 L21 10" />
      </svg>
    ),
  },
  {
    num: '03',
    tag: 'Data & AI',
    title: 'Data Infrastructure & AI',
    description:
      'Scalable pipelines, operational analytics, and AI layers that route, predict, and flag anomalies — not demos, real system intelligence deployed in production.',
    tags: ['Real-time Analytics', 'ML in Ops', 'AI-Assisted Workflows'],
    href: '/intelligent-solutions',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="8" ry="2.5" />
        <path d="M4 5 V12 C4 13.5 7.5 14.5 12 14.5 S20 13.5 20 12 V5" />
        <path d="M4 12 V19 C4 20.5 7.5 21.5 12 21.5 S20 20.5 20 19 V12" />
      </svg>
    ),
  },
]

function CapCard({ cap }: { cap: typeof capabilities[number] }) {
  const cardRef = useRef<HTMLElement>(null)

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    cardRef.current?.style.setProperty('--mx', `${x}%`)
    cardRef.current?.style.setProperty('--my', `${y}%`)
  }

  return (
    <Link href={cap.href} className="cap-card-link">
      <article
        ref={cardRef}
        className="cap-card"
        onMouseMove={handleMouseMove}
      >
        <span className="cap-num" aria-hidden="true">{cap.num}</span>
        <div className="cap-icon" aria-hidden="true">{cap.icon}</div>
        <div className="cap-kicker">{cap.tag}</div>
        <h3 className="cap-title">{cap.title}</h3>
        <p className="cap-desc">{cap.description}</p>
        <div className="cap-tags">
          {cap.tags.map((t) => <span key={t} className="cap-tag">{t}</span>)}
        </div>
      </article>
    </Link>
  )
}

export function CapabilitiesSection() {
  return (
    <section className="hp-capabilities">
      <div className="hp-section-inner">
        <div className="hp-section-label">Capabilities</div>
        <h2 className="hp-section-title">
          Three capabilities. One mission: <em>systems that work.</em>
        </h2>
        <p className="hp-section-intro">
          Architecture, performance, and data infrastructure — designed for real African operations, not demos.
        </p>
        <div className="cap-grid">
          {capabilities.map((cap) => (
            <CapCard key={cap.num} cap={cap} />
          ))}
        </div>
      </div>
    </section>
  )
}
