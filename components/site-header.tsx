"use client";

import { LogoMark } from "@/components/logo-mark";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { site } from "@/lib/site-content";

const primaryLinks = [
  { href: "/#what-we-do", label: "Solutions", section: "what-we-do" },
  { href: "/platform", label: "Platform", section: "platform" },
  { href: "/intelligent-solutions", label: "Intelligence", section: "intelligence" },
  { href: "/#company", label: "Company", section: "company" },
  { href: "/#contact", label: "Contact", section: "contact" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isHidden, setIsHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (y > 80 && y > lastY) setIsHidden(true);
      else setIsHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const ids = primaryLinks.map((item) => item.section);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((value): value is HTMLElement => Boolean(value));
    if (elements.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-22% 0px -55% 0px", threshold: [0.2, 0.35, 0.5, 0.75] },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [isHome]);

  const resolvedLinks = useMemo(
    () =>
      primaryLinks.map((item) => ({
        ...item,
        active: isHome ? activeSection === item.section : pathname.startsWith(item.href.replace("/#", "/")),
      })),
    [activeSection, isHome, pathname],
  );

  return (
    <header className={`site-header nexus-header${isHidden ? " hidden" : ""}${isOpen ? " open" : ""}${scrolled ? " scrolled" : ""}`}>
      <div className="nav-inner">
        {/* Brand */}
        <Link href="/" className="brand-mark" onClick={() => setIsOpen(false)}>
          <LogoMark compact />
          <span className="brand-copy">
            <span className="brand-kicker">Addis Ababa · ET</span>
            <strong>{site.name}</strong>
          </span>
        </Link>

        {/* Primary nav */}
        <nav className="site-nav" id="primary-nav" aria-label="Primary">
          {resolvedLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={item.active ? "active" : undefined}
              aria-current={item.active ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <Link href="/contact" className="nexus-header-ghost" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
          <Link href="/request-proposal" className="nexus-header-cta" onClick={() => setIsOpen(false)}>
            Start a Project
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={isOpen}
            aria-controls="primary-nav"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}
