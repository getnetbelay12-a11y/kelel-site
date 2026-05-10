import type { Metadata } from "next";
import Link from "next/link";
import { RevealSection } from "@/components/reveal-section";
import { projects } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Case Studies | Kelel IT Solution",
  description:
    "Business systems, infrastructure improvement, and web modernization case studies from Kelel IT Solution — built for African enterprise environments.",
};

export default function WorkPage() {
  return (
    <main className="stitch-page">
      {/* ── Hero ── */}
      <RevealSection className="stitch-hero">
        <div className="stitch-container">
          <span className="stitch-kicker">CASE STUDIES</span>
          <h1 className="stitch-h1">
            Proof that the right system<br />changes how organizations operate.
          </h1>
          <p className="stitch-body" style={{ maxWidth: "600px" }}>
            Three projects scoped and structured to demonstrate Kelel&apos;s delivery
            capabilities across business systems, web modernization, and infrastructure.
          </p>
        </div>
      </RevealSection>

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
      <RevealSection className="stitch-cta-section">
        <div className="stitch-container">
          <div className="stitch-cta-glass stitch-glass">
            <h2>Your project could be next.</h2>
            <p className="stitch-body">
              We&apos;re ready to structure a clear brief, scope a realistic delivery path,
              and build the platform your organization needs.
            </p>
            <div className="stitch-cta-btns">
              <Link href="/contact" className="stitch-btn-primary">Start a Project</Link>
              <Link href="/request-proposal" className="stitch-btn-ghost">Request Proposal</Link>
            </div>
          </div>
        </div>
      </RevealSection>
    </main>
  );
}
