import { joinProductWaitlist } from "@/app/actions/product-waitlist";

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
// Only `waitlist` is implemented today. The other branches throw
// not-implemented so the call site is unambiguous, and we ship the
// switch later.

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
  /** Optional Lemon Squeezy checkout URL; required if state is
   *  "lemon-squeezy". */
  lemonSqueezyUrl?: string;
};

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
  lemonSqueezyUrl,
}: Props) {
  if (state === "waitlist") {
    return (
      <div className="buy-button buy-button-waitlist">
        <p className="buy-button-price">
          <span className="buy-button-price-amount">{priceLabel}</span>
          <span className="buy-button-price-suffix">when it ships</span>
        </p>
        <form action={joinProductWaitlist} className="buy-button-form">
          <input type="hidden" name="productSlug" value={productSlug} />
          <label
            htmlFor={`waitlist-email-${productSlug}`}
            className="visually-hidden"
          >
            Email address
          </label>
          <input
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
          You can unsubscribe any time. We will not share your address.
        </p>
        {statusPill(waitlistStatus)}
      </div>
    );
  }

  if (state === "stripe-test" || state === "stripe-live") {
    return (
      <div className="buy-button buy-button-stripe">
        <p className="buy-button-price">
          <span className="buy-button-price-amount">{priceLabel}</span>
          <span className="buy-button-price-suffix">one-time</span>
        </p>
        <form action="/api/checkout" method="post" className="buy-button-form">
          <input type="hidden" name="productSlug" value={productSlug} />
          <button type="submit" className="cta-primary">
            Buy now
          </button>
        </form>
        <p className="buy-button-note">
          Secure checkout. Thirty-day refund, no questions asked.
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
      <div className="buy-button buy-button-lemon">
        <p className="buy-button-price">
          <span className="buy-button-price-amount">{priceLabel}</span>
          <span className="buy-button-price-suffix">one-time</span>
        </p>
        <a
          href={lemonSqueezyUrl}
          className="cta-primary"
          rel="noopener noreferrer"
        >
          Buy now
        </a>
        <p className="buy-button-note">
          Secure checkout. Thirty-day refund, no questions asked.
        </p>
      </div>
    );
  }

  // Exhaustiveness check.
  const exhaustive: never = state;
  return <p>Unsupported BuyButton state: {String(exhaustive)}</p>;
}
