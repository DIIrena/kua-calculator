import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles | My Feng Shui Home",
  description:
    "Plain-English feng shui articles. Free reading, no account required for most.",
  alternates: { canonical: "https://myfengshuihome.com/articles" },
};

export default function ArticlesIndexPage() {
  return (
    <div className="page-narrow articles-index">
      <p className="eyebrow">Articles</p>
      <h1 className="articles-index-heading">
        Plain-English feng shui, one topic at a time.
      </h1>
      <p className="articles-index-lede">
        Short reads, written to be read aloud. No mysticism without a footnote.
        Most are free; a few unlock with a free account.
      </p>

      <ul className="articles-list">
        {ARTICLES.map((a) => (
          <li key={a.slug} className="article-list-item">
            <Link href={`/articles/${a.slug}`} className="article-list-link">
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
