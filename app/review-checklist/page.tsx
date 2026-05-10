import { EvidenceRegister } from "@/components/evidence-register";
import { RevealSection } from "@/components/reveal-section";
import { CtaBand } from "@/components/cta-band";
import type { Metadata } from "next";
import Link from "next/link";
import { reviewChecklist, site } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Review Checklist | Kelel IT Solution",
  description:
    "Use a structured checklist to review Kelel IT Solution's company profile, trust materials, case studies, and readiness assets.",
};

export default function ReviewChecklistPage() {
  return (
    <main className="stitch-page">

      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-crumbs">
            <Link href="/">Home</Link>
            <span className="page-crumbs-sep">/</span>
            <Link href="/resources">Resources</Link>
            <span className="page-crumbs-sep">/</span>
            <span>Review Checklist</span>
          </div>
          <div className="page-hero-grid">
            <div>
              <div className="site-eyebrow page-eyebrow-spaced">
                <span className="site-eyebrow-dot" />
                Review Checklist · Buyers &amp; Partners
              </div>
              <h1 className="page-title-plain">
                A simple checklist for buyers, <em>partners, and reviewers.</em>
              </h1>
              <p className="page-sub">
                A practical order for reviewing Kelel&apos;s formal materials, trust signals,
                capability pages, and next proof needs — before a meeting or proposal discussion.
              </p>
              <div className="page-hero-actions">
                <Link href="/contact" className="site-hero-btn-primary btn-magnetic">Contact Kelel →</Link>
                <Link href="/resources" className="site-hero-btn-ghost">Back to resources</Link>
              </div>
            </div>
            <div className="page-meta">
              <div className="page-meta-row"><span>Review groups</span><span>{reviewChecklist.length} sections</span></div>
              <div className="page-meta-row"><span>Format</span><span>Checklist · Structured</span></div>
              <div className="page-meta-row"><span>Best for</span><span>Procurement · Partnership</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Checklist ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Checklist</div>
          <h2 className="hp-section-title section-title-gap-lg">
            Use this sequence to <em>review the business properly.</em>
          </h2>
          <div className="rc-grid">
            {reviewChecklist.map((group, i) => (
              <div key={group.title} className="rc-card stitch-glass">
                <div className="rc-card-num">0{i + 1}</div>
                <h3 className="rc-card-title">{group.title}</h3>
                <ul className="rc-card-items">
                  {group.items.map((item) => (
                    <li key={item} className="rc-card-item">
                      <span className="rc-check">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── Evidence Register ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Evidence Status</div>
          <h2 className="hp-section-title section-title-gap-lg">
            What is available now <em>versus what is still pending.</em>
          </h2>
          <EvidenceRegister />
        </div>
      </RevealSection>

      {/* ── Contact card ── */}
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
              <p className="stitch-body leader-copy">
                If a reviewer needs clarification during the checklist process, Kelel provides
                direct executive contact for faster coordination.
              </p>
              <div className="abt-leader-contacts">
                <a href={`mailto:${site.email}`} className="abt-contact-link">{site.email}</a>
                <a href={`tel:${site.phone.replaceAll(" ", "")}`} className="abt-contact-link">{site.phone}</a>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ── CTA ── */}
      <RevealSection as="div">
        <CtaBand
          kicker="Download profile"
          heading={<>Start with the <em>company profile.</em></>}
          sub="Use the company profile as the primary formal document when introducing Kelel to buyers, partners, or internal decision-makers."
          primaryLabel="Download PDF →"
          primaryHref="/company-profile"
          ghostLabel="Contact Kelel"
          ghostHref="/contact"
        />
      </RevealSection>

    </main>
  );
}
