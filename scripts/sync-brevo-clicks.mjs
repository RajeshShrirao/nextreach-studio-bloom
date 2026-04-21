#!/usr/bin/env node
// sync-brevo-clicks.mjs — Backfill demo_clicked_at in Supabase from Brevo click events
// Usage:
//   node scripts/sync-brevo-clicks.mjs --dry-run --start=YYYY-MM-DD --end=YYYY-MM-DD --tag-prefix=prospect-
// Defaults: last 90 days, tag-prefix=prospect-

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const BREVO_BASE = "https://api.brevo.com/v3";
const BREVO_KEY = process.env.BREVO_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
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

async function fetchClickEvents({ startDate, endDate, limit = 2500, sort = "asc" }) {
  const out = [];
  let offset = 0;
  while (true) {
    const url = new URL(`${BREVO_BASE}/smtp/statistics/events`);
    url.searchParams.set("startDate", startDate);
    url.searchParams.set("endDate", endDate);
    url.searchParams.set("event", "clicks");
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("offset", String(offset));
    url.searchParams.set("sort", sort);

    const r = await fetch(url.toString(), {
      headers: { "api-key": BREVO_KEY, accept: "application/json" },
    });
    const text = await r.text();
    if (!r.ok) throw new Error(`Brevo clicks error ${r.status}: ${text.slice(0, 200)}`);
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

async function main() {
  const tagPrefix = arg("tag-prefix", "prospect-");

  const today = new Date();
  const startDefault = new Date(today.getTime() - 90 * 86400 * 1000);

  const startDate = parseYMD(arg("start", toYMD(startDefault)));
  const endDate = parseYMD(arg("end", toYMD(today)));

  const clickEvents = await fetchClickEvents({ startDate, endDate });

  // email -> earliest click date
  const earliest = new Map();

  for (const e of clickEvents) {
    const tag = String(e.tag || "");
    if (tagPrefix && !tag.startsWith(tagPrefix)) continue;

    const email = String(e.email || "").toLowerCase().trim();
    const date = String(e.date || "");
    if (!email || !date) continue;

    if (!earliest.has(email) || date < earliest.get(email)) earliest.set(email, date);
  }

  const emails = [...earliest.keys()];
  if (emails.length === 0) {
    console.log("No click events found for this window/tag prefix.");
    return;
  }

  let matched = 0;
  let updated = 0;
  let skippedAlreadySet = 0;
  let missing = 0;

  for (const part of chunk(emails, 100)) {
    const { data, error } = await supabase
      .from("leads")
      .select("id,business_name,email,demo_clicked_at")
      .in("email", part);
    if (error) throw error;

    const rows = data || [];
    const present = new Set(rows.map((r) => String(r.email || "").toLowerCase().trim()));

    for (const e of part) {
      if (!present.has(e)) missing++;
    }

    for (const lead of rows) {
      matched++;
      const email = String(lead.email || "").toLowerCase().trim();
      const when = earliest.get(email);
      if (!when) continue;

      if (lead.demo_clicked_at) {
        skippedAlreadySet++;
        continue;
      }

      if (dryRun) {
        console.log(`WOULD SET demo_clicked_at: ${lead.business_name} <${email}> = ${when}`);
        continue;
      }

      const { error: uerr } = await supabase
        .from("leads")
        .update({ demo_clicked_at: when, updated_at: new Date().toISOString() })
        .eq("id", lead.id)
        .is("demo_clicked_at", null);

      if (uerr) {
        console.error(`FAILED update ${lead.business_name} <${email}>:`, uerr.message);
        continue;
      }

      updated++;
    }
  }

  console.log(
    JSON.stringify(
      {
        window: { startDate, endDate },
        tagPrefix,
        dryRun,
        brevo_unique_clickers: emails.length,
        supabase_matched: matched,
        updated,
        skippedAlreadySet,
        missing_in_supabase: missing,
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
