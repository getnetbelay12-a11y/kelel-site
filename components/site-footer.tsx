import Link from "next/link";
import { site } from "@/lib/site-content";

const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#what-we-do", label: "Solutions" },
  { href: "/#platform", label: "Platform" },
  { href: "/#company", label: "Company" },
  { href: "/#contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services?focus=platform-architecture", label: "Platform Architecture" },
  { href: "/services?focus=system-optimization", label: "Performance" },
  { href: "/services?focus=data-infrastructure", label: "Data Infrastructure" },
  { href: "/work", label: "Our Work" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-mark">
              <span>K</span>
            </div>
            <p>
              Kelel IT Solution builds production-grade platforms for banking, insurance, and
              enterprise operations across Africa. Based in Addis Ababa.
            </p>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            {serviceLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={`tel:${site.phone}`}>{site.phone}</a>
            <span>{site.location}</span>
            <Link href="/contact" className="footer-cta-link">
              Start a Project →
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} Kelel IT Solution</span>
          <span>Built in Addis Ababa, Ethiopia</span>
        </div>
      </div>
    </footer>
  );
}
