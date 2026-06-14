"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// Client-side shopping cart. Digital goods, so quantity is always one
// per product (adding an item already in the cart is a no-op). Persists
// to localStorage so the cart survives navigation and refreshes. Mounted
// in the (site) layout, so /embed (outside that group) never loads it.

export type CartItem = {
  slug: string;
  title: string;
  priceCents: number;
  priceLabel: string;
  href: string;
};

type CartCtx = {
  items: CartItem[];
  count: number;
  totalCents: number;
  add: (item: CartItem) => void;
  remove: (slug: string) => void;
  clear: () => void;
  has: (slug: string) => boolean;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "mfsh_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // localStorage unavailable / corrupt; start empty.
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      // Ignore write failures (private mode, quota).
    }
  }, [items, loaded]);

  const add = useCallback((item: CartItem) => {
    setItems((prev) =>
      prev.some((i) => i.slug === item.slug) ? prev : [...prev, item],
    );
  }, []);
  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);
  const clear = useCallback(() => setItems([]), []);
  const has = useCallback(
    (slug: string) => items.some((i) => i.slug === slug),
    [items],
  );

  const count = items.length;
  const totalCents = items.reduce((sum, i) => sum + i.priceCents, 0);

  return (
    <Ctx.Provider
      value={{ items, count, totalCents, add, remove, clear, has }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart(): CartCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
