# Kelel Dark Fintech Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the dark fintech aesthetic from the static redesign reference into the live Next.js app, restyling all visible UI while preserving every backend route, API handler, inbox system, and Telegram notification.

**Architecture:** Replace CSS design tokens and restyle component CSS class rules in globals.css. Update layout.tsx for the three-font system. Never delete routes or API handlers — only restyle.

**Tech Stack:** Next.js 16, React 19, globals.css (flat CSS, no Tailwind), next/font/google

---

## Commit 1: Font system + CSS variables

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css` (`:root` block, lines 1–30)

- [ ] Swap Manrope/Playfair for Fraunces/Geist/JetBrains_Mono in layout.tsx
- [ ] Add `--font-mono` variable to site-frame className
- [ ] Replace `:root` color tokens with obsidian/cyan/amber palette
- [ ] Commit: `style: migrate design tokens and font system to dark fintech palette`

## Commit 2: Body + atmosphere + base typography

**Files:**
- Modify: `app/globals.css` (body, ::before/::after, base type)

- [ ] Dark background, cyan/amber radial gradients, noise SVG overlay
- [ ] `::selection` with cyan, base link color, font smoothing
- [ ] Commit: `style: apply dark atmosphere and base typography`

## Commit 3: Header restyle

**Files:**
- Modify: `app/globals.css` (all .site-header, .brand-mark, .site-nav rules)
- Modify: `components/site-header.tsx` (add hide-on-scroll, preserve all logic)

- [ ] Dark glass nav, cyan active underline
- [ ] Hide-on-scroll behavior in SiteHeader component
- [ ] Commit: `style: restyle site header to dark fintech nav`

## Commit 4: Footer restyle

**Files:**
- Modify: `app/globals.css` (all .site-footer, .footer-* rules)
- Modify: `components/site-footer.tsx` (update HTML structure for grid layout)

- [ ] Dark footer with 4-column grid
- [ ] Commit: `style: restyle site footer to dark fintech layout`

## Commit 5: Homepage hero + shared section patterns

**Files:**
- Modify: `app/globals.css` (enterprise-hero, enterprise-section, kicker, buttons)
- Modify: `app/page.tsx` (class name updates where needed)

- [ ] Restyle hero sections, section labels, primary/secondary buttons
- [ ] Commit: `style: restyle homepage hero and shared section patterns`

## Commit 6: Homepage cards + console + chat widget

**Files:**
- Modify: `app/globals.css` (enterprise cards, console, case study, metrics, chat)

- [ ] Restyle all homepage card types, operations console, chat panel
- [ ] Commit: `style: restyle homepage cards, console, and chat widget`

## Commit 7: Secondary page styles

**Files:**
- Modify: `app/globals.css` (page-shell, section-heading, contact-form, page-specific)

- [ ] Dark contact form inputs, section headings, card surfaces for inner pages
- [ ] Commit: `style: restyle secondary pages and contact form`

## Commit 8: Interactive polish + build verification

**Files:**
- Create: `components/site-effects.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css` (cursor, magnetic button rules)

- [ ] Custom cursor component with useEffect
- [ ] Magnetic button + spotlight hover CSS
- [ ] Run `npm run build` and confirm pass
- [ ] Commit: `style: add interactive effects and verify build`
