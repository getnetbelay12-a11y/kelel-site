import { BrandShowcase } from "@/components/brand-showcase";
import { CompanyProfileDownload } from "@/components/company-profile-download";
import { ExecutiveContactCard } from "@/components/executive-contact-card";
import type { Metadata } from "next";
import Link from "next/link";
import { SectionIntro } from "@/components/section-intro";
import { assurancePoints, readinessSignals, strengths } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About | Kelel IT Solution",
  description:
    "Learn how Kelel IT Solution approaches IT services, systems delivery, and business-focused digital transformation support.",
};

export default function AboutPage() {
  return (
    <main className="page-shell">
      <section className="section-block page-hero">
        <SectionIntro
          eyebrow="About us"
          title="Kelel IT Solution is positioned to help organizations improve operations, infrastructure, and digital systems with more clarity."
          description="The company profile now emphasizes IT capability, business alignment, and accountable communication instead of staying at the level of generic design language."
        />
      </section>

      <section className="section-block story-layout">
        <article className="story-copy">
          <h3>What we stand for</h3>
          <p>
            Technology should make work more reliable, more visible, and easier
            to scale. That applies to infrastructure, internal systems, and the
            public digital presence clients use to judge your organization.
          </p>
        </article>
        <article className="story-copy">
          <h3>How we communicate</h3>
          <p>
            Kelel&apos;s website now puts leadership contact up front because serious
            B2B buyers look for accountability. Getnet Amdu Belay is listed as the
            public contact to make outreach feel direct and credible.
          </p>
        </article>
      </section>

      <section className="section-block contrast-panel">
        <BrandShowcase
          title="A clearer company profile feels more trustworthy when the real Kelel identity is visible throughout it."
          description="The About page now carries the actual Kelel brand presentation so visitors see a company identity, not only descriptive text about services."
        />
      </section>

      <section className="section-block leadership-panel">
        <SectionIntro
          eyebrow="Leadership contact"
          title="Visible leadership improves trust, especially for B2B and IT services buyers."
          narrow
        />
        <ExecutiveContactCard copy="For business discussions, official communication, and next-step conversations with prospective clients." />
        <CompanyProfileDownload copy="Share the branded Kelel company profile as a formal overview of services, operating readiness, and executive contact details." />
      </section>

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="Why clients choose us"
          title="A stronger company profile helps clients understand how Kelel works and why that matters."
          narrow
        />
        <div className="strength-grid">
          {strengths.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Operational readiness"
          title="A credible company page should show what makes the business ready to deliver, respond, and grow."
          narrow
        />
        <div className="highlight-grid">
          {readinessSignals.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="Confidence points"
          title="The company story is now backed by clearer operating signals."
          narrow
        />
        <div className="pillars-list">
          {assurancePoints.map((item) => (
            <article key={item}>
              <strong>{item}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block contact-panel">
        <SectionIntro
          eyebrow="Let us talk"
          title="If your organization needs stronger systems, support, or digital presence, Kelel is ready to talk."
          narrow
        />
        <div className="contact-panel-stack">
          <Link href="/trust" className="secondary-link">
            Review trust page
          </Link>
          <Link href="/contact" className="primary-link">
            Contact us
          </Link>
        </div>
      </section>
    </main>
  );
}
