import type { Metadata } from "next";
import Link from "next/link";
import { RevealSection } from "@/components/reveal-section";
import { CtaBand } from "@/components/cta-band";
import { strengths, readinessSignals, site } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About | Kelel IT Solution",
  description:
    "Kelel IT Solution is a technology company based in Addis Ababa, Ethiopia, building digital infrastructure for banking, insurance, and enterprise systems.",
};

const principles = [
  {
    num: "01",
    title: "Technology as a business enabler.",
    body: "Technology should make work more reliable, more visible, and easier to scale. That applies to infrastructure, internal systems, and the public digital presence clients use to judge your organization.",
  },
  {
    num: "02",
    title: "Clear. Accountable. Structured.",
    body: "We put leadership contact up front because serious B2B buyers look for accountability. Every engagement has a named contact, a defined scope, and a clear path from first conversation to live delivery.",
  },
  {
    num: "03",
    title: "Africa-rooted by design.",
    body: "We don't apply foreign platform patterns to African realities. Our systems are built for the operational constraints, connectivity conditions, and compliance environments that define African enterprise.",
  },
];

export default function AboutPage() {
  return (
    <main className="stitch-page">

      {/* ── Page Hero ─────────────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-crumbs">
            <Link href="/">Home</Link>
            <span className="page-crumbs-sep">/</span>
            <span>About</span>
          </div>
          <div className="page-hero-grid">
            <div>
              <div className="site-eyebrow" style={{ marginBottom: "24px" }}>
                <span className="site-eyebrow-dot" />
                Addis Ababa · Ethiopian-built · African-scaled
              </div>
              <h1 className="page-title-plain">
                Enterprise technology built for <em>African infrastructure.</em>
              </h1>
              <p className="page-sub">
                Kelel IT Solution designs and delivers production-grade digital infrastructure
                for banking, insurance, and enterprise operations across the continent —
                built in Ethiopia with the operational realities of Africa in mind.
              </p>
            </div>
            <div className="page-meta">
              <div className="page-meta-row">
                <span>Founded</span><span>Addis Ababa, Ethiopia</span>
              </div>
              <div className="page-meta-row">
                <span>Focus</span><span>Financial &amp; Enterprise Systems</span>
              </div>
              <div className="page-meta-row">
                <span>Reach</span><span>5+ African markets</span>
              </div>
              <div className="page-meta-row">
                <span>Delivery model</span><span>4-phase · Accountable</span>
              </div>
              <div className="page-meta-row">
                <span>Leadership contact</span><span>Public · Direct</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Manifesto / Principles ─────────────────────────────────────── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">What We Stand For</div>
          <h2 className="hp-section-title" style={{ marginBottom: "48px" }}>
            A few things we <em>refuse to compromise on.</em>
          </h2>
          <div className="abt-principles">
            {principles.map((p) => (
              <div key={p.num} className="abt-principle stitch-glass">
                <div className="abt-principle-num">{p.num}</div>
                <div>
                  <h3 className="abt-principle-title">{p.title}</h3>
                  <p className="stitch-body" style={{ marginTop: "10px" }}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── Strengths ─────────────────────────────────────────────────── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Why Kelel</div>
          <h2 className="hp-section-title" style={{ marginBottom: "40px" }}>
            What sets us <em>apart.</em>
          </h2>
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

      {/* ── Operational Readiness ─────────────────────────────────────── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Operational Readiness</div>
          <h2 className="hp-section-title" style={{ marginBottom: "40px" }}>
            Built to deliver, respond, <em>and grow.</em>
          </h2>
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

      {/* ── Leadership ────────────────────────────────────────────────── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Leadership</div>
          <h2 className="hp-section-title" style={{ marginBottom: "40px" }}>
            A named contact from <em>day one.</em>
          </h2>
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

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <RevealSection as="div">
        <CtaBand
          kicker="Work with us"
          heading={<>Let&apos;s build something <em>meaningful together.</em></>}
          sub="If your organization needs stronger systems, infrastructure, or digital presence — Kelel is ready to scope, design, and deliver."
          primaryLabel="Start a conversation →"
          primaryHref="/contact"
          ghostLabel="View our work"
          ghostHref="/work"
        />
      </RevealSection>

    </main>
  );
}
