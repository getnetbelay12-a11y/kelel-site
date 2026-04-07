import { CompanyProfileDownload } from "@/components/company-profile-download";
import { ContactForm } from "@/components/contact-form";
import { ExecutiveContactCard } from "@/components/executive-contact-card";
import { MovingMediaStrip } from "@/components/moving-media-strip";
import { SectionIntro } from "@/components/section-intro";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { faqs, responseCommitments, site } from "@/lib/site-content";

const contactVisuals = [
  {
    title: "Systems conversations with a more executive-ready tone",
    label: "Leadership contact",
    description:
      "The contact experience now feels more aligned with serious software, platform, and IT discussions.",
    image: "/media/hero-businessman-tablet.jpg",
    alt: "Business leader reviewing digital project details on a tablet",
  },
  {
    title: "Operational follow-up and implementation readiness",
    label: "Response operations",
    description:
      "Support and delivery imagery helps visitors feel there is a real team behind the inquiry and next steps.",
    image: "/media/it-support-team.jpg",
    alt: "IT support team collaborating around a laptop",
  },
  {
    title: "Planning discussions for software and project scope",
    label: "Solution planning",
    description:
      "Tablet and review visuals reinforce workshops, project scoping, and database or system conversations.",
    image: "/media/team-tablet-meeting.jpg",
    alt: "Team planning and reviewing a digital project together",
  },
];

export const metadata: Metadata = {
  title: "Contact | Kelel IT Solution",
  description:
    "Contact Kelel IT Solution to discuss a company website, custom business system, IT support engagement, or a structured platform proposal.",
};

export default function ContactPage() {
  const contactStats = [
    {
      label: "Direct email",
      value: site.email,
      note: "For project requests, introductions, and formal business communication.",
    },
    {
      label: "Direct phone",
      value: site.phone,
      note: "For live discussion about scope, timeline, and next-step coordination.",
    },
    {
      label: "Location",
      value: site.location,
      note: "Serving organizations that need stronger systems and clearer digital operations.",
    },
    {
      label: "Business hours",
      value: site.hours,
      note: "Use business hours for the fastest follow-up and direct coordination.",
    },
  ];

  const topCommitments = responseCommitments.slice(0, 3);
  const topFaqs = faqs.slice(0, 3);

  return (
    <main className="page-shell home-page-shell resource-page-shell">
      <section className="section-block page-hero visual-page-hero resource-command-hero">
        <div className="visual-page-hero-copy">
          <SectionIntro
            eyebrow="Contact"
            title="Start a serious business conversation with a clearer route into proposals, systems discussions, and direct executive contact."
            description="This page now works more like a formal contact and conversion hub: visible business details, structured brief shortcuts, and a direct inquiry form in one cleaner flow."
          />
          <div className="hero-actions">
            <Link href="/request-proposal" className="primary-link">
              Request a proposal
            </Link>
            <a href={`mailto:${site.email}`} className="secondary-link">
              Email Kelel
            </a>
            <a href={`tel:${site.phone.replaceAll(" ", "")}`} className="secondary-link">
              Call now
            </a>
          </div>
          <div className="platform-cta-shortcuts">
            <Link
              href="/request-proposal?focus=dashboard&source=contact-page"
              className="mini-chip-link"
            >
              Dashboard brief
            </Link>
            <Link
              href="/request-proposal?focus=workflow&source=contact-page"
              className="mini-chip-link"
            >
              Workflow brief
            </Link>
            <Link
              href="/request-proposal?focus=portal&source=contact-page"
              className="mini-chip-link"
            >
              Portal brief
            </Link>
            <Link
              href="/request-proposal?focus=reporting&source=contact-page"
              className="mini-chip-link"
            >
              Reporting brief
            </Link>
          </div>
          <div className="resource-command-metrics">
            {contactStats.map((item) => (
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
            alt="Business leader reviewing project details on a tablet"
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
            eyebrow="Primary contact"
            title="The clearest contact route should combine named leadership visibility with practical business details."
            description="This keeps the page useful for partnerships, project introductions, procurement-style review, and direct delivery conversations."
          />
          <div className="leadership-panel">
            <ExecutiveContactCard
              title="Primary contact"
              copy="Direct business contact for partnerships, project discussions, and official communication."
            />
            <div className="resource-grid compact-grid">
              <article className="resource-card">
                <span className="project-type">Email</span>
                <h3>{site.email}</h3>
                <p>Use email for formal outreach, project briefs, introductions, and follow-up documentation.</p>
                <a href={`mailto:${site.email}`} className="secondary-link">
                  Send email
                </a>
              </article>
              <article className="resource-card">
                <span className="project-type">Phone</span>
                <h3>{site.phone}</h3>
                <p>Use direct phone contact when the conversation needs quicker coordination on scope or timing.</p>
                <a
                  href={`tel:${site.phone.replaceAll(" ", "")}`}
                  className="secondary-link"
                >
                  Call Kelel
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className="section-block contact-form-panel">
          <SectionIntro
            eyebrow="Project brief"
            title="Share the kind of website, support engagement, or system you want to build."
            description="The form validates input and stores inquiries inside the project inbox so the contact flow is already operational."
          />
          <ContactForm sourcePage="contact-page" />
        </section>
      </section>

      <section className="resource-bottom-grid">
        <section className="section-block">
          <SectionIntro
            eyebrow="What happens next"
            title="A stronger contact page should explain the follow-up path, not only show a form."
            description="These commitments make the inquiry route feel more accountable and more prepared for real business follow-up."
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
            eyebrow="Formal support"
            title="Some contacts need a formal document or a structured proposal route before they send a message."
            description="These routes support procurement-style review, internal sharing, or more specific platform conversations."
          />
          <div className="resource-grid compact-grid">
            <article className="resource-card">
              <span className="project-type">Formal document</span>
              <h3>Company profile PDF</h3>
              <p>Use the formal profile when the conversation starts with business introduction or internal review.</p>
              <CompanyProfileDownload title="Need a formal company document first?" />
            </article>
            <article className="resource-card">
              <span className="project-type">Structured brief</span>
              <h3>Proposal request page</h3>
              <p>Use the proposal path when the inquiry already needs clearer scope, budget, timeline, or attachments.</p>
              <Link href="/request-proposal" className="secondary-link">
                Open proposal page
              </Link>
            </article>
          </div>
        </section>
      </section>

      <section className="section-block contrast-panel">
        <MovingMediaStrip
          eyebrow="Software and response visuals"
          title="The contact journey now carries more platform, systems, and delivery energy too."
          description="These moving visuals connect outreach to real software, workflow, database, and support conversations instead of a simple static contact block."
          items={contactVisuals}
        />
      </section>

      <section className="resource-bottom-grid">
        <section className="section-block">
          <SectionIntro
            eyebrow="Before you message us"
            title="Helpful answers before the conversation begins."
            description="These short answers remove common uncertainty and make it easier to choose the right contact route."
          />
          <div className="faq-list">
            {topFaqs.map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Direct next steps"
            title="Choose the clearest next route based on what your team needs right now."
            description="Some teams need a conversation, some need a formal brief, and some need proof materials first."
          />
          <div className="hero-actions">
            <Link href="/request-proposal" className="primary-link">
              Request proposal
            </Link>
            <Link href="/resources" className="secondary-link">
              Open resources
            </Link>
            <Link href="/trust" className="secondary-link">
              Review trust page
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
