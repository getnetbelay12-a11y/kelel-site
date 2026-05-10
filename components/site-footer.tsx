import Link from "next/link";
import { site } from "@/lib/site-content";

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
              Production-grade digital infrastructure for banking, insurance,
              and enterprise operations across Africa.
            </p>
            <div className="kf-location">
              <span className="kf-location-dot" aria-hidden="true" />
              Addis Ababa, Ethiopia
            </div>
          </div>

          {/* Services column */}
          <div className="kf-col">
            <h4 className="kf-col-heading">Services</h4>
            <Link href="/services?focus=platform-architecture">Platform Architecture</Link>
            <Link href="/services?focus=system-optimization">Performance Optimization</Link>
            <Link href="/services?focus=data-infrastructure">Data Infrastructure</Link>
            <Link href="/intelligent-solutions">AI &amp; Intelligent Systems</Link>
            <Link href="/platform">Platform Core</Link>
          </div>

          {/* Company column */}
          <div className="kf-col">
            <h4 className="kf-col-heading">Company</h4>
            <Link href="/#what-we-do">What We Do</Link>
            <Link href="/#industries">Industries</Link>
            <Link href="/work">Our Work</Link>
            <Link href="/#company">About</Link>
            <Link href="/request-proposal">Start a Project</Link>
          </div>

          {/* Contact column */}
          <div className="kf-col">
            <h4 className="kf-col-heading">Contact</h4>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={`tel:${site.phone}`}>{site.phone}</a>
            <span>Kirkos Subcity, Kebele 02/03<br />Addis Ababa, Ethiopia</span>
            <Link href="/contact" className="kf-cta">
              Book a Call →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="kf-bottom">
          <span>© {year} Kelel IT Solution. All rights reserved.</span>
          <span className="kf-bottom-right">
            Built for Africa · Enterprise infrastructure
          </span>
        </div>
      </div>
    </footer>
  );
}
