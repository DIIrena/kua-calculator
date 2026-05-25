import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, CATEGORIES, articlesInCategory, type ArticleCategory } from "@/lib/articles";

type Params = Promise<{ slug: string }>;

const CATEGORY_KEYS: ReadonlyArray<ArticleCategory> = [
  "foundations",
  "bagua",
  "room-by-room",
  "methodology",
];

export async function generateStaticParams() {
  return CATEGORY_KEYS.map((slug) => ({ slug }));
}

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const { slug } = await props.params;
  if (!CATEGORY_KEYS.includes(slug as ArticleCategory)) {
    return { title: "Not found" };
  }
  const cat = CATEGORIES[slug as ArticleCategory];
  return {
    title: `${cat.title} - feng shui articles | My Feng Shui Home`,
    description: cat.description,
    alternates: {
      canonical: `https://myfengshuihome.com/articles/category/${slug}`,
    },
    openGraph: {
      type: "website",
      title: `${cat.title} - feng shui articles`,
      description: cat.description,
      url: `https://myfengshuihome.com/articles/category/${slug}`,
    },
  };
}

export default async function CategoryPage(props: { params: Params }) {
  const { slug } = await props.params;
  if (!CATEGORY_KEYS.includes(slug as ArticleCategory)) notFound();

  const cat = CATEGORIES[slug as ArticleCategory];
  const articles = articlesInCategory(slug as ArticleCategory);

  return (
    <div className="page-content articles-category">
      <p className="eyebrow">Articles · {cat.title}</p>
      <h1 className="articles-category-heading">{cat.tagline}</h1>
      <p className="articles-category-lede">{cat.description}</p>

      {articles.length === 0 ? (
        <p className="articles-category-empty">
          No articles in this category yet. They are on the way.
        </p>
      ) : (
        <ul className="articles-list">
          {articles.map((a) => (
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
      )}

      <p className="articles-category-back">
        <Link href="/articles" className="article-back-link">
          &larr; All categories
        </Link>
      </p>

      <p className="articles-category-count" aria-hidden="true">
        {articles.length} of {ARTICLES.length} articles total
      </p>
    </div>
  );
}
