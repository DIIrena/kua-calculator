import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { ARTICLES, findArticle, renderArticle } from "@/lib/articles";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const { slug } = await props.params;
  const article = findArticle(slug);
  if (!article) return { title: "Not found" };
  return {
    title: `${article.title} | My Feng Shui Home`,
    description: article.description,
    alternates: { canonical: `https://myfengshuihome.com/articles/${slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: `https://myfengshuihome.com/articles/${slug}`,
    },
  };
}

export default async function ArticlePage(props: { params: Params }) {
  const { slug } = await props.params;
  const article = findArticle(slug);
  if (!article) notFound();

  const session = await auth();
  const isSignedIn = Boolean(session?.user?.id);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.lastUpdated,
    dateModified: article.lastUpdated,
    author: {
      "@type": "Organization",
      name: "My Feng Shui Home",
      url: "https://myfengshuihome.com",
    },
  };

  // Gated article + signed-out visitor -> show the teaser + sign-in CTA
  // instead of the full body. Signed-in visitors see the full article.
  if (article.gated && !isSignedIn) {
    return (
      <article className="page-prose article-page">
        <p className="eyebrow">Articles · Free with an account</p>
        <h1 className="article-heading">{article.title}</h1>
        <p className="article-description">{article.description}</p>
        <div className="article-gate">
          <p>
            This article is <strong>free</strong>. We ask for a free account
            because the longer reads work best as a saved list you come back
            to, not a one-time scroll.
          </p>
          <p>
            Sign-up takes ten seconds. You can use a magic link or your Google
            account. No credit card.
          </p>
          <p className="article-gate-actions">
            <Link href="/sign-in" className="cta-primary">
              Continue with a free account
            </Link>
            <Link href="/articles" className="article-back-link">
              Back to articles
            </Link>
          </p>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      </article>
    );
  }

  const html = await renderArticle(slug);

  return (
    <article className="page-prose article-page">
      <p className="eyebrow">Articles</p>
      <h1 className="article-heading">{article.title}</h1>
      <p className="article-description">{article.description}</p>
      <p className="article-meta">
        {article.readingTime} · Last updated {article.lastUpdated}
      </p>

      <div
        className="article-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <footer className="article-footer">
        <Link href="/articles" className="article-back-link">
          &larr; All articles
        </Link>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </article>
  );
}
