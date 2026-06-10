import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/server";

const OPT_IN_COOKIE = "mfsh_marketing_opt_in";

// Auth.js v5 (NextAuth) lives on the Next.js server. Sign-in callbacks
// resolve at /api/auth/callback/* on our own domain, so Google's consent
// screen reads "Sign in to myfengshuihome.com" and magic-link URLs in
// email also use the brand domain. Supabase is the database only.
//
// Providers: Google OAuth and Resend magic-link email. The Resend
// provider is configured with a custom sendVerificationRequest so the
// email body matches the brand (cream page, sage button, script signature).
//
// Adapter: @auth/supabase-adapter. The four Auth.js tables live in the
// next_auth schema (see supabase/migrations/0002_nextauth.sql).
//
// Session strategy is "database" because we are using the adapter; the
// session id lives in a cookie, the session record in next_auth.sessions.

const BRAND_FROM = "My Feng Shui Home <hello@myfengshuihome.com>";
const BRAND_SUBJECT = "Sign in to My Feng Shui Home";

// Inline-styled magic-link email. Uses the brand palette directly so it
// renders correctly across email clients with no external CSS.
function buildEmailHtml(url: string): string {
  const cream = "#fcfcf8";
  const paper = "#ffffff";
  const sage = "#0e3b2c";
  const ink = "#0e3b2c";
  const ink2 = "#4f5b53";
  const hairline = "#e2dac5";
  const script = "Brush Script MT, Lucida Handwriting, cursive";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${BRAND_SUBJECT}</title>
  </head>
  <body style="margin:0;padding:0;background:${cream};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:${ink};">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${cream};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:520px;background:${paper};border:1px solid ${hairline};border-radius:14px;padding:40px 32px;">
            <tr>
              <td align="center" style="padding-bottom:24px;">
                <div style="font-family:${script};font-size:34px;line-height:1;color:${sage};">My Feng Shui Home</div>
              </td>
            </tr>
            <tr>
              <td style="font-size:22px;line-height:1.3;font-weight:600;color:${ink};padding-bottom:12px;">
                Sign in to your account
              </td>
            </tr>
            <tr>
              <td style="font-size:16px;line-height:1.55;color:${ink2};padding-bottom:28px;">
                Click the button below to sign in to My Feng Shui Home. This link is valid for a short time and can be used once.
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-bottom:28px;">
                <a href="${url}" style="display:inline-block;background:${sage};color:#ffffff;text-decoration:none;font-size:16px;font-weight:600;padding:14px 28px;border-radius:999px;">
                  Sign in
                </a>
              </td>
            </tr>
            <tr>
              <td style="font-size:14px;line-height:1.55;color:${ink2};padding-bottom:8px;">
                Or copy and paste this link into your browser:
              </td>
            </tr>
            <tr>
              <td style="font-size:13px;line-height:1.5;color:${sage};word-break:break-all;padding-bottom:24px;">
                <a href="${url}" style="color:${sage};text-decoration:underline;">${url}</a>
              </td>
            </tr>
            <tr>
              <td style="font-size:13px;line-height:1.5;color:${ink2};border-top:1px solid ${hairline};padding-top:20px;">
                If you did not request this email you can safely ignore it. No account is created until the link is used.
              </td>
            </tr>
          </table>
          <div style="font-size:12px;color:${ink2};padding-top:16px;">
            My Feng Shui Home - quiet, practical feng shui guidance.
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildEmailText(url: string): string {
  return [
    "Sign in to My Feng Shui Home",
    "",
    "Use the link below to sign in. It is valid for a short time and can be used once.",
    "",
    url,
    "",
    "If you did not request this email you can safely ignore it. No account is created until the link is used.",
  ].join("\n");
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  // The adapter is only wired when the Supabase env vars are real. This
  // keeps `npm run build` working with placeholder values for the
  // calculator and methodology pages, which do not need auth.
  adapter:
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("PLACEHOLDER") &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
      ? SupabaseAdapter({
          url: process.env.NEXT_PUBLIC_SUPABASE_URL,
          secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
        })
      : undefined,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      // Safe because both providers verify email ownership: Resend by
      // delivering the magic link to the inbox, Google by issuing OAuth
      // tokens only after the email is verified on Google's side.
      allowDangerousEmailAccountLinking: true,
    }),
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: BRAND_FROM,
      async sendVerificationRequest({ identifier: to, url, provider }) {
        const apiKey =
          (provider as { apiKey?: string }).apiKey ||
          process.env.AUTH_RESEND_KEY;
        if (!apiKey) {
          throw new Error(
            "AUTH_RESEND_KEY is not set; cannot send magic-link email.",
          );
        }
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: BRAND_FROM,
            to,
            subject: BRAND_SUBJECT,
            html: buildEmailHtml(url),
            text: buildEmailText(url),
          }),
        });
        if (!res.ok) {
          const body = await res.text();
          throw new Error("Resend error: " + body);
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "database",
  },
  events: {
    // Runs on every successful sign-in inside the auth Route Handler, where
    // cookies are mutable. Consumes the short-lived opt-in cookie set by the
    // sign-in Server Action and persists it to the profile.
    async signIn({ user }) {
      if (!user?.id) return;
      const store = await cookies();
      const optIn = store.get(OPT_IN_COOKIE)?.value;
      if (optIn === undefined) return;
      if (optIn === "1") {
        const admin = createAdminClient();
        await admin
          .from("profiles")
          .update({
            marketing_opt_in: true,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id);
      }
      store.delete(OPT_IN_COOKIE);
    },
  },
  trustHost: true,
});
