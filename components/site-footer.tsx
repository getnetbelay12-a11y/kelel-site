import Link from "next/link";
import { site } from "@/lib/site-content";
import { servicePages, solutionPages } from "@/lib/seo-pages";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="kf-footer">
      {/* Top glow bar */}
      <div className="kf-top-bar" aria-hidden="true" />

      <div className="kf-container">
        <div className="kf-grid">

          {/* Brand column */}
          <div className="kf-brand-col">
            <div className="kf-mark">
              <span>K</span>
            </div>
            <p className="kf-tagline">
              Production-grade websites, software platforms, and IT services for
              businesses operating locally and internationally.
            </p>
            <div className="kf-location">
              <span className="kf-location-dot" aria-hidden="true" />
              U.S. contact · Las Vegas, Nevada
            </div>
          </div>

          {/* Services column */}
          <div className="kf-col">
            <h4 className="kf-col-heading">Services</h4>
            {servicePages.slice(0, 7).map((page) => (
              <Link key={page.path} href={page.path}>{page.serviceType}</Link>
            ))}
          </div>

          {/* Company column */}
          <div className="kf-col">
            <h4 className="kf-col-heading">Solutions</h4>
            {solutionPages.map((page) => (
              <Link key={page.path} href={page.path}>{page.serviceType}</Link>
            ))}
            <Link href="/services/erp-software-ethiopia">ERP &amp; Integration</Link>
            <Link href="/services/cybersecurity-company-ethiopia">Cybersecurity</Link>
          </div>

          {/* Contact column */}
          <div className="kf-col">
            <h4 className="kf-col-heading">Contact</h4>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={`tel:${site.phone.replaceAll("-", "")}`}>{site.phone}</a>
            <a href={`tel:${site.secondaryPhone}`}>{site.secondaryPhone}</a>
            <span>{site.usAddress}</span>
            <span>Kirkos Subcity, Kebele 02/03<br />Addis Ababa, Ethiopia</span>
            <Link href="/contact" className="kf-cta">
              Book a Call →
            </Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="kf-bottom">
          <span>© {year} Kelel IT Solutions. All rights reserved.</span>
          <span className="kf-bottom-right">
            International delivery · Business websites and systems
          </span>
        </div>
      </div>
    </footer>
  );
}
