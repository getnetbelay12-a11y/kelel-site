import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RevealSection } from "@/components/reveal-section";
import { CtaBand } from "@/components/cta-band";
import { sectorPages, site } from "@/lib/site-content";

type IndustryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return sectorPages.map((sector) => ({ slug: sector.slug }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = sectorPages.find((item) => item.slug === slug);
  if (!sector) return { title: "Industries | Kelel IT Solution" };
  return {
    title: `${sector.name} | Kelel IT Solution`,
    description: sector.summary,
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const sector = sectorPages.find((item) => item.slug === slug);
  if (!sector) notFound();

  return (
    <main className="stitch-page">

      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-crumbs">
            <Link href="/">Home</Link>
            <span className="page-crumbs-sep">/</span>
            <Link href="/services">Services</Link>
            <span className="page-crumbs-sep">/</span>
            <span>Industries</span>
          </div>
          <div className="page-hero-grid">
            <div>
              <div className="site-eyebrow" style={{ marginBottom: "24px" }}>
                <span className="site-eyebrow-dot" />
                Industry Focus
              </div>
              <h1 className="page-title-plain">{sector.name}</h1>
              <p className="page-sub">{sector.summary}</p>
              <div style={{ display: "flex", gap: "12px", marginTop: "32px", flexWrap: "wrap" }}>
                <Link href="/contact" className="site-hero-btn-primary btn-magnetic">Discuss this sector →</Link>
                <Link href="/services" className="site-hero-btn-ghost">Back to solutions</Link>
              </div>
            </div>
            <div className="page-meta">
              <div className="page-meta-row"><span>Challenges</span><span>{sector.challenges.length} identified</span></div>
              <div className="page-meta-row"><span>Solutions</span><span>{sector.solutions.length} mapped</span></div>
              <div className="page-meta-row"><span>Outcomes</span><span>{sector.outcomes.length} targeted</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Challenges ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Common Challenges</div>
          <h2 className="hp-section-title" style={{ marginBottom: "40px" }}>
            The kinds of issues Kelel <em>can help clarify and improve.</em>
          </h2>
          <div className="ind-detail-grid">
            {sector.challenges.map((item, i) => (
              <div key={item} className="ind-detail-card stitch-glass">
                <div className="ind-detail-num">0{i + 1}</div>
                <p className="stitch-body">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── Solutions ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Solution Fit</div>
          <h2 className="hp-section-title" style={{ marginBottom: "40px" }}>
            How Kelel&apos;s current offer <em>maps to this sector.</em>
          </h2>
          <div className="ind-detail-grid">
            {sector.solutions.map((item) => (
              <div key={item} className="ind-detail-card ind-detail-card--solution stitch-glass">
                <span className="ind-detail-check">✓</span>
                <p className="stitch-body">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── Outcomes + Contact ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="ind-outcomes-split">
            <div>
              <div className="hp-section-label">Expected Outcomes</div>
              <h2 className="hp-section-title" style={{ marginBottom: "32px" }}>
                Conversations focused on <em>business results.</em>
              </h2>
              <div className="ind-outcomes-list">
                {sector.outcomes.map((item) => (
                  <div key={item} className="ind-outcome stitch-glass">
                    <h3 className="ind-outcome-title">{item}</h3>
                    <p className="stitch-body">
                      Kelel can frame this kind of improvement as part of a practical,
                      staged delivery conversation rather than an abstract technical plan.
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="abt-leader-card stitch-glass" style={{ alignSelf: "start" }}>
              <div className="abt-leader-inner">
                <div className="abt-leader-avatar">G</div>
                <div>
                  <div className="abt-leader-name">{site.contactPerson}</div>
                  <div className="abt-leader-role">{site.contactRole}</div>
                </div>
              </div>
              <p className="stitch-body" style={{ marginTop: "16px", marginBottom: "16px" }}>
                Use this route when your organization wants a sector-specific conversation
                about systems, support, or digital modernization.
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
          kicker="Start a conversation"
          heading={<>Ready to discuss <em>your sector?</em></>}
          sub="Pair this page with our company profile when introducing Kelel to buyers, partners, or internal decision-makers."
          primaryLabel="Contact Kelel →"
          primaryHref="/contact"
          ghostLabel="Download company profile"
          ghostHref="/company-profile"
        />
      </RevealSection>

    </main>
  );
}
