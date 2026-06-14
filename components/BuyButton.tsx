"use client";

import { useEffect, useRef } from "react";
import { joinProductWaitlist } from "@/app/actions/product-waitlist";
import { trackEvent } from "@/lib/analytics";

// Provider-agnostic Buy Button. The same component renders four
// different states. Each product in the catalogue carries a
// `paymentState` field; flipping that field is the one place that
// changes what visitors see when live payments switch on.
//
// Contract (per the platform-strategy doc):
//
//   <BuyButton
//     productSlug="personal-feng-shui-compass"
//     priceLabel="$14"
//     state="waitlist" | "stripe-test" | "stripe-live" | "lemon-squeezy"
//   />
//
// State behaviour:
//   - waitlist     : renders the email-capture form pointing at
//                    joinProductWaitlist + the product slug
//   - stripe-test  : renders a "Buy now" form that POSTs to
//                    /api/checkout with the test Stripe key
//   - stripe-live  : same as stripe-test, live key (flag-flip only)
//   - lemon-squeezy: renders an external link to a Lemon Squeezy
//                    hosted checkout URL (kept as a backup path)
//
// Only `waitlist` is implemented today. The waitlist branch carries
// the Phase 5A conversion polish: the anchor id `waitlist`, the trust
// microstrip, localStorage email pre-fill across product pages, and
// the three funnel events (signup_attempt / signup_success /
// signup_error). The funnel events are wired through trackEvent in
// lib/analytics.ts, which currently no-ops; they start firing when
// a paid analytics tier is turned on.

export type BuyButtonState =
  | "waitlist"
  | "stripe-test"
  | "stripe-live"
  | "lemon-squeezy";

type Props = {
  productSlug: string;
  priceLabel: string;
  state: BuyButtonState;
  /** Optional success / error param from the URL; used to render the
   *  status pill (sent / invalid / error) under the form. */
  waitlistStatus?: "sent" | "invalid" | "error" | null;
  /** Optional override for the small note rendered under the waitlist
   *  form. Defaults to a generic single-launch-email promise. Pass a
   *  custom string for products that send a richer email sequence
   *  (the 2026 Feng Shui Planner sends confirmation + sample + launch). */
  waitlistNote?: string;
  /** Optional id for the wrapping <div>. Defaults to "waitlist" so the
   *  "Skip to the waitlist" anchor works. Override when a page renders
   *  more than one BuyButton (e.g. a top + bottom waitlist card on the
   *  Planner page) so the page does not produce duplicate ids. */
  anchorId?: string;
  /** Optional Lemon Squeezy checkout URL; required if state is
   *  "lemon-squeezy". */
  lemonSqueezyUrl?: string;
};

const DEFAULT_WAITLIST_NOTE =
  "When this product ships, we email you the launch page and the early price. You can unsubscribe any time.";

const LOCALSTORAGE_EMAIL_KEY = "mfsh_waitlist_email";

function statusPill(status: Props["waitlistStatus"]): React.ReactNode {
  if (!status) return null;
  if (status === "sent") {
    return (
      <p
        className="buy-button-status buy-button-status-ok"
        role="status"
        aria-live="polite"
      >
        You are on the list. We will email you when it ships.
      </p>
    );
  }
  if (status === "invalid") {
    return (
      <p
        className="buy-button-status buy-button-status-err"
        role="alert"
      >
        Please enter a valid email address and try again.
      </p>
    );
  }
  return (
    <p
      className="buy-button-status buy-button-status-err"
      role="alert"
    >
      Something went wrong on our end. Try again in a minute, or email
      hello@myfengshuihome.com.
    </p>
  );
}

export default function BuyButton({
  productSlug,
  priceLabel,
  state,
  waitlistStatus = null,
  waitlistNote,
  anchorId = "waitlist",
  lemonSqueezyUrl,
}: Props) {
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  // Pre-fill the email from localStorage, so a visitor who joined one
  // waitlist sees their address already there on the next product page.
  // Also fire the success / error event when we land back with a status
  // param. Both happen client-side only.
  useEffect(() => {
    if (state !== "waitlist") return;
    try {
      const remembered = window.localStorage.getItem(LOCALSTORAGE_EMAIL_KEY);
      if (remembered && emailInputRef.current && !emailInputRef.current.value) {
        emailInputRef.current.value = remembered;
      }
    } catch {
      // localStorage may be disabled / private mode. Ignore.
    }
    if (waitlistStatus === "sent") {
      trackEvent("waitlist_signup_success", { productSlug });
    } else if (waitlistStatus === "invalid" || waitlistStatus === "error") {
      trackEvent("waitlist_signup_error", {
        productSlug,
        reason: waitlistStatus,
      });
    }
  }, [state, waitlistStatus, productSlug]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    const emailEl = form.elements.namedItem("email") as HTMLInputElement | null;
    const email = emailEl?.value.trim().toLowerCase() ?? "";
    if (email) {
      try {
        window.localStorage.setItem(LOCALSTORAGE_EMAIL_KEY, email);
      } catch {
        // Ignore.
      }
    }
    trackEvent("waitlist_signup_attempt", { productSlug });
  }

  if (state === "waitlist") {
    return (
      <div id={anchorId} className="buy-button buy-button-waitlist">
        <p className="buy-button-price">
          <span className="buy-button-price-amount">{priceLabel}</span>{" "}
          <span className="buy-button-price-suffix">when it ships</span>
        </p>
        <p className="buy-button-trust">
          No subscription. No recurring fee. Buy once, keep the files.
        </p>
        <form
          action={joinProductWaitlist}
          onSubmit={handleSubmit}
          className="buy-button-form"
        >
          <input type="hidden" name="productSlug" value={productSlug} />
          <label
            htmlFor={`waitlist-email-${productSlug}`}
            className="visually-hidden"
          >
            Email address
          </label>
          <input
            ref={emailInputRef}
            id={`waitlist-email-${productSlug}`}
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            autoComplete="email"
          />
          <button type="submit" className="cta-primary">
            Join the waitlist
          </button>
        </form>
        <p className="buy-button-note">
          {waitlistNote ?? DEFAULT_WAITLIST_NOTE}
        </p>
        {statusPill(waitlistStatus)}
      </div>
    );
  }

  if (state === "stripe-test" || state === "stripe-live") {
    return (
      <div id={anchorId} className="buy-button buy-button-stripe">
        <p className="buy-button-price">
          <span className="buy-button-price-amount">{priceLabel}</span>{" "}
          <span className="buy-button-price-suffix">one-time</span>
        </p>
        <p className="buy-button-trust">
          No subscription. No recurring fee. Buy once, keep the files.
        </p>
        <form action="/api/checkout" method="post" className="buy-button-form">
          <input type="hidden" name="productSlug" value={productSlug} />
          <button type="submit" className="cta-primary">
            Buy now
          </button>
        </form>
        <p className="buy-button-note">
          Secure checkout. 7-day refund.
        </p>
      </div>
    );
  }

  if (state === "lemon-squeezy") {
    if (!lemonSqueezyUrl) {
      return (
        <div className="buy-button buy-button-error">
          <p>Checkout link is not configured for this product.</p>
        </div>
      );
    }
    return (
      <div id={anchorId} className="buy-button buy-button-lemon">
        <p className="buy-button-price">
          <span className="buy-button-price-amount">{priceLabel}</span>{" "}
          <span className="buy-button-price-suffix">one-time</span>
        </p>
        <p className="buy-button-trust">
          No subscription. No recurring fee. Buy once, keep the files.
        </p>
        <a
          href={lemonSqueezyUrl}
          className="cta-primary"
          rel="noopener noreferrer"
        >
          Buy now
        </a>
        <p className="buy-button-note">
          Secure checkout. 7-day refund.
        </p>
      </div>
    );
  }

  // Exhaustiveness check.
  const exhaustive: never = state;
  return <p>Unsupported BuyButton state: {String(exhaustive)}</p>;
}
