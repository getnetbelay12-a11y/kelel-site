import { ExecutiveContactCard } from "@/components/executive-contact-card";
import { MovingMediaStrip } from "@/components/moving-media-strip";
import { PlatformCtaPanel } from "@/components/platform-cta-panel";
import { PlatformShowcase } from "@/components/platform-showcase";
import { SectionIntro } from "@/components/section-intro";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  assurancePoints,
  engagementModes,
  pillars,
  process,
  readinessSignals,
  sectorPages,
  services,
} from "@/lib/site-content";

const serviceVisuals = [
  {
    title: "Support delivery and technical coordination",
    label: "Managed support",
    description:
      "Operational visuals help the solutions page feel closer to real IT support and systems delivery work.",
    image: "/media/it-support-team.jpg",
    alt: "IT support team coordinating on a laptop",
  },
  {
    title: "Software and reporting systems",
    label: "Business software",
    description:
      "Dashboard-style proof blocks help explain portals, internal systems, and reporting workflows more clearly.",
    image: "/proof/company-profile-page-1.png",
    alt: "Business software and reporting proof visual",
  },
  {
    title: "Planning and decision workshops",
    label: "Advisory",
    description:
      "Visual planning moments reinforce advisory, solution design, and modernization conversations.",
    image: "/media/team-tablet-meeting.jpg",
    alt: "Team reviewing a plan on a tablet",
  },
];

export const metadata: Metadata = {
  title: "Services | Kelel IT Solution",
  description:
    "Explore managed IT support, infrastructure, software systems, and advisory solutions from Kelel IT Solution.",
};

export default function ServicesPage() {
  const serviceStats = [
    {
      label: "Service lines",
      value: String(services.length),
      note: "Core solution areas visible to buyers and review teams.",
    },
    {
      label: "Engagement models",
      value: String(engagementModes.length),
      note: "Ways organizations can work with Kelel depending on scope and maturity.",
    },
    {
      label: "Process steps",
      value: String(process.length),
      note: "A concise delivery path from discovery to adoption and support.",
    },
    {
      label: "Sector paths",
      value: String(sectorPages.length),
      note: "Industry routes that help buyers see solution fit faster.",
    },
  ];

  const keyServices = services.slice(0, 4);
  const topReadinessSignals = readinessSignals.slice(0, 3);
  const topAssurancePoints = assurancePoints.slice(0, 4);
  const coreSectors = sectorPages.slice(0, 4);

  return (
    <main className="page-shell home-page-shell resource-page-shell">
      <section className="section-block page-hero visual-page-hero resource-command-hero">
        <div className="visual-page-hero-copy">
          <SectionIntro
            eyebrow="Solutions"
            title="Service lines shaped around how organizations usually buy IT support, systems, and digital improvement."
            description="This page now works as a clearer executive summary of Kelel's offer: what the company covers, how the work is delivered, and where a buyer should go next."
          />
          <div className="hero-actions">
            <Link href="/request-proposal" className="primary-link">
              Request a proposal
            </Link>
            <Link href="/capability-matrix" className="secondary-link">
              Open capability matrix
            </Link>
            <Link href="/platforms" className="secondary-link">
              Explore platforms
            </Link>
          </div>
          <div className="resource-command-metrics">
            {serviceStats.map((item) => (
              <article key={item.label} className="resource-command-metric">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="visual-page-hero-media">
          <Image
            src="/media/it-support-team.jpg"
            alt="IT support team collaborating over a laptop"
            width={1600}
            height={1067}
            className="visual-page-hero-image"
            priority
          />
        </div>
      </section>

      <section className="resource-bottom-grid">
        <section className="section-block">
          <SectionIntro
            eyebrow="Service portfolio"
            title="The core solution lines are easier to compare when they sit in one tighter portfolio view."
            description="These are the main areas Kelel presents to buyers before the conversation moves into sectors, platform work, or a structured proposal."
          />
          <div className="resource-grid compact-grid">
            {keyServices.map((service) => (
              <article key={service.title} className="resource-card">
                <span className="project-type">Service line</span>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <ul className="service-bullets">
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="How the work runs"
            title="A simpler process and engagement view makes the solutions page more useful in real conversations."
            description="This keeps delivery structure visible without forcing the buyer through too many separate sections."
          />
          <div className="process-list">
            {process.map((step, index) => (
              <article key={step} className={index === 0 ? "process-card-featured" : ""}>
                <span>0{index + 1}</span>
                <p>{step}</p>
              </article>
            ))}
          </div>
          <div className="highlight-grid">
            {engagementModes.map((mode, index) => (
              <article key={mode.title} className={index === 0 ? "highlight-card-featured" : ""}>
                <span className="project-type">
                  {index === 0 ? "Recommended structure" : "Engagement model"}
                </span>
                <h3>{mode.title}</h3>
                <p>{mode.copy}</p>
                <p className="resource-note">
                  {index === 0
                    ? "A strong starting structure when the organization needs clear delivery ownership."
                    : "Useful when the conversation needs a different scope or operating rhythm."}
                </p>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="section-block contrast-panel">
        <MovingMediaStrip
          eyebrow="Software and systems visuals"
          title="The solutions story now includes more movement and more system-oriented visual proof."
          description="These moving cards reinforce software, dashboards, planning, and support delivery so the page feels closer to a modern IT solutions company."
          items={serviceVisuals}
        />
      </section>

      <section className="resource-bottom-grid">
        <section className="section-block">
          <PlatformShowcase
            eyebrow="Platform and data capability"
            title="A clearer view of how Kelel supports dashboards, workflows, portals, and information flow."
            description="This helps service buyers understand that Kelel supports more than infrastructure or websites alone. The offer now reads more clearly across reporting, workflow systems, business portals, and database-ready operations."
            pillars={[
              {
                label: "Dashboards",
                title: "Operational reporting that improves visibility",
                copy:
                  "Teams need clearer reporting, business visibility, and decision support across daily operations and management reviews.",
              },
              {
                label: "Workflows",
                title: "Structured systems for how work moves",
                copy:
                  "Workflow modernization can be framed around accountability, handoff clarity, and smoother operating discipline.",
              },
              {
                label: "Portals",
                title: "Platforms that organize client and team interactions",
                copy:
                  "Portal and web-system capability sits inside a broader software and service architecture story.",
              },
              {
                label: "Data flow",
                title: "Database-ready thinking behind operations",
                copy:
                  "The page now communicates stronger support for information flow, data structure, and reporting-oriented business systems.",
              },
            ]}
          />
        </section>

        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Why this page is stronger"
            title="A better solutions page helps buyers evaluate fit faster."
            description="These are the improvements that make the current structure more credible and more useful than a generic list of services."
          />
          <div className="pillars-list compact">
            {pillars.map((pillar, index) => (
              <article key={pillar} className={index === 0 ? "pillar-card-featured" : ""}>
                <span className="project-type">
                  {index === 0 ? "Primary improvement" : "Page improvement"}
                </span>
                <strong>{pillar}</strong>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="resource-bottom-grid">
        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Sector fit"
            title="The solution portfolio connects most clearly with these kinds of organizations."
            description="These routes help buyers see how Kelel's support, systems, and advisory work map to their operating environment."
          />
          <div className="resource-grid compact-grid">
            {coreSectors.map((sector) => (
              <article key={sector.slug} className="resource-card">
                <span className="project-type">Industry page</span>
                <h3>{sector.name}</h3>
                <p>{sector.summary}</p>
                <Link href={`/industries/${sector.slug}`} className="secondary-link">
                  View sector page
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block">
          <SectionIntro
            eyebrow="Operating confidence"
            title="A strong solutions page should show readiness, not only capability claims."
            description="These confidence markers make the page feel more accountable before the first meeting even starts."
          />
          <div className="highlight-grid">
            {topReadinessSignals.map((item, index) => (
              <article key={item.title} className={index === 0 ? "highlight-card-featured" : ""}>
                <span className="project-type">
                  {index === 0 ? "Primary confidence signal" : "Readiness signal"}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <p className="resource-note">
                  {index === 0
                    ? "One of the clearest cues that Kelel is ready for formal solution discussions."
                    : "Adds practical support to the wider readiness and accountability story."}
                </p>
              </article>
            ))}
          </div>
          <div className="pillars-list compact">
            {topAssurancePoints.map((item) => (
              <article key={item}>
                <strong>{item}</strong>
              </article>
            ))}
          </div>
        </section>
      </section>

      <PlatformCtaPanel
        title="Need a dashboard, workflow system, portal, or reporting platform?"
        copy="The solutions page now routes serious software-and-systems buyers into a more specific platform discussion and a better-structured proposal brief."
      />

      <section className="resource-bottom-grid">
        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Comparison and next steps"
            title="Some buyers want a quicker comparison path before they read every service page."
            description="Use the capability matrix for a compact comparison view, then move into a proposal or contact route when the fit is clear."
          />
          <div className="hero-actions">
            <Link href="/capability-matrix" className="primary-link">
              Open capability matrix
            </Link>
            <Link href="/request-proposal" className="secondary-link">
              Request proposal
            </Link>
            <Link href="/contact" className="secondary-link">
              Contact Kelel
            </Link>
          </div>
        </section>

        <section className="section-block contact-panel">
          <SectionIntro
            eyebrow="Need a proposal?"
            title="Tell Kelel what support, system, or website your organization needs."
            narrow
          />
          <div className="contact-panel-stack">
            <ExecutiveContactCard compact />
            <Link href="/contact" className="primary-link">
              Contact Kelel
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
