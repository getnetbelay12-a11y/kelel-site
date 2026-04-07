import { CompanyProfileDownload } from "@/components/company-profile-download";
import { PlatformArchitectureMap } from "@/components/platform-architecture-map";
import { ExecutiveContactCard } from "@/components/executive-contact-card";
import { MovingMediaStrip } from "@/components/moving-media-strip";
import { PlatformShowcase } from "@/components/platform-showcase";
import { SectionIntro } from "@/components/section-intro";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  platformDeliveryModels,
  platformFaqs,
  platformNextRoutes,
  projects,
  platformUseCases,
  sectorPages,
} from "@/lib/site-content";

const platformVisuals = [
  {
    title: "Dashboards for reporting, oversight, and business visibility",
    label: "Dashboards",
    description:
      "Kelel can present dashboard and reporting work as part of a clearer business-systems story.",
    image: "/proof/company-profile-page-1.png",
    alt: "Dashboard and reporting proof visual",
  },
  {
    title: "Workflow systems that reduce manual coordination",
    label: "Workflow systems",
    description:
      "The site now makes room for structured internal process tools and digital operating workflows.",
    image: "/media/team-tablet-meeting.jpg",
    alt: "Team planning workflow and system improvements",
  },
  {
    title: "Portals and digital platforms for teams and clients",
    label: "Portals",
    description:
      "Portal capability is now shown more directly as part of Kelel's broader software and platform offer.",
    image: "/proof/company-profile-page-3.png",
    alt: "Portal and platform proof visual",
  },
  {
    title: "Delivery and support readiness behind every platform",
    label: "Operations",
    description:
      "The platform story is supported by real delivery, support, and operational coordination visuals.",
    image: "/media/it-support-team.jpg",
    alt: "IT support team working on delivery and operations",
  },
];

const platformProposalRoutes = [
  {
    title: "Dashboard proposal",
    copy:
      "Start with a structured brief for management dashboards, reporting views, and visibility needs.",
    href: "/request-proposal?focus=dashboard&source=platforms-page",
    actionLabel: "Request dashboard proposal",
  },
  {
    title: "Workflow proposal",
    copy:
      "Open a proposal flow for internal workflow tools that improve coordination, follow-up, and accountability.",
    href: "/request-proposal?focus=workflow&source=platforms-page",
    actionLabel: "Request workflow proposal",
  },
  {
    title: "Portal proposal",
    copy:
      "Start a portal discussion for staff, clients, partners, or service-access experiences.",
    href: "/request-proposal?focus=portal&source=platforms-page",
    actionLabel: "Request portal proposal",
  },
  {
    title: "Reporting proposal",
    copy:
      "Use a visibility-focused brief when leadership needs better operational reporting before a wider system rollout.",
    href: "/request-proposal?focus=reporting&source=platforms-page",
    actionLabel: "Request reporting proposal",
  },
];

export const metadata: Metadata = {
  title: "Platforms | Kelel IT Solution",
  description:
    "Explore Kelel IT Solution's direction for dashboards, workflow systems, business portals, reporting visibility, and platform modernization.",
};

export default function PlatformsPage() {
  const platformProjects = projects.filter(
    (project) =>
      project.type === "Business System" || project.type === "Public Presence",
  );

  const platformSectors = sectorPages.filter(
    (sector) =>
      sector.slug === "teams-modernizing-internal-workflows" ||
      sector.slug === "operations-heavy-organizations" ||
      sector.slug === "service-companies-and-consultancies",
  );

  const platformStats = [
    {
      label: "Use cases",
      value: String(platformUseCases.length),
      note: "Platform situations the page is built to support.",
    },
    {
      label: "Delivery models",
      value: String(platformDeliveryModels.length),
      note: "Ways Kelel can engage around platform and systems work.",
    },
    {
      label: "Proof routes",
      value: String(platformProjects.length),
      note: "Case-study paths that connect platform thinking to delivery examples.",
    },
    {
      label: "Sector paths",
      value: String(platformSectors.length),
      note: "Industry routes where dashboards, workflows, and portals fit naturally.",
    },
  ];

  const focusedNextRoutes = platformNextRoutes.slice(0, 3);

  return (
    <main className="page-shell home-page-shell resource-page-shell">
      <section className="section-block page-hero visual-page-hero resource-command-hero">
        <div className="visual-page-hero-copy">
          <SectionIntro
            eyebrow="Platforms"
            title="Dashboards, workflow systems, portals, and digital platforms with clearer business value."
            description="This page is now structured as a clearer solution destination for organizations that need internal tools, reporting visibility, business portals, or platform modernization support."
          />
          <div className="hero-actions">
            <Link
              href="/request-proposal?focus=dashboard&source=platforms-page"
              className="primary-link"
            >
              Start dashboard brief
            </Link>
            <Link href="/work" className="secondary-link">
              View case studies
            </Link>
            <Link href="/resources" className="secondary-link">
              Open resources
            </Link>
          </div>
          <div className="platform-cta-shortcuts">
            {platformProposalRoutes.map((item) => (
              <Link key={item.title} href={item.href} className="mini-chip-link">
                {item.title}
              </Link>
            ))}
          </div>
          <div className="resource-command-metrics">
            {platformStats.map((item) => (
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
            src="/proof/company-profile-page-1.png"
            alt="Platform dashboard and reporting visual"
            width={1400}
            height={1000}
            className="visual-page-hero-image"
            priority
          />
        </div>
      </section>

      <section className="resource-bottom-grid">
        <div className="section-block">
          <PlatformShowcase
            eyebrow="Platform capability"
            title="A clearer story for platforms, dashboards, workflows, and data-driven business systems."
            description="Kelel is presented more directly here as a partner for software platforms and operational visibility, not only websites or infrastructure work."
            pillars={[
              {
                label: "Dashboards",
                title: "Reporting and oversight for operational leaders",
                copy:
                  "Business dashboards improve visibility, follow-up, and decision-making across teams and management layers.",
              },
              {
                label: "Workflows",
                title: "Systems that help work move more clearly",
                copy:
                  "Workflow tools reduce manual coordination and create better accountability around business processes.",
              },
              {
                label: "Portals",
                title: "Platforms that organize user and service interaction",
                copy:
                  "Portals support clients, internal teams, and operating units with cleaner digital interaction and access.",
              },
              {
                label: "Data flow",
                title: "Database-ready structure behind visibility and process",
                copy:
                  "Platform work can be framed around stronger information flow, reporting structure, and future scalability.",
              },
            ]}
          />
        </div>
        <div className="section-block contrast-panel">
          <PlatformArchitectureMap
            eyebrow="Platform map"
            title="A simple view of how platform work moves from data to action."
            description="This gives buyers a quick mental model of the connected systems Kelel can support: data visibility, workflow coordination, portal access, and management reporting."
            steps={[
              {
                label: "Data",
                title: "Information is captured more clearly",
                copy:
                  "Teams need cleaner records, more reliable updates, and better structure behind reporting and business visibility.",
              },
              {
                label: "Workflow",
                title: "Work moves through a defined process",
                copy:
                  "Workflow tools reduce manual follow-up, improve accountability, and help teams coordinate more consistently.",
              },
              {
                label: "Portal",
                title: "People interact through a clearer platform",
                copy:
                  "Portals organize how staff, managers, partners, or clients access information and complete tasks.",
              },
              {
                label: "Dashboard",
                title: "Leaders get reporting and oversight",
                copy:
                  "Dashboards turn system activity into practical oversight, stronger visibility, and better decision support.",
              },
            ]}
          />
        </div>
      </section>

      <section className="resource-bottom-grid">
        <section className="section-block">
          <SectionIntro
            eyebrow="Use cases"
            title="The strongest platform conversations usually start with a clear operating problem."
            description="These are the practical software, dashboard, workflow, and reporting situations this page is designed to support."
          />
          <div className="highlight-grid">
            {platformUseCases.map((item, index) => (
              <article key={item.title} className={index === 0 ? "highlight-card-featured" : ""}>
                <span className="project-type">
                  {index === 0 ? "Best opening use case" : "Platform use case"}
                </span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <p className="resource-note">
                  {index === 0
                    ? "A strong starting point when the platform conversation begins with a visible operating pain."
                    : "Useful when the platform discussion needs a more specific systems context."}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Delivery models"
            title="Different ways organizations can engage Kelel around platform work."
            description="This helps buyers connect their current situation to the right kind of platform discussion before they request a proposal."
          />
          <div className="highlight-grid">
            {platformDeliveryModels.map((item, index) => (
              <article key={item.title} className={index === 0 ? "highlight-card-featured" : ""}>
                <span className="project-type">
                  {index === 0 ? "Recommended delivery path" : "Delivery model"}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <p className="resource-note">
                  {index === 0
                    ? "The clearest model when an organization wants direction without overcomplicating the first conversation."
                    : "Supports alternate ways to scope platform and workflow work."}
                </p>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="Platform visuals"
          title="A stronger software-and-database presentation with movement and visual proof."
          description="These visuals reinforce dashboards, portal systems, workflow modernization, delivery readiness, and data visibility so the platforms story feels active and credible."
        />
        <MovingMediaStrip
          eyebrow="Platform visuals"
          title="A stronger software-and-database presentation with movement and visual proof."
          description="These visuals reinforce dashboards, portal systems, workflow modernization, delivery readiness, and data visibility so the platforms story feels active and credible."
          items={platformVisuals}
        />
      </section>

      <section className="resource-bottom-grid">
        <section className="section-block">
          <SectionIntro
            eyebrow="Platform proof"
            title="The next serious question is usually where this kind of thinking has already been applied."
            description="These case-study routes connect the platform story to workflow visibility, business-system structure, and stronger digital operating models."
          />
          <div className="resource-grid compact-grid">
            {platformProjects.map((project) => (
              <article key={project.slug} className="resource-card">
                <span className="project-type">{project.type}</span>
                <h3>{project.name}</h3>
                <p>{project.blurb}</p>
                <p className="project-detail">
                  <strong>Outcome:</strong> {project.outcome}
                </p>
                <Link href={`/work/${project.slug}`} className="secondary-link">
                  Open case study
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Sector fit"
            title="Platform conversations usually connect most strongly with these organization types."
            description="These industry pages help buyers see how dashboard, workflow, portal, and reporting needs map to their operating environment."
          />
          <div className="resource-grid compact-grid">
            {platformSectors.map((sector) => (
              <article key={sector.slug} className="resource-card">
                <span className="project-type">Industry page</span>
                <h3>{sector.name}</h3>
                <p>{sector.summary}</p>
                <Link href={`/industries/${sector.slug}`} className="secondary-link">
                  Open sector page
                </Link>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="resource-bottom-grid">
        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Request by platform type"
            title="Move straight into the right kind of platform brief."
            description="Instead of sending a generic proposal request, these routes open a pre-structured brief for dashboards, workflow systems, portals, and reporting conversations."
          />
          <div className="resource-grid compact-grid">
            {platformProposalRoutes.map((item) => (
              <article key={item.title} className="resource-card">
                <span className="project-type">Proposal shortcut</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <Link href={item.href} className="primary-link">
                  {item.actionLabel}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block">
          <SectionIntro
            eyebrow="Next routes"
            title="The next pages to open when the platform conversation becomes more serious."
            description="These routes help buyers move from platform interest into proof, comparison, and a real request path without losing momentum."
          />
          <div className="resource-grid compact-grid">
            {focusedNextRoutes.map((item) => (
              <article key={item.title} className="resource-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link href={item.href} className="secondary-link">
                  {item.actionLabel}
                </Link>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="resource-bottom-grid">
        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Why it matters"
            title="Many buyers need more than a website. They need software structure behind daily operations."
            description="This page positions Kelel more clearly for organizations that need internal systems, platform modernization, reporting visibility, and stronger digital workflows."
          />
          <div className="pillars-list">
            <article>
              <strong>Dashboards turn activity into clearer decision-making.</strong>
            </article>
            <article>
              <strong>Workflow systems reduce manual coordination and weak visibility.</strong>
            </article>
            <article>
              <strong>Portals create cleaner interaction for teams, services, and customers.</strong>
            </article>
            <article>
              <strong>Platform thinking supports longer-term scale, not only short-term fixes.</strong>
            </article>
          </div>
          <div className="hero-actions">
            <Link href="/services" className="secondary-link">
              Compare solutions
            </Link>
            <Link href="/work" className="secondary-link">
              Review case studies
            </Link>
            <Link
              href="/request-proposal?focus=dashboard&source=platforms-page"
              className="primary-link"
            >
              Start platform brief
            </Link>
          </div>
        </section>

        <section className="section-block">
          <SectionIntro
            eyebrow="Platform questions"
            title="Quick answers for teams evaluating dashboards, workflows, portals, or reporting systems."
            narrow
          />
          <div className="faq-list">
            {platformFaqs.map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Formal handoff"
          title="Use these support assets when the platform conversation needs formal sharing."
          description="The company profile and executive contact keep the platform discussion grounded when a buyer needs a named contact, a formal PDF, or a cleaner handoff into next steps."
        />
        <div className="sector-layout">
          <CompanyProfileDownload copy="Use the company profile together with this platforms page when sharing Kelel's software and systems direction with buyers or internal reviewers." />
          <ExecutiveContactCard
            compact
            title="Platform discussion"
            copy="Use this route for dashboard, portal, workflow system, and business-platform conversations."
          />
        </div>
      </section>
    </main>
  );
}
