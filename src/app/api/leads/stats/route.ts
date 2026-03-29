import { NextResponse } from "next/server";
import { readLeads, getLeadStats } from "@/lib/leads";

export async function GET() {
  const leads = readLeads();
  const stats = getLeadStats(leads);
  return NextResponse.json(stats);
}
