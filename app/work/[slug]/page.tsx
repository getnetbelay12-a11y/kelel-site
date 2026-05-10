import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RevealSection } from "@/components/reveal-section";
import { CtaBand } from "@/components/cta-band";
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
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-crumbs">
            <Link href="/">Home</Link>
            <span className="page-crumbs-sep">/</span>
            <Link href="/work">Work</Link>
            <span className="page-crumbs-sep">/</span>
            <span>{project.type}</span>
          </div>
          <div className="page-hero-grid">
            <div>
              <div className="site-eyebrow" style={{ marginBottom: "24px" }}>
                <span className="site-eyebrow-dot" />
                {project.type} · Case Study
              </div>
              <h1 className="page-title-plain">{project.name}</h1>
              <p className="page-sub">{project.blurb}</p>
              <div style={{ display: "flex", gap: "12px", marginTop: "32px", flexWrap: "wrap" }}>
                <Link href="/contact" className="site-hero-btn-primary btn-magnetic">Discuss a similar project →</Link>
                <Link href="/work" className="site-hero-btn-ghost">← All case studies</Link>
              </div>
            </div>
            <div className="page-meta">
              <div className="page-meta-row"><span>Type</span><span>{project.type}</span></div>
              <div className="page-meta-row"><span>Scope</span><span>{project.scope}</span></div>
            </div>
          </div>
        </div>
      </section>

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
          <div className="hp-section-label">Approach</div>
          <h2 className="hp-section-title" style={{ marginBottom: "40px" }}>
            How we structured <em>the delivery.</em>
          </h2>
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
          <div className="hp-section-label">Deliverables</div>
          <h2 className="hp-section-title" style={{ marginBottom: "40px" }}>
            What the engagement <em>produced.</em>
          </h2>
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
          <div className="hp-section-label">Business Impact</div>
          <h2 className="hp-section-title" style={{ marginBottom: "40px" }}>
            Operational value <em>delivered.</em>
          </h2>
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
      <RevealSection as="div">
        <CtaBand
          kicker="Build with us"
          heading={<>Ready to build <em>a similar solution?</em></>}
          sub="Let's discuss your operational challenges and define the right delivery path for your team."
          primaryLabel="Start a conversation →"
          primaryHref="/contact"
          ghostLabel="More case studies"
          ghostHref="/work"
        />
      </RevealSection>
    </main>
  );
}
