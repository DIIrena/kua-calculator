"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  type SearchEntry,
  type SearchType,
  SEARCH_TYPE_LABELS,
  SEARCH_TYPE_ORDER,
} from "@/lib/search-types";

// The global search UI. Filters a prebuilt, in-memory index entirely on
// the client: no network request, no analytics, no third-party service.
// Results are grouped (Start here, Guide, Articles, Rooms, Life areas,
// Products, Glossary), in that order.

const HINT = "Try room, wealth, bedroom, Kua, planner, or desk.";

function norm(s: string): string {
  return s.toLowerCase();
}

function Group({ type, items }: { type: SearchType; items: SearchEntry[] }) {
  if (!items.length) return null;
  return (
    <section className="site-search-group" aria-label={SEARCH_TYPE_LABELS[type]}>
      <h2 className="site-search-group-title">{SEARCH_TYPE_LABELS[type]}</h2>
      <ul className="site-search-list">
        {items.map((e) => (
          <li key={e.id}>
            <Link href={e.href} className="site-search-result">
              <span className="site-search-result-title">{e.title}</span>
              {e.subtitle ? (
                <span className="site-search-result-sub">{e.subtitle}</span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function SiteSearch({
  index,
  initialQuery,
}: {
  index: SearchEntry[];
  initialQuery: string;
}) {
  const [q, setQ] = useState(initialQuery);
  const query = q.trim();

  const startItems = useMemo(
    () => index.filter((e) => e.type === "start"),
    [index],
  );

  const grouped = useMemo(() => {
    if (!query) return null;
    const tokens = norm(query).split(/\s+/).filter(Boolean);
    const byType = {} as Record<SearchType, SearchEntry[]>;
    for (const e of index) {
      const hay = norm(
        `${e.title} ${e.subtitle} ${e.keywords} ${SEARCH_TYPE_LABELS[e.type]}`,
      );
      if (tokens.every((t) => hay.includes(t))) {
        (byType[e.type] ??= []).push(e);
      }
    }
    return byType;
  }, [query, index]);

  const total = grouped
    ? Object.values(grouped).reduce((n, a) => n + a.length, 0)
    : 0;

  return (
    <div className="site-search">
      <form
        className="site-search-form"
        role="search"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="site-search-input" className="visually-hidden">
          Search the site
        </label>
        <input
          id="site-search-input"
          type="search"
          placeholder="Search the site"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="site-search-input"
        />
      </form>

      {!query ? (
        <div className="site-search-results">
          <p className="site-search-hint">{HINT}</p>
          <Group type="start" items={startItems} />
        </div>
      ) : total === 0 ? (
        <div className="site-search-results">
          <p className="site-search-hint">No matches yet. {HINT}</p>
          <Group type="start" items={startItems} />
        </div>
      ) : (
        <div className="site-search-results">
          {SEARCH_TYPE_ORDER.map((type) => (
            <Group key={type} type={type} items={grouped?.[type] ?? []} />
          ))}
        </div>
      )}
    </div>
  );
}
