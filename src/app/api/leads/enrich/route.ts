import { NextRequest, NextResponse } from "next/server";
import { readLeads, updateLead, bulkUpdateLeads, type LeadRow } from "@/lib/leads";

// Single lead enrichment by business name
export async function PATCH(request: NextRequest) {
  try {
    const { businessName, data } = await request.json();

    if (!businessName || !data) {
      return NextResponse.json(
        { error: "businessName and data required" },
        { status: 400 },
      );
    }

    const leads = await readLeads();
    const lead = leads.find(
      (l) => l.businessName.toLowerCase() === businessName.toLowerCase(),
    );

    if (!lead) {
      return NextResponse.json(
        { data: null, error: `Lead not found: ${businessName}` },
        { status: 404 },
      );
    }

    const updated = await updateLead(lead.id, data);
    if (!updated) {
      return NextResponse.json(
        { data: null, error: "Failed to update lead" },
        { status: 500 },
      );
    }

    return NextResponse.json({ data: updated, error: null });
  } catch {
    return NextResponse.json({ data: null, error: "Invalid request" }, { status: 400 });
  }
}

// Bulk enrichment — find by name and update
export async function POST(request: NextRequest) {
  try {
    const { updates } = await request.json();

    if (!updates || !Array.isArray(updates)) {
      return NextResponse.json(
        { error: "updates array required" },
        { status: 400 },
      );
    }

    // updates format: [{ businessName: "...", email: "...", ownerName?: "..." }]
    const leads = await readLeads();
    const results: Record<string, boolean | string> = {};

    for (const item of updates) {
      const lead = leads.find(
        (l) => l.businessName.toLowerCase() === item.businessName.toLowerCase(),
      );

      if (!lead) {
        results[item.businessName] = "not_found";
        continue;
      }

      const updateData: Partial<LeadRow> = {};
      if (item.email) updateData.email = item.email;
      if (item.ownerName !== undefined) updateData.owner_name = item.ownerName;
      if (item.notes) updateData.notes = item.notes;

      await updateLead(lead.id, updateData as any);
      results[item.businessName] = true;
    }

    const enriched = Object.values(results).filter((v) => v === true).length;

    return NextResponse.json({
      data: results,
      enriched,
      total: updates.length,
      error: null,
    });
  } catch {
    return NextResponse.json(
      { data: null, enriched: 0, error: "Invalid request" },
      { status: 400 },
    );
  }
}
