import { ExecutiveContactCard } from "@/components/executive-contact-card";
import type { Metadata } from "next";
import Link from "next/link";
import { SectionIntro } from "@/components/section-intro";
import {
  assurancePoints,
  engagementModes,
  industries,
  pillars,
  process,
  readinessSignals,
  services,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Services | Kelel IT Solution",
  description:
    "Explore managed IT support, infrastructure, software systems, and advisory solutions from Kelel IT Solution.",
};

export default function ServicesPage() {
  return (
    <main className="page-shell">
      <section className="section-block page-hero">
        <SectionIntro
          eyebrow="Services"
          title="Service lines shaped around how organizations usually buy IT support and digital solutions."
          description="The site now groups Kelel's offer into clearer categories so buyers can understand where the company fits before making contact."
        />
      </section>

      <section className="section-block">
        <div className="service-grid">
          {services.map((service) => (
            <article key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <ul className="service-bullets">
                {service.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block process-layout">
        <SectionIntro
          eyebrow="How we work"
          title="A process designed to keep scope, accountability, and implementation quality visible."
          narrow
        />
        <div className="process-list">
          {process.map((step, index) => (
            <article key={step}>
              <span>0{index + 1}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="What this structure improves"
          title="Why this solutions page is stronger than the original generic service listing."
          narrow
        />
        <div className="pillars-list">
          {pillars.map((pillar) => (
            <article key={pillar}>
              <strong>{pillar}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Sector fit"
          title="The kinds of clients this site now speaks to more clearly."
          narrow
        />
        <div className="pillars-list">
          {industries.map((industry) => (
            <article key={industry}>
              <strong>{industry}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Engagement models"
          title="The solutions page should also explain how organizations can work with Kelel."
          narrow
        />
        <div className="highlight-grid">
          {engagementModes.map((mode) => (
            <article key={mode.title}>
              <h3>{mode.title}</h3>
              <p>{mode.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="Readiness"
          title="A stronger IT company profile should show operational readiness, not only service promises."
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

      <section className="section-block">
        <SectionIntro
          eyebrow="Assurance"
          title="What this site can now demonstrate before the first meeting even starts."
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
          eyebrow="Need a proposal?"
          title="Tell Kelel what support, system, or website your organization needs."
          narrow
        />
        <div className="contact-panel-stack">
          <ExecutiveContactCard compact />
          <Link href="/contact" className="primary-link">
            Contact Kelel
          </Link>
        </div>
      </section>
    </main>
  );
}
