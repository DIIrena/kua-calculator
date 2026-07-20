import Link from "next/link";

// Conversion trust signals (2026-07-20 review, tasks W1 + W2). The 7-day
// make-it-right promise already lives on /legal; the review found it was
// deliberately hidden from every buying surface, which is the one place a
// guarantee actually does its job. These two small pieces surface the real
// terms at the point of decision. No fabricated proof, no urgency, no
// outcome promises: just the actual terms, stated where they reduce risk.

const ITEMS = [
  "Pay once, no subscription",
  "Emailed within about a minute",
  "7-day money-back guarantee",
  "A person answers your email",
];

/** The four-item reassurance strip. Used under hero CTAs and in the cart. */
export function TrustRow({ className = "" }: { className?: string }) {
  return (
    <ul
      className={`trust-row ${className}`.trim()}
      aria-label="What to expect when you buy"
    >
      {ITEMS.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/** The refund sentence, shown next to a Buy action. Matches /legal exactly. */
export function GuaranteeNote() {
  return (
    <p className="guarantee-note">
      <span className="guarantee-badge" aria-hidden="true">
        ✓
      </span>
      <span>
        Not what you hoped for? Email within 7 days and we make it right, up
        to a full refund to the card you paid with.{" "}
        <Link href="/legal">Read the promise</Link>.
      </span>
    </p>
  );
}
