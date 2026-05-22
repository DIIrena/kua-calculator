import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Magic-link and OAuth callback. Both sign-in methods land here with a
// `code` query param, which is exchanged for a session. On success the
// user is redirected to /account.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/account";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Copy the marketing-opt-in choice from sign-up metadata into the
      // profiles row, if it was set on the magic-link request.
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const optIn = user?.user_metadata?.marketing_opt_in;
        if (user && optIn === true) {
          await supabase
            .from("profiles")
            .update({ marketing_opt_in: true })
            .eq("id", user.id);
        }
      } catch {
        // Non-fatal: the profile can still be edited on the account page.
      }

      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // No code, or the exchange failed.
  return NextResponse.redirect(`${origin}/sign-in?error=auth`);
}
