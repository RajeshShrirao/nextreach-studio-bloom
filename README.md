# NextReach Studio Bloom

NextReach Studio’s production + demo system for our **AI receptionist** (pet grooming salons ICP): embeddable widget, demo pages, admin dashboard, and the lead pipeline automation (Supabase + Brevo).

## What this repo contains (at a glance)

- **Website + demo pages** (Next.js 15 App Router)
  - Demo pages at `/demo/[slug]` (config loaded from `data/demo-configs/*.json`)
  - Public widget script at `/widget.js`
- **Widget APIs**
  - `POST /api/widget/chat` (client-specific receptionist, config from Supabase `clients` first, JSON fallback)
  - `GET /api/widget/config/[clientId]` (safe config for widget UI, cached)
- **Lead CRM + admin**
  - `/admin` dashboard + `/api/leads/*` endpoints
  - Storage: **Supabase first**, JSON fallback (`data/leads.json`) when Supabase env is missing
- **Outbound pipeline scripts** (run locally or via GitHub Actions)
  - Build demo configs from Supabase leads → send Email 1 → send follow-ups
- **Observability & resilience scripts**
  - Brevo reporting, bounce suppression, demo click tracking

## The funnel (complete flow)

### 1) Prospecting funnel (sales)

```mermaid
flowchart LR
  A[Source leads
(Serper / manual)] --> B[Supabase: leads table
status=new]
  B --> C[Build demo config JSON
scripts/build-demos.mjs]
  C --> D[Demo page live
/demo/:slug]
  D --> E[Email 1 via Brevo
scripts/send-initial-emails.mjs
Template 10]
  E --> F[Follow-ups via Brevo
scripts/auto-followups.mjs
Template 13/12/11]
  F --> G[Reply / Call / Won]
```

### 2) Product funnel (widget runtime)

```mermaid
flowchart TB
  W[Customer website
<script src=".../widget.js">] --> Cfg[GET /api/widget/config/:clientId]
  W --> Chat[POST /api/widget/chat]
  Cfg --> UI[Widget UI config]
  Chat --> Supa[Supabase clients table
(primary)]
  Chat --> Json[data/demo-configs/:slug.json
(fallback)]
  Chat --> LLM[Cerebras Chat Completions]
  Chat --> Logs[Supabase conversations
(best-effort)]
```

## One-shot takeover runbook (do this, it works)

### Prereqs
- Node 22+ (repo uses Next.js 15)
- Access to:
  - Supabase project (service role key)
  - Brevo API key
  - Cerebras API key

### 1) Install + run
```bash
cd /Users/rajeshshrirao/Desktop/nextreach-studio-bloom
npm ci
npm run dev
```

### 2) Required environment variables

Create `.env.local` (or set in hosting provider):

| Var | Used by | Notes |
|---|---|---|
| `CEREBRAS_API_KEY` | `src/app/api/chat/route.ts`, `src/app/api/widget/chat/route.ts` | Required for all AI chat responses |
| `NEXT_PUBLIC_SUPABASE_URL` | app runtime (`src/lib/supabase.ts`) | URL (public) |
| `SUPABASE_SERVICE_KEY` | app + scripts | **Service role** key (server-only). Enables writes without RLS headaches |
| `SUPABASE_URL` | scripts | Set equal to `NEXT_PUBLIC_SUPABASE_URL` for simplicity |
| `BREVO_API_KEY` | scripts | Required for Email 1 + follow-ups |

### 3) Sanity checks
- Demo page loads:
  - Visit: `http://localhost:3000/demo/<some-slug>`
  - Slugs live in: `data/demo-configs/*.json`
- Widget works:
  - Demo page auto-injects `/widget.js` with `data-client-id = slug`
  - Widget calls:
    - `GET /api/widget/config/<slug>`
    - `POST /api/widget/chat`

## Pipeline automation (the part that makes money)

### Supabase schema (source of truth)
- Defined in: `supabase/migrations/20260330175515_initial_schema.sql`
- Lead pipeline columns/status expansions in: `supabase/migrations/20260404_add_lead_pipeline_columns.sql`

Tables:
- `clients` (paying customers configs, production)
- `conversations` (chat logs, best-effort)
- `leads` (our CRM + pipeline statuses)
- `offline_messages` (after-hours captures, if used)

### Lead statuses (current code)
Defined in `src/lib/leads.ts`:

`new → enriching → researched → demo_built → email_sent → email_2_sent → email_3_sent → replied → call_booked → won/lost → nurture`

### Scripts (local)
All scripts live in `scripts/`.

- Master orchestrator:
  - `node scripts/pipeline-daily.mjs --dry-run`
  - `node scripts/pipeline-daily.mjs`

It runs, once per day (idempotent via `data/.pipeline-state.json`):
1) `build-demos.mjs`
2) `send-initial-emails.mjs`
3) `auto-followups.mjs`

Per-script:
- Build demos:
  - `node scripts/build-demos.mjs --dry-run`
  - Writes JSON configs into `data/demo-configs/`
  - Updates Supabase leads: `demo_slug` and sets `status = demo_built`

- Send Email 1:
  - `node scripts/send-initial-emails.mjs --dry-run --limit=25`
  - Selects Supabase leads where `status = demo_built` and `email != ''`
  - Sends via **Brevo** Template **10**
  - Updates lead to `status = email_sent` and sets `email_sent_at`

- Follow-ups:
  - `node scripts/auto-followups.mjs --dry-run`
  - Uses templates:
    - Email 2: template **13**
    - Email 3: template **12**
    - Nurture: template **11**
  - **Updated behavior**: Now sends follow-ups whenever due OR overdue (not just within time windows)
    - Email 2: sent if `status=email_sent` and `email_sent_at >= 4 days ago`
    - Email 3: sent if `status=email_2_sent` and `email_2_sent_at >= 4 days ago`
    - Nurture: sent if `status=email_3_sent` and `email_3_sent_at >= 7 days ago`
  - Updates lead status + timestamps (`email_2_sent_at`, `email_3_sent_at`, etc)

### Observability & Resilience Scripts

Enhanced scripts for comprehensive pipeline monitoring, maintenance, and data integrity:

- **Brevo reporting** (`scripts/brevo-report.mjs`):
  - Usage: `node scripts/brevo-report.mjs --start=2026-04-01 --end=2026-04-21 --tag-prefix=prospect-`
  - Defaults: last 30 days, `tag-prefix=prospect-`
  - Features:
    - Full pagination support (handles thousands of events)
    - Unique message counting by event type (requests, delivered, opened, clicks, bounces)
    - Delivery/open/click rate calculations as percentages
    - Detailed breakdowns by tag and template ID
    - Hard bounce and blocked email lists for suppression
    - JSON output with structured report data

- **Suppress undeliverable** (`scripts/suppress-undeliverable.mjs`):
  - Usage: `node scripts/suppress-undeliverable.mjs --dry-run --start=2026-01-01 --end=2026-04-21 --tag-prefix=prospect-`
  - Defaults: last 90 days, `tag-prefix=prospect-`
  - Features:
    - Parallel fetching of hardBounces and blocked events from Brevo
    - Chunked Supabase queries (100 emails at a time) for performance
    - Protected status handling: skips `replied`, `call_booked`, `won` leads
    - Appends detailed UNDRLBL notes with reasons and timestamps
    - Safe dry-run mode for testing before execution
    - Comprehensive JSON summary output

- **Sync Brevo clicks** (`scripts/sync-brevo-clicks.mjs`):
  - Usage: `node scripts/sync-brevo-clicks.mjs --dry-run --start=2026-01-01 --end=2026-04-21 --tag-prefix=prospect-`
  - Defaults: last 90 days, `tag-prefix=prospect-`
  - Features:
    - Tracks earliest click date per email address from Brevo events
    - Sets `demo_clicked_at` timestamp on matching Supabase leads
    - Idempotent updates (only sets if not already present)
    - Handles missing leads gracefully with count reporting
    - Safe dry-run mode for validation
    - Detailed JSON output with matched/updated/skipped counts

### Email templates (Brevo)
Template IDs are hard-coded in scripts:
- `10` = Email 1
- `13` = Email 2
- `12` = Email 3
- `11` = Nurture

Personalization params passed from scripts:
- `businessName`, `ownerName`, `city`, `compliment`, `observation`, `demoLink`

Contact upsert behavior:
- Scripts call `POST /v3/contacts` with `updateEnabled: true` to avoid duplicate-contact failures.

### GitHub Actions (daily)
Workflow: `.github/workflows/pipeline-daily.yml`
- Scheduled daily at **9 AM IST** (`cron: "30 3 * * *"`)
- **Schedule safety:** scheduled runs only build demos (no sending).
- **Live sending:** Send Emails + Auto Followups + committing demo configs only run when:
  - `github.event_name == 'workflow_dispatch'` AND `inputs.dry_run == false`
- Supabase env in Actions sets `SUPABASE_URL = NEXT_PUBLIC_SUPABASE_URL` for script compatibility.

Required GitHub Secrets:
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`
- `BREVO_API_KEY`

## Widget + demo system (how demos work)

### Demo configs
- Stored in: `data/demo-configs/<slug>.json`
- Demo page: `src/app/demo/[slug]/page.tsx` reads the JSON config and injects the widget.

### Widget embed (for customer sites)
Public script: `public/widget.js` served at `/widget.js`.

Minimal embed:
```html
<script>
  (function() {
    var s = document.createElement('script');
    s.src = 'https://nextreachstudio.com/widget.js';
    s.setAttribute('data-client-id', 'bark-and-bark');
    s.setAttribute('data-api-base', 'https://nextreachstudio.com');
    document.head.appendChild(s);
  })();
</script>
```

Optional widget attributes:
- `data-position` = `bottom-right` (default) or `bottom-left`
- `data-primary-color` = hex (default `#FBBF24`)

### Widget config API
`GET /api/widget/config/[clientId]`
- Returns a **safe** subset of config (no system prompt).
- Source order: Supabase `clients` first, then JSON fallback.
- Adds caching headers (`max-age=3600`, `stale-while-revalidate=86400`).

### Widget chat API
`POST /api/widget/chat`
- Loads client config from Supabase `clients` (primary) or JSON demo config (fallback).
- Builds a strict system prompt (or uses `cfg.system_prompt` when present).
- Calls Cerebras `https://api.cerebras.ai/v1/chat/completions`.
- Logs conversation to Supabase `conversations` table (best-effort).

## Admin dashboard + leads API

Admin doc: `ADMIN_DASHBOARD.md` (may include older JSON-only notes, current code prefers Supabase via `src/lib/leads.ts`).

Primary endpoints:
- `GET /api/leads?status=...&search=...&city=...`
- `POST /api/leads` (create one)
- `POST /api/leads/bulk` (bulk create or action-based bulk update/delete)
- `GET /api/leads/stats`

Storage logic:
- If Supabase env is present (`NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_KEY`): use Supabase.
- Else: fallback to `data/leads.json`.

## Repo map (where things live)

- `src/app/`
  - `api/chat/route.ts` = website chat (NextReach general bot)
  - `api/widget/*` = widget config + widget chat
  - `api/leads/*` = lead CRUD + stats
  - `demo/[slug]/page.tsx` = demo page rendering + widget injection
  - `admin/` = admin dashboard
- `public/widget.js` = embeddable widget
- `data/demo-configs/*.json` = generated demo configs
- `data/.pipeline-state.json` = idempotency state (per-day)
- `scripts/*.mjs` = pipeline automation
- `supabase/migrations/*.sql` = schema + pipeline columns

## Known gotchas (read this once, saves hours)

- **Supabase service key is required** for the server-side app and scripts.
- **Vercel file system is ephemeral**. That’s why we store real leads/configs in Supabase; JSON is for demos/fallback.
- **Don’t double-send emails**: scripts enforce state via `status` guards. Re-running is safe if statuses are correct.
- **Follow-ups logic**: `scripts/auto-followups.mjs` now sends follow-ups whenever they’re **due or overdue** (no upper window), so an ops pause won’t permanently skip leads.

## References inside this repo
- Pipeline plan (detailed): `PIPELINE_PLAN.md`
- Admin dashboard details: `ADMIN_DASHBOARD.md`
- Supabase schema: `supabase/migrations/20260330175515_initial_schema.sql`
- Pipeline columns + statuses: `supabase/migrations/20260404_add_lead_pipeline_columns.sql`
- Daily workflow: `.github/workflows/pipeline-daily.yml`

---

If you’re the next operator: set env vars, run `node scripts/pipeline-daily.mjs --dry-run`, confirm the queue, then run without `--dry-run` during US business hours.