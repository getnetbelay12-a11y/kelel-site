import { BrandShowcase } from "@/components/brand-showcase";
import { ProofGallery } from "@/components/proof-gallery";
import type { Metadata } from "next";
import Link from "next/link";
import { SectionIntro } from "@/components/section-intro";
import { projects } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Work | Kelel IT Solution",
  description:
    "See case-study style examples of the business systems, infrastructure improvement, and web modernization work Kelel IT Solution is positioned to deliver.",
};

export default function WorkPage() {
  return (
    <main className="page-shell">
      <section className="section-block page-hero">
        <SectionIntro
          eyebrow="Case studies"
          title="A stronger IT company site needs proof structure, even before every client story is public."
          description="These entries are framed like business case studies so the page reads more credibly and can accept real client stories later with minimal changes."
        />
      </section>

      <section className="project-grid">
        {projects.map((project) => (
          <article key={project.name} className="section-block project-card">
            <span className="project-type">{project.type}</span>
            <h3>{project.name}</h3>
            <p>{project.blurb}</p>
            <p className="project-detail"><strong>Challenge:</strong> {project.challenge}</p>
            <p className="project-detail"><strong>Outcome:</strong> {project.outcome}</p>
            <Link href={`/work/${project.slug}`} className="secondary-link">
              View full case study
            </Link>
          </article>
        ))}
      </section>

      <section className="section-block contrast-panel">
        <BrandShowcase
          title="The case-study section now has a brand system that can support future screenshots and project visuals."
          description="Until real delivery screenshots are added, these Kelel brand assets help the work page feel more complete and more presentable for live company use."
        />
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Proof assets"
          title="The website now shows visible company-profile material instead of relying on text-only proof."
          description="These previews come from the formal Kelel company profile and give the Work page a more document-backed presentation while future project screenshots are being prepared."
        />
        <ProofGallery />
      </section>

      <section className="section-block contact-panel">
        <SectionIntro
          eyebrow="Build your next project"
          title="The next real case study here can come directly from your organization."
          narrow
        />
        <Link href="/contact" className="primary-link">
          Start with Kelel
        </Link>
      </section>
    </main>
  );
}
