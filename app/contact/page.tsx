import { BrandShowcase } from "@/components/brand-showcase";
import { CompanyProfileDownload } from "@/components/company-profile-download";
import { ExecutiveContactCard } from "@/components/executive-contact-card";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { SectionIntro } from "@/components/section-intro";
import { faqs, responseCommitments, site } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact | Kelel IT Solution",
  description:
    "Contact Kelel IT Solution to discuss a company website, custom business system, brand refresh, or digital growth project.",
};

export default function ContactPage() {
  return (
    <main className="page-shell">
      <section className="section-block page-hero">
        <SectionIntro
          eyebrow="Contact"
          title="Start the conversation and let us shape the right website for your business."
          description="Use these details as the public contact block for now. We can replace them with your exact business channels in the next pass."
        />
      </section>

      <section className="contact-grid">
        <ExecutiveContactCard
          title="Primary contact"
          copy="Direct business contact for partnerships, project discussions, and official communication."
        />

        <article className="section-block">
          <h3>Email</h3>
          <p>For project requests, introductions, and general business inquiries.</p>
          <a href={`mailto:${site.email}`} className="primary-link inline-cta">
            {site.email}
          </a>
        </article>

        <article className="section-block">
          <h3>Phone</h3>
          <p>Reach out for direct conversations about timelines, scope, and next steps.</p>
          <a
            href={`tel:${site.phone.replaceAll(" ", "")}`}
            className="secondary-link inline-cta"
          >
            {site.phone}
          </a>
        </article>

        <article className="section-block">
          <h3>Location</h3>
          <p>Serving businesses that want stronger digital presence and better web experiences.</p>
          <strong className="contact-location">{site.location}</strong>
        </article>

        <article className="section-block">
          <h3>Working hours</h3>
          <p>Reach out during business hours for the fastest project follow-up.</p>
          <strong className="contact-location">{site.hours}</strong>
        </article>
      </section>

      <section className="section-block contrast-panel">
        <BrandShowcase
          title="The contact experience should feel branded and trustworthy before a visitor even sends a message."
          description="Using the real Kelel identity here makes the inquiry journey feel more official, more recognizable, and more credible for new business conversations."
        />
      </section>

      <section className="section-block">
        <CompanyProfileDownload title="Need a formal company document first?" />
      </section>

      <section className="section-block contact-form-panel">
        <SectionIntro
          eyebrow="Project brief"
          title="Share the kind of website or system you want to build."
          description="This form now validates input and stores project inquiries locally inside the site project. We can connect it to email, WhatsApp, Google Sheets, or a hosted backend next."
        />
        <ContactForm />
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="After you contact us"
          title="A stronger contact page should also explain what happens next."
          narrow
        />
        <div className="highlight-grid">
          {responseCommitments.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Before you message us"
          title="Helpful answers before we begin."
          narrow
        />
        <div className="faq-list">
          {faqs.slice(0, 3).map((item) => (
            <article key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
