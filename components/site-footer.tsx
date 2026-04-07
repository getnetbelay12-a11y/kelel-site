import { LogoMark } from "@/components/logo-mark";
import Link from "next/link";
import { navLinks, site } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <div className="footer-brand">
          <LogoMark />
          <div>
            <span className="eyebrow">Kelel IT Solution</span>
            <strong className="footer-title">{site.tagline}</strong>
            <p className="footer-copy">{site.intro}</p>
          </div>
        </div>
        <div className="footer-leadership">
          <strong>{site.contactPerson}</strong>
          <span>{site.contactRole}</span>
        </div>
      </div>

      <div className="footer-links">
        {navLinks.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <Link href="/company-profile">Company Profile</Link>
      </div>

      <div className="footer-contact">
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <span>{site.phone}</span>
        <span>{site.location}</span>
        <span>{site.hours}</span>
      </div>
    </footer>
  );
}
