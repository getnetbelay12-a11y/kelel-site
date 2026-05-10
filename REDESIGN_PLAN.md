# Kelel Site — Redesign Plan

> Build order, file-level actions, component decisions, risks.
> Hard constraint: app/api/**, app/inbox/**, app/trust/, and the five contact-pipeline libs are immutable.

---

## 1. File Actions

### CREATE (new files)

| File | Purpose |
|---|---|
| `components/roi-calculator.tsx` | Interactive ROI calculator — 3 tabs (Banking/Insurance/Enterprise) + 3 sliders + 3 KPI result cards. Client component. |
| `components/homepage-hero.tsx` | Extracts homepage hero into its own component — left text col + right widget col. Server wrapper, inner interactive parts client. |
| `components/capabilities-section.tsx` | 3-col capability card grid with mouse-tracking spotlight radial. Client (for mouse events). |
| `components/platform-showcase.tsx` | Homepage platform feature list (sticky, 4 items) + tabbed SVG screen switcher. Client (for active-item switching). |
| `components/industry-grid.tsx` | 2×2 hairline industry cards with hover cyan top-border reveal. Server component. |
| `components/process-track.tsx` | 4-col dashed process step track + stats band. Server component. |
| `components/cta-band.tsx` | Reusable centered CTA box (dual radial gradients, cyan top hairline). Server component. Props: heading, sub, primaryLabel, primaryHref, ghostLabel, ghostHref. |
| `components/marquee-strip.tsx` | Infinite horizontal scroll marquee. Client (requestAnimationFrame). Takes array of string items. |
| `components/page-hero.tsx` | Reusable inner-page hero: breadcrumb + 2-col (eyebrow + page-title + sub / meta table). Server component. |
| `components/manifesto-section.tsx` | About page manifesto: sticky mono aside + large Fraunces body text. Server component. |
| `components/principles-grid.tsx` | About 2×2 principle cards (hairline grid). Server component. |
| `components/timeline-section.tsx` | About vertical timeline (cyan→amber gradient line, bullet circles). Server component. |
| `components/african-context.tsx` | About African market context: text + 2×2 stats grid + SVG mini Africa map. Server component. |
| `components/direct-contact-cards.tsx` | Contact page right column: email/phone/location/response-time/LinkedIn cards. Server component. |
| `components/multi-step-form.tsx` | Contact page multi-step form wrapper (4-step: type → industry → brief → contact info). Client component. Calls ContactForm internally for the actual POST. |
| `components/engagement-cards.tsx` | Services page 3 engagement model cards (Diagnostic / Platform / Retainer). Featured card gets cyan border + badge. Server component. |
| `components/faq-accordion.tsx` | Services page FAQ accordion with Fraunces question text + max-height expand. Client component. |
| `components/service-section.tsx` | Services page individual service block: sticky aside + 4-tab content panel. Client (tab switching). |

### MODIFY (existing files — markup + CSS, logic unchanged unless noted)

| File | Change scope |
|---|---|
| `app/globals.css` | Extend section-by-section. Add: `.section-label`, `.eyebrow`, `.page-title`, `.page-hero-grid`, `.page-meta`, `.cap-card`, `.ind-card`, `.process-track`, `.stats-band`, `.cta-band-inner`, `.marquee-track`, `.multi-step-form`, `.option-btn`, `.direct-card`, `.timeline`, `.principles-grid`, `.manifesto-grid`, `.role-card`, `.context-stats`. All new classes — no deletions of existing classes. |
| `app/page.tsx` | Full rewrite of markup. Keep: ContactForm, ChatWithKelel, NexusAfricaMap. Replace all inline component definitions (OperationsConsole, HeroDashboard) with the new extracted components. New section order: Hero → Marquee → Capabilities → Platform Showcase → Industries → Process → CTA. Remove ROI calc if not ready (add placeholder). |
| `app/about/page.tsx` | Rebuild markup to match reference: hero → manifesto → principles → team → timeline → context → CTA. Retain existing data from `site-content`. |
| `app/contact/page.tsx` | Rebuild markup: page-hero + 2-col (MultiStepForm left, DirectContactCards right). Keep existing ContactForm wired inside MultiStepForm for the POST. |
| `app/services/page.tsx` | Rebuild markup: page-hero + 3× ServiceSection + IndustryDeepDive grid + EngagementCards + FAQ + CTA. |
| `app/work/page.tsx` | Restyle 3 project cards to match reference card pattern. |
| `app/work/[slug]/page.tsx` | Restyle detail page: page-hero + challenge/solution/outcome sections. |
| `app/platform/page.tsx` | Align to stitch design system. Update metrics hero cards, bento cards, performance rings, architecture schema, CTA to new token usage. |
| `app/intelligent-solutions/page.tsx` | Align to stitch design system. Hero bento, capability cards, workflow pipeline, console, CTA. |
| `app/resources/page.tsx` | Restyle to stitch design system. Fix or remove the 5 dead navigation links. |
| `app/industries/[slug]/page.tsx` | Restyle: page-hero + challenges/solutions/outcomes sections. |
| `app/review-checklist/page.tsx` | Restyle to stitch design system. |
| `app/company-profile/page.tsx` | Restyle to stitch design system. |
| `components/nexus-africa-map.tsx` | Keep all SVG + animation logic. Update wrapper classes to align with new design tokens. |
| `components/platform-screen-switcher.tsx` | Keep tab logic. Update SVG screens to match new design patterns. |
| `components/site-header.tsx` | CSS restyle only. Update active link styles, button variants, nav link hover to match new design. Do NOT touch JS/scroll logic. |
| `components/site-footer.tsx` | CSS restyle only. Update grid, typography, link styles. |
| `components/section-intro.tsx` | Restyle to use `.section-label` + `.stitch-h2` + `.stitch-body` classes. |
| `components/reveal-section.tsx` | Add `prefers-reduced-motion` override to the CSS it triggers. No logic change. |

### KEEP AS-IS (no modifications)

| File | Reason |
|---|---|
| `app/api/**` | Complete off-limits — contact + CRM pipeline |
| `app/inbox/**` | Complete off-limits — production CRM |
| `app/trust/page.tsx` | Off-limits per kelel-design skill |
| `app/request-proposal/page.tsx` | Off-limits per kelel-design skill (broken form noted as risk — see §4) |
| `components/contact-form.tsx` | Production-wired — restyle by updating CSS classes it uses, not the TSX |
| `components/chat-with-kelel.tsx` | Production-wired — restyle via CSS only |
| `components/site-effects.tsx` | Cursor + magnetic effects — no change needed |
| `components/logo-mark.tsx` | Logo unchanged |
| `components/inbox-*.tsx` (×11) | Off-limits CRM components |
| `components/company-profile-download.tsx` | Trust page component — leave alone |
| `components/evidence-register.tsx` | Trust page component — leave alone |
| `components/executive-contact-card.tsx` | Trust page component — leave alone |
| `components/proof-gallery.tsx` | Trust page component — leave alone |
| `components/ui/*.tsx` (×7 shadcn) | Shadcn primitives — stable, no changes |
| `lib/site-content.ts` | Content data — no structural changes |
| `lib/contact-submissions.ts` | Off-limits |
| `lib/inbox-auth.ts` | Off-limits |
| `lib/inbox-audit.ts` | Off-limits |
| `lib/lead-notifications.ts` | Off-limits |
| `app/layout.tsx` | Font stack + metadata already correct |
| `next.config.ts` | Off-limits |
| `vercel.json` | Off-limits |

### DELETE

None at this stage. The `brand-showcase.tsx` and `hero-portrait-rotation.tsx` components appear unused but deletion requires confirming no import exists. Mark for deletion after the build only if grep confirms they are unreferenced.

---

## 2. Per-Component Decision Summary

| Component | Decision | Notes |
|---|---|---|
| `site-header.tsx` | **Restyle only** | CSS class updates; scroll/observer logic untouched |
| `site-footer.tsx` | **Restyle only** | Grid + typography via CSS |
| `site-effects.tsx` | **Keep** | Cursor + magnetic already correct |
| `contact-form.tsx` | **Keep** | POSTs to /api/contact — wrap in new styled container |
| `chat-with-kelel.tsx` | **Keep** | POSTs to /api/contact — styled via CSS |
| `reveal-section.tsx` | **Keep + patch** | Add prefers-reduced-motion override |
| `nexus-africa-map.tsx` | **Keep + restyle** | SVG + animation untouched; wrapper classes updated |
| `platform-screen-switcher.tsx` | **Keep + restyle** | Tab logic untouched; screen SVGs and wrapper updated |
| `section-intro.tsx` | **Restyle** | Apply stitch type classes |
| `brand-showcase.tsx` | **Freeze** | Unused — do not touch, do not delete yet |
| `hero-portrait-rotation.tsx` | **Freeze** | Unused — do not touch, do not delete yet |
| `proof-gallery.tsx` | **Keep** | Trust/company-profile pages are off-limits |
| `resource-explorer.tsx` | **Restyle** | Update to new design tokens |
| `evidence-register.tsx` | **Keep** | Off-limits context |
| `executive-contact-card.tsx` | **Keep** | Off-limits context |
| `company-profile-download.tsx` | **Keep** | Off-limits context |
| All `inbox-*.tsx` | **Untouched** | Off-limits CRM |

---

## 3. Build Order

Execute in this order. Each item should be committed separately before moving to the next.

### Phase 0 — CSS foundation
1. Add new CSS classes to `app/globals.css` (section-label, eyebrow, page-hero, page-title, cap-card, ind-card, process-track, stats-band, cta-band-inner, marquee-track, multi-step-form option-btn, direct-card, timeline, principles-grid, role-card, context-stats). Do not touch existing classes.

### Phase 1 — Homepage (highest impact, highest visibility)
2. `components/cta-band.tsx` — reusable across all pages, build first
3. `components/page-hero.tsx` — reusable across all inner pages
4. `components/marquee-strip.tsx`
5. `components/capabilities-section.tsx`
6. `components/platform-showcase.tsx`
7. `components/industry-grid.tsx`
8. `components/process-track.tsx`
9. `components/homepage-hero.tsx`
10. `app/page.tsx` — assemble homepage using new components + existing ContactForm/NexusAfricaMap/ChatWithKelel

### Phase 2 — /platform and /intelligent-solutions
11. `app/platform/page.tsx` — restyle to stitch system
12. `app/intelligent-solutions/page.tsx` — restyle to stitch system

### Phase 3 — /about
13. `components/manifesto-section.tsx`
14. `components/principles-grid.tsx`
15. `components/timeline-section.tsx`
16. `components/african-context.tsx`
17. `app/about/page.tsx`

### Phase 4 — /contact
18. `components/direct-contact-cards.tsx`
19. `components/multi-step-form.tsx`
20. `app/contact/page.tsx`

### Phase 5 — /services
21. `components/service-section.tsx`
22. `components/engagement-cards.tsx`
23. `components/faq-accordion.tsx`
24. `app/services/page.tsx`

### Phase 6 — /work
25. `app/work/page.tsx`
26. `app/work/[slug]/page.tsx`

### Phase 7 — remaining pages
27. `app/industries/[slug]/page.tsx`
28. `app/resources/page.tsx`
29. `app/review-checklist/page.tsx`
30. `app/company-profile/page.tsx`

### Phase 8 — cleanup
31. Grep for `brand-showcase` and `hero-portrait-rotation` imports — delete files if truly unused
32. Audit dead links in `lib/site-content.ts` `businessResources` — remove or stub
33. Final visual pass with Playwright screenshots

---

## 4. Risk List

| Risk | Severity | Mitigation |
|---|---|---|
| `globals.css` (407 KB) — accidental deletion of existing working CSS | High | Only append to file. Never delete selectors. Run `npm run build` after each CSS change. |
| `app/request-proposal/page.tsx` — form submits to nowhere | Medium | Per kelel-design skill, this page is off-limits for rewriting. Accepted known defect. Do NOT wire it to `/api/contact` without explicit user approval — that would require touching an off-limits file. |
| `app/trust/page.tsx` — off-limits but visually outdated | Low | Leave unstyled. Not a public-facing priority page. |
| ROI calculator — sliders require state and may need server action or client component | Medium | Build as client component with no backend. Values are illustrative/modeled (label them as such). No real API calls. |
| Multi-step contact form — duplicating ContactForm logic | High | The `multi-step-form.tsx` should NOT replicate the POST logic. Steps 1–3 collect data client-side; step 4's "Submit" renders `ContactForm` with pre-filled fields OR calls the ContactForm's POST directly. Do not create a new endpoint. |
| @react-three/fiber globe — bundle size + SSR | Medium | Wrap in `dynamic(() => import(...), { ssr: false })`. Add `prefers-reduced-motion` fallback that shows a static SVG map. May be deferred from Phase 1 if it delays the hero. |
| Marquee — accessibility | Low | Add `aria-hidden="true"` on decorative marquee. Respect `prefers-reduced-motion` by pausing animation. |
| Dead links in `/resources` | Low | Remove the 5 dead links (`/platforms`, `/review-pack`, `/capability-matrix`, `/asset-guide`, `/asset-status`) during Phase 7. They're in `lib/site-content.ts` `businessResources`. |
| Two button systems — stitch vs. enterprise/nexus | Medium | Standardize: all inner pages use `.stitch-btn-*`; homepage uses `.primary-link` / `.secondary-link` OR the new CTA button classes. Never mix on the same page. The shadcn `Button` component is available but should not be introduced on new pages yet. |
| `RevealSection` + SSR | Low | Already a client component with IntersectionObserver. No change needed. Ensure `prefers-reduced-motion` override is in CSS. |

---

## 5. Do-Not-Touch Checklist

Before every commit, verify these files are unchanged:

- [ ] `app/api/` — every file in this directory
- [ ] `app/inbox/` — every file in this directory
- [ ] `app/trust/page.tsx`
- [ ] `app/request-proposal/page.tsx`
- [ ] `components/contact-form.tsx`
- [ ] `components/chat-with-kelel.tsx`
- [ ] `components/inbox-*.tsx` (11 files)
- [ ] `lib/contact-submissions.ts`
- [ ] `lib/lead-notifications.ts`
- [ ] `lib/inbox-auth.ts`
- [ ] `lib/inbox-audit.ts`
- [ ] `next.config.ts`
- [ ] `vercel.json`
- [ ] Brand contact: `info@kelelitsolution.com` / `+251 942 137 249` / `Bole Subcity, Addis Ababa`
