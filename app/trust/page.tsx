import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceRegister } from "@/components/evidence-register";
import { ProofGallery } from "@/components/proof-gallery";
import { RevealSection } from "@/components/reveal-section";
import { CtaBand } from "@/components/cta-band";
import { PageVisualStage } from "@/components/page-visual-stage";
import {
  complianceReadiness,
  futureCredentials,
  trustCredentials,
  trustFAQs,
  site,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Trust | Kelel IT Solution",
  description:
    "Review trust signals, company profile readiness, inquiry handling, and formal credibility structure for Kelel IT Solution.",
};

export default function TrustPage() {
  return (
    <main className="stitch-page">
      <section className="page-hero trust-hero">
        <div className="page-hero-inner">
          <div className="page-crumbs">
            <Link href="/">Home</Link>
            <span className="page-crumbs-sep">/</span>
            <span>Trust</span>
          </div>
          <div className="page-hero-grid">
            <div>
              <div className="site-eyebrow page-eyebrow-spaced">
                <span className="site-eyebrow-dot" />
                Trust and Assurance · Procurement Readiness
              </div>
              <h1 className="page-title-plain">
                Trust should be <em>visible, structured, and reviewable.</em>
              </h1>
              <p className="page-sub">
                This page gathers the business signals, formal materials, readiness points,
                and future credential space that make Kelel look more accountable in a first
                procurement, partner, or internal review conversation.
              </p>
              <div className="page-hero-actions">
                <Link href="/company-profile" className="site-hero-btn-primary btn-magnetic">
                  Review company profile →
                </Link>
                <Link href="/resources" className="site-hero-btn-ghost">
                  Open resource center
                </Link>
              </div>
            </div>
            <div className="trust-hero-stack">
              <PageVisualStage
                className="page-visual-stage--trust"
                badge="Review materials live"
                badgeWithPulse
                cardKicker="Visible signals"
                cardTitle={`${trustCredentials.length} trust layers`}
              />
              <div className="page-meta">
                <div className="page-meta-row">
                  <span>Current signals</span>
                  <span>{trustCredentials.length} visible now</span>
                </div>
                <div className="page-meta-row">
                  <span>Readiness points</span>
                  <span>{complianceReadiness.length} operational checks</span>
                </div>
                <div className="page-meta-row">
                  <span>Future credentials</span>
                  <span>{futureCredentials.length} prepared slots</span>
                </div>
                <div className="page-meta-row">
                  <span>Official contact</span>
                  <span>{site.contactPerson}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Current Trust Signals</div>
          <h2 className="hp-section-title section-title-gap-lg">
            What Kelel can already <em>show today.</em>
          </h2>
          <div className="trust-grid">
            {trustCredentials.map((item) => (
              <div key={item.title} className="trust-card stitch-glass">
                <div className="trust-card-top">
                  <span className="status-pill status-contacted">{item.status}</span>
                </div>
                <h3 className="trust-card-title">{item.title}</h3>
                <p className="trust-card-copy">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Readiness</div>
          <h2 className="hp-section-title section-title-gap-lg">
            Operational and presentation points that improve <em>buyer confidence.</em>
          </h2>
          <div className="trust-readiness-grid">
            {complianceReadiness.map((item, index) => (
              <div key={item} className="trust-readiness-card stitch-glass">
                <span className="trust-readiness-num">0{index + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Evidence Register</div>
          <h2 className="hp-section-title section-title-gap-lg">
            Current proof separated cleanly from <em>what is still pending.</em>
          </h2>
          <EvidenceRegister />
        </div>
      </RevealSection>

      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Formal Assets</div>
          <h2 className="hp-section-title section-title-gap-lg">
            The strongest trust materials are <em>visible inside the site.</em>
          </h2>
          <ProofGallery />
        </div>
      </RevealSection>

      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="trust-dual-grid">
            <div className="trust-contact-card stitch-glass">
              <div className="hp-section-label">Official Contact</div>
              <h2 className="hp-section-title section-title-gap-md">
                Formal communication with a <em>visible responsible person.</em>
              </h2>
              <p className="stitch-body leader-copy">
                For project discussions, partner conversations, and review coordination,
                Kelel exposes direct executive contact instead of routing serious inquiries
                into an anonymous queue.
              </p>
              <div className="abt-leader-contacts">
                <a href={`mailto:${site.email}`} className="abt-contact-link">
                  {site.email}
                </a>
                <a href={`tel:${site.phone.replaceAll(" ", "")}`} className="abt-contact-link">
                  {site.phone}
                </a>
              </div>
            </div>
            <div className="trust-future-card stitch-glass">
              <div className="hp-section-label">Prepared Next</div>
              <h2 className="hp-section-title section-title-gap-md">
                The page is ready to carry stronger <em>third-party proof.</em>
              </h2>
              <div className="trust-future-list">
                {futureCredentials.map((item) => (
                  <div key={item.title} className="trust-future-item">
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Questions</div>
          <h2 className="hp-section-title section-title-gap-lg">
            How this page supports <em>buyer confidence.</em>
          </h2>
          <div className="trust-faq-list">
            {trustFAQs.map((item) => (
              <div key={item.question} className="trust-faq-item stitch-glass">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection as="div">
        <CtaBand
          kicker="Formal review"
          heading={<>Need more serious <em>review material?</em></>}
          sub="Use the resource center, company profile, and contact route together when a buyer, partner, or internal stakeholder needs a stronger first review package."
          primaryLabel="Open resource center →"
          primaryHref="/resources"
          ghostLabel="Contact Kelel"
          ghostHref="/contact"
        />
      </RevealSection>
    </main>
  );
}
