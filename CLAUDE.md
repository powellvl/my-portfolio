# Portfolio Freelance — Luca Muscat Baron

Hand-made one-page portfolio. Sober dark-editorial art direction with 3D and scroll-driven
motion. Built from scratch (replacing an old Webflow site) so every detail is controllable.

## Design System
**Always read [DESIGN.md](DESIGN.md) before any visual or UI change.** Fonts, colors,
spacing, layout, motion, and 3D direction are defined there. Do not deviate without
explicit user approval. Flag any code that drifts from DESIGN.md.

Quick reference (authoritative copy in DESIGN.md):
- Background `#0A0A0B` · Text `#F4F4F2` · Muted `#6E6E76` · Accent violet `#7B61FF` (rare).
- Fonts: General Sans (body/UI), Instrument Serif italic (calligraphic accent), Departure Mono (pixel accent).
- Accent and gradients are rare. The only gradient allowed is the 3D emissive.

## Stack
- **Vite + React** (JS/JSX, no TypeScript).
- **three** + **@react-three/fiber** + **@react-three/drei** — 3D hero.
- **gsap** (+ ScrollTrigger) — scroll-driven reveals, parallax, pinned horizontal section.
- **lenis** — smooth scroll.
- Plain CSS with design tokens in `src/styles/global.css` (CSS custom properties). No CSS framework.

## Commands
```bash
npm install      # install deps
npm run dev      # local dev server (Vite)
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Architecture
```
src/
  main.jsx              # React entry
  App.jsx               # page composition + smooth-scroll + cursor providers
  styles/
    global.css          # design tokens (CSS vars) + base + utilities
  lib/
    useLenis.js         # smooth scroll setup (syncs Lenis ↔ GSAP ScrollTrigger)
    useReveal.js        # scroll-reveal helper (GSAP)
    useMagnetic.js      # magnetic hover for buttons/links
  components/
    Grain.jsx           # full-screen film-grain overlay
    Cursor.jsx          # custom cursor
    Nav.jsx             # fixed top nav
    Hero.jsx            # hero copy + mounts Scene3D
    Scene3D.jsx         # R3F canvas: refractive monolith + particles
    About.jsx
    Services.jsx
    Projects.jsx        # pinned horizontal scroll track
    Contact.jsx
    Footer.jsx
  data/
    projects.js         # project list (placeholder, edit freely)
    services.js         # services list
    site.js             # name, tagline, links, contact
```

## Content
Content is **placeholder but realistic** and lives in `src/data/*.js`. To make it real,
edit those files — no component changes needed. Projects: Unifox, Echo, Loris, Carepills
(from the old site). Bio/services are editable placeholders.

## Conventions
- Components are function components, one per file, named exports default.
- Keep motion behind `prefers-reduced-motion` guards — every scroll/3D effect needs a static fallback.
- 3D is lazy-loaded and DPR-capped (see DESIGN.md → 3D budget). Don't add a second heavy canvas without checking perf.
- French is the primary content language. UI copy in French.
- Accent violet is rare by design. If you find yourself adding a second purple, stop and reconsider.

## Roadmap (editable with the user)
- [ ] Replace placeholder copy/projects with real content.
- [ ] Add per-project detail (modal or route) if the project count grows.
- [ ] Simple CV/resume section or downloadable PDF.
- [ ] SEO/meta + Open Graph image.
- [ ] Deploy (Vercel/Netlify).

## Skill routing
When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Design system / visual direction → /design-consultation
- Visual polish & QA of the rendered site → /design-review
- QA/testing site behavior → /qa or /qa-only
- Bugs/errors → /investigate
- Code review/diff check → /review
- Ship/deploy/PR → /ship or /land-and-deploy
