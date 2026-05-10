import { EvidenceRegister } from "@/components/evidence-register";
import { ResourceExplorer } from "@/components/resource-explorer";
import { RevealSection } from "@/components/reveal-section";
import { CtaBand } from "@/components/cta-band";
import type { Metadata } from "next";
import Link from "next/link";
import {
  businessResources,
  projects,
  referenceCollections,
  sectorPages,
  site,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Resources | Kelel IT Solution",
  description:
    "Access formal company resources, profile downloads, case studies, and sector pages for Kelel IT Solution.",
};

export default function ResourcesPage() {
  return (
    <main className="stitch-page">
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-crumbs">
            <Link href="/">Home</Link>
            <span className="page-crumbs-sep">/</span>
            <span>Resources</span>
          </div>
          <div className="page-hero-grid">
            <div>
              <div className="site-eyebrow page-eyebrow-spaced">
                <span className="site-eyebrow-dot" />
                Resource Center · Procurement and Partner Review
              </div>
              <h1 className="page-title-plain">
                A simple resource center for <em>review, procurement, and sharing.</em>
              </h1>
              <p className="page-sub">
                Kelel&apos;s formal materials, proof pages, and buyer-focused links are
                gathered here so visitors do not have to hunt across the site before a
                meeting or proposal discussion.
              </p>
              <div className="page-hero-actions">
                <Link href="/company-profile" className="site-hero-btn-primary btn-magnetic">
                  Open company profile →
                </Link>
                <Link href="/contact" className="site-hero-btn-ghost">
                  Contact Kelel
                </Link>
              </div>
            </div>
            <div className="page-meta">
              <div className="page-meta-row">
                <span>Formal resources</span>
                <span>{businessResources.length} live items</span>
              </div>
              <div className="page-meta-row">
                <span>Case studies</span>
                <span>{projects.length} detailed pages</span>
              </div>
              <div className="page-meta-row">
                <span>Industry pages</span>
                <span>{sectorPages.length} buyer views</span>
              </div>
              <div className="page-meta-row">
                <span>Contact route</span>
                <span>Direct leadership access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Formal Materials</div>
          <h2 className="hp-section-title section-title-gap-lg">
            The main documents and review pages <em>available now.</em>
          </h2>
          <div className="resource-grid">
            {businessResources.map((item) => (
              <article key={item.title} className="resource-card">
                <span className="project-type">{item.type}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link href={item.href} className="secondary-link">
                  {item.actionLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Evidence Register</div>
          <h2 className="hp-section-title section-title-gap-lg">
            What exists today and what is <em>ready for formal proof next.</em>
          </h2>
          <EvidenceRegister />
        </div>
      </RevealSection>

      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Resource Explorer</div>
          <h2 className="hp-section-title section-title-gap-lg">
            Search and filter the full set of <em>current review materials.</em>
          </h2>
          <ResourceExplorer />
        </div>
      </RevealSection>

      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Reference Library</div>
          <h2 className="hp-section-title section-title-gap-lg">
            More than one kind of proof, <em>organized on purpose.</em>
          </h2>
          <div className="stitch-caps-grid">
            {referenceCollections.map((item) => (
              <div key={item.title} className="stitch-cap-card">
                <h3 className="stitch-cap-title">{item.title}</h3>
                <p className="stitch-cap-body">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Case Studies</div>
          <h2 className="hp-section-title section-title-gap-lg">
            Detailed project pages for <em>capability discussions.</em>
          </h2>
          <div className="resource-grid">
            {projects.map((project) => (
              <article key={project.slug} className="resource-card">
                <span className="project-type">{project.type}</span>
                <h3>{project.name}</h3>
                <p>{project.blurb}</p>
                <Link href={`/work/${project.slug}`} className="secondary-link">
                  Open case study
                </Link>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Industry Pages</div>
          <h2 className="hp-section-title section-title-gap-lg">
            Buyer-focused pages for <em>different organization types.</em>
          </h2>
          <div className="resource-grid">
            {sectorPages.map((sector) => (
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
        </div>
      </RevealSection>

      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">Review Coordination</div>
          <h2 className="hp-section-title section-title-gap-lg">
            Direct coordination when a reviewer needs <em>clarity, not delay.</em>
          </h2>
          <div className="abt-leader-wrap">
            <div className="abt-leader-card stitch-glass">
              <div className="abt-leader-inner">
                <div className="abt-leader-avatar">G</div>
                <div>
                  <div className="abt-leader-name">{site.contactPerson}</div>
                  <div className="abt-leader-role">{site.contactRole}</div>
                </div>
              </div>
              <p className="stitch-body leader-copy">
                For formal requests, clarifications, and project discussions, Kelel uses
                direct executive contact instead of hiding behind anonymous routing.
              </p>
              <div className="abt-leader-contacts">
                <a href={`mailto:${site.email}`} className="abt-contact-link">
                  {site.email}
                </a>
                <a href={`tel:${site.phone.replaceAll(" ", "")}`} className="abt-contact-link">
                  {site.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection as="div">
        <CtaBand
          kicker="Guided review"
          heading={<>Need a structured <em>review path?</em></>}
          sub="Use the checklist when a buyer, partner, or internal reviewer needs a practical order for evaluating Kelel&apos;s materials."
          primaryLabel="Open review checklist →"
          primaryHref="/review-checklist"
          ghostLabel="Request proposal"
          ghostHref="/request-proposal"
        />
      </RevealSection>
    </main>
  );
}
