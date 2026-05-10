import type { Metadata } from "next";
import Link from "next/link";
import { RevealSection } from "@/components/reveal-section";
import { PlatformScreenSwitcher } from "@/components/platform-screen-switcher";
import { CtaBand } from "@/components/cta-band";
import { PageVisualStage } from "@/components/page-visual-stage";

export const metadata: Metadata = {
  title: "Platform | Kelel IT Solution",
  description:
    "Modern API-first architecture built for secure regional operations across Africa. Modular deployment, 99.9% uptime, sub-45ms latency.",
};

export default function PlatformPage() {
  return (
    <main className="stitch-page">

      {/* ── Page Hero ─────────────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-crumbs">
            <Link href="/">Home</Link>
            <span className="page-crumbs-sep">/</span>
            <span>Platform</span>
          </div>
          <div className="page-hero-grid">
            <div>
              <div className="site-eyebrow page-eyebrow-spaced">
                <span className="site-eyebrow-dot" />
                Platform Core · API-first infrastructure
              </div>
              <h1 className="page-title-plain">
                Modern architecture built for <em>secure regional operations.</em>
              </h1>
              <p className="page-sub">
                API-first systems, modular deployment, and clear reporting structures
                designed for high-stakes financial environments across Africa.
              </p>
              <div className="page-hero-actions">
                <Link href="/contact" className="site-hero-btn-primary btn-magnetic">
                  Start platform conversation →
                </Link>
                <Link href="/request-proposal" className="site-hero-btn-ghost">
                  Request proposal
                </Link>
              </div>
            </div>
            <div className="plt-hero-stack">
              <PageVisualStage
                className="page-visual-stage--platform"
                badge="Operator-ready interface"
                badgeWithPulse
                cardKicker="Live architecture"
                cardTitle="12 regional nodes"
              />
              <div className="page-meta">
                <div className="page-meta-row">
                  <span>Uptime target</span><span>99.9%</span>
                </div>
                <div className="page-meta-row">
                  <span>API latency</span><span>&lt; 45ms</span>
                </div>
                <div className="page-meta-row">
                  <span>Active nodes</span><span>12 regions</span>
                </div>
                <div className="page-meta-row">
                  <span>Architecture</span><span>API-first · Modular</span>
                </div>
                <div className="page-meta-row">
                  <span>Deployment</span><span>Phased · Rollback-ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key metrics strip ─────────────────────────────────────────── */}
      <RevealSection className="stitch-section section-tight-top">
        <div className="stitch-container">
          <div className="stitch-metrics-row">
            <div className="stitch-metric-card stitch-glass">
              <span className="stitch-metric-label">UPTIME</span>
              <span className="stitch-metric-val">99.9%</span>
              <div className="stitch-progress">
                <div className="stitch-progress-fill stitch-progress-fill--nearly-full" />
              </div>
            </div>
            <div className="stitch-metric-card stitch-glass">
              <span className="stitch-metric-label">LATENCY</span>
              <span className="stitch-metric-val">&lt;&nbsp;45ms</span>
              <div className="stitch-progress">
                <div className="stitch-progress-fill stitch-progress-fill--amber stitch-progress-fill--low" />
              </div>
            </div>
            <div className="stitch-metric-card stitch-glass">
              <span className="stitch-metric-label">REGIONS</span>
              <span className="stitch-metric-val">12 Nodes</span>
              <div className="plt-node-dots">
                <span className="plt-dot plt-dot--cyan" />
                <span className="plt-dot plt-dot--amber" />
                <span className="plt-dot plt-dot--green" />
                <span className="plt-dot-more">+9</span>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ── Technical Capabilities Bento ─────────────────────────────── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Capabilities</div>
          <h2 className="hp-section-title section-title-gap-lg">
            Built for operators. <em>Designed for scale.</em>
          </h2>
          <div className="stitch-tech-bento">
            <div className="stitch-tech-wide stitch-glass">
              <h3>API-first systems</h3>
              <p className="stitch-body">
                Integration-ready services built for extensibility across teams and platforms.
              </p>
              <div className="stitch-code-block">
                <pre>
                  <span className="stitch-code-method">GET</span>
                  {" /v2/nodes/active_status\n"}
                  {"Authorization: Bearer {{AUTH_TOKEN}}\n"}
                  {"{\n"}
                  {"  "}<span className="stitch-code-key">&quot;status&quot;</span>{": &quot;synced&quot;,\n"}
                  {"  "}<span className="stitch-code-key">&quot;throughput&quot;</span>{": 842.1,\n"}
                  {"  "}<span className="stitch-code-key">&quot;health_score&quot;</span>{": 0.99\n"}
                  {"}"}
                </pre>
              </div>
            </div>

            <div className="stitch-tech-narrow stitch-glass">
              <h3>Secure workflows</h3>
              <p className="stitch-body">
                End-to-end enforcement policies built into every approval chain and authentication layer.
              </p>
              <ul className="stitch-enforce-list">
                <li className="stitch-enforce-item">
                  <span>Multi-Sig Approval</span>
                  <span className="plt-badge plt-badge--enforced">ENFORCED</span>
                </li>
                <li className="stitch-enforce-item">
                  <span>Hardware Auth</span>
                  <span className="plt-badge plt-badge--required">REQUIRED</span>
                </li>
              </ul>
            </div>

            <div className="stitch-tech-narrow stitch-glass">
              <h3>Modular deployment</h3>
              <p className="stitch-body">
                Phased rollouts that support maintainability and business continuity with rollback paths from day one.
              </p>
            </div>

            <div className="stitch-tech-wide stitch-glass">
              <h3>Reporting &amp; visibility</h3>
              <p className="stitch-body">
                Dashboards, KPIs, and operational oversight surfaces for faster decision-making.
              </p>
              <div className="inline-pill-row">
                {["NODE A · STABLE", "NODE B · STABLE", "NODE C · SYNCING"].map((node) => (
                  <div key={node} className="plt-node-status-pill">{node}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ── Platform Screen Switcher ─────────────────────────────────── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label section-heading-center">Platform Interface</div>
          <h2 className="hp-section-title section-title-center section-title-gap-sm">
            Built for operators, <em>not just developers.</em>
          </h2>
          <p className="hp-section-intro section-intro-center">
            Purpose-built screens for every operational role — from transaction officers to network engineers.
          </p>
          <PlatformScreenSwitcher />
        </div>
      </RevealSection>

      {/* ── Node Performance Monitoring ──────────────────────────────── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label section-heading-center">Node Performance</div>
          <h2 className="hp-section-title section-title-center section-title-gap-sm">
            Regional node <em>efficiency monitoring.</em>
          </h2>
          <p className="hp-section-intro section-intro-center-lg">
            Real-time health, latency, and throughput metrics across every active node in the network.
          </p>
          <div className="npm-grid">
            {[
              { id: "AA-01", city: "Addis Ababa", health: "99.9%", latency: "42", tput: "847", offset: "0.29", cls: "cyan" },
              { id: "NBI-02", city: "Nairobi",      health: "98.4%", latency: "38", tput: "612", offset: "4.62", cls: "blue" },
              { id: "LGS-03", city: "Lagos",         health: "97.1%", latency: "51", tput: "523", offset: "8.38", cls: "purple" },
              { id: "DKR-04", city: "Dakar",          health: "95.8%", latency: "67", tput: "341", offset: "12.14", cls: "amber", syncing: true },
            ].map((node) => (
              <div key={node.id} className="npm-card stitch-glass">
                <div className="npm-ring-wrap">
                  <svg viewBox="0 0 120 120" className="npm-ring-svg">
                    <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="9" />
                    <circle
                      cx="60" cy="60" r="46" fill="none"
                      className={`npm-ring-fill--${node.cls}`} strokeWidth="9"
                      strokeDasharray="289.03" strokeDashoffset={node.offset}
                      strokeLinecap="round" transform="rotate(-90 60 60)"
                    />
                  </svg>
                  <div className="npm-ring-center">
                    <span className={`npm-ring-val${node.cls !== "cyan" ? ` npm-ring-val--${node.cls}` : ""}`}>{node.health}</span>
                    <span className="npm-ring-sub">HEALTH</span>
                  </div>
                </div>
                <div className="npm-node-id">NODE {node.id}</div>
                <div className="npm-location">{node.city}</div>
                <div className={`npm-status ${node.syncing ? "npm-status--sync" : "npm-status--active"}`}>
                  {node.syncing ? "SYNCING" : "ACTIVE"}
                </div>
                <div className="npm-metrics">
                  <div className="npm-metric">
                    <span className={`npm-metric-val${node.cls !== "cyan" ? ` npm-metric-val--${node.cls}` : ""}`}>{node.latency}<em>ms</em></span>
                    <span className="npm-metric-label">Latency</span>
                  </div>
                  <div className="npm-metric-sep" />
                  <div className="npm-metric">
                    <span className={`npm-metric-val${node.cls !== "cyan" ? ` npm-metric-val--${node.cls}` : ""}`}>{node.tput}<em>/s</em></span>
                    <span className="npm-metric-label">Throughput</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── Architecture Schema ───────────────────────────────────────── */}
      <RevealSection className="stitch-section stitch-arch-schema">
        <div className="stitch-container">
          <div className="hp-section-label section-heading-center">Architecture</div>
          <h2 className="hp-section-title section-title-center section-title-gap-2xl">
            Three-layer <em>system architecture.</em>
          </h2>
          {[
            { num: "1", title: "Core Ledger Layer", desc: "The foundation of the financial infrastructure — immutable, high-concurrency transaction processing with built-in audit trails.", color: "var(--cyan)", bg: "rgba(75,227,214,0.15)", line: "linear-gradient(to bottom, var(--cyan), #3b82f6)" },
            { num: "2", title: "Service Mesh Gateway", desc: "Secure communication between microservices — low-latency data flow with 256-bit encryption and mTLS across all service boundaries.", color: "#3b82f6", bg: "rgba(59,130,246,0.15)", line: "linear-gradient(to bottom, #3b82f6, #64748b)" },
            { num: "3", title: "Reporting Engine", desc: "Operational intelligence that distills complex data into executive-ready reporting interfaces and real-time operational dashboards.", color: "#64748b", bg: "rgba(100,116,139,0.15)", line: null },
          ].map((step) => (
            <div key={step.num} className="stitch-arch-step">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="stitch-arch-circle" style={{ background: step.bg, border: `2px solid ${step.color}`, color: step.color }}>
                  {step.num}
                </div>
                {step.line && <div className="stitch-arch-line" style={{ background: step.line }} />}
              </div>
              <div className="stitch-glass" style={{ flex: 1, padding: "28px" }}>
                <h3 style={{ marginBottom: "10px" }}>{step.title}</h3>
                <p className="stitch-body">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </RevealSection>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <RevealSection as="div">
        <CtaBand
          kicker="Deploy your platform"
          heading={<>Ready to deploy <em>your infrastructure?</em></>}
          sub="Our team designs and delivers production-grade platforms built for African financial environments — from scoping through live deployment."
          primaryLabel="Start a conversation →"
          primaryHref="/contact"
          ghostLabel="Download specs"
          ghostHref="/company-profile"
        />
      </RevealSection>

    </main>
  );
}
