import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { RevealSection } from "@/components/reveal-section";
import { NexusAfricaMap } from "@/components/nexus-africa-map";
import { site } from "@/lib/site-content";

const ContactForm = dynamic(
  () => import("@/components/contact-form").then((mod) => mod.ContactForm),
);

const ChatWithKelel = dynamic(
  () => import("@/components/chat-with-kelel").then((mod) => mod.ChatWithKelel),
);

const serviceTracks = [
  {
    id: "01",
    tag: "Architecture",
    icon: "⬡",
    title: "Platform Architecture",
    description:
      "End-to-end system design for secure, scalable, production-ready platforms.",
    bullets: ["Distributed Systems", "Cloud-Native Infrastructure", "Security-First Design"],
    href: "/services?focus=platform-architecture",
  },
  {
    id: "02",
    tag: "Performance",
    icon: "⚡",
    title: "Performance Optimization",
    description:
      "Performance tuning, reliability improvement, and operational efficiency across live systems.",
    bullets: ["Sub-50ms Latency", "99.9% Uptime Targets", "Load Optimization"],
    href: "/services?focus=system-optimization",
  },
  {
    id: "03",
    tag: "Data",
    icon: "◈",
    title: "Data Infrastructure",
    description:
      "Scalable database architecture, data modeling, and infrastructure for high-volume operations.",
    bullets: ["Real-time Analytics", "High-Volume Pipelines", "Data Governance"],
    href: "/services?focus=data-infrastructure",
  },
];

const nexusTrustTags = [
  "API-First Architecture",
  "Banking Platforms",
  "Insurance Systems",
  "Enterprise Dashboards",
  "Real-time Analytics",
  "Workflow Automation",
  "Data Infrastructure",
  "Secure Operations",
  "African Markets",
  "Production-Ready",
];

const industries = [
  {
    title: "Banks and financial institutions",
    description: "Built for digital transformation, reporting visibility, and operational control.",
    href: "/industries/operations-heavy-organizations",
  },
  {
    title: "Insurance providers",
    description: "Designed for policy systems, renewal automation, and claims operations.",
    href: "/industries/teams-modernizing-internal-workflows",
  },
  {
    title: "Logistics and operations companies",
    description: "Structured for live workflows, tracking visibility, and business coordination.",
    href: "/industries/operations-heavy-organizations",
  },
  {
    title: "Growing enterprises",
    description: "Scalable systems for teams moving from manual work to dependable digital operations.",
    href: "/industries/smes-and-growing-enterprises",
  },
];

const platformCapabilities = [
  {
    title: "API-first systems",
    description: "Integration-ready services built for extensibility across teams and platforms.",
  },
  {
    title: "Secure workflows",
    description: "Permissions, controls, and approvals designed for operational trust.",
  },
  {
    title: "Modular deployment",
    description: "Phased rollout paths that support maintainability and business continuity.",
  },
  {
    title: "Reporting and visibility",
    description: "Dashboards, KPIs, and operational oversight for faster decision-making.",
  },
];

const proofStories = [
  {
    title: "Banking Platform Concept",
    description: "A premium concept for digital banking operations, dashboards, and control layers.",
    label: "Financial systems",
    href: "/work/multi-branch-operations-platform",
  },
  {
    title: "Insurance Workflow System",
    description: "Claims, renewals, and internal operations managed through one cleaner workflow model.",
    label: "Insurance operations",
    href: "/work/it-infrastructure-improvement-track",
  },
  {
    title: "Operations Dashboard Preview",
    description: "Executive-ready oversight for field teams, service operations, and internal reporting.",
    label: "Operational visibility",
    href: "/work/multi-branch-operations-platform",
  },
  {
    title: "Enterprise Portal Concept",
    description: "A structured portal layer for business processes, approvals, and regional coordination.",
    label: "Enterprise platform",
    href: "/work",
  },
];

const caseStudyPreview = {
  label: "Featured system example",
  title: "Multi-branch operations platform",
  description:
    "A production-style concept for approvals, reporting, branch visibility, and operating controls across distributed teams.",
  metrics: ["Approval workflows", "Regional reporting", "Executive visibility"],
  href: "/work/multi-branch-operations-platform",
};

const trustMetrics = [
  { value: "99.9%", label: "uptime-ready architecture" },
  { value: "API-first", label: "platform approach" },
  { value: "Secure", label: "workflow controls" },
  { value: "Regional", label: "operational scale" },
];

const deliverySteps = [
  "Understand your business",
  "Design system architecture",
  "Build scalable platform",
  "Deploy and support",
];

const useCases = [
  {
    title: "Banking platforms",
    description: "Operational layers for controls, reporting, transactions, and oversight.",
  },
  {
    title: "Insurance systems",
    description: "Workflow-driven policy, renewal, claims, and service environments.",
  },
  {
    title: "Internal dashboards",
    description: "Decision-ready visibility for executives, teams, and operational leads.",
  },
  {
    title: "Workflow automation",
    description: "Structured approvals, handoffs, and activity tracking across live operations.",
  },
  {
    title: "AI-powered analytics systems",
    description: "Data-driven reporting layers with anomaly detection, trend visibility, and faster decision support.",
  },
];

const simpleProof = [
  "Real-time dashboards",
  "AI-assisted insights",
  "Workflow automation",
  "Data systems",
  "Enterprise tools",
];

const whyKelel = [
  "Built for Africa",
  "Production-ready systems",
  "Intelligent systems",
  "Scalable architecture",
  "Enterprise-grade design",
];

const intelligentSystems = [
  {
    title: "Intelligent workflow automation",
    description: "Approval routing, task orchestration, and decision flows designed for live operational teams.",
  },
  {
    title: "Predictive analytics and reporting",
    description: "Data-driven reporting surfaces that highlight trends, exceptions, and performance changes faster.",
  },
  {
    title: "Data-driven decision systems",
    description: "Operational systems that combine reporting, controls, and signals for clearer next-step decisions.",
  },
  {
    title: "AI-assisted operations monitoring",
    description: "Monitoring layers for alerts, anomaly review, and intelligent oversight across active systems.",
  },
];

const companySummary = [
  "Kelel IT Solution is based in Addis Ababa, Ethiopia.",
  "We build secure digital systems for banking, insurance, and enterprise operations.",
  "Our work focuses on platform architecture, performance improvement, and data infrastructure.",
];

export const metadata: Metadata = {
  title: "Kelel IT Solution | Digital Infrastructure for Financial Systems in Africa",
  description:
    "Kelel IT Solution builds secure, scalable platforms for banking, insurance, and enterprise operations across Africa.",
};

function OperationsConsole() {
  return (
    <div className="hero-console" aria-hidden="true">
      <div className="hero-console-topbar">
        <span />
        <span />
        <span />
      </div>

      <div className="hero-console-grid">
        <aside className="hero-console-sidebar">
          <strong>Kelel Core</strong>
          <span className="active">Infrastructure</span>
          <span>Operations</span>
          <span>Controls</span>
          <span>Reporting</span>
        </aside>

        <div className="hero-console-main">
          <div className="hero-console-stats">
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

          <div className="hero-console-panels">
            <article className="hero-console-panel hero-console-panel-chart">
              <div className="hero-console-panel-head">
                <small>Platform throughput</small>
                <strong>Realtime</strong>
              </div>
              <div className="hero-console-chart">
                <span style={{ height: "34%" }} />
                <span style={{ height: "46%" }} />
                <span style={{ height: "40%" }} />
                <span style={{ height: "58%" }} />
                <span style={{ height: "72%" }} />
                <span style={{ height: "66%" }} />
                <span style={{ height: "84%" }} />
              </div>
            </article>

            <div className="hero-console-panel-stack">
              <article className="hero-console-panel">
                <div className="hero-console-panel-head">
                  <small>Workflow security</small>
                  <strong>Enforced</strong>
                </div>
                <div className="hero-console-stack">
                  <span>Access policy live</span>
                  <span>Audit trail active</span>
                </div>
              </article>

              <article className="hero-console-panel">
                <div className="hero-console-panel-head">
                  <small>Architecture model</small>
                  <strong>Modular</strong>
                </div>
                <div className="hero-console-node-grid">
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

const PULSE_BARS = ["38%","55%","42%","70%","82%","65%","90%","58%","74%","48%","86%","62%"];

function HeroDashboard() {
  return (
    <div className="hdash-panel" aria-hidden="true">
      {/* Row 1: Health ring + metrics */}
      <div className="hdash-top-row">
        <div className="hdash-card hdash-card--ring stitch-glass">
          <span className="hdash-label">System Health</span>
          <div className="hdash-ring-wrap">
            <svg viewBox="0 0 120 120" className="hdash-ring-svg">
              <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="9"/>
              <circle cx="60" cy="60" r="46" fill="none" stroke="#10b981" strokeWidth="9"
                strokeDasharray="289.03" strokeDashoffset="0.29"
                strokeLinecap="round" transform="rotate(-90 60 60)"/>
            </svg>
            <div className="hdash-ring-center">
              <span className="hdash-ring-val">99.9%</span>
              <span className="hdash-ring-unit">uptime</span>
            </div>
          </div>
        </div>
        <div className="hdash-card hdash-card--metrics stitch-glass">
          <div className="hdash-metric-item">
            <span className="hdash-label">Latency</span>
            <span className="hdash-metric-num">&lt;45<em>ms</em></span>
          </div>
          <div className="hdash-metric-bar"><div style={{ width: "22%" }}/></div>
          <div className="hdash-metric-item">
            <span className="hdash-label">Active Flows</span>
            <span className="hdash-metric-num hdash-metric-num--sm">1,248</span>
          </div>
          <div className="hdash-metric-bar"><div style={{ width: "82%" }}/></div>
        </div>
      </div>

      {/* Row 2: Node connectivity */}
      <div className="hdash-card stitch-glass">
        <span className="hdash-label">Node Connectivity</span>
        <div className="hdash-nodes">
          <div className="hdash-node">
            <span className="hdash-dot hdash-dot--primary"/>
            <span className="hdash-node-name">Addis Ababa</span>
            <span className="hdash-badge hdash-badge--green">Primary Hub</span>
          </div>
          <div className="hdash-node">
            <span className="hdash-dot hdash-dot--blue"/>
            <span className="hdash-node-name">Nairobi</span>
            <span className="hdash-badge hdash-badge--blue">Active</span>
          </div>
          <div className="hdash-node">
            <span className="hdash-dot hdash-dot--dim"/>
            <span className="hdash-node-name">Lagos</span>
            <span className="hdash-badge hdash-badge--dim">Standby</span>
          </div>
        </div>
      </div>

      {/* Row 3: System Pulse */}
      <div className="hdash-card stitch-glass">
        <div className="hdash-pulse-header">
          <span className="hdash-label">System Pulse</span>
          <span className="hdash-live">● LIVE</span>
        </div>
        <div className="hdash-pulse-bars">
          {PULSE_BARS.map((h, i) => (
            <div key={i} className="hdash-pulse-bar" style={{ height: h }}/>
          ))}
        </div>
        <span className="hdash-label">Transaction throughput / realtime</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="enterprise-homepage">
      <RevealSection as="section" id="home" className="enterprise-hero">
        {/* Ambient floating particle nodes */}
        <div className="nexus-hero-particles" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className={`nhp-node nhp-${i}`} />
          ))}
        </div>

        <div className="enterprise-hero-wrap">
          <div className="enterprise-hero-copy">
            <div className="enterprise-hero-headingline">
              <span className="enterprise-kicker"><i className="nexus-live-dot" />Enterprise · Addis Ababa</span>
              <h1>Enterprise systems<br />built for <em>Africa.</em></h1>
              <h2>Digital infrastructure and intelligent platforms for banking, insurance, and operations</h2>
            </div>
            <p>Secure, scalable platforms purpose-built for African financial operations and enterprise teams.</p>
            <p className="enterprise-tech-line">Powered by data, automation, and AI-driven insights.</p>
            <div className="enterprise-actions">
              <Link href="/#contact" className="primary-link">
                Start a Project
              </Link>
              <Link href={site.calendlyPlaceholder} className="secondary-link">
                Book a Call
              </Link>
            </div>
            <p className="enterprise-hero-note">Designed and built by teams operating across Africa.</p>
          </div>

          <div className="enterprise-hero-right">
            <HeroDashboard />
          </div>
        </div>
      </RevealSection>

      {/* Capability trust strip */}
      <div className="nexus-trust-strip" aria-hidden="true">
        <div className="nexus-trust-track">
          {[...nexusTrustTags, ...nexusTrustTags].map((tag, i) => (
            <span key={i} className="nexus-trust-tag">{tag}</span>
          ))}
        </div>
      </div>

      <RevealSection as="section" className="enterprise-section enterprise-africa-section">
        <div className="enterprise-africa-wrap">
          <div className="enterprise-section-heading">
            <span className="enterprise-kicker">Our Reach</span>
            <h2>Built in Ethiopia.<br />Connected across Africa.</h2>
            <p>Kelel operates from Addis Ababa with infrastructure reaching financial and enterprise teams across the continent.</p>
            <div className="enterprise-africa-stats">
              <div>
                <strong>12</strong>
                <span>Active nodes</span>
              </div>
              <div>
                <strong>5+</strong>
                <span>Markets served</span>
              </div>
              <div>
                <strong>99.9%</strong>
                <span>Network uptime</span>
              </div>
            </div>
          </div>
          <NexusAfricaMap />
        </div>
      </RevealSection>

      <RevealSection as="section" className="enterprise-section">
        <div className="enterprise-editorial-layout enterprise-editorial-layout-reverse">
          <div className="enterprise-platform-panel">
            <span className="enterprise-panel-label">Why Kelel</span>
            <div className="enterprise-capability-list">
              {whyKelel.map((item) => (
                <article key={item}>
                  <strong>{item}</strong>
                </article>
              ))}
            </div>
          </div>
          <div className="enterprise-section-heading">
            <span className="enterprise-kicker">Trust Signals</span>
            <h2>No shortcuts.<br />No guesswork.</h2>
            <p>Production-grade delivery, African market context, and architecture that scales.</p>
          </div>
        </div>
      </RevealSection>

      <RevealSection as="section" className="enterprise-section">
        <div className="enterprise-section-heading">
          <span className="enterprise-kicker">System Preview</span>
          <h2>Inside the platforms we build.</h2>
          <p>Architecture, workflow, reporting, and monitoring surfaces for real operations.</p>
        </div>
        {/* System topology visualization */}
        <div className="hp-topo" aria-hidden="true">
          {/* Topology top row */}
          <div className="hp-topo-row">
            <div className="hp-topo-node">
              <div className="hp-topo-icon">⚡</div>
              <span>Auth Gateway</span>
              <span className="hp-topo-status hp-topo-status--on">ON</span>
            </div>
            <div className="hp-topo-connector"/>
            <div className="hp-topo-node hp-topo-node--core">
              <div className="hp-topo-core-ring"/>
              <div className="hp-topo-core-text">
                <span>CORE</span>
                <span>API</span>
              </div>
            </div>
            <div className="hp-topo-connector"/>
            <div className="hp-topo-node">
              <div className="hp-topo-icon hp-topo-icon--blue">◈</div>
              <span>Data Store</span>
              <span className="hp-topo-status hp-topo-status--on">ON</span>
            </div>
          </div>

          {/* Vertical connectors */}
          <div className="hp-topo-vrow">
            <div className="hp-topo-vline"/>
            <div className="hp-topo-vline hp-topo-vline--center"/>
            <div className="hp-topo-vline"/>
          </div>

          {/* Topology bottom row */}
          <div className="hp-topo-row">
            <div className="hp-topo-node">
              <div className="hp-topo-icon hp-topo-icon--purple">⬡</div>
              <span>Security</span>
              <span className="hp-topo-status hp-topo-status--on">ON</span>
            </div>
            <div className="hp-topo-connector"/>
            <div className="hp-topo-node">
              <div className="hp-topo-icon">📊</div>
              <span>Reporting</span>
              <span className="hp-topo-status hp-topo-status--on">ON</span>
            </div>
            <div className="hp-topo-connector"/>
            <div className="hp-topo-node">
              <div className="hp-topo-icon hp-topo-icon--blue">🤖</div>
              <span>AI Engine</span>
              <span className="hp-topo-status hp-topo-status--pulse">LIVE</span>
            </div>
          </div>

          {/* Bottom metrics strip */}
          <div className="hp-topo-metrics">
            <div className="hp-topo-metric">
              <span className="hp-topo-metric-val">99.9%</span>
              <span className="hp-topo-metric-label">System Health</span>
            </div>
            <div className="hp-topo-metric-sep"/>
            <div className="hp-topo-metric">
              <span className="hp-topo-metric-val">&lt;45ms</span>
              <span className="hp-topo-metric-label">API Latency</span>
            </div>
            <div className="hp-topo-metric-sep"/>
            <div className="hp-topo-metric">
              <span className="hp-topo-metric-val">256-bit</span>
              <span className="hp-topo-metric-label">Encryption</span>
            </div>
            <div className="hp-topo-metric-sep"/>
            <div className="hp-topo-metric">
              <span className="hp-topo-metric-val">6 Nodes</span>
              <span className="hp-topo-metric-label">Connected</span>
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection as="section" id="what-we-do" className="enterprise-section">
        <div className="enterprise-section-heading">
          <span className="enterprise-kicker">What We Do</span>
          <h2>Three capabilities.<br />One mission: systems that work.</h2>
          <p>Architecture, performance, and data infrastructure — designed for real operations, not demos.</p>
        </div>
        <div className="enterprise-large-card-grid">
          {serviceTracks.map((track) => (
            <Link key={track.title} href={track.href} className="enterprise-card-link">
              <article className="enterprise-story-card">
                <div className="nexus-service-icon" aria-hidden="true">{track.icon}</div>
                <div className="enterprise-story-meta">
                  <span className="enterprise-card-id">{track.id}</span>
                  <span className="enterprise-panel-label">{track.tag}</span>
                </div>
                <h3>{track.title}</h3>
                <p>{track.description}</p>
                <ul className="nexus-service-bullets">
                  {track.bullets.map((b) => (
                    <li key={b} className="nexus-service-bullet">{b}</li>
                  ))}
                </ul>
                <span className="nexus-card-arrow">→</span>
              </article>
            </Link>
          ))}
        </div>
        <div className="enterprise-console-wrap">
          <OperationsConsole />
        </div>
      </RevealSection>

      <RevealSection as="section" id="industries" className="enterprise-section">
        <div className="enterprise-editorial-layout">
          <div className="enterprise-section-heading">
            <span className="enterprise-kicker">Industries</span>
            <h2>Banking. Insurance.<br />Enterprise. All three.</h2>
            <p>Purpose-built for African financial institutions and operations-heavy organizations.</p>
          </div>
          <div className="enterprise-industry-grid">
            {industries.map((industry) => (
              <Link key={industry.title} href={industry.href} className="enterprise-card-link">
                <article className="enterprise-industry-card">
                  <h3>{industry.title}</h3>
                  <p>{industry.description}</p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection as="section" id="platform" className="enterprise-section">
        <div className="enterprise-editorial-layout enterprise-editorial-layout-reverse">
          <div className="enterprise-platform-panel">
            <span className="enterprise-panel-label">Platform capabilities</span>
            <div className="enterprise-capability-list">
              {platformCapabilities.map((item) => (
                <article key={item.title}>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="enterprise-section-heading">
            <span className="enterprise-kicker">Platform</span>
            <h2>API-first.<br />Modular. Secure.</h2>
            <p>Production-ready architecture with phased deployment paths and built-in reporting visibility.</p>
          </div>
        </div>
      </RevealSection>

      <RevealSection as="section" className="enterprise-section">
        <div className="enterprise-editorial-layout">
          <div className="enterprise-section-heading">
            <span className="enterprise-kicker">AI &amp; Intelligent Systems</span>
            <h2>Not AI hype.<br />AI that ships.</h2>
            <p>Automation, predictive analytics, and intelligent monitoring applied to live business operations.</p>
          </div>
          <div className="enterprise-platform-panel">
            <span className="enterprise-panel-label">Intelligent capabilities</span>
            <div className="enterprise-capability-list">
              {intelligentSystems.map((item) => (
                <article key={item.title}>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection as="section" className="enterprise-section">
        <div className="enterprise-editorial-layout">
          <div className="enterprise-section-heading">
            <span className="enterprise-kicker">How We Work</span>
            <h2>Understand. Design.<br />Build. Support.</h2>
            <p>A structured delivery process that takes you from architecture through live operations.</p>
          </div>
          <div className="enterprise-process-grid">
            {deliverySteps.map((step, index) => (
              <article key={step} className="enterprise-process-card">
                <span className="enterprise-card-id">{`0${index + 1}`}</span>
                <strong>{step}</strong>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection as="section" className="enterprise-section">
        <div className="enterprise-editorial-layout enterprise-editorial-layout-reverse">
          <div className="enterprise-platform-panel">
            <span className="enterprise-panel-label">What we build</span>
            <div className="enterprise-capability-list">
              {useCases.map((item) => (
                <article key={item.title}>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="enterprise-section-heading">
            <span className="enterprise-kicker">Use Cases</span>
            <h2>Clear system outputs for operational teams.</h2>
            <p>Short, concrete platform types that match what Kelel actually delivers.</p>
          </div>
        </div>
      </RevealSection>

      <RevealSection as="section" id="company" className="enterprise-section">
        <div className="enterprise-section-heading">
          <span className="enterprise-kicker">Trust / Proof</span>
          <h2>Real platform thinking for African financial and operational systems.</h2>
          <p>Clear system examples, technical framing, and stronger proof of delivery direction.</p>
        </div>
        <Link href={caseStudyPreview.href} className="enterprise-card-link enterprise-case-study-link">
          <article className="enterprise-case-study-feature">
            <div className="enterprise-case-study-copy">
              <span className="enterprise-proof-label">{caseStudyPreview.label}</span>
              <h3>{caseStudyPreview.title}</h3>
              <p>{caseStudyPreview.description}</p>
              <div className="enterprise-proof-list enterprise-proof-list-inline">
                {caseStudyPreview.metrics.map((metric) => (
                  <span key={metric} className="enterprise-trust-pill">
                    {metric}
                  </span>
                ))}
              </div>
            </div>
            <div className="enterprise-ui-mock enterprise-ui-mock-reporting enterprise-case-study-visual" aria-hidden="true">
              <div className="enterprise-ui-topbar">
                <span />
                <span />
                <span />
              </div>
              <div className="enterprise-reporting-head">
                <b />
                <b />
                <b />
              </div>
              <div className="enterprise-reporting-main">
                <div className="enterprise-reporting-bars">
                  <i style={{ height: "42%" }} />
                  <i style={{ height: "68%" }} />
                  <i style={{ height: "56%" }} />
                  <i style={{ height: "84%" }} />
                  <i style={{ height: "62%" }} />
                </div>
                <div className="enterprise-reporting-ring">
                  <span />
                </div>
              </div>
              <div className="enterprise-reporting-lines">
                <i />
                <i />
                <i />
              </div>
            </div>
          </article>
        </Link>
        <div className="enterprise-proof-band">
          {proofStories.map((story) => (
            <Link key={story.title} href={story.href} className="enterprise-card-link">
              <article className="enterprise-proof-card">
                <span className="enterprise-proof-label">{story.label}</span>
                <h3>{story.title}</h3>
                <p>{story.description}</p>
              </article>
            </Link>
          ))}
        </div>
        <div className="enterprise-metric-row">
          {trustMetrics.map((metric) => (
            <article key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </article>
          ))}
        </div>
        <div className="enterprise-proof-list">
          {simpleProof.map((item) => (
            <span key={item} className="enterprise-trust-pill">
              {item}
            </span>
          ))}
        </div>
      </RevealSection>

      <RevealSection as="section" id="contact" className="enterprise-section">
        <div className="enterprise-cta nexus-cta-glow">
          <div className="nexus-cta-header">
            <span className="enterprise-kicker">Start a Project</span>
            <h2 className="nexus-cta-h2">Ready to build?<br /><em>Let&apos;s talk.</em></h2>
            <p>Tell us what you need and we&apos;ll shape the right architecture for your operations.</p>
          </div>
          <div className="enterprise-cta-grid">
            <div className="enterprise-cta-panel">
              <div className="enterprise-actions">
                <Link href="/contact" className="primary-link">
                  Start a Project
                </Link>
                <Link href={site.calendlyPlaceholder} className="secondary-link">
                  Book a Call
                </Link>
                <Link
                  href="/request-proposal?focus=dashboard&source=home-architecture-proposal"
                  className="secondary-link"
                >
                  Request Architecture Proposal
                </Link>
              </div>
              <p className="enterprise-note">We respond within 24-48 hours.</p>
            </div>
            <div className="enterprise-form-panel">
              <ContactForm
                compactFields
                sourcePage="home-page"
                requestFocus="production-platform"
                submitLabel="Send Request"
                helperCopy="We respond within 24-48 hours."
                detailsLabel="System requirements"
                detailsPlaceholder="Tell us what system you need, who it serves, and what it should improve."
              />
            </div>
          </div>
        </div>
      </RevealSection>

      <ChatWithKelel />
    </main>
  );
}
