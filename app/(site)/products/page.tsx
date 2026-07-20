import type { Metadata } from "next";
import Storefront from "@/components/Storefront";
import { TrustRow, GuaranteeNote } from "@/components/TrustRow";

export const metadata: Metadata = {
  title: "Shop | My Feng Shui Home",
  description:
    "Nine calm products: personalised Kua readings at three depths, printable kits, and a 7-day course. One-time prices, instant delivery, no outcome promises.",
  alternates: { canonical: "https://myfengshuihome.com/products" },
  openGraph: {
    type: "website",
    title: "Shop - My Feng Shui Home",
    description:
      "Nine calm products: personalised readings, printable kits, and a course. One-time prices, instant delivery.",
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
        <TrustRow className="products-shelf-trust" />
      </section>

      <Storefront />

      <section className="products-honest-footer">
        <p>
          Everything is available now. Printable products arrive by email
          the moment you buy; personalised readings within about a minute;
          the course begins right away. Everything is yours to keep.
        </p>
        <GuaranteeNote />
      </section>
    </div>
  );
}
