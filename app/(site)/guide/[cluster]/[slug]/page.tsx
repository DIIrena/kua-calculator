import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import {
  GUIDE_PAGES,
  findCluster,
  findGuidePage,
  renderGuidePage,
} from "@/lib/guide";
import AuthorByline from "@/components/AuthorByline";
import GuideReadState from "@/components/GuideReadState";

type Params = Promise<{ cluster: string; slug: string }>;

export async function generateStaticParams() {
  return GUIDE_PAGES.map((p) => ({ cluster: p.cluster, slug: p.slug }));
}

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { cluster, slug } = await props.params;
  const page = findGuidePage(cluster, slug);
  if (!page) return { title: "Not found" };
  // SEO title: use seoTitle if the page sets it (high-intent search
  // phrasing), otherwise fall back to the in-page title.
  const seoTitle = page.seoTitle ?? page.title;
  return {
    title: `${seoTitle} | My Feng Shui Home`,
    description: page.description,
    alternates: {
      canonical: `https://myfengshuihome.com/guide/${cluster}/${slug}`,
    },
    openGraph: {
      type: "article",
      title: page.title,
      description: page.description,
      url: `https://myfengshuihome.com/guide/${cluster}/${slug}`,
      images: [
        {
          url: `https://myfengshuihome.com/api/og/guide/${cluster}/${slug}`,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [`https://myfengshuihome.com/api/og/guide/${cluster}/${slug}`],
    },
  };
}

export default async function GuidePage(props: { params: Params }) {
  const { cluster, slug } = await props.params;
  const page = findGuidePage(cluster, slug);
  const clusterMeta = findCluster(cluster);
  if (!page || !clusterMeta) notFound();

  // Gated pages: keep the same gating pattern as /articles.
  let html: string | null = null;
  let gateRedirected = false;
  if (page.gated) {
    const session = await auth();
    if (!session?.user?.id) {
      gateRedirected = true;
    } else {
      html = await renderGuidePage(cluster, slug);
    }
  } else {
    html = await renderGuidePage(cluster, slug);
  }

  const pageUrl = `https://myfengshuihome.com/guide/${cluster}/${slug}`;
  const clusterUrl = `https://myfengshuihome.com/guide/${cluster}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "The Ultimate Feng Shui Guide",
        item: "https://myfengshuihome.com/guide",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: clusterMeta.label,
        item: clusterUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.title,
        item: pageUrl,
      },
    ],
  };

  // Article JSON-LD only on rendered (non-gated, or gated-and-signed-in)
  // body. Gated previews must not advertise content the crawler cannot see.
  const articleJsonLd = html
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: page.title,
        description: page.description,
        datePublished: page.lastUpdated,
        dateModified: page.lastUpdated,
        author: {
          "@type": "Organization",
          name: "My Feng Shui Home",
          url: "https://myfengshuihome.com",
        },
        publisher: {
          "@type": "Organization",
          name: "My Feng Shui Home",
          url: "https://myfengshuihome.com",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": pageUrl,
        },
      }
    : null;

  return (
    <div className="page-content guide-page">
      <p className="eyebrow">
        <Link href={`/guide/${cluster}`} className="article-back-link">
          &larr; Back to {clusterMeta.label}
        </Link>
      </p>
      <h1 className="guide-page-heading">{page.title}</h1>
      <p className="guide-page-meta">
        {page.readingTime} - last updated{" "}
        <time dateTime={page.lastUpdated}>{page.lastUpdated}</time>
      </p>
      <p className="guide-page-labelnote">
        Key recommendations are labelled where their basis matters.{" "}
        <Link href="/editorial-method">What the labels mean</Link>.
      </p>

      {gateRedirected ? (
        <section className="guide-page-gate">
          <p>
            This page is free with an account. Sign in or sign up in
            ten seconds, and you can read it.
          </p>
          <p>
            <Link href="/sign-in" className="cta-primary">
              Sign in
            </Link>
          </p>
        </section>
      ) : (
        <>
          <article
            className="guide-page-body markdown-content"
            dangerouslySetInnerHTML={{ __html: html ?? "" }}
          />
          {page.cta ? (
            <aside className="in-article-cta" aria-label="What to do next">
              {page.cta.rationale ? (
                <p className="in-article-cta-text">{page.cta.rationale}</p>
              ) : null}
              <p className="in-article-cta-actions">
                <Link href={page.cta.href} className="cta-primary">
                  {page.cta.label}
                </Link>
              </p>
            </aside>
          ) : null}
          {(() => {
            // Prev/next within the cluster, in registry order, so the
            // 38 pages read like a course rather than a pile.
            const siblings = GUIDE_PAGES.filter(
              (p) => p.cluster === cluster,
            );
            const i = siblings.findIndex((p) => p.slug === page.slug);
            const prev = i > 0 ? siblings[i - 1] : null;
            const next =
              i >= 0 && i < siblings.length - 1 ? siblings[i + 1] : null;
            if (!prev && !next) return null;
            return (
              <nav
                className="guide-prev-next"
                aria-label="Previous and next page in this section"
              >
                {prev ? (
                  <Link
                    href={`/guide/${cluster}/${prev.slug}`}
                    className="guide-prev-next-link guide-prev-link"
                  >
                    <span className="guide-prev-next-label">
                      &larr; Previous
                    </span>
                    <span className="guide-prev-next-title">
                      {prev.title}
                    </span>
                  </Link>
                ) : (
                  <span aria-hidden="true" />
                )}
                {next ? (
                  <Link
                    href={`/guide/${cluster}/${next.slug}`}
                    className="guide-prev-next-link guide-next-link"
                  >
                    <span className="guide-prev-next-label">
                      Next &rarr;
                    </span>
                    <span className="guide-prev-next-title">
                      {next.title}
                    </span>
                  </Link>
                ) : (
                  <span aria-hidden="true" />
                )}
              </nav>
            );
          })()}
          <AuthorByline />
          <GuideReadState mode="track" slug={`${cluster}/${page.slug}`} />
        </>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {articleJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      ) : null}
    </div>
  );
}
