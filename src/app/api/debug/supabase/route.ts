import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "No supabase client" });
  }

  try {
    const { data, error } = await supabase
      .from("clients")
      .select("slug, business_name")
      .eq("slug", "bark-and-bark")
      .single();

    return NextResponse.json({ data, error: error?.message || null });
  } catch (e: unknown) {
    return NextResponse.json({ caught: (e as Error).message });
  }
}
