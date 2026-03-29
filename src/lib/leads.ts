import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

export const LEAD_STATUSES = [
  "not-contacted",
  "demo-built",
  "email-1-sent",
  "email-2-sent",
  "email-3-sent",
  "clicked-demo",
  "replied",
  "call-scheduled",
  "client",
  "not-interested",
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
  website?: string;
  instagram?: string;
  googleReviews?: { rating: number; count: number };
  bookingSystem?: string;
  status: LeadStatus;
  demoUrl?: string;
  trackingLink?: string;
  plan?: "starter" | "business";
  paymentStatus?: "pending" | "partial" | "paid";
  notes?: string;
  createdAt: string;
  updatedAt: string;
  lastContactedAt?: string;
  nextFollowUpAt?: string;
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function readLeads(): Lead[] {
  ensureDataDir();
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, "[]", "utf-8");
    return [];
  }
  const raw = fs.readFileSync(LEADS_FILE, "utf-8");
  return JSON.parse(raw) as Lead[];
}

export function writeLeads(leads: Lead[]) {
  ensureDataDir();
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function getLeadStats(leads: Lead[]) {
  const byStatus: Record<string, number> = {};
  for (const s of LEAD_STATUSES) byStatus[s] = 0;
  for (const lead of leads) {
    byStatus[lead.status] = (byStatus[lead.status] || 0) + 1;
  }

  const pipeline =
    (byStatus["demo-built"] || 0) +
    (byStatus["email-1-sent"] || 0) +
    (byStatus["email-2-sent"] || 0) +
    (byStatus["email-3-sent"] || 0) +
    (byStatus["clicked-demo"] || 0) +
    (byStatus["replied"] || 0) +
    (byStatus["call-scheduled"] || 0);

  return {
    total: leads.length,
    notContacted: byStatus["not-contacted"] || 0,
    inPipeline: pipeline,
    clients: byStatus["client"] || 0,
    nurture: byStatus["nurture"] || 0,
    notInterested: byStatus["not-interested"] || 0,
    byStatus,
  };
}
