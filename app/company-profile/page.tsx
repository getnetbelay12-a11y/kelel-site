import { CompanyProfileDownload } from "@/components/company-profile-download";
import { ExecutiveContactCard } from "@/components/executive-contact-card";
import { MovingMediaStrip } from "@/components/moving-media-strip";
import { PlatformCtaPanel } from "@/components/platform-cta-panel";
import { ProofGallery } from "@/components/proof-gallery";
import { SectionIntro } from "@/components/section-intro";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  assurancePoints,
  projects,
  readinessSignals,
  services,
  site,
} from "@/lib/site-content";

const profileVisuals = [
  {
    title: "Company profile pages with stronger software and data context",
    label: "Profile proof",
    description:
      "Document-backed visuals make the formal profile feel more substantial and more aligned with technology delivery.",
    image: "/proof/company-profile-page-1.png",
    alt: "Company profile proof and dashboard visual",
  },
  {
    title: "Executive-facing business presentation",
    label: "Commercial review",
    description:
      "Leadership visuals help the profile page feel more appropriate for introductions, proposals, and formal review.",
    image: "/media/hero-businessman-tablet.jpg",
    alt: "Business leader reviewing profile materials",
  },
  {
    title: "Discussion and planning around delivery scope",
    label: "Profile discussion",
    description:
      "Collaborative visuals support the idea that the profile leads into real conversations, not just passive reading.",
    image: "/media/team-tablet-meeting.jpg",
    alt: "Team discussing profile and project materials",
  },
  {
    title: "Proof pages for systems and digital modernization",
    label: "System proof",
    description:
      "The page now has more visual room for dashboards, platforms, and future real Kelel delivery screenshots.",
    image: "/proof/company-profile-page-3.png",
    alt: "Digital system proof page visual",
  },
];

export const metadata: Metadata = {
  title: "Company Profile | Kelel IT Solution",
  description:
    "Preview and download the official Kelel IT Solution company profile with service coverage, readiness points, and leadership contact details.",
};

export default function CompanyProfilePage() {
  const profileStats = [
    {
      label: "Service lines",
      value: String(services.length),
      note: "Core solution areas included in the formal profile.",
    },
    {
      label: "Readiness points",
      value: String(readinessSignals.length),
      note: "Operating signals that support trust-building conversations.",
    },
    {
      label: "Assurance markers",
      value: String(assurancePoints.length),
      note: "Visible cues that support contact, delivery, and follow-up confidence.",
    },
    {
      label: "Proof routes",
      value: String(projects.length),
      note: "Case-study pages available to support formal review after the profile.",
    },
  ];

  const profileRoutes = [
    {
      eyebrow: "Formal document",
      title: "Download the company profile PDF",
      copy: "Best for executive introductions, procurement review, and partner circulation when a formal file is needed first.",
      href: "/downloads/kelel-company-profile.pdf",
      action: "Download PDF",
      download: true,
    },
    {
      eyebrow: "Review path",
      title: "Move into the resource center",
      copy: "Best for buyers who need curated case studies, sector pages, trust materials, and review links after the profile.",
      href: "/resources",
      action: "Open resources",
    },
    {
      eyebrow: "Platform fit",
      title: "Start a structured systems brief",
      copy: "Best when the conversation is already moving toward dashboards, workflows, portals, or reporting visibility.",
      href: "/request-proposal?focus=dashboard&source=company-profile-page",
      action: "Start dashboard brief",
    },
    {
      eyebrow: "Trust route",
      title: "Open trust and assurance",
      copy: "Best when the reviewer wants the formal confidence layer, evidence register, and assurance positioning in one place.",
      href: "/trust",
      action: "Review trust page",
    },
  ];

  const coreServiceLines = services.slice(0, 4);
  const topReadinessSignals = readinessSignals.slice(0, 3);
  const topAssurancePoints = assurancePoints.slice(0, 4);
  const featuredProjects = projects.slice(0, 3);

  return (
    <main className="page-shell home-page-shell resource-page-shell">
      <section className="section-block page-hero visual-page-hero resource-command-hero">
        <div className="visual-page-hero-copy">
          <SectionIntro
            eyebrow="Company profile"
            title="A formal Kelel profile that is easier to review, easier to share, and clearer to trust."
            description="This page now works more like a formal company handoff: the key routes are visible near the top, the PDF preview is central, and the supporting proof is grouped more deliberately."
          />
          <div className="hero-actions">
            <a
              href="/downloads/kelel-company-profile.pdf"
              className="primary-link"
              download
            >
              Download PDF
            </a>
            <Link href="/resources" className="secondary-link">
              Open resources
            </Link>
            <Link
              href="/request-proposal?focus=dashboard&source=company-profile-page"
              className="secondary-link"
            >
              Start dashboard brief
            </Link>
          </div>
          <div className="resource-command-metrics">
            {profileStats.map((item) => (
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
            src="/media/hero-businessman-tablet.jpg"
            alt="Business leader reviewing a company profile on a tablet"
            width={1600}
            height={1067}
            className="visual-page-hero-image"
            priority
          />
        </div>
      </section>

      <section className="resource-command-grid">
        {profileRoutes.map((route) => (
          <article key={route.title} className="section-block resource-command-card">
            <span className="project-type">{route.eyebrow}</span>
            <h3>{route.title}</h3>
            <p>{route.copy}</p>
            {route.download ? (
              <a href={route.href} className="secondary-link" download>
                {route.action}
              </a>
            ) : (
              <Link href={route.href} className="secondary-link">
                {route.action}
              </Link>
            )}
          </article>
        ))}
      </section>

      <section className="resource-operations-grid">
        <section className="section-block">
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
        </section>

        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Formal handoff"
            title="Use the profile as a concise front door into the wider Kelel review flow."
            description="The profile should do three things quickly: establish who Kelel is, show what Kelel covers, and point the reviewer toward the right next proof route."
          />
          <div className="leadership-panel">
            <CompanyProfileDownload />
            <ExecutiveContactCard copy="Use the company profile for introductions, procurement conversations, partnership outreach, and early-stage project discussions." />
          </div>
        </section>
      </section>

      <section className="resource-bottom-grid">
        <section className="section-block">
          <SectionIntro
            eyebrow="Core service lines"
            title="The profile focuses on the solution areas that matter most in an early formal review."
            description="These are the first service themes the profile should communicate clearly before the conversation branches into case studies, sectors, or a scoped proposal."
          />
          <div className="resource-grid compact-grid">
            {coreServiceLines.map((service) => (
              <article key={service.title} className="resource-card">
                <span className="project-type">Service line</span>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Review confidence"
            title="A smaller set of signals makes the company profile easier to trust quickly."
            description="These operating markers are the confidence layer behind the profile: enough to support a serious first review without overwhelming the page."
          />
          <div className="highlight-grid">
            {topReadinessSignals.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <div className="pillars-list">
            {topAssurancePoints.map((item) => (
              <article key={item}>
                <strong>{item}</strong>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="resource-bottom-grid">
        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Featured proof"
            title="A few strong proof routes work better here than a long list of equal-weight pages."
            description="After the formal company profile, these are the most useful case-study paths to keep the review moving into delivery examples and business outcomes."
          />
          <div className="resource-grid compact-grid">
            {featuredProjects.map((project) => (
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

        <section className="section-block">
          <SectionIntro
            eyebrow="Browser preview"
            title="The strongest profile pages are visible directly on the website too."
            description="This gives reviewers a quick proof layer in-browser before they commit to downloading and circulating the PDF."
          />
          <ProofGallery />
        </section>
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Next review routes"
          title="Move from the company profile into the right next review path."
          description="Some reviewers need formal trust signals, some need curated resources, and some are already ready to discuss a platform or dashboard scope."
        />
        <div className="resource-command-grid compact">
          {profileRoutes.slice(1).map((route) => (
            <article key={route.title} className="section-block resource-command-card">
              <span className="project-type">{route.eyebrow}</span>
              <h3>{route.title}</h3>
              <p>{route.copy}</p>
              <Link href={route.href} className="secondary-link">
                {route.action}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <PlatformCtaPanel
        title="Need the platform side of Kelel's offer, not only the general company profile?"
        copy="If the review is leaning toward dashboards, workflow systems, portals, or reporting visibility, this is now a direct route into the right structured platform brief."
      />

      <MovingMediaStrip
        eyebrow="Profile visuals"
        title="The company profile now carries more movement and more software-focused proof visuals."
        description="These moving cards make the profile feel more active, more digital, and more aligned with a modern IT solutions presentation."
        items={profileVisuals}
      />
    </main>
  );
}
