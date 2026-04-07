import { CompanyProfileDownload } from "@/components/company-profile-download";
import { ExecutiveContactCard } from "@/components/executive-contact-card";
import { MovingMediaStrip } from "@/components/moving-media-strip";
import { PlatformCtaPanel } from "@/components/platform-cta-panel";
import { SectionIntro } from "@/components/section-intro";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, sectorPages } from "@/lib/site-content";

type IndustryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return sectorPages.map((sector) => ({ slug: sector.slug }));
}

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = sectorPages.find((item) => item.slug === slug);

  if (!sector) {
    return { title: "Industries | Kelel IT Solution" };
  }

  return {
    title: `${sector.name} | Kelel IT Solution`,
    description: sector.summary,
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const sector = sectorPages.find((item) => item.slug === slug);

  if (!sector) {
    notFound();
  }

  const heroImage =
    slug === "operations-heavy-organizations"
      ? "/media/it-support-team.jpg"
      : slug === "teams-modernizing-internal-workflows"
        ? "/proof/company-profile-page-1.png"
        : "/media/team-tablet-meeting.jpg";

  const sectorVisuals = [
    {
      title: "Operational systems and workflow visibility",
      label: "Systems fit",
      description:
        "Sector pages feel stronger when they show more of the software, dashboard, and operations side of the Kelel offer.",
      image: "/proof/company-profile-page-1.png",
      alt: "Software and workflow proof visual",
    },
    {
      title: "Planning sessions around delivery priorities",
      label: "Sector planning",
      description:
        "Review and planning visuals help the page feel closer to real buyer conversations and internal project scoping.",
      image: "/media/team-tablet-meeting.jpg",
      alt: "Team reviewing sector-specific delivery needs",
    },
    {
      title: "Support and implementation readiness",
      label: "Operational delivery",
      description:
        "Implementation visuals reinforce that sector-fit conversations connect back to practical systems and support delivery.",
      image: "/media/it-support-team.jpg",
      alt: "IT support and systems team working together",
    },
  ];

  const sectorStats = [
    {
      label: "Challenges",
      value: String(sector.challenges.length),
      note: "Core business issues this sector usually needs help resolving.",
    },
    {
      label: "Solution paths",
      value: String(sector.solutions.length),
      note: "Current Kelel offers that map well to this operating context.",
    },
    {
      label: "Outcome themes",
      value: String(sector.outcomes.length),
      note: "The practical business value decision-makers usually care about.",
    },
    {
      label: "Executive route",
      value: "Direct",
      note: "Leadership contact is visible when the conversation becomes serious.",
    },
  ];

  return (
    <main className="page-shell home-page-shell resource-page-shell">
      <section className="section-block page-hero visual-page-hero resource-command-hero">
        <div className="visual-page-hero-copy">
          <SectionIntro
            eyebrow="Industry focus"
            title={sector.name}
            description={`${sector.summary} This page now works more like a focused sector brief: the operating challenges, the most relevant Kelel solution paths, and the clearest next steps into proof or proposal discussion.`}
          />
          <div className="hero-actions">
            <Link href="/services" className="secondary-link">
              Back to solutions
            </Link>
            <Link
              href={`/request-proposal?focus=workflow&source=industry-${slug}`}
              className="primary-link"
            >
              Discuss this sector
            </Link>
            <Link href="/work" className="secondary-link">
              View related proof
            </Link>
          </div>
          <div className="resource-command-metrics">
            {sectorStats.map((item) => (
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
            alt={`${sector.name} industry visual`}
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
            eyebrow="Common challenges"
            title="The main operating pressures Kelel should be able to clarify first."
            description="This section keeps the sector story grounded in the practical business problems that make leaders look for systems, support, reporting, or modernization help."
          />
          <div className="case-study-list">
            {sector.challenges.map((item) => (
              <article key={item}>
                <strong>{item}</strong>
              </article>
            ))}
          </div>
        </article>

        <section className="section-block">
          <ExecutiveContactCard
            compact
            title="Sector contact"
            copy="Use this route when your organization wants a more sector-specific conversation about systems, support, or digital modernization."
          />
        </section>
      </section>

      <section className="resource-bottom-grid">
        <section className="section-block">
          <SectionIntro
            eyebrow="Solution fit"
            title="The clearest Kelel solution paths for this type of organization."
            description="Instead of a generic service list, this gives a sector-specific view of which kinds of engagements make the most sense."
          />
          <div className="pillars-list compact">
            {sector.solutions.map((item) => (
              <article key={item}>
                <strong>{item}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Expected value"
            title="The outcomes should read like business improvement, not just technical activity."
            description="These are the benefits sector buyers usually want to hear clearly before they move into a detailed proposal path."
          />
          <div className="highlight-grid">
            {sector.outcomes.map((item) => (
              <article key={item}>
                <h3>{item}</h3>
                <p>
                  Kelel can frame this improvement as part of a practical, staged delivery
                  conversation rather than an abstract technical plan.
                </p>
              </article>
            ))}
          </div>
        </section>
      </section>

      <MovingMediaStrip
        eyebrow="Sector and systems visuals"
        title="These sector pages now carry more software, dashboard, and delivery energy."
        description="The moving visuals help each industry page feel more like a real IT solutions landing page and less like a static sector note."
        items={sectorVisuals}
      />

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="Related proof"
          title="The strongest nearby proof and capability routes for this sector."
          description="These Kelel proof pages help connect sector fit to actual solution direction, delivery thinking, and business outcomes."
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

      <PlatformCtaPanel
        title={`Need a more structured platform brief for ${sector.name.toLowerCase()}?`}
        copy="If this sector page is pointing toward dashboards, workflows, portals, or reporting visibility, the next step should be a more specific platform brief instead of a generic inquiry."
      />

      <section className="section-block contrast-panel">
        <CompanyProfileDownload copy="Pair this sector page with the formal company profile when introducing Kelel to buyers, partners, or internal decision-makers." />
      </section>
    </main>
  );
}
