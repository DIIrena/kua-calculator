"use client";

import { useState } from "react";
import Link from "next/link";
import {
  type StoreProduct,
  ladderProducts,
  momentProducts,
  kitProducts,
} from "@/lib/storefront";
import { useCart } from "@/components/CartProvider";

// The /products storefront (curated shelf, shop-redesign A4). Three
// product grids with no intro, chooser, or section copy: the three-card
// ladder, situational products, then printable kits. Delisted products
// keep live URLs but do not appear here.

function ProductCard({ p }: { p: StoreProduct }) {
  const free = p.category === "free";
  const { add, has } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const inCart = has(p.slug);

  return (
    <li className="shop-card">
      {p.image ? (
        <Link
          href={p.href}
          className="shop-card-coverlink"
          tabIndex={-1}
          aria-hidden="true"
        >
          {/* Renders only when the product sets `image`, so an unset
              product never points at a missing file. */}
          <img
            src={p.image}
            alt=""
            width={1500}
            height={1500}
            loading="lazy"
            className="shop-card-cover"
          />
        </Link>
      ) : null}
      <Link href={p.href} className="shop-card-titlelink">
        <h3 className="shop-card-title">{p.title}</h3>
      </Link>
      <p className="shop-card-desc">{p.oneLiner}</p>

      <div className="shop-card-foot">
        {p.onSale && p.wasCents ? (
          <s className="shop-card-was">${p.wasCents / 100}</s>
        ) : null}

        {free ? (
          <Link
            href={p.href}
            className="price-heart"
            aria-label={`${p.title}, free. Open the tool.`}
          >
            <span className="price-heart-shape" aria-hidden="true" />
            <span className="price-heart-amount">Free</span>
          </Link>
        ) : (
          <button
            type="button"
            className={`price-heart price-heart-btn${
              inCart || justAdded ? " is-added" : ""
            }`}
            aria-label={`Add ${p.title} to cart, ${p.priceLabel}`}
            onClick={() => {
              add({
                slug: p.slug,
                title: p.title,
                priceCents: p.priceCents,
                priceLabel: p.priceLabel,
                href: p.href,
              });
              setJustAdded(true);
            }}
          >
            <span className="price-heart-shape" aria-hidden="true" />
            <span className="price-heart-amount">{p.priceLabel}</span>
          </button>
        )}

        <span className="shop-card-foot-label">
          {free
            ? "Open the tool"
            : inCart || justAdded
              ? "In cart"
              : "Add to cart"}
        </span>
      </div>
    </li>
  );
}

function CardGrid({ items }: { items: StoreProduct[] }) {
  return (
    <ul className="products-grid">
      {items.map((p) => (
        <ProductCard key={p.slug} p={p} />
      ))}
    </ul>
  );
}

export default function Storefront() {
  // All shop products in one uniform grid. The grid is responsive:
  // 1 column on mobile, 2 on tablet, 3 on desktop (see .products-grid).
  const products = [
    ...ladderProducts(),
    ...momentProducts(),
    ...kitProducts(),
  ];

  return (
    <div className="products-collections">
      <section
        className="collection collection-featured"
        aria-label="Products"
      >
        <CardGrid items={products} />
      </section>
    </div>
  );
}
