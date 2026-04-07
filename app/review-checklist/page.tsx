import { CompanyProfileDownload } from "@/components/company-profile-download";
import { EvidenceRegister } from "@/components/evidence-register";
import { ExecutiveContactCard } from "@/components/executive-contact-card";
import { SectionIntro } from "@/components/section-intro";
import type { Metadata } from "next";
import Link from "next/link";
import { reviewChecklist } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Review Checklist | Kelel IT Solution",
  description:
    "Use a structured checklist to review Kelel IT Solution's company profile, trust materials, case studies, and readiness assets.",
};

export default function ReviewChecklistPage() {
  return (
    <main className="page-shell">
      <section className="section-block page-hero">
        <SectionIntro
          eyebrow="Review checklist"
          title="A simple checklist for buyers, partners, and internal reviewers."
          description="This page gives a practical order for reviewing Kelel's formal materials, trust signals, capability pages, and next proof needs."
        />
        <div className="profile-page-actions">
          <Link href="/resources" className="secondary-link">
            Back to resources
          </Link>
          <Link href="/contact" className="primary-link">
            Contact Kelel
          </Link>
        </div>
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Checklist"
          title="Use this sequence to review the business properly."
          narrow
        />
        <div className="checklist-grid">
          {reviewChecklist.map((group) => (
            <article key={group.title} className="checklist-card">
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
          narrow
        />
        <EvidenceRegister />
      </section>

      <section className="sector-layout">
        <CompanyProfileDownload copy="Start the checklist with the company profile when someone needs one formal document first." />
        <ExecutiveContactCard
          compact
          title="Review coordination"
          copy="If a reviewer needs clarification during the checklist process, Kelel provides direct executive contact for faster coordination."
        />
      </section>
    </main>
  );
}
