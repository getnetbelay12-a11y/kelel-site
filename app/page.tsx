import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { RevealSection } from "@/components/reveal-section";
import { NexusAfricaMap } from "@/components/nexus-africa-map";
import { HomepageHero } from "@/components/homepage-hero";
import { CapabilitiesSection } from "@/components/capabilities-section";
import { IndustryGrid } from "@/components/industry-grid";
import { ProcessTrack } from "@/components/process-track";
import { CtaBand } from "@/components/cta-band";
import { site } from "@/lib/site-content";
import { createSeoMetadata, faqSchema, jsonLd } from "@/lib/seo";
import { seoPages, servicePages, solutionPages } from "@/lib/seo-pages";

const ContactForm = dynamic(
  () => import("@/components/contact-form").then((mod) => mod.ContactForm),
);

const ChatWithKelel = dynamic(
  () => import("@/components/chat-with-kelel").then((mod) => mod.ChatWithKelel),
);

const marqueeItems = [
  "API-First Architecture",
  "Banking Platforms",
  "Insurance Systems",
  "Enterprise Dashboards",
  "Real-time Analytics",
  "Workflow Automation",
  "Data Infrastructure",
  "Secure Operations",
  "African Markets",
  "Production-Ready",
];

const proofCards = [
  {
    title: "Banking Platform Concept",
    desc: "A premium concept for digital banking operations, dashboards, and control layers.",
    label: "Financial systems",
    href: "/work/multi-branch-operations-platform",
    variant: "banking",
  },
  {
    title: "Insurance Workflow System",
    desc: "Claims, renewals, and internal operations managed through one cleaner workflow model.",
    label: "Insurance operations",
    href: "/work/it-infrastructure-improvement-track",
    variant: "insurance",
  },
  {
    title: "Enterprise Portal Concept",
    desc: "A structured portal layer for business processes, approvals, and regional coordination.",
    label: "Enterprise platform",
    href: "/work",
    variant: "enterprise",
  },
];

function ProofCardVisual({ variant }: { variant: string }) {
  if (variant === "banking") {
    return (
      <div className="hp-proof-card-surface hp-proof-card-surface--banking" aria-hidden="true">
        <div className="hp-proof-mini-window">
          <div className="hp-proof-mini-window-bar" />
          <div className="hp-proof-mini-window-grid">
            <span className="hp-proof-mini-stat">
              <strong>Payments</strong>
              <small>Workflow view</small>
            </span>
            <span className="hp-proof-mini-stat">
              <strong>Branches</strong>
              <small>Dashboard layer</small>
            </span>
          </div>
          <div className="hp-proof-mini-chart">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "insurance") {
    return (
      <div className="hp-proof-card-surface hp-proof-card-surface--insurance" aria-hidden="true">
        <div className="hp-proof-flow-card">
          <div className="hp-proof-flow-head">Claims pipeline</div>
          <div className="hp-proof-flow-steps">
            <span>Intake</span>
            <span>Review</span>
            <span>Approval</span>
          </div>
          <div className="hp-proof-flow-lines">
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hp-proof-card-surface hp-proof-card-surface--enterprise" aria-hidden="true">
      <div className="hp-proof-portal-card">
        <div className="hp-proof-portal-side">
          <span />
          <span />
          <span />
        </div>
        <div className="hp-proof-portal-main">
          <div className="hp-proof-portal-header" />
          <div className="hp-proof-portal-panels">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = createSeoMetadata({
  title: "IT Solutions Company in Addis Ababa | Kelel IT Solutions",
  description:
    "Kelel IT Solutions builds software, mobile apps, banking platforms, school fee payment systems, insurance platforms, fleet management systems, and MongoDB solutions for businesses in Ethiopia.",
  path: "/",
});

const homeFaqs = [
  {
    question: "What does Kelel IT Solutions do?",
    answer:
      "Kelel IT Solutions builds websites, mobile apps, custom software, banking platforms, school fee payment systems, insurance platforms, fleet systems, cloud deployments, cybersecurity foundations, and MongoDB solutions.",
  },
  {
    question: "Where is Kelel IT Solutions located?",
    answer:
      "Kelel IT Solutions is based in Addis Ababa, Ethiopia and supports businesses in Addis Ababa and nearby areas.",
  },
  {
    question: "Can Kelel build financial technology systems?",
    answer:
      "Yes. Kelel designs digital banking, school payment, insurance, dashboard, audit trail, notification, and integration-ready software for financial workflows.",
  },
  {
    question: "Does Kelel provide MongoDB consulting?",
    answer:
      "Yes. Kelel supports MongoDB schema design, indexing, performance tuning, replication, backup and recovery, security, migrations, and cloud readiness.",
  },
  {
    question: "How can a business request a consultation?",
    answer:
      "Use the contact or request proposal page to share the business problem, users, required workflow, timeline, and integration needs.",
  },
];

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(homeFaqs))} />
      {/* 1 — Hero */}
      <HomepageHero />

      <section className="seo-home-intro" id="what-we-do">
        <div className="stitch-container">
          <div className="hp-section-label">What We Do</div>
          <h2 className="hp-section-title">
            Software, infrastructure, and digital systems for <em>Ethiopian businesses.</em>
          </h2>
          <p className="hp-section-intro">
            Kelel IT Solutions is an IT solutions company in Addis Ababa helping
            organizations build reliable digital infrastructure: custom software,
            mobile applications, SEO-ready websites, banking software, school fee
            payment systems, insurance platforms, fleet and logistics systems,
            MongoDB databases, cloud deployments, cybersecurity controls, and ERP-style
            enterprise integrations.
          </p>
          <div className="seo-link-grid">
            {seoPages.map((page) => (
              <Link key={page.path} href={page.path} className="seo-link-card stitch-glass">
                <span>{page.group === "solutions" ? "Solution" : "Service"}</span>
                <strong>{page.h1}</strong>
                <small>{page.serviceType}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2 — Marquee */}
      <div className="hp-marquee" aria-hidden="true">
        <div className="hp-marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="hp-marquee-item">{item}</span>
          ))}
        </div>
      </div>

      {/* 3 — Capabilities */}
      <RevealSection as="div" className="reveal-stagger">
        <CapabilitiesSection />
      </RevealSection>

      {/* 4 — Africa connectivity */}
      <RevealSection as="section" className="hp-africa reveal-stagger" delay={1}>
        <div className="hp-section-inner">
          <div className="hp-africa-wrap">
            <div>
              <div className="hp-section-label">Our Reach</div>
              <h2 className="hp-section-title">
                Built in Ethiopia. <em>Connected across Africa.</em>
              </h2>
              <p className="hp-section-intro hp-section-intro--flush">
                Kelel IT Solutions supports businesses in Addis Ababa and nearby areas
                including Bole, Kazanchis, Megenagna, CMC, Summit, Ayat, Lebu, Sar Bet,
                Burayu, Sebeta, Sululta, Dukem, and Bishoftu.
              </p>
              <div className="hp-africa-stats">
                <div className="hp-africa-stat">
                  <div className="hp-africa-stat-val">Addis</div>
                  <div className="hp-africa-stat-lbl">Primary location</div>
                </div>
                <div className="hp-africa-stat">
                  <div className="hp-africa-stat-val">ET</div>
                  <div className="hp-africa-stat-lbl">Ethiopia focus</div>
                </div>
                <div className="hp-africa-stat">
                  <div className="hp-africa-stat-val">B2B</div>
                  <div className="hp-africa-stat-lbl">Business systems</div>
                </div>
              </div>
            </div>
            <NexusAfricaMap />
          </div>
        </div>
      </RevealSection>

      {/* 5 — Industries */}
      <RevealSection as="div" className="reveal-stagger" delay={1}>
        <IndustryGrid />
      </RevealSection>

      <RevealSection as="section" className="seo-home-band reveal-stagger" delay={1}>
        <div className="stitch-container">
          <div className="hp-section-label">Trust Signals</div>
          <h2 className="hp-section-title">
            Built for serious workflows, not decorative software.
          </h2>
          <div className="seo-trust-grid">
            {[
              "Banking dashboards, mobile banking workflows, audit trails, and integration-ready service layers",
              "Insurance policy, renewal, claims, notification, verification, and reporting systems",
              "Logistics and fleet workflows for vehicles, drivers, dispatch, trips, maintenance, and reporting",
              "School systems for onboarding, parent/student payment, receipts, reconciliation, and branch visibility",
              "Enterprise systems for operations, finance, HR, reporting, APIs, and workflow automation",
            ].map((item) => (
              <div key={item} className="seo-trust-card stitch-glass">
                {item}
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection as="section" className="seo-home-band reveal-stagger" delay={1}>
        <div className="stitch-container">
          <div className="hp-section-label">Why Kelel IT Solutions</div>
          <h2 className="hp-section-title">
            Digital infrastructure for financial systems.
          </h2>
          <div className="seo-two-col">
            <p>
              Kelel focuses on practical architecture: clear workflows, secure access,
              strong database design, maintainable code, dashboard visibility, and
              deployment practices that can support real operations. The work is built
              for African market realities and designed against global engineering
              standards.
            </p>
            <p>
              We serve organizations that need software tied to business outcomes:
              better payment flows, cleaner reporting, stronger branch visibility,
              safer databases, mobile access, and systems that leadership can actually
              operate after launch.
            </p>
          </div>
        </div>
      </RevealSection>

      <RevealSection as="section" className="seo-home-band reveal-stagger" delay={1}>
        <div className="stitch-container">
          <div className="hp-section-label">Service Paths</div>
          <h2 className="hp-section-title">Find the right page for your project.</h2>
          <div className="seo-related-columns">
            <div>
              <h3>Services</h3>
              {servicePages.map((page) => (
                <Link key={page.path} href={page.path}>{page.title} →</Link>
              ))}
            </div>
            <div>
              <h3>Solutions</h3>
              {solutionPages.map((page) => (
                <Link key={page.path} href={page.path}>{page.title} →</Link>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      {/* 6 — Process + stats */}
      <RevealSection as="div" className="reveal-stagger" delay={2}>
        <ProcessTrack />
      </RevealSection>

      {/* 7 — Proof / case studies */}
      <RevealSection as="section" className="hp-proof reveal-stagger" delay={1}>
        <div className="hp-section-inner">
          <div className="hp-section-label">Work</div>
          <h2 className="hp-section-title">
            Real platform thinking for <em>African operations.</em>
          </h2>
          <p className="hp-section-intro">
            Concept work, architecture examples, and system patterns for banking, insurance, and enterprise teams.
          </p>
          <Link href="/work/multi-branch-operations-platform" className="hp-proof-feature">
            <div className="hp-proof-copy">
              <div className="hp-proof-label">Featured · Banking platform</div>
              <h3 className="hp-proof-title">Multi-branch operations platform</h3>
              <p className="hp-proof-desc">
                A production-style concept for approvals, reporting, branch visibility, and operating controls across distributed teams.
              </p>
              <div className="hp-proof-pills">
                <span className="hp-proof-pill">Approval workflows</span>
                <span className="hp-proof-pill">Regional reporting</span>
                <span className="hp-proof-pill">Executive visibility</span>
              </div>
            </div>
            <div className="hp-proof-visual" aria-hidden="true">
              <div className="hp-proof-screen hp-proof-screen--main">
                <div className="hp-proof-screen-ui">
                  <div className="hp-proof-screen-topbar">
                    <span className="hp-proof-screen-kicker">Regional command</span>
                    <span className="hp-proof-screen-status">Live</span>
                  </div>
                  <div className="hp-proof-screen-grid">
                    <div className="hp-proof-screen-tile">
                      <small>Transactions</small>
                      <strong>Tracked</strong>
                    </div>
                    <div className="hp-proof-screen-tile">
                      <small>Access</small>
                      <strong>Secure</strong>
                    </div>
                    <div className="hp-proof-screen-tile">
                      <small>Approvals</small>
                      <strong>Visible</strong>
                    </div>
                  </div>
                  <div className="hp-proof-screen-chart">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="hp-proof-screen-table">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
              <div className="hp-proof-screen hp-proof-screen--ghost">
                <div className="hp-proof-ghost-ui">
                  <div className="hp-proof-ghost-ring" />
                  <div className="hp-proof-ghost-lines">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
              <div className="hp-proof-float-card">
                <span className="hp-proof-float-kicker">Live surface</span>
                <strong>Multi-node visibility</strong>
                <div className="hp-proof-float-bars">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </Link>
          <div className="hp-proof-cards">
            {proofCards.map((card) => (
              <Link key={card.title} href={card.href} className="hp-proof-card">
                <div className="hp-proof-card-visual">
                  <ProofCardVisual variant={card.variant} />
                </div>
                <div className="hp-proof-label">{card.label}</div>
                <h3 className="hp-proof-title hp-proof-title--card">{card.title}</h3>
                <p className="hp-proof-desc hp-proof-desc--card">{card.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* 8 — CTA band */}
      <RevealSection as="div" delay={1}>
        <CtaBand
          kicker="Request a Consultation"
          heading={<>Ready to build a serious <em>business system?</em></>}
          sub="Tell us what you need and we will shape the right architecture for your software, website, mobile app, database, cloud, or financial platform."
          primaryLabel="Request a Consultation →"
          primaryHref="/#contact"
          ghostLabel="Book a call"
          ghostHref={site.calendlyPlaceholder}
        />
      </RevealSection>

      {/* 9 — Contact form */}
      <section id="contact" className="hp-contact">
        <div className="hp-contact-inner">
          <div className="hp-section-label">Contact</div>
          <h2 className="hp-section-title" style={{ marginBottom: "32px" }}>
            Send us a brief. <em>We respond in 24–48 hours.</em>
          </h2>
          <div className="hp-contact-form-wrap">
            <ContactForm
              compactFields
              sourcePage="home-page"
              requestFocus="production-platform"
              submitLabel="Send Request"
              helperCopy="We respond within 24-48 hours."
              detailsLabel="System requirements"
              detailsPlaceholder="Tell us what system you need, who it serves, and what it should improve."
            />
          </div>
        </div>
      </section>

      <RevealSection as="section" className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">FAQ</div>
          <h2 className="hp-section-title section-title-gap-lg">
            Common questions about <em>Kelel IT Solutions.</em>
          </h2>
          <div className="ctc-faq-list">
            {homeFaqs.map((item) => (
              <div key={item.question} className="ctc-faq-item stitch-glass">
                <h3 className="ctc-faq-q">{item.question}</h3>
                <p className="ctc-faq-a">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <ChatWithKelel />
    </main>
  );
}
