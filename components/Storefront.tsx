"use client";

import { useState } from "react";
import Link from "next/link";
import {
  type StoreProduct,
  featuredProducts,
  roomCompasses,
  lifeCompasses,
  PRODUCT_GROUPS,
  groupProducts,
} from "@/lib/storefront";
import { useCart } from "@/components/CartProvider";

// The /products storefront: a curated, grouped browse. The six featured
// products lead; then a "Not sure what to buy?" comparison; then the
// by-room and by-life-area compass selectors; then the named card-groups
// for the rest. Every product and route is preserved. No product sets an
// `image` yet, so cards render text-first with no broken cover.

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

function CompassChip({ p }: { p: StoreProduct }) {
  // Room and life-area compass titles all end in " Compass"; the chip
  // shows just the room or area, with the price.
  const short = p.title.replace(/\s*Compass$/, "");
  return (
    <li>
      <Link href={p.href} className="product-chip">
        <span className="product-chip-title">{short}</span>
        <span className="product-chip-price">{p.priceLabel}</span>
      </Link>
    </li>
  );
}

function CompassSelector({
  id,
  title,
  sub,
  items,
}: {
  id: string;
  title: string;
  sub: string;
  items: StoreProduct[];
}) {
  return (
    <section className="collection" aria-labelledby={id}>
      <h2 id={id} className="collection-title">
        {title}
      </h2>
      <p className="collection-sub">{sub}</p>
      <ul className="product-chips">
        {items.map((p) => (
          <CompassChip key={p.slug} p={p} />
        ))}
      </ul>
    </section>
  );
}

function CompareBlock() {
  return (
    <section
      className="collection products-compare"
      aria-labelledby="compare-h"
    >
      <h2 id="compare-h" className="collection-title">
        Not sure what to buy?
      </h2>
      <p className="collection-sub">
        Start free, then go as deep as you want. Every product stands alone.
      </p>
      <ol className="compare-steps">
        <li>
          <span className="compare-when">Just exploring</span>
          <Link href="/kua-calculator" className="compare-what">
            Free Kua Calculator
          </Link>
          <span className="compare-note">
            Your Kua number and your eight directions, in ten seconds.
          </span>
        </li>
        <li>
          <span className="compare-when">One clear reading for you</span>
          <Link
            href="/products/personal-feng-shui-compass"
            className="compare-what"
          >
            Personal Feng Shui Compass, $14
          </Link>
          <span className="compare-note">
            Your Kua read in depth, with a seven-day experiment to test it.
          </span>
        </li>
        <li>
          <span className="compare-when">Your whole home, every area</span>
          <Link
            href="/products/complete-home-compass"
            className="compare-what"
          >
            Complete Home Compass, $49
          </Link>
          <span className="compare-note">
            Every room and life area, read for your Kua, in one volume.
          </span>
        </li>
        <li>
          <span className="compare-when">Plan the year</span>
          <Link
            href="/products/annual-feng-shui-planner-2026"
            className="compare-what"
          >
            2026 Annual Planner, $19
          </Link>
          <span className="compare-note">
            The year ahead, sector by sector, with a day calendar.
          </span>
        </li>
      </ol>
      <p className="compare-situational">
        For a specific situation: the{" "}
        <Link href="/products/move-in-kit">Move-In Date Report</Link> for a
        move, the{" "}
        <Link href="/products/couple-compatibility-compass">
          Couple Compatibility Compass
        </Link>{" "}
        for two people, and the{" "}
        <Link href="/products/seven-day-home-reset">7-Day Home Reset</Link>{" "}
        for a guided week.
      </p>
    </section>
  );
}

export default function Storefront() {
  const featured = featuredProducts();

  return (
    <div className="products-collections">
      <section
        className="collection collection-featured"
        aria-labelledby="featured-h"
      >
        <h2 id="featured-h" className="collection-title">
          Featured
        </h2>
        <p className="collection-sub">
          Six good starting points. Each one stands alone.
        </p>
        <CardGrid items={featured} />
      </section>

      <CompareBlock />

      <CompassSelector
        id="by-room-h"
        title="Choose by room"
        sub="Twelve single-room compasses, each read for your Kua. From $7."
        items={roomCompasses()}
      />

      <CompassSelector
        id="by-life-h"
        title="Choose by life area"
        sub="Nine single-area compasses, each read for your Kua. From $7."
        items={lifeCompasses()}
      />

      {PRODUCT_GROUPS.map((g) => (
        <section
          key={g.key}
          className="collection"
          aria-labelledby={`grp-${g.key}`}
        >
          <h2 id={`grp-${g.key}`} className="collection-title">
            {g.label}
          </h2>
          <p className="collection-sub">{g.description}</p>
          <CardGrid items={groupProducts(g)} />
        </section>
      ))}
    </div>
  );
}
