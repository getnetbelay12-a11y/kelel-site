import Link from "next/link";
import { createSeoMetadata } from "@/lib/seo";
import { site } from "@/lib/site-content";

export const metadata = createSeoMetadata({
  title: "Terms | Kelel IT Solutions",
  description:
    "Website terms for Kelel IT Solutions, including general use, inquiry handling, and project discussion limitations.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main className="stitch-page">
      <section className="page-hero">
        <div className="page-hero-inner">
          <nav className="page-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="page-crumbs-sep">/</span>
            <span>Terms</span>
          </nav>
          <h1 className="page-title-plain">Terms</h1>
          <p className="page-sub">
            These terms describe general use of the Kelel IT Solutions website.
          </p>
        </div>
      </section>
      <section className="stitch-section">
        <div className="stitch-container seo-article">
          <section className="seo-copy-block">
            <h2>Website information</h2>
            <p>
              The website describes Kelel IT Solutions services and capabilities. It is
              not a binding proposal, contract, warranty, or service-level commitment.
              Project scope, pricing, timelines, and responsibilities must be agreed in
              writing before work begins.
            </p>
          </section>
          <section className="seo-copy-block">
            <h2>Project inquiries</h2>
            <p>
              Submitting an inquiry does not create a client relationship by itself.
              Kelel IT Solutions may review the request and respond with questions,
              consultation options, or a proposal path.
            </p>
          </section>
          <section className="seo-copy-block">
            <h2>Accuracy and availability</h2>
            <p>
              We aim to keep website information accurate, but services, descriptions,
              and availability may change. We do not use this website to claim fake
              certifications, reviews, ratings, or client results.
            </p>
          </section>
          <section className="seo-copy-block">
            <h2>Contact</h2>
            <p>
              For questions about these terms, contact{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
