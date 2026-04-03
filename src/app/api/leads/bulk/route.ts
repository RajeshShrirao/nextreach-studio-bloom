import { NextRequest, NextResponse } from "next/server";
import { createLead, type Lead } from "@/lib/leads";
import {
  bulkUpdateLeads,
  bulkDeleteLeads,
  bulkCreateLeads,
  readLeads,
} from "@/lib/leads";

interface BulkLeadInput {
  businessName: string;
  ownerName?: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  website?: string;
  instagram?: string;
  googleRating?: number;
  googleReviewCount?: number;
  bookingSystem?: string;
  painPoint?: string;
  status?: string;
  demoSlug?: string;
  trackedLink?: string;
  notes?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // If body has a 'leads' array, use bulk create (original endpoint behavior)
    if (Array.isArray(body.leads)) {
      const leads: BulkLeadInput[] = body.leads;

      if (leads.length === 0) {
        return NextResponse.json(
          { error: "Body must have a 'leads' array with at least one entry" },
          { status: 400 }
        );
      }

      if (leads.length > 200) {
        return NextResponse.json(
          { error: "Maximum 200 leads per batch" },
          { status: 400 }
        );
      }

      const results = { created: 0, failed: 0, errors: [] as string[] };

      for (const input of leads) {
        if (!input.businessName) {
          results.failed++;
          results.errors.push(`Skipped: missing businessName`);
          continue;
        }

        const lead = await createLead({
          businessName: input.businessName,
          ownerName: input.ownerName || "Unknown",
          email: input.email || "",
          phone: input.phone,
          city: input.city,
          state: input.state,
          website: input.website,
          instagram: input.instagram,
          googleRating: input.googleRating,
          googleReviewCount: input.googleReviewCount,
          bookingSystem: input.bookingSystem,
          painPoint: input.painPoint,
          status: (input.status as Lead["status"]) || "new",
          demoSlug: input.demoSlug,
          trackedLink: input.trackedLink,
          notes: input.notes,
        });

        if (lead) {
          results.created++;
        } else {
          results.failed++;
          results.errors.push(`Failed: ${input.businessName}`);
        }
      }

      return NextResponse.json(results, { status: 201 });
    }

    // If body has 'action', use action-based bulk ops
    const { action, ids, updates } = body;

    switch (action) {
      case "update": {
        if (!ids || !updates) {
          return NextResponse.json(
            { error: "ids and updates required" },
            { status: 400 },
          );
        }
        const count = await bulkUpdateLeads(ids, updates);
        return NextResponse.json({ updated: count, ids });
      }

      case "delete": {
        if (!ids) {
          return NextResponse.json({ error: "ids required" }, { status: 400 });
        }
        const count = await bulkDeleteLeads(ids);
        return NextResponse.json({ deleted: count });
      }

      default:
        return NextResponse.json({ error: "unknown action" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  const filter = request.nextUrl.searchParams.get("filter");
  const allLeads = await readLeads();
  let filtered = allLeads;

  if (filter === "no-email") {
    filtered = allLeads.filter((l) => !l.email || l.email.trim() === "");
  } else if (filter === "has-email") {
    filtered = allLeads.filter((l) => l.email && l.email.trim() !== "");
  } else if (filter) {
    filtered = allLeads.filter(
      (l) => l.businessName.toLowerCase().includes(filter.toLowerCase()),
    );
  }

  return NextResponse.json(filtered);
}
