import { LogoMark } from "@/components/logo-mark";
import Link from "next/link";
import { site } from "@/lib/site-content";

const footerLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#solutions", label: "Solutions" },
  { href: "/#platform", label: "Platform" },
  { href: "/#company", label: "Company" },
  { href: "/#contact", label: "Contact" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-primary">
        <div className="footer-brand">
          <LogoMark compact />
          <div>
            <span className="eyebrow">Kelel IT Solution</span>
            <strong className="footer-title">
              Production-grade systems for banking, insurance, and enterprise operations
            </strong>
            <p className="footer-copy">
              Kelel IT Solution builds production-grade systems for banking, insurance, and
              enterprise operations across Africa.
            </p>
          </div>
        </div>
        <div className="footer-actions">
          <Link href="/contact" className="primary-link">
            Contact Kelel
          </Link>
          <Link
            href="/request-proposal?focus=business-systems&source=footer-enterprise-proposal"
            className="secondary-link"
          >
            Request Proposal
          </Link>
        </div>
      </div>

      <div className="footer-links">
        <span className="footer-column-title">Links</span>
        {footerLinks.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </div>

      <div className="footer-contact">
        <span className="footer-column-title">Contact</span>
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <a href={`tel:${site.phone}`}>{site.phone}</a>
        <span>{site.location}</span>
      </div>
      <div className="footer-legal">
        <span>{year} Kelel IT Solution</span>
        <span>
          Kelel IT Solution builds production-grade systems for banking, insurance, and
          enterprise operations across Africa.
        </span>
        <span>Built for secure workflows, operational visibility, and scalable platform delivery.</span>
      </div>
    </footer>
  );
}
