import { CompanyProfileDownload } from "@/components/company-profile-download";
import { EvidenceRegister } from "@/components/evidence-register";
import { ExecutiveContactCard } from "@/components/executive-contact-card";
import { ResourceExplorer } from "@/components/resource-explorer";
import { SectionIntro } from "@/components/section-intro";
import type { Metadata } from "next";
import Link from "next/link";
import {
  businessResources,
  projects,
  referenceCollections,
  sectorPages,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Resources | Kelel IT Solution",
  description:
    "Access formal company resources, profile downloads, case studies, and sector pages for Kelel IT Solution.",
};

export default function ResourcesPage() {
  return (
    <main className="page-shell">
      <section className="section-block page-hero">
        <SectionIntro
          eyebrow="Resources"
          title="A simple resource center for business review, procurement conversations, and partner sharing."
          description="This page brings Kelel's formal materials, proof pages, and buyer-focused links together in one place so visitors do not have to search across the site."
        />
      </section>

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="Evidence register"
          title="A clearer view of what is available today and what is ready to accept formal proof next."
          description="This gives procurement and partner reviewers a simple status view instead of forcing them to infer what exists already."
        />
        <EvidenceRegister />
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Resource explorer"
          title="Search and filter the full set of currently available review materials."
          description="This makes the resource center more practical when someone is looking for one specific document, sector page, case study, or proof item."
        />
        <ResourceExplorer />
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Formal materials"
          title="The main documents and review pages available now."
          narrow
        />
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
      </section>

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="Guided review"
          title="Some visitors need a review path, not just a library."
          description="The business review checklist provides a practical order for evaluating Kelel's materials during procurement, partnership, or internal review."
        />
        <div className="contact-panel-stack">
          <Link href="/review-checklist" className="primary-link">
            Open review checklist
          </Link>
        </div>
      </section>

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="Reference library"
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

      <section className="section-block">
        <SectionIntro
          eyebrow="Case studies"
          title="Detailed project pages that can be shared during capability discussions."
          narrow
        />
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
      </section>

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="Sector pages"
          title="Buyer-focused pages for different organization types."
          narrow
        />
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
      </section>

      <section className="sector-layout">
        <CompanyProfileDownload copy="Use the company profile as the primary formal document inside the Kelel resource center." />
        <ExecutiveContactCard
          compact
          title="Direct coordination"
          copy="For formal requests, clarifications, and project discussions, Kelel provides direct executive contact rather than anonymous routing."
        />
      </section>
    </main>
  );
}
