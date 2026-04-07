import { CompanyProfileDownload } from "@/components/company-profile-download";
import { ContactForm } from "@/components/contact-form";
import { ExecutiveContactCard } from "@/components/executive-contact-card";
import { MovingMediaStrip } from "@/components/moving-media-strip";
import { SectionIntro } from "@/components/section-intro";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  platformDeliveryModels,
  platformNextRoutes,
  responseCommitments,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Request Proposal | Kelel IT Solution",
  description:
    "Submit a more formal proposal request to Kelel IT Solution for websites, systems, infrastructure, or advisory support.",
};

const proposalPrompt = `Organization overview:
Project or support need:
Desired outcome:
Expected timeline:
Budget range or approval stage:
Key decision-makers:
`;

const proposalVisuals = [
  {
    title: "Executive review of software and project proposals",
    label: "Commercial review",
    description:
      "Proposal pages feel stronger when the visual language supports serious platform, systems, and delivery decisions.",
    image: "/media/hero-businessman-tablet.jpg",
    alt: "Executive reviewing a proposal on a tablet",
  },
  {
    title: "Structured planning for delivery scope and approvals",
    label: "Planning sessions",
    description:
      "Review visuals reinforce internal alignment, procurement flow, and structured project planning.",
    image: "/media/team-tablet-meeting.jpg",
    alt: "Team discussing proposal and scope details",
  },
  {
    title: "Operational support behind implementation requests",
    label: "Delivery readiness",
    description:
      "Support and implementation imagery helps proposal requests feel grounded in real delivery capability.",
    image: "/media/it-support-team.jpg",
    alt: "IT delivery team collaborating on implementation work",
  },
];

const proposalPresets = {
  dashboard: {
    label: "Dashboard request",
    service: "Dashboard or web app",
    intro:
      "We need a management dashboard or reporting view that gives leadership clearer visibility into operations, performance, and follow-up.",
    timeline: "Suggested timeline: ________",
    budget: "Expected budget range: ________",
    decision: "Current decision stage: ________",
  },
  workflow: {
    label: "Workflow system request",
    service: "Workflow system",
    intro:
      "We need a workflow system that helps our team move work through a more structured, trackable, and accountable process.",
    timeline: "Suggested timeline: ________",
    budget: "Expected budget range: ________",
    decision: "Current decision stage: ________",
  },
  portal: {
    label: "Portal request",
    service: "Business portal",
    intro:
      "We need a portal for staff, partners, or customers so people can access information and complete tasks through a clearer digital experience.",
    timeline: "Suggested timeline: ________",
    budget: "Expected budget range: ________",
    decision: "Current decision stage: ________",
  },
  reporting: {
    label: "Reporting system request",
    service: "Reporting and visibility system",
    intro:
      "We need stronger reporting and operational visibility so decision-makers can review reliable information without depending on manual updates.",
    timeline: "Suggested timeline: ________",
    budget: "Expected budget range: ________",
    decision: "Current decision stage: ________",
  },
} as const;

type ProposalPresetKey = keyof typeof proposalPresets;

function isProposalPresetKey(value: string): value is ProposalPresetKey {
  return value in proposalPresets;
}

function buildProposalPrompt(focus?: ProposalPresetKey) {
  if (!focus) {
    return proposalPrompt;
  }

  const preset = proposalPresets[focus];

  return `${preset.intro}

Organization overview:
Current tools or process gaps:
Desired business outcome:
${preset.timeline}
${preset.budget}
${preset.decision}
Key decision-makers:
`;
}

type RequestProposalPageProps = {
  searchParams?: Promise<{
    focus?: string;
    source?: string;
  }>;
};

export default async function RequestProposalPage({
  searchParams,
}: RequestProposalPageProps) {
  const resolvedSearchParams = await searchParams;
  const requestedFocus = resolvedSearchParams?.focus?.toLowerCase();
  const sourcePage = resolvedSearchParams?.source?.trim() || "request-proposal-page";
  const focusKey =
    requestedFocus && isProposalPresetKey(requestedFocus) ? requestedFocus : undefined;
  const selectedFocus = focusKey ? proposalPresets[focusKey] : null;

  const proposalStats = [
    {
      label: "Brief type",
      value: selectedFocus ? selectedFocus.label : "General proposal",
      note: "The proposal route can be general or pre-structured around a specific platform need.",
    },
    {
      label: "Submission path",
      value: "Protected inbox",
      note: "Requests flow into the same tracked lead workflow with status, notes, ownership, and follow-up.",
    },
    {
      label: "Supporting files",
      value: "PDF, JPG, PNG, WEBP, DOCX",
      note: "Proposal requests can include supporting documents and screenshots up to 5 MB each.",
    },
    {
      label: "Source tracking",
      value: sourcePage,
      note: "The request records where it started so Kelel can see which route produced the lead.",
    },
  ];

  const topCommitments = responseCommitments.slice(0, 3);
  const nextRoutes = platformNextRoutes.slice(0, 3);

  return (
    <main className="page-shell home-page-shell resource-page-shell">
      <section className="section-block page-hero visual-page-hero resource-command-hero">
        <div className="visual-page-hero-copy">
          <SectionIntro
            eyebrow="Request proposal"
            title={
              selectedFocus
                ? `Start a ${selectedFocus.label.toLowerCase()} with a clearer and more structured brief.`
                : "Move from browsing to a more formal project or support request."
            }
            description={
              selectedFocus
                ? `This route is pre-structured for ${selectedFocus.label.toLowerCase()} conversations, so your team can send a clearer commercial and delivery brief from the start.`
                : "This page is designed for organizations that already reviewed Kelel's materials and want to submit a more structured proposal request."
            }
          />
          <div className="hero-actions">
            <Link href="/resources" className="secondary-link">
              Back to resources
            </Link>
            <Link href="/review-pack" className="secondary-link">
              Review pack
            </Link>
            <Link href="/contact" className="primary-link">
              Standard contact page
            </Link>
          </div>
          <div className="resource-command-metrics">
            {proposalStats.map((item) => (
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
            alt="Professional reviewing project details on a tablet"
            width={1600}
            height={1067}
            className="visual-page-hero-image"
            priority
          />
        </div>
      </section>

      <section className="resource-bottom-grid">
        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="What to include"
            title="A stronger proposal request gives Kelel enough detail to respond clearly and quickly."
            description="The aim is to make commercial review, delivery discussion, and internal follow-up easier from the start."
          />
          {selectedFocus ? (
            <p className="section-copy">
              <strong>Selected request type:</strong> {selectedFocus.label}
            </p>
          ) : null}
          <div className="highlight-grid">
            <article>
              <h3>Business context</h3>
              <p>What your organization does and what prompted the request right now.</p>
            </article>
            <article>
              <h3>Scope and priorities</h3>
              <p>What kind of website, system, support, or advisory work matters most first.</p>
            </article>
            <article>
              <h3>Timeline and approvals</h3>
              <p>When you hope to move and how internal approval or procurement is expected to work.</p>
            </article>
          </div>
        </section>

        <section className="section-block contact-form-panel">
          <SectionIntro
            eyebrow="Proposal brief"
            title="Share the request in a more structured format."
            description={
              selectedFocus
                ? `This brief opens with a pre-filled ${selectedFocus.label.toLowerCase()} structure while using the same working submission flow as the contact page.`
                : "This uses the same working submission flow as the contact page, but starts with a more formal proposal-oriented brief."
            }
          />
          <ContactForm
            initialService={selectedFocus?.service ?? "Proposal request"}
            initialDetails={buildProposalPrompt(focusKey)}
            inquiryType="proposal"
            showProposalFields
            submitLabel="Send proposal request"
            sourcePage={sourcePage}
            requestFocus={focusKey ?? ""}
            helperCopy={
              selectedFocus
                ? `Your ${selectedFocus.label.toLowerCase()} is validated and stored in the same protected lead workflow, and you can attach supporting PDF, image, or DOCX files up to 5 MB each.`
                : "Your proposal request is validated and stored in the same protected lead workflow, and you can attach supporting PDF, image, or DOCX files up to 5 MB each."
            }
          />
        </section>
      </section>

      <section className="resource-bottom-grid">
        <section className="section-block">
          <SectionIntro
            eyebrow="Proposal paths"
            title="Choose the request type that matches your next discussion."
            description="These shortcuts help your team start with a better-structured dashboard, workflow, portal, or reporting brief instead of a blank proposal form."
          />
          <div className="resource-grid compact-grid">
            {Object.entries(proposalPresets).map(([key, preset]) => (
              <article key={key} className="resource-card">
                <span className="project-type">Platform request</span>
                <h3>{preset.label}</h3>
                <p>{preset.intro}</p>
                <Link
                  href={`/request-proposal?focus=${key}&source=request-proposal-page`}
                  className="secondary-link"
                >
                  Use this brief
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Delivery framing"
            title="Many proposal requests are really about dashboards, workflows, portals, or internal systems."
            description="These delivery models help frame the conversation more clearly when the request is about a business platform rather than only a public website."
          />
          <div className="highlight-grid">
            {platformDeliveryModels.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="section-block contrast-panel">
        <MovingMediaStrip
          eyebrow="Proposal and system visuals"
          title="The proposal route now feels more connected to software, systems, and real delivery conversations."
          description="These visuals reinforce commercial review, implementation readiness, digital proof, and structured project planning."
          items={proposalVisuals}
        />
      </section>

      <section className="resource-bottom-grid">
        <section className="section-block">
          <SectionIntro
            eyebrow="What happens next"
            title="The proposal route should also make the follow-up process feel clear."
            description="These points explain what a stronger proposal path is supposed to achieve once a request is submitted."
          />
          <div className="highlight-grid">
            {topCommitments.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Formal handoff"
            title="Some proposal requests need supporting company material as part of the internal review."
            description="Use the company profile and these next routes when the request needs formal circulation before a live conversation."
          />
          <div className="leadership-panel">
            <ExecutiveContactCard
              compact
              title="Proposal contact"
              copy="Use this route for more formal commercial, procurement, and delivery-scoping conversations."
            />
            <CompanyProfileDownload copy="Pair the proposal request with the company profile when you need to circulate Kelel's formal overview internally before the next meeting." />
          </div>
        </section>
      </section>

      <section className="resource-bottom-grid">
        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Next routes"
            title="Move from the proposal page into the right supporting review path."
            description="These routes help a buyer compare fit, inspect proof, or continue into formal company review without losing momentum."
          />
          <div className="resource-grid compact-grid">
            {nextRoutes.map((item) => (
              <article key={item.title} className="resource-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link href={item.href} className="secondary-link">
                  {item.actionLabel}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block contact-panel">
          <SectionIntro
            eyebrow="Need another route?"
            title="You can still use standard contact if your team is not ready for a full proposal brief."
            narrow
          />
          <div className="contact-panel-stack">
            <Link href="/contact" className="secondary-link">
              Open contact page
            </Link>
            <Link href="/resources" className="primary-link">
              Review resources
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
