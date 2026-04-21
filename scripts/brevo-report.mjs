#!/usr/bin/env node
// brevo-report.mjs — Report Brevo transactional activity (prospect emails)
// Usage:
//   node scripts/brevo-report.mjs --start=YYYY-MM-DD --end=YYYY-MM-DD --tag-prefix=prospect-
// Defaults: last 30 days, tag-prefix=prospect-

import "dotenv/config";

const BASE = "https://api.brevo.com/v3";
const KEY = process.env.BREVO_API_KEY;
if (!KEY) {
  console.error("Missing BREVO_API_KEY");
  process.exit(1);
}

function arg(name, fallback) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
}

function toYMD(d) {
  return d.toISOString().slice(0, 10);
}

function parseYMD(s) {
  // keep it simple, Brevo expects YYYY-MM-DD
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) throw new Error(`Invalid date: ${s}`);
  return s;
}

function inc(map, k) {
  map.set(k, (map.get(k) || 0) + 1);
}

async function fetchAll({ startDate, endDate, event, limit = 2500, sort = "asc" }) {
  const out = [];
  let offset = 0;

  while (true) {
    const url = new URL(`${BASE}/smtp/statistics/events`);
    url.searchParams.set("startDate", startDate);
    url.searchParams.set("endDate", endDate);
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("offset", String(offset));
    url.searchParams.set("sort", sort);
    if (event) url.searchParams.set("event", event);

    const r = await fetch(url.toString(), {
      headers: { "api-key": KEY, accept: "application/json" },
    });
    const text = await r.text();
    if (!r.ok) {
      console.error("Brevo error", r.status, text.slice(0, 500));
      process.exit(1);
    }
    const json = JSON.parse(text);
    const events = json.events || [];
    out.push(...events);

    if (events.length < limit) break;
    offset += limit;
  }

  return out;
}

function uniqueByEvent(events) {
  // key -> eventType -> Set(messageId)
  const unique = new Map();
  const total = new Map();
  const uniqueRecipientsRequested = new Set();
  const emailsByEvent = new Map(); // event -> Set(email)

  for (const e of events) {
    const ev = String(e.event || "unknown");
    const mid = String(e.messageId || "");
    const email = String(e.email || "").toLowerCase().trim();

    inc(total, ev);

    if (!unique.has(ev)) unique.set(ev, new Set());
    if (mid) unique.get(ev).add(mid);

    if (!emailsByEvent.has(ev)) emailsByEvent.set(ev, new Set());
    if (email) emailsByEvent.get(ev).add(email);

    if (ev === "requests" && email) uniqueRecipientsRequested.add(email);
  }

  const u = (ev) => unique.get(ev)?.size || 0;
  const sent = u("requests");
  const delivered = u("delivered");
  const opened = u("opened");
  const clicks = u("clicks");

  const pct = (a, b) => (b ? Math.round((a / b) * 1000) / 10 : 0);

  return {
    unique_messages: {
      requests: sent,
      delivered,
      opened,
      clicks,
      hardBounces: u("hardBounces"),
      softBounces: u("softBounces"),
      blocked: u("blocked"),
      deferred: u("deferred"),
      spam: u("spam"),
      unsubscribed: u("unsubscribed"),
      invalid: u("invalid"),
      error: u("error"),
    },
    unique_recipients_requested: uniqueRecipientsRequested.size,
    rates_pct: {
      delivery: pct(delivered, sent),
      open_of_delivered: pct(opened, delivered),
      click_of_delivered: pct(clicks, delivered),
      click_of_opened: pct(clicks, opened),
    },
    unique_emails_by_event: Object.fromEntries(
      [...emailsByEvent.entries()].map(([k, set]) => [k, set.size])
    ),
    email_lists: {
      hardBounces: [...(emailsByEvent.get("hardBounces") || new Set())].sort(),
      blocked: [...(emailsByEvent.get("blocked") || new Set())].sort(),
    },
  };
}

function groupBy(events, keyFn) {
  const m = new Map();
  for (const e of events) {
    const k = keyFn(e);
    if (!m.has(k)) m.set(k, []);
    m.get(k).push(e);
  }
  return m;
}

async function main() {
  const tagPrefix = arg("tag-prefix", "prospect-");

  const today = new Date();
  const startDefault = new Date(today.getTime() - 30 * 86400 * 1000);

  const startDate = parseYMD(arg("start", toYMD(startDefault)));
  const endDate = parseYMD(arg("end", toYMD(today)));

  const all = await fetchAll({ startDate, endDate });

  const filtered = all.filter((e) => {
    const tag = String(e.tag || "");
    return tagPrefix ? tag.startsWith(tagPrefix) : true;
  });

  const overall = uniqueByEvent(filtered);

  const byTag = groupBy(filtered, (e) => String(e.tag || "no-tag"));
  const tags = Object.fromEntries(
    [...byTag.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([tag, evs]) => [tag, uniqueByEvent(evs)])
  );

  const byTemplate = groupBy(filtered, (e) => String(e.templateId ?? "unknown"));
  const templates = Object.fromEntries(
    [...byTemplate.entries()]
      .sort((a, b) => String(a[0]).localeCompare(String(b[0])))
      .map(([tid, evs]) => [tid, uniqueByEvent(evs)])
  );

  const report = {
    window: { startDate, endDate },
    filter: { tagPrefix },
    events: { total_records: all.length, filtered_records: filtered.length },
    overall,
    byTag: tags,
    byTemplateId: templates,
  };

  console.log(JSON.stringify(report, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
