import type { Metadata } from "next";
import Link from "next/link";
import { RevealSection } from "@/components/reveal-section";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Intelligent Solutions | Kelel IT Solution",
  description:
    "AI-powered workflow automation, predictive analytics, and intelligent monitoring for African enterprise operations.",
};

const capabilities = [
  {
    icon: "🔀",
    title: "Intelligent workflow automation",
    body: "Approval routing, task orchestration, and decision flows designed for live operational teams.",
    checks: ["Dynamic Case Logic", "Automated Escalation"],
  },
  {
    icon: "📊",
    title: "Predictive analytics and reporting",
    body: "Data-driven reporting surfaces that highlight trends, exceptions, and performance bottlenecks.",
    checks: ["Anomaly Detection", "Trend Forecasting"],
    color: "secondary",
  },
  {
    icon: "🤖",
    title: "Data-driven decision systems",
    body: "Operational systems that combine reporting, controls, and signals for CEO/COO next-step decisions.",
    checks: ["Executive Dashboards", "Risk Mitigation AI"],
    badge: "HOT",
  },
  {
    icon: "👁",
    title: "AI-assisted operations monitoring",
    body: "Monitoring layers for alerts, anomaly review, and intelligent oversight across active systems.",
    checks: ["24/7 Pulse Monitoring", "Smart Alert Filtering"],
    color: "tertiary",
  },
];

const barHeights = ["40%", "65%", "50%", "80%", "55%", "70%", "45%", "90%", "60%", "75%"];

export default function IntelligentSolutionsPage() {
  return (
    <main className="stitch-page">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-crumbs">
            <Link href="/">Home</Link>
            <span className="page-crumbs-sep">/</span>
            <span>Intelligent Solutions</span>
          </div>
          <div className="page-hero-grid">
            <div>
              <div className="site-eyebrow" style={{ marginBottom: "24px" }}>
                <span className="site-eyebrow-dot" />
                AI &amp; Intelligent Systems
              </div>
              <h1 className="page-title-plain">
                Intelligence built into <em>operational platforms.</em>
              </h1>
              <p className="page-sub">
                We embed AI-powered automation, predictive analytics, and smart monitoring
                directly into the platforms African enterprises rely on — every decision faster,
                smarter, and backed by data.
              </p>
              <div style={{ display: "flex", gap: "12px", marginTop: "32px", flexWrap: "wrap" }}>
                <Link href="/contact" className="site-hero-btn-primary btn-magnetic">
                  Deploy intelligence →
                </Link>
                <Link href="/services" className="site-hero-btn-ghost">
                  Explore services
                </Link>
              </div>
            </div>
            <div className="page-meta">
              <div className="page-meta-row"><span>AI layer</span><span>Embedded · Not bolted on</span></div>
              <div className="page-meta-row"><span>Pipeline latency</span><span>&lt; 15ms</span></div>
              <div className="page-meta-row"><span>Routing accuracy</span><span>99.97%</span></div>
              <div className="page-meta-row"><span>Flows / day</span><span>2.4M (illustrative)</span></div>
              <div className="page-meta-row"><span>Manual steps</span><span>Zero</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento viz strip */}
      <RevealSection className="stitch-section" style={{ paddingTop: "60px" }}>
        <div className="stitch-container">
          <div className="stitch-bento-2x2" style={{ maxWidth: "640px" }}>
            <div className="stitch-glass stitch-bento-tall">
              <div className="stitch-bento-label">Realtime Flow</div>
              <div className="stitch-bar-chart">
                {barHeights.map((h, i) => (
                  <div key={i} className="stitch-bar" style={{ height: h }} />
                ))}
              </div>
              <div className="stitch-bento-sub">NODE THROUGHPUT / LIVE</div>
            </div>
            <div className="stitch-glass stitch-bento-sm">
              <div className="stitch-bento-label">Operational Health</div>
              <div className="stitch-health-ring"><span>99%</span></div>
            </div>
            <div className="stitch-glass stitch-bento-sm">
              <div className="stitch-bento-label">Active Nodes</div>
              <div className="stitch-bento-stat">1,248</div>
              <div className="stitch-progress-track">
                <div className="stitch-progress-fill" style={{ width: "82%" }} />
              </div>
              <div className="stitch-bento-sub">82% capacity</div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Capabilities Grid */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Core Capabilities</div>
          <h2 className="hp-section-title" style={{ marginBottom: "40px" }}>
            What intelligent systems do <em>for your operations.</em>
          </h2>
          <div className="stitch-caps-grid">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className={`stitch-cap-card${cap.color ? ` stitch-cap-card--${cap.color}` : ""}`}
              >
                <div className="stitch-cap-icon">{cap.icon}</div>
                <div className="stitch-cap-card-header">
                  <h3 className="stitch-cap-title">{cap.title}</h3>
                  {cap.badge && (
                    <span className="stitch-cap-badge">{cap.badge}</span>
                  )}
                </div>
                <p className="stitch-cap-body">{cap.body}</p>
                <ul className="stitch-cap-checks">
                  {cap.checks.map((check) => (
                    <li key={check} className="stitch-cap-check">
                      ✓ {check}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Workflow Automation Grid */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Workflow Engine</div>
          <h2 className="hp-section-title" style={{ marginBottom: "16px" }}>
            End-to-end <em>automation pipeline.</em>
          </h2>
          <p className="hp-section-intro">
            Every transaction, request, or signal passes through a structured pipeline — validated,
            processed, routed, and executed without manual intervention.
          </p>

          <div className="wf-pipeline">
            {/* Step 1 */}
            <div className="wf-step">
              <div className="wf-step-icon wf-step-icon--green">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                </svg>
              </div>
              <div className="wf-step-num">01</div>
              <div className="wf-step-title">Input Data</div>
              <div className="wf-step-body">Raw signals from APIs, files, or live feeds enter the system.</div>
              <div className="wf-step-badge wf-step-badge--green">LIVE</div>
            </div>

            <div className="wf-arrow" aria-hidden="true" />

            {/* Step 2 */}
            <div className="wf-step">
              <div className="wf-step-icon wf-step-icon--blue">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="wf-step-num">02</div>
              <div className="wf-step-title">Validate Schema</div>
              <div className="wf-step-body">Rules engine enforces compliance, format, and field integrity.</div>
              <div className="wf-step-badge wf-step-badge--blue">ENFORCED</div>
            </div>

            <div className="wf-arrow" aria-hidden="true" />

            {/* Step 3 */}
            <div className="wf-step">
              <div className="wf-step-icon wf-step-icon--green">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <div className="wf-step-num">03</div>
              <div className="wf-step-title">Process Logic</div>
              <div className="wf-step-body">AI engine applies business rules, transforms, and enriches data.</div>
              <div className="wf-step-badge wf-step-badge--green">AI</div>
            </div>

            <div className="wf-arrow" aria-hidden="true" />

            {/* Step 4 */}
            <div className="wf-step">
              <div className="wf-step-icon wf-step-icon--purple">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                </svg>
              </div>
              <div className="wf-step-num">04</div>
              <div className="wf-step-title">Route Decision</div>
              <div className="wf-step-body">Dynamic routing sends each payload to the correct downstream handler.</div>
              <div className="wf-step-badge wf-step-badge--purple">SMART</div>
            </div>

            <div className="wf-arrow" aria-hidden="true" />

            {/* Step 5 */}
            <div className="wf-step">
              <div className="wf-step-icon wf-step-icon--green">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <div className="wf-step-num">05</div>
              <div className="wf-step-title">Execute Action</div>
              <div className="wf-step-body">Transactional commits, API calls, and ledger writes fire atomically.</div>
              <div className="wf-step-badge wf-step-badge--green">ATOMIC</div>
            </div>

            <div className="wf-arrow" aria-hidden="true" />

            {/* Step 6 */}
            <div className="wf-step">
              <div className="wf-step-icon wf-step-icon--blue">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div className="wf-step-num">06</div>
              <div className="wf-step-title">Generate Report</div>
              <div className="wf-step-body">Structured output feeds dashboards, audit logs, and alerts instantly.</div>
              <div className="wf-step-badge wf-step-badge--blue">OUTPUT</div>
            </div>
          </div>

          {/* Pipeline stats row */}
          <div className="wf-stats">
            <div className="wf-stat">
              <span className="wf-stat-val">&lt;15ms</span>
              <span className="wf-stat-label">Pipeline latency</span>
            </div>
            <div className="wf-stat-sep" />
            <div className="wf-stat">
              <span className="wf-stat-val">99.97%</span>
              <span className="wf-stat-label">Routing accuracy</span>
            </div>
            <div className="wf-stat-sep" />
            <div className="wf-stat">
              <span className="wf-stat-val">2.4M</span>
              <span className="wf-stat-label">Flows / day</span>
            </div>
            <div className="wf-stat-sep" />
            <div className="wf-stat">
              <span className="wf-stat-val">Zero</span>
              <span className="wf-stat-label">Manual steps</span>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Command Center */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Command Center</div>
          <h2 className="hp-section-title" style={{ marginBottom: "16px" }}>
            One console. <em>Full operational visibility.</em>
          </h2>
          <p className="hp-section-intro">
            A unified control surface that surfaces live system signals,
            health indicators, and intelligent alerts across your entire
            operational footprint.
          </p>

          <div className="stitch-glass stitch-console">
            {/* Left panel */}
            <div className="stitch-console-left">
              <div className="stitch-console-title">Operational Control Console</div>

              <div className="stitch-status-row">
                <span className="stitch-status-dot stitch-status-dot--green" />
                <span className="stitch-status-label">All Systems Nominal</span>
              </div>
              <div className="stitch-status-row">
                <span className="stitch-status-dot stitch-status-dot--green" />
                <span className="stitch-status-label">AI Engine Active</span>
              </div>
              <div className="stitch-status-row">
                <span className="stitch-status-dot stitch-status-dot--yellow" />
                <span className="stitch-status-label">2 Alerts Pending Review</span>
              </div>
              <div className="stitch-status-row">
                <span className="stitch-status-dot stitch-status-dot--green" />
                <span className="stitch-status-label">Data Sync: Live</span>
              </div>

              <div className="stitch-latency-block">
                <div className="stitch-latency-label">LATENCY</div>
                <div className="stitch-latency-value">12ms</div>
                <div className="stitch-latency-sub">avg response / last 60s</div>
              </div>
            </div>

            {/* Right panel */}
            <div className="stitch-console-right">
              <div className="stitch-data-cards">
                <div className="stitch-data-card">
                  <div className="stitch-data-card-label">Transaction Flow</div>
                  <div className="stitch-data-card-value">$4.2M</div>
                  <div className="stitch-data-card-delta stitch-data-card-delta--up">
                    +12.4%
                  </div>
                </div>
                <div className="stitch-data-card">
                  <div className="stitch-data-card-label">Security Nodes</div>
                  <div className="stitch-data-card-value">248</div>
                  <div className="stitch-data-card-delta stitch-data-card-delta--stable">
                    Stable
                  </div>
                </div>
              </div>

              <div className="stitch-pulse-bar">
                <div className="stitch-pulse-bar-header">
                  <span className="stitch-pulse-bar-title">Live System Pulse</span>
                  <span className="stitch-pulse-bar-node">NODE-04 // ADDIS ABABA</span>
                </div>
                <div className="stitch-bar-chart stitch-bar-chart--pulse">
                  {["30%", "55%", "70%", "45%", "85%", "60%", "75%", "50%", "90%", "65%", "40%", "80%"].map(
                    (h, i) => (
                      <div
                        key={i}
                        className="stitch-bar stitch-bar--pulse"
                        style={{ height: h }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* CTA */}
      <RevealSection as="div">
        <CtaBand
          kicker="Get Started"
          heading={<>Ready to deploy <em>regional intelligence?</em></>}
          sub="Let's build AI-driven systems tailored to your operational environment — from Addis Ababa to Nairobi and beyond."
          primaryLabel="Start a conversation →"
          primaryHref="/contact"
          ghostLabel="Request proposal"
          ghostHref="/request-proposal"
        />
      </RevealSection>
    </main>
  );
}
