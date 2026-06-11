import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import {
  ARTICLES,
  CATEGORIES,
  findArticle,
  relatedTo,
  renderArticle,
} from "@/lib/articles";
import RelatedArticles from "@/components/RelatedArticles";
import InArticleCta from "@/components/InArticleCta";
import AuthorByline from "@/components/AuthorByline";

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
      images: [
        {
          url: `https://myfengshuihome.com/api/og/${slug}`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [`https://myfengshuihome.com/api/og/${slug}`],
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
  const related = relatedTo(article);
  const categoryMeta = CATEGORIES[article.category];

  return (
    <article className="page-prose article-page">
      <p className="eyebrow">
        Articles ·{" "}
        <Link
          href={`/articles/category/${article.category}`}
          className="article-category-link"
        >
          {categoryMeta.title}
        </Link>
      </p>
      <h1 className="article-heading">{article.title}</h1>
      <p className="article-description">{article.description}</p>
      <p className="article-meta">
        {article.readingTime} · Last updated {article.lastUpdated}
      </p>

      <div
        className="article-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <InArticleCta article={article} />

      <RelatedArticles articles={related} />

      <AuthorByline />

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
