# Kelel Site — Design Spec

> Derived from: `~/Documents/kelel-redesign-reference/kelel-site/` (index.html, services.html, about.html, contact.html, css/kelel.css).
> Spec only — no component code. All token names reference existing `app/globals.css` variables.

---

## 1. Color Palette

All colors map directly to existing CSS custom properties. Never use raw hex in components.

| Purpose | Token | Notes |
|---|---|---|
| Page background | `--obsidian` (`#0a0c10`) | Base. Used on `body` and dark section backgrounds |
| Surface level 1 | `--obsidian-2` (`#0f1218`) | Cards, form backgrounds, elevated sections |
| Surface level 2 | `--obsidian-3` (`#161a23`) | Icon wells, nested cards, pill backgrounds |
| Surface level 3 | `--obsidian-4` (`#1d212c`) | Highest elevation surfaces, hover states |
| Primary accent | `--cyan` (`#4be3d6`) | Active states, hero gradient text, section accents — use sparingly |
| Cyan lighter | `--cyan-2` (`#6ef0e4`) | Hover glow, gradient end |
| Cyan glow | `--cyan-glow` (`rgba(75,227,214,0.18)`) | Box-shadows, selected-card backgrounds, radial overlays |
| Cyan deep | `--cyan-deep` (`#2ba89e`) | Gradient start on some text |
| Secondary accent | `--amber` (`#f0a868`) | Hero H1 gradient end, timeline gradient, counter numbers |
| Amber glow | `--amber-glow` (`rgba(240,168,104,0.16)`) | CTA radial gradients |
| Success | `--green` (`#6ee7a8`) | Status dots, uptime badges, success states |
| Text primary | `--ink` (`#e8eaed`) | Body text, card values |
| Text secondary | `--ink-2` (`#b6bcc6`) | Descriptions, sub-labels |
| Text tertiary | `--ink-3` (`#6e7585`) | Eyebrow labels, metadata |
| Text disabled | `--ink-4` (`#454a55`) | Inactive, placeholder |
| Border hairline | `--line` (`rgba(255,255,255,0.08)`) | Default card borders, grid dividers |
| Border mid | `--line-2` (`rgba(255,255,255,0.14)`) | Form inputs, focused states, hover upgrades |
| Border bright | `--line-3` (`rgba(255,255,255,0.22)`) | Active/selected borders |

### Gradient patterns used in the reference
- **H1 gradient text**: `linear-gradient(120deg, var(--cyan), var(--amber))` applied with `-webkit-background-clip:text`
- **Stat numbers**: same cyan→amber gradient, `font-style:italic`
- **CTA box dual radial**: `radial-gradient(ellipse at top right, var(--amber-glow), transparent 60%)` + `radial-gradient(ellipse at bottom left, var(--cyan-glow), transparent 60%)` over `var(--obsidian-2)`
- **Card hover spotlight**: `radial-gradient(circle at var(--mx) var(--my), rgba(75,227,214,0.07), transparent 50%)` — tracks mouse position via CSS vars
- **Timeline vertical line**: `linear-gradient(180deg, var(--cyan), var(--amber), transparent)`
- **Form card top hairline**: `linear-gradient(90deg, transparent, var(--cyan), transparent)` on `::before`

---

## 2. Typography Hierarchy

### Fonts
| Family | CSS Variable | Weight used |
|---|---|---|
| Fraunces (serif) | `--font-serif` / `var(--serif)` | 300, 400, 500, 600, 700 |
| Geist (sans) | `--font-sans` / `var(--sans)` | 300, 400, 500, 600, 700 |
| JetBrains Mono | `--font-mono` / `var(--mono)` | 300, 400, 500, 600 |

### Scale

| Element | Font | Size | Weight | Line-height | Letter-spacing | Notes |
|---|---|---|---|---|---|---|
| Homepage H1 | Fraunces | `clamp(4rem, 7vw, 7.1rem)` | 400 | 1.0 | −0.03em | `em` children: italic, gradient text |
| Inner page title (`.page-title`) | Fraunces | `clamp(48px, 7vw, 96px)` | 400 | 1.0 | −0.03em | Gradient text (cyan→amber), `em` italic |
| Section title (`.section-title`) | Fraunces | `clamp(32px, 4vw, 54px)` | 400 | 1.1 | −0.025em | max-width:780px, `em` → cyan italic |
| Card title large | Fraunces | 24–26px | 500 | 1.2 | −0.02em | Used on capability cards, principle names |
| Card title medium | Fraunces | 20–22px | 500 | 1.25 | −0.015em | Role cards, timeline items |
| Manifesto body | Fraunces | `clamp(22px, 2.4vw, 32px)` | 400 | 1.35 | −0.015em | `em` cyan, `strong` underlined with cyan 1px |
| CTA headline | Fraunces | `clamp(32px, 4vw, 52px)` or `clamp(36px, 4.6vw, 60px)` | 400 | 1.0 | −0.03em | `em` cyan italic |
| Form headline | Fraunces | 32px | 500 | 1.2 | −0.02em | Contact/multi-step form title |
| Step question | Fraunces | 24px | 500 | 1.3 | −0.015em | Multi-step form question heading |
| Section intro (`.section-intro`) | Geist | 17px | 400 | 1.65 | normal | `--ink-2`, max-width:600px |
| Body copy | Geist | 15–16px | 400 | 1.65–1.7 | normal | `--ink-2` |
| Section label | JetBrains Mono | 11px | 400 | 1 | 0.12em | Uppercase, flex with cyan 24×1px `::before` line |
| Eyebrow pill | JetBrains Mono | 11px | 400 | 1 | 0.1–0.12em | Uppercase, `--line-2` border, rounded-full, pulse dot |
| Kicker / step label | JetBrains Mono | 11px | 400 | 1 | 0.12em | `--cyan` color, uppercase |
| Metric value | Fraunces | 36–42px | italic | 1 | normal | Gradient text, italic |
| Stat number | Fraunces | 36px | italic | 1 | normal | `background-clip:text`, cyan→amber gradient |
| Meta table value | Fraunces | 20px | 500 | 1.3 | −0.015em | Direct contact cards value |
| Tag / pill label | JetBrains Mono | 10–11px | 400 | 1 | 0.08em | `--obsidian-3` bg or `rgba(255,255,255,0.03)` |
| Footer label | JetBrains Mono | 10.5px | 400 | 1 | 0.1em | Uppercase |

### Rules
- Italic + cyan is the primary emphasis mechanic: `<em>word</em>` inside headlines = italic + `color:var(--cyan)`
- `strong` inside body text = weight 500 + thin cyan underline `::after` (height 1px, opacity 0.5)
- Page-title gradient italic: `font-style:italic; background:linear-gradient(120deg,var(--cyan),var(--amber)); -webkit-background-clip:text; color:transparent`

---

## 3. Spacing Scale and Grid

### Container
```
max-width: 1180px
padding: 0 40px (desktop) → 0 24px (≤ 780px) → 0 18px (≤ 480px)
margin: 0 auto
```

### Section padding
| Context | Padding |
|---|---|
| Standard section | `120px 0` |
| Compact section | `80px 0` |
| Page hero | `160px 0 80px` (top clears sticky nav) |
| Footer | `80px 0 32px` |
| CTA band | `120px 0` |

### Grid patterns
| Layout | CSS | Used in |
|---|---|---|
| Homepage hero | `grid-template-columns: 1.05fr 1fr; gap: 60-80px` | Hero 2-col |
| Inner page hero | `grid-template-columns: 1.4fr 1fr; gap: 80px` | `.page-hero-grid` |
| Capabilities | `grid-template-columns: repeat(3,1fr); gap: 24px` | Cap cards |
| Industries | `grid-template-columns: repeat(2,1fr); gap: 1px; background:var(--line)` | Industry cards (hairline grid) |
| Principles | `grid-template-columns: repeat(2,1fr); gap: 1px; background:var(--line)` | About principles |
| Process | `grid-template-columns: repeat(4,1fr)` | Process steps |
| Stats band | `grid-template-columns: repeat(4,1fr)` | Below process |
| Contact | `grid-template-columns: 1.4fr 1fr; gap: 64px` | Form + direct cards |
| Manifesto | `grid-template-columns: 1fr 1.6fr; gap: 80px` | About manifesto |
| Platform showcase | `grid-template-columns: 1fr 1.4fr; gap: 64px` | Feature list + screens |
| Service section | `grid-template-columns: 1fr 1.4fr; gap: 64px` | Sticky aside + tabs |
| Role cards | `grid-template-columns: repeat(3,1fr); gap: 24px` | Team disciplines |
| Context stats | `grid-template-columns: repeat(2,1fr); gap: 1px` | African context stats |
| ROI calculator | `grid-template-columns: 1fr 1.4fr; gap: 48px` | Calculator layout |

### Card internal spacing
| Context | Value |
|---|---|
| Standard card padding | `32–40px` |
| Compact card padding | `24–28px` |
| Icon well size (large) | `56px × 56px` |
| Icon well size (medium) | `48px × 48px` |
| Icon well size (small) | `42px × 42px` |
| Icon well border-radius | `10–12px` |
| Card border-radius | `12–18px` |
| CTA box border-radius | `24px` |

---

## 4. Component Patterns

### 4.1 Primary CTA Button (`.btn-primary`)
```css
background: var(--cyan);       /* solid cyan */
color: var(--obsidian);        /* dark text on bright bg */
font-family: var(--sans);
font-size: 14px;
font-weight: 700;
padding: 14px 28px;
border-radius: 10px;
border: none;
transition: all 0.25s var(--ease);
/* hover: slight scale + glow */
/* .btn-magnetic: JS applies translate offset on mouse proximity */
```
Variants: `.btn-lg` adds more padding; default arrow `→` appended inline.

### 4.2 Ghost / Secondary Button (`.btn-ghost`)
```css
background: transparent;
color: var(--ink);
border: 1px solid var(--line-2);
font-family: var(--sans);
font-size: 14px;
font-weight: 600;
padding: 14px 28px;
border-radius: 10px;
transition: all 0.25s var(--ease);
/* hover: border-color → var(--cyan); color → var(--cyan) */
```

### 4.3 Section Label
```css
.section-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--mono);
  font-size: 11px;
  color: var(--ink-3);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 16px;
}
.section-label::before {
  content: '';
  display: block;
  width: 24px;
  height: 1px;
  background: var(--cyan);
}
```

### 4.4 Eyebrow Pill
```css
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--mono);
  font-size: 11px;
  color: var(--ink-2);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 6px 14px;
  border: 1px solid var(--line-2);
  border-radius: 999px;
  margin-bottom: 24px;
}
.pulse {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--cyan);
  animation: pulse 1.6s infinite;
}
```

### 4.5 Standard Card
```css
border: 1px solid var(--line);
border-radius: 14px;
background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent);
padding: 32–40px;
transition: all 0.3s var(--ease);
/* hover: border-color → var(--line-2); transform: translateY(-3px) */
```

### 4.6 Capability Card (homepage)
```css
/* extends standard card */
position: relative;
overflow: hidden;
/* spotlight radial tracks mouse via CSS vars --mx --my (set by JS) */
background-image: radial-gradient(
  circle at var(--mx, 50%) var(--my, 50%),
  rgba(75, 227, 214, 0.07),
  transparent 50%
);

.cap-icon {
  width: 56px; height: 56px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--obsidian-3), var(--obsidian-2));
  border: 1px solid var(--line-2);
  display: grid; place-items: center;
  margin-bottom: 24px;
}
/* SVG inside: width 26px, stroke:var(--cyan), fill:none, stroke-width:1.4 */

.cap-num {
  position: absolute; top: 28px; right: 28px;
  font-family: var(--serif); font-style: italic;
  font-size: 42px; font-weight: 500;
  color: rgba(75,227,214,0.08);
  line-height: 1;
}
/* hover: translateY(-4px) */
```

### 4.7 Industry Card (2×2 hairline grid)
```css
/* Parent grid: gap:1px; background:var(--line) — creates hairline dividers */
.ind-card {
  background: var(--obsidian);
  padding: 40–48px;
  position: relative;
  overflow: hidden;
  transition: background 0.3s;
}
.ind-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0;
  height: 2px;
  background: var(--cyan);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s var(--ease);
}
/* hover: ::before scaleX(1); background lightens to var(--obsidian-2) */
```

### 4.8 Process Step Track
```css
/* Parent: position:relative */
/* ::before: dashed horizontal line spanning all steps */
.process-track::before {
  content: '';
  position: absolute; top: 28px; left: 0; right: 0; height: 1px;
  background: none;
  border-top: 1px dashed var(--line-2);
}
.process-step {
  display: flex; flex-direction: column; align-items: flex-start;
  padding-top: 60px; /* clears the line */
}
.process-num {
  font-family: var(--serif); font-style: italic; font-weight: 500;
  font-size: 42px; color: var(--ink-4);
  line-height: 1;
  /* hover: border: 1px solid var(--cyan); box-shadow: 0 0 0 6px var(--cyan-glow) */
  width: 56px; height: 56px; border-radius: 50%;
  display: grid; place-items: center;
  border: 1px solid var(--line);
  margin-bottom: 20px;
  transition: all 0.3s var(--ease);
}
```

### 4.9 Stats Band (below process)
```css
.stats-band {
  display: grid; grid-template-columns: repeat(4,1fr);
  border-top: 1px solid var(--line);
  margin-top: 80px;
  padding-top: 48px;
}
.stat-item .num {
  font-family: var(--serif); font-style: italic;
  font-size: clamp(36px, 4vw, 52px);
  background: linear-gradient(120deg, var(--cyan), var(--amber));
  -webkit-background-clip: text; color: transparent;
  line-height: 1; margin-bottom: 8px;
}
.stat-item .lbl {
  font-family: var(--mono); font-size: 11px;
  color: var(--ink-3); text-transform: uppercase; letter-spacing: 0.1em;
}
```

### 4.10 CTA Box
```css
.cta-band-inner {
  border: 1px solid var(--line-2);
  border-radius: 24px;
  padding: 64px;
  text-align: center;
  background:
    radial-gradient(ellipse at top right, var(--amber-glow), transparent 60%),
    radial-gradient(ellipse at bottom left, var(--cyan-glow), transparent 60%),
    var(--obsidian-2);
  position: relative;
  overflow: hidden;
}
/* ::before: cyan top hairline line, same as form card */
```

### 4.11 Glass Card (`.stitch-glass`)
```css
background: var(--glass-bg);   /* rgba(17,35,58,0.60) */
backdrop-filter: blur(16px);
border: 1px solid var(--glass-border);
border-top: 1px solid var(--glass-top);
border-radius: 14px;
```
Used for platform screen switcher, metric overlays, monitoring widgets.

### 4.12 Metric / Stat Block
```css
/* Single KPI block */
.metric-block {
  padding: 20–24px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--obsidian-2);
}
.metric-value {
  font-family: var(--serif); font-style: italic;
  font-size: 32–48px; font-weight: 400;
  color: var(--cyan); /* or gradient */
  line-height: 1;
  margin-bottom: 4px;
}
.metric-label {
  font-family: var(--mono); font-size: 10.5–11px;
  text-transform: uppercase; letter-spacing: 0.1em;
  color: var(--ink-3);
}
```

### 4.13 Form Fields
```css
input, textarea, select {
  width: 100%;
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--line-2);
  border-radius: 10px;
  padding: 14px 16px;
  color: var(--ink);
  font-family: inherit; font-size: 14px;
  outline: none;
  transition: all 0.2s;
}
input:focus, textarea:focus, select:focus {
  border-color: var(--cyan);
  background: rgba(75,227,214,0.04);  /* var(--cyan-glow) at 0.04 */
}
input::placeholder { color: var(--ink-3); }
label {
  font-family: var(--mono); font-size: 11px;
  color: var(--ink-3); text-transform: uppercase; letter-spacing: 0.08em;
  display: block; margin-bottom: 8px;
}
```

### 4.14 Multi-step Option Button
```css
.option-btn {
  padding: 16px 18px;
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--line-2);
  border-radius: 10px;
  color: var(--ink-2);
  text-align: left; cursor: pointer;
  transition: all 0.2s;
  display: flex; flex-direction: column; gap: 4px;
}
.option-btn:hover {
  border-color: var(--line-3); color: var(--ink);
  background: rgba(255,255,255,0.04);
}
.option-btn.selected {
  border-color: var(--cyan);
  background: linear-gradient(135deg, var(--cyan-glow), transparent);
  box-shadow: 0 0 0 1px var(--cyan);
  color: var(--ink);
}
.opt-h { font-family: var(--serif); font-size: 18px; font-weight: 500; }
.opt-s { font-family: var(--mono); font-size: 11px; color: var(--ink-3); text-transform: uppercase; letter-spacing: 0.08em; }
```

### 4.15 Tag / Pill
```css
.tag {
  font-family: var(--mono); font-size: 10–11px;
  padding: 4px 10px;
  border-radius: 4–6px;
  background: rgba(255,255,255,0.03);
  color: var(--ink-2);
}
/* Accent tag (capability card): */
.tag-cyan {
  background: rgba(75,227,214,0.08);
  color: var(--cyan);
  border: 1px solid rgba(75,227,214,0.15);
}
```

### 4.16 Icon Well
```css
.icon-well {
  width: 48–56px; height: 48–56px;
  border-radius: 10–12px;
  background: linear-gradient(135deg, var(--obsidian-3), var(--obsidian-2));
  border: 1px solid var(--line-2);
  display: grid; place-items: center;
}
/* SVG inside: stroke:var(--cyan); fill:none; stroke-width:1.4; width:22–26px */
```

### 4.17 Direct Contact Card (contact page right column)
```css
.direct-card {
  padding: 24px 26px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: rgba(255,255,255,0.01);
  transition: all 0.3s var(--ease);
  text-decoration: none; color: inherit;
}
.direct-card:hover {
  border-color: var(--cyan);
  background: linear-gradient(135deg, var(--cyan-glow), transparent 70%);
  transform: translateY(-2px);
}
.direct-label { /* mono 11px, --ink-3, uppercase, 0.12em */ }
.direct-value { /* Fraunces 20px, weight 500, -0.015em */ }
.direct-meta  { /* Geist 13px, --ink-2 */ }
```

### 4.18 Timeline (vertical)
```css
.timeline {
  position: relative; padding-left: 32px;
}
.timeline::before {
  content: ''; position: absolute;
  left: 0; top: 8px; bottom: 8px; width: 1px;
  background: linear-gradient(180deg, var(--cyan), var(--amber), transparent);
}
.timeline-item::before {
  content: ''; position: absolute; left: -37px; top: 6px;
  width: 11px; height: 11px; border-radius: 50%;
  background: var(--obsidian);
  border: 2px solid var(--cyan);
  box-shadow: 0 0 0 4px var(--cyan-glow);
}
.timeline-year { font-family: var(--mono); font-size: 11px; color: var(--cyan); text-transform: uppercase; letter-spacing: 0.12em; }
.timeline-title { font-family: var(--serif); font-size: 22px; font-weight: 500; letter-spacing: -0.015em; }
.timeline-desc { color: var(--ink-2); font-size: 14.5px; line-height: 1.6; max-width: 560px; }
```

### 4.19 Progress / Status Bar
```css
.progress-bar-track {
  height: 3px; border-radius: 2px;
  background: var(--line-2);
}
.progress-bar-fill {
  height: 100%; border-radius: 2px;
  background: var(--cyan);
  transition: width 0.3s var(--ease);
}
```

### 4.20 Marquee Strip
```css
.marquee-track {
  display: flex; gap: 48px;
  animation: scroll-x 28s linear infinite;
  white-space: nowrap;
}
/* Items: Fraunces italic, separator: cyan diamond ◆ */
@keyframes scroll-x {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

---

## 5. Animation Conventions

### Scroll reveal (`.fade-up`)
```css
.fade-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.65s var(--ease), transform 0.65s var(--ease);
}
.fade-up.in {
  opacity: 1;
  transform: translateY(0);
}
```
Triggered by IntersectionObserver at ~12% threshold. Existing `RevealSection` component already implements this — use it. Add `@media (prefers-reduced-motion: reduce)` override to skip transforms and set immediate opacity:1.

### Hover lift on cards
```css
transition: transform 0.3s var(--ease), border-color 0.3s;
/* hover: translateY(-3px) to translateY(-4px) */
/* focus-visible: outline using --cyan-glow ring */
```

### Pulse animation (status dots, timeline bullets)
```css
@keyframes pulse {
  0%   { box-shadow: 0 0 0 0 rgba(75,227,214,0.5); }
  70%  { box-shadow: 0 0 0 8px rgba(75,227,214,0); }
  100% { box-shadow: 0 0 0 0 rgba(75,227,214,0); }
}
```
Duration: 1.6s infinite.

### Radiating circle (SVG map nodes, CTA location pin)
```xml
<animate attributeName="r" from="8" to="32" dur="2.5s" repeatCount="indefinite"/>
<animate attributeName="opacity" from="0.7" to="0" dur="2.5s" repeatCount="indefinite"/>
```

### Multi-step form step transition
```css
@keyframes stepIn {
  from { opacity: 0; transform: translateX(8px); }
  to   { opacity: 1; transform: translateX(0); }
}
```
Duration: 0.4s `var(--ease)`.

### Platform screen switcher tabs
```css
.tab-btn { transition: color 0.2s, border-color 0.2s; }
.tab-btn.active { color: var(--cyan); border-bottom: 2px solid var(--cyan); }
```

### Magnetic button (`.btn-magnetic`)
JS-powered: on `mousemove` near button, apply `transform: translate(dx * 0.3, dy * 0.3)` — lerp to zero on `mouseleave`. Already implemented in `site-effects.tsx`.

### Feature list active state (platform showcase)
```css
.feature-item.active {
  border-color: var(--cyan);
  background: linear-gradient(90deg, var(--cyan-glow), transparent 60%);
  /* left accent bar: border-left: 2px solid var(--cyan) */
}
```

### `prefers-reduced-motion` rule (apply to ALL animations)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .fade-up { opacity: 1; transform: none; }
}
```

---

## 6. Page-by-Page Section Structure

### 6.1 Homepage (`/`)

1. **Hero** — Full-viewport, `--obsidian` bg, `padding: 180px 0 120px`
   - Left col (1.05fr): eyebrow pill (pulse dot + text) → H1 gradient italic Fraunces clamp(4rem,7vw,7.1rem) → sub 18px Geist `--ink-2` max 560px → CTA row (primary + ghost) → 4 meta items (Uptime / Active Flows / Architecture / Operations) in mono 11px
   - Right col (1fr): AI chat widget OR `HeroDashboard` — dark obsidian-2/3 bg, cyan top line 1px, avatar, message bubbles, suggestion chips, input row at bottom

2. **Trust marquee** — infinite scroll, `--obsidian-2` bg, border top/bottom `--line`
   - Fraunces italic items separated by cyan `◆` diamonds

3. **Capabilities** — `padding: 120px 0`
   - Section label + H2 + section intro
   - 3-col grid of capability cards (4.6 pattern): cap-num italic bg text, icon well, Fraunces title 26px, Geist desc, 2-3 mono tag pills

4. **ROI Calculator** — `--obsidian-2` bg section, `padding: 120px 0`
   - 2-col card: left = 3 tabs (Banking/Insurance/Enterprise) + 3 sliders (volume/time/team size); right = 3 result KPI cards (savings featured w/ cyan border, hours = green, capacity = amber)
   - Disclaimer line below in `--ink-4` mono 10px

5. **Platform showcase** — `padding: 120px 0`
   - 2-col (1fr 1.4fr): left = sticky feature list (4 items, active gets cyan left border + glow); right = platform screen with 4 switchable SVG screens (arch blueprint / workflow states / monitoring grid / reporting KPIs)

6. **Industries** — `padding: 120px 0`
   - Section label + H2 + intro
   - 2×2 hairline grid (4.7 pattern): Banking / Insurance / Logistics / Enterprise. Each: icon 56px + Fraunces name 24px + desc + 3 tags

7. **Process** — `padding: 120px 0`
   - Section label + H2 + intro
   - 4-col dashed track (4.8 pattern): numbered italic circles → step name Fraunces 20px → step desc
   - Stats band below: 4 gradient italic numbers + mono labels

8. **CTA** — `padding: 120px 0`
   - Centered CTA box (4.10 pattern): section label centered → H2 italic → sub → 2 CTA buttons + contact row (email · phone · location) in mono 11px

---

### 6.2 Services (`/services`)

1. **Page hero** — `.page-hero` (160px top padding), breadcrumb, 2-col grid (1.4fr 1fr)
   - Left: eyebrow + `.page-title` gradient italic + page-sub
   - Right: `.page-meta` table rows in mono 11px (Label / Value pairs)

2. **Service sections** (×3: Architecture / Performance / Data & AI) — alternating `--obsidian` / `--obsidian-2` bg, `padding: 120px 0`
   - 2-col (1fr 1.4fr): sticky aside (service num / Fraunces title 32px / lead / meta table) + right: 4-tab strip (Discovery / Design / Build / Operate) → active tab panel (panel heading + body + 2×2 `panel-items` grid + tech tag stack)

3. **Industry deep dives** — `padding: 120px 0`
   - 2-col cards: 64px industry icon + Fraunces name 32px + desc + feature rows list

4. **Engagement models** — 3-col cards, `padding: 120px 0`
   - Diagnostic sprint / Platform engagement (featured: `--cyan` border + `MOST POPULAR` badge) / Embedded retainer
   - Each: tag + name + desc + meta table + includes list + CTA

5. **FAQ accordion** — `padding: 80px 0`
   - `.faq-item`: Fraunces question 18px + toggle → `max-height` expand on open

6. **CTA band** — same CTA box pattern (4.10)

---

### 6.3 About (`/about`)

1. **Page hero** — breadcrumb + 2-col: eyebrow + page-title + page-sub | page-meta table

2. **Manifesto** — `padding: 80px 0 120px`
   - 2-col (1fr 1.6fr): sticky mono aside (`← Manifesto / what we believe`) + large Fraunces text with cyan em, cyan-underlined strong

3. **Principles** — 2×2 hairline grid (same pattern as industry cards but padded differently)
   - Italic Fraunces number 42px cyan → principle name Fraunces 24px → desc

4. **Team disciplines** — 3-col role cards (4.5 base): icon well + Fraunces name 22px + desc + skill tags row

5. **Timeline** — vertical cyan→amber gradient line (4.18 pattern): 5 milestones with year/title/desc

6. **African context** — `--obsidian` rgba(0,0,0,0.2) bg, 2-col: text + context stats grid (2×2) | Africa SVG map with pulsing HQ node + connection lines

7. **CTA band** — standard CTA box

---

### 6.4 Contact (`/contact`)

1. **Page hero** — breadcrumb + 2-col: eyebrow + page-title italic + page-sub | page-meta table

2. **Contact section** — `padding: 60px 0 120px`
   - 2-col (1.4fr 1fr), gap: 64px
   - Left: multi-step contact form (4 steps)
     - Form card: `--obsidian-2/3` bg, `--line-2` border, `border-radius: 18px`, cyan top hairline
     - Step 1: 6 option buttons in 2-col grid (project type)
     - Step 2: 4 option buttons (industry)
     - Step 3: textarea + timeline select
     - Step 4: name / company / email / phone fields
     - Progress: 4 dots, active = cyan, complete = green
     - Form nav: step count + back/continue buttons
     - Success state: 72px gradient icon circle + recap table
   - Right: direct contact cards (email / phone / location map card / response time card / LinkedIn)

---

### 6.5 Work (`/work`, `/work/[slug]`)

**Index page** — 3 project cards
- Card: Fraunces project title 24px + sector tag + challenge / outcome metadata rows + CTA link

**Detail page** — standard inner page structure, not in reference HTML but follows the page-hero + section pattern

---

### 6.6 Platform (`/platform`) — current site page structure

1. Metrics hero: 3 KPI cards (uptime / latency / regions) in glass-bg
2. 4-card bento: API-first / Secure workflows / Modular deployment / Reporting
3. `PlatformScreenSwitcher`: 4 SVG mockup tabs
4. 4 node performance rings (city nodes)
5. 3-step architecture schema
6. CTA glass box

---

### 6.7 Intelligent Solutions (`/intelligent-solutions`) — current site page structure

1. Hero with 2×2 bento (tall bar chart + health ring + active nodes)
2. 4 capability cards (standard card pattern)
3. 6-step workflow pipeline
4. Operational Command Console (status list + data cards + pulse chart)
5. CTA

---

### 6.8 Request Proposal (`/request-proposal`) — currently broken

The `<form action="" method="POST">` does nothing. Should be replaced or wired to `/api/contact` using the existing `ContactForm` component with `showProposalFields={true}`. The reference design's multi-step contact form (contact.html) is the model to follow.

---

## 7. Do-Not-Touch List

| Item | Why |
|---|---|
| `app/api/**` | Full contact/CRM pipeline |
| `app/inbox/**` | Internal CRM — production system |
| `components/inbox-*.tsx` | All 11 inbox components |
| `components/contact-form.tsx` | Live Telegram-wired form — restyle only |
| `components/chat-with-kelel.tsx` | Floating chat widget — restyle only |
| `components/site-header.tsx` | Working nav + scroll behavior — restyle only |
| `components/site-footer.tsx` | Working footer — restyle only |
| `lib/contact-submissions.ts` | Data layer |
| `lib/lead-notifications.ts` | Telegram notifications |
| `lib/inbox-auth.ts` | Auth system |
| `next.config.ts` | Build config |
| `vercel.json` | Deployment config |
| Brand contact info | info@kelelitsolution.com / +251 942 137 249 / Bole Subcity, Addis Ababa |
