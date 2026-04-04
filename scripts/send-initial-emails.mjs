#!/usr/bin/env node
// send-initial-emails.mjs — Send Email 1 to leads with demos built
// Usage: node scripts/send-initial-emails.mjs [--dry-run] [--limit N]

import { createClient } from "@supabase/supabase-js";
import { fileURLToPath } from "url";

const __dirname = import.meta.dirname || import.meta.url.split("/").slice(0, -1).join("/");

const dryRun = process.argv.includes("--dry-run");
const limitArg = process.argv.find(a => a.startsWith("--limit="));
const limit = limitArg ? parseInt(limitArg.split("=")[1]) : 25;

const BREVO_KEY = process.env.BREVO_API_KEY;
const BREVO_BASE = "https://api.brevo.com";
const TEMPLATE_ID = 10; // Email 1
const LIST_ID = 6;

if (!BREVO_KEY) { console.error("Missing BREVO_API_KEY"); process.exit(1); }

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function brevo(path, body, method = "POST") {
  const r = await fetch(`${BREVO_BASE}${path}`, {
    method,
    headers: { "api-key": BREVO_KEY, "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify(body)
  });
  const text = await r.text();
  return { ok: r.ok, status: r.status, data: r.ok && text ? JSON.parse(text) : null };
}

// Create/update contact with businessName attribute, then send transactional
async function sendEmail(lead) {
  // Step 1: Upsert contact with businessName
  await brevo("/v3/contacts", {
    email: lead.email,
    listIds: [LIST_ID],
    attributes: { businessName: lead.business_name },
    updateEnabled: true
  });

  // Step 2: Send template email
  const slug = lead.demo_slug || "";
  const result = await brevo("/v3/smtp/email", {
    templateId: TEMPLATE_ID,
    to: [{ email: lead.email, name: lead.owner_name || lead.business_name }],
    params: {
      businessName: lead.business_name,
      ownerName: lead.owner_name || "Team",
      demoLink: `https://nextreachstudio.com/demo/${slug}`
    }
  });

  return result.ok;
}

async function main() {
  console.log(`${dryRun ? "[DRY RUN] " : ""}Send Emails — starting (limit: ${limit})`);

  // Get leads with demo_built status, ordered by priority (google_rating desc)
  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .eq("status", "demo_built")
    .not("email", "is", null)
    .neq("email", "")
    .not("demo_slug", "is", null)
    .order("google_rating", { ascending: false, nullsFirst: false })
    .limit(limit);

  if (error) { console.error("Error:", error.message); process.exit(1); }
  if (!leads?.length) { console.log("No leads to email. All caught up."); return; }

  console.log(`Found ${leads.length} leads ready to email`);

  let sent = 0;
  let failed = 0;

  for (const lead of leads) {
    const preview = `${lead.business_name} (${lead.email})`;
    if (dryRun) {
      console.log(`WOULD SEND: ${preview}`);
      sent++;
      continue;
    }

    const ok = await sendEmail(lead);
    if (ok) {
      // Update status optimistically
      await supabase
        .from("leads")
        .update({ status: "email_sent", email_sent_at: new Date().toISOString(), updated_at: new Date().toISOString() })
        .eq("id", lead.id);
      console.log(`SENT: ${preview}`);
      sent++;
    } else {
      console.error(`FAILED: ${preview}`);
      failed++;
    }
    // Small delay for rate limiting
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\nDone: ${sent} sent, ${failed} failed`);
}

main().catch(err => { console.error(err); process.exit(1); });
