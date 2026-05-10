import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RevealSection } from "@/components/reveal-section";
import { projects, site } from "@/lib/site-content";

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Case Study | Kelel IT Solution" };
  return {
    title: `${project.name} | Kelel IT Solution`,
    description: project.blurb,
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <main className="stitch-page">
      {/* ── Hero ── */}
      <RevealSection className="stitch-hero">
        <div className="stitch-container">
          <span className="stitch-kicker">{project.type}</span>
          <h1 className="stitch-h1">{project.name}</h1>
          <p className="stitch-body" style={{ maxWidth: "640px" }}>{project.blurb}</p>
          <div className="stitch-cta-btns" style={{ marginTop: "32px" }}>
            <Link href="/contact" className="stitch-btn-primary">Discuss a Similar Project</Link>
            <Link href="/work" className="stitch-btn-ghost">← All Case Studies</Link>
          </div>
        </div>
      </RevealSection>

      {/* ── Scope + Contact ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="cs-split">
            <div className="cs-scope stitch-glass">
              <span className="stitch-kicker" style={{ fontSize: "10px", marginBottom: "16px", display: "block" }}>
                PROJECT SCOPE
              </span>
              <h3 className="cs-scope-title">{project.scope}</h3>
              <p className="stitch-body" style={{ marginTop: "12px" }}>{project.clientNeed}</p>
            </div>
            <div className="cs-contact stitch-glass">
              <div className="cs-contact-label">Project contact</div>
              <div className="cs-contact-avatar">G</div>
              <div className="cs-contact-name">{site.contactPerson}</div>
              <div className="cs-contact-role">{site.contactRole}</div>
              <div className="cs-contact-divider" />
              <a href={`mailto:${site.email}`} className="cs-contact-link">{site.email}</a>
              <a href={`tel:${site.phone.replaceAll(" ", "")}`} className="cs-contact-link">{site.phone}</a>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ── Challenge & Outcome ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="cs-co-grid">
            <div className="cs-co-card stitch-glass">
              <div className="cs-co-badge cs-co-badge--red">CHALLENGE</div>
              <p className="stitch-body" style={{ marginTop: "16px" }}>{project.challenge}</p>
            </div>
            <div className="cs-co-card stitch-glass cs-co-card--outcome">
              <div className="cs-co-badge cs-co-badge--green">OUTCOME</div>
              <p className="stitch-body" style={{ marginTop: "16px" }}>{project.outcome}</p>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ── Approach ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="stitch-section-header">
            <span className="stitch-kicker">APPROACH</span>
            <h2 className="stitch-h2">How we structured the delivery.</h2>
          </div>
          <div className="cs-steps">
            {project.approach.map((step, i) => (
              <div key={step} className="cs-step stitch-glass">
                <div className="cs-step-num">0{i + 1}</div>
                <p className="cs-step-body">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── Deliverables ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="stitch-section-header">
            <span className="stitch-kicker">DELIVERABLES</span>
            <h2 className="stitch-h2">What the engagement produced.</h2>
          </div>
          <div className="cs-chips">
            {project.deliverables.map((item) => (
              <div key={item} className="cs-chip">{item}</div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── Business Impact ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="stitch-section-header">
            <span className="stitch-kicker">BUSINESS IMPACT</span>
            <h2 className="stitch-h2">Operational value delivered.</h2>
          </div>
          <div className="cs-impact">
            {project.impactPoints.map((item) => (
              <div key={item} className="cs-impact-item stitch-glass">
                <span className="cs-impact-check">✓</span>
                <span className="cs-impact-text">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── CTA ── */}
      <RevealSection className="stitch-cta-section">
        <div className="stitch-container">
          <div className="stitch-cta-glass stitch-glass">
            <h2>Ready to build a similar solution?</h2>
            <p className="stitch-body">
              Let&apos;s discuss your operational challenges and define the right delivery path
              for your team.
            </p>
            <div className="stitch-cta-btns">
              <Link href="/contact" className="stitch-btn-primary">Start a Conversation</Link>
              <Link href="/work" className="stitch-btn-ghost">More Case Studies</Link>
            </div>
          </div>
        </div>
      </RevealSection>
    </main>
  );
}
