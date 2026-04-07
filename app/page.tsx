import { BrandShowcase } from "@/components/brand-showcase";
import { CompanyProfileDownload } from "@/components/company-profile-download";
import { ExecutiveContactCard } from "@/components/executive-contact-card";
import { LogoMark } from "@/components/logo-mark";
import Link from "next/link";
import { SectionIntro } from "@/components/section-intro";
import {
  capabilityAreas,
  engagementModes,
  faqs,
  industries,
  leadershipTouchpoints,
  process,
  projects,
  proofMetrics,
  serviceHighlights,
  services,
  site,
  strengths,
  technologyFocus,
  testimonials,
  trustPoints,
} from "@/lib/site-content";

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <div className="hero-brand-row">
            <LogoMark />
            <div className="hero-brand-meta">
              <span className="eyebrow">Addis Ababa Based IT Partner</span>
              <p className="hero-brand-note">
                Trusted business systems, infrastructure support, and practical digital transformation services.
              </p>
            </div>
          </div>
          <h1>Reliable IT solutions for organizations that need stronger systems and clearer digital presence.</h1>
          <p className="hero-text">
            {site.intro} We repositioned this website around the trust signals
            decision-makers expect from a serious IT solutions company:
            leadership visibility, clear service lines, sector fit, and a
            direct path to inquiry.
          </p>
          <div className="hero-badges">
            <span>{site.contactPerson}</span>
            <span>{site.contactRole}</span>
            <span>{site.email}</span>
          </div>
          <div className="hero-actions">
            <Link href="/contact" className="primary-link">
              Speak with Kelel
            </Link>
            <Link href="/services" className="secondary-link">
              Explore solutions
            </Link>
            <Link href="/company-profile" className="secondary-link">
              View company profile
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <p className="hero-card-label">Core solution areas</p>
          <ul>
            {services.map((service) => (
              <li key={service.title}>{service.title}</li>
            ))}
          </ul>
          <div className="impact-panel">
            <span>Contact lead</span>
            <strong>{site.contactPerson}, {site.contactRole}</strong>
          </div>
        </div>
      </section>

      <section className="stats-grid">
        {proofMetrics.map((metric) => (
          <article key={metric.label}>
            <span>{metric.value}</span>
            <strong>{metric.label}</strong>
          </article>
        ))}
      </section>

      <section className="section-block contrast-panel">
        <BrandShowcase
          title="A more credible website now carries the real Kelel identity throughout the experience."
          description="The site now uses the actual Kelel logo system, which gives the homepage and company presentation much stronger brand consistency than the earlier placeholder mark."
        />
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Trust signals"
          title="What stronger IT company websites do well, this one now does far better."
          description="The site now emphasizes service clarity, visible contact leadership, case-study framing, and straightforward conversion routes instead of generic marketing copy."
        />
        <div className="pillars-list">
          {trustPoints.map((point) => (
            <article key={point}>
              <strong>{point}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Solutions"
          title="Technology solutions organized the way business decision-makers actually evaluate them."
        />
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

      <section className="section-block">
        <SectionIntro
          eyebrow="Capabilities"
          title="A stronger IT website should show what the company can actually support across operations and delivery."
          narrow
        />
        <div className="tag-cloud">
          {capabilityAreas.map((item) => (
            <span key={item} className="tag-pill">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="How we build"
          title="A practical studio approach with stronger business thinking behind it."
          narrow
        />
        <div className="highlight-grid">
          {serviceHighlights.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="How clients engage"
          title="Different organizations need different levels of support, so the offer should reflect that."
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
          eyebrow="Why Kelel"
          title="The website now presents Kelel more like an IT partner and less like a generic studio."
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

      <section className="section-block process-layout">
        <SectionIntro
          eyebrow="Delivery model"
          title="A practical process for organizations improving technology and digital systems."
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

      <section className="section-block">
        <SectionIntro
          eyebrow="Industries"
          title="Built to speak to the kinds of organizations that typically need dependable IT support."
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

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="Technology focus"
          title="The language of the website should reflect the types of systems and environments clients actually care about."
          narrow
        />
        <div className="tag-cloud">
          {technologyFocus.map((item) => (
            <span key={item} className="tag-pill alt">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="section-block proof-layout">
        <SectionIntro
          eyebrow="Leadership visibility"
          title="A serious IT company website should make the path to a responsible decision-maker obvious."
          narrow
        />
        <div className="proof-side">
          <div className="pillars-list compact">
            {leadershipTouchpoints.map((item) => (
              <article key={item}>
                <strong>{item}</strong>
              </article>
            ))}
          </div>
          <ExecutiveContactCard compact />
        </div>
      </section>

      <section className="section-block">
        <CompanyProfileDownload copy="The branded Kelel company profile is now available online and as a downloadable PDF for procurement, partnership, and business-introduction use." />
      </section>

      <section className="project-grid">
        {projects.map((project) => (
          <article key={project.name} className="section-block project-card">
            <span className="project-type">{project.type}</span>
            <h3>{project.name}</h3>
            <p>{project.blurb}</p>
            <p className="project-detail"><strong>Challenge:</strong> {project.challenge}</p>
            <p className="project-detail"><strong>Outcome:</strong> {project.outcome}</p>
          </article>
        ))}
      </section>

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="Client confidence"
          title="Trust grows when service language, leadership visibility, and delivery expectations are all clear."
          narrow
        />
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article key={`${item.name}-${item.company}`}>
              <p className="testimonial-quote">&ldquo;{item.quote}&rdquo;</p>
              <strong>{item.name}</strong>
              <span>{item.company}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Questions"
          title="The practical questions organizations ask before selecting an IT partner."
          narrow
        />
        <div className="faq-list">
          {faqs.map((item) => (
            <article key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block contact-panel">
        <SectionIntro
          eyebrow="Next Step"
          title="If the site now looks closer to a serious IT company, the next job is to add real proof."
          narrow
        />
        <p>
          The strongest remaining upgrades are real client case studies,
          certifications, partner logos, sector-specific service pages, and a
          live delivery channel for inquiries.
        </p>
        <a href={`mailto:${site.email}`} className="primary-link">
          {site.email}
        </a>
      </section>
    </main>
  );
}
