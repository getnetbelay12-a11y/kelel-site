import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { RevealSection } from "@/components/reveal-section";
import type { SeoPage } from "@/lib/seo-pages";
import { breadcrumbSchema, faqSchema, jsonLd } from "@/lib/seo";
import { serviceSchema } from "@/lib/seo-pages";

export function SeoServicePage({ page }: { page: SeoPage }) {
  const parent = page.group === "solutions" ? "Solutions" : "Services";
  const parentHref = page.group === "solutions" ? "/services" : "/services";

  return (
    <main className="stitch-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: parent, path: parentHref },
            { name: page.h1, path: page.path },
          ]),
        )}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(serviceSchema(page))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(page.faqs))} />

      <section className="page-hero">
        <div className="page-hero-inner">
          <nav className="page-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="page-crumbs-sep">/</span>
            <Link href={parentHref}>{parent}</Link>
            <span className="page-crumbs-sep">/</span>
            <span>{page.h1}</span>
          </nav>
          <div className="seo-hero-grid">
            <div>
              <div className="site-eyebrow page-eyebrow-spaced">
                <span className="site-eyebrow-dot" />
                {page.eyebrow}
              </div>
              <h1 className="page-title-plain">{page.h1}</h1>
              <p className="page-sub">{page.intro}</p>
              <div className="page-hero-actions">
                <Link href="/contact" className="site-hero-btn-primary btn-magnetic">
                  {page.cta} →
                </Link>
                <Link href="/request-proposal" className="site-hero-btn-ghost">
                  Request proposal
                </Link>
              </div>
            </div>
            <aside className="seo-side-panel stitch-glass" aria-label="Page summary">
              <h2>What this covers</h2>
              <ul>
                {page.sections.map((section) => (
                  <li key={section.title}>{section.title}</li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="seo-content-grid">
            <article className="seo-article">
              {page.sections.map((section) => (
                <section key={section.title} className="seo-copy-block">
                  <h2>{section.title}</h2>
                  <p>{section.body}</p>
                  {section.bullets ? (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </article>
            <aside className="seo-related stitch-glass" aria-label="Related pages">
              <h2>Related pages</h2>
              {page.related.map((item) => (
                <Link key={`${item.href}-${item.label}`} href={item.href}>
                  {item.label} →
                </Link>
              ))}
            </aside>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="hp-section-label">FAQ</div>
          <h2 className="hp-section-title section-title-gap-lg">
            Questions about <em>{page.serviceType}.</em>
          </h2>
          <div className="ctc-faq-list">
            {page.faqs.map((item) => (
              <div key={item.question} className="ctc-faq-item stitch-glass">
                <h3 className="ctc-faq-q">{item.question}</h3>
                <p className="ctc-faq-a">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection as="div">
        <CtaBand
          kicker={page.eyebrow}
          heading={
            <>
              Ready to scope <em>{page.serviceType}?</em>
            </>
          }
          sub="Share the workflow, users, systems, timeline, and constraints. Kelel will help define a realistic implementation path."
          primaryLabel={`${page.cta} →`}
          primaryHref="/contact"
          ghostLabel="Request proposal"
          ghostHref="/request-proposal"
        />
      </RevealSection>
    </main>
  );
}
