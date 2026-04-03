#!/usr/bin/env node
// build-demos.mjs — Generate demo configs for leads without demos
// Usage: node scripts/build-demos.mjs [--dry-run] [--limit N]

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_DIR = path.join(__dirname, "..", "data", "demo-configs");

const dryRun = process.argv.includes("--dry-run");
const limitArg = process.argv.find(a => a.startsWith("--limit="));
const limit = limitArg ? parseInt(limitArg.split("=")[1]) : Infinity;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ACCESS_TOKEN
);

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in env");
  process.exit(1);
}

// Standard services for pet grooming salons
const SERVICES = [
  { name: "Bath & Brush", price: "From $35", duration: "45-60 min" },
  { name: "Full Groom", price: "From $55", duration: "1.5-2 hrs" },
  { name: "Breed-Specific Groom", price: "From $65", duration: "1.5-2.5 hrs" },
  { name: "Nail Trim", price: "From $15", duration: "15 min" },
  { name: "De-shedding Treatment", price: "From $45", duration: "30-45 min" },
  { name: "Teeth Brushing", price: "From $20", duration: "15 min" }
];

const COLORS = ["#F59E0B", "#14B8A6", "#F43F5E", "#22C55E", "#3B82F6", "#8B5CF6"];

function slugify(text, maxLen = 64) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, maxLen)
    .replace(/-$/, "");
}

function getColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

function generateConfig(lead) {
  const slug = slugify(`${lead.business_name} ${lead.city || ""}`);
  const color = getColor(lead.business_name);

  return {
    business_name: lead.business_name,
    business_type: "Professional Pet Grooming Salon",
    greeting: `Hi there! I'm the virtual receptionist at ${lead.business_name}. How can I help you and your pup today? 🐾`,
    hours: "Mon-Sat 9AM-6PM",
    location: lead.city && lead.state
      ? `${lead.city}, ${lead.state}`
      : lead.city || "",
    phone: lead.phone || "",
    website: lead.website || `https://${slugify(lead.business_name)}.com`,
    owner_name: lead.owner_name || "",
    services: SERVICES,
    faq: [
      {
        q: "Do I need an appointment?",
        a: `Yes! Appointments are recommended for most services. You can book online at ${lead.website || "our website"} or call us directly.`
      },
      {
        q: "What breeds do you groom?",
        a: "We groom dogs of all breeds and sizes. Our team has experience with every breed and coat type."
      },
      {
        q: "How long does a full groom take?",
        a: "A full grooming session typically takes 1.5 to 2 hours depending on your dog's size, breed, and coat condition."
      },
      {
        q: "Do you handle anxious dogs?",
        a: "Absolutely! We use gentle and patient practices to make sure your dog feels safe and comfortable throughout the process."
      },
      {
        q: "Do you require vaccinations?",
        a: "Yes, we ask that all pets are up-to-date on their vaccinations for the safety of all our furry clients. Please bring records to your first visit."
      },
      {
        q: "How early can I start grooming my puppy?",
        a: "We recommend starting grooming as early as 8-10 weeks old once they've had their first round of vaccinations. Early exposure helps them become comfortable with the process."
      }
    ],
    escalation: `Great question! Let me have our team get back to you on that. You can also reach us directly at ${lead.phone || `our main line`}.`,
    theme: { primary_color: color }
  };
}

function makeSlug(lead, allSlugs) {
  const base = lead.city && lead.city.toLowerCase() !== "unknown"
    ? `${lead.business_name} ${lead.city}${lead.state ? ` ${lead.state}` : ""}`
    : `${lead.business_name}`;

  let slug = slugify(base, 64);
  let i = 2;
  while (allSlugs.has(slug)) {
    slug = slugify(`${lead.business_name} ${lead.city || "lead"}-${i}`, 64);
    i++;
  }
  allSlugs.add(slug);
  return slug;
}

async function main() {
  console.log(`${dryRun ? "[DRY RUN] " : ""}Demo Builder — starting`);

  if (!dryRun) fs.mkdirSync(CONFIG_DIR, { recursive: true });

  const existingFiles = fs.existsSync(CONFIG_DIR)
    ? new Set(fs.readdirSync(CONFIG_DIR).filter(f => f.endsWith(".json")).map(f => f.replace(".json", "")))
    : new Set();

  const { data: existingSlugs } = await supabase
    .from("leads")
    .select("demo_slug")
    .not("demo_slug", "is", null);
  const existingDbSlugs = new Set(existingSlugs?.map(s => s.demo_slug) || []);

  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .not("email", "is", null)
    .neq("email", "")
    .is("demo_slug", null)
    .order("created_at", { ascending: true });

  if (error) { console.error("Error fetching leads:", error.message); process.exit(1); }

  // All slugs that exist (files + DB) — used for uniqueness
  const allSlugs = new Set([...existingFiles, ...existingDbSlugs]);

  const finalBatch = leads.slice(0, limit);
  console.log(`Found ${leads.length} leads without demo_slug`);
  console.log(`Will build up to ${finalBatch.length} configs`);

  let built = 0;
  let skipped = 0;

  for (const lead of finalBatch) {
    const slug = makeSlug(lead, allSlugs);
    if (!slug || slug.length < 3) { skipped++; continue; }

    const config = generateConfig(lead);
    const filePath = path.join(CONFIG_DIR, `${slug}.json`);

    if (fs.existsSync(filePath)) { skipped++; continue; }

    if (dryRun) {
      console.log(`WOULD CREATE: ${slug} (${lead.business_name}, ${lead.city || "unknown"})`);
    } else {
      fs.writeFileSync(filePath, JSON.stringify(config, null, 2) + "\n", "utf-8");

      const { error: updateError } = await supabase
        .from("leads")
        .update({ demo_slug: slug, status: "demo_built", updated_at: new Date().toISOString() })
        .eq("id", lead.id);

      if (updateError) console.error(`  ERROR updating ${slug}:`, updateError.message);
    }

    built++;
    console.log(`${built}: ${slug}`);
  }

  console.log(`\nDone: ${built} built, ${skipped} skipped`);
  return built;
}

main().catch(err => { console.error(err); process.exit(1); });
