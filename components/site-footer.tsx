import { LogoMark } from "@/components/logo-mark";
import Link from "next/link";
import { site } from "@/lib/site-content";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Solutions" },
  { href: "/platforms", label: "Platform" },
  { href: "/about", label: "Company" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-primary">
        <div className="footer-brand">
          <LogoMark />
          <div>
            <span className="eyebrow">Kelel IT Solution</span>
            <strong className="footer-title">{site.tagline}</strong>
            <p className="footer-copy">{site.intro}</p>
          </div>
        </div>
        <div className="footer-actions">
          <Link href="/contact" className="primary-link">
            Get Started
          </Link>
          <Link href="/request-proposal?focus=dashboard&source=footer-architecture-proposal" className="secondary-link">
            Architecture Proposal
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
        <span>{site.hours}</span>
      </div>
    </footer>
  );
}
