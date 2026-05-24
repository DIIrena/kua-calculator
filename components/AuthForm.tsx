"use client";

import { useActionState, useState } from "react";
import {
  emailSignInAction,
  googleSignInAction,
  type SignInState,
} from "@/app/(site)/sign-in/actions";

// Client Component. Magic-link sign-in plus Google OAuth, both routed
// through Auth.js v5 server actions defined in app/(site)/sign-in/actions.ts.
// The marketing-opt-in checkbox is unchecked by default; the choice is
// stored in a short-lived cookie at submit time and persisted to the
// profiles row the first time the new account loads /account.
export default function AuthForm() {
  const [optIn, setOptIn] = useState(false);
  const [state, formAction, pending] = useActionState<SignInState, FormData>(
    emailSignInAction,
    { ok: false, message: "" },
  );

  const ok = state?.ok === true;
  const hasMessage = Boolean(state?.message);

  return (
    <div>
      <form action={formAction} noValidate>
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

        <button type="submit" className="cta-primary" disabled={pending}>
          {pending ? "Sending..." : "Email me a sign-in link"}
        </button>
      </form>

      <div className="auth-divider">or</div>

      <form action={googleSignInAction}>
        {/* Carry the opt-in choice into the Google route via a hidden
            field, kept in sync with the checkbox above. */}
        <input
          type="hidden"
          name="marketing_opt_in"
          value={optIn ? "on" : ""}
        />
        <button type="submit" className="btn-secondary" disabled={pending}>
          Continue with Google
        </button>
      </form>

      {hasMessage && (
        <p
          className={
            ok
              ? "auth-feedback auth-feedback-ok"
              : "auth-feedback auth-feedback-error"
          }
          role={ok ? "status" : "alert"}
        >
          {state.message}
        </p>
      )}

      <p className="auth-note">
        No password needed. Signing in creates a free account. We store the
        email you sign in with. See the <a href="/privacy">privacy page</a>.
      </p>
    </div>
  );
}
