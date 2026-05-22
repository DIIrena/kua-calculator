"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

// Client Component. Magic-link sign-in plus Google OAuth. The marketing
// opt-in checkbox is unchecked by default; consent is captured into the
// user metadata and copied to profiles.marketing_opt_in after sign-in.
export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${siteUrl}/auth/callback`,
          data: { marketing_opt_in: optIn },
        },
      });

      if (error) {
        setStatus("error");
        setMessage(error.message);
        return;
      }

      setStatus("sent");
      setMessage(
        "Check your inbox. We sent a sign-in link to " +
          email +
          ". The link opens your account.",
      );
    } catch {
      setStatus("error");
      setMessage(
        "Sign-in is not available yet. The site owner needs to connect Supabase.",
      );
    }
  }

  async function handleGoogle() {
    setStatus("sending");
    setMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${siteUrl}/auth/callback` },
      });

      if (error) {
        setStatus("error");
        setMessage(error.message);
      }
    } catch {
      setStatus("error");
      setMessage(
        "Google sign-in is not available yet. The site owner needs to connect Supabase and Google OAuth.",
      );
    }
  }

  return (
    <div>
      <form onSubmit={handleMagicLink} noValidate>
        <div className="field">
          <label className="field-label" htmlFor="auth-email">
            Email address
          </label>
          <input
            id="auth-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="checkbox-row">
          <input
            id="auth-optin"
            name="marketing_opt_in"
            type="checkbox"
            checked={optIn}
            onChange={(e) => setOptIn(e.target.checked)}
          />
          <label htmlFor="auth-optin" className="checkbox-text">
            Email me my chart and occasional feng shui guidance. Optional. You
            can change this any time on your account page.
          </label>
        </div>

        <button
          type="submit"
          className="cta-primary"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : "Email me a sign-in link"}
        </button>
      </form>

      <div className="auth-divider">or</div>

      <button
        type="button"
        className="btn-secondary"
        onClick={handleGoogle}
        disabled={status === "sending"}
      >
        Continue with Google
      </button>

      {message && (
        <p
          className={
            status === "error"
              ? "auth-feedback auth-feedback-error"
              : "auth-feedback auth-feedback-ok"
          }
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      )}

      <p className="auth-note">
        No password needed. Signing in creates a free account. We store the
        email you sign in with. See the{" "}
        <a href="/privacy">privacy page</a>.
      </p>
    </div>
  );
}
