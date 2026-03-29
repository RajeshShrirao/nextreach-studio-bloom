import { NextRequest, NextResponse } from "next/server";
import { readLeads, writeLeads, generateId, type Lead, type LeadStatus } from "@/lib/leads";

export async function GET(request: NextRequest) {
  const leads = readLeads();
  const status = request.nextUrl.searchParams.get("status");

  if (status) {
    const filtered = leads.filter((l) => l.status === status);
    return NextResponse.json(filtered);
  }

  return NextResponse.json(leads);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const leads = readLeads();

    const now = new Date().toISOString();
    const newLead: Lead = {
      id: generateId(),
      businessName: body.businessName || "",
      ownerName: body.ownerName || "",
      email: body.email || "",
      phone: body.phone,
      city: body.city,
      website: body.website,
      instagram: body.instagram,
      googleReviews: body.googleReviews,
      bookingSystem: body.bookingSystem,
      status: body.status || "not-contacted",
      demoUrl: body.demoUrl,
      trackingLink: body.trackingLink,
      plan: body.plan,
      paymentStatus: body.paymentStatus,
      notes: body.notes,
      createdAt: now,
      updatedAt: now,
      lastContactedAt: body.lastContactedAt,
      nextFollowUpAt: body.nextFollowUpAt,
    };

    leads.push(newLead);
    writeLeads(leads);

    return NextResponse.json(newLead, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
