"use client";

import { useEffect } from "react";
import { useCart } from "@/components/CartProvider";

// Empties the cart once, on the order-success page.
export default function CartClearer() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
  }, [clear]);
  return null;
}
