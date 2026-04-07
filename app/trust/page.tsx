import { CompanyProfileDownload } from "@/components/company-profile-download";
import { EvidenceRegister } from "@/components/evidence-register";
import { ExecutiveContactCard } from "@/components/executive-contact-card";
import { ProofGallery } from "@/components/proof-gallery";
import { SectionIntro } from "@/components/section-intro";
import type { Metadata } from "next";
import Link from "next/link";
import {
  complianceReadiness,
  futureCredentials,
  trustCredentials,
  trustFAQs,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Trust | Kelel IT Solution",
  description:
    "Review trust signals, company profile readiness, inquiry handling, and formal credibility structure for Kelel IT Solution.",
};

export default function TrustPage() {
  return (
    <main className="page-shell">
      <section className="section-block page-hero">
        <SectionIntro
          eyebrow="Trust and assurance"
          title="A stronger company website should make trust visible, not assumed."
          description="This page brings together the business signals, formal documents, delivery readiness, and future credential space that help Kelel look more accountable and procurement-ready."
        />
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Current trust signals"
          title="What Kelel can already show today."
          narrow
        />
        <div className="highlight-grid">
          {trustCredentials.map((item) => (
            <article key={item.title}>
              <span className="status-pill status-contacted">{item.status}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="Readiness"
          title="Operational and presentation readiness points that improve buyer confidence."
          narrow
        />
        <div className="pillars-list">
          {complianceReadiness.map((item) => (
            <article key={item}>
              <strong>{item}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Evidence register"
          title="The trust story is stronger when current and pending proof are separated clearly."
          description="This register shows what Kelel can already share now and which third-party materials are simply waiting on external documents or approvals."
        />
        <EvidenceRegister />
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Formal assets"
          title="The strongest trust materials are now visible directly inside the website too."
          description="The company profile preview gives visitors something more substantial than marketing copy while Kelel continues adding external proof assets."
        />
        <ProofGallery />
      </section>

      <section className="sector-layout">
        <CompanyProfileDownload copy="Use the company profile for introductions, procurement conversations, and business review before a meeting or proposal." />
        <ExecutiveContactCard
          compact
          title="Official contact"
          copy="For formal communication, project discussions, and partner conversations, Kelel provides a visible executive contact instead of anonymous inquiry routing."
        />
      </section>

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="Prepared next"
          title="The page is also ready to carry stronger third-party proof when available."
          narrow
        />
        <div className="highlight-grid">
          {futureCredentials.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Questions"
          title="How this page supports buyer confidence."
          narrow
        />
        <div className="faq-list">
          {trustFAQs.map((item) => (
            <article key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block contact-panel">
        <SectionIntro
          eyebrow="Need formal review material?"
          title="Kelel can now support a more serious first conversation with visible trust signals already in place."
          narrow
        />
        <div className="contact-panel-stack">
          <Link href="/resources" className="secondary-link">
            Open resource center
          </Link>
          <Link href="/company-profile" className="secondary-link">
            View company profile
          </Link>
          <Link href="/contact" className="primary-link">
            Contact Kelel
          </Link>
        </div>
      </section>
    </main>
  );
}
