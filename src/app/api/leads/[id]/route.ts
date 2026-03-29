import { NextRequest, NextResponse } from "next/server";
import { readLeads, writeLeads, type Lead } from "@/lib/leads";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const leads = readLeads();
  const lead = leads.find((l) => l.id === id);

  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json(lead);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const leads = readLeads();
    const index = leads.findIndex((l) => l.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const updated: Lead = {
      ...leads[index],
      ...body,
      id, // prevent id overwrite
      createdAt: leads[index].createdAt, // prevent createdAt overwrite
      updatedAt: new Date().toISOString(),
    };

    leads[index] = updated;
    writeLeads(leads);

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const leads = readLeads();
  const index = leads.findIndex((l) => l.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  leads.splice(index, 1);
  writeLeads(leads);

  return NextResponse.json({ success: true });
}
