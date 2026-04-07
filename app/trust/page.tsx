import { CompanyProfileDownload } from "@/components/company-profile-download";
import { EvidenceRegister } from "@/components/evidence-register";
import { ExecutiveContactCard } from "@/components/executive-contact-card";
import { MovingMediaStrip } from "@/components/moving-media-strip";
import { PlatformCtaPanel } from "@/components/platform-cta-panel";
import { ProofGallery } from "@/components/proof-gallery";
import { ProofReadinessWall } from "@/components/proof-readiness-wall";
import { SectionIntro } from "@/components/section-intro";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  complianceReadiness,
  futureCredentials,
  trustCredentials,
  trustFAQs,
} from "@/lib/site-content";

const trustVisuals = [
  {
    title: "Formal review materials with stronger digital presentation",
    label: "Review assets",
    description:
      "Trust feels stronger when business documents, dashboards, and profile pages are part of the visual story.",
    image: "/proof/company-profile-page-1.png",
    alt: "Formal review and dashboard proof visual",
  },
  {
    title: "Leadership and decision-ready review context",
    label: "Leadership review",
    description:
      "Executive-style visuals reinforce accountability, procurement readiness, and formal communication.",
    image: "/media/hero-businessman-tablet.jpg",
    alt: "Executive reviewing trust and profile materials",
  },
  {
    title: "Team review and procurement conversations",
    label: "Procurement support",
    description:
      "Collaborative review images help the trust page feel more like a serious business review space.",
    image: "/media/team-tablet-meeting.jpg",
    alt: "Team reviewing materials together",
  },
];

const trustRoutes = [
  {
    eyebrow: "Formal profile",
    title: "Open the company profile",
    copy:
      "Best for introductions, executive review, and procurement conversations that need a formal company document first.",
    href: "/company-profile",
    actionLabel: "View company profile",
  },
  {
    eyebrow: "Review pack",
    title: "Use the review pack",
    copy:
      "Best for broader business review when someone needs trust, proof, and next-step routes in one cleaner summary.",
    href: "/review-pack",
    actionLabel: "Open review pack",
  },
  {
    eyebrow: "Resource center",
    title: "Move into full review materials",
    copy:
      "Best when a buyer or partner wants to explore case studies, sector pages, and the wider review path in more detail.",
    href: "/resources",
    actionLabel: "Open resources",
  },
];

export const metadata: Metadata = {
  title: "Trust | Kelel IT Solution",
  description:
    "Review trust signals, company profile readiness, inquiry handling, and formal credibility structure for Kelel IT Solution.",
};

export default function TrustPage() {
  return (
    <main className="page-shell home-page-shell resource-page-shell">
      <section className="section-block page-hero visual-page-hero resource-command-hero">
        <div className="visual-page-hero-copy">
          <SectionIntro
            eyebrow="Trust and assurance"
            title="A stronger company website should make trust visible, not assumed."
            description="This page now works as a curated assurance hub: the clearest trust signals first, the strongest proof routes second, and the future-proofing story after that."
          />
          <div className="hero-actions">
            <Link href="/company-profile" className="primary-link">
              View company profile
            </Link>
            <Link href="/review-pack" className="secondary-link">
              Open review pack
            </Link>
            <Link href="/resources" className="secondary-link">
              Open resources
            </Link>
          </div>
          <div className="resource-command-metrics">
            <article className="resource-command-metric">
              <span>Trust signals</span>
              <strong>{trustCredentials.length}</strong>
              <p>Current credibility markers already visible on the site.</p>
            </article>
            <article className="resource-command-metric">
              <span>Readiness points</span>
              <strong>{complianceReadiness.length}</strong>
              <p>Operational signals that help buyers feel the business is reachable and prepared.</p>
            </article>
            <article className="resource-command-metric">
              <span>Future proof areas</span>
              <strong>{futureCredentials.length}</strong>
              <p>Places reserved for certificates, references, badges, and governance assets.</p>
            </article>
            <article className="resource-command-metric">
              <span>Asset priorities</span>
              <strong>4</strong>
              <p>Real visuals and documents still needed to complete the trust story authentically.</p>
            </article>
          </div>
        </div>
        <div className="visual-page-hero-media">
          <Image
            src="/media/team-tablet-meeting.jpg"
            alt="Professional team meeting around a tablet"
            width={1600}
            height={1067}
            className="visual-page-hero-image"
            priority
          />
        </div>
      </section>

      <section className="resource-command-grid">
        {trustRoutes.map((item, index) => (
          <article
            key={item.title}
            className={`section-block resource-command-card ${
              index === 0 ? "resource-command-card-featured" : ""
            }`}
          >
            <span className="project-type">{item.eyebrow}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
            <Link href={item.href} className="secondary-link">
              {item.actionLabel}
            </Link>
          </article>
        ))}
      </section>

      <section className="resource-operations-grid">
        <section className="section-block">
          <SectionIntro
            eyebrow="Current trust signals"
            title="What Kelel can already show today."
            description="These are the clearest visible trust markers already available without waiting on future third-party documents."
          />
          <div className="highlight-grid">
            {trustCredentials.map((item, index) => (
              <article
                key={item.title}
                className={index === 0 ? "highlight-card-featured" : ""}
              >
                <div className="resource-card-topline">
                  <span className="status-pill status-contacted">{item.status}</span>
                  <span className="project-type">
                    {index === 0 ? "Primary trust signal" : "Current signal"}
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <p className="resource-note">
                  {index === 0
                    ? "This is one of the strongest visible trust markers on the public site today."
                    : "Supports the overall assurance story during early review and qualification."}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Readiness"
            title="Operational and presentation readiness points that improve buyer confidence."
            description="These items make the assurance story more practical by showing that Kelel is organized for review, contact, and next-step follow-up."
          />
          <div className="pillars-list">
            {complianceReadiness.map((item) => (
              <article key={item}>
                <strong>{item}</strong>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Evidence register"
          title="The trust story is stronger when current and pending proof are separated clearly."
          description="This register shows what Kelel can already share now and which third-party materials are simply waiting on external documents or approvals."
        />
        <EvidenceRegister />
      </section>

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="Formal proof"
          title="The strongest trust materials are now visible directly inside the website too."
          description="The company profile preview gives visitors something more substantial than marketing copy while Kelel continues adding external proof assets."
        />
        <ProofGallery />
      </section>

      <PlatformCtaPanel
        title="Reviewing Kelel for a dashboard, workflow, portal, or reporting initiative?"
        copy="If the trust review is already pointing toward a real systems discussion, this is the clearest route into a more structured platform brief."
      />

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="Prepared next"
          title="The page is also ready to carry stronger third-party proof when available."
          description="These are the next classes of trust assets that can be added without redesigning the page."
        />
        <div className="highlight-grid">
          {futureCredentials.map((item, index) => (
            <article key={item.title} className={index === 0 ? "highlight-card-featured" : ""}>
              <div className="resource-card-topline">
                <span className="project-type">Prepared next</span>
                <span className="status-pill status-upcoming">Pending proof</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <p className="resource-note">
                Reserved so Kelel can add stronger third-party proof without redesigning this page.
              </p>
            </article>
          ))}
        </div>
      </section>

      <MovingMediaStrip
        eyebrow="Trust visuals"
        title="Trust improves when formal proof, review materials, and executive context keep moving through the page."
        description="This moving strip reinforces profile pages, digital documents, leadership review, and procurement-style evaluation without overwhelming the page structure."
        items={trustVisuals}
      />

      <section className="resource-bottom-grid">
        <section className="section-block">
          <ProofReadinessWall
            title="The next trust upgrade is replacing temporary imagery with original Kelel proof assets."
            description="This keeps the asset-replacement plan visible while giving it less weight than the current trust signals and formal proof routes."
          />
        </section>

        <section className="section-block">
          <SectionIntro
            eyebrow="Questions"
            title="How this page supports buyer confidence."
            description="These quick answers help reviewers understand why the page exists and what it gives them before the first serious conversation."
          />
          <div className="faq-list">
            {trustFAQs.map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
          <div className="leadership-panel">
            <CompanyProfileDownload copy="Use the company profile for introductions, procurement conversations, and business review before a meeting or proposal." />
            <ExecutiveContactCard
              compact
              title="Official contact"
              copy="For formal communication, project discussions, and partner conversations, Kelel provides a visible executive contact instead of anonymous inquiry routing."
            />
          </div>
        </section>
      </section>
    </main>
  );
}
