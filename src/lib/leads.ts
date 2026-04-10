import fs from "fs";
import path from "path";
import { getSupabase } from "./supabase";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

export const LEAD_STATUSES = [
  "new",
  "enriching",
  "researched",
  "demo_built",
  "email_sent",
  "email_2_sent",
  "email_3_sent",
  "replied",
  "call_booked",
  "won",
  "lost",
  "nurture",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export interface Lead {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone?: string;
  city?: string;
  state?: string;
  website?: string;
  instagram?: string;
  googleRating?: number;
  googleReviewCount?: number;
  bookingSystem?: string;
  painPoint?: string;
  status: LeadStatus;
  planInterest?: string;
  demoSlug?: string;
  trackedLink?: string;
  emailSentAt?: string;
  lastReplyAt?: string;
  demoClickedAt?: string;
  followUpAt?: string;
  email2SentAt?: string;
  email3SentAt?: string;
  enrichmentComplete?: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadRow {
  id: string;
  business_name: string;
  owner_name: string;
  email: string;
  phone?: string;
  city?: string;
  state?: string;
  website?: string;
  instagram?: string;
  google_rating?: number;
  google_review_count?: number;
  booking_system?: string;
  pain_point?: string;
  status: string;
  plan_interest?: string;
  demo_slug?: string;
  tracked_link?: string;
  email_sent_at?: string;
  last_reply_at?: string;
  demo_clicked_at?: string;
  follow_up_at?: string;
  email_2_sent_at?: string;
  email_3_sent_at?: string;
  enrichment_complete?: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
}

function leadRowToLead(row: LeadRow): Lead {
  return {
    id: row.id,
    businessName: row.business_name,
    ownerName: row.owner_name,
    email: row.email,
    phone: row.phone,
    city: row.city,
    state: row.state,
    website: row.website,
    instagram: row.instagram,
    googleRating: row.google_rating,
    googleReviewCount: row.google_review_count,
    bookingSystem: row.booking_system,
    painPoint: row.pain_point,
    status: row.status as LeadStatus,
    planInterest: row.plan_interest,
    demoSlug: row.demo_slug,
    trackedLink: row.tracked_link,
    emailSentAt: row.email_sent_at,
    lastReplyAt: row.last_reply_at,
    demoClickedAt: row.demo_clicked_at,
    followUpAt: row.follow_up_at,
    email2SentAt: row.email_2_sent_at,
    email3SentAt: row.email_3_sent_at,
    enrichmentComplete: row.enrichment_complete,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function leadToRow(lead: Partial<Lead>): Partial<LeadRow> {
  return {
    id: lead.id,
    business_name: lead.businessName,
    owner_name: lead.ownerName,
    email: lead.email,
    phone: lead.phone,
    city: lead.city,
    state: lead.state,
    website: lead.website,
    instagram: lead.instagram,
    google_rating: lead.googleRating,
    google_review_count: lead.googleReviewCount,
    booking_system: lead.bookingSystem,
    pain_point: lead.painPoint,
    status: lead.status,
    plan_interest: lead.planInterest,
    demo_slug: lead.demoSlug,
    tracked_link: lead.trackedLink,
    email_sent_at: lead.emailSentAt,
    last_reply_at: lead.lastReplyAt,
    demo_clicked_at: lead.demoClickedAt,
    follow_up_at: lead.followUpAt,
    email_2_sent_at: lead.email2SentAt,
    email_3_sent_at: lead.email3SentAt,
    enrichment_complete: lead.enrichmentComplete,
    notes: lead.notes,
    created_at: lead.createdAt,
    updated_at: lead.updatedAt,
  };
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readLeadsJson(): Lead[] {
  ensureDataDir();
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, "[]", "utf-8");
    return [];
  }
  const raw = fs.readFileSync(LEADS_FILE, "utf-8");
  return JSON.parse(raw) as Lead[];
}

function writeLeadsJson(leads: Lead[]) {
  ensureDataDir();
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

export function generateId(): string {
  return crypto.randomUUID();
}

export async function readLeads(status?: string): Promise<Lead[]> {
  const sb = getSupabase();
  if (sb) {
    let query = sb.from("leads").select("*").order("created_at", { ascending: false });
    if (status) {
      query = query.eq("status", status);
    }
    const result = await query;
    if (result.error) {
      console.error("Supabase readLeads error:", result.error);
      return readLeadsJson();
    }
    return (result.data || []).map(leadRowToLead);
  }
  let leads = readLeadsJson();
  if (status) {
    leads = leads.filter((l) => l.status === status);
  }
  return leads;
}

export async function createLead(lead: Partial<Lead>): Promise<Lead | null> {
  const sb = getSupabase();
  const now = new Date().toISOString();
  const newLead: Partial<Lead> = {
    ...lead,
    id: generateId(),
    status: lead.status || "new",
    createdAt: now,
    updatedAt: now,
  };

  if (sb) {
    const result = await sb
      .from("leads")
      .insert(leadToRow(newLead))
      .select()
      .single();
    if (result.error) {
      console.error("Supabase createLead error:", result.error);
      return null;
    }
    return leadRowToLead(result.data as LeadRow);
  }

  const leads = readLeadsJson();
  leads.push(newLead as Lead);
  writeLeadsJson(leads);
  return newLead as Lead;
}

export async function updateLead(id: string, updates: Partial<Lead>): Promise<Lead | null> {
  const sb = getSupabase();
  const now = new Date().toISOString();

  if (sb) {
    const result = await sb
      .from("leads")
      .update({ ...leadToRow(updates), updated_at: now })
      .eq("id", id)
      .select()
      .single();
    if (result.error) {
      console.error("Supabase updateLead error:", result.error);
      return null;
    }
    return leadRowToLead(result.data as LeadRow);
  }

  const leads = readLeadsJson();
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return null;
  leads[index] = { ...leads[index], ...updates, id, updatedAt: now };
  writeLeadsJson(leads);
  return leads[index];
}

export async function deleteLead(id: string): Promise<boolean> {
  const sb = getSupabase();

  if (sb) {
    const result = await sb.from("leads").delete().eq("id", id);
    if (result.error) {
      console.error("Supabase deleteLead error:", result.error);
      return false;
    }
    return true;
  }

  const leads = readLeadsJson();
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return false;
  leads.splice(index, 1);
  writeLeadsJson(leads);
  return true;
}

export async function bulkUpdateLeads(ids: string[], updates: Partial<LeadRow>): Promise<number> {
  const sb = getSupabase();
  const now = new Date().toISOString();
  const updateRow = { ...updates, updated_at: now };

  if (sb) {
    const result = await sb.from("leads").update(updateRow).in("id", ids);
    if (result.error) {
      // Fallback: update one at a time
      let count = 0;
      for (const id of ids) {
        const r = await sb.from("leads").update({ ...updates, id, updated_at: now }).eq("id", id);
        if (!r.error) count++;
      }
      return count;
    }
    return ids.length;
  }

  // JSON fallback
  let count = 0;
  const leads = readLeadsJson();
  const idSet = new Set(ids);
  for (const lead of leads) {
    if (idSet.has(lead.id)) {
      Object.assign(lead, updates, { updatedAt: now });
      count++;
    }
  }
  writeLeadsJson(leads);
  return count;
}

export async function bulkDeleteLeads(ids: string[]): Promise<number> {
  const sb = getSupabase();

  if (sb) {
    const result = await sb.from("leads").delete().in("id", ids);
    if (result.error) {
      console.error("Supabase bulkDelete error:", result.error);
      // Fallback: delete one at a time
      let count = 0;
      for (const id of ids) {
        if (await deleteLead(id)) count++;
      }
      return count;
    }
    return ids.length;
  }

  // JSON fallback
  const allLeads = readLeadsJson();
  const idSet = new Set(ids);
  const remainingLeads = allLeads.filter((l) => !idSet.has(l.id));
  const deletedCount = allLeads.length - remainingLeads.length;
  writeLeadsJson(remainingLeads);
  return deletedCount;
}

export async function bulkCreateLeads(leadData: Partial<LeadRow>[]): Promise<Lead[]> {
  const sb = getSupabase();
  const now = new Date().toISOString();

  const rows: LeadRow[] = leadData.map((d) => ({
    id: generateId(),
    status: d.status || "new",
    created_at: now,
    updated_at: now,
    ...d,
  })) as LeadRow[];

  if (sb) {
    const result = await sb.from("leads").insert(rows).select();
    if (result.error) {
      console.error("Supabase bulkCreate error:", result.error);
      // Fallback: one at a time
      for (const row of rows) {
        await sb.from("leads").insert(row);
      }
      return rows.map(leadRowToLead);
    }
    return (result.data as LeadRow[]).map(leadRowToLead);
  }

  // JSON fallback
  const leads = readLeadsJson();
  const newLeads = rows.map(leadRowToLead);
  leads.push(...newLeads);
  writeLeadsJson(leads);
  return newLeads;
}

export async function getLeadStats(leads?: Lead[]): Promise<{
  total: number;
  new: number;
  inPipeline: number;
  won: number;
  lost: number;
  conversionRate: string;
  byStatus: Record<string, number>;
}> {
  const allLeads = leads || await readLeads();
  const byStatus: Record<string, number> = {};
  for (const s of LEAD_STATUSES) byStatus[s] = 0;
  for (const lead of allLeads) {
    byStatus[lead.status] = (byStatus[lead.status] || 0) + 1;
  }

  const pipeline =
    (byStatus["enriching"] || 0) +
    (byStatus["researched"] || 0) +
    (byStatus["demo_built"] || 0) +
    (byStatus["email_sent"] || 0) +
    (byStatus["email_2_sent"] || 0) +
    (byStatus["email_3_sent"] || 0) +
    (byStatus["replied"] || 0) +
    (byStatus["call_booked"] || 0);

  const won = byStatus["won"] || 0;
  const conversionRate = allLeads.length > 0
    ? ((won / allLeads.length) * 100).toFixed(1) + "%"
    : "0%";

  return {
    total: allLeads.length,
    new: byStatus["new"] || 0,
    inPipeline: pipeline,
    won,
    lost: byStatus["lost"] || 0,
    conversionRate,
    byStatus,
  };
}
