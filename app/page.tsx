import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { RevealSection } from "@/components/reveal-section";

const solutions = [
  {
    id: "01",
    title: "Banking Systems",
    description: "Core platforms for reporting, controls, and transaction-ready operations.",
  },
  {
    id: "02",
    title: "Insurance Platforms",
    description: "Systems for policy workflows, claims visibility, and operational control.",
  },
  {
    id: "03",
    title: "Enterprise Operations",
    description: "Internal tools that improve coordination, dashboards, and business oversight.",
  },
];

const platformPoints = [
  "API-first architecture",
  "Scalable backend systems",
  "Secure workflows",
  "Modular deployment",
];

const africaFocusPoints = [
  "Designed for local infrastructure realities",
  "Adapted to regulatory and operating environments",
  "Built for regional scale across African operations",
];

const organizationTypes = [
  {
    title: "Banks and financial institutions",
    description: "Secure systems for reporting, controls, and digital operations.",
  },
  {
    title: "Insurance providers",
    description: "Platforms for policy flows, claims visibility, and oversight.",
  },
  {
    title: "Logistics and operations companies",
    description: "Workflow tools that improve coordination and live visibility.",
  },
  {
    title: "Growing enterprises",
    description: "Modern systems that replace manual work with structured processes.",
  },
];

const useCases = [
  "Digital banking platforms",
  "Insurance policy systems",
  "Internal operations dashboards",
  "Workflow automation systems",
];

const deliverySteps = [
  {
    id: "01",
    title: "Understand your business requirements",
    description: "Map priorities, workflows, and operating needs.",
  },
  {
    id: "02",
    title: "Design system architecture",
    description: "Define the right platform model and technical structure.",
  },
  {
    id: "03",
    title: "Build and test platform",
    description: "Implement, validate, and prepare for production use.",
  },
  {
    id: "04",
    title: "Deploy and support",
    description: "Launch with monitoring, support, and continued improvement.",
  },
];

const trustMetrics = [
  { value: "99.9%", label: "uptime-ready architecture" },
  { value: "Modular", label: "deployment structure" },
  { value: "Secure", label: "workflow controls" },
  { value: "Realtime", label: "reporting visibility" },
];

const africanSystemFocus = ["Banking", "Insurance", "Logistics"];

const credibilityLines = [
  "Production-ready systems",
  "Built for scale",
  "Secure by design",
  "Designed for real-world operations",
];

export const metadata: Metadata = {
  title: "Kelel IT Solution | Digital Infrastructure for Financial Systems",
  description:
    "We design and deploy production-ready digital systems for banks, insurance, and enterprise operations across Africa.",
};

function InfrastructureVisual() {
  return (
    <div className="infra-visual" aria-hidden="true">
      <div className="infra-shell">
        <div className="infra-africa-map">
          <svg viewBox="0 0 360 420" role="presentation">
            <path d="M172 24l42 26 18 40 26 18 8 34-20 24 8 34-20 28-10 56-34 30-16 42-30 12-20-24-24-12-18-40-32-20-10-40 16-34-16-30 22-42 28-18 22-52 60-32z" />
            <path d="M196 250l22 18 6 28-26 18" />
            <path d="M174 292l-20 22 14 24" />
          </svg>
          <span className="node node-a" />
          <span className="node node-b" />
          <span className="node node-c" />
          <span className="node node-d" />
          <span className="beam beam-a" />
          <span className="beam beam-b" />
          <span className="beam beam-c" />
        </div>
        <div className="infra-topbar">
          <span />
          <span />
          <span />
        </div>
        <div className="infra-body">
          <div className="infra-sidebar">
            <strong>Kelel Core</strong>
            <span className="active">Infrastructure</span>
            <span>Operations</span>
            <span>Controls</span>
            <span>Reporting</span>
          </div>
          <div className="infra-main">
            <div className="infra-stat-row">
              <article>
                <small>System health</small>
                <strong>99.9%</strong>
              </article>
              <article>
                <small>Active flows</small>
                <strong>248</strong>
              </article>
              <article>
                <small>Regions</small>
                <strong>03</strong>
              </article>
            </div>
            <div className="infra-grid">
              <article className="infra-card infra-card-wide">
                <div className="infra-card-head">
                  <small>Platform throughput</small>
                  <strong>Realtime</strong>
                </div>
                <div className="infra-chart">
                  <span style={{ height: "34%" }} />
                  <span style={{ height: "44%" }} />
                  <span style={{ height: "39%" }} />
                  <span style={{ height: "61%" }} />
                  <span style={{ height: "56%" }} />
                  <span style={{ height: "72%" }} />
                  <span style={{ height: "66%" }} />
                  <span style={{ height: "86%" }} />
                </div>
              </article>
              <article className="infra-card">
                <div className="infra-card-head">
                  <small>Workflow security</small>
                  <strong>Enforced</strong>
                </div>
                <div className="infra-stack">
                  <span>Access policy live</span>
                  <span>Audit trail active</span>
                </div>
              </article>
              <article className="infra-card">
                <div className="infra-card-head">
                  <small>Architecture model</small>
                  <strong>Modular</strong>
                </div>
                <div className="infra-node-grid">
                  <span>API</span>
                  <span>Core</span>
                  <span>Data</span>
                  <span>Ops</span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArchitectureVisual() {
  return (
    <div className="architecture-visual" aria-hidden="true">
      <div className="architecture-shell">
        <div className="architecture-column">
          <small>Architecture view</small>
          <strong>Production stack</strong>
        </div>
        <div className="architecture-flow">
          <span>Gateway / API layer</span>
          <span>Business logic services</span>
          <span>Workflow controls</span>
          <span>Data / audit / reporting</span>
          <span>Monitoring / deployment</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="infra-homepage">
      <RevealSection as="section" id="home" className="infra-hero">
        <div className="infra-hero-copy">
          <span className="infra-eyebrow">Built for African markets. Designed for global standards.</span>
          <h1>Digital Infrastructure for Financial Systems</h1>
          <p>We design and deploy production-ready digital systems for banks, insurance, and enterprise operations across Africa.</p>
          <div className="infra-actions">
            <Link href="/contact" className="primary-link">
              Start a Project
            </Link>
            <Link href="/#solutions" className="secondary-link">
              View Solutions
            </Link>
          </div>
          <div className="infra-micro-lines" aria-label="Credibility">
            {credibilityLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </div>
        <InfrastructureVisual />
      </RevealSection>

      <RevealSection as="section" className="infra-section">
        <div className="infra-section-heading">
          <span className="infra-eyebrow">Who we work with</span>
          <h2>Built for organizations that need real systems</h2>
          <p>Structured for technical buyers, operating teams, and growing businesses across Africa.</p>
        </div>
        <div className="infra-grid-two">
          {organizationTypes.map((item) => (
            <article key={item.title} className="infra-feature-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </RevealSection>

      <RevealSection as="section" id="solutions" className="infra-section infra-section-centered">
        <div className="infra-section-heading infra-section-heading-centered">
          <span className="infra-eyebrow">Solutions</span>
          <h2>Focused infrastructure for critical operating environments</h2>
          <p>Built for control, reporting, and production readiness.</p>
        </div>
        <div className="infra-grid-three">
          {solutions.map((solution) => (
            <article key={solution.title} className="infra-feature-card">
              <div className="infra-card-top">
                <span>{solution.id}</span>
                <h3>{solution.title}</h3>
              </div>
              <p>{solution.description}</p>
            </article>
          ))}
        </div>
      </RevealSection>

      <RevealSection as="section" id="platform" className="infra-section">
        <div className="infra-split">
          <div className="infra-section-heading">
            <span className="infra-eyebrow">Modern architecture</span>
            <h2>Architecture that supports live systems</h2>
            <p>Clear foundations for secure, scalable, and production-ready deployment across African markets.</p>
            <ul className="infra-list">
              {platformPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="infra-africa-callout">
              <strong>Built for Africa</strong>
              <ul className="infra-list">
                {africaFocusPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
          <ArchitectureVisual />
        </div>
      </RevealSection>

      <RevealSection as="section" className="infra-section">
        <div className="infra-section-heading">
          <span className="infra-eyebrow">Engagement model</span>
          <h2>How we work</h2>
          <p>Minimal, structured, and built for real delivery.</p>
        </div>
        <div className="infra-grid-four">
          {deliverySteps.map((step) => (
            <article key={step.id} className="infra-step-card">
              <span className="infra-step-id">{step.id}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </RevealSection>

      <RevealSection as="section" className="infra-section">
        <div className="infra-section-heading infra-section-heading-centered">
          <span className="infra-eyebrow">Capabilities</span>
          <h2>Example platform use cases</h2>
          <p>Clear platform directions for serious operating environments.</p>
        </div>
        <div className="infra-grid-four">
          {useCases.map((item) => (
            <article key={item} className="infra-feature-card">
              <h3>{item}</h3>
              <p>Designed for secure workflows, reporting, and operational control.</p>
            </article>
          ))}
        </div>
      </RevealSection>

      <RevealSection as="section" id="company" className="infra-section infra-section-wide">
        <div className="infra-section-heading infra-section-heading-wide">
          <span className="infra-eyebrow">Trust</span>
          <h2>Production credibility built into the platform model</h2>
          <p>Focused on African financial and operational systems.</p>
          <div className="infra-micro-lines" aria-label="African system focus">
            {africanSystemFocus.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="infra-grid-four">
          {trustMetrics.map((metric) => (
            <article key={metric.label} className="infra-metric-card">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </article>
          ))}
        </div>
      </RevealSection>

      <RevealSection as="section" id="contact" className="infra-section">
        <div className="infra-cta infra-cta-split">
          <div className="infra-section-heading">
            <span className="infra-eyebrow">Start a project</span>
            <h2>Start a project</h2>
            <p>Tell us what you need. We design and deploy production-ready platforms.</p>
            <div className="infra-actions">
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
            <p className="infra-response-note">We respond within 24-48 hours.</p>
          </div>
          <div className="infra-form-panel">
            <ContactForm
              compactFields
              sourcePage="home-page"
              requestFocus="production-platform"
              submitLabel="Send Request"
              helperCopy="We respond within 24-48 hours."
              detailsLabel="Message"
              detailsPlaceholder="Tell us about your system, goals, or project requirements."
            />
          </div>
        </div>
      </RevealSection>
    </main>
  );
}
