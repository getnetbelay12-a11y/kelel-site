import { CompanyProfileDownload } from "@/components/company-profile-download";
import { EvidenceRegister } from "@/components/evidence-register";
import { ExecutiveContactCard } from "@/components/executive-contact-card";
import { MovingMediaStrip } from "@/components/moving-media-strip";
import { PlatformCtaPanel } from "@/components/platform-cta-panel";
import { SectionIntro } from "@/components/section-intro";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { reviewChecklist } from "@/lib/site-content";

const checklistVisuals = [
  {
    title: "Structured business review with stronger digital context",
    label: "Review workflow",
    description:
      "Checklist pages feel stronger when they show software, planning, and decision support alongside the steps.",
    image: "/proof/company-profile-page-1.png",
    alt: "Business review and dashboard proof image",
  },
  {
    title: "Collaborative review around trust and capability materials",
    label: "Team review",
    description:
      "Meeting visuals help the checklist feel like part of a real buyer and procurement workflow.",
    image: "/media/team-tablet-meeting.jpg",
    alt: "Team reviewing capability and trust materials together",
  },
  {
    title: "Leadership sign-off and decision support",
    label: "Approval context",
    description:
      "Executive-style visuals make the page feel more aligned with serious business review and internal approval.",
    image: "/media/hero-businessman-tablet.jpg",
    alt: "Executive reviewing approval materials on a tablet",
  },
];

export const metadata: Metadata = {
  title: "Review Checklist | Kelel IT Solution",
  description:
    "Use a structured checklist to review Kelel IT Solution's company profile, trust materials, case studies, and readiness assets.",
};

export default function ReviewChecklistPage() {
  const checklistStats = [
    {
      label: "Checklist groups",
      value: String(reviewChecklist.length),
      note: "A structured order for reviewing identity, trust, capability, and next proof needs.",
    },
    {
      label: "Review use",
      value: "Buyer and partner review",
      note: "Useful for procurement-style circulation, internal alignment, and partner assessment.",
    },
    {
      label: "Best companion",
      value: "Review pack",
      note: "Use the review pack when the checklist needs a more presentation-style handoff.",
    },
    {
      label: "Next step",
      value: "Direct coordination",
      note: "The checklist should make it easier to move into clarification, contact, or proposal discussion.",
    },
  ];

  const topChecklistGroups = reviewChecklist.slice(0, 4);

  return (
    <main className="page-shell home-page-shell resource-page-shell">
      <section className="section-block page-hero visual-page-hero resource-command-hero">
        <div className="visual-page-hero-copy">
          <SectionIntro
            eyebrow="Review checklist"
            title="A clearer checklist for buyers, partners, and internal reviewers."
            description="This page gives a practical order for reviewing Kelel's formal materials, trust signals, capability pages, and next proof needs without forcing reviewers through a long mixed layout."
          />
          <div className="profile-page-actions">
            <Link href="/resources" className="secondary-link">
              Back to resources
            </Link>
            <Link href="/review-pack" className="secondary-link">
              Open review pack
            </Link>
            <Link href="/contact" className="primary-link">
              Contact Kelel
            </Link>
          </div>
          <div className="resource-command-metrics">
            {checklistStats.map((item) => (
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
            alt="Business team reviewing materials together"
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
            eyebrow="Checklist sequence"
            title="Use this sequence to review the business properly."
            description="The checklist is most useful when it stays concise, grouped, and easy to move through during formal review."
          />
          <div className="checklist-grid">
            {topChecklistGroups.map((group, index) => (
              <article
                key={group.title}
                className={`checklist-card ${index === 0 ? "checklist-card-featured" : ""}`}
              >
                <div className="resource-card-topline">
                  <span className="project-type">
                    {index === 0 ? "Recommended first" : "Checklist group"}
                  </span>
                  <span
                    className={`status-pill ${
                      index === 0 ? "status-contacted" : "status-upcoming"
                    }`}
                  >
                    {index === 0 ? "Start here" : "Review next"}
                  </span>
                </div>
                <h3>{group.title}</h3>
                <ul className="service-bullets">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Evidence status"
            title="Use the evidence register to see what is available now versus what is still pending."
            description="This keeps the review honest about what Kelel can share today and what is still prepared for later publication."
          />
          <EvidenceRegister />
        </section>
      </section>

      <section className="section-block contrast-panel">
        <MovingMediaStrip
          eyebrow="Review and system visuals"
          title="The checklist now carries more movement and more software-and-review context."
          description="These visuals reinforce dashboards, review rooms, internal approval, and structured business evaluation."
          items={checklistVisuals}
        />
      </section>

      <section className="resource-bottom-grid">
        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Formal support"
            title="Some reviewers need a formal document and a named contact while they work through the checklist."
            description="These support routes make the checklist easier to use during procurement, partner review, or internal sign-off."
          />
          <div className="leadership-panel">
            <CompanyProfileDownload copy="Start the checklist with the company profile when someone needs one formal document first." />
            <ExecutiveContactCard
              compact
              title="Review coordination"
              copy="If a reviewer needs clarification during the checklist process, Kelel provides direct executive contact for faster coordination."
            />
          </div>
        </section>

        <section className="section-block contact-panel">
          <SectionIntro
            eyebrow="Next route"
            title="Move from checklist review into the right next conversation."
            narrow
          />
          <div className="contact-panel-stack">
            <Link href="/review-pack" className="secondary-link">
              Open review pack
            </Link>
            <Link href="/contact" className="primary-link">
              Contact Kelel
            </Link>
          </div>
        </section>
      </section>

      <PlatformCtaPanel
        title="Has the review already narrowed to a platform, portal, workflow, or reporting need?"
        copy="When the checklist points to a systems discussion, these structured platform brief routes make the next step clearer than a generic contact path."
      />
    </main>
  );
}
