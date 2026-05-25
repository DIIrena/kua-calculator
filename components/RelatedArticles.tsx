import Link from "next/link";
import type { Article } from "@/lib/articles";
import { CATEGORIES } from "@/lib/articles";

// Footer widget on /articles/[slug]. Shows 2-3 related reads. The
// article itself is excluded; gated articles are still listed so the
// reader knows what's next (with the gated pill).

type Props = {
  articles: Article[];
};

export default function RelatedArticles({ articles }: Props) {
  if (articles.length === 0) return null;
  return (
    <section className="related-articles" aria-labelledby="related-heading">
      <h2 id="related-heading" className="related-heading">
        Read next.
      </h2>
      <ul className="related-list">
        {articles.map((a) => (
          <li key={a.slug} className="related-item">
            <Link href={`/articles/${a.slug}`} className="related-link">
              <p className="related-category">{CATEGORIES[a.category].title}</p>
              <h3 className="related-title">{a.title}</h3>
              <p className="related-teaser">{a.teaser}</p>
              <p className="related-meta">
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
    </section>
  );
}
