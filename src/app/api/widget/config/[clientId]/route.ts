import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CONFIG_DIR = path.join(process.cwd(), "data", "demo-configs");

/** Fields we allow to leak to the client */
interface SafeConfig {
  business_name: string;
  greeting: string;
  business_type?: string;
  theme?: Record<string, string>;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ clientId: string }> }
) {
  const { clientId } = await params;
  const filePath = path.join(CONFIG_DIR, `${clientId}.json`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Config not found" }, { status: 404 });
  }

  const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const safe: SafeConfig = {
    business_name: raw.business_name,
    greeting: raw.greeting,
    business_type: raw.business_type,
    theme: raw.theme,
  };

  return NextResponse.json(safe, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
