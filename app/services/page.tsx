import type { Metadata } from "next";
import Link from "next/link";
import { RevealSection } from "@/components/reveal-section";
import { services, process, engagementModes, sectorPages } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Services | Kelel IT Solution",
  description:
    "Production-grade IT services for African enterprises — managed support, infrastructure, software systems, AI platforms, and digital transformation.",
};

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
      {/* ── Hero ── */}
      <RevealSection className="stitch-hero">
        <div className="stitch-container">
          <span className="stitch-kicker">SERVICES</span>
          <h1 className="stitch-h1">
            Production-grade IT services<br />for enterprise Africa.
          </h1>
          <p className="stitch-body" style={{ maxWidth: "620px" }}>
            From managed support and network infrastructure to AI-powered platforms
            and digital transformation — we build and run the systems that keep
            African enterprises moving.
          </p>
          <div className="stitch-cta-btns" style={{ marginTop: "36px" }}>
            <Link href="/contact" className="stitch-btn-primary">Get a Quote</Link>
            <Link href="/request-proposal" className="stitch-btn-ghost">Request Proposal</Link>
          </div>
        </div>
      </RevealSection>

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
          <div className="stitch-section-header">
            <span className="stitch-kicker">HOW WE WORK</span>
            <h2 className="stitch-h2">A delivery process built for accountability.</h2>
          </div>
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
          <div className="stitch-section-header">
            <span className="stitch-kicker">ENGAGEMENT MODELS</span>
            <h2 className="stitch-h2">How you can work with us.</h2>
          </div>
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

      {/* ── Industry fit ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="stitch-section-header">
            <span className="stitch-kicker">SECTOR FIT</span>
            <h2 className="stitch-h2">Sectors we serve across Africa.</h2>
          </div>
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
      <RevealSection className="stitch-cta-section">
        <div className="stitch-container">
          <div className="stitch-cta-glass stitch-glass">
            <h2>Ready to scope your project?</h2>
            <p className="stitch-body">
              Tell us what support, system, or infrastructure your organization needs.
              We&apos;ll structure a clear path from brief to delivery.
            </p>
            <div className="stitch-cta-btns">
              <Link href="/contact" className="stitch-btn-primary">Contact Kelel</Link>
              <Link href="/request-proposal" className="stitch-btn-ghost">Request Proposal</Link>
            </div>
          </div>
        </div>
      </RevealSection>
    </main>
  );
}
