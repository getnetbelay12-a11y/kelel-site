import type { Metadata } from "next";
import Link from "next/link";
import { RevealSection } from "@/components/reveal-section";

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
      {/* Hero */}
      <RevealSection className="stitch-hero">
        <div className="stitch-container">
          <div className="stitch-hero-inner">
            <div className="stitch-hero-copy">
              <span className="stitch-kicker">AI &amp; INTELLIGENT SYSTEMS</span>
              <h1 className="stitch-h1">
                Intelligence built into operational platforms.
              </h1>
              <p className="stitch-body">
                We embed AI-powered automation, predictive analytics, and smart
                monitoring directly into the platforms African enterprises rely
                on — so every decision is faster, smarter, and backed by data.
              </p>
              <div className="stitch-hero-ctas">
                <Link href="/contact" className="stitch-btn-primary">
                  Deploy Intelligence
                </Link>
                <Link href="/services" className="stitch-btn-ghost">
                  Explore Services
                </Link>
              </div>
            </div>

            {/* 2×2 Bento Visualization */}
            <div className="stitch-bento-2x2">
              {/* Tall left card — Realtime Flow bar chart */}
              <div className="stitch-glass stitch-bento-tall">
                <div className="stitch-bento-label">Realtime Flow</div>
                <div className="stitch-bar-chart">
                  {barHeights.map((h, i) => (
                    <div
                      key={i}
                      className="stitch-bar"
                      style={{ height: h }}
                    />
                  ))}
                </div>
                <div className="stitch-bento-sub">NODE THROUGHPUT / LIVE</div>
              </div>

              {/* Top-right — Operational Health ring */}
              <div className="stitch-glass stitch-bento-sm">
                <div className="stitch-bento-label">Operational Health</div>
                <div className="stitch-health-ring">
                  <span>99%</span>
                </div>
              </div>

              {/* Bottom-right — Active Nodes */}
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
        </div>
      </RevealSection>

      {/* Capabilities Grid */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="stitch-section-header">
            <span className="stitch-kicker">CORE CAPABILITIES</span>
            <h2 className="stitch-h2">What intelligent systems do for your operations</h2>
          </div>
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

      {/* Command Center */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="stitch-section-header">
            <span className="stitch-kicker">COMMAND CENTER</span>
            <h2 className="stitch-h2">One console. Full operational visibility.</h2>
            <p className="stitch-body">
              A unified control surface that surfaces live system signals,
              health indicators, and intelligent alerts across your entire
              operational footprint.
            </p>
          </div>

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
      <RevealSection className="stitch-cta-section">
        <div className="stitch-container">
          <span className="stitch-kicker">GET STARTED</span>
          <h2 className="stitch-h2">Ready to deploy regional intelligence?</h2>
          <p className="stitch-body">
            Let&apos;s build AI-driven systems tailored to your operational
            environment — from Addis Ababa to Nairobi and beyond.
          </p>
          <div className="stitch-cta-btns">
            <Link href="/contact" className="stitch-btn-primary">
              Start a Conversation
            </Link>
            <Link href="/request-proposal" className="stitch-btn-ghost">
              Request Proposal
            </Link>
          </div>
        </div>
      </RevealSection>
    </main>
  );
}
