#!/usr/bin/env node
// auto-followups.mjs — Day 4/8/12/15 follow-up automation
// Usage: node scripts/auto-followups.mjs [--dry-run]

import { createClient } from "@supabase/supabase-js";
import { fileURLToPath } from "url";
import { COMPLIMENTS, pickFrom, formatLocation } from "./lib/email.js";

const __dirname = import.meta.dirname || import.meta.url.split("/").slice(0, -1).join("/");

const dryRun = process.argv.includes("--dry-run");
const BREVO_KEY = process.env.BREVO_API_KEY;
const BREVO_BASE = "https://api.brevo.com";
const LIST_ID = 6;

const TEMPLATES = {
  email_2: { id: 13, daysAfter: 4 },
  email_3: { id: 12, daysAfter: 8 },
  nurture: { id: 11, daysAfter: 15 }
};

if (!BREVO_KEY) { console.error("Missing BREVO_API_KEY"); process.exit(1); }

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function brevo(path, body) {
  const r = await fetch(`${BREVO_BASE}${path}`, {
    method: "POST",
    headers: { "api-key": BREVO_KEY, "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify(body)
  });
  const text = await r.text();
  return { ok: r.ok, status: r.status, data: r.ok && text ? JSON.parse(text) : null };
}

// SAFETY: never send to leads who have replied, won, call_booked, lost, or nurture
const UNSAFE_STATUSES = ["replied", "call_booked", "won", "lost", "nurture"];
const SAFE_STATUSES = ["email_sent", "email_2_sent", "email_3_sent"];

const MS_PER_DAY = 86400000;

async function sendFollowup(lead, templateId, label) {
  const slug = lead.demo_slug || "";
  const city = formatLocation(lead);

  await brevo("/v3/contacts", {
    email: lead.email,
    listIds: [LIST_ID],
    attributes: { businessName: lead.business_name },
    updateEnabled: true
  });

  const result = await brevo("/v3/smtp/email", {
    templateId,
    to: [{ email: lead.email, name: lead.owner_name || lead.business_name }],
    params: {
      businessName: lead.business_name,
      ownerName: lead.owner_name || "Team",
      city,
      compliment: pickFrom(COMPLIMENTS, lead.business_name),
      demoLink: `https://nextreachstudio.com/demo/${slug}`
    }
  });

  return result.ok;
}

function daysSince(dateStr) {
  if (!dateStr) return Infinity;
  return (Date.now() - new Date(dateStr).getTime()) / MS_PER_DAY;
}

async function main() {
  console.log(`${dryRun ? "[DRY RUN] " : ""}Auto Followups — starting`);

  // Get all leads that could need follow-ups
  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .in("status", SAFE_STATUSES)
    .not("email", "is", null)
    .neq("email", "");

  if (error) { console.error("Error:", error.message); process.exit(1); }
  if (!leads?.length) { console.log("No leads eligible for follow-up"); return; }

  let followUps = 0;
  let phoneFlags = 0;
  let skips = 0;

  for (const lead of leads) {
    // Skip if unsafe status (replied/call_booked/won/lost/nurture)
    if (UNSAFE_STATUSES.includes(lead.status)) { skips++; continue; }

    // Email 2: send if status=email_sent and email_sent_at is >=4 days ago
    if (lead.status === "email_sent") {
      const days = daysSince(lead.email_sent_at);
      if (days >= 4) {
        if (dryRun) { console.log(`WOULD SEND Email 2: ${lead.business_name} (${days.toFixed(1)}d overdue)`); }
        else {
          const ok = await sendFollowup(lead, TEMPLATES.email_2.id, "Email 2");
          if (ok) {
            await supabase.from("leads").update({
              status: "email_2_sent", email_2_sent_at: new Date().toISOString(), updated_at: new Date().toISOString()
            }).eq("id", lead.id);
            console.log(`SENT Email 2: ${lead.business_name}`);
          }
        }
        followUps++;
        await new Promise(r => setTimeout(r, 200));
        continue;
      }
      continue;
    }

    // Email 3: send if status=email_2_sent and email_2_sent_at is >=4 days ago
    if (lead.status === "email_2_sent") {
      const days = daysSince(lead.email_2_sent_at);
      if (days >= 4) {
        if (dryRun) { console.log(`WOULD SEND Email 3: ${lead.business_name} (${days.toFixed(1)}d overdue)`); }
        else {
          const ok = await sendFollowup(lead, TEMPLATES.email_3.id, "Email 3");
          if (ok) {
            await supabase.from("leads").update({
              status: "email_3_sent", email_3_sent_at: new Date().toISOString(), updated_at: new Date().toISOString()
            }).eq("id", lead.id);
            console.log(`SENT Email 3: ${lead.business_name}`);
          }
        }
        followUps++;
        await new Promise(r => setTimeout(r, 200));
      }
      continue;
    }

    // Nurture: send if status=email_3_sent and email_3_sent_at is >=7 days ago
    if (lead.status === "email_3_sent") {
      const days = daysSince(lead.email_3_sent_at);
      if (days >= 7) {
        if (dryRun) { console.log(`WOULD SEND Nurture: ${lead.business_name} (${days.toFixed(1)}d overdue)`); }
        else {
          const ok = await sendFollowup(lead, TEMPLATES.nurture.id, "Nurture");
          if (ok) {
            await supabase.from("leads").update({
              status: "nurture", updated_at: new Date().toISOString()
            }).eq("id", lead.id);
            console.log(`SENT Nurture: ${lead.business_name}`);
          }
        }
        followUps++;
        await new Promise(r => setTimeout(r, 200));
        continue;
      }
      // Phone flag for leads between 4-7 days after email_3_sent
      if (days >= 4 && days < 7) {
        console.log(`PHONE FLAG: ${lead.business_name} — recommend phone call (${days.toFixed(1)}d since Email 3)`);
        phoneFlags++;
      }
      continue;
    }

    // Skip leads with other statuses
    skips++;
  }

  console.log(`\nDone: ${followUps} follow-ups sent, ${phoneFlags} phone flags, ${skips} skipped`);
}

main().catch(err => { console.error(err); process.exit(1); });
