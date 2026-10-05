# NextReach Studio — AGENTS.md

## Commands

```sh
npm run dev        # Astro dev server
npm run build      # Production build (static output via @astrojs/vercel)
npm run typecheck  # astro check
```

Order: `typecheck` → `build`. No test framework configured.

> `npm run lint` still exists in `package.json` but `astro lint` was removed in Astro 6 — it
> prints CLI help and exits 0. It lints nothing. Do not treat a passing run as a signal.
> Use `typecheck` for static verification and `build` as the real gate.

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

Current counts: **43 blog**, 2 guides, 2 resources. New `.mdx` files are picked up
automatically — no registry to update. Do not add content URLs to `astro.config.mjs`;
the sitemap integration discovers blog/guides/resources. Only hand-written pages
(tools, service, industry, legal) belong in `customPages`.

## Layout Props

`Layout.astro` accepts: `title`, `description`, `image`, `canonicalURL`, `type` ("website"|"article"), `pubDate`, `author`, `tags[]`. Sets OG, Twitter, JSON‑LD, GA (`G-1DVFSD0J9Y`), fonts. Canonical URL defaults to `Astro.url.href`.

## ServiceLayout Props

All 12 service pages and all 10 industry pages render through `ServiceLayout.astro`.
It is the shared shell for every commercial page — adding a section means changing the
layout or passing props, not editing 21 files.

| Prop | Required | Notes |
|---|---|---|
| `title`, `description` | yes | Page `<title>` and meta description |
| `serviceTag` | yes | Small uppercase label above the H1 |
| `headline`, `subheadline` | yes | H1 and its supporting line |
| `offerings` | yes | Array of `{ title, description }` rendered as cards |
| `idealClient`, `timeline`, `priceRange` | yes | The three-panel spec strip |
| `relatedLinks` | no | `{ href, label }` — page-to-page navigation |
| `researchLinks` | no | `{ href, label, note }` — the "Read Before You Decide" block |
| `portfolioTags` | no | Rendered as a line above the CTA |
| `ctaText`, `ctaHref` | no | Default: "Schedule a Technical Discovery Call" → `/contact` |

`researchLinks` grid adapts to link count (1 → 1 col, 2 → 2 col, 3 → 3 col, 4+ → 2 col).
**Keep it at 6 or fewer.** Past that the block stops being read, which defeats its purpose.

A `<slot />` sits between the offerings and the spec strip for page-specific content
(e.g. the restaurant demo card in `industries/restaurants.astro`).

## Key Conventions

- **Component types**: `.astro` for static/presentational, `.tsx` for interactive (React 19). Tools use React state/hooks.
- **Styling**: Tailwind utility classes + custom design tokens in `globals.css`. No CSS modules or scoped styles.
- **Sitemap**: Custom pages listed explicitly in `astro.config.mjs` (tools, privacy, terms, about, contact, all 12 service pages, all 10 industry pages).
- **SEO**: Structured data (BreadcrumbList, WebSite, Organization, Article, ItemList, LocalBusiness) injected inline via `<script type="application/ld+json">` in pages, not in Layout. `ServiceLayout` emits `Service` + `ItemList` automatically.
- **Internal linking rule**: every blog article must have at least one inbound link from a service page, industry page, or tool page. An article with zero inbound is orphaned and will not rank. When you add an article, wire it into `researchLinks` in the same change — verify with the orphan check under "Verification".
- **Content structure**: articles open with a direct answer (answer-first, for AI citation), include at least one comparison table, and end with a 4-6 question FAQ block. This is deliberate — it is what generative engines quote.
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
  pages/         — index, about, services/ (overview + 12 location pages), industries/ (10 pages), portfolio, contact, blog/*, guides/*, resources/*, tools/*
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
- `ARTICLE-MAP.md` — Content map: 7 topic clusters, health scored by inbound links per article, ranked gap list
- `LONG-TAIL-MAP.md` — ~55 long-tail keywords mapped to articles, with the ranked list of next articles to write
- `MARKETER-GUIDE.md` — Audience, positioning, competitive landscape
- `skills-lock.json` — Registered agent skills (Tailwind 4 docs, web design guidelines, taste-skill / design-taste-frontend anti-slop system)
- `.agents/skills/design-taste-frontend/SKILL.md` — Taste Skill v2 anti-slop rules, design locks, brief inference & hero discipline
- `public/llms.txt` — AI context primer for LLM crawlers (services, pricing, key pages, research index)
- `public/pricing-for-agents.md` — Full machine-readable service/pricing dossier for autonomous agents

## Content Strategy

**Head terms are not the target.** "Web design company in Pune" has 586+ competitors
(IKF: 1,500 clients over 25 years; Dimakh: 1,500 designs over two decades). A newer
domain loses on age regardless of content quality.

**Target the long tail instead** — "responsive web design Pune", "website design cost
Pune", "local SEO Pune", "Core Web Vitals Pune". Lower competition, higher intent, and
it maps to the studio's actual advantage over a ₹4,999 template shop or an SEO agency.

When adding articles, work the clusters in `ARTICLE-MAP.md`. Current priority order:

1. Wire orphaned articles into `researchLinks` (before writing anything new)
2. Website design for restaurants / real estate / manufacturing — 10 industry pages now
   exist, but almost no industry-specific articles. Largest untapped surface.
3. Website accessibility (WCAG 2.2) for Pune, and "how much does SEO cost in Pune"
4. Add `/services/ecommerce` — a 1,547-word e-commerce article has no service page to link to

**Publishing cadence matters.** 19 articles appeared in two batches. Google treats a
sudden burst as less trustworthy than a steady cadence. Prefer spacing further updates
and genuinely refreshing older articles over another simultaneous batch.

## Verification

Run before considering any content or link change done:

```sh
npm run typecheck && npm run build
```

Then check the two things `astro check` cannot catch:

- **Broken links**: every `/blog/`, `/guides/`, `/resources/` href must resolve to a real
  `.mdx` file. Note that `guides/` and `resources/` have different slugs from `blog/` —
  `/blog/llm-api-providers-directory` is wrong, `/resources/llm-api-providers-directory`
  is correct.
- **Orphaned articles**: every blog article should appear in at least one `researchLinks`
  block or tool page. Zero inbound means the article will not rank.

## Known Outstanding Issues

- `src/components/home/StudioIndustryInteractive.tsx` links to `/industries/pet-grooming`
  correctly, but verify the full homepage industry grid after any change to the
  `verticals` array — a href mismatch here ships a broken link on the homepage, the
  highest-value page on the site.

## OpenCode Config

Mem0 skills are registered in `.opencode/`. Always include `user_id="rajeshshrirao"` and `app_id="RajeshShrirao-nextreach-studio-bloom"` in mem0 search filters and add_memory calls. Use `mem0_search_memories` before starting non‑trivial tasks.
