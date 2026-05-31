# NextReach Studio Bloom

NextReach Studio's site — interactive AI/LLM developer tools, guides, blog posts, and a curated resource directory.

Built with **Astro 5**, **React 18**, **Tailwind CSS v3**, and **Supabase**.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Astro (static output via `@astrojs/vercel`) |
| UI | React 18, Tailwind CSS v3, `@tailwindcss/typography` |
| Content | MDX via `@astrojs/mdx`, Astro content collections |
| Chat API | Cerebras (`llama3.1-8b`) via serverless function |
| Embeddable widget | Vanilla JS IIFE at `/widget.js` |
| Hosting | Vercel (static) |

## Quick start

```bash
cd /Users/rajeshshrirao/Desktop/Projects/nextreach-studio-bloom
npm ci
npm run dev
```

## Project structure

```
src/
  components/       — Astro + React components (Nav, Footer, tools, ChatWidget)
  content/          — MDX collections: blog, guides, resources
  layouts/          — Layout.astro (SEO, fonts, GA, JSON-LD)
  pages/            — Routes (index, blog/*, guides/*, resources/*, tools/*, api/chat)
  styles/           — globals.css (Tailwind + custom design tokens)
public/             — Static assets, widget.js, sw.js, manifest.json
```

## Environment

| Var | Purpose |
|---|---|
| `CEREBRAS_API_KEY` | Chat API (`/api/chat`) |

## Content collections

- **blog/** — Articles on LLM tooling, workflows, and ecosystem
- **guides/** — Technical guides with difficulty ratings and reading time
- **resources/** — Curated directories (tools, providers)
