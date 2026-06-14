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
          7-day refund on each item. The{" "}
          <Link href="/refunds">refund policy</Link> is one page.
        </p>
      </section>
    </div>
  );
}
