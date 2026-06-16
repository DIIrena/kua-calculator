// Client-safe types and labels for the global site search. This module
// imports nothing server-only (no node:fs), so the client SiteSearch
// component can import it. The index itself is built server-side in
// lib/search-index.ts and passed to the client as a prop.

export type SearchType =
  | "start"
  | "guide"
  | "article"
  | "room"
  | "life"
  | "product"
  | "glossary";

export type SearchEntry = {
  id: string;
  type: SearchType;
  title: string;
  subtitle: string;
  href: string;
  /** Extra terms folded into the match haystack (not displayed). */
  keywords: string;
};

export const SEARCH_TYPE_LABELS: Record<SearchType, string> = {
  start: "Start here",
  guide: "Guide",
  article: "Articles",
  room: "Rooms",
  life: "Life areas",
  product: "Products",
  glossary: "Glossary",
};

// Group display order on the results page.
export const SEARCH_TYPE_ORDER: SearchType[] = [
  "start",
  "guide",
  "article",
  "room",
  "life",
  "product",
  "glossary",
];
