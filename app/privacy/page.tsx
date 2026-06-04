import Link from "next/link";
import { createSeoMetadata } from "@/lib/seo";
import { site } from "@/lib/site-content";

export const metadata = createSeoMetadata({
  title: "Privacy Policy | Kelel IT Solutions",
  description:
    "Privacy policy for Kelel IT Solutions explaining how project inquiries and contact information are handled.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="stitch-page">
      <section className="page-hero">
        <div className="page-hero-inner">
          <nav className="page-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="page-crumbs-sep">/</span>
            <span>Privacy Policy</span>
          </nav>
          <h1 className="page-title-plain">Privacy Policy</h1>
          <p className="page-sub">
            This page explains how Kelel IT Solutions handles information submitted
            through the website.
          </p>
        </div>
      </section>
      <section className="stitch-section">
        <div className="stitch-container seo-article">
          <section className="seo-copy-block">
            <h2>Information we collect</h2>
            <p>
              When you contact Kelel IT Solutions, we may collect your name, email,
              phone number, company name, project details, and any information you
              choose to include in the inquiry form.
            </p>
          </section>
          <section className="seo-copy-block">
            <h2>How we use information</h2>
            <p>
              We use submitted information to respond to inquiries, understand project
              requirements, prepare consultations or proposals, and maintain business
              communication related to requested services.
            </p>
          </section>
          <section className="seo-copy-block">
            <h2>Sharing and retention</h2>
            <p>
              We do not sell submitted contact information. Information may be shared
              only with people or service providers needed to respond to the inquiry,
              operate the website, or comply with legal obligations.
            </p>
          </section>
          <section className="seo-copy-block">
            <h2>Contact</h2>
            <p>
              For privacy questions, contact Kelel IT Solutions at{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
