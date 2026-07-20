"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { TrustRow, GuaranteeNote } from "@/components/TrustRow";

function money(cents: number): string {
  if (cents === 0) return "Free";
  return cents % 100 === 0 ? `$${cents / 100}` : `$${(cents / 100).toFixed(2)}`;
}

export default function CartContents({
  status,
}: {
  status?: string | null;
}) {
  const { items, totalCents, remove, count } = useCart();

  return (
    <div className="cart-page">
      <h1 className="cart-page-title">Your cart</h1>

      {status === "error" ? (
        <p className="buy-button-status buy-button-status-err" role="alert">
          Something went wrong starting checkout. You were not charged. Try
          again, or email hello@myfengshuihome.com.
        </p>
      ) : status === "cancelled" ? (
        <p className="lead-magnet-status" role="status">
          Checkout cancelled. Your cart is still here.
        </p>
      ) : null}

      {count === 0 ? (
        <p className="cart-empty">
          Your cart is empty.{" "}
          <Link href="/products">Browse the shop &rarr;</Link>
        </p>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((i) => (
              <li key={i.slug} className="cart-row">
                <Link href={i.href} className="cart-row-title">
                  {i.title}
                </Link>
                <span className="cart-row-price">{i.priceLabel}</span>
                <button
                  type="button"
                  className="cart-row-remove"
                  onClick={() => remove(i.slug)}
                  aria-label={`Remove ${i.title} from cart`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p className="cart-total">
              <span>Total</span>
              <strong>{money(totalCents)}</strong>
            </p>
            <form action="/api/cart-checkout" method="post">
              <input
                type="hidden"
                name="slugs"
                value={items.map((i) => i.slug).join(",")}
              />
              <button type="submit" className="cta-primary cta-buy cart-checkout-btn">
                Check out
              </button>
            </form>
            <GuaranteeNote />
            <TrustRow className="cart-trust" />
            <p className="cart-note">
              One secure payment for everything in your cart.
              Printable files arrive by email; a personalised
              reading includes a short form right after checkout.
            </p>
            <p className="cart-continue">
              <Link href="/products">&larr; Keep shopping</Link>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
