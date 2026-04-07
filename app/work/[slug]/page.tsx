import { CompanyProfileDownload } from "@/components/company-profile-download";
import { ExecutiveContactCard } from "@/components/executive-contact-card";
import { MovingMediaStrip } from "@/components/moving-media-strip";
import { SectionIntro } from "@/components/section-intro";
import type { Metadata } from "next";
import Image from "next/image";
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

  const heroImage =
    project.type === "Infrastructure Advisory"
      ? "/media/it-support-team.jpg"
      : project.type === "Public Presence"
        ? "/media/hero-businessman-tablet.jpg"
        : "/media/team-tablet-meeting.jpg";

  const caseStudyVisuals = [
    {
      title: "Business system planning and delivery structure",
      label: "Systems delivery",
      description:
        "Case-study pages should show more of the software, workflow, and platform mindset behind the engagement.",
      image: "/proof/company-profile-page-1.png",
      alt: "Business systems and delivery proof visual",
    },
    {
      title: "Project conversations with stronger review context",
      label: "Project review",
      description:
        "Planning visuals help the page feel closer to real scoping, delivery review, and decision support.",
      image: "/media/team-tablet-meeting.jpg",
      alt: "Team reviewing project decisions on a tablet",
    },
    {
      title: "Operational delivery and support readiness",
      label: "Operations",
      description:
        "Implementation and support imagery reinforces that the work connects back to business operations and continuity.",
      image: "/media/it-support-team.jpg",
      alt: "IT team collaborating on operations and support work",
    },
  ];

  const similarProjectRequest =
    project.type === "Business System"
      ? {
          title: "Request a similar business-system brief",
          links: [
            { label: "Dashboard brief", href: "/request-proposal?focus=dashboard" },
            { label: "Workflow brief", href: "/request-proposal?focus=workflow" },
            { label: "Reporting brief", href: "/request-proposal?focus=reporting" },
          ],
        }
      : project.type === "Public Presence"
        ? {
            title: "Request a similar digital presence brief",
            links: [
              { label: "Portal brief", href: "/request-proposal?focus=portal" },
              { label: "Standard proposal", href: "/request-proposal" },
              { label: "Contact Kelel", href: "/contact" },
            ],
          }
        : {
            title: "Request a similar support or modernization brief",
            links: [
              { label: "Reporting brief", href: "/request-proposal?focus=reporting" },
              { label: "Workflow brief", href: "/request-proposal?focus=workflow" },
              { label: "Standard proposal", href: "/request-proposal" },
            ],
        };

  const caseStats = [
    {
      label: "Project type",
      value: project.type,
      note: "The operating category this case study best represents.",
    },
    {
      label: "Approach points",
      value: String(project.approach.length),
      note: "The key steps that shaped delivery direction and project structure.",
    },
    {
      label: "Deliverables",
      value: String(project.deliverables.length),
      note: "What a buyer could expect from a similar engagement path.",
    },
    {
      label: "Impact areas",
      value: String(project.impactPoints.length),
      note: "The operational outcomes this project story is designed to demonstrate.",
    },
  ];

  return (
    <main className="page-shell home-page-shell resource-page-shell">
      <section className="section-block page-hero visual-page-hero resource-command-hero">
        <div className="visual-page-hero-copy">
          <SectionIntro
            eyebrow={project.type}
            title={project.name}
            description={`${project.blurb} This page now works more like a concise proof brief: the operating problem, the delivery approach, the expected outputs, and the next route into a similar structured request.`}
          />
          <div className="hero-actions">
            <Link href="/work" className="secondary-link">
              Back to case studies
            </Link>
            <Link
              href="/request-proposal?focus=dashboard&source=case-study-page"
              className="primary-link"
            >
              Discuss a similar project
            </Link>
            <Link href="/company-profile" className="secondary-link">
              Review company profile
            </Link>
          </div>
          <div className="resource-command-metrics">
            {caseStats.map((item) => (
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
            src={heroImage}
            alt={`${project.name} case study visual`}
            width={1600}
            height={1067}
            className="visual-page-hero-image"
            priority
          />
        </div>
      </section>

      <section className="resource-bottom-grid">
        <article className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Project scope"
            title={project.scope}
            description={project.clientNeed}
          />
        </article>

        <section className="section-block">
          <ExecutiveContactCard
            compact
            title="Project contact"
            copy="Discuss a similar systems, website, or infrastructure engagement directly with Kelel leadership."
          />
        </section>
      </section>

      <section className="resource-bottom-grid">
        <section className="section-block">
          <SectionIntro
            eyebrow="Challenge and outcome"
            title="The business problem and the value direction are packaged more clearly here."
            description="This keeps the proof story tied to the buyer's real operating concerns instead of drifting into generic project description."
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

        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Approach"
            title="How Kelel would structure the work and delivery thinking."
            description="These approach points translate the case study into a practical implementation conversation."
          />
          <div className="case-study-list">
            {project.approach.map((item) => (
              <article key={item}>
                <strong>{item}</strong>
              </article>
            ))}
          </div>
        </section>
      </section>

      <MovingMediaStrip
        eyebrow="Software and delivery visuals"
        title="The case-study detail page now carries more systems, platform, and implementation energy."
        description="These moving visuals make the project story feel more connected to real dashboards, software delivery, operational support, and business review."
        items={caseStudyVisuals}
      />

      <section className="resource-bottom-grid">
        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Deliverables"
            title="What a similar engagement would likely need to produce."
            description="This keeps the proof story practical and makes it easier for buyers to picture what they would actually receive."
          />
          <div className="pillars-list compact">
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
            title="The proof should point back to operational value, not just technical activity."
            description="These impact signals keep the case study relevant to business reviewers, not only technical readers."
          />
          <div className="case-study-list">
            {project.impactPoints.map((item) => (
              <article key={item}>
                <strong>{item}</strong>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="Start a similar brief"
          title={similarProjectRequest.title}
          description="These shortcuts help visitors move from a proof story into a more structured request path without restarting from a blank contact journey."
          narrow
        />
        <div className="platform-cta-shortcuts">
          {similarProjectRequest.links.map((item) => (
            <Link key={item.label} href={item.href} className="mini-chip-link">
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block contrast-panel">
        <CompanyProfileDownload copy="Use the Kelel company profile alongside this case study when sharing company capability, leadership contact, and service coverage with partners or clients." />
      </section>
    </main>
  );
}
