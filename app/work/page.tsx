import { MovingMediaStrip } from "@/components/moving-media-strip";
import { PlatformCtaPanel } from "@/components/platform-cta-panel";
import { PlatformShowcase } from "@/components/platform-showcase";
import { ProofGallery } from "@/components/proof-gallery";
import { SectionIntro } from "@/components/section-intro";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects, sectorPages } from "@/lib/site-content";

const workVisuals = [
  {
    title: "Software platform and workflow proof",
    label: "Platform delivery",
    description:
      "The work page carries more software and operations visual language, not only text summaries.",
    image: "/proof/company-profile-page-1.png",
    alt: "Software and workflow proof visual",
  },
  {
    title: "Review sessions around active project decisions",
    label: "Project review",
    description:
      "Business and technology review moments help the page feel closer to real delivery discussion.",
    image: "/media/team-tablet-meeting.jpg",
    alt: "Team reviewing project material on a tablet",
  },
  {
    title: "Support and implementation collaboration",
    label: "Implementation",
    description:
      "Operational delivery visuals reinforce the case-study story around real systems work and coordination.",
    image: "/media/it-support-team.jpg",
    alt: "IT support and implementation team working together",
  },
];

export const metadata: Metadata = {
  title: "Work | Kelel IT Solution",
  description:
    "See case-study style examples of the business systems, infrastructure improvement, and web modernization work Kelel IT Solution is positioned to deliver.",
};

export default function WorkPage() {
  const proofStats = [
    {
      label: "Case studies",
      value: String(projects.length),
      note: "Business examples framed for buyer review and future proof expansion.",
    },
    {
      label: "Business systems",
      value: String(projects.filter((project) => project.type === "Business System").length),
      note: "Examples connected to workflow visibility, systems structure, and reporting maturity.",
    },
    {
      label: "Public presence",
      value: String(projects.filter((project) => project.type === "Public Presence").length),
      note: "Examples tied to public credibility, service clarity, and digital presence improvement.",
    },
    {
      label: "Sector routes",
      value: String(sectorPages.length),
      note: "Industry pages that help buyers connect proof to their operating context.",
    },
  ];

  const featuredProjects = projects.slice(0, 3);
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
            eyebrow="Case studies"
            title="A clearer proof center for buyers who need visible delivery direction, not only service claims."
            description="These entries are framed as business case studies so the page works credibly today and can absorb real screenshots, client results, and delivery materials later without redesign."
          />
          <div className="hero-actions">
            <Link href="/request-proposal" className="primary-link">
              Request a proposal
            </Link>
            <Link href="/company-profile" className="secondary-link">
              Review company profile
            </Link>
            <Link href="/resources" className="secondary-link">
              Open resources
            </Link>
          </div>
          <div className="resource-command-metrics">
            {proofStats.map((item) => (
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
            alt="Business team collaborating over a tablet in a modern office"
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
            eyebrow="Featured case studies"
            title="A smaller curated set of proof stories works better here than a long wall of equal-weight cards."
            description="These are the clearest examples to open first when a buyer wants to understand Kelel's delivery direction and business framing."
          />
          <div className="resource-grid compact-grid">
            {featuredProjects.map((project) => (
              <article key={project.name} className="resource-card">
                <span className="project-type">{project.type}</span>
                <h3>{project.name}</h3>
                <p>{project.blurb}</p>
                <p className="project-detail">
                  <strong>Challenge:</strong> {project.challenge}
                </p>
                <p className="project-detail">
                  <strong>Outcome:</strong> {project.outcome}
                </p>
                <Link href={`/work/${project.slug}`} className="secondary-link">
                  View full case study
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Proof value"
            title="The work page should explain what these case studies demonstrate."
            description="The goal is not only to list projects, but to show workflow visibility, modernization direction, support readiness, and better business structure."
          />
          <PlatformShowcase
            eyebrow="Delivery capability"
            title="Case studies sit beside a clearer systems, dashboard, and workflow delivery story."
            description="This makes the work page feel more grounded in real business software capability, platform structure, and operational visibility instead of only written summaries."
            pillars={[
              {
                label: "Visibility",
                title: "Operational reporting and business oversight",
                copy:
                  "Case studies connect to reporting structure, workflow visibility, and stronger oversight for leaders and teams.",
              },
              {
                label: "Modernization",
                title: "Platform and website modernization with clearer business framing",
                copy:
                  "The page shows Kelel as a partner for broader digital modernization, not only a one-off website refresh.",
              },
              {
                label: "Implementation",
                title: "Support, systems rollout, and practical operating readiness",
                copy:
                  "Delivery stories now feel more connected to the reality of implementation, support, and operational continuity.",
              },
              {
                label: "Scalability",
                title: "Structures that can support growth across teams or locations",
                copy:
                  "Kelel's work is framed around cleaner long-term structure so software and platform decisions feel more durable.",
              },
            ]}
          />
        </section>
      </section>

      <section className="section-block contrast-panel">
        <MovingMediaStrip
          eyebrow="Software and case-study visuals"
          title="More movement and more systems proof make the work page feel closer to real delivery."
          description="These visuals reinforce software platforms, dashboards, implementation work, and review sessions so the case-study journey feels more alive."
          items={workVisuals}
        />
      </section>

      <section className="resource-bottom-grid">
        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Supporting proof assets"
            title="Visible document-backed proof helps the case-study page feel more substantial while richer project media is still being prepared."
            description="These previews from the company profile give the Work page a stronger proof layer even before real dashboard screenshots and delivery photos arrive."
          />
          <ProofGallery />
        </section>

        <section className="section-block">
          <SectionIntro
            eyebrow="Sector relevance"
            title="Buyers often want to know whether the proof matches their operating environment."
            description="These sector pages help connect the case studies to organizations dealing with workflow visibility, service coordination, or digital modernization."
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
        title="Seen enough proof to discuss a similar dashboard, workflow, portal, or reporting project?"
        copy="The work page now leads directly into structured platform briefs, so buyers can move from case-study review into a more specific next-step conversation."
      />

      <section className="resource-bottom-grid">
        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Next review routes"
            title="Move from proof review into the right next page."
            description="Some teams need a formal company profile, some need resources and trust materials, and some are already ready to request a proposal."
          />
          <div className="hero-actions">
            <Link href="/company-profile" className="secondary-link">
              Open company profile
            </Link>
            <Link href="/trust" className="secondary-link">
              Review trust page
            </Link>
            <Link href="/request-proposal" className="primary-link">
              Request proposal
            </Link>
          </div>
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
      </section>
    </main>
  );
}
