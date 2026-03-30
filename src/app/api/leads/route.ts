import { NextRequest, NextResponse } from "next/server";
import { readLeads, createLead, type Lead } from "@/lib/leads";

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get("status");
  const leads = await readLeads(status || undefined);

  if (status) {
    const filtered = leads.filter((l) => l.status === status);
    return NextResponse.json(filtered);
  }

  return NextResponse.json(leads);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newLead = await createLead({
      businessName: body.businessName || "",
      ownerName: body.ownerName || "",
      email: body.email || "",
      phone: body.phone,
      city: body.city,
      state: body.state,
      website: body.website,
      instagram: body.instagram,
      googleRating: body.googleRating,
      googleReviewCount: body.googleReviewCount,
      bookingSystem: body.bookingSystem,
      painPoint: body.painPoint,
      status: body.status || "new",
      planInterest: body.planInterest,
      demoSlug: body.demoSlug,
      trackedLink: body.trackedLink,
      notes: body.notes,
    });

    if (!newLead) {
      return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
    }

    return NextResponse.json(newLead, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
