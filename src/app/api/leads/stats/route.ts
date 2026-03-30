import { NextResponse } from "next/server";
import { readLeads, getLeadStats } from "@/lib/leads";

export async function GET() {
  const leads = await readLeads();
  const stats = await getLeadStats(leads);
  return NextResponse.json(stats);
}
