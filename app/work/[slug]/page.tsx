import { CompanyProfileDownload } from "@/components/company-profile-download";
import { ExecutiveContactCard } from "@/components/executive-contact-card";
import { SectionIntro } from "@/components/section-intro";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/site-content";

type WorkDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Case Study | Kelel IT Solution",
    };
  }

  return {
    title: `${project.name} | Kelel IT Solution`,
    description: project.blurb,
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="page-shell">
      <section className="section-block page-hero">
        <SectionIntro
          eyebrow={project.type}
          title={project.name}
          description={project.blurb}
        />
        <div className="profile-page-actions">
          <Link href="/work" className="secondary-link">
            Back to case studies
          </Link>
          <Link href="/contact" className="primary-link">
            Discuss a similar project
          </Link>
        </div>
      </section>

      <section className="case-study-layout">
        <article className="section-block">
          <span className="case-study-label">Project scope</span>
          <h3>{project.scope}</h3>
          <p>{project.clientNeed}</p>
        </article>

        <ExecutiveContactCard
          compact
          title="Project contact"
          copy="Discuss a similar systems, website, or infrastructure engagement directly with Kelel leadership."
        />
      </section>

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="Challenge and outcome"
          title="The case study now explains the business problem and the delivery direction more clearly."
          narrow
        />
        <div className="highlight-grid">
          <article>
            <h3>Challenge</h3>
            <p>{project.challenge}</p>
          </article>
          <article>
            <h3>Outcome</h3>
            <p>{project.outcome}</p>
          </article>
        </div>
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Approach"
          title="How Kelel would structure the work and delivery thinking."
          narrow
        />
        <div className="case-study-list">
          {project.approach.map((item) => (
            <article key={item}>
              <strong>{item}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="Deliverables"
          title="The page now packages what a buyer can expect from the engagement."
          narrow
        />
        <div className="pillars-list">
          {project.deliverables.map((item) => (
            <article key={item}>
              <strong>{item}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Business impact"
          title="Each case study should point back to operational value, not just technical activity."
          narrow
        />
        <div className="case-study-list">
          {project.impactPoints.map((item) => (
            <article key={item}>
              <strong>{item}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <CompanyProfileDownload copy="Use the Kelel company profile alongside this case study when sharing company capability, leadership contact, and service coverage with partners or clients." />
      </section>
    </main>
  );
}
