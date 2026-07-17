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

// The /products storefront (curated shelf, shop-redesign A4). The
// chooser leads; then the three-card ladder (the primary decision);
// then two quiet rows: situational products and printable kits; then
// the free strip. Delisted products keep live URLs but do not appear
// here.

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
    title: "Complete Home Compass",
    price: "$49",
    line: "The 2026 overlay for your home is inside the Complete Home Compass, along with every room and life area, read for your Kua.",
    cta: "View the Complete Home Compass",
    href: "/products/complete-home-compass",
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
    key: "reset",
    intent: "A guided week",
    title: "7-Day Home Reset",
    price: "$19",
    line: "One short email a day, one small task each, room by room.",
    cta: "View the 7-Day Reset",
    href: "/products/seven-day-home-reset",
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
  return (
    <div className="products-collections">
      <ProductChooser />

      <section
        className="collection collection-featured"
        aria-labelledby="ladder-h"
      >
        <h2 id="ladder-h" className="collection-title">
          The readings
        </h2>
        <p className="collection-sub">
          Three depths, one system: your directions, every room, or the
          whole home in one volume. Each stands alone.
        </p>
        <CardGrid items={ladderProducts()} />
      </section>

      <section
        className="collection collection-quiet"
        aria-labelledby="moments-h"
      >
        <h2 id="moments-h" className="collection-title">
          For particular moments
        </h2>
        <p className="collection-sub">
          A move, or a guided week of small tasks.
        </p>
        <CardGrid items={momentProducts()} />
      </section>

      <section
        className="collection collection-quiet"
        aria-labelledby="kits-h"
      >
        <h2 id="kits-h" className="collection-title">
          Kits and guides
        </h2>
        <p className="collection-sub">
          The Nine Life Areas reading is also included in the Complete
          Home Compass; the printable kits stand on their own.
        </p>
        <CardGrid items={kitProducts()} />
      </section>

      <section className="collection products-free-strip" aria-labelledby="free-h">
        <h2 id="free-h" className="collection-title">
          Start free
        </h2>
        <p className="collection-sub">
          The <Link href="/kua-calculator">Kua calculator</Link> gives you
          your number and your eight directions in about ten seconds. The{" "}
          <Link href="/good-days">Good Days calendar</Link> lists every
          favourable date from July 2026 to February 2027. Both free, no
          account.
        </p>
      </section>
    </div>
  );
}
