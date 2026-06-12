import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES, CATEGORIES, type ArticleCategory } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles | My Feng Shui Home",
  description:
    "Short feng shui articles. Free reading, no account required for most. Browse by category or start with the most-read article.",
  alternates: { canonical: "https://myfengshuihome.com/articles" },
};

const CATEGORY_ORDER: ReadonlyArray<ArticleCategory> = [
  "foundations",
  "bagua",
  "room-by-room",
  "methodology",
];

export default function ArticlesIndexPage() {
  return (
    <div className="page-content articles-index">
      <p className="eyebrow">Articles</p>
      <h1 className="articles-index-heading">
        Feng shui, one topic at a time.
      </h1>
      <p className="articles-index-lede">
        Short reads, written to be read aloud. No mysticism without a footnote.
        Most are free; a few unlock with a free account.
      </p>

      <section
        className="articles-category-grid"
        aria-label="Browse by category"
      >
        {CATEGORY_ORDER.map((cat) => {
          const meta = CATEGORIES[cat];
          const count = ARTICLES.filter((a) => a.category === cat).length;
          return (
            <Link
              key={cat}
              href={`/articles/category/${cat}`}
              className="category-card"
            >
              <p className="category-card-eyebrow">{meta.title}</p>
              <h2 className="category-card-tagline">{meta.tagline}</h2>
              <p className="category-card-desc">{meta.description}</p>
              <p className="category-card-meta">
                {count} {count === 1 ? "article" : "articles"} &rarr;
              </p>
            </Link>
          );
        })}
      </section>

      <h2 className="articles-index-subhead">All articles</h2>
      <ul className="articles-list">
        {ARTICLES.map((a) => (
          <li key={a.slug} className="article-list-item">
            <Link href={`/articles/${a.slug}`} className="article-list-link">
              <p className="article-list-category">
                {CATEGORIES[a.category].title}
              </p>
              <h2 className="article-list-title">{a.title}</h2>
              <p className="article-list-teaser">{a.teaser}</p>
              <p className="article-list-meta">
                {a.readingTime}
                {a.gated ? (
                  <>
                    {" · "}
                    <span className="article-gated-pill">Free account</span>
                  </>
                ) : null}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
