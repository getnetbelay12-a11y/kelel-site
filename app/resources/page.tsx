import { CompanyProfileDownload } from "@/components/company-profile-download";
import { EvidenceRegister } from "@/components/evidence-register";
import { ExecutiveContactCard } from "@/components/executive-contact-card";
import { MovingMediaStrip } from "@/components/moving-media-strip";
import { PlatformCtaPanel } from "@/components/platform-cta-panel";
import { PlatformShowcase } from "@/components/platform-showcase";
import { ProofReadinessWall } from "@/components/proof-readiness-wall";
import { ResourceExplorer } from "@/components/resource-explorer";
import { SectionIntro } from "@/components/section-intro";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  businessResources,
  mediaReadinessPlan,
  projects,
  referenceCollections,
  sectorPages,
} from "@/lib/site-content";

const resourceVisuals = [
  {
    title: "Business software and dashboard proof",
    label: "Digital proof",
    description:
      "Resource pages should show more than documents. They should also suggest systems, reporting, and platform delivery.",
    image: "/proof/company-profile-page-1.png",
    alt: "Dashboard and company profile proof image",
  },
  {
    title: "Formal review and team decision moments",
    label: "Review flow",
    description:
      "Review visuals help the page feel like a live business resource center, not just a static list of links.",
    image: "/media/team-tablet-meeting.jpg",
    alt: "Team reviewing materials together",
  },
  {
    title: "Executive-facing review of digital materials",
    label: "Decision support",
    description:
      "Kelel can now present resources in a way that feels more aligned with commercial and procurement review.",
    image: "/media/hero-businessman-tablet.jpg",
    alt: "Executive reviewing digital materials",
  },
  {
    title: "Operations and implementation readiness",
    label: "Operational proof",
    description:
      "Support and operations imagery adds a stronger systems-company tone to the resource journey.",
    image: "/media/it-support-team.jpg",
    alt: "IT support team working together",
  },
];

const reviewPaths = [
  {
    eyebrow: "Formal review",
    title: "Start with the review pack",
    copy:
      "Best for meetings, procurement handoff, and quick internal sharing when someone needs the whole story in one route.",
    href: "/review-pack",
    actionLabel: "Open review pack",
  },
  {
    eyebrow: "Structured evaluation",
    title: "Use the review checklist",
    copy:
      "Best for buyers or partners who need a step-by-step order for trust, capability, proof, and next-step review.",
    href: "/review-checklist",
    actionLabel: "Review checklist",
  },
  {
    eyebrow: "Platform fit",
    title: "Move into platform briefing",
    copy:
      "Best when the review is already leaning toward dashboards, workflow systems, portals, or reporting visibility.",
    href: "/request-proposal?focus=dashboard&source=resources-page",
    actionLabel: "Start dashboard brief",
  },
  {
    eyebrow: "Executive profile",
    title: "Share the company profile",
    copy:
      "Best when someone needs a formal overview document before a deeper capability or commercial discussion.",
    href: "/company-profile",
    actionLabel: "View company profile",
  },
];

export const metadata: Metadata = {
  title: "Resources | Kelel IT Solution",
  description:
    "Access formal company resources, profile downloads, case studies, and sector pages for Kelel IT Solution.",
};

export default function ResourcesPage() {
  const resourceStats = [
    {
      label: "Review assets",
      value: String(businessResources.length),
      note: "Formal business materials ready to open.",
    },
    {
      label: "Case studies",
      value: String(projects.length),
      note: "Proof routes for solution and delivery review.",
    },
    {
      label: "Sector pages",
      value: String(sectorPages.length),
      note: "Buyer-fit pages for different organization types.",
    },
    {
      label: "Asset priorities",
      value: String(mediaReadinessPlan.length),
      note: "Real media replacements still planned next.",
    },
  ];

  const featuredResources = businessResources.slice(0, 6);
  const curatedProof = [
    ...projects.map((project) => ({
      key: project.slug,
      type: project.type,
      title: project.name,
      description: project.blurb,
      href: `/work/${project.slug}`,
      actionLabel: "Open case study",
    })),
    ...sectorPages.slice(0, 3).map((sector) => ({
      key: sector.slug,
      type: "Industry page",
      title: sector.name,
      description: sector.summary,
      href: `/industries/${sector.slug}`,
      actionLabel: "View sector page",
    })),
  ];

  return (
    <main className="page-shell home-page-shell resource-page-shell">
      <section className="section-block page-hero visual-page-hero resource-command-hero">
        <div className="visual-page-hero-copy">
          <SectionIntro
            eyebrow="Resources"
            title="A stronger business review center for procurement, capability review, and partner sharing."
            description="This page now works more like Kelel's review command center: fewer repeated sections, stronger priority paths, and clearer routes into proof, profile, and proposal next steps."
          />
          <div className="hero-actions">
            <Link href="/review-pack" className="primary-link">
              Open review pack
            </Link>
            <Link href="/review-checklist" className="secondary-link">
              Review checklist
            </Link>
            <Link
              href="/request-proposal?focus=dashboard&source=resources-page"
              className="secondary-link"
            >
              Start dashboard brief
            </Link>
          </div>
          <div className="resource-command-metrics">
            {resourceStats.map((item) => (
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
            src="/media/team-tablet-meeting.jpg"
            alt="Business team reviewing materials together"
            width={1600}
            height={1067}
            className="visual-page-hero-image"
            priority
          />
        </div>
      </section>

      <section className="resource-command-grid">
        {reviewPaths.map((item, index) => (
          <article
            key={item.title}
            className={`section-block resource-command-card ${
              index === 0 ? "resource-command-card-featured" : ""
            }`}
          >
            <span className="project-type">{item.eyebrow}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
            <Link href={item.href} className="secondary-link">
              {item.actionLabel}
            </Link>
          </article>
        ))}
      </section>

      <section className="resource-operations-grid">
        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Evidence register"
            title="A clearer view of what is available today and what is ready to accept formal proof next."
            description="This gives procurement and partner reviewers a simple status view instead of forcing them to infer what exists already."
          />
          <EvidenceRegister />
        </section>

        <section className="section-block resource-explorer-panel">
          <SectionIntro
            eyebrow="Resource explorer"
            title="Search and filter the full set of currently available review materials."
            description="This makes the resource center more practical when someone is looking for one specific document, sector page, case study, or proof item."
          />
          <ResourceExplorer />
        </section>
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Priority materials"
          title="The strongest first pages and documents to open now."
          narrow
        />
        <div className="resource-grid">
          {featuredResources.map((item, index) => (
            <article
              key={item.title}
              className={`resource-card ${index < 2 ? "resource-card-featured" : ""}`}
            >
              <div className="resource-card-topline">
                <span className="project-type">{item.type}</span>
                <span className={`status-pill ${index < 2 ? "status-contacted" : "status-upcoming"}`}>
                  {index < 2 ? "Start here" : "Supporting"}
                </span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p className="resource-note">
                {index < 2
                  ? "Recommended first for executive and procurement review."
                  : "Useful once the core company and trust story is already clear."}
              </p>
              <Link href={item.href} className="secondary-link">
                {item.actionLabel}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="Curated proof"
          title="The clearest proof pages to share during capability discussions."
          description="These are the strongest case-study and sector pages to circulate when someone wants visible evidence, buyer fit, and delivery direction."
        />
        <div className="resource-grid">
          {curatedProof.map((item, index) => (
            <article
              key={item.key}
              className={`resource-card ${index === 0 ? "resource-card-featured" : ""}`}
            >
              <div className="resource-card-topline">
                <span className="project-type">{item.type}</span>
                <span className={`status-pill ${index < 3 ? "status-contacted" : "status-upcoming"}`}>
                  {index < 3 ? "Core proof" : "Buyer fit"}
                </span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p className="resource-note">
                {index < 3
                  ? "Use this when someone asks for visible delivery evidence."
                  : "Use this when the conversation shifts toward sector relevance and organizational fit."}
              </p>
              <Link href={item.href} className="secondary-link">
                {item.actionLabel}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <PlatformShowcase
        eyebrow="Software review lens"
        title="Resources now frame Kelel more clearly around dashboards, workflows, portals, and digital operations."
        description="This gives procurement and partner reviewers a better sense of the software-and-systems side of the company while they explore documents, proofs, and capability materials."
        pillars={[
          {
            label: "Documents",
            title: "Formal materials backed by visible digital context",
            copy:
              "Review materials feel stronger when they sit beside software, reporting, and system-oriented capability signals.",
          },
          {
            label: "Dashboards",
            title: "Proof that connects to reporting and internal systems",
            copy:
              "The resource center now supports a clearer story around dashboards, business visibility, and operational information flow.",
          },
          {
            label: "Portals",
            title: "Buyer-facing proof for platforms and modernization",
            copy:
              "Portal and modernization work now has a more explicit place in the Kelel review journey instead of being implied only indirectly.",
          },
          {
            label: "Operations",
            title: "Support and delivery capability behind the materials",
            copy:
              "The resource center reads more like the front door to a real IT and systems company, not just a document shelf.",
          },
        ]}
      />

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="Review context"
          title="The website now offers more than one kind of proof material."
          narrow
        />
        <div className="highlight-grid">
          {referenceCollections.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <PlatformCtaPanel
        title="Reviewing Kelel for a platform, portal, or internal system?"
        copy="The resource center now gives buyers a cleaner way to move from review materials into a platform-specific dashboard, workflow, portal, or reporting brief."
      />

      <MovingMediaStrip
        eyebrow="Systems and review visuals"
        title="The resource center now carries more movement and more software-and-systems presentation."
        description="These visuals give the resource journey a stronger digital, operational, and database-friendly feel without dominating the full review flow."
        items={resourceVisuals}
      />

      <section className="section-block dark-visual-section">
        <div className="visual-proof-layout">
          <article className="visual-proof-copy">
            <span className="eyebrow">Review environment</span>
            <h2>A stronger resource center should feel like a real review room for buyers, partners, and procurement teams.</h2>
            <p className="section-copy">
              This visual section stays as a late-page confidence layer, after the
              practical review tools and curated proof routes have already done the
              heavy lifting.
            </p>
          </article>
          <div className="visual-proof-gallery">
            <article className="visual-proof-card large">
              <Image
                src="/media/team-tablet-meeting.jpg"
                alt="Professionals discussing review content over a tablet"
                width={1600}
                height={1067}
                className="visual-proof-image"
              />
              <div className="visual-proof-meta">
                <span className="project-type">Resource review</span>
                <strong>Better visual support for procurement and capability review conversations.</strong>
              </div>
            </article>
            <article className="visual-proof-card">
              <Image
                src="/media/hero-businessman-tablet.jpg"
                alt="Executive-style business review on a tablet"
                width={1600}
                height={1067}
                className="visual-proof-image"
              />
              <div className="visual-proof-meta">
                <span className="project-type">Decision-making</span>
                <strong>A stronger sense of formal review, approval, and next-step planning.</strong>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="resource-bottom-grid">
        <section className="section-block">
          <ProofReadinessWall
            title="The real Kelel assets that should replace temporary visuals next."
            description="This keeps the authenticity checklist visible without giving it the same weight as the main buyer-review materials."
          />
        </section>

        <section className="section-block">
          <SectionIntro
            eyebrow="Direct coordination"
            title="When someone needs a formal handoff, a profile, or direct clarification."
            description="The resource center should still end with a simple human route, not only documents."
          />
          <div className="leadership-panel">
            <CompanyProfileDownload copy="Use the company profile as the primary formal document inside the Kelel resource center." />
            <ExecutiveContactCard
              compact
              title="Direct coordination"
              copy="For formal requests, clarifications, and project discussions, Kelel provides direct executive contact rather than anonymous routing."
            />
          </div>
        </section>
      </section>
    </main>
  );
}
