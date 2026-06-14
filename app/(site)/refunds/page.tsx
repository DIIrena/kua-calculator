import type { Metadata } from "next";
import Link from "next/link";

// The refund policy page. One page, no legalese walls. Linked from
// the footer, the checkout custom text, and the Stripe support URL.
// Mens Sana LLC is named as the operating company: the verifiable
// entity behind the shop.

export const metadata: Metadata = {
  title: "Refunds | My Feng Shui Home",
  description:
    "7-day refund on every purchase. How refunds work, how to ask, and who operates the shop.",
  alternates: { canonical: "https://myfengshuihome.com/refunds" },
  robots: { index: true, follow: true },
};

export default function RefundsPage() {
  return (
    <div className="page-content">
      <article className="page-prose refunds-page">
        <p className="eyebrow">Refunds</p>
        <h1>The refund policy.</h1>

        <p className="refunds-flow">
          Feng shui is about flow. If a purchase is not flowing for you,
          we clear it - a full refund within 7 days.
        </p>

        <h2>The policy</h2>
        <p>
          Every purchase on this site carries a{" "}
          <strong>7-day refund</strong>. If you buy a guide, a planner,
          or a personalised PDF and it is not what you wanted, email{" "}
          <a href="mailto:hello@myfengshuihome.com">
            hello@myfengshuihome.com
          </a>{" "}
          within 7 days of the purchase, include a line on what you were
          hoping for, and we refund the full amount. Your reason helps us
          make the next version better. You keep nothing and owe nothing;
          the files simply stop being yours to use.
        </p>

        <h2>How fast</h2>
        <p>
          We process refunds within 2 business days of your email. The
          money returns by the same card you paid with; banks usually
          show it within 5 to 10 business days after that.
        </p>

        <h2>Digital delivery and EU buyers</h2>
        <p>
          Everything sold here is a digital download delivered
          immediately. For buyers in the EU: at checkout you agree to
          immediate delivery, which waives the statutory 14-day
          withdrawal right for digital content. The 7-day refund above
          applies to you all the same; the waiver changes the legal
          mechanism, not what we do when you email us.
        </p>

        <h2>Who operates this shop</h2>
        <p>
          My Feng Shui Home is operated by <strong>Mens Sana LLC</strong>,
          a Wyoming limited liability company, registered at 30 N Gould
          St Ste N, Sheridan, WY 82801, United States. Card statements
          show the purchase as <strong>MYFENGSHUIHOME</strong>.
        </p>

        <h2>Questions</h2>
        <p>
          Anything unclear, write to{" "}
          <a href="mailto:hello@myfengshuihome.com">
            hello@myfengshuihome.com
          </a>
          . A person reads it.
        </p>

        <p className="refunds-back">
          <Link href="/products" className="article-back-link">
            &larr; Back to the products
          </Link>
        </p>
      </article>
    </div>
  );
}
