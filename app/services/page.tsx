import type { Metadata } from "next";
import Link from "next/link";
import { RevealSection } from "@/components/reveal-section";
import { CtaBand } from "@/components/cta-band";
import { PageVisualStage } from "@/components/page-visual-stage";
import { services, process, engagementModes, sectorPages } from "@/lib/site-content";
import { createSeoMetadata } from "@/lib/seo";
import { servicePages, solutionPages } from "@/lib/seo-pages";

export const metadata: Metadata = createSeoMetadata({
  title: "IT Services and Software Solutions in Ethiopia | Kelel IT Solutions",
  description:
    "Explore Kelel IT Solutions services for software development, website development, mobile apps, MongoDB consulting, cloud, cybersecurity, ERP, banking, school payments, insurance, and fleet systems.",
  path: "/services",
});

const serviceIcons = [
  <svg key="a" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  <svg key="b" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16v16H4z"/><path d="M4 9h16M9 9v11"/></svg>,
  <svg key="c" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  <svg key="d" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
];

const iconColors = ["--green", "--blue", "--purple", "--amber"] as const;
const colorMap: Record<string, string> = {
  "--green":  "rgba(75,227,214,",
  "--blue":   "rgba(59,130,246,",
  "--purple": "rgba(139,92,246,",
  "--amber":  "rgba(240,168,104,",
};
const strokeMap: Record<string, string> = {
  "--green":  "#4be3d6",
  "--blue":   "#3b82f6",
  "--purple": "#8b5cf6",
  "--amber":  "#f0a868",
};

export default function ServicesPage() {
  return (
    <main className="stitch-page">
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-crumbs">
            <Link href="/">Home</Link>
            <span className="page-crumbs-sep">/</span>
            <span>Services</span>
          </div>
          <div className="page-hero-grid">
            <div>
              <div className="site-eyebrow page-eyebrow-spaced">
                <span className="site-eyebrow-dot" />
                Services · Infrastructure to Intelligent Systems
              </div>
              <h1 className="page-title-plain">
                Production-grade IT services for <em>enterprise Africa.</em>
              </h1>
              <p className="page-sub">
                From managed support and network infrastructure to AI-powered platforms
                and digital transformation — we build and run the systems that keep
                African enterprises moving.
              </p>
              <div className="page-hero-actions">
                <Link href="/contact" className="site-hero-btn-primary btn-magnetic">Get a quote →</Link>
                <Link href="/request-proposal" className="site-hero-btn-ghost">Request proposal</Link>
              </div>
            </div>
            <div className="page-hero-stack">
              <PageVisualStage
                className="page-visual-stage--services"
                badge="Service architecture"
                badgeWithPulse
                cardKicker="Delivery tracks"
                cardTitle="4 core service lines"
              />
              <div className="page-meta">
                <div className="page-meta-row"><span>Service lines</span><span>4 core tracks</span></div>
                <div className="page-meta-row"><span>Engagement</span><span>Project · Retainer · Support</span></div>
                <div className="page-meta-row"><span>Delivery model</span><span>4-phase structured</span></div>
                <div className="page-meta-row"><span>Response SLA</span><span>24 hours</span></div>
                <div className="page-meta-row"><span>Markets</span><span>Pan-African</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service cards ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="srv-grid">
            {services.map((service, i) => {
              const color = iconColors[i];
              const bg = colorMap[color];
              const stroke = strokeMap[color];
              return (
                <div
                  key={service.title}
                  className="srv-card stitch-glass"
                  style={{ borderTopColor: `${bg}0.30)` } as React.CSSProperties}
                >
                  <div
                    className="srv-icon"
                    style={{
                      background: `${bg}0.10)`,
                      border: `1px solid ${bg}0.22)`,
                      color: stroke,
                    }}
                  >
                    {serviceIcons[i]}
                  </div>
                  <h3 className="srv-title">{service.title}</h3>
                  <p className="srv-body">{service.summary}</p>
                  <ul className="srv-bullets">
                    {service.bullets.map((b) => (
                      <li key={b} className="srv-bullet" style={{ color: stroke }}>
                        <span>→</span> <span style={{ color: "rgba(212,228,250,0.70)" }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </RevealSection>

      {/* ── Process ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">How We Work</div>
          <h2 className="hp-section-title section-title-gap-lg">
            A delivery process built <em>for accountability.</em>
          </h2>
          <div className="srv-process">
            {process.map((step, i) => (
              <div key={step} className="srv-process-step stitch-glass">
                <div className="srv-step-num">0{i + 1}</div>
                <p className="srv-step-body">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── Engagement modes ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Engagement Models</div>
          <h2 className="hp-section-title section-title-gap-lg">
            How you can <em>work with us.</em>
          </h2>
          <div className="stitch-caps-grid">
            {engagementModes.map((mode) => (
              <div key={mode.title} className="stitch-cap-card">
                <h3 className="stitch-cap-title">{mode.title}</h3>
                <p className="stitch-cap-body">{mode.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">SEO Service Pages</div>
          <h2 className="hp-section-title section-title-gap-lg">
            Detailed pages for <em>specific business needs.</em>
          </h2>
          <div className="seo-related-columns">
            <div>
              <h3>Services</h3>
              {servicePages.map((page) => (
                <Link key={page.path} href={page.path}>{page.h1} →</Link>
              ))}
            </div>
            <div>
              <h3>Solutions</h3>
              {solutionPages.map((page) => (
                <Link key={page.path} href={page.path}>{page.h1} →</Link>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ── Industry fit ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Sector Fit</div>
          <h2 className="hp-section-title section-title-gap-lg">
            Sectors we serve <em>across Africa.</em>
          </h2>
          <div className="srv-sectors">
            {sectorPages.map((sector) => (
              <Link
                key={sector.slug}
                href={`/industries/${sector.slug}`}
                className="srv-sector stitch-glass"
              >
                <div className="srv-sector-name">{sector.name}</div>
                <p className="srv-sector-summary">{sector.summary}</p>
                <span className="srv-sector-cta">Explore sector →</span>
              </Link>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── CTA ── */}
      <RevealSection as="div">
        <CtaBand
          kicker="Start a project"
          heading={<>Ready to scope <em>your project?</em></>}
          sub="Tell us what support, system, or infrastructure your organization needs. We'll structure a clear path from brief to delivery."
          primaryLabel="Contact Kelel →"
          primaryHref="/contact"
          ghostLabel="Request proposal"
          ghostHref="/request-proposal"
        />
      </RevealSection>
    </main>
  );
}
