# Kelel Site — Redesign Audit

> Audit date: 2026-05-10. Branch: `redesign/full-rebuild`. Read-only — no source files were modified.

---

## 1. Routes under `app/`

| Route | File | Purpose |
|---|---|---|
| `/` | `app/page.tsx` | Homepage — hero with HeroDashboard widget, trust strip, Africa map, system topology, three service cards, industries, platform capabilities, AI systems, delivery steps, use cases, proof/case studies, final CTA + contact form |
| `/platform` | `app/platform/page.tsx` | Platform page — metrics hero, 4-up bento tech cards, tabbed SVG screen switcher, 4-node performance rings, 3-step architecture schema, CTA |
| `/intelligent-solutions` | `app/intelligent-solutions/page.tsx` | AI/intelligence page — hero with 2×2 bento viz, 4 capability cards, 6-step workflow pipeline, command center console, CTA |
| `/request-proposal` | `app/request-proposal/page.tsx` | "Start a Project" — split layout with static HTML form (no API wired, `action=""`) and HQ/quote cards; map section placeholder |
| `/about` | `app/about/page.tsx` | About — story cards, strengths grid, readiness grid, leadership card, CTA |
| `/contact` | `app/contact/page.tsx` | Contact — hero with contact card, 4 contact method cards, working ContactForm, what-happens-next steps, FAQ, CTA |
| `/services` | `app/services/page.tsx` | Services — 4 service cards with colored icons, process steps, engagement modes, sector fit links, CTA |
| `/work` | `app/work/page.tsx` | Case studies index — 3 project cards with challenge/outcome metadata |
| `/work/[slug]` | `app/work/[slug]/page.tsx` | Individual case study detail page (dynamic route from `projects` in site-content) |
| `/resources` | `app/resources/page.tsx` | Resource center — evidence register, resource explorer, formal materials list, reference library, case study links, sector links |
| `/trust` | `app/trust/page.tsx` | Trust & assurance — current signals, compliance readiness, evidence register, proof gallery, company profile download, FAQ |
| `/company-profile` | `app/company-profile/page.tsx` | Company profile viewer — PDF iframe preview, download, service highlights, proof gallery, readiness signals |
| `/review-checklist` | `app/review-checklist/page.tsx` | Structured buyer review checklist — grouped checklist cards, evidence register, contact CTA |
| `/industries/[slug]` | `app/industries/[slug]/page.tsx` | Industry sector page (dynamic, 4 slugs from `sectorPages` in site-content) — challenges, solutions, outcomes |
| `/inbox` | `app/inbox/page.tsx` | **OFF-LIMITS** — Internal CRM inbox with auth, lead management, pagination, owner assignment, follow-up reminders, audit trail |

### API routes (all OFF-LIMITS)

| Route | Purpose |
|---|---|
| `app/api/contact/route.ts` | Receives form submissions, writes JSON, triggers Telegram notification |
| `app/api/contact/[id]/archive/route.ts` | Archive a submission |
| `app/api/contact/[id]/follow-up/route.ts` | Set follow-up date |
| `app/api/contact/[id]/notes/route.ts` | Add notes to submission |
| `app/api/contact/[id]/owner/route.ts` | Assign owner |
| `app/api/contact/[id]/status/route.ts` | Update status (new/contacted/closed) |
| `app/api/contact/export/route.ts` | CSV export |
| `app/api/health/route.ts` | Health check endpoint |
| `app/api/inbox-auth/route.ts` | Inbox login/logout |
| `app/api/reminders/digest/route.ts` | Daily digest trigger |

---

## 2. Components grouped by purpose

### Layout (do NOT replace, restyle only)
| Component | Notes |
|---|---|
| `site-header.tsx` | Client component. Sticky blur header, hide-on-scroll, IntersectionObserver active-section tracking, brand mark + nav + ghost/CTA buttons. Active link underline in cyan. |
| `site-footer.tsx` | Server component. 4-col grid: brand tagline, services links, company links, contact links/CTA. Cyan glow top bar. |
| `site-effects.tsx` | Client component. Cursor dot + trailing ring animation, magnetic button effect. |
| `logo-mark.tsx` | Renders compact `K` badge or full SVG wordmark depending on prop. |

### Scroll / animation
| Component | Notes |
|---|---|
| `reveal-section.tsx` | Client component. IntersectionObserver wrapper — adds `.visible` class at 12% threshold. Fade+rise (opacity 0→1, translateY 22px→0, 520ms ease). Polymorphic via `as` prop. |

### Marketing sections
| Component | Notes |
|---|---|
| `nexus-africa-map.tsx` | Server component. SVG Africa continental outline + Ethiopia highlight + animated signal lines + traveling data packets + pulse rings. 6 city nodes. Scan line animation. Status badges overlaid. |
| `platform-screen-switcher.tsx` | Client component. 4 tabs (Dashboard / Transactions / Regional Nodes / Analytics) rendering SVG mockup screens. Uses `stitch-glass`. |
| `section-intro.tsx` | Simple eyebrow/title/description block. Used throughout admin/trust pages. |
| `brand-showcase.tsx` | Purpose unclear — not used in primary redesign pages. Likely legacy or trust-page proof display. |
| `hero-portrait-rotation.tsx` | Purpose unclear — not used in current active pages. Likely earlier hero concept. |
| `proof-gallery.tsx` | Used on trust + company-profile pages. Shows visual proof assets (PDF previews, screenshots). |
| `resource-explorer.tsx` | Client component. Search + filter UI for the resource center. |

### Forms (DO NOT REPLACE)
| Component | Notes |
|---|---|
| `contact-form.tsx` | Client component. POSTs to `/api/contact`. Supports compact mode (homepage), proposal mode (extra fields), and full mode. Telegram notification fires server-side. |
| `chat-with-kelel.tsx` | Client component. Floating chat widget — need-selection flow then phone+email capture, POSTs to `/api/contact` as JSON. |

### Admin / Inbox (DO NOT TOUCH — entire system off-limits)
| Component | Notes |
|---|---|
| `inbox-login-form.tsx` | Login for inbox auth |
| `inbox-logout-button.tsx` | Logout |
| `inbox-filter-form.tsx` | Search + status + owner + followUp filters |
| `inbox-status-form.tsx` | Status change per lead |
| `inbox-owner-form.tsx` | Owner assignment per lead |
| `inbox-follow-up-form.tsx` | Follow-up date per lead |
| `inbox-notes-form.tsx` | Notes per lead |
| `inbox-archive-button.tsx` | Archive/restore per lead |
| `inbox-export-button.tsx` | CSV export trigger |
| `inbox-digest-trigger.tsx` | Reminder digest trigger |
| `inbox-pagination.tsx` | Pagination controls |
| `submission-activity-timeline.tsx` | Per-lead activity history display |

### Trust / company
| Component | Notes |
|---|---|
| `company-profile-download.tsx` | Download PDF CTA block |
| `evidence-register.tsx` | Status table of available vs. pending proof assets |
| `executive-contact-card.tsx` | Card with Getnet Amdu Belay contact info |

### Shadcn/UI primitives (`components/ui/`)
| Component | Notes |
|---|---|
| `button.tsx` | CVA variants: default, outline, secondary, ghost, destructive, link. Sizes: xs, sm, default, lg, icon variants. |
| `card.tsx` | Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter. |
| `badge.tsx` | Pill badge with variant support. |
| `input.tsx` | Styled text input. |
| `textarea.tsx` | Styled textarea. |
| `navigation-menu.tsx` | Radix-based nav menu (not used in primary nav currently). |
| `separator.tsx` | Horizontal/vertical divider. |

---

## 3. CSS Custom Properties defined in `app/globals.css`

### Surfaces
| Token | Hex |
|---|---|
| `--obsidian` | `#0a0c10` |
| `--obsidian-2` | `#0f1218` |
| `--obsidian-3` | `#161a23` |
| `--obsidian-4` | `#1d212c` |

### Text scale
| Token | Hex |
|---|---|
| `--ink` | `#e8eaed` |
| `--ink-2` | `#b6bcc6` |
| `--ink-3` | `#6e7585` |
| `--ink-4` | `#454a55` |

### Primary — teal/cyan
| Token | Value |
|---|---|
| `--cyan` | `#4be3d6` |
| `--cyan-2` | `#6ef0e4` |
| `--cyan-glow` | `rgba(75, 227, 214, 0.18)` |
| `--cyan-deep` | `#2ba89e` |

### Secondary — amber
| Token | Value |
|---|---|
| `--amber` | `#f0a868` |
| `--amber-glow` | `rgba(240, 168, 104, 0.16)` |

### Status
| Token | Hex |
|---|---|
| `--green` | `#6ee7a8` |
| `--red` | `#ff7a7a` |

### Borders (glass hairlines)
| Token | Value |
|---|---|
| `--line` | `rgba(255, 255, 255, 0.08)` |
| `--line-2` | `rgba(255, 255, 255, 0.14)` |
| `--line-3` | `rgba(255, 255, 255, 0.22)` |

### Glass surfaces
| Token | Value |
|---|---|
| `--glass-bg` | `rgba(17, 35, 58, 0.60)` |
| `--glass-border` | `rgba(255, 255, 255, 0.10)` |
| `--glass-top` | `rgba(255, 255, 255, 0.18)` |

### Animation
| Token | Value |
|---|---|
| `--ease` | `cubic-bezier(0.16, 1, 0.3, 1)` |

### Legacy aliases (kept for backwards compat, resolve to tokens above)
`--bg`, `--surface`, `--surface-strong`, `--text`, `--muted`, `--accent`, `--accent-deep`, `--forest`, `--ink-strong`, `--ink-soft`, `--shadow`

### Shadcn/Tailwind tokens (do not touch, required by ui/ components)
`--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`, `--primary`, `--secondary`, `--destructive`, `--border`, `--input`, `--ring`, `--radius`, `--chart-1` through `--chart-5`, `--sidebar-*`

### Layout tokens
| Token | Value |
|---|---|
| `--enterprise-radius` | `16px` |
| `--enterprise-radius-sm` | `12px` |
| `--enterprise-shadow` | `0 22px 52px rgba(0, 0, 0, 0.45)` |
| `--enterprise-shadow-hover` | `0 28px 60px rgba(0, 0, 0, 0.55)` |

---

## 4. Font stack and typography rules

### Fonts loaded (Next.js Google Fonts in `app/layout.tsx`)
| Font | CSS variable | Usage |
|---|---|---|
| **Geist** | `--font-sans` | Body copy, buttons, UI labels |
| **Fraunces** | `--font-serif` | All headlines (H1/H2/H3), weights 300–700 |
| **JetBrains Mono** | `--font-mono` | Kickers, eyebrows, metric labels, technical text |

### Stitch design system type scale (used in all inner pages)
| Element | Rules |
|---|---|
| `.stitch-h1` | Fraunces, `clamp(36px, 5vw, 60px)`, weight 400, line-height 1.05, letter-spacing −0.025em. `em` child colored cyan and italic. |
| `.stitch-h2` | Fraunces, `clamp(28px, 3.5vw, 42px)`, weight 400, line-height 1.08, letter-spacing −0.02em. `em` child colored cyan and italic. |
| `.stitch-kicker` | JetBrains Mono, 11px, uppercase, letter-spacing 0.12em, pill border (`--line-2`), rounded-full. |
| `.stitch-body` | Geist, 16px, weight 400, line-height 1.65, color `--ink-2`, max-width 640px. |
| `.stitch-btn-primary` | Geist, 14px, weight 700, cyan gradient background, obsidian text, rounded 10px, 14px/28px padding. |
| `.stitch-btn-ghost` | Geist, 14px, weight 600, transparent + `--line-2` border, hover turns cyan border+text. |

### Homepage-specific type
| Element | Rules |
|---|---|
| `enterprise-hero h1` | Fraunces, `clamp(4rem, 7vw, 7.1rem)`, max-width 12ch |
| `enterprise-hero h2` | Fraunces, smaller sub-headline |
| `.enterprise-kicker` | JetBrains Mono capsule (same as stitch-kicker pattern) |

### Body defaults
- Base font size: 15px on `body`, `line-height: 1.55`
- Text rendering: antialiased + optimizeLegibility
- Selection: cyan background, obsidian text

---

## 5. What lives under `app/api/` and `app/inbox/` — OFF-LIMITS

### `app/api/` — complete off-limits
All routes here handle the contact form → JSON storage → Telegram notification pipeline.
- `contact/route.ts` writes to `data/contact-submissions.json` (local JSON file store), fires Telegram via nodemailer/fetch in `lib/lead-notifications.ts`
- Sub-routes at `/api/contact/[id]/*` mutate individual submissions in that JSON file
- `inbox-auth/route.ts` manages session cookies for the inbox
- `reminders/digest/route.ts` sends digest emails

**Do not touch any file in `app/api/` or `lib/contact-submissions.ts`, `lib/inbox-auth.ts`, `lib/inbox-audit.ts`, `lib/lead-notifications.ts`.**

### `app/inbox/` — complete off-limits
Full-featured internal CRM: authentication gate, per-lead management (status, owner, follow-up date, notes, archive), pagination, CSV export, audit trail. Uses 11+ dedicated inbox components. This is a working production system.

---

## 6. Components / pages I'm uncertain about

| Item | Uncertainty |
|---|---|
| `components/brand-showcase.tsx` | Not imported by any primary redesign page — likely old or trust-page only. Read before touching. |
| `components/hero-portrait-rotation.tsx` | Not found in current active pages — may be a scrapped hero concept. Read before touching. |
| `app/request-proposal/page.tsx` form | The HTML `<form action="" method="POST">` has **no API integration** — it will just reload the page on submit. The actual proposal collection likely relies on the `/contact` route + `ContactForm`. This page may need wiring or is intentionally static for now. Do not wire it to a new endpoint without checking. |
| `lib/site-content.ts` links | `businessResources` references `/platforms`, `/review-pack`, `/capability-matrix`, `/asset-guide`, `/asset-status` — **none of these routes exist** in `app/`. They are dead links in the resource center. |
| Inbox location mismatch | `app/inbox/page.tsx` shows "Kirkos Subcity" address; `request-proposal` shows the same; `contact` page shows same — but `lib/site-content.ts` `site.location` says "Addis Ababa, Ethiopia" and `site-footer.tsx` shows "Kirkos Subcity, Kebele 02/03". The kelel-design skill says "Bole Subcity" is the locked address. **Clarify which address is correct before redesign.** |
| `app/work/[slug]/page.tsx` | Not yet read — assumed to be a detail page rendering from `projects` in site-content. |

---

## Summary: Top 5 things to know before redesigning

1. **The CSS file is massive (407 KB).** `globals.css` contains CSS for every page, every component, and multiple historical design iterations. The "stitch" system (`.stitch-*` classes) is the current active design system used on all inner pages. The "enterprise" and "nexus" prefixes are the homepage-specific system. The file also contains dead or unused CSS from older iterations. Do not rewrite it wholesale — extend it section by section.

2. **The inbox + contact API is a fully working production system — do not break it.** `ContactForm`, `ChatWithKelel`, and all 11+ inbox components form an integrated CRM. Any redesign must keep these components wired exactly as they are. Restyling in place is allowed; replacing the component logic is not.

3. **Two button/CTA systems coexist.** Inner pages use `.stitch-btn-primary` / `.stitch-btn-ghost` (custom CSS). The homepage uses `.primary-link` / `.secondary-link`. The shadcn `Button` component exists in `components/ui/` but is not used on any page currently — it is only available for future use. Unify carefully.

4. **Several linked pages don't exist.** `businessResources` in `site-content.ts` links to `/platforms`, `/review-pack`, `/capability-matrix`, `/asset-guide`, `/asset-status` — none of these have `page.tsx` files. These are dead links visible in the resource center.

5. **The `request-proposal` form is not functional.** The `<form action="" method="POST">` in `/request-proposal/page.tsx` submits to nothing — it reloads the page. If the redesign spec calls for a working "Start a Project" form, it needs to be wired to `/api/contact` using the existing `ContactForm` component pattern, not a new endpoint.
