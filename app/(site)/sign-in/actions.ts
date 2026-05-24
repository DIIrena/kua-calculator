"use server";

import { AuthError } from "next-auth";
import { cookies } from "next/headers";
import { signIn } from "@/auth";

// Server actions wired to AuthForm. Both call Auth.js's server-side
// signIn, which handles the CSRF token, creates the verification token
// (for Resend) or the OAuth state (for Google), and redirects.
//
// signIn throws a Next.js redirect by design; we rethrow it so Next can
// follow it. Any other error becomes a user-readable message returned
// via the form's useActionState.
//
// The marketing opt-in choice is recorded in a short-lived cookie just
// before the redirect, then consumed and persisted to profiles the
// first time the new account loads /account.

export type SignInState = {
  ok: boolean;
  message: string;
};

const OPT_IN_COOKIE = "mfsh_marketing_opt_in";

async function rememberOptIn(value: boolean) {
  const store = await cookies();
  store.set(OPT_IN_COOKIE, value ? "1" : "0", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 30, // 30 minutes - long enough to finish the magic-link round trip
    path: "/",
  });
}

export async function emailSignInAction(
  _prev: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const email = String(formData.get("email") ?? "").trim();
  const optIn = formData.get("marketing_opt_in") === "on";
  if (!email) {
    return { ok: false, message: "Please enter your email address." };
  }

  await rememberOptIn(optIn);

  try {
    await signIn("resend", {
      email,
      redirectTo: "/account",
    });
    // signIn redirects to /api/auth/verify-request, so we never reach
    // here in practice. Returned for the type.
    return {
      ok: true,
      message:
        "Check your inbox. We sent a sign-in link to " +
        email +
        ". The link opens your account.",
    };
  } catch (err) {
    if (err instanceof AuthError) {
      return {
        ok: false,
        message:
          "We could not send the sign-in email. Please try again in a moment.",
      };
    }
    // Re-throw redirect / framework errors so Next can handle them.
    throw err;
  }
}

export async function googleSignInAction(formData: FormData) {
  const optIn = formData.get("marketing_opt_in") === "on";
  await rememberOptIn(optIn);
  await signIn("google", { redirectTo: "/account" });
}
