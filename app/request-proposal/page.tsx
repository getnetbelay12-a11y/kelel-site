import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { SectionIntro } from "@/components/section-intro";

type RequestProposalPageProps = {
  searchParams: Promise<{
    focus?: string;
    source?: string;
  }>;
};

const proposalPrompts: Record<string, { title: string; details: string }> = {
  dashboard: {
    title: "Request an architecture proposal",
    details:
      "Tell us about the reporting, control, or workflow system you want to design and deploy.",
  },
  "business-systems": {
    title: "Request a business systems proposal",
    details:
      "Share the operational system, platform, or internal workflow your organization needs next.",
  },
};

export const metadata: Metadata = {
  title: "Request Proposal | Kelel IT Solution",
  description:
    "Request an architecture or systems proposal from Kelel IT Solution for banking, insurance, and enterprise operations.",
};

export default async function RequestProposalPage({ searchParams }: RequestProposalPageProps) {
  const { focus = "dashboard", source = "request-proposal-page" } = await searchParams;
  const prompt = proposalPrompts[focus] ?? proposalPrompts.dashboard;

  return (
    <main className="page-shell">
      <section className="section-block page-hero">
        <SectionIntro
          eyebrow="Proposal request"
          title={prompt.title}
          description="Use this form when you need a clearer proposal for architecture, delivery scope, and the right next system for your business."
        />
        <div className="profile-page-actions">
          <Link href="/#contact" className="secondary-link">
            Back to homepage
          </Link>
          <Link href="/contact" className="primary-link">
            Contact Kelel directly
          </Link>
        </div>
      </section>

      <section className="section-block contact-form-panel">
        <SectionIntro
          eyebrow="Proposal brief"
          title="Tell us what your organization needs."
          description="We use this request to understand scope, shape the right architecture, and respond with a clearer proposal path."
        />
        <ContactForm
          inquiryType="proposal"
          showProposalFields
          submitLabel="Request Proposal"
          helperCopy="We respond within 24-48 hours with the next best step for your request."
          sourcePage={source}
          requestFocus={focus}
          detailsLabel="System requirements"
          detailsPlaceholder={prompt.details}
        />
      </section>
    </main>
  );
}
