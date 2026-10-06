# NextReach Studio

https://www.nextreachstudio.in — Custom web applications, AI automation, and internal tools for ambitious SMBs and startups. Founded and operated out of Pune, India.

Built with **Astro 6**, **React 19**, **Tailwind CSS v4**, and deployed on **Vercel** (static).

## Positioning

**Tagline:** Enterprise engineering discipline. Startup speed and pricing.

NextReach Studio is a founder-led, senior-engineered software studio. We compete against traditional agencies by offering direct senior developer access, fixed-scope one-time pricing, and bi-weekly sprint delivery. No account managers. No inflated retainers. No scope creep.

**Ideal clients:**
- Local Indian SMBs digitizing workflows (trade, logistics, service businesses)
- International startups needing rapid MVPs (2–6 week delivery)
- Growing businesses needing internal dashboards, automation, or custom portals

## Site Overview

The website serves two audiences:

1. **Clients (primary)** — Businesses evaluating the studio for custom software. Pages: Homepage, Services, Portfolio, About, Contact.
2. **AI Developers (community/SEO)** — Developers seeking free LLM tools, guides, and blog content. Pages: Tools (5 calculators), Blog (5 posts), Guides (2 guides), Resources (2 directories).

This dual-audience strategy builds authority through developer tools while the core pages convert software buyers.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Astro 6 (static output via `@astrojs/vercel`) |
| UI | React 19, Tailwind CSS v4, `@tailwindcss/typography` |
| Content | MDX via `@astrojs/mdx`, Astro content collections (blog, guides, resources) |
| Chat API | Cerebras (`llama3.1-8b`) via serverless function |
| Embeddable widget | Vanilla JS IIFE at `/widget.js` |
| Database | Supabase (chat widget history) |
| Hosting | Vercel (static with serverless functions) |
| Icons | Lucide React |
| Analytics | Google Analytics (G-1DVFSD0J9Y) |

## Project Structure

```
src/
  components/        — Astro + React components
    Nav.astro, Footer.astro, Layout.astro
    HeroShowcase.astro, BentoGrid.astro
    ChatWidget.tsx, ToolCard.astro, ResourceCard.astro
    tools/ — TokenCalculator, CostCalculator, VRAMEstimator, ContextCalculator, PromptFormatter
  content/           — MDX collections
    blog/            — 5 posts (Claude Code, Gemini, MCP servers, Ollama, context management)
    guides/          — 2 guides (cost optimization, LLM selection for coding)
    resources/       — 2 directories (developer tools stack, LLM API providers)
  layouts/           — Layout.astro (SEO, fonts, GA, JSON-LD, PWA)
  pages/             — Routes
    index.astro, about.astro, services.astro, portfolio.astro, contact.astro
    privacy.astro, terms.astro, 404.astro, 500.astro
    blog/*, guides/*, resources/*, tools/*
    api/chat.ts      — Cerebras-powered chat endpoint
    rss.xml.ts       — Combined RSS feed
  styles/
    globals.css      — Tailwind v4 + custom design system (glassmorphism, amber theme, animations)
  utils/
    tokens.ts        — Token estimation utility
public/
  assets/            — Images, hero dashboard, bento grid visuals
  widget.js          — Embeddable chat widget (vanilla JS)
  sw.js              — Service Worker (PWA)
  manifest.json      — PWA manifest
  robots.txt         — Crawl rules
```

## Pages & Content

| Route | Purpose | Audience |
|---|---|---|
| `/` | Homepage — hero dashboard, services bento grid, 5-step process timeline, positioning section, latest content | Clients (primary) |
| `/services` | 4 service cards (Web Apps, Automation, MVPs, AI Integration) + engagement model | Clients |
| `/portfolio` | 4 project case studies + 2 coming-soon placeholders + trust metrics | Clients |
| `/about` | Founder-led philosophy, technical depth proof | Clients |
| `/contact` | Formspree contact form + WhatsApp link + budget/project type selector | Clients |
| `/blog/*` | 5 articles on LLM tooling (Claude Code, Gemini, MCP, Ollama, context management) | Developers |
| `/guides/*` | 2 technical guides (cost optimization, LLM selection) | Developers |
| `/resources/*` | 2 curated directories (tools, providers) | Developers |
| `/tools/*` | 5 free interactive calculators (tokens, cost, VRAM, context, prompt format) | Developers |
| `/privacy` | Privacy policy | Legal |
| `/terms` | Terms & conditions | Legal |

## Content Collections

- **blog/** — Articles on LLM tooling, workflows, and ecosystem (5 posts)
- **guides/** — Technical guides with difficulty ratings (beginner/intermediate/advanced) and reading time (2 guides)
- **resources/** — Curated directories of developer tools and LLM API providers (2 resources)

## Developer Tools

Five interactive browser-based tools for AI/LLM developers, all free and client-side:

1. **AI Token Calculator** — 18 model configs, paste/coding templates, context usage warnings
2. **LLM Cost Calculator** — Multi-model cost comparison with monthly volume projections
3. **Context Window Calculator** — Stacked visual breakdown of context allocations
4. **VRAM Estimator** — 14 presets x 7 quantization levels + GPU compatibility table
5. **Prompt Formatter** — Convert prompts between ChatML, Llama 3, Mistral, Gemma, Phi-3, Claude API, GPT API

## Design System

- **Aesthetic:** Dark glassmorphism — deep charcoal backgrounds, amber/gold accent glow, frosted glass panels
- **Typography:** Plus Jakarta Sans (display), JetBrains Mono (code), Cabinet Grotesk (headings)
- **Key effects:** Moving mesh spotlights, card hover glow borders, stagger slide-in animations, button shine/sweep effects, animated process timeline
- **Responsive:** Full mobile through desktop breakpoints
- **Accessibility:** `prefers-reduced-motion` overrides, focus-visible outlines, ARIA labels, WCAG AA contrast

## SEO & Performance

- Structured data: BreadcrumbList, WebSite, Organization, Article, ItemList
- Full OG + Twitter Card meta on every page
- Auto-generated sitemap (weekly)
- Combined RSS feed (blog + guides + resources)
- PWA with service worker (caching, push notifications, background sync)
- Custom 404/500 pages
- Security headers (X-Content-Type-Options, Referrer-Policy)
- Lighthouse score: 100 on Best Practices

## Environment

| Var | Purpose |
|---|---|
| `CEREBRAS_API_KEY` | Chat API (`/api/chat`) |

## Quick Start

```bash
npm ci
npm run dev
```

## Scripts

| Command | Action |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Astro lint |
| `npm run typecheck` | Astro type check |

## Roadmap

- [ ] Homepage revamp (Phase 1-5 per `.agents/homepage-revamp-plan.md`)
- [ ] Additional case studies on portfolio
- [ ] More blog posts and guides
- [ ] Additional developer tools
- [ ] Service-specific landing pages
