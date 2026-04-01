# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NextReach Studio is a Next.js 15 landing page for an AI receptionist service targeting pet grooming salons and vet clinics. The site includes a conversational AI chatbot, an admin dashboard for lead tracking, embeddable widgets for clients, and is deployed to Vercel.

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3 with custom glassmorphism utilities
- **Font**: Inter (300, 400, 500, 600, 700 weights)
- **Icons**: Lucide React
- **Video**: Remotion 4 for animated hero video
- **Database**: Supabase (with JSON fallback)

### Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout with metadata and fonts
│   ├── page.tsx             # Landing page (composes all sections)
│   ├── globals.css          # Tailwind + custom glassmorphism utilities
│   ├── admin/page.tsx       # Admin dashboard (password protected)
│   ├── demo/[slug]/page.tsx # Demo page with widget preview
│   ├── thank-you/page.tsx   # Post-form submission page
│   └── api/
│       ├── chat/route.ts    # Main chatbot API (Cerebras AI)
│       ├── leads/           # Lead CRUD endpoints
│       │   ├── route.ts     # GET (list/filter), POST (create)
│       │   ├── [id]/route.ts# GET, PATCH, DELETE single lead
│       │   └── stats/route.ts# Aggregate lead statistics
│       └── widget/          # Embeddable widget APIs
│           ├── chat/route.ts# Widget chat endpoint
│           └── config/[clientId]/route.ts# Client config fetch
├── components/
│   ├── *.tsx                # Landing page sections (Hero, FAQ, etc.)
│   └── chatbot/
│       └── ChatWidget.tsx   # Floating chat widget ("use client")
└── lib/
    ├── leads.ts             # Lead data utilities (Supabase + JSON fallback)
    └── supabase.ts          # Lazy Supabase client initialization

data/
├── leads.json               # Lead database fallback (auto-created)
└── demo-configs/            # Client widget configs (JSON fallback)

remotion/                    # Remotion video project
├── src/
│   ├── compositions/
│   │   └── HeroVideo/       # Hero video composition
│   └── index.tsx            # Remotion entry point
└── package.json             # Remotion-specific dependencies

public/
├── hero-video.mp4           # Generated hero video
├── widget.js                # Embeddable widget script
└── *.{png,svg}              # Static assets
```

### Data Persistence

Leads and client configs use a dual-layer persistence strategy:

1. **Supabase (Production)**: Primary storage when env vars are available
   - Tables: `leads`, `clients`, `conversations`
   - Lazy initialization via `getSupabase()` in `src/lib/supabase.ts`
   - Note: `LEAD_STATUSES` is an array in `src/lib/leads.ts`

2. **JSON Fallback**: Local files when Supabase unavailable
   - `data/leads.json` - Lead storage (auto-created)
   - `data/demo-configs/{slug}.json` - Client widget configs
   
On Vercel, the `data/` directory is ephemeral between builds. Supabase is required for persistent production data.

### Lead Management System

Leads flow through a defined pipeline (see `LEAD_STATUSES` in `src/lib/leads.ts`):
- `new` → `researched` → `demo_built` → `email_sent` → `replied` → `call_booked` → `won` / `lost`

**Admin Dashboard** (`/admin`, password: `nextreach2026`):
- Lead CRUD operations with status workflow
- Conversion funnel visualization
- Statistics cards
- Status filtering
- Expandable lead rows with full details

### Embeddable Widget

**Architecture**:
- `public/widget.js` - Stand vanilla JavaScript widget (no React deps)
- Loads config from `/api/widget/config/{clientId}`
- Chats via `/api/widget/chat`
- Used on demo pages (`/demo/[slug]`) and can be embedded on any external site

**Widget Config Format** (`data/demo-configs/{slug}.json`):
```json
{
  "business_name": "Business Name",
  "greeting": "Hi! How can I help?",
  "hours": "Mon-Fri 9AM-6PM",
  "location": "123 Main St",
  "phone": "(555) 123-4567",
  "services": [...],
  "faq": [...],
  "theme": { "primary_color": "#FBBF24" }
}
```

**Embedding**:
```html
<script>
  (function() {
    var s = document.createElement('script');
    s.src = 'https://yoursite.com/widget.js';
    s.src = '/widget.js';
    s.setAttribute('data-client-id', 'business-slug');
    s.setAttribute('data-api-base', 'https://yoursite.com');
    document.head.appendChild(s);
  })();
</script>
```

### Chat Widget Integration

**Main Site Chat** (`ChatWidget.tsx`):
- Opens via "Book a Demo" buttons (dispatches `open-chat-widget` event)
- Calls `/api/chat` endpoint
- System prompt configured in `src/app/api/chat/route.ts` (SYSTEM_PROMPT constant)

**Widget Chat** (`/api/widget/chat`):
- Used by embeddable widget on demo pages
- Dynamically builds system prompt from client config
- Logs conversations to Supabase `conversations` table
- Fallback to escalation message from config if AI fails

Both use `Cerebras AI` (llama3.1-8b model, 500 max tokens, 0.7 temperature).

### Styling System

Uses a custom glassmorphism design system defined in `src/app/globals.css`:

- **`glass-panel`**: Base frosted glass effect
- **`glass-panel-hover`**: Hover state with subtle lift
- **`gradient-border`**: Multi-color gradient outline
- **`btn-primary-glow`**: Amber accent button with glow effect
- **`.section-padding`**: Premium spacing (48px top/bottom)

Color scheme:
- Background: `#0a0a0a` with radial gradient accents
- Text: `zinc-300` base, white headings
- Accent: `amber-400` (primary CTAs)
- Surface: `rgba(255,255,255,0.025)` with `border-white/6`

### Component Patterns

**Server Components**: All landing page sections (Hero, StatsBar, Process, Testimonials, ComparisonTable, Benefits, FAQ, Footer, Navbar)

**Client Components**: Marked with `"use client"` directive at file top
- `ChatWidget.tsx` - State for open/close, messages, input
- `src/app/admin/page.tsx` - Full admin dashboard with auth

### Type Safety

All shared types defined in `src/lib/leads.ts`:
- `Lead` interface
- `LeadStatus` type (enum from LEAD_STATUSES array)
- Note: DB uses snake_case (`business_name`), app uses camelCase (`businessName`)

## Deployment

Deployed to Vercel. **Required environment variables**:
- `CEREBRAS_API_KEY` - Required for chatbot functionality
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `SUPABASE_SERVICE_KEY` - Supabase service role key (for server-side operations)

**Security**: `next.config.ts` includes security headers (X-Frame-Options, X-XSS-Protection, etc.)

## Video Workflow (Remotion)

The hero video is generated using Remotion 4:

```bash
cd remotion
npm install
npm start          # Preview video
npm run render:hero  # Render to ../public/hero-video.mp4
```

Remotion is a separate project with its own package.json. Video composition is in `remotion/src/compositions/HeroVideo/`.

## Third-Party Integrations

**Cerebras AI** (`/api/chat` and `/api/widget/chat`):
- Endpoint: `https://api.cerebras.ai/v1/chat/completions`
- Model: `llama3.1-8b`
- Max tokens: 500
- Temperature: 0.7

**Tally.so**:
- Intake form URL: `https://tally.so/r/1AMoR1`
- Redirect to `/thank-you` after submission

## Common Tasks

### Add a new landing page section
1. Create component in `src/components/SectionName.tsx`
2. Import and use in `src/app/page.tsx`
3. Use `glass-panel` class for containers

### Modify main chatbot behavior
Edit `SYSTEM_PROMPT` in `src/app/api/chat/route.ts`

### Modify widget behavior per client
Edit config in `data/demo-configs/{slug}.json` or Supabase `clients` table. Widget uses `buildSystemPrompt()` in `/api/widget/chat/route.ts` if no `system_prompt` field.

### Add a new client demo
1. Create JSON config in `data/demo-configs/{slug}.json`
2. Visit `/demo/{slug}` to test
3. For production, add row to Supabase `clients` table

### Change admin password
Update the password string in `src/app/admin/page.tsx` (lines ~88 and ~436 - "nextreach2026")

### Update glassmorphism styling
Modify utilities in `src/app/globals.css` in the `@layer components` section
