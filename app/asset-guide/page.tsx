import { AssetImpactBoard } from "@/components/asset-impact-board";
import { AssetReplacementPreviewGrid } from "@/components/asset-replacement-preview-grid";
import { CompanyProfileDownload } from "@/components/company-profile-download";
import { ExecutiveContactCard } from "@/components/executive-contact-card";
import { SectionIntro } from "@/components/section-intro";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { assetGuideChecklist, mediaReadinessPlan } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Asset Guide | Kelel IT Solution",
  description:
    "A practical guide to the real Kelel photos, screenshots, certificates, and business visuals needed to complete the website authentically.",
};

export default function AssetGuidePage() {
  const guideStats = [
    {
      label: "Asset groups",
      value: String(assetGuideChecklist.length),
      note: "The main categories of real files the site is already waiting for.",
    },
    {
      label: "Mapped placements",
      value: String(mediaReadinessPlan.length),
      note: "Public website placements already prepared for authentic Kelel assets.",
    },
    {
      label: "Priority files",
      value: "3",
      note: "The first replacements that improve the largest number of pages.",
    },
    {
      label: "Next route",
      value: "Status page",
      note: "Use the live status view to confirm what has arrived and what is still waiting.",
    },
  ];

  return (
    <main className="page-shell home-page-shell resource-page-shell">
      <section className="section-block page-hero visual-page-hero resource-command-hero">
        <div className="visual-page-hero-copy">
          <SectionIntro
            eyebrow="Asset guide"
            title="A practical handoff page for the real Kelel photos, screenshots, and formal proof files needed next."
            description="This page now works more like an asset collection brief: what to gather first, where those files will be used, and how the team should prioritize the first authenticity upgrades."
          />
          <div className="hero-actions">
            <Link href="/resources" className="secondary-link">
              Back to resources
            </Link>
            <Link href="/asset-status" className="secondary-link">
              Asset status
            </Link>
            <Link href="/trust" className="secondary-link">
              Review trust page
            </Link>
            <Link href="/contact" className="primary-link">
              Contact Kelel
            </Link>
          </div>
          <div className="resource-command-metrics">
            {guideStats.map((item) => (
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

      <section className="resource-command-grid compact">
        <article className="section-block resource-command-card">
          <span className="project-type">Priority one</span>
          <h3>Collect the leadership hero image first</h3>
          <p>The first best upgrade is the real leadership-facing image that replaces the homepage and trust-facing placeholder visual.</p>
        </article>
        <article className="section-block resource-command-card">
          <span className="project-type">Priority two</span>
          <h3>Bring in the team review photo</h3>
          <p>This file improves the strongest review, trust, resources, and internal handoff pages where collaborative business visuals matter most.</p>
        </article>
        <article className="section-block resource-command-card">
          <span className="project-type">Priority three</span>
          <h3>Add the delivery and support team image</h3>
          <p>This file upgrades the operational side of Kelel across solutions, work, contact, and capability pages.</p>
        </article>
        <article className="section-block resource-command-card">
          <span className="project-type">Tracking</span>
          <h3>Use the live status page after every upload</h3>
          <p>The asset-status page confirms missing files, approvals, sync readiness, and the latest replacement preview run.</p>
        </article>
      </section>

      <section className="resource-bottom-grid">
        <section className="section-block">
          <SectionIntro
            eyebrow="What to gather"
            title="The main asset groups that will make the site fully authentic."
            description="These are the file types with the highest impact on trust, credibility, and visual identity across the website."
          />
          <div className="checklist-grid">
            {assetGuideChecklist.map((group) => (
              <article key={group.title} className="checklist-card">
                <h3>{group.title}</h3>
                <ul className="service-bullets">
                  {group.specs.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Placement map"
            title="Each real asset type already has a clear place in the website structure."
            description="The next pass can focus on replacement and refinement, not redesign. The public pages are already prepared for real visuals."
          />
          <div className="visual-proof-gallery">
            <article className="visual-proof-card large">
              <Image
                src="/media/hero-businessman-tablet.jpg"
                alt="Executive-style review on a tablet"
                width={1600}
                height={1067}
                className="visual-proof-image"
              />
              <div className="visual-proof-meta">
                <span className="project-type">Leadership and trust</span>
                <strong>Homepage, About, Contact, Company Profile, and Trust all benefit immediately from real executive and office imagery.</strong>
              </div>
            </article>
            <article className="visual-proof-card">
              <Image
                src="/media/it-support-team.jpg"
                alt="Team members collaborating on systems work"
                width={1600}
                height={1067}
                className="visual-proof-image"
              />
              <div className="visual-proof-meta">
                <span className="project-type">Projects and delivery</span>
                <strong>Work, Services, Resources, and proposal pages are ready for real proof and implementation visuals.</strong>
              </div>
            </article>
          </div>
        </section>
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Where each asset belongs"
          title="The current site is already mapped for the real Kelel files."
          description="This keeps the handoff concrete by showing which kinds of real company materials already have a defined place in the public site."
        />
        <div className="resource-grid">
          {mediaReadinessPlan.map((item) => (
            <article key={item.title} className="resource-card">
              <span className="project-type">{item.placement}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block contrast-panel">
        <AssetImpactBoard
          title="Which website areas get the biggest authenticity upgrade first."
          description="This helps the handoff stay practical by showing where each shared temporary visual is still affecting the public site most."
        />
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Recommended order"
          title="Collect these real Kelel files in this order for the fastest visible upgrade."
          description="The most valuable early replacements are the assets used across the largest number of public pages."
        />
        <div className="resource-grid">
          {[
            {
              filename: "kelel-leadership-hero.jpg",
              replaces: "hero-businessman-tablet.jpg",
              impact: "5 key public pages",
              reason:
                "This file upgrades the homepage hero and several leadership-facing pages at once.",
            },
            {
              filename: "kelel-team-review.jpg",
              replaces: "team-tablet-meeting.jpg",
              impact: "5 review-oriented pages",
              reason:
                "This file upgrades the strongest trust, resource, and review pages where collaborative business review visuals matter most.",
            },
            {
              filename: "kelel-delivery-team.jpg",
              replaces: "it-support-team.jpg",
              impact: "5 service and delivery pages",
              reason:
                "This file upgrades the operational side of the site across solutions, capability, work, and contact journeys.",
            },
          ].map((item, index) => (
            <article key={item.filename} className="resource-card">
              <span className="status-pill status-upcoming">priority {index + 1}</span>
              <h3>{item.filename}</h3>
              <p>
                Replaces <strong>{item.replaces}</strong>
              </p>
              <p>{item.reason}</p>
              <p className="resource-note">{item.impact}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="Replacement map"
          title="These are the exact temporary files that should be replaced next."
          description="The current site already uses three shared temporary visuals. Replacing these three files with real Kelel originals will immediately upgrade most of the visible website."
        />
        <p className="section-copy">
          For project handoff, place approved real files in
          {" "}
          <strong>`incoming-assets/`</strong>
          {" "}
          inside the project before the replacement pass.
        </p>
        <AssetReplacementPreviewGrid />
      </section>

      <section className="resource-bottom-grid">
        <section className="section-block">
          <CompanyProfileDownload copy="Use the company profile together with this asset guide when gathering formal materials for the next website proof pass." />
        </section>
        <section className="section-block contrast-panel">
          <ExecutiveContactCard
            compact
            title="Asset coordination"
            copy="Use the visible business contact route to coordinate real photos, screenshots, certificates, and approved materials for the next authenticity pass."
          />
        </section>
      </section>
    </main>
  );
}
