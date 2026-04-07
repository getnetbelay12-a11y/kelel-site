import { CompanyProfileDownload } from "@/components/company-profile-download";
import { EvidenceRegister } from "@/components/evidence-register";
import { ExecutiveContactCard } from "@/components/executive-contact-card";
import { MovingMediaStrip } from "@/components/moving-media-strip";
import { PlatformCtaPanel } from "@/components/platform-cta-panel";
import { PrintPackButton } from "@/components/print-pack-button";
import { SectionIntro } from "@/components/section-intro";
import type { Metadata } from "next";
import Link from "next/link";
import {
  projects,
  reviewChecklist,
  sectorPages,
  site,
  trustCredentials,
} from "@/lib/site-content";

const reviewPackVisuals = [
  {
    title: "Document-backed review with stronger software and proof context",
    label: "Formal review",
    description:
      "The review pack feels more aligned with digital systems, dashboards, and formal capability review.",
    image: "/proof/company-profile-page-1.png",
    alt: "Formal review and software proof image",
  },
  {
    title: "Team sessions for procurement and capability review",
    label: "Procurement support",
    description:
      "Meeting visuals help the pack feel like a live review tool rather than only a print handoff page.",
    image: "/media/team-tablet-meeting.jpg",
    alt: "Team discussing review materials together",
  },
  {
    title: "Leadership presentation for approvals and next steps",
    label: "Decision-making",
    description:
      "Executive visuals reinforce approvals, partner conversations, and formal next-step planning.",
    image: "/media/hero-businessman-tablet.jpg",
    alt: "Executive reviewing business materials on a tablet",
  },
];

export const metadata: Metadata = {
  title: "Review Pack | Kelel IT Solution",
  description:
    "A print-friendly business review pack for Kelel IT Solution covering contact details, trust signals, review steps, case studies, and sector pages.",
};

export default function ReviewPackPage() {
  const reviewStats = [
    {
      label: "Company",
      value: site.name,
      note: "Formal review pack centered on company identity, trust, proof, and next-step routes.",
    },
    {
      label: "Trust signals",
      value: String(trustCredentials.length),
      note: "Current signals that support business review and procurement-style confidence.",
    },
    {
      label: "Case studies",
      value: String(projects.length),
      note: "Current proof routes available for capability and delivery discussion.",
    },
    {
      label: "Sector pages",
      value: String(sectorPages.length),
      note: "Buyer-fit pages that help connect the review to real operating context.",
    },
  ];

  const topTrustCredentials = trustCredentials.slice(0, 4);
  const topChecklistGroups = reviewChecklist.slice(0, 3);
  const featuredProjects = projects.slice(0, 3);
  const keySectors = sectorPages.slice(0, 3);

  return (
    <main className="page-shell print-pack resource-page-shell">
      <section className="section-block page-hero print-section resource-command-hero">
        <div className="visual-page-hero-copy">
          <SectionIntro
            eyebrow="Review pack"
            title="A cleaner Kelel review pack for meetings, procurement, executive circulation, and save-as-PDF handoff."
            description="This page condenses the most important company, trust, and capability review materials into a tighter format that works better both on screen and in print."
          />
          <div className="profile-page-actions print-hide">
            <Link href="/resources" className="secondary-link">
              Back to resources
            </Link>
            <Link href="/capability-matrix" className="secondary-link">
              Capability matrix
            </Link>
            <Link
              href="/request-proposal?focus=dashboard&source=review-pack-page"
              className="secondary-link"
            >
              Dashboard brief
            </Link>
            <PrintPackButton />
            <Link href="/contact" className="primary-link">
              Contact Kelel
            </Link>
          </div>
          <div className="resource-command-metrics">
            {reviewStats.map((item) => (
              <article key={item.label} className="resource-command-metric">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="resource-bottom-grid print-section">
        <article className="section-block">
          <SectionIntro
            eyebrow="Company details"
            title="The review pack should open with the company identity and formal contact points."
            description="This keeps the handoff useful for internal circulation, executive review, and procurement-style discussion."
          />
          <h3>{site.name}</h3>
          <p>{site.intro}</p>
          <div className="pack-meta">
            <strong>{site.contactPerson}</strong>
            <span>{site.contactRole}</span>
            <span>{site.email}</span>
            <span>{site.phone}</span>
            <span>{site.location}</span>
          </div>
        </article>

        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Primary contact"
            title="A named review contact makes the pack easier to act on."
            description="Use this contact point for formal review, clarification, partnership conversations, and next-step coordination."
          />
          <ExecutiveContactCard compact title="Primary review contact" />
        </section>
      </section>

      <section className="resource-bottom-grid print-section">
        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Current trust signals"
            title="What Kelel can already present today."
            description="These are the trust items most useful to place near the top of a formal review pack."
          />
          <div className="highlight-grid">
            {topTrustCredentials.map((item, index) => (
              <article key={item.title} className={index === 0 ? "highlight-card-featured" : ""}>
                <div className="resource-card-topline">
                  <span className="status-pill status-contacted">{item.status}</span>
                  <span className="project-type">
                    {index === 0 ? "Primary trust signal" : "Current trust signal"}
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <p className="resource-note">
                  {index === 0
                    ? "This belongs near the top because it supports the first formal impression most strongly."
                    : "Supports the broader review pack once the company identity is already clear."}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block">
          <SectionIntro
            eyebrow="Review sequence"
            title="A practical order for reviewing the business."
            description="The checklist is more useful when it is grouped and kept concise for a formal review flow."
          />
          <div className="checklist-grid">
            {topChecklistGroups.map((group) => (
              <article key={group.title} className="checklist-card">
                <h3>{group.title}</h3>
                <ul className="service-bullets">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="resource-bottom-grid print-section">
        <section className="section-block">
          <SectionIntro
            eyebrow="Featured proof routes"
            title="A few focused proof routes work better in the pack than a longer undifferentiated list."
            description="These are the clearest case-study pages to support capability discussion during formal review."
          />
          <div className="resource-grid compact-grid">
            {featuredProjects.map((project) => (
              <article key={project.slug} className="resource-card">
                <span className="project-type">{project.type}</span>
                <h3>{project.name}</h3>
                <p>{project.blurb}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Sector pages"
            title="Current buyer-fit pages available for different organization types."
            description="These routes help reviewers move from company-level review into buyer-specific context."
          />
          <div className="resource-grid compact-grid">
            {keySectors.map((sector) => (
              <article key={sector.slug} className="resource-card">
                <span className="project-type">Industry page</span>
                <h3>{sector.name}</h3>
                <p>{sector.summary}</p>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="section-block contrast-panel print-section">
        <SectionIntro
          eyebrow="Evidence status"
          title="Available materials and pending external proof."
          description="This keeps the pack honest about what Kelel can share today and what is prepared for later publication."
        />
        <EvidenceRegister />
      </section>

      <section className="print-hide">
        <MovingMediaStrip
          eyebrow="Review pack visuals"
          title="The review pack now carries more movement and more systems-oriented presentation."
          description="These visuals help the review pack feel more like a serious software and capability review environment before someone prints or saves it."
          items={reviewPackVisuals}
        />
      </section>

      <section className="print-hide">
        <PlatformCtaPanel
          title="Need the platform and systems path during review?"
          copy="If the review pack is pointing toward dashboards, portals, workflows, or internal business systems, this gives reviewers a cleaner route into the right structured platform brief."
        />
      </section>

      <section className="resource-bottom-grid print-section">
        <section className="section-block">
          <CompanyProfileDownload copy="Pair this review pack with the downloadable company profile when a formal PDF document is needed alongside the web review flow." />
        </section>

        <section className="section-block contact-panel print-hide">
          <SectionIntro
            eyebrow="Next route"
            title="Move from the pack into the right next conversation."
            narrow
          />
          <div className="contact-panel-stack">
            <Link href="/trust" className="secondary-link">
              Review trust page
            </Link>
            <Link href="/contact" className="primary-link">
              Contact Kelel
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
