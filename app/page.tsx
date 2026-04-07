import type { Metadata } from "next";
import Link from "next/link";
import { RevealSection } from "@/components/reveal-section";
import { site } from "@/lib/site-content";

const solutions = [
  {
    title: "Banking Systems",
    description:
      "Core transaction, reporting, and customer operations infrastructure for financial institutions.",
  },
  {
    title: "Insurance Platforms",
    description:
      "Policy, claims, and workflow systems built for operational visibility and controlled scale.",
  },
  {
    title: "Logistics & Operations",
    description:
      "Tracking, coordination, and internal process infrastructure for distributed enterprise teams.",
  },
];

const workflowSteps = [
  "Assess business needs",
  "Design system architecture",
  "Build scalable platform",
  "Deploy and optimize",
];

const differentiators = [
  "Built for Africa",
  "Production-ready systems",
  "Secure and scalable",
  "Fast deployment",
];

const capabilities = [
  "API-first architecture",
  "MongoDB-based backend",
  "Modular systems",
  "Secure workflows",
];

const trustMetrics = [
  { label: "Uptime target", value: "99.9%" },
  { label: "Architecture", value: "Scalable" },
  { label: "Deployments", value: "Secure" },
];

const realWorldSystems = [
  "Secure architecture",
  "Scalable backend",
  "Production-ready deployment",
  "Enterprise-grade design",
];

const platformExamples = [
  "Dashboard systems",
  "Workflow automation",
  "Reporting engines",
  "Internal business platforms",
];

export const metadata: Metadata = {
  title: "Kelel IT Solution | Digital Infrastructure for Financial Systems",
  description:
    "Kelel IT Solution builds secure digital infrastructure for financial systems, insurance operations, and enterprise platforms.",
};

function DashboardMock() {
  return (
    <div className="saas-dashboard" aria-hidden="true">
      <div className="saas-dashboard-window">
        <div className="saas-dashboard-topbar">
          <span />
          <span />
          <span />
        </div>
        <div className="saas-dashboard-layout">
          <aside className="saas-dashboard-sidebar">
            <div className="saas-dashboard-brand">Kelel Core</div>
            <div className="saas-dashboard-nav">
              <span className="active">Infrastructure</span>
              <span>Payments</span>
              <span>Claims</span>
              <span>Reporting</span>
            </div>
          </aside>
          <div className="saas-dashboard-main">
            <div className="saas-dashboard-summary">
              <article>
                <span>Processing volume</span>
                <strong>1.2M</strong>
              </article>
              <article>
                <span>System health</span>
                <strong>99.9%</strong>
              </article>
              <article>
                <span>Active workflows</span>
                <strong>248</strong>
              </article>
            </div>
            <div className="saas-dashboard-grid">
              <section className="saas-dashboard-panel large">
                <div className="saas-panel-header">
                  <span>Infrastructure throughput</span>
                  <strong>Realtime</strong>
                </div>
                <div className="saas-chart">
                  <div className="saas-chart-bars">
                    <span style={{ height: "34%" }} />
                    <span style={{ height: "58%" }} />
                    <span style={{ height: "49%" }} />
                    <span style={{ height: "72%" }} />
                    <span style={{ height: "61%" }} />
                    <span style={{ height: "84%" }} />
                    <span style={{ height: "68%" }} />
                    <span style={{ height: "92%" }} />
                  </div>
                </div>
              </section>
              <section className="saas-dashboard-panel">
                <div className="saas-panel-header">
                  <span>Risk controls</span>
                  <strong>Secure</strong>
                </div>
                <div className="saas-stack-list">
                  <div>
                    <small>Access policy</small>
                    <strong>Enforced</strong>
                  </div>
                  <div>
                    <small>Audit trail</small>
                    <strong>Live</strong>
                  </div>
                  <div>
                    <small>Workflow states</small>
                    <strong>12 active</strong>
                  </div>
                </div>
              </section>
              <section className="saas-dashboard-panel">
                <div className="saas-panel-header">
                  <span>Architecture map</span>
                  <strong>Modular</strong>
                </div>
                <div className="saas-node-grid">
                  <span>API</span>
                  <span>Core</span>
                  <span>Data</span>
                  <span>Ops</span>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="fintech-home" id="home">
      <RevealSection as="section" className="fintech-hero">
        <div className="fintech-copy">
          <span className="fintech-eyebrow">Enterprise Platform Infrastructure</span>
          <h1>Digital Infrastructure for Financial Systems</h1>
          <p>
            We build secure, scalable platforms for banking, insurance, and enterprise
            operations.
          </p>
          <div className="hero-actions fintech-actions">
            <Link href="/contact" className="primary-link">
              Start a Project
            </Link>
            <Link href="/services" className="secondary-link">
              View Solutions
            </Link>
          </div>
          <div className="fintech-hero-meta">
            <div>
              <span>Based in</span>
              <strong>Addis Ababa</strong>
            </div>
            <div>
              <span>Focus</span>
              <strong>Financial + enterprise infrastructure</strong>
            </div>
            <div>
              <span>Contact</span>
              <strong>{site.email}</strong>
            </div>
          </div>
        </div>
        <DashboardMock />
      </RevealSection>

      <RevealSection as="section" id="solutions" className="fintech-section">
        <div className="fintech-section-head">
          <span className="fintech-eyebrow">Solutions</span>
          <h2>Core infrastructure areas</h2>
          <p>Three focused platform tracks for production environments.</p>
        </div>
        <div className="fintech-solution-grid">
          {solutions.map((item) => (
            <article key={item.title} className="fintech-solution-card">
              <span className="fintech-card-kicker">Platform track</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </RevealSection>

      <RevealSection as="section" className="fintech-section fintech-section-alt">
        <div className="fintech-section-head">
          <span className="fintech-eyebrow">How It Works</span>
          <h2>Delivery built for execution</h2>
          <p>A clean delivery path from architecture to live deployment.</p>
        </div>
        <div className="fintech-step-grid">
          {workflowSteps.map((step, index) => (
            <article key={step} className="fintech-step-card">
              <span className="fintech-step-index">0{index + 1}</span>
              <strong>{step}</strong>
            </article>
          ))}
        </div>
      </RevealSection>

      <RevealSection as="section" id="company" className="fintech-section">
        <div className="fintech-split">
          <div className="fintech-section-head">
            <span className="fintech-eyebrow">Why Kelel</span>
            <h2>Infrastructure designed for real operating environments</h2>
            <p>Technical clarity, deployment discipline, and systems built for production.</p>
          </div>
          <div className="fintech-mini-grid">
            {differentiators.map((item) => (
              <article key={item} className="fintech-mini-card">
                <div className="fintech-mini-icon" aria-hidden="true">
                  <span />
                </div>
                <strong>{item}</strong>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection as="section" id="platform" className="fintech-section fintech-section-alt">
        <div className="fintech-platform-layout">
          <div className="fintech-section-head">
            <span className="fintech-eyebrow">Platform Capabilities</span>
            <h2>Built for production environments</h2>
            <p>Composable architecture and operational readiness for enterprise platforms.</p>
            <ul className="fintech-capability-list">
              {capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="fintech-code-card">
            <div className="fintech-code-header">
              <span>Platform architecture</span>
              <strong>Production stack</strong>
            </div>
            <div className="fintech-code-lines">
              <span>Gateway / API Layer</span>
              <span>Secure Workflow Engine</span>
              <span>Operational Services</span>
              <span>MongoDB / Audit / Reporting</span>
              <span>Deployment / Monitoring</span>
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection as="section" className="fintech-section">
        <div className="fintech-split">
          <div className="fintech-section-head">
            <span className="fintech-eyebrow">Built for real-world systems</span>
            <h2>Architecture prepared for enterprise delivery</h2>
            <p>Operational resilience, secure deployment, and controlled scale built into the platform approach.</p>
          </div>
          <div className="fintech-mini-grid">
            {realWorldSystems.map((item) => (
              <article key={item} className="fintech-mini-card">
                <div className="fintech-mini-icon" aria-hidden="true">
                  <span />
                </div>
                <strong>{item}</strong>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection as="section" className="fintech-section fintech-section-alt">
        <div className="fintech-platform-layout">
          <div className="fintech-section-head">
            <span className="fintech-eyebrow">Example platform capabilities</span>
            <h2>Core modules for enterprise infrastructure</h2>
            <p>Focused capability blocks that can be combined into production-ready platform architecture.</p>
          </div>
          <div className="fintech-solution-grid fintech-solution-grid-compact">
            {platformExamples.map((item) => (
              <article key={item} className="fintech-solution-card">
                <span className="fintech-card-kicker">Capability</span>
                <h3>{item}</h3>
                <p>Structured platform delivery aligned to operational visibility, control, and scale.</p>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection as="section" className="fintech-section">
        <div className="fintech-trust-layout">
          <div className="fintech-section-head">
            <span className="fintech-eyebrow">Trust</span>
            <h2>Built for resilient infrastructure</h2>
            <p>Enterprise deployment posture with reliability, scale, and security in view.</p>
          </div>
          <div className="fintech-metric-row">
            {trustMetrics.map((metric) => (
              <article key={metric.label} className="fintech-metric-card">
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection as="section" id="contact" className="fintech-section fintech-cta-section">
        <div className="fintech-cta-card">
          <div className="fintech-section-head">
            <span className="fintech-eyebrow">Start a Project</span>
            <h2>Let&apos;s build your next system</h2>
            <p>Architecture-first delivery for financial and enterprise operations.</p>
          </div>
          <div className="hero-actions fintech-actions">
            <Link href="/contact" className="primary-link">
              Start a Project
            </Link>
            <Link
              href="/request-proposal?focus=dashboard&source=home-architecture-proposal"
              className="secondary-link"
            >
              Request Architecture Proposal
            </Link>
          </div>
        </div>
      </RevealSection>
    </main>
  );
}
