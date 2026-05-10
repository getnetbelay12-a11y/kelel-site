import type { Metadata } from "next";
import Link from "next/link";
import { RevealSection } from "@/components/reveal-section";
import { ContactForm } from "@/components/contact-form";
import { faqs, responseCommitments, site } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact | Kelel IT Solution",
  description:
    "Contact Kelel IT Solution to discuss infrastructure, platform design, AI systems, or enterprise digital transformation.",
};

export default function ContactPage() {
  return (
    <main className="stitch-page">
      {/* ── Hero ── */}
      <RevealSection className="stitch-hero">
        <div className="stitch-container">
          <div className="ctc-hero-inner">
            <div className="ctc-hero-copy">
              <span className="stitch-kicker">GET IN TOUCH</span>
              <h1 className="stitch-h1">
                Start the<br />conversation.
              </h1>
              <p className="stitch-body">
                Whether you&apos;re planning infrastructure, modernizing a system, or
                exploring AI-driven operations — our team is ready to scope, design,
                and deliver alongside you.
              </p>
              <div className="ctc-pill-row">
                <a href={`mailto:${site.email}`} className="ctc-pill ctc-pill--green">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  {site.email}
                </a>
                <a href={`tel:${site.phone.replaceAll(" ", "")}`} className="ctc-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.71 3.4 2 2 0 0 1 3.68 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  {site.phone}
                </a>
              </div>
            </div>

            <div className="ctc-hero-card stitch-glass">
              <div className="ctc-hero-card-top">
                <div className="ctc-dot ctc-dot--pulse" />
                <span className="ctc-card-co">Kelel IT Solution</span>
              </div>
              <div className="ctc-person-row">
                <div className="ctc-avatar">G</div>
                <div>
                  <div className="ctc-person-name">{site.contactPerson}</div>
                  <div className="ctc-person-role">{site.contactRole}</div>
                </div>
              </div>
              <div className="ctc-card-divider" />
              <div className="ctc-card-row">
                <span className="ctc-card-row-label">Location</span>
                <span className="ctc-card-row-val">{site.location}</span>
              </div>
              <div className="ctc-card-row">
                <span className="ctc-card-row-label">Hours</span>
                <span className="ctc-card-row-val">{site.hours}</span>
              </div>
              <div className="ctc-card-row">
                <span className="ctc-card-row-label">WhatsApp</span>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="ctc-card-row-link">
                  Message directly →
                </a>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ── Contact methods ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="ctc-methods-grid">
            <div className="ctc-method stitch-glass">
              <div className="ctc-method-icon ctc-method-icon--green">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <div className="ctc-method-label">Email</div>
              <div className="ctc-method-title">Send a message</div>
              <a href={`mailto:${site.email}`} className="ctc-method-val">{site.email}</a>
            </div>

            <div className="ctc-method stitch-glass">
              <div className="ctc-method-icon ctc-method-icon--blue">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.71 3.4 2 2 0 0 1 3.68 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div className="ctc-method-label">Phone</div>
              <div className="ctc-method-title">Call us directly</div>
              <a href={`tel:${site.phone.replaceAll(" ", "")}`} className="ctc-method-val">{site.phone}</a>
            </div>

            <div className="ctc-method stitch-glass">
              <div className="ctc-method-icon ctc-method-icon--green">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div className="ctc-method-label">WhatsApp</div>
              <div className="ctc-method-title">Instant messaging</div>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="ctc-method-val">Open WhatsApp →</a>
            </div>

            <div className="ctc-method stitch-glass">
              <div className="ctc-method-icon ctc-method-icon--purple">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div className="ctc-method-label">Office</div>
              <div className="ctc-method-title">Visit us in Addis</div>
              <span className="ctc-method-val">Kirkos Subcity, Kebele 02/03<br />Addis Ababa, Ethiopia</span>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ── Contact Form ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="ctc-form-wrap">
            <div className="ctc-form-header">
              <span className="stitch-kicker">PROJECT BRIEF</span>
              <h2 className="stitch-h2">Tell us about your project.</h2>
              <p className="stitch-body">
                Share what you&apos;re building and your timeline. We respond within 24 hours
                with a structured next step.
              </p>
            </div>
            <div className="ctc-form-glass stitch-glass">
              <ContactForm />
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ── What happens next ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="stitch-section-header">
            <span className="stitch-kicker">AFTER YOU CONTACT US</span>
            <h2 className="stitch-h2">A clear path from inquiry to delivery.</h2>
          </div>
          <div className="ctc-next-grid">
            {responseCommitments.map((item, i) => (
              <div key={item.title} className="ctc-next-card stitch-glass">
                <div className="ctc-next-num">0{i + 1}</div>
                <h3 className="ctc-next-title">{item.title}</h3>
                <p className="ctc-next-body">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── FAQ ── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="stitch-section-header">
            <span className="stitch-kicker">FAQ</span>
            <h2 className="stitch-h2">Common questions before you reach out.</h2>
          </div>
          <div className="ctc-faq-list">
            {faqs.slice(0, 3).map((item) => (
              <div key={item.question} className="ctc-faq-item stitch-glass">
                <h3 className="ctc-faq-q">{item.question}</h3>
                <p className="ctc-faq-a">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── CTA ── */}
      <RevealSection className="stitch-cta-section">
        <div className="stitch-container">
          <div className="stitch-cta-glass stitch-glass">
            <h2>Need a formal proposal?</h2>
            <p className="stitch-body">
              Submit a structured brief and receive a scoped proposal for your infrastructure,
              platform, or AI-driven system.
            </p>
            <div className="stitch-cta-btns">
              <Link href="/request-proposal" className="stitch-btn-primary">
                Request a Proposal
              </Link>
              <Link href="/work" className="stitch-btn-ghost">
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>
    </main>
  );
}
