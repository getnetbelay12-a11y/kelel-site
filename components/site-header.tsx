"use client";

import { LogoMark } from "@/components/logo-mark";
import Link from "next/link";
import { useState } from "react";
import { navLinks, site } from "@/lib/site-content";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={`site-header${isOpen ? " open" : ""}`}>
      <Link href="/" className="brand-mark">
        <LogoMark compact />
        <span className="brand-copy">
          <span className="brand-kicker">IT Solutions Company</span>
          <strong>{site.name}</strong>
        </span>
      </Link>

      <button
        type="button"
        className="menu-toggle"
        aria-expanded={isOpen}
        aria-controls="primary-nav"
        onClick={() => setIsOpen((current) => !current)}
      >
        Menu
      </button>

      <nav className="site-nav" id="primary-nav" aria-label="Primary">
        {navLinks.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="header-contact">
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <a href={`tel:${site.phone}`}>{site.phone}</a>
      </div>
    </header>
  );
}
