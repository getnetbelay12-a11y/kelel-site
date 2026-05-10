import type { Metadata } from "next";
import Link from "next/link";
import { RevealSection } from "@/components/reveal-section";
import { strengths, readinessSignals, site } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About | Kelel IT Solution",
  description:
    "Kelel IT Solution is a technology company based in Addis Ababa, Ethiopia, building digital infrastructure for banking, insurance, and enterprise systems.",
};

export default function AboutPage() {
  return (
    <main className="stitch-page">
      {/* ── Hero ── */}
      <RevealSection className="stitch-hero">
        <div className="stitch-container">
          <span className="stitch-kicker">ABOUT US</span>
          <h1 className="stitch-h1">
            Enterprise technology built<br />for African infrastructure.
          </h1>
          <p className="stitch-body" style={{ maxWidth: "620px" }}>
            Kelel IT Solution is a technology company based in Addis Ababa, Ethiopia.
            We design and deliver production-grade digital infrastructure for banking,
            insurance, and enterprise operations across the continent.
          </p>
        </div>
      </RevealSection>

      {/* ── Story ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="abt-story-grid">
            <div className="abt-story-card stitch-glass">
              <span className="stitch-kicker" style={{ fontSize: "10px", marginBottom: "16px", display: "block" }}>
                WHAT WE STAND FOR
              </span>
              <h3 className="abt-story-title">Technology as a business enabler.</h3>
              <p className="stitch-body" style={{ marginTop: "12px" }}>
                Technology should make work more reliable, more visible, and easier to
                scale. That applies to infrastructure, internal systems, and the public
                digital presence clients use to judge your organization.
              </p>
            </div>
            <div className="abt-story-card stitch-glass">
              <span className="stitch-kicker" style={{ fontSize: "10px", marginBottom: "16px", display: "block" }}>
                HOW WE DELIVER
              </span>
              <h3 className="abt-story-title">Clear. Accountable. Structured.</h3>
              <p className="stitch-body" style={{ marginTop: "12px" }}>
                We put leadership contact up front because serious B2B buyers look for
                accountability. Every engagement has a named contact, a defined scope, and
                a clear path from first conversation to live delivery.
              </p>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ── Strengths ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="stitch-section-header">
            <span className="stitch-kicker">WHY KELEL</span>
            <h2 className="stitch-h2">What sets us apart.</h2>
          </div>
          <div className="stitch-caps-grid">
            {strengths.map((item) => (
              <div key={item.title} className="stitch-cap-card">
                <h3 className="stitch-cap-title">{item.title}</h3>
                <p className="stitch-cap-body">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── Operational readiness ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="stitch-section-header">
            <span className="stitch-kicker">OPERATIONAL READINESS</span>
            <h2 className="stitch-h2">Built to deliver, respond, and grow.</h2>
          </div>
          <div className="stitch-caps-grid">
            {readinessSignals.map((item) => (
              <div key={item.title} className="stitch-cap-card">
                <h3 className="stitch-cap-title">{item.title}</h3>
                <p className="stitch-cap-body">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── Leadership ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="abt-leader-wrap">
            <div className="abt-leader-card stitch-glass">
              <div className="abt-leader-inner">
                <div className="abt-leader-avatar">G</div>
                <div>
                  <div className="abt-leader-name">{site.contactPerson}</div>
                  <div className="abt-leader-role">{site.contactRole}</div>
                </div>
              </div>
              <p className="stitch-body" style={{ marginTop: "20px", marginBottom: "20px" }}>
                Direct contact for partnerships, project discussions, and official business
                communication. All project inquiries route through leadership from day one.
              </p>
              <div className="abt-leader-contacts">
                <a href={`mailto:${site.email}`} className="abt-contact-link">{site.email}</a>
                <a href={`tel:${site.phone.replaceAll(" ", "")}`} className="abt-contact-link">{site.phone}</a>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="abt-contact-link abt-contact-link--wa">
                  WhatsApp →
                </a>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ── CTA ── */}
      <RevealSection className="stitch-cta-section">
        <div className="stitch-container">
          <div className="stitch-cta-glass stitch-glass">
            <h2>Let&apos;s build something meaningful together.</h2>
            <p className="stitch-body">
              If your organization needs stronger systems, infrastructure, or digital
              presence — Kelel is ready to scope, design, and deliver.
            </p>
            <div className="stitch-cta-btns">
              <Link href="/contact" className="stitch-btn-primary">Contact Us</Link>
              <Link href="/work" className="stitch-btn-ghost">View Our Work</Link>
            </div>
          </div>
        </div>
      </RevealSection>
    </main>
  );
}
