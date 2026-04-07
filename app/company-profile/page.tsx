import { CompanyProfileDownload } from "@/components/company-profile-download";
import { ExecutiveContactCard } from "@/components/executive-contact-card";
import { ProofGallery } from "@/components/proof-gallery";
import { SectionIntro } from "@/components/section-intro";
import type { Metadata } from "next";
import Link from "next/link";
import {
  assurancePoints,
  projects,
  readinessSignals,
  services,
  site,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Company Profile | Kelel IT Solution",
  description:
    "Preview and download the official Kelel IT Solution company profile with service coverage, readiness points, and leadership contact details.",
};

export default function CompanyProfilePage() {
  return (
    <main className="page-shell">
      <section className="section-block page-hero">
        <SectionIntro
          eyebrow="Company profile"
          title="A formal Kelel profile that is easy to preview online and easy to share as a PDF."
          description="This page turns the downloadable company profile into a visible part of the website, so partners and clients can review Kelel before a meeting or proposal discussion."
        />
        <div className="profile-page-actions">
          <Link href="/resources" className="secondary-link">
            Resource center
          </Link>
          <Link href="/contact" className="secondary-link">
            Talk to Kelel
          </Link>
          <a
            href="/downloads/kelel-company-profile.pdf"
            className="primary-link"
            download
          >
            Download PDF
          </a>
        </div>
      </section>

      <section className="section-block profile-preview-layout">
        <div className="profile-preview-card">
          <div className="profile-preview-head">
            <span className="eyebrow">Preview</span>
            <p>
              Official company profile for {site.name}, including leadership contact,
              service areas, readiness signals, and case-study direction.
            </p>
          </div>
          <iframe
            src="/downloads/kelel-company-profile.pdf#view=FitH"
            title="Kelel company profile PDF preview"
            className="profile-preview-frame"
          />
        </div>

        <div className="profile-page-side">
          <CompanyProfileDownload />
          <ExecutiveContactCard copy="Use the company profile for introductions, procurement conversations, partnership outreach, and early-stage project discussions." />
        </div>
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="What is inside"
          title="The profile now packages the same company story the website presents, but in a more formal handoff format."
          narrow
        />
        <div className="highlight-grid">
          {services.map((service) => (
            <article key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="Preview pages"
          title="The strongest pages from the profile are now visible directly on the website too."
          description="This makes the profile easier to trust before download and gives Kelel a more substantial proof layer in the browser."
        />
        <ProofGallery />
      </section>

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="Readiness"
          title="The profile is designed to support trust-building conversations with clearer operating signals."
          narrow
        />
        <div className="highlight-grid">
          {readinessSignals.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Assurance"
          title="The profile also reinforces how inquiries and delivery discussions are handled."
          narrow
        />
        <div className="pillars-list">
          {assurancePoints.map((item) => (
            <article key={item}>
              <strong>{item}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="project-grid">
        {projects.map((project) => (
          <article key={project.name} className="section-block project-card">
            <span className="project-type">{project.type}</span>
            <h3>{project.name}</h3>
            <p>{project.blurb}</p>
            <Link href={`/work/${project.slug}`} className="secondary-link">
              Open case study
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
