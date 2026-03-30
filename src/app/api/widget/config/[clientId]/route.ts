import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import fs from "fs";
import path from "path";

const CONFIG_DIR = path.join(process.cwd(), "data", "demo-configs");

interface SafeConfig {
  business_name: string;
  greeting: string;
  business_type?: string;
  theme?: Record<string, string>;
  services?: unknown[];
  faq?: unknown[];
  hours?: string;
  location?: string;
}

function safeFromDb(row: Record<string, unknown>): SafeConfig {
  return {
    business_name: row.business_name as string,
    greeting: (row.greeting as string) || "Hi there! How can I help you today?",
    business_type: row.business_type as string | undefined,
    theme: row.theme as Record<string, string> | undefined,
    services: row.services as unknown[] | undefined,
    faq: row.faq as unknown[] | undefined,
    hours: row.hours as string | undefined,
    location: row.location as string | undefined,
  };
}

function safeFromJson(raw: Record<string, unknown>): SafeConfig {
  return {
    business_name: raw.business_name as string,
    greeting: raw.greeting as string,
    business_type: raw.business_type as string | undefined,
    theme: raw.theme as Record<string, string> | undefined,
  };
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ clientId: string }> }
) {
  const { clientId } = await params;

  // 1. Try Supabase (production clients)
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("slug", clientId)
        .single();

      if (!error && data) {
        return NextResponse.json(safeFromDb(data), { headers: corsHeaders });
      }
    } catch {
      // Supabase unavailable — fall through
    }
  }

  // 2. Fallback: JSON demo configs
  const filePath = path.join(CONFIG_DIR, `${clientId}.json`);
  if (fs.existsSync(filePath)) {
    const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return NextResponse.json(safeFromJson(raw), { headers: corsHeaders });
  }

  return NextResponse.json({ error: "Config not found" }, { status: 404 });
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}
