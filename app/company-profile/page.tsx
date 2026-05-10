import { ProofGallery } from "@/components/proof-gallery";
import { RevealSection } from "@/components/reveal-section";
import { CtaBand } from "@/components/cta-band";
import type { Metadata } from "next";
import Link from "next/link";
import {
  assurancePoints,
  projects,
  readinessSignals,
  services,
  site,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Company Profile | Kelel IT Solution",
  description:
    "Preview and download the official Kelel IT Solution company profile with service coverage, readiness points, and leadership contact details.",
};

export default function CompanyProfilePage() {
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
            <span>Company Profile</span>
          </div>
          <div className="page-hero-grid">
            <div>
              <div className="site-eyebrow page-eyebrow-spaced">
                <span className="site-eyebrow-dot" />
                Company Profile · Formal Overview
              </div>
              <h1 className="page-title-plain">
                A formal profile that is easy to preview <em>and easy to share.</em>
              </h1>
              <p className="page-sub">
                Preview Kelel&apos;s company profile online and download as a PDF —
                designed for procurement conversations, partnership outreach, and
                early-stage project discussions.
              </p>
              <div className="page-hero-actions">
                <a href="/downloads/kelel-company-profile.pdf" className="site-hero-btn-primary btn-magnetic" download>
                  Download PDF →
                </a>
                <Link href="/contact" className="site-hero-btn-ghost">Talk to Kelel</Link>
              </div>
            </div>
            <div className="page-meta">
              <div className="page-meta-row"><span>Format</span><span>PDF · Online preview</span></div>
              <div className="page-meta-row"><span>Contents</span><span>Services · Readiness · Leadership</span></div>
              <div className="page-meta-row"><span>Best for</span><span>Procurement · Partnership</span></div>
              <div className="page-meta-row"><span>Contact</span><span>{site.contactPerson}</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PDF Preview ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Profile Preview</div>
          <h2 className="hp-section-title section-title-gap-md">
            Review before <em>you download.</em>
          </h2>
          <div className="cp-preview-wrap stitch-glass">
            <iframe
              src="/downloads/kelel-company-profile.pdf#view=FitH"
              title="Kelel company profile PDF preview"
              className="cp-preview-frame"
            />
          </div>
          <div className="page-inline-actions page-inline-actions--centered">
            <a href="/downloads/kelel-company-profile.pdf" className="site-hero-btn-primary btn-magnetic" download>
              Download PDF →
            </a>
            <a href="/downloads/kelel-company-profile.pdf" target="_blank" rel="noreferrer" className="site-hero-btn-ghost">
              Open in browser
            </a>
          </div>
        </div>
      </RevealSection>

      {/* ── Services inside profile ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">What&apos;s Inside</div>
          <h2 className="hp-section-title section-title-gap-lg">
            The profile packages our full <em>service story.</em>
          </h2>
          <div className="stitch-caps-grid">
            {services.map((service) => (
              <div key={service.title} className="stitch-cap-card">
                <h3 className="stitch-cap-title">{service.title}</h3>
                <p className="stitch-cap-body">{service.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── Proof gallery ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Preview Pages</div>
          <h2 className="hp-section-title section-title-gap-lg">
            The strongest pages, <em>visible in browser.</em>
          </h2>
          <ProofGallery />
        </div>
      </RevealSection>

      {/* ── Readiness ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Readiness</div>
          <h2 className="hp-section-title section-title-gap-lg">
            Built to support <em>trust-building conversations.</em>
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

      {/* ── Assurance + Case studies ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Delivery Assurance</div>
          <h2 className="hp-section-title section-title-gap-lg">
            How inquiries and delivery discussions <em>are handled.</em>
          </h2>
          <div className="cp-assurance-list">
            {assurancePoints.map((item) => (
              <div key={item} className="cp-assurance-item stitch-glass">
                <span className="ind-detail-check">✓</span>
                <span className="stitch-body">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── Related case studies ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Case Studies</div>
          <h2 className="hp-section-title section-title-gap-lg">
            Detailed project pages for <em>capability discussions.</em>
          </h2>
          <div className="wrk-grid">
            {projects.map((project) => (
              <div key={project.name} className="wrk-card stitch-glass">
                <div className="wrk-card-top">
                  <span className="wrk-type">{project.type}</span>
                </div>
                <h3 className="wrk-title">{project.name}</h3>
                <p className="wrk-blurb">{project.blurb}</p>
                <Link href={`/work/${project.slug}`} className="wrk-link">
                  Open case study →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── CTA ── */}
      <RevealSection as="div">
        <CtaBand
          kicker="Talk to us"
          heading={<>Ready to discuss <em>your project?</em></>}
          sub="Use this profile for introductions, procurement conversations, partnership outreach, and early-stage project discussions."
          primaryLabel="Contact Kelel →"
          primaryHref="/contact"
          ghostLabel="Request proposal"
          ghostHref="/request-proposal"
        />
      </RevealSection>
    </main>
  );
}
