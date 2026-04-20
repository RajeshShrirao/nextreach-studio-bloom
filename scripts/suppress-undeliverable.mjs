#!/usr/bin/env node
// suppress-undeliverable.mjs — Mark Brevo hard-bounce/blocked leads as do-not-email in Supabase
// Usage:
//   node scripts/suppress-undeliverable.mjs --dry-run --start=YYYY-MM-DD --end=YYYY-MM-DD --tag-prefix=prospect-
// Defaults: last 90 days, tag-prefix=prospect-

import { createClient } from "@supabase/supabase-js";

const BREVO_BASE = "https://api.brevo.com/v3";
const BREVO_KEY = process.env.BREVO_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!BREVO_KEY) {
  console.error("Missing BREVO_API_KEY");
  process.exit(1);
}
if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const dryRun = process.argv.includes("--dry-run");

function arg(name, fallback) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
}

function toYMD(d) {
  return d.toISOString().slice(0, 10);
}

function parseYMD(s) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) throw new Error(`Invalid date: ${s}`);
  return s;
}

async function fetchEvents({ startDate, endDate, event, limit = 2500, sort = "asc" }) {
  const out = [];
  let offset = 0;
  while (true) {
    const url = new URL(`${BREVO_BASE}/smtp/statistics/events`);
    url.searchParams.set("startDate", startDate);
    url.searchParams.set("endDate", endDate);
    url.searchParams.set("event", event);
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("offset", String(offset));
    url.searchParams.set("sort", sort);

    const r = await fetch(url.toString(), {
      headers: { "api-key": BREVO_KEY, accept: "application/json" },
    });
    const text = await r.text();
    if (!r.ok) throw new Error(`Brevo ${event} error ${r.status}: ${text.slice(0, 200)}`);
    const json = JSON.parse(text);
    const events = json.events || [];
    out.push(...events);
    if (events.length < limit) break;
    offset += limit;
  }
  return out;
}

function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

function appendNote(existing, line) {
  const base = (existing || "").trim();
  if (!base) return line;
  if (base.includes(line)) return base;
  return `${base}\n${line}`;
}

async function main() {
  const tagPrefix = arg("tag-prefix", "prospect-");

  const today = new Date();
  const startDefault = new Date(today.getTime() - 90 * 86400 * 1000);

  const startDate = parseYMD(arg("start", toYMD(startDefault)));
  const endDate = parseYMD(arg("end", toYMD(today)));

  const [hard, blocked] = await Promise.all([
    fetchEvents({ startDate, endDate, event: "hardBounces" }),
    fetchEvents({ startDate, endDate, event: "blocked" }),
  ]);

  // email -> { reasons:Set, lastDate:string }
  const undeliverable = new Map();

  function add(events, reason) {
    for (const e of events) {
      const tag = String(e.tag || "");
      if (tagPrefix && !tag.startsWith(tagPrefix)) continue;

      const email = String(e.email || "").toLowerCase().trim();
      if (!email) continue;
      const date = String(e.date || "");

      if (!undeliverable.has(email)) undeliverable.set(email, { reasons: new Set(), lastDate: date });
      const row = undeliverable.get(email);
      row.reasons.add(reason);
      if (date && (!row.lastDate || date > row.lastDate)) row.lastDate = date;
    }
  }

  add(hard, "hardBounces");
  add(blocked, "blocked");

  const emails = [...undeliverable.keys()];
  if (emails.length === 0) {
    console.log("No undeliverable emails found in Brevo events for this window.");
    return;
  }

  // Fetch matching leads
  const leads = [];
  for (const part of chunk(emails, 100)) {
    const { data, error } = await supabase
      .from("leads")
      .select("id,business_name,email,status,notes")
      .in("email", part);
    if (error) throw error;
    if (data?.length) leads.push(...data);
  }

  const PROTECT = new Set(["replied", "call_booked", "won"]);

  let matched = 0;
  let updated = 0;
  let skipped = 0;

  for (const lead of leads) {
    matched++;
    const email = String(lead.email || "").toLowerCase().trim();
    const info = undeliverable.get(email);
    if (!info) continue;

    if (PROTECT.has(lead.status)) {
      skipped++;
      continue;
    }

    const reasons = [...info.reasons].sort().join(",");
    const note = `UNDLVRBL (brevo:${reasons}) ${info.lastDate || ""}`.trim();

    if (dryRun) {
      console.log(`WOULD SUPPRESS: ${lead.business_name} <${email}> (status=${lead.status}) reasons=${reasons}`);
      continue;
    }

    const nextNotes = appendNote(lead.notes, note);

    const { error } = await supabase
      .from("leads")
      .update({
        status: lead.status === "lost" ? "lost" : "lost",
        notes: nextNotes,
        updated_at: new Date().toISOString(),
      })
      .eq("id", lead.id);

    if (error) {
      console.error(`FAILED suppress ${lead.business_name} <${email}>:`, error.message);
      continue;
    }

    updated++;
  }

  console.log(
    JSON.stringify(
      {
        window: { startDate, endDate },
        tagPrefix,
        dryRun,
        undeliverable_emails: emails.length,
        leads_matched: matched,
        leads_updated: updated,
        leads_skipped_protected: skipped,
      },
      null,
      2
    )
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
