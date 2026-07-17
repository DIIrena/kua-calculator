import type { Metadata } from "next";
import Link from "next/link";
import Storefront from "@/components/Storefront";

export const metadata: Metadata = {
  title: "Shop | My Feng Shui Home",
  description:
    "Printable guides, personalised Kua readings, bundles, and a 7-day course. One-time prices, instant delivery, no outcome promises. Featured picks, then browse by room, life area, or type.",
  alternates: { canonical: "https://myfengshuihome.com/products" },
  openGraph: {
    type: "website",
    title: "Shop - My Feng Shui Home",
    description:
      "Printable guides, personalised Kua readings, bundles, and a course. One-time prices, instant delivery.",
    url: "https://myfengshuihome.com/products",
    images: [
      {
        url: "https://myfengshuihome.com/api/og/product/shop",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function ProductsPage(props: {
  searchParams: Promise<{ checkout?: string }>;
}) {
  const { checkout } = await props.searchParams;
  const checkoutStatus =
    checkout === "error" || checkout === "cancelled"
      ? (checkout as "error" | "cancelled")
      : null;

  return (
    <div className="page-content products-page">
      <section className="products-hero products-hero-shop">
        <h1 className="visually-hidden">Shop</h1>
        <p className="products-lede">
          Printable guides, personalised readings keyed to your Kua,
          build-your-own bundles, and a seven-day course.
        </p>
        <p className="products-utility">
          New here? <Link href="/kua-calculator">Find your Kua number free</Link>{" "}
          first, or <Link href="/search">search the site</Link>.
        </p>
        {checkoutStatus === "error" ? (
          <p className="buy-button-status buy-button-status-err" role="alert">
            Something went wrong on our end. You were not charged. Try again
            in a minute, or email hello@myfengshuihome.com.
          </p>
        ) : checkoutStatus === "cancelled" ? (
          <p className="lead-magnet-status" role="status">
            Checkout cancelled. Nothing was charged.
          </p>
        ) : null}
      </section>

      <Storefront />

      <section className="products-honest-footer">
        <h2>What this shop is, and what it is not.</h2>
        <p>
          Every item here is a printable PDF, a personalised PDF, a course,
          or a free tool. There are no consultations, no subscriptions, no
          recurring fees. You pay once and you keep what you bought. Each
          product is self-contained: you can buy one without buying any of
          the others.
        </p>
        <p>
          Everything is available now. Printable products arrive by email
          the moment you buy; personalised readings within about a minute;
          the course begins right away. Everything is yours to keep.
        </p>
      </section>
    </div>
  );
}
