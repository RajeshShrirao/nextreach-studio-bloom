# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NextReach Studio is a Next.js 15 landing page for an AI receptionist service targeting pet grooming salons and vet clinics. The site includes a conversational AI chatbot, an admin dashboard for lead tracking, and is deployed to Vercel.

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

### Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout with metadata and fonts
│   ├── page.tsx             # Landing page (composes all sections)
│   ├── globals.css          # Tailwind + custom glassmorphism utilities
│   ├── admin/page.tsx       # Admin dashboard (password protected)
│   ├── thank-you/page.tsx   # Post-form submission page
│   └── api/
│       ├── chat/route.ts    # Chatbot API (Cerebras AI integration)
│       └── leads/
│           ├── route.ts     # GET (list/filter), POST (create)
│           ├── [id]/route.ts# GET, PATCH, DELETE single lead
│           └── stats/route.ts# Aggregate lead statistics
├── components/
│   ├── *.tsx                # Landing page sections (Hero, FAQ, etc.)
│   └── chatbot/
│       └── ChatWidget.tsx   # Floating chat widget ("use client")
└── lib/
    └── leads.ts             # Lead data persistence utilities (JSON file storage)

data/
└── leads.json               # Lead database (auto-created)
```

### Data Persistence

Leads are stored in `data/leads.json` using `fs` operations. The `src/lib/leads.ts` module provides:
- `readLeads()` / `writeLeads()` - JSON file I/O
- `getLeadStats()` - Aggregated statistics
- `LEAD_STATUSES` - Enum of all pipeline statuses

**Note**: The `data/` directory is auto-created if missing. On Vercel, this directory is ephemeral between builds.

### Admin Dashboard

Accessed at `/admin` with password `nextreach2026` (stored in cookie). Features:
- Lead CRUD operations with status workflow
- Conversion funnel visualization
- Statistics cards
- Status filtering
- Expandable lead rows with full details

### Chat Widget

A floating chat widget (`ChatWidget.tsx`) that:
- Opens via "Book a Demo" buttons (dispatches `open-chat-widget` event)
- Calls `/api/chat` endpoint
- Uses Cerebras AI (llama3.1-8b model) with a detailed system prompt
- Requires `CEREBRAS_API_KEY` environment variable

**System Prompt Location**: `src/app/api/chat/route.ts` (SYSTEM_PROMPT constant)

### Styling System

Uses a custom glassmorphism design system defined in `src/app/globals.css`:

- **`glass-panel`**: Base frosted glass effect
- **`glass-panel-hover`**: Hover state with subtle lift
- **`gradient-border`**: Multi-color gradient outline
- **`btn-primary-glow`**: Amber accent button with glow effect

Color scheme:
- Background: `#050505` with radial gradient accents
- Text: `zinc-300` base, white headings
- Accent: `amber-400` (primary CTAs)
- Surface: `rgba(255,255,255,0.03)` with `border-white/6`

### Component Patterns

**Server Components**: All landing page sections (Hero, StatsBar, Process, Testimonials, ComparisonTable, Benefits, FAQ, Footer, Navbar)

**Client Components**: Marked with `"use client"` directive at file top
- `ChatWidget.tsx` - State for open/close, messages, input
- `src/app/admin/page.tsx` - Full admin dashboard with auth

### Type Safety

All shared types exported from `src/lib/leads.ts`:
- `Lead` interface
- `LeadStatus` type (enum of pipeline stages)

## Deployment

Deployed to Vercel. Ensure environment variable is set:
- `CEREBRAS_API_KEY` - Required for chatbot functionality

**Note**: Lead data in `data/leads.json` is not persistent across Vercel redeploys. Consider a database for production data persistence.

## Third-Party Integrations

**Cerebras AI** (`/api/chat`):
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

### Modify chatbot behavior
Edit `SYSTEM_PROMPT` in `src/app/api/chat/route.ts`

### Change admin password
Update the password string in `src/app/admin/page.tsx` (lines ~97 and ~432)

### Update glassmorphism styling
Modify utilities in `src/app/globals.css` in the `@layer components` section
