"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

// The /guide library: an Etsy-style browse surface for the guide. The
// left rail is the eleven guide topics (plus "All"); the main column is
// a card grid of the pages in the selected topic, with a search box.
//
// Visual language is shared with the Shop storefront: it reuses the
// .storefront / .product-shelf-* classes so the two browse surfaces feel
// like one site. Data is passed in from the server page (lib/guide is
// server-only), so this component imports no server modules.

export type GuideCategory = {
  slug: string;
  label: string;
  count: number;
};

export type GuideLibraryPage = {
  cluster: string;
  clusterLabel: string;
  slug: string;
  title: string;
  teaser: string;
  readingTime: string;
  href: string;
};

export default function GuideLibrary({
  initialView,
  categories,
  pages,
}: {
  initialView: string;
  categories: GuideCategory[];
  pages: GuideLibraryPage[];
}) {
  const [view, setView] = useState(initialView);
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    return pages.filter((p) => {
      if (view !== "all" && p.cluster !== view) return false;
      if (
        q &&
        !`${p.title} ${p.teaser} ${p.clusterLabel}`.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [view, q, pages]);

  const total = pages.length;
  const activeLabel =
    view === "all"
      ? "All pages"
      : categories.find((c) => c.slug === view)?.label ?? "All pages";

  return (
    <div className="storefront">
      <aside
        className="storefront-sidebar"
        aria-label="Browse the guide by topic"
      >
        <h2 className="storefront-sidebar-title">Browse</h2>
        <ul className="storefront-cats">
          <li>
            <button
              type="button"
              className="storefront-cat"
              aria-pressed={view === "all"}
              onClick={() => setView("all")}
            >
              <span>All</span>
              <span className="storefront-cat-count">{total}</span>
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <button
                type="button"
                className="storefront-cat"
                aria-pressed={view === c.slug}
                onClick={() => setView(c.slug)}
              >
                <span>{c.label}</span>
                <span className="storefront-cat-count">{c.count}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="storefront-sidebar-note">
          Thirty-eight short pages, free, no account. Pick a topic, or
          search across the whole library.
        </p>
      </aside>

      <div className="storefront-main">
        <div className="storefront-controls">
          <div className="storefront-search">
            <label htmlFor="guide-search" className="visually-hidden">
              Search the guide
            </label>
            <input
              id="guide-search"
              type="search"
              placeholder="Search the guide"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <section className="storefront-section" aria-label="Guide pages">
          <h2 className="storefront-section-title">
            {activeLabel}{" "}
            <span className="storefront-section-count">
              ({filtered.length})
            </span>
          </h2>
          {filtered.length === 0 ? (
            <p className="storefront-empty">
              No pages match that search. Try a different word, or clear
              the search to see the whole topic.
            </p>
          ) : (
            <ul className="products-grid">
              {filtered.map((p) => (
                <li key={p.href} className="product-shelf-card">
                  <Link
                    href={p.href}
                    className="product-shelf-link"
                    aria-labelledby={`guide-${p.cluster}-${p.slug}-title`}
                  >
                    <p className="product-shelf-status-row">
                      <span className="product-shelf-status product-shelf-status-live">
                        {p.clusterLabel}
                      </span>
                      <span className="product-shelf-price">
                        {p.readingTime}
                      </span>
                    </p>
                    <h3
                      id={`guide-${p.cluster}-${p.slug}-title`}
                      className="product-shelf-title"
                    >
                      {p.title}
                    </h3>
                    <p className="product-shelf-oneliner">{p.teaser}</p>
                    <p className="product-shelf-cta">Read &rarr;</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
