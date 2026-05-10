import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { RevealSection } from "@/components/reveal-section";
import { CtaBand } from "@/components/cta-band";
import { PageVisualStage } from "@/components/page-visual-stage";
import { site } from "@/lib/site-content";

const ContactForm = dynamic(
  () => import("@/components/contact-form").then((mod) => mod.ContactForm),
);

const proposalSignals = [
  "Architecture direction with clear delivery phases",
  "Proposal intake that supports files, budget, and timeline",
  "Regional operating context built into scoping from day one",
];

export const metadata: Metadata = {
  title: "Start a Project | Kelel IT Solution",
  description:
    "Begin your digital transformation with Kelel IT Solution. Submit a structured project brief for enterprise infrastructure, platforms, and intelligent systems.",
};

export default function RequestProposalPage() {
  return (
    <main className="stitch-page">
      <section className="page-hero sap-hero">
        <div className="page-hero-inner">
          <div className="page-crumbs">
            <Link href="/">Home</Link>
            <span className="page-crumbs-sep">/</span>
            <span>Start a Project</span>
          </div>
          <div className="page-hero-grid">
            <div>
              <div className="site-eyebrow page-eyebrow-spaced">
                <span className="site-eyebrow-dot" />
                Start a Project · Structured Proposal Intake
              </div>
              <h1 className="page-title-plain">
                Start your digital transformation with a <em>serious briefing surface.</em>
              </h1>
              <p className="page-sub">
                Use this page when your team is beyond casual inquiry and ready to define
                scope, timeline, supporting files, and decision context for a platform,
                infrastructure, or intelligent-systems engagement.
              </p>
              <div className="page-hero-actions">
                <Link href="#proposal-form" className="site-hero-btn-primary btn-magnetic">
                  Submit project brief →
                </Link>
                <Link href="/contact" className="site-hero-btn-ghost">
                  Ask a simpler question
                </Link>
              </div>
            </div>
            <div className="page-meta">
              <div className="page-meta-row">
                <span>Response path</span>
                <span>Inbox-backed submission</span>
              </div>
              <div className="page-meta-row">
                <span>Best for</span>
                <span>Proposal-ready teams</span>
              </div>
              <div className="page-meta-row">
                <span>Attachments</span>
                <span>PDF · DOCX · PNG · JPG</span>
              </div>
              <div className="page-meta-row">
                <span>Location</span>
                <span>{site.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RevealSection className="stitch-section sap-proposal-section">
        <div className="stitch-container sap-proposal-grid">
          <div className="sap-proposal-copy">
            <div className="hp-section-label">Proposal Surface</div>
            <h2 className="hp-section-title section-title-gap-lg">
              Designed for teams that need <em>clarity before commitment.</em>
            </h2>
            <p className="hp-section-intro sap-proposal-intro">
              The page should feel like a control room, not a generic contact form.
              That means stronger visual cues, structured inputs, and enough atmosphere
              to signal platform seriousness before anyone reads the fine print.
            </p>

            <div className="sap-signal-list">
              {proposalSignals.map((signal, index) => (
                <div key={signal} className="sap-signal-item stitch-glass">
                  <span className="sap-signal-num">0{index + 1}</span>
                  <span>{signal}</span>
                </div>
              ))}
            </div>

            <PageVisualStage
              className="page-visual-stage--proposal"
              badge="Proposal-ready intake"
              badgeWithPulse
              cardKicker="Structured review"
              cardTitle="Scope · Budget · Files"
            />
          </div>

          <div id="proposal-form" className="stitch-glass sap-form-panel">
            <div className="hp-section-label">Project Brief</div>
            <h2 className="hp-section-title section-title-gap-md">
              Submit a proposal request with <em>real operating context.</em>
            </h2>
            <p className="hp-section-intro sap-form-intro">
              Include the problem, desired outcome, timing, and any supporting material.
              The form writes into the local project inbox instead of disappearing into
              a mockup.
            </p>
            <ContactForm
              inquiryType="proposal"
              showProposalFields
              submitLabel="Submit proposal request"
              sourcePage="request-proposal"
              requestFocus="structured-proposal"
              initialService="Proposal request"
              detailsLabel="Project description"
              detailsPlaceholder="Describe the system, platform, or infrastructure you need. Include current constraints, who it serves, and what success should look like."
              helperCopy="Your proposal request is stored through the site's working submission flow and can include supporting files for review."
            />
          </div>
        </div>
      </RevealSection>

      <RevealSection className="stitch-section sap-proof-band">
        <div className="stitch-container">
          <div className="hp-section-label">Operating Context</div>
          <h2 className="hp-section-title section-title-gap-lg">
            Built for organizations operating across <em>African markets.</em>
          </h2>
          <div className="sap-context-grid">
            <div className="sap-context-card stitch-glass">
              <span className="sap-context-kicker">Decision cycle</span>
              <strong>From inquiry to scoped proposal</strong>
              <p>
                Clearer intake reduces vague conversations and gives internal stakeholders
                something concrete to review.
              </p>
            </div>
            <div className="sap-context-card stitch-glass">
              <span className="sap-context-kicker">Leadership route</span>
              <strong>{site.contactPerson}</strong>
              <p>
                Direct executive visibility remains available when the project requires a
                more formal coordination path.
              </p>
            </div>
            <div className="sap-context-card stitch-glass">
              <span className="sap-context-kicker">Visual proof</span>
              <strong>Platform-first, not brochure-first</strong>
              <p>
                The surrounding motion and interface imagery reinforce that Kelel is
                selling systems, not just a marketing page.
              </p>
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection as="div">
        <CtaBand
          kicker="Need a faster route?"
          heading={<>Prefer a lighter <em>first conversation?</em></>}
          sub="If your team is still exploring, use the contact page first and move to the proposal flow once the scope is clearer."
          primaryLabel="Open contact page →"
          primaryHref="/contact"
          ghostLabel="View platform page"
          ghostHref="/platform"
        />
      </RevealSection>
    </main>
  );
}
