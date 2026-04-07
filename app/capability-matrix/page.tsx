import { CompanyProfileDownload } from "@/components/company-profile-download";
import { ExecutiveContactCard } from "@/components/executive-contact-card";
import { MovingMediaStrip } from "@/components/moving-media-strip";
import { PlatformCtaPanel } from "@/components/platform-cta-panel";
import { SectionIntro } from "@/components/section-intro";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  capabilityMatrix,
  platformUseCases,
  sectorPages,
  services,
} from "@/lib/site-content";

const matrixVisuals = [
  {
    title: "Capability review with software and systems proof nearby",
    label: "Service fit",
    description:
      "The matrix feels stronger when buyers can scan service fit while still seeing digital systems and proof-oriented visuals.",
    image: "/proof/company-profile-page-3.png",
    alt: "Software and capability proof image",
  },
  {
    title: "Operations and delivery context behind service choices",
    label: "Operational review",
    description:
      "Support and implementation visuals reinforce the practical side of Kelel's service lines.",
    image: "/media/it-support-team.jpg",
    alt: "Operations and IT support team collaborating",
  },
  {
    title: "Business discussion around the right delivery path",
    label: "Decision path",
    description:
      "Planning visuals help the matrix feel like part of a real comparison and decision process.",
    image: "/media/team-tablet-meeting.jpg",
    alt: "Team discussing service options and delivery paths",
  },
];

export const metadata: Metadata = {
  title: "Capability Matrix | Kelel IT Solution",
  description:
    "Compare Kelel IT Solution service lines against sector fit and business outcomes in a single capability matrix.",
};

export default function CapabilityMatrixPage() {
  const matrixStats = [
    {
      label: "Service lines",
      value: String(services.length),
      note: "Core solution categories available for quick comparison.",
    },
    {
      label: "Comparison rows",
      value: String(capabilityMatrix.length),
      note: "Service views mapped to likely sector fit and practical outcomes.",
    },
    {
      label: "Platform cues",
      value: String(platformUseCases.length),
      note: "Signals for when the conversation should move into platforms and systems work.",
    },
    {
      label: "Sector routes",
      value: String(sectorPages.length),
      note: "Industry paths that help turn comparison into buyer-specific review.",
    },
  ];

  const topPlatformUseCases = platformUseCases.slice(0, 3);
  const keySectors = sectorPages
    .filter(
      (sector) =>
        sector.slug === "operations-heavy-organizations" ||
        sector.slug === "teams-modernizing-internal-workflows" ||
        sector.slug === "service-companies-and-consultancies",
    )
    .slice(0, 3);

  return (
    <main className="page-shell home-page-shell resource-page-shell">
      <section className="section-block page-hero visual-page-hero resource-command-hero">
        <div className="visual-page-hero-copy">
          <SectionIntro
            eyebrow="Capability matrix"
            title="A clearer comparison view for services, sector fit, and practical business outcomes."
            description="This page is designed as a faster review layer for buyers who want to compare Kelel's solution lines without reading every service and sector page first."
          />
          <div className="hero-actions">
            <Link href="/services" className="secondary-link">
              Back to solutions
            </Link>
            <Link href="/resources" className="secondary-link">
              Open resources
            </Link>
            <Link href="/contact" className="primary-link">
              Contact Kelel
            </Link>
          </div>
          <div className="resource-command-metrics">
            {matrixStats.map((item) => (
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
            alt="Team collaborating on technology planning"
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
            eyebrow="Comparison matrix"
            title="The main job of this page is to help a buyer compare Kelel's fit quickly."
            description="Use the matrix first, then go deeper into proof, sectors, platforms, or proposal routes once the most relevant solution line is clear."
          />
          <div className="matrix-grid">
            {capabilityMatrix.map((row) => (
              <article key={row.service} className="matrix-card">
                <h3>{row.service}</h3>
                <div className="matrix-meta">
                  <span className="project-type">Sector fit</span>
                  <div className="matrix-tags">
                    {row.sectorFit.map((item) => (
                      <span key={item} className="tag-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="matrix-meta">
                  <span className="project-type">Likely outcomes</span>
                  <ul className="service-bullets">
                    {row.outcomes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="How to use it"
            title="The matrix works best as a short decision layer before deeper review."
            description="This keeps the page focused on comparison while still guiding buyers toward the right next step."
          />
          <div className="highlight-grid">
            <article>
              <h3>Start broad</h3>
              <p>
                Use the matrix first to identify which Kelel service line most closely
                matches your organization&apos;s current need.
              </p>
            </article>
            <article>
              <h3>Then go deeper</h3>
              <p>
                Move next into sector pages, case studies, the company profile, and the
                trust pages for more detailed review.
              </p>
            </article>
            <article>
              <h3>Use it for internal alignment</h3>
              <p>
                The matrix is useful when multiple stakeholders need a shared comparison
                view before deciding which route to explore in detail.
              </p>
            </article>
          </div>
        </section>
      </section>

      <section className="resource-bottom-grid">
        <section className="section-block">
          <SectionIntro
            eyebrow="Platform path"
            title="If your need is more software, dashboard, portal, or workflow related, go one step deeper."
            description="The capability matrix is the broad comparison layer. The platforms page gives a more direct view of dashboards, workflow systems, portals, and data visibility work."
          />
          <div className="highlight-grid">
            {topPlatformUseCases.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </article>
            ))}
          </div>
          <div className="hero-actions">
            <Link href="/platforms" className="primary-link">
              Explore platforms
            </Link>
            <Link
              href="/request-proposal?focus=dashboard&source=capability-matrix-page"
              className="secondary-link"
            >
              Request platform proposal
            </Link>
          </div>
        </section>

        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Sector relevance"
            title="The comparison becomes more useful when it is anchored in a buyer's real operating environment."
            description="These sector routes help turn a service comparison into something more specific to the organization's context."
          />
          <div className="resource-grid compact-grid">
            {keySectors.map((sector) => (
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

      <PlatformCtaPanel
        title="Comparing options for a dashboard, workflow system, portal, or reporting need?"
        copy="Once the matrix points you toward the software-and-systems side of Kelel, this gives you a cleaner route into the right structured platform brief."
      />

      <section className="section-block contrast-panel">
        <MovingMediaStrip
          eyebrow="Capability and systems visuals"
          title="The matrix now carries more movement and more software-platform context."
          description="These visuals support faster service comparison while keeping the page inside a stronger IT-company and systems-delivery story."
          items={matrixVisuals}
        />
      </section>

      <section className="resource-bottom-grid">
        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Formal handoff"
            title="Some comparison reviews need both a quick matrix and a formal company document."
            description="Use these support routes when the comparison needs to move into internal circulation, executive review, or a direct conversation."
          />
          <div className="leadership-panel">
            <CompanyProfileDownload copy="Use the capability matrix together with the company profile when someone needs both a fast comparison view and a formal document." />
            <ExecutiveContactCard
              compact
              title="Need help comparing options?"
              copy="Kelel can help turn the matrix into a more specific project or support discussion based on your organization's priorities."
            />
          </div>
        </section>

        <section className="section-block contact-panel">
          <SectionIntro
            eyebrow="Next step"
            title="Move from comparison into the right next conversation."
            narrow
          />
          <div className="contact-panel-stack">
            <Link href="/services" className="secondary-link">
              Revisit solutions
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
