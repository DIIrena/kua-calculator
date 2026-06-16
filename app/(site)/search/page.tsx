import type { Metadata } from "next";
import SiteSearch from "@/components/SiteSearch";
import { buildSearchIndex } from "@/lib/search-index";

// /search. Builds the local index server-side and hands it to the client
// filter. The page is noindex (a results page is not its own content),
// but it stays crawlable for links via follow. No analytics, no external
// search provider.

export const metadata: Metadata = {
  title: "Search | My Feng Shui Home",
  description:
    "Search the guide, articles, rooms, life areas, products, and glossary of My Feng Shui Home.",
  alternates: { canonical: "https://myfengshuihome.com/search" },
  robots: { index: false, follow: true },
};

export default async function SearchPage(props: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await props.searchParams;
  const index = buildSearchIndex();

  return (
    <div className="page-content search-page">
      <h1 className="search-h1">Search</h1>
      <p className="search-lede">
        One place to find a guide page, an article, a room, a life area, a
        product, or a glossary term.
      </p>
      <SiteSearch index={index} initialQuery={q ?? ""} />
    </div>
  );
}
