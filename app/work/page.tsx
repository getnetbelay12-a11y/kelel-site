import type { Metadata } from "next";
import Link from "next/link";
import { RevealSection } from "@/components/reveal-section";
import { CtaBand } from "@/components/cta-band";
import { PageVisualStage } from "@/components/page-visual-stage";
import { projects } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Case Studies | Kelel IT Solution",
  description:
    "Business systems, infrastructure improvement, and web modernization case studies from Kelel IT Solution — built for African enterprise environments.",
};

export default function WorkPage() {
  return (
    <main className="stitch-page">

      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-crumbs">
            <Link href="/">Home</Link>
            <span className="page-crumbs-sep">/</span>
            <span>Work</span>
          </div>
          <div className="page-hero-grid">
            <div>
              <div className="site-eyebrow page-eyebrow-spaced">
                <span className="site-eyebrow-dot" />
                Case Studies · Platform thinking for African operations
              </div>
              <h1 className="page-title-plain">
                Proof that the right system changes <em>how organizations operate.</em>
              </h1>
              <p className="page-sub">
                Three projects scoped and structured to demonstrate Kelel&apos;s delivery
                capabilities across business systems, web modernization, and infrastructure.
              </p>
            </div>
            <div className="page-hero-stack">
              <PageVisualStage
                className="page-visual-stage--work"
                badge="Case-study surface"
                badgeWithPulse
                cardKicker="Project proof"
                cardTitle={`${projects.length} structured concepts`}
              />
              <div className="page-meta">
                <div className="page-meta-row"><span>Projects</span><span>3 case studies</span></div>
                <div className="page-meta-row"><span>Sectors</span><span>Banking · Insurance · Enterprise</span></div>
                <div className="page-meta-row"><span>Delivery type</span><span>Concept · Structured</span></div>
                <div className="page-meta-row"><span>Status</span><span>Production-ready concepts</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="wrk-grid">
            {projects.map((project) => (
              <div key={project.slug} className="wrk-card stitch-glass">
                <div className="wrk-card-top">
                  <span className="wrk-type">{project.type}</span>
                </div>
                <h3 className="wrk-title">{project.name}</h3>
                <p className="wrk-blurb">{project.blurb}</p>
                <div className="wrk-meta">
                  <div className="wrk-meta-item">
                    <span className="wrk-meta-label">Challenge</span>
                    <span className="wrk-meta-val">{project.challenge}</span>
                  </div>
                  <div className="wrk-meta-item wrk-meta-item--outcome">
                    <span className="wrk-meta-label">Outcome</span>
                    <span className="wrk-meta-val">{project.outcome}</span>
                  </div>
                </div>
                <Link href={`/work/${project.slug}`} className="wrk-link">
                  View full case study →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── CTA ── */}
      <RevealSection as="div">
        <CtaBand
          kicker="Your project next"
          heading={<>Your project could <em>be next.</em></>}
          sub="We're ready to structure a clear brief, scope a realistic delivery path, and build the platform your organization needs."
          primaryLabel="Start a project →"
          primaryHref="/contact"
          ghostLabel="Request proposal"
          ghostHref="/request-proposal"
        />
      </RevealSection>

    </main>
  );
}
