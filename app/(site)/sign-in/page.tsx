import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Sign in | My Feng Shui Home",
  description:
    "Sign in to your free My Feng Shui Home account to save your Kua chart and birth data.",
  robots: { index: false, follow: true },
};

// Sign-in page. If the visitor is already signed in, send them to their
// account. Otherwise show the magic-link + Google form.
export default async function SignInPage() {
  try {
    const session = await auth();
    if (session?.user) redirect("/account");
  } catch {
    // Auth not reachable (placeholder env vars, network blip). Fall
    // through to the form, which surfaces a friendly error if signing
    // in is not configured.
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
