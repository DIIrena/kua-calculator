"use client";

import { useActionState } from "react";
import { subscribe, type SubscribeState } from "@/app/actions/subscribe";

const initial: SubscribeState = { status: "idle" };

// Footer newsletter form. Uses useActionState so the result renders
// inline (no navigation). Posts to the subscribe server action.
export default function FooterSubscribe() {
  const [state, formAction, pending] = useActionState(subscribe, initial);

  return (
    <form action={formAction} className="footer-subscribe-form">
      <label htmlFor="footer-subscribe-email" className="visually-hidden">
        Email address
      </label>
      <input
        id="footer-subscribe-email"
        name="email"
        type="email"
        required
        placeholder="you@example.com"
        autoComplete="email"
      />
      <button
        type="submit"
        className="footer-subscribe-btn"
        disabled={pending}
      >
        {pending ? "Sending..." : "Subscribe"}
      </button>
      {state.status !== "idle" && state.message ? (
        <p
          className={`footer-subscribe-status${
            state.status === "ok" ? " is-ok" : " is-err"
          }`}
          role={state.status === "ok" ? "status" : "alert"}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
