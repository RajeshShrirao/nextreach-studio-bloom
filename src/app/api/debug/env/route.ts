import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasKey: !!process.env.SUPABASE_SERVICE_KEY,
    urlPrefix: process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0, 30) || null,
    nodeEnv: process.env.NODE_ENV,
  });
}
