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
  },
  {
    title: "Insurance Workflow System",
    desc: "Claims, renewals, and internal operations managed through one cleaner workflow model.",
    label: "Insurance operations",
    href: "/work/it-infrastructure-improvement-track",
  },
  {
    title: "Enterprise Portal Concept",
    desc: "A structured portal layer for business processes, approvals, and regional coordination.",
    label: "Enterprise platform",
    href: "/work",
  },
];

export const metadata: Metadata = {
  title: "Kelel IT Solution | Digital Infrastructure for Financial Systems in Africa",
  description:
    "Kelel IT Solution builds secure, scalable platforms for banking, insurance, and enterprise operations across Africa.",
};

export default function Home() {
  return (
    <main>
      {/* 1 — Hero */}
      <HomepageHero />

      {/* 2 — Marquee */}
      <div className="hp-marquee" aria-hidden="true">
        <div className="hp-marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="hp-marquee-item">{item}</span>
          ))}
        </div>
      </div>

      {/* 3 — Capabilities */}
      <RevealSection as="div">
        <CapabilitiesSection />
      </RevealSection>

      {/* 4 — Africa connectivity */}
      <RevealSection as="section" className="hp-africa">
        <div className="hp-section-inner">
          <div className="hp-africa-wrap">
            <div>
              <div className="hp-section-label">Our Reach</div>
              <h2 className="hp-section-title">
                Built in Ethiopia. <em>Connected across Africa.</em>
              </h2>
              <p className="hp-section-intro" style={{ marginBottom: "0" }}>
                Kelel operates from Addis Ababa with infrastructure reaching financial and enterprise teams across the continent.
              </p>
              <div className="hp-africa-stats">
                <div className="hp-africa-stat">
                  <div className="hp-africa-stat-val">12</div>
                  <div className="hp-africa-stat-lbl">Active nodes</div>
                </div>
                <div className="hp-africa-stat">
                  <div className="hp-africa-stat-val">5+</div>
                  <div className="hp-africa-stat-lbl">Markets served</div>
                </div>
                <div className="hp-africa-stat">
                  <div className="hp-africa-stat-val">99.9%</div>
                  <div className="hp-africa-stat-lbl">Network uptime</div>
                </div>
              </div>
            </div>
            <NexusAfricaMap />
          </div>
        </div>
      </RevealSection>

      {/* 5 — Industries */}
      <RevealSection as="div">
        <IndustryGrid />
      </RevealSection>

      {/* 6 — Process + stats */}
      <RevealSection as="div">
        <ProcessTrack />
      </RevealSection>

      {/* 7 — Proof / case studies */}
      <RevealSection as="section" className="hp-proof">
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
            <div className="hp-proof-visual" aria-hidden="true" />
          </Link>
          <div className="hp-proof-cards">
            {proofCards.map((card) => (
              <Link key={card.title} href={card.href} className="hp-proof-card">
                <div className="hp-proof-label">{card.label}</div>
                <h3 className="hp-proof-title" style={{ fontSize: "18px", marginTop: "8px" }}>{card.title}</h3>
                <p className="hp-proof-desc" style={{ marginTop: "8px" }}>{card.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* 8 — CTA band */}
      <RevealSection as="div">
        <CtaBand
          kicker="Start a Project"
          heading={<>Ready to build? <em>Let&apos;s talk.</em></>}
          sub="Tell us what you need and we'll shape the right architecture for your operations."
          primaryLabel="Start a project →"
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

      <ChatWithKelel />
    </main>
  );
}
