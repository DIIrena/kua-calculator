"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

// Header cart link: a shopping-bag icon with a live item count, linking
// to /cart. Count is 0 on the server and updates after the cart hydrates
// from localStorage, so there is no hydration mismatch.
export default function CartButton() {
  const { count } = useCart();
  return (
    <Link
      href="/cart"
      className="site-nav-link cart-button"
      aria-label={
        count > 0
          ? `Cart, ${count} item${count === 1 ? "" : "s"}`
          : "Cart, empty"
      }
    >
      <span className="cart-button-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" focusable="false">
          <path
            d="M6.5 8h11l-1 11.5a1 1 0 0 1-1 .9H8.5a1 1 0 0 1-1-.9L6.5 8Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M9.25 8V6.75a2.75 2.75 0 0 1 5.5 0V8"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="cart-button-text">Cart</span>
      {count > 0 ? (
        <span className="cart-button-count" aria-hidden="true">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
