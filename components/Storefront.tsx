"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  STORE_PRODUCTS,
  STORE_FILTERS,
  countFor,
  type StoreFilter,
  type StoreProduct,
} from "@/lib/storefront";

type PriceBand = "any" | "u10" | "10to25" | "25to50" | "o50";
type SortKey = "featured" | "low" | "high";

const PRICE_BANDS: { key: PriceBand; label: string }[] = [
  { key: "any", label: "Any price" },
  { key: "u10", label: "Under $10" },
  { key: "10to25", label: "$10 to $25" },
  { key: "25to50", label: "$25 to $50" },
  { key: "o50", label: "Over $50" },
];

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "low", label: "Lowest price" },
  { key: "high", label: "Highest price" },
];

function inBand(cents: number, band: PriceBand): boolean {
  switch (band) {
    case "u10":
      return cents < 1000;
    case "10to25":
      return cents >= 1000 && cents <= 2500;
    case "25to50":
      return cents > 2500 && cents <= 5000;
    case "o50":
      return cents > 5000;
    default:
      return true;
  }
}

function ProductCard({ p }: { p: StoreProduct }) {
  const free = p.category === "free";
  return (
    <li className="product-shelf-card">
      <Link
        href={p.href}
        className="product-shelf-link"
        aria-labelledby={`store-${p.slug}-title`}
      >
        <p className="product-shelf-status-row">
          <span
            className={`product-shelf-status ${
              free ? "product-shelf-status-free" : "product-shelf-status-live"
            }`}
          >
            {free ? "Free" : "Available now"}
          </span>
          <span className="product-shelf-price">
            {p.onSale && p.wasCents ? (
              <>
                <s className="product-shelf-price-was">${p.wasCents / 100}</s>{" "}
                {p.priceLabel}
              </>
            ) : (
              p.priceLabel
            )}
          </span>
        </p>
        <h3 id={`store-${p.slug}-title`} className="product-shelf-title">
          {p.title}
        </h3>
        <p className="product-shelf-oneliner">{p.oneLiner}</p>
        <p className="product-shelf-cta">
          {free ? "Open the tool →" : "See the product →"}
        </p>
      </Link>
    </li>
  );
}

export default function Storefront() {
  const [category, setCategory] = useState<StoreFilter>("all");
  const [price, setPrice] = useState<PriceBand>("any");
  const [sort, setSort] = useState<SortKey>("featured");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const f of STORE_FILTERS) m[f.key] = countFor(f.key);
    return m;
  }, []);

  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    const list = STORE_PRODUCTS.filter((p) => {
      if (category === "onsale" && !p.onSale) return false;
      if (category !== "all" && category !== "onsale" && p.category !== category)
        return false;
      if (!inBand(p.priceCents, price)) return false;
      if (q && !(`${p.title} ${p.oneLiner}`.toLowerCase().includes(q)))
        return false;
      return true;
    });
    if (sort === "low") list.sort((a, b) => a.priceCents - b.priceCents);
    else if (sort === "high") list.sort((a, b) => b.priceCents - a.priceCents);
    else
      list.sort(
        (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
      );
    return list;
  }, [category, price, sort, q]);

  const isDefault =
    category === "all" && price === "any" && sort === "featured" && q === "";
  const featured = useMemo(
    () => STORE_PRODUCTS.filter((p) => p.featured),
    [],
  );

  const activeLabel =
    STORE_FILTERS.find((f) => f.key === category)?.label ?? "All";

  return (
    <div className="storefront">
      <aside className="storefront-sidebar" aria-label="Browse by category">
        <h2 className="storefront-sidebar-title">Browse</h2>
        <ul className="storefront-cats">
          {STORE_FILTERS.map((f) => (
            <li key={f.key}>
              <button
                type="button"
                className="storefront-cat"
                aria-pressed={category === f.key}
                onClick={() => setCategory(f.key)}
              >
                <span>{f.label}</span>
                <span className="storefront-cat-count">{counts[f.key]}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="storefront-sidebar-note">
          Every item is a one-time purchase. Printables arrive by email
          instantly; personalised readings within about a minute; 7-day
          refund on each.
        </p>
      </aside>

      <div className="storefront-main">
        <div className="storefront-controls">
          <div className="storefront-search">
            <label htmlFor="store-search" className="visually-hidden">
              Search products
            </label>
            <input
              id="store-search"
              type="search"
              placeholder="Search all products"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="storefront-selects">
            <label className="storefront-select">
              <span className="visually-hidden">Filter by price</span>
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value as PriceBand)}
              >
                {PRICE_BANDS.map((b) => (
                  <option key={b.key} value={b.key}>
                    Price: {b.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="storefront-select">
              <span className="visually-hidden">Sort products</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    Sort: {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {isDefault ? (
          <section className="storefront-section" aria-label="Featured items">
            <h2 className="storefront-section-title">Featured items</h2>
            <ul className="products-grid">
              {featured.map((p) => (
                <ProductCard key={p.slug} p={p} />
              ))}
            </ul>
          </section>
        ) : null}

        <section className="storefront-section" aria-label="Products">
          <h2 className="storefront-section-title">
            {isDefault ? "All items" : activeLabel}{" "}
            <span className="storefront-section-count">
              ({filtered.length})
            </span>
          </h2>
          {filtered.length === 0 ? (
            <p className="storefront-empty">
              {category === "onsale"
                ? "Nothing is on sale right now. Check back soon."
                : "No products match those filters. Try widening the price or clearing the search."}
            </p>
          ) : (
            <ul className="products-grid">
              {filtered.map((p) => (
                <ProductCard key={p.slug} p={p} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
