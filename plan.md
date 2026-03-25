# Plan: Convert design.html to Next.js Project

## Context
The existing `nextreach-studio-bloom` repo is a Vite + React SPA deployed to Vercel with a custom domain. The user has a standalone `design.html` — a dark glassmorphism landing page for "The Blackbox Rescue" service — that needs to become a fresh Next.js App Router project. It must deploy correctly to Vercel with the existing domain.

## Approach
Create the Next.js project **in-place at the repo root**, replacing the Vite setup. This preserves the Vercel project link and domain mapping. Old Vite source files will be removed; `public/` assets and `api/` are kept.

## Steps

### 1. Scaffold Next.js Config Files
- **Create** `next.config.ts` — minimal config with security headers (carried from old `vercel.json`)
- **Rewrite** `tsconfig.json` — standard Next.js TypeScript config
- **Rewrite** `tailwind.config.ts` — dark theme with Inter font, glass-panel utilities, matching design.html
- **Create** `postcss.config.mjs`
- **Rewrite** `package.json` — Next.js 15, React 18, Tailwind CSS 3, TypeScript 5

### 2. Remove Vite Files
Delete: `vite.config.ts`, `index.html`, `src/main.tsx`, `src/vite-env.d.ts`, `tsconfig.node.json`, `tsconfig.app.json`, `src/App.tsx`, `src/App.css`, `src/index.css`, `src/pages/`, `src/services/`, `src/hooks/`, `src/lib/`, old `src/components/`, `vercel.json`, `components.json`, `source.config.ts`, `eslint.config.js`

### 3. Create App Router Structure
```
src/app/
  layout.tsx       — Root layout: Inter font, metadata, globals.css import
  page.tsx         — Single page composing all sections
  globals.css      — Tailwind directives + glass-panel + body background + details styling
```

### 4. Convert Sections into Components
Each section from design.html becomes a component in `src/components/`:

| Component | Source Lines | Description |
|-----------|-------------|-------------|
| `Navbar.tsx` | 31–36 | Fixed glass-panel nav, "NextReach Studio" + CTA button |
| `Hero.tsx` | 38–55 | Headline, subheadline, $79 CTA, turnaround note |
| `StatsBar.tsx` | 57–64 | 4-stat glass panel row |
| `Process.tsx` | 66–88 | 3-step grid (Drop the Link / Silent Fix / You Launch) |
| `Testimonials.tsx` | 90–115 | 3 testimonial cards with avatars |
| `ComparisonTable.tsx` | 117–162 | Feature comparison table (4 columns) |
| `Benefits.tsx` | 164–200 | 8-item benefits grid |
| `FAQ.tsx` | 202–242 | 4 accordion items using native `<details>` |
| `Footer.tsx` | 244–254 | CTA footer with checkout button + copyright |

All components are **server components** (no `"use client"` needed — FAQ uses native HTML `<details>`).

### 5. Verify Build & Deploy
- Run `npm install`
- Run `npm run build` — confirm successful compilation
- Run `npm run lint` — if ESLint config exists
- Verify `public/` assets (robots.txt, sitemap.xml, manifest.json) are preserved

## Files Summary

| Action | File |
|--------|------|
| Create | `next.config.ts` |
| Create | `postcss.config.mjs` |
| Create | `src/app/layout.tsx` |
| Create | `src/app/page.tsx` |
| Create | `src/app/globals.css` |
| Create | `src/components/Navbar.tsx` |
| Create | `src/components/Hero.tsx` |
| Create | `src/components/StatsBar.tsx` |
| Create | `src/components/Process.tsx` |
| Create | `src/components/Testimonials.tsx` |
| Create | `src/components/ComparisonTable.tsx` |
| Create | `src/components/Benefits.tsx` |
| Create | `src/components/FAQ.tsx` |
| Create | `src/components/Footer.tsx` |
| Rewrite | `tsconfig.json` |
| Rewrite | `tailwind.config.ts` |
| Rewrite | `package.json` |
| Update  | `.gitignore` |
| Delete  | `vite.config.ts`, `index.html`, `tsconfig.node.json`, `tsconfig.app.json` |
| Delete  | `src/main.tsx`, `src/vite-env.d.ts`, `src/App.tsx`, `src/App.css`, `src/index.css` |
| Delete  | `src/pages/`, `src/services/`, `src/hooks/`, `src/lib/`, old `src/components/` |
| Delete  | `vercel.json`, `components.json`, `source.config.ts`, `eslint.config.js` |
| Keep    | `public/*`, `api/`, `.env`, `.gitignore` |
