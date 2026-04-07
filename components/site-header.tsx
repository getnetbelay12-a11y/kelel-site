"use client";

import { LogoMark } from "@/components/logo-mark";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { site } from "@/lib/site-content";

const primaryLinks = [
  { href: "/#home", label: "Home", section: "home" },
  { href: "/#what-we-do", label: "What We Do", section: "what-we-do" },
  { href: "/#industries", label: "Industries", section: "industries" },
  { href: "/#platform", label: "Platform", section: "platform" },
  { href: "/#company", label: "Company", section: "company" },
  { href: "/#contact", label: "Contact", section: "contact" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) {
      return;
    }

    const ids = primaryLinks.map((item) => item.section);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((value): value is HTMLElement => Boolean(value));

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-22% 0px -55% 0px",
        threshold: [0.2, 0.35, 0.5, 0.75],
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [isHome]);

  const resolvedLinks = useMemo(
    () =>
      primaryLinks.map((item) => ({
        ...item,
        active: isHome ? activeSection === item.section : false,
      })),
    [activeSection, isHome],
  );

  return (
    <header className={`site-header${isOpen ? " open" : ""}${isScrolled ? " scrolled" : ""}`}>
      <Link href="/#home" className="brand-mark" onClick={() => setIsOpen(false)}>
        <LogoMark compact />
        <span className="brand-copy">
          <span className="brand-kicker">Ethiopia-first infrastructure</span>
          <strong>{site.name}</strong>
        </span>
      </Link>

      <button
        type="button"
        className="menu-toggle"
        aria-expanded={isOpen}
        aria-controls="primary-nav"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? "Close" : "Menu"}
      </button>

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

      <div className="header-actions">
        <Link href="/#contact" className="header-quick-link" onClick={() => setIsOpen(false)}>
          Start a Project
        </Link>
      </div>
    </header>
  );
}
