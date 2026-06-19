# Design System — Portfolio Luca Muscat Baron

> Source of truth for all visual and UI decisions. Read this before touching anything visual.
> Created by /design-consultation. Do not deviate without explicit approval.

## Product Context
- **What this is:** Personal freelance portfolio (one-page) for Luca Muscat Baron — Web Designer & Full-Stack Developer.
- **Who it's for:** Francophone prospects/clients evaluating Luca for design, web dev, and branding work.
- **Space/industry:** Independent designer–developer portfolios. Peers: studio/freelance sites with strong art direction (Awwwards-tier).
- **Project type:** Editorial marketing site, single immersive page.
- **Memorable thing:** "A hand-made site that feels designed by someone who sweats the details" — sober black canvas, one moment of violet, type that switches registers.

## Aesthetic Direction
- **Direction:** Dark editorial / tense minimalism.
- **Decoration level:** Intentional → expressive on the 3D layer only. Film grain over everything, one abstract 3D piece carrying depth.
- **Mood:** Quiet, premium, confident. The black does the talking; the work is the color.
- **Reference / origin:** Evolves the old Webflow site (https://lucamb.webflow.io/) — same minimalist DNA, far more motion and dimension.

## Typography
The brief is a deliberate **register switch** between three faces — grotesk sobriety × calligraphic serif × pixel-mono.

- **Display / calligraphic accent:** **Instrument Serif** (italic for expressive lines) — Google Fonts. Big statements, the name, key words. Romantic, editorial.
- **Primary (body + UI + most headings):** **General Sans** — Fontshare. Sober, premium grotesk. Deliberately NOT Inter/Space Grotesk (AI-convergence trap).
- **Pixel / techy accent:** **Departure Mono** — self-hosted (`/public/fonts/`). Section numbers, kicker labels (`01 — À PROPOS`), tags, metadata. Carries the "very recent design" edge. Fallback: Pixelify Sans (Google).
- **Code:** Departure Mono / monospace fallback.

**Loading:**
- Instrument Serif → `<link>` Google Fonts.
- General Sans → Fontshare CSS API.
- Departure Mono → `@font-face` from `/public/fonts/DepartureMono.woff2`.

**Usage rules:**
- Pixel-mono is an *accent only*. Never set body or long headings in it. Labels, numbers, tags, ≤ a few words.
- Instrument Serif italic for emphasis words and large editorial lines, not full paragraphs.
- General Sans carries 90% of the reading load.

**Scale (rem, base 16px):**
| Token | Size | Font |
|-------|------|------|
| display | `clamp(3.5rem, 12vw, 11rem)` | Instrument Serif / General Sans |
| h1 | `clamp(2.5rem, 6vw, 5rem)` | General Sans 600 |
| h2 | `clamp(2rem, 4.5vw, 3.5rem)` | General Sans 500 |
| h3 | `1.5rem` | General Sans 500 |
| body-lg | `1.25rem` | General Sans 400 |
| body | `1rem` | General Sans 400 |
| small | `0.875rem` | General Sans 400 |
| label | `0.75rem` (tracking `0.12em`, uppercase) | Departure Mono |

## Color
- **Approach:** Restrained. One accent, rare and meaningful. No gradients except the 3D emissive.
- **Background (ink):** `#0A0A0B`
- **Surface (elevated):** `#121214`
- **Surface line / border:** `#1F1F23`
- **Text primary:** `#F4F4F2` (warm off-white)
- **Text muted:** `#6E6E76`
- **Accent — Violet:** `#7B61FF` (solid; hero word, link hover, focus ring, 3D rim-light)
- **Accent glow:** `#B9A7FF` (3D emissive / soft glows only)
- **Semantic:** success `#5BD6A0`, warning `#E5B567`, error `#E5675A`, info `#7B61FF` (reuse accent)
- **Dark mode:** This *is* dark mode. No light variant planned; if added later, redesign surfaces (don't invert) and drop accent saturation ~15%.

**Contrast:** `#F4F4F2` on `#0A0A0B` ≈ 18:1 (AAA). Muted `#6E6E76` for non-essential text only.

## Spacing
- **Base unit:** 8px.
- **Density:** Spacious — editorial breathing room.
- **Scale:** `2xs(4) xs(8) sm(16) md(24) lg(40) xl(64) 2xl(96) 3xl(160)`
- **Section vertical rhythm:** 160px desktop, 96px mobile.

## Layout
- **Approach:** Creative-editorial on a disciplined 8px / 12-col baseline.
- **Grid:** 12 cols desktop, 6 tablet, 4 mobile. Gutter 24px.
- **Max content width:** 1440px; text measure capped ~68ch.
- **Outer margin:** `clamp(1.25rem, 5vw, 6rem)`.
- **Border radius:** Minimal — `sm:4px`, `md:8px`, `full:9999px` (avatars/tags only). Sharp by default; rounded is the exception.
- **Signature layout move:** Projects section is a **horizontal scroll, pinned** (vertical scroll drives lateral movement). Must have a reduced-motion / no-JS vertical fallback.

## Motion
- **Approach:** Expressive but controlled. Motion serves hierarchy and gives the page dimension; never decorative noise.
- **Library:** Lenis (smooth scroll) + GSAP ScrollTrigger. R3F for 3D.
- **Signature interactions:**
  - Smooth scroll (Lenis), eased.
  - Text reveals on scroll (clip/mask, line-by-line).
  - Multi-layer parallax (background 3D + foreground type move at different rates).
  - Pinned horizontal projects track.
  - Magnetic buttons + subtle custom cursor.
  - 3D monolith parallaxes to pointer + scroll, slow idle rotation/distortion.
- **Easing:** enter `cubic-bezier(0.22,1,0.36,1)` (expo-out), exit `ease-in`, move `ease-in-out`.
- **Duration:** micro 80ms · short 200ms · medium 350ms · long 600–900ms (reveals).
- **Accessibility:** Honor `prefers-reduced-motion` — disable Lenis smoothing, parallax, 3D idle motion; convert horizontal pin to normal vertical stack; show static 3D frame or gradient fallback.

## 3D
- **Engine:** react-three-fiber + @react-three/drei.
- **Hero piece:** central **spiral galaxy halo** — chunky additive point cloud (white-hot bloom core → violet arms), orbiting halo ring, tilts to pointer, swirls, recedes on scroll. Replaces the earlier glass monolith.
- **Y2K pixel treatment:** post-process **Pixelation + Bloom** (`@react-three/postprocessing`) on the hero canvases for a deliberate pixel/halftone read. Extends the Departure Mono pixel accent into 3D — not a palette change.
- **Foreground stars:** light second canvas above the title — white 4-point "sparkle" stars (extruded concave star), twinkling, slow swirl, scroll parallax. Interlaces the headline between background galaxy and foreground stars.
- **Palette:** unchanged — white/off-white + rare violet (`#7B61FF` / glow `#B9A7FF`) on `#0A0A0B`. No green (reference image's green is stock-swatch only).
- **Budget:** galaxy = points only (cheap, no transmission material) + light star canvas. DPR capped at 1.5, lazy-loaded, `frameloop` paused for reduced-motion.
- **Fallback:** `prefers-reduced-motion` or no-WebGL → static poster gradient with the same violet glow.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-15 | Initial design system created | /design-consultation, user brief: sober black/white + rare violet, parallax + lateral scroll, abstract 3D, calligraphic × pixel type contrast |
| 2026-06-15 | Stack: Vite + React + Three.js | User choice; full client-side, fast iteration |
| 2026-06-15 | Type trio: General Sans / Instrument Serif / Departure Mono | Register switch per brief; avoid Inter/Space Grotesk convergence |
| 2026-06-15 | Single solid violet accent `#7B61FF`, no gradients except 3D emissive | Avoid purple-gradient AI slop; keep accent rare and meaningful |
| 2026-06-15 | Hero 3D → scroll-driven; glass monolith replaced by spiral galaxy halo + sparkle stars, Y2K pixel post-process | User direction: more depth, motion tied to scroll, Y2K pixel form language (palette unchanged) |
