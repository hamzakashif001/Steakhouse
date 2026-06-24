# Ember & Oak — Design Spec

**Date:** 2026-06-24
**Project:** Marketing website for a (fictional) premium Seattle steakhouse
**Goal:** A "$10k-tier" one-page cinematic site with elegant, performant animations that work on any device.

---

## 1. Brand & Content

**Name:** Ember & Oak
**Tagline:** *An American chophouse, forged in fire.*
**Story:** A Pioneer Square (Seattle) steakhouse set in a converted 1907 ironworks — a coal-fired hearth, a glass-walled dry-aging room, Cascade-raised beef and Pacific seafood. Est. 1907 (building) / re-opened as Ember & Oak.

All copy, menu, hours, press quotes, and gallery image lists live in `src/data/` so content is editable without touching components. Press quotes are clearly fictional (Seattle Met, Eater Seattle) for a showcase.

Name alternates if ever swapped: *Marrow*, *Cascade & Coal* (single source of truth in `src/data/site.ts`).

---

## 2. Tech Stack & Project Structure

- **Build:** Vite + React 18 + **TypeScript**
- **Styling:** Tailwind CSS, with CSS variables for the brand theme
- **Animation:** Framer Motion (scroll reveals, parallax, nav, count-ups)
- **3D:** Three.js + @react-three/fiber + @react-three/drei (Gallery section only, lazy-loaded)
- **Structure:** shadcn-style. Path alias `@/*` → `src/*`. Reusable primitives live in `src/components/ui/`.
- **Icons:** lucide-react (SVG, never emoji).

### Why `src/components/ui/`
shadcn's convention separates **primitive, reusable UI** (`components/ui/`) from **feature/section components** (`components/sections/`). It keeps imports stable (`@/components/ui/...` — exactly what the gallery's demo uses), lets the shadcn CLI add components into a predictable place, and prevents the "everything in one folder" sprawl. The 3D gallery is a reusable primitive, so it goes in `components/ui/3d-gallery-photography.tsx`.

### Folder layout
```
steakhouse/
  index.html
  package.json
  vite.config.ts            # @ alias
  tsconfig.json / tsconfig.node.json
  tailwind.config.ts
  postcss.config.js
  components.json           # shadcn config
  public/
    images/                 # optimized WebP (hero, dishes, room, craft)
    video/hero.mp4 + hero.webm
    poster/hero-poster.webp
  src/
    main.tsx
    App.tsx
    index.css               # Tailwind layers + brand CSS variables + fonts
    lib/utils.ts            # cn()
    data/
      site.ts               # name, tagline, hours, address, socials
      menu.ts               # menu sections + items + prices
      gallery.ts            # gallery image list
      press.ts              # quotes
    components/
      ui/
        3d-gallery-photography.tsx   # the integrated component (adapted)
        Reveal.tsx          # scroll-reveal wrapper (Framer Motion + reduced-motion)
        CountUp.tsx
        Button.tsx
      sections/
        Navbar.tsx
        Hero.tsx
        Story.tsx
        Menu.tsx
        Craft.tsx
        Gallery.tsx         # wraps the 3d gallery + fallbacks
        PrivateDining.tsx
        Reservation.tsx
        Press.tsx
        Footer.tsx
```

---

## 3. Design System

### Palette (dark & moody luxury)
| Token | Hex | Use |
|---|---|---|
| `obsidian` | `#0B0B0C` | page base |
| `char` | `#15131400` → `#1A1818` | surfaces / cards |
| `oxblood` | `#7A1F2B` | primary accent |
| `oxblood-deep` | `#591521` | hovers / depth |
| `brass` | `#C9A36A` | CTAs, hairlines, focus rings |
| `brass-soft` | `#E2C892` | brass highlight |
| `bone` | `#F4EFE6` | primary text on dark |
| `ash` | `#A8A29A` | secondary text |
| `ember` | `#E2873B` | sparing glow accents |

Contrast: `bone` on `obsidian` ≈ 14:1; `ash` on `obsidian` ≈ 6:1. Both pass AA. Brass used for large text / accents / borders only.

### Typography
- **Display/headings:** Cormorant Garamond (600/700) — dramatic, fine-dining.
- **Eyebrows/labels:** letter-spaced uppercase, small (Jost 500).
- **Body:** Jost (geometric humanist sans), 16px minimum, line-height 1.6–1.75.
- Loaded via Google Fonts with `display=swap` + `preconnect`; weights subset.

### Spacing & layout
- Container max-width `max-w-6xl` (consistent across sections).
- Generous vertical rhythm; sections ~`py-24 md:py-32`.
- Z-index scale: base 0, nav 50, lightbox/modal 60.
- Floating nav with edge spacing once scrolled.

### Motion principles
- Framer Motion `whileInView` reveals: opacity 0→1 + translateY 16–24px→0, staggered children, 150–600ms, `easeOut`.
- Transform/opacity only (never animate width/height/top).
- Light parallax (translateY) on 1–2 images.
- Nav: background fades to charcoal + subtle blur after scroll threshold.
- Hover: brass border / image zoom with **no layout shift** (scale within overflow-hidden).
- Count-up stats in The Craft (whileInView, once).
- One-time brand intro on first load (quick, skippable, ≤1.2s).
- **All motion gated behind `prefers-reduced-motion`** via Framer's `useReducedMotion` → reveals become instant, parallax disabled, hero video → still image, 3D gallery → static grid.

---

## 4. Page Sections (one long scroll)

1. **Navbar** — transparent→charcoal/blur on scroll; logo wordmark; anchors (Menu, Story, Gallery, Private Dining); brass "Reserve" button. Mobile: slide-in menu, ≥44px targets.
2. **Hero** — full-viewport looping grill/flame video (muted, `playsinline`, poster-first), dark gradient overlay, brand lockup + tagline, dual CTA ("Reserve a Table" / "View Menu"), scroll cue. Fallback to static poster on mobile / save-data / reduced-motion.
3. **Story** — eyebrow + short evocative paragraph, parallax interior image, est. 1907 nod.
4. **The Cuts (Menu)** — tabbed sections (Hearth/Steaks, Sea, Sides, Dessert) with elegant rows, prices, a few "signature" highlights. Sample menu, not exhaustive.
5. **The Craft** — dry-aging / fire / sourcing feature; image + copy + count-up stats (e.g., days dry-aged, cuts, since 1907). This is the "why it's worth it" section.
6. **Gallery** — the integrated **3D infinite gallery** (see §5).
7. **Private Dining** — copy + image + "Inquire" CTA (scrolls to reservation or mailto).
8. **Reservations** — custom-styled booking form: date, time, party size, name, email, phone, occasion (select), special requests. Client-side validation, disabled+spinner on submit, success state. No live backend (front-end showcase). Hours, address, styled static map alongside.
9. **Press** — fictional quotes + star rating.
10. **Footer** — hours, address, phone, lucide social icons, newsletter input, credits, back-to-top.

---

## 5. 3D Gallery Integration

**Source:** `3d-gallery-photography.tsx` (React Three Fiber WebGL gallery — depth-drifting planes with cloth shader, depth-based fade + blur, autoplay, WebGL fallback grid).

**Dependencies:** `three`, `@react-three/fiber`, `@react-three/drei`.

**Placement:** the Gallery section, full-width, contained height (e.g., `h-[80vh]`).

**Props used:** `images` (Ember & Oak photos: dishes, hearth, plating, room), `speed`, `visibleCount`, `fadeSettings`, `blurSettings`, `className`.

**Adaptations (decided):**
- **Inline, no scroll-hijack.** Remove/disable the `wheel` `preventDefault` handler so the page never traps scroll. Drive motion via **autoplay** + arrow keys (when focused) + optional drag/buttons. Keyboard listener scoped to the section (focus), not `document`.
- **Lazy-load Three.js:** `React.lazy` + dynamic import; mount only when the section nears the viewport (IntersectionObserver). Keeps `three` out of the initial bundle → fast first load on any device.
- **Performance refactor:** move per-frame `scrollVelocity` from React state to a `useRef` to avoid a React re-render every frame (the shipped component calls `setState` inside `useFrame`). Visuals identical, far cheaper on mobile.
- **Pause when offscreen** and when `document.hidden` (save battery/GPU).
- **Reduced motion / no WebGL:** render the built-in `FallbackGallery` grid (restyled to the dark theme) instead of the canvas.
- **Mobile:** the shipped component has no touch handler, so mobile = autoplay drift (which is fine and avoids scroll-trapping); add simple prev/next buttons for control.

**Assets:** real Unsplash food/restaurant photography, downloaded and converted to optimized WebP, served from `public/images/` with width/height set (no layout shift).

---

## 6. Performance & Accessibility (acceptance criteria)

**Performance**
- WebP images, responsive `srcset`, lazy-loading, explicit dimensions (no CLS).
- Hero video compressed (~5–8s loop), poster-first; downgraded to still on mobile/save-data/reduced-motion.
- Three.js code-split + lazy-mounted; gallery paused offscreen.
- Fonts `display=swap` + preconnect.
- Target: Lighthouse Performance ≥ 90 on desktop, ≥ 80 on mid-tier mobile; no horizontal scroll at 375/768/1024/1440.

**Accessibility**
- Body contrast ≥ 4.5:1 (palette verified).
- Visible brass focus rings; keyboard-operable nav, menu tabs, gallery controls, lightbox, and form.
- Alt text on all meaningful images; `aria-label` on icon-only buttons.
- Form: `<label for>` on every field, inline error messages near fields, errors not conveyed by color alone.
- `prefers-reduced-motion` respected everywhere (see §3).
- Touch targets ≥ 44×44px.

---

## 7. Out of Scope (YAGNI)

- No real reservation backend / payments / CMS / auth.
- No multi-page routing (single page with anchors).
- No real email sending (form shows success state; optional `mailto:` fallback).
- No i18n.

---

## 8. Assumptions

- Fictional content is acceptable and will be clearly plausible (not impersonating a real business).
- Unsplash images are used under their license; downloaded + optimized locally.
- Build verified locally via the Vite dev server + screenshots; deployment (e.g., Vercel) is a later, optional step.

---

## 9. Build Order (high level)

1. Scaffold Vite+React+TS, Tailwind, shadcn init, `@` alias, fonts, brand theme tokens.
2. Install deps incl. three / fiber / drei, framer-motion, lucide-react.
3. Add `src/data/*` content + the gallery component (adapted) into `components/ui/`.
4. Build Navbar + **Hero** → screenshot checkpoint for sign-off.
5. Build remaining sections top-to-bottom.
6. Wire the Gallery (lazy + fallbacks).
7. Performance + a11y pass; verify at 4 breakpoints + reduced-motion; final screenshots.
