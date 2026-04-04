# Pipeline Automation — First Client Machine

## Goal
Build an end-to-end automated pipeline: **Source leads → Enrich emails → Generate demo configs → Send personalized emails → Track replies → Auto-follow-up.** Target: 25 leads sent per day, 100+ in pipeline, first client within 3 weeks.

## Architecture
```
Source (Serper) → Enrich (script) → Supabase leads table
                                      ↓
                              Demo Generator (JSON configs)
                                      ↓
                              Demo Pages: nextreachstudio.com/demo/[slug]
                                      ↓
                              Brevo Templates (batch send via template IDs 10/13/12/11)
                                      ↓
                              Tracking: Zoho inbox (replies) + Supabase (status updates)
                                      ↓
                              Auto-follow-up pipeline (Day 4/8/12/15)
```

## Tasks

### Phase 1: Infrastructure Fixes

- [ ] **Task 1:** Fix Brevo template 10 `{{params.businessName}}` param → Verify template contact attributes are mapped correctly. Test: send to `rajeshshrirao696@gmail.com` with known businessName param → Verify: subject line renders correctly
- [ ] **Task 2:** Add missing DB columns to Supabase `leads` table — `follow_up_at`, `email_2_sent_at`, `email_3_sent_at`, `enrichment_complete` in a new migration file → Verify: `ALTER TABLE leads ADD COLUMN ...` runs without error
- [ ] **Task 3:** Fix DB status CHECK constraint to include `email_2_sent`, `email_3_sent`, `nurture`, `enriching` → Verify: `UPDATE leads SET status = 'email_2_sent' WHERE id = ...` succeeds

### Phase 2: Pipeline Scripts (in `~/Desktop/Maaya/scripts/`)

All scripts use the same lead schema. Each is independent — can be run manually or chained.

#### Script 1: `source-leads.mjs`
- Takes city/state list → Serper `/places` API (1 query per city, 10-15 leads each)
- Dedup against existing Supabase leads (by domain + phone)
- Filter: chains (petco/petsmart/woof gang), aggregator sites (moego.pet/vagaro.com)
- Output: JSON file + upsert into Supabase leads table
- **Input:** `["Boston MA", "Chicago IL", "Denver CO", "Phoenix AZ", "Seattle WA", ...]` maintained in `~/Desktop/Maaya/research/cities-to-source.json`
- **Verify:** Run `curl .../leads?select=count` → count increased

#### Script 2: `enrich-emails.mjs`
- Takes leads without emails from Supabase → Serper `site:domain contact email` organic search
- Extract emails from search snippets using regex
- Update `email` field in Supabase for each lead found
- **Rate:** ~30% success rate, 5 leads/batch × 100ms delay
- **Output:** updates existing Supabase records
- **Verify:** `curl .../leads?select=business_name,email&email=is.null` → count decreased

#### Script 3: `build-demos.mjs` ← **THE DEMO GENERATOR**
- Takes leads with: `business_name`, `email`, `phone`, `website`, `city`, `state`, `google_rating`
- Generates `data/demo-configs/{slug}.json` config file for each
- **SLUG generation:** `{business-name-simplified}-{city}` (e.g., `pampered-paws-denver`) → ensure unique via Supabase check
- **AUTO-POPULATED fields (no web scraping needed):**
  - `business_name` → from Supabase leads table
  - `greeting` → "Hey! Welcome to {business_name}. I'm the AI receptionist. How can I help you today?"
  - `hours` → "Mon-Fri 9AM-6PM, Sat 9AM-2PM" (standard grooming salon hours — AI can clarify specifics in chat)
  - `location` → "{city}, {state}" from Supabase
  - `phone` → from Supabase leads table
  - `website` → from Supabase leads table
  - `business_type` → "Professional Pet Grooming Salon"
  - `services` → Use a standard pet grooming set (Bath & Brush, Full Groom, Breed-Specific Grooming, Nail Trim, De-shedding, Teeth Brushing) with standard pricing ($35-150 range based on size)
  - `faq` → 5 standard grooming FAQ entries (breed awareness, puppy first groom, anxious dogs, how long does grooming take, vaccination requirements)
  - `theme.primary_color` → Use a hash of business_name to pick from 6 warm colors (amber, teal, rose, green, blue, violet)
  - `theme.position` → Default "bottom-right"
- **Deploy step:** Commit new config files to git → push to GitHub → Vercel auto-deploys
- **Update leads table:** Set `demo_slug` field for each lead
- **Verify:** `curl https://nextreachstudio.com/demo/{slug}` → returns 200 with correct business name

#### Script 4: `send-emails.mjs`
- Takes leads with `demo_slug` and `status = 'new'` → sends via Brevo Template 10
- **BUT FIX:** Send via Brevo API contacts import route, NOT individual transactional sends
- **Use Brevo's contact endpoint:** `POST /v3/contacts` → add to list with `{businessName}` as attribute
- Then: `POST /v3/smtp/emailTemplate` with templateId: 10, batch send
- **OR SIMPLER:** Continue with transactional send but fix the params:
  ```js
  // For each lead, create a Brevo contact with businessName attribute FIRST
  // Then template {{params.businessName}} resolves from contact attributes
  await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: { 'api-key': KEY, 'accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: lead.email,
      attributes: { businessName: lead.business_name },
      listIds: [6],
      updateEnabled: true
    })
  });
  ```
  The issue was sending templateId with params directly — Brevo templates with `{{params.*}}` expect contacts to have those attributes
- **Daily limit:** 25/day (well under 300 limit)
- **Track:** Update `status = 'email_sent'`, `email_sent_at` in Supabase
- **Verify:** Brevo dashboard shows sent emails + Supabase statuses updated

#### Script 5: `process-replies.mjs`
- Polls Brevo webhook for reply events OR checks Supabase `email_replies` table
- Updates lead status from `email_sent` → `replied` when reply received
- For positive replies: notifies Sanruo (could be a console log or webhook to Discord/Slack)
- **Future:** Zoho Mail IMAP integration to read replies directly
- **Verify:** Reply detected within 5 minutes + lead status auto-updates

#### Script 6: `auto-followups.mjs`
- Every 6 hours, checks Supabase for leads:
  - Day 4 (`email_sent_at` >= 4 days ago, status = `email_sent`) → send templateId 13
  - Day 8 → send templateId 12
  - Day 12 → flag for phone call
  - Day 15 → send templateId 11 (nurture) → status = `nurture`
- Updates status and `email_2_sent_at`/`email_3_sent_at` accordingly
- **Verify:** Run manually → no follow-ups sent for leads that are < 4 days old

### Phase 3: Master Pipeline Script

- [ ] **Task 7:** Create `pipeline-daily.mjs` — runs all 6 scripts in sequence
  - Step 1: source-leads (needs new cities)
  - Step 2: enrich-emails (fill gaps)
  - Step 3: build-demos (generate configs)
  - Step 4: deploy (git add + commit + push → Vercel)
  - Step 5: send-emails (up to 25 with demo built)
  - Step 6: process-replies (catch any incoming)
  - Step 7: auto-followups (day 4/8/12/15)
  - **Input:** None — runs autonomously daily
  - **Output:** Console report: "Sourced X, Enriched Y, Built Z demos, Sent W emails, N replies"

### Phase 4: Demo Build Pipeline (for 111 existing leads)

- [ ] **Task 8:** Batch-build demo configs for all 111 leads that don't have demos yet → Generate all JSON configs → Commit → Push to GitHub (Vercel deploys automatically)
  - **Verify:** Visit 3 random demo URLs → all load with correct business names

### Phase 5: Email Sending Sprint

- [ ] **Task 9:** For all 111 leads → send Email 1 via Brevo templateId 10, 25/day → Takes ~5 days
  - **Verify:** Supabase shows `status='email_sent'` for all sent
  - **Verify:** Brevo daily send count stays under 300

## Daily Schedule (once pipeline is running)

| Time | Action |
|------|--------|
| 9 AM | Morning pulse: check replies, update pipeline |
| 10 AM | Source 2-3 new cities (20-30 leads) |
| 10:15 AM | Enrich emails + build demos for new leads |
| 11 AM | Send 25 emails (Email 1) to leads with demos built |
| 11 AM | Auto-check follow-ups (any Day 4/8 due?) |
| Evening | Reply processing: positive leads → notify Sanruo |

## Brevo Email Cadence + Templates

| Day | Template | Action |
|-----|----------|--------|
| 1 | ID 10 (Email 1) | Initial outreach with demo link |
| 4 | ID 13 (Email 2) | Follow-up "saw you checked it out" |
| 8 | ID 12 (Email 3) | Final nudge |
| 12 | — | Phone call (Sanruo) |
| 15 | ID 11 (Nurture) | Keep in nurture list |

## Serper Usage Math

| Operation | Queries/day | Queries/month |
|-----------|-------------|---------------|
| Source 5 cities | 5 | 150 |
| Enrich 30 leads | 30 | 900 |
| **Total** | **~35** | **~1,050** |

**2,500/month → enough for ~80 leads/day sourced+enriched.** More than enough for our 25/day sending.

## Key Decisions

1. **Fix Brevo params via contacts** — The `{{params.businessName}}` in templates resolves from contact attributes, NOT from transactional send params. Solution: create contacts with attributes first, then send via template, or switch the template to use `{{params.businessName}}` with proper transactional params
2. **Demos use standard auto-generated configs** — 1 min per demo because we don't need custom scraping (AI chatbot handles specifics intelligently via the Cerebras LLM)
3. **Vercel auto-deploy** — committing config files to git → deploy → demos live

## Files to Create/Modify

| File | Action |
|------|--------|
| `~/.openclaw/skills/pipeline/source-leads.mjs` | NEW — Serper sourcing |
| `~/.openclaw/skills/pipeline/enrich-emails.mjs` | NEW — Email enrichment |
| `~/.openclaw/skills/pipeline/build-demos.mjs` | NEW — Demo config generator |
| `~/.openclaw/skills/pipeline/send-emails.mjs` | NEW — Brevo email sending |
| `~/.openclaw/skills/pipeline/auto-followups.mjs` | NEW — Follow-up automation |
| `~/.openclaw/skills/pipeline/pipeline-daily.mjs` | NEW — Master orchestrator |
| `nextreach-studio-bloom/data/demo-configs/*.json` | GENERATED (100+ files) |
| `nextreach-studio-bloom/supabase/migrations/002_add_cols.sql` | NEW — add missing columns + fix constraint |
| `nextreach-studio-bloom/.gitignore` | NO CHANGE |

## Edge Cases, Failure Modes & Guard Rails

### 1. Follow-up Safety — NEVER email someone who already replied

**Core rule:** Before any follow-up send, check `status` in Supabase. Only send if status = `email_sent` (Email 2) or `email_2_sent` (Email 3). If status is `replied`, `call_booked`, `won`, `lost`, `nurture` — **SKIP immediately.**

```js
// Every follow-up script first checks:
const safeToSend = ['email_sent', 'email_2_sent'].includes(lead.status);
if (!safeToSend) { console.log(`SKIP: ${lead.business_name} — status is ${lead.status}`); return; }
```

**Additional protections:**
- Sanruo marks replied leads in admin dashboard → status changes to `replied` → pipeline reads this status and skips
- Double-check: also check `last_reply_at` is null before sending any follow-up
- Log every skip: "SKIPPED follow-up for Barkin' Creek — status: replied"

### 2. Email Sending — NEVER double-send to same person

**Failure:** Script runs twice, sends Email 1 again. Prospect gets duplicate identical emails.
**Guard:** Only send to `status = 'new'` leads. Immediately set `status = 'email_sent'` BEFORE actually sending (or use a lock table). If send fails, revert to `new`.
```js
// Atomic: update status first, then send
await sb.from('leads').update({ status: 'sending_email_1' }).eq('id', id);
const sent = await brevoSend(templateId, lead);
if (!sent) { await sb.from('leads').update({ status: 'new' }).eq('id', id); }
```

### 3. Brevo Contact Creation — Rate limit & Duplicate Handling

**Failure:** Contact already exists, `POST /v3/contacts` returns 400.
**Guard:** Use `updateEnabled: true` (upsert) — if contact exists, attributes get updated, no error. Add 100ms delay between contacts to stay under rate limits.
```js
// Contact upsert with error handling
const r = await brevo('/v3/contacts', { email, attributes: { businessName }, listIds: [6], updateEnabled: true });
if (!r.ok && r.status !== 400) throw new Error(`Brevo error: ${r.status}`);
// 400 = duplicate but ok since we want updateEnabled behavior
```

### 4. Demo Config Generation — Slug Collisions & Duplicate Files

**Failure:** Two businesses generate the same slug (e.g., "Pampered Paws" and "Pampered Paws #2" both become `pampered-paws`).
**Guard:** Before writing config file, check Supabase `clients` table for existing slug. If exists, append number: `pampered-paws-2`. Also check file system.
```js
async function makeSlug(businessName, city) {
  let slug = `${businessName}-${city}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '');
  const existing = await sb.from('clients').select('slug').eq('slug', slug).single();
  if (existing.data) { slug += '-2'; }
  return slug;
}
```

### 5. Vercel Deploy — Too Many Files, Deploy Timeout

**Failure:** Committing 100 JSON files triggers Vercel deploy, exceeds 45s build timeout or 100MB limit.
**Guard:** Batch commits — max 30 configs per push. Check deploy status before committing more. Deploy is idempotent — if deploy is in progress, wait before committing more.
```
# Before git push: check deploy is complete
curl https://api.vercel.com/v6/deployments?projectId=xxx&state=READY
```

### 6. Serper API — Rate Limit, Quota Exhaustion

**Failure:** Serper returns 429 or runs out of credits mid-enrichment.
**Guard:** Check remaining credits? Serper doesn't expose a quota endpoint, so: log every query, track count monthly. If >2,400 queries used, stop auto-enrichment and alert Sanruo.
```js
const queriesUsed = parseInt(process.env.SERPER_QUERIES_USED || 0);
if (queriesUsed > 2400) { console.error('Serper quota near limit — stopping enrichment'); return; }
```

### 7. Supabase Connection — Anon Key Failing for Writes

**Current state:** We only have anon key, not service_role key. Anon key may fail writes if RLS policies block it.
**Guard:** If Supabase write fails, log to JSON file + retry queue file. Sanruo alerted to manually add.
```js
// If Supabase fails, save to disk
writeFileSync('supabase-retry-queue.json', JSON.stringify(queuedWrites, null, 2));
```

### 8. Follow-up Timing — Wrong Day Math

**Failure:** Follow-up sends on wrong day (off-by-one).
**Guard:** Use exact date math, not fuzzy "approximately."
```js
const daysSinceSent = (Date.now() - new Date(lead.email_sent_at).getTime()) / 86400000;
// Day 4 follow-up: daysSinceSent >= 4 && daysSinceSent < 5
// Day 8 follow-up: daysSinceSent >= 8 && daysSinceSent < 9
// This prevents double-sending follow-ups
```

### 9. Lead Data Integrity — Missing Required Fields

**Failure:** Source script creates leads with null business_name, null email, or garbage data.
**Guard:** Validate every lead before inserting into Supabase. Business name must be non-empty, email must match regex.
```js
if (!lead.business_name?.trim() || !lead.email?.match(emailRegex)) { console.log('INVALID lead, skipping'); continue; }
```

### 10. Script Failure Mid-Pipeline — Partial State

**Failure:** Demo builder runs for 50 leads, crashes at lead 23. 22 configs written, 28 leads never get demo_slug set.
**Guard:** Each script is idempotent. Rerunning it picks up where it left off. Demo builder checks: "does config file already exist?" before writing.
```js
if (fs.existsSync(configFile)) { console.log('SKIP: config exists'); continue; }
```

### 11. Timezone — Sending Emails at Wrong Hour

**Failure:** Email sent at 2 AM recipient's local time. Marked as spam.
**Guard:** Enforce 9-11 AM recipient local time window. Parse lead's timezone from state. Use `Intl.DateTimeFormat` to check.
```js
const hour = new Date().toLocaleString('en-US', { timeZone: tz, hour: 'numeric', hour12: false });
if (hour < 9 || hour > 11) { queued++; return; } // skip, try again tomorrow
```

### 12. Pipeline Daily — Should Resume, Not Restart

**Failure:** Script runs, completes steps 1-3, then crashes at step 4 (send-emails). Next run skips 1-3 (already done) and resumes at 4.
**Guard:** Track pipeline run state in a JSON file. Mark each step as `done` when complete.
```js
const state = { date: '2026-04-04', steps: { source: 'done', enrich: 'done', demos: 'done', send: 'failed', followups: 'pending' } };
// Next run reads state: resumes from 'send'
```

---

## Edge Case Summary Table

| Scenario | Prevention | Impact if Not Fixed |
|----------|-----------|---------------------|
| Replied lead gets follow-up | Check status in Supabase before sending | Looks unprofessional, wastes lead |
| Double-sending Email 1 | Atomic status change before send | Duplicate emails, flagged as spam |
| Brevo duplicate contact | `updateEnabled: true` (upsert) | 400 error, script crashes |
| Slug collision | Check DB + filesystem before writing | Demo page shows wrong business |
| Vercel deploy timeout | Batch commits (30 files max) | No demos deployed, wasted work |
| Serper quota exhaustion | Track queries, stop at 2,400 | No more lead sourcing/enrichment |
| Supabase write failure | Retry queue + JSON fallback | Data loss |
| Off-by-one follow-up day | Exact date range check (4.0-4.99) | Wrong timing or double-send |
| Bad lead data | Validate before insert | Polluted database |
| Script crash mid-pipeline | Idempotent scripts + state file | Restart from scratch = wasted time/cost |
| Wrong timezone send | Enforce 9-11 AM recipient local | Bad first impression |
| Partial pipeline progress | State file tracking step completion | Redoing work on restart |

---

## Risks

- **Brevo rate limit:** 300/day — we're at 25/day + follow-ups = ~50/day max. Safe.
- **Serper burn rate:** At 35/day = ~1,050/month. 71% headroom. If we hit limit, switch to manual enrichment.
- **Vercel deploy time:** Each config file change triggers deploy → could slow down during batch adds. Mitigation: batch commit 20-30 configs at once, single deploy.
- **Cerebras cost:** ~$0.0003/message × ~100 demo chats = $0.03. Negligible.

## Success Criteria

- [ ] 100+ leads in Supabase with emails
- [ ] 100+ demo configs generated + deployed
- [ ] Daily pipeline runs autonomously (source → enrich → demo → send)
- [ ] 25 emails sent/day to new prospects
- [ ] Follow-ups sent automatically on Day 4/8/12/15
- [ ] First paying client within 3 weeks

## Budget Summary

| Tool | Free Tier | Usage | Enough? |
|------|-----------|-------|---------|
| **Serper** | 2,500 queries/month | ~1,050/month | **YES — 71% headroom** |
| **Brevo** | 300 emails/day | ~50/day (25 initial + 25 followups) | **YES — 83% headroom** |
| **Cerebras** | Pay-per-use | ~$0.03/day (100 messages) | **YES — $0.90/month** |
| **Supabase** | Free (500MB) | Tiny (< 10MB) | **YES** |
| **Vercel** | Free (hobby) | 1 deploy/day | **YES** |
