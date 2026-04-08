import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { HeroPortraitRotation } from "@/components/hero-portrait-rotation";
import { RevealSection } from "@/components/reveal-section";
import { site } from "@/lib/site-content";

const serviceTracks = [
  {
    id: "01",
    tag: "Architecture",
    title: "Platform Architecture & System Design",
    description:
      "Designing end-to-end system architecture for scalable, secure, and production-ready platforms.",
    href: "/services?focus=platform-architecture",
  },
  {
    id: "02",
    tag: "Performance",
    title: "Performance & System Optimization",
    description:
      "Improving system performance, reliability, and operational efficiency across existing platforms.",
    href: "/services?focus=system-optimization",
  },
  {
    id: "03",
    tag: "Data",
    title: "Data Infrastructure & Database Systems",
    description:
      "Designing and managing scalable database systems for high-performance and data-driven operations.",
    href: "/services?focus=data-infrastructure",
  },
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

const trustMetrics = [
  { value: "99.9%", label: "uptime-ready architecture" },
  { value: "API-first", label: "platform approach" },
  { value: "Secure", label: "workflow controls" },
  { value: "Regional", label: "operational scale" },
];

const systemScreens = [
  {
    title: "Workflow control layer",
    description: "Approvals, handoffs, and operating visibility in one secure system view.",
  },
  {
    title: "Reporting and dashboard layer",
    description: "Real-time reporting panels for leadership, operations, and oversight teams.",
  },
  {
    title: "Admin and platform tools",
    description: "Structured admin tools for permissions, data handling, and platform configuration.",
  },
];

const deliverySteps = [
  "Understand your business",
  "Design system architecture",
  "Build scalable platform",
  "Deploy and support",
];

const useCases = [
  "Banking platform",
  "Insurance system",
  "Internal dashboard",
  "Workflow automation",
];

const simpleProof = [
  "Real-time dashboards",
  "Workflow automation",
  "Data systems",
  "Enterprise tools",
];

const whyKelel = [
  "Built for Africa",
  "Production-ready systems",
  "Scalable architecture",
  "Enterprise-grade design",
];

const heroPortraits = [
  {
    title: "Solutions architect",
    image:
      "https://images.pexels.com/photos/7841816/pexels-photo-7841816.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Data analyst",
    image:
      "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Operations lead",
    image:
      "https://images.pexels.com/photos/3810792/pexels-photo-3810792.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Delivery engineer",
    image:
      "https://images.pexels.com/photos/8353800/pexels-photo-8353800.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

const peopleStories = [
  {
    title: "Architecture and platform design",
    description: "Planning for regulated operating environments.",
    image:
      "https://images.pexels.com/photos/7841816/pexels-photo-7841816.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    title: "Delivery and implementation",
    description: "From architecture into live rollout.",
    image:
      "https://images.pexels.com/photos/3810792/pexels-photo-3810792.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Reporting and operational visibility",
    description: "Dashboards built for faster decisions.",
    image:
      "https://images.pexels.com/photos/8353800/pexels-photo-8353800.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Support and continuous improvement",
    description: "Support as platforms keep evolving.",
    image:
      "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

export const metadata: Metadata = {
  title: "Kelel IT Solution | Digital Infrastructure for Financial Systems in Africa",
  description:
    "Kelel IT Solution builds secure, scalable platforms for banking, insurance, and enterprise operations across Africa.",
};

function HeroMotionVisual() {
  const mobileMotionCards = [
    {
      type: "portrait",
      title: "Solutions architect",
      image:
        "https://images.pexels.com/photos/7841816/pexels-photo-7841816.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      type: "metric",
      label: "System uptime",
      title: "99.9% uptime-ready",
      copy: "Live visibility for production teams.",
    },
    {
      type: "portrait",
      title: "Data analyst",
      image:
        "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ];

  return (
    <div className="hero-motion-visual" aria-hidden="true">
      <div className="hero-map-frame">
        <div className="hero-motion-map">
          <svg viewBox="0 0 720 640" role="presentation">
            <path
              className="africa-fill"
              d="M335 42l77 49 33 74 48 35 14 64-36 44 16 65-38 53-18 101-62 55-29 77-55 22-37-44-44-23-33-72-59-35-20-72 29-62-30-54 40-76 51-33 40-93 113-55z"
            />
            <path
              className="africa-shape"
              d="M335 42l77 49 33 74 48 35 14 64-36 44 16 65-38 53-18 101-62 55-29 77-55 22-37-44-44-23-33-72-59-35-20-72 29-62-30-54 40-76 51-33 40-93 113-55z"
            />
            <path
              className="east-africa"
              d="M392 350l38 31 12 46-44 30M356 423l-31 35 22 39"
            />
            <path
              className="ethiopia-shape"
              d="M407 246l20 10 10 20-4 26-22 16-24-8-9-24 8-22 21-18z"
            />
            <path
              className="signal-line signal-line-e"
              d="M424 298C462 280 500 268 538 254"
            />
            <circle className="hub hub-ethiopia" cx="424" cy="298" r="7" />
            <circle className="hub hub-kenya" cx="454" cy="366" r="5" />
            <circle className="hub hub-nigeria" cx="278" cy="292" r="5" />
            <circle className="hub hub-south-africa" cx="372" cy="522" r="5" />
            <circle className="hub hub-egypt" cx="468" cy="178" r="5" />
            <circle className="hub hub-east-africa" cx="538" cy="254" r="4" />
            <path className="signal-line signal-line-a" d="M424 298C445 255 458 218 468 178" />
            <path className="signal-line signal-line-b" d="M424 298C388 292 326 289 278 292" />
            <path className="signal-line signal-line-c" d="M424 298C441 332 446 348 454 366" />
            <path className="signal-line signal-line-d" d="M424 298C410 396 390 470 372 522" />
            <text className="hub-label" x="444" y="292">
              Addis Ababa
            </text>
          </svg>
        </div>
        <HeroPortraitRotation items={heroPortraits} />
        <div className="hero-mobile-motion-marquee">
          <div className="hero-mobile-motion-track">
            {[...mobileMotionCards, ...mobileMotionCards].map((item, index) =>
              item.type === "portrait" ? (
                <article
                  key={`mobile-portrait-${index}`}
                  className={`hero-mobile-motion-card hero-mobile-motion-portrait${index % mobileMotionCards.length === 0 ? " is-primary" : ""}`}
                >
                  <div
                    className="hero-mobile-motion-surface"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(7, 18, 31, 0.08), rgba(7, 18, 31, 0.82)), url(${item.image})`,
                    }}
                  />
                  <span>{item.title}</span>
                </article>
              ) : (
                <article key={`mobile-metric-${index}`} className="hero-mobile-motion-card hero-mobile-motion-kpi">
                  <small>{item.label}</small>
                  <strong>{item.title}</strong>
                  <span>{item.copy}</span>
                </article>
              ),
            )}
          </div>
        </div>
        <div className="hero-data-layer">
          <div className="hero-data-marquee hero-data-marquee-front">
            <div className="hero-data-track">
              <article className="hero-data-card">
                <small>System uptime</small>
                <strong>99.9% uptime-ready</strong>
                <span>Production-ready reliability.</span>
              </article>
              <article className="hero-data-card">
                <small>Operations dashboard</small>
                <strong>Live operational visibility</strong>
                <span>Dashboards, controls, and insight.</span>
              </article>
              <article className="hero-data-card">
                <small>System uptime</small>
                <strong>99.9% uptime-ready</strong>
                <span>Production-ready reliability.</span>
              </article>
              <article className="hero-data-card">
                <small>Operations dashboard</small>
                <strong>Live operational visibility</strong>
                <span>Dashboards, controls, and insight.</span>
              </article>
            </div>
          </div>

          <article className="hero-data-card hero-data-card-mobile">
            <small>System uptime</small>
            <strong>99.9% uptime-ready</strong>
            <span>Live visibility across teams.</span>
          </article>
        </div>
      </div>

      <div className="hero-wave-layer hero-wave-layer-a" />
      <div className="hero-wave-layer hero-wave-layer-b" />
      <div className="hero-particle hero-particle-a" />
      <div className="hero-particle hero-particle-b" />
      <div className="hero-particle hero-particle-c" />
    </div>
  );
}

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

export default function Home() {
  return (
    <main className="enterprise-homepage">
      <RevealSection as="section" id="home" className="enterprise-hero">
        <HeroMotionVisual />
        <div className="enterprise-hero-copy">
          <span className="enterprise-kicker">Built for African markets. Designed for global standards.</span>
          <h1>Kelel IT Solution</h1>
          <h2>Digital infrastructure for financial systems</h2>
          <p>
            Kelel IT Solution is a technology company based in Addis Ababa, Ethiopia, building
            digital infrastructure for banking, insurance, and enterprise systems.
          </p>
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
      </RevealSection>

      <RevealSection as="section" className="enterprise-section enterprise-company-statement">
        <div className="enterprise-company-statement-card">
          <p>
            API-first systems, secure workflows, and scalable platforms for real operating
            environments across Africa.
          </p>
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
            <h2>Why organizations choose Kelel for serious systems.</h2>
            <p>Clear delivery, African market context, and production-grade platform thinking.</p>
          </div>
        </div>
      </RevealSection>

      <RevealSection as="section" className="enterprise-section">
        <div className="enterprise-section-heading">
          <span className="enterprise-kicker">People</span>
          <h2>Built with people who understand African operations.</h2>
          <p>Strategy, engineering, and delivery for business environments across East Africa.</p>
        </div>
        <div className="enterprise-people-grid enterprise-people-grid-featured">
          <article className="enterprise-people-card enterprise-people-card-lead">
            <div
              className="enterprise-people-image"
              style={{ backgroundImage: `linear-gradient(180deg, rgba(7, 18, 31, 0.08), rgba(7, 18, 31, 0.78)), url(${peopleStories[0].image})` }}
            />
            <div className="enterprise-people-copy">
              <span className="enterprise-panel-label">Lead team</span>
              <h3>{peopleStories[0].title}</h3>
              <p>{peopleStories[0].description}</p>
            </div>
          </article>
          <div className="enterprise-people-stack">
            {peopleStories.slice(1).map((story) => (
              <article key={story.title} className="enterprise-people-card enterprise-people-card-compact">
                <div
                  className="enterprise-people-image"
                  style={{ backgroundImage: `linear-gradient(180deg, rgba(7, 18, 31, 0.1), rgba(7, 18, 31, 0.76)), url(${story.image})` }}
                />
                <div className="enterprise-people-copy">
                  <h3>{story.title}</h3>
                  <p>{story.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection as="section" id="what-we-do" className="enterprise-section">
        <div className="enterprise-section-heading">
          <span className="enterprise-kicker">What We Do</span>
          <h2>Production-ready systems for core operating environments.</h2>
          <p>Three focused system tracks for financial and enterprise platforms.</p>
        </div>
        <div className="enterprise-large-card-grid">
          {serviceTracks.map((track) => (
            <Link key={track.title} href={track.href} className="enterprise-card-link">
              <article className="enterprise-story-card">
                <div className="enterprise-story-meta">
                  <span className="enterprise-card-id">{track.id}</span>
                  <span className="enterprise-panel-label">{track.tag}</span>
                </div>
                <h3>{track.title}</h3>
                <p>{track.description}</p>
              </article>
            </Link>
          ))}
        </div>
        <div className="enterprise-console-wrap">
          <OperationsConsole />
        </div>
      </RevealSection>

      <RevealSection as="section" className="enterprise-section">
        <div className="enterprise-editorial-layout">
          <div className="enterprise-section-heading">
            <span className="enterprise-kicker">Product</span>
            <h2>Inside the systems we build.</h2>
            <p>Dashboard UI, workflow screens, reporting panels, and admin tools for production use.</p>
          </div>
          <div className="enterprise-ui-grid">
            {systemScreens.map((screen, index) => (
              <article key={screen.title} className={`enterprise-ui-card enterprise-ui-card-${index + 1}`}>
                <div className="enterprise-ui-mock" aria-hidden="true">
                  <div className="enterprise-ui-topbar">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="enterprise-ui-layout">
                    <div className="enterprise-ui-rail">
                      <i />
                      <i />
                      <i />
                    </div>
                    <div className="enterprise-ui-panels">
                      <div className="enterprise-ui-stat-row">
                        <b />
                        <b />
                      </div>
                      <div className="enterprise-ui-chart" />
                      <div className="enterprise-ui-list">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                </div>
                <h3>{screen.title}</h3>
                <p>{screen.description}</p>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection as="section" id="industries" className="enterprise-section">
        <div className="enterprise-editorial-layout">
          <div className="enterprise-section-heading">
            <span className="enterprise-kicker">Industries</span>
            <h2>Built for organizations operating across African markets.</h2>
            <p>Designed for local realities, regional scale, and enterprise expectations.</p>
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
            <h2>Modern architecture built for secure regional operations.</h2>
            <p>API-first systems, modular deployment, and clear reporting structures.</p>
          </div>
        </div>
      </RevealSection>

      <RevealSection as="section" className="enterprise-section">
        <div className="enterprise-editorial-layout">
          <div className="enterprise-section-heading">
            <span className="enterprise-kicker">How Kelel Works</span>
            <h2>A clear delivery path for serious systems.</h2>
            <p>A structured process from architecture through rollout and support.</p>
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
                <article key={item}>
                  <strong>{item}</strong>
                  <p>Configured for clear workflows and dependable delivery.</p>
                </article>
              ))}
            </div>
          </div>
          <div className="enterprise-section-heading">
            <span className="enterprise-kicker">Use Cases</span>
            <h2>What clients can expect from Kelel.</h2>
            <p>Focused system outputs that make the offer clearer and easier to trust.</p>
          </div>
        </div>
      </RevealSection>

      <RevealSection as="section" id="company" className="enterprise-section">
        <div className="enterprise-section-heading">
          <span className="enterprise-kicker">Trust / Proof</span>
          <h2>Focused on African financial and operational systems.</h2>
          <p>Proof stories, strong technical framing, and clear enterprise signals.</p>
        </div>
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
        <div className="enterprise-cta">
          <div className="enterprise-section-heading enterprise-section-heading-centered">
            <span className="enterprise-kicker">Contact</span>
            <h2>Let&apos;s build your next system.</h2>
            <p>Tell us what you need and we&apos;ll shape the right architecture.</p>
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

      <a
        href={site.whatsapp}
        className="enterprise-chat-float"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Kelel on WhatsApp"
      >
        Chat with Kelel
      </a>
    </main>
  );
}
