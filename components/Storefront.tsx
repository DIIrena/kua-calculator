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
// products lead; then a "What should I use?" chooser; then the by-room
// and by-life-area compass selectors; then the named card-groups for the
// rest. Every product and route is preserved. No product sets an `image`
// yet, so cards render text-first with no broken cover.

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

// The "What should I use?" chooser. Pick an intent; see one calm
// recommendation. In-page anchors (#by-room-h / #by-life-h) jump to the
// compass selectors below.
type Choice = {
  key: string;
  intent: string;
  title: string;
  price: string;
  line: string;
  cta: string;
  href: string;
  secondary?: { label: string; href: string };
};

const CHOICES: Choice[] = [
  {
    key: "learn",
    intent: "I'm just learning",
    title: "Start free",
    price: "Free",
    line: "Find your Kua number, then read the guide. No purchase needed.",
    cta: "Find my Kua number",
    href: "/kua-calculator",
    secondary: { label: "Open the guide", href: "/guide" },
  },
  {
    key: "me",
    intent: "My own directions",
    title: "Personal Feng Shui Compass",
    price: "$19",
    line: "Your Kua and your eight directions, read in depth, with a seven-day experiment.",
    cta: "View the Compass",
    href: "/products/personal-feng-shui-compass",
  },
  {
    key: "home",
    intent: "My whole home",
    title: "Complete Home Compass",
    price: "$49",
    line: "Every room and life area, compatibility, and a 2026 overlay, read for your Kua, in one volume.",
    cta: "View the Complete Home Compass",
    href: "/products/complete-home-compass",
  },
  {
    key: "year",
    intent: "Plan the year",
    title: "2026 Annual Planner",
    price: "$19",
    line: "The feng shui year for your home, sector by sector, with a 243-day calendar.",
    cta: "View the Planner",
    href: "/products/annual-feng-shui-planner-2026",
  },
  {
    key: "move",
    intent: "I'm moving home",
    title: "Move-In Date Report",
    price: "$29",
    line: "Your move-in window read day by day, with your Kua directions for the new home.",
    cta: "View the Move-In Date Report",
    href: "/products/move-in-kit",
  },
  {
    key: "couple",
    intent: "There are two of us",
    title: "Couple Compatibility Compass",
    price: "$19",
    line: "Both Kua maps read together: where you agree, and how to settle shared rooms.",
    cta: "View the Couple Compass",
    href: "/products/couple-compatibility-compass",
  },
  {
    key: "reset",
    intent: "A guided week",
    title: "7-Day Home Reset",
    price: "$19",
    line: "One short email a day, one small task each, room by room.",
    cta: "View the 7-Day Reset",
    href: "/products/seven-day-home-reset",
  },
  {
    key: "one",
    intent: "One room or life area",
    title: "Single Room or Life Area Compass",
    price: "from $7",
    line: "Pick one room or one life area, each read for your Kua.",
    cta: "Choose by room",
    href: "#by-room-h",
    secondary: { label: "Choose by life area", href: "#by-life-h" },
  },
];

function ProductChooser() {
  const [sel, setSel] = useState<string | null>(null);
  const choice = CHOICES.find((c) => c.key === sel) ?? null;

  return (
    <section
      className="collection products-chooser"
      aria-labelledby="chooser-h"
    >
      <h2 id="chooser-h" className="collection-title">
        What should I use?
      </h2>
      <p className="collection-sub">
        Pick what you are after, and we will point you to one good fit. Every
        product stands alone.
      </p>
      <div
        className="chooser-options"
        role="group"
        aria-label="What are you after?"
      >
        {CHOICES.map((c) => (
          <button
            key={c.key}
            type="button"
            className={`chooser-option${sel === c.key ? " is-active" : ""}`}
            aria-pressed={sel === c.key}
            onClick={() => setSel(sel === c.key ? null : c.key)}
          >
            {c.intent}
          </button>
        ))}
      </div>

      {choice ? (
        <div className="chooser-result" role="status">
          <p className="chooser-result-head">
            <span className="chooser-result-title">{choice.title}</span>
            <span className="chooser-result-price">{choice.price}</span>
          </p>
          <p className="chooser-result-line">{choice.line}</p>
          <p className="chooser-result-actions">
            <Link href={choice.href} className="cta-primary">
              {choice.cta}
            </Link>
            {choice.secondary ? (
              <Link
                href={choice.secondary.href}
                className="chooser-result-secondary"
              >
                {choice.secondary.label}
              </Link>
            ) : null}
          </p>
        </div>
      ) : (
        <p className="chooser-hint">
          Pick an option above, or browse everything below.
        </p>
      )}
    </section>
  );
}

export default function Storefront() {
  const featured = featuredProducts();

  return (
    <div className="products-collections">
      <ProductChooser />

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
