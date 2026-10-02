# NextReach Studio — AGENTS.md

## Commands

```sh
npm run dev        # Astro dev server
npm run build      # Production build (static output via @astrojs/vercel)
npm run typecheck  # astro check
npm run lint       # astro lint
```

Order: `lint` → `typecheck` → `build`. No test framework configured.

## Architecture

- **Astro 6** static site on Vercel. One layout (`Layout.astro`), one global stylesheet (`src/styles/globals.css`).
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (NOT PostCSS, no `tailwind.config.js` — use CSS‑first config).
- **React 19** for interactive components only (tools, chat widget). Everything else is Astro.
- **Path alias**: `@/*` → `./src/*`.
- **Content collections**: `src/content/` with subdirectories `blog/`, `guides/`, `resources/`. Schemas defined in `src/content.config.ts` using `astro:content` `defineCollection` + `glob` loader.
- **Dynamic routes**: `[...slug].astro` pattern with `getStaticPaths` fetching via `getCollection`.
- **API route** (`/api/chat`): serverless POST, `export const prerender = false`, requires `CEREBRAS_API_KEY` env var. Backend is Cerebras llama3.1-8b.

## Content Collections

| Collection | Required Fields | Optional Fields |
|---|---|---|
| `blog` | title, description, pubDate | updatedDate, author, tags[], image, draft, canonicalURL |
| `guides` | title, description, pubDate, difficulty (beginner\|intermediate\|advanced) | readingTime, +same as blog |
| `resources` | title, description, pubDate | category (default "General"), +same as blog |

Fetch: `getCollection("blog", ({ data }) => !data.draft)`, render: `const { Content } = await render(post)`.

## Layout Props

`Layout.astro` accepts: `title`, `description`, `image`, `canonicalURL`, `type` ("website"|"article"), `pubDate`, `author`, `tags[]`. Sets OG, Twitter, JSON‑LD, GA (`G-1DVFSD0J9Y`), fonts. Canonical URL defaults to `Astro.url.href`.

## Key Conventions

- **Component types**: `.astro` for static/presentational, `.tsx` for interactive (React 19). Tools use React state/hooks.
- **Styling**: Tailwind utility classes + custom design tokens in `globals.css`. No CSS modules or scoped styles.
- **Sitemap**: Custom pages listed explicitly in `astro.config.mjs` (tools, privacy, terms, about, contact, all 12 service pages, all 9 industry pages).
- **SEO**: Structured data (BreadcrumbList, WebSite, Organization, Article, ItemList) injected inline via `<script type="application/ld+json">` in pages, not in Layout.
- **Fonts**: Plus Jakarta Sans (body), Cabinet Grotesk (headings), JetBrains Mono (code) — loaded with `media="print" onload="this.media='all'"` (non‑render‑blocking).
- **PWA**: `/manifest.json`, `/sw.js`, `/robots.txt`, `/icon-192.svg`, `/icon-512.svg` in `public/`.
- **AI agent files**: `/llms.txt` (AI context primer), `/pricing-for-agents.md` (machine-readable pricing & services), `/robots.txt` (15 AI crawlers explicitly allowed).
- **Environment**: Copy `.env.example` to `.env`. Only `CEREBRAS_API_KEY` needed.

## Project Structure

```
src/
  components/    — Nav, Footer, HeroShowcase, BentoGrid, ServiceLayout, ChatWidget, ToolCard, tools/*
  content/       — blog/, guides/, resources/ (MDX)
  layouts/       — Layout.astro (site-wide)
  pages/         — index, about, services/ (overview + 12 location pages), industries/ (9 pages), portfolio, contact, blog/*, guides/*, resources/*, tools/*
  styles/        — globals.css (Tailwind v4 + design system)
  utils/         — tokens.ts (token estimation)
.agents/         — Project planning docs
public/
  llms.txt       — AI context file for LLM crawlers
  pricing-for-agents.md — Machine-readable pricing & services for AI agents
  robots.txt     — 15 AI crawlers explicitly allowed
```

## Existing Docs (check before asking)

- `.agents/homepage-revamp-plan.md` — Landing page redesign blueprint
- `.agents/seo-plan-pune-3-month.md` — 3-month Pune SEO plan with 7 service pillars, 12 landing pages, 9 industry pages, keyword research, content calendar
- `MARKETER-GUIDE.md` — Audience, positioning, competitive landscape
- `skills-lock.json` — Registered agent skills (Tailwind 4 docs, web design guidelines, taste-skill / design-taste-frontend anti-slop system)
- `.agents/skills/design-taste-frontend/SKILL.md` — Taste Skill v2 anti-slop rules, design locks, brief inference & hero discipline
- `public/llms.txt` — AI context primer for LLM crawlers (services, pricing, key pages)
- `public/pricing-for-agents.md` — Full machine-readable service/pricing dossier for autonomous agents

## OpenCode Config

Mem0 skills are registered in `.opencode/`. Always include `user_id="rajeshshrirao"` and `app_id="RajeshShrirao-nextreach-studio-bloom"` in mem0 search filters and add_memory calls. Use `mem0_search_memories` before starting non‑trivial tasks.
