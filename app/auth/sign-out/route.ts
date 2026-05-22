import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Clears the Supabase session and returns the visitor to the calculator.
export async function POST(request: Request) {
  const { origin } = new URL(request.url);

  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    // Already signed out or Supabase unavailable; redirect anyway.
  }

  return NextResponse.redirect(`${origin}/kua-calculator`, { status: 303 });
}
