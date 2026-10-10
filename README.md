# NextReach Studio

https://www.nextreachstudio.in — a founder-led software studio in Pune building custom websites, web applications, AI systems, and business automation.

## Stack

- Astro 6 with static output through `@astrojs/vercel`
- React 19 islands for interactive tools and homepage interactions
- Tailwind CSS v4 through `@tailwindcss/vite`
- MDX content collections for blog posts, guides, and resources
- Standalone Cerebras-backed chat API at `/api/chat` when `CEREBRAS_API_KEY` is configured (no on-site chat UI)
- Vercel deployment

## Site structure

```text
src/
  components/
    attribution/   — attribution badge generator and downloadable badge components
    brand/         — brand kit, visual brand book, and logo marquee
    home/          — homepage navigation, galaxy hero, reviews, industry and spec islands
    tools/         — token, cost, context, VRAM, and prompt tools
    Nav.astro, Footer.astro, ServiceLayout.astro
    Prose.astro, ResourceCard.astro, ToolCard.astro
  content/
    blog/          — 43 published articles
    guides/        — 2 guides
    resources/     — 2 resources
  layouts/Layout.astro
  pages/           — marketing, service, industry, content, tool, and legal routes
  styles/globals.css
  utils/           — FAQ schema, token estimation, and page transitions
public/
  assets/          — live site imagery and video
  brand/           — brand library, social assets, and handover files
  fonts/           — self-hosted site fonts
  llms.txt, robots.txt, pricing-for-agents.md
  manifest.json, icons, sw.js
scripts/
  lighthouse_audit.py
  verify-faq-schema.mjs
  brand-book export/generation scripts
demos/             — standalone static demo projects
```

## Commands

```sh
npm ci
npm run dev
npm run typecheck
npm run build
npm run verify:faq
```

`npm run build` runs the production Astro build and the Lighthouse budget gate. Use `SKIP_LIGHTHOUSE=1` only when browser auditing is unavailable.

`npm run audit:lighthouse` reruns the gate against the latest build. `npm run preview` serves the build locally. Astro 6 has no `astro lint` command; use `typecheck`.

## Environment

Copy `.env.example` to `.env` and add the only required variable when enabling the chat endpoint:

```text
CEREBRAS_API_KEY=...
```

The public `widget.js` is a legacy embeddable client for a separate `/api/widget/*` backend; those routes are not implemented here. The manifest remains linked, but `sw.js` is not registered by the current site. Retire these public endpoints only after checking existing external clients.

## Content conventions

- New blog, guide, and resource files are picked up automatically from `src/content/`.
- Blog articles should answer the query directly, include a comparison table, and finish with a FAQ section.
- Every published blog article needs an inbound link from a service, industry, or tool page.
- Keep service and industry pages on `ServiceLayout.astro`.
- Add handwritten routes to `customPages` in `astro.config.mjs`; content collection URLs are discovered by the sitemap integration.

## Verification

Before shipping content, route, asset, or layout changes:

```sh
npm run typecheck && npm run build
```

After changing article FAQ sections, also run:

```sh
npm run verify:faq
```
