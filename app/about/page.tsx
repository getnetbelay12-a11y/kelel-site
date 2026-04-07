import { CompanyProfileDownload } from "@/components/company-profile-download";
import { ExecutiveContactCard } from "@/components/executive-contact-card";
import { MovingMediaStrip } from "@/components/moving-media-strip";
import { PlatformCtaPanel } from "@/components/platform-cta-panel";
import { SectionIntro } from "@/components/section-intro";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  assurancePoints,
  readinessSignals,
  site,
  strengths,
} from "@/lib/site-content";

const aboutVisuals = [
  {
    title: "Leadership and systems thinking together",
    label: "Company direction",
    description:
      "The company story feels more connected to real leadership, planning, and business technology direction.",
    image: "/media/hero-businessman-tablet.jpg",
    alt: "Business leader reviewing systems work on a tablet",
  },
  {
    title: "Operational teams behind support and delivery",
    label: "Operations",
    description:
      "About pages feel stronger when support, implementation, and coordination look visible and real.",
    image: "/media/it-support-team.jpg",
    alt: "Operations and support team working together",
  },
  {
    title: "Collaborative workshops around software and scope",
    label: "Solution design",
    description:
      "Planning visuals reinforce the idea that Kelel works through business and systems problems with clients directly.",
    image: "/media/team-tablet-meeting.jpg",
    alt: "Team planning software or systems work together",
  },
];

export const metadata: Metadata = {
  title: "About | Kelel IT Solution",
  description:
    "Learn how Kelel IT Solution approaches IT services, systems delivery, and business-focused digital transformation support.",
};

export default function AboutPage() {
  const aboutStats = [
    {
      label: "Company name",
      value: site.name,
      note: "A business profile centered on systems, software platforms, and operational improvement.",
    },
    {
      label: "Executive contact",
      value: site.contactPerson,
      note: `${site.contactRole} visible on the public site for direct business communication.`,
    },
    {
      label: "Business email",
      value: site.email,
      note: "Formal outreach route for partnership, project, and review conversations.",
    },
    {
      label: "Business base",
      value: site.location,
      note: "Serving organizations that need stronger systems and clearer digital operations.",
    },
  ];

  const topStrengths = strengths.slice(0, 4);
  const topReadinessSignals = readinessSignals.slice(0, 3);
  const topAssurancePoints = assurancePoints.slice(0, 4);

  return (
    <main className="page-shell home-page-shell resource-page-shell">
      <section className="section-block page-hero visual-page-hero resource-command-hero">
        <div className="visual-page-hero-copy">
          <SectionIntro
            eyebrow="About Kelel"
            title="A clearer company profile for organizations that need dependable IT support, stronger systems, and more credible digital operations."
            description="This page now works as a tighter company overview: who Kelel is, how the business thinks about delivery, and why the company is positioned for serious operational and digital work."
          />
          <div className="hero-actions">
            <Link href="/trust" className="secondary-link">
              Review trust page
            </Link>
            <Link href="/company-profile" className="secondary-link">
              Open company profile
            </Link>
            <Link href="/contact" className="primary-link">
              Contact leadership
            </Link>
          </div>
          <div className="resource-command-metrics">
            {aboutStats.map((item) => (
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
            alt="Business leader reviewing work on a tablet"
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
            eyebrow="Company point of view"
            title="Kelel is positioned around practical business technology, not generic digital language."
            description="The company story is built around the idea that technology should make work more reliable, more visible, and easier to scale across operations, infrastructure, and software systems."
          />
          <div className="highlight-grid">
            <article className="highlight-card-featured">
              <span className="project-type">Company stance</span>
              <h3>What Kelel stands for</h3>
              <p>
                Technology should improve operational reliability, information visibility,
                and the ability of a business to scale without depending on weak manual
                processes.
              </p>
              <p className="resource-note">
                This is the clearest summary of how the company is positioned.
              </p>
            </article>
            <article>
              <span className="project-type">Business communication</span>
              <h3>How Kelel communicates</h3>
              <p>
                Serious B2B buyers expect visible accountability, which is why leadership
                contact and direct business channels are presented clearly across the site.
              </p>
              <p className="resource-note">Supports executive visibility and direct business confidence.</p>
            </article>
            <article>
              <span className="project-type">Capability framing</span>
              <h3>How the company is framed</h3>
              <p>
                Kelel is presented as a company that can support infrastructure, digital
                presence, dashboards, portals, workflows, and broader operational
                improvement.
              </p>
              <p className="resource-note">Connects the company story to the visible capability system.</p>
            </article>
          </div>
        </section>

        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Leadership handoff"
            title="The company page should also act as a formal handoff into direct business contact."
            description="These two cards keep the company story anchored in named leadership visibility and a formal document route."
          />
          <div className="leadership-panel">
            <ExecutiveContactCard copy="For business discussions, official communication, and next-step conversations with prospective clients." />
            <CompanyProfileDownload copy="Share the Kelel company profile as a formal overview of services, operating readiness, and executive contact details." />
          </div>
        </section>
      </section>

      <section className="section-block contrast-panel">
        <MovingMediaStrip
          eyebrow="Company and systems visuals"
          title="The company story now carries more movement and more software-and-operations context."
          description="These visuals help the About page feel more like the profile of a real IT and systems company, not only a text explanation."
          items={aboutVisuals}
        />
      </section>

      <section className="resource-bottom-grid">
        <section className="section-block">
          <SectionIntro
            eyebrow="Why buyers choose Kelel"
            title="A clearer company page helps clients understand what makes the business useful in practice."
            description="These strengths explain how Kelel is positioned for trust, clarity, and more serious business conversations."
          />
          <div className="highlight-grid">
            {topStrengths.map((item, index) => (
              <article key={item.title} className={index === 0 ? "highlight-card-featured" : ""}>
                <span className="project-type">{index === 0 ? "Primary strength" : "Strength"}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <p className="resource-note">
                  {index === 0
                    ? "One of the clearest reasons a buyer should take the company seriously."
                    : "Adds practical support to the wider company profile and review story."}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Operating confidence"
            title="A credible company profile should show readiness, not only describe services."
            description="These signals help explain why Kelel appears more accountable and more prepared for formal review or direct engagement."
          />
          <div className="highlight-grid">
            {topReadinessSignals.map((item, index) => (
              <article key={item.title} className={index === 0 ? "highlight-card-featured" : ""}>
                <span className="project-type">{index === 0 ? "Confidence signal" : "Readiness signal"}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <p className="resource-note">
                  {index === 0
                    ? "A strong visible cue that the business is ready for formal discussion."
                    : "Supports the case that Kelel is organized and reachable."}
                </p>
              </article>
            ))}
          </div>
          <div className="pillars-list compact">
            {topAssurancePoints.map((item) => (
              <article key={item}>
                <strong>{item}</strong>
              </article>
            ))}
          </div>
        </section>
      </section>

      <PlatformCtaPanel
        title="Exploring Kelel because your organization needs stronger platforms or internal systems?"
        copy="The company story now routes more clearly into structured dashboard, workflow, portal, and reporting briefs when the conversation is moving beyond a general company review."
      />

      <section className="resource-bottom-grid">
        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Next review routes"
            title="Move from company review into the right next page."
            description="Some visitors need trust materials, some need a formal company profile, and some are ready for direct contact or a proposal path."
          />
          <div className="hero-actions">
            <Link href="/trust" className="secondary-link">
              Review trust page
            </Link>
            <Link href="/company-profile" className="secondary-link">
              Open company profile
            </Link>
            <Link href="/contact" className="primary-link">
              Contact Kelel
            </Link>
          </div>
        </section>

        <section className="section-block contact-panel">
          <SectionIntro
            eyebrow="Let us talk"
            title="If your organization needs stronger systems, support, or digital presence, Kelel is ready to talk."
            narrow
          />
          <div className="contact-panel-stack">
            <Link href="/resources" className="secondary-link">
              Open resources
            </Link>
            <Link href="/contact" className="primary-link">
              Contact us
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
