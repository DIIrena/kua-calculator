import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Sign in | My Feng Shui Home",
  description:
    "Sign in to your free My Feng Shui Home account to save your Kua chart and birth data.",
  robots: { index: false, follow: true },
};

// Sign-in page. If the visitor is already signed in, send them to their
// account. Otherwise show the magic-link + Google form.
export default async function SignInPage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (url && !url.includes("PLACEHOLDER")) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) redirect("/account");
    } catch {
      // Supabase not reachable; fall through to the form.
    }
  }

  return (
    <div className="page-narrow">
      <div className="auth-card">
        <p className="eyebrow">My Feng Shui Home</p>
        <h1>Sign in or create your free account</h1>
        <p className="auth-intro">
          The calculator stays free with no account. An account lets you save
          your chart and birth data and, with your consent, have your chart
          emailed to you.
        </p>
        <AuthForm />
      </div>
    </div>
  );
}
