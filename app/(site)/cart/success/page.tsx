import type { Metadata } from "next";
import Link from "next/link";
import CartClearer from "@/components/CartClearer";

export const metadata: Metadata = {
  title: "Thank you | My Feng Shui Home",
  robots: { index: false, follow: false },
};

export default function CartSuccessPage() {
  return (
    <div className="page-content product-page">
      <CartClearer />
      <section className="product-hero">
        <p className="success-thankyou">Thank you.</p>
        <h1 className="product-heading">Your order is on its way.</h1>
        <p className="product-lede">
          Everything in your cart is paid for. Printable files arrive by email
          within a minute. For any personalised reading, the email includes a
          short link to fill in your details, and the PDF follows right after.
        </p>
        <p>
          <Link href="/guide" className="article-back-link">
            Read the guide while it lands &rarr;
          </Link>
        </p>
        <p className="success-refund-note">
          Questions about your order? Write to
          hello@myfengshuihome.com, or see the{" "}
          <Link href="/legal">legal page</Link>. Not what you hoped for? The
          7-day money-back guarantee has you covered.
        </p>
      </section>

      {/* Post-purchase upsell (W6). Calm, one step deeper, plus a free
          goodwill asset. No pressure, no countdown. */}
      <section className="success-next" aria-labelledby="success-next-h">
        <h2 id="success-next-h">While you wait, two things worth having</h2>
        <div className="success-next-grid">
          <article className="success-next-card">
            <h3>Read your whole home next</h3>
            <p>
              If you bought a single reading, the Complete Home Compass reads
              everything for your Kua in one book: every room, every life
              area, and the 2026 year. It is the deepest reading we make.
            </p>
            <p>
              <Link
                href="/products/complete-home-compass?from=success"
                className="cta-secondary"
              >
                See the Complete Home Compass, $49
              </Link>
            </p>
          </article>
          <article className="success-next-card">
            <h3>Your good days for 2026, free</h3>
            <p>
              A calendar of the traditionally favourable days for a move, a
              start, or a reset, keyed to the year. Free, printable, yours to
              keep.
            </p>
            <p>
              <Link href="/good-days?from=success" className="cta-secondary">
                Get the Good Days calendar
              </Link>
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
