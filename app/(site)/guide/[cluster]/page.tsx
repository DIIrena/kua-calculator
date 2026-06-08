import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  GUIDE_CLUSTERS,
  findCluster,
  pagesInCluster,
} from "@/lib/guide";

type Params = Promise<{ cluster: string }>;

export async function generateStaticParams() {
  return GUIDE_CLUSTERS.map((c) => ({ cluster: c.slug }));
}

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { cluster } = await props.params;
  const meta = findCluster(cluster);
  if (!meta) return { title: "Not found" };
  const url = `https://myfengshuihome.com/guide/${cluster}`;
  return {
    title: `${meta.label} | The feng shui guide | My Feng Shui Home`,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: `${meta.label} | The feng shui guide`,
      description: meta.description,
      url,
    },
  };
}

export default async function GuideClusterPage(props: { params: Params }) {
  const { cluster } = await props.params;
  const meta = findCluster(cluster);
  if (!meta) notFound();

  const pages = pagesInCluster(cluster);
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
        name: meta.label,
        item: clusterUrl,
      },
    ],
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: meta.label,
    description: meta.description,
    url: clusterUrl,
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: pages.length,
      itemListElement: pages.map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: p.title,
        url: `${clusterUrl}/${p.slug}`,
      })),
    },
  };

  return (
    <div className="page-content guide-cluster">
      <p className="eyebrow">
        <Link href="/guide" className="article-back-link">
          &larr; Back to the guide
        </Link>
      </p>
      <h1 className="guide-cluster-heading">{meta.label}.</h1>
      <p className="guide-cluster-lede">{meta.description}</p>

      {pages.length === 0 ? (
        <p className="guide-cluster-empty">
          This cluster is being adapted. Check back soon.
        </p>
      ) : (
        <ul className="guide-page-list" aria-label={`${meta.label} pages`}>
          {pages.map((p) => (
            <li key={p.slug} className="guide-page-list-item">
              <Link
                href={`/guide/${cluster}/${p.slug}`}
                className="guide-page-list-link"
              >
                <h2 className="guide-page-list-title">{p.title}</h2>
                <p className="guide-page-list-teaser">{p.teaser}</p>
                <p className="guide-page-list-meta">
                  {p.readingTime}
                  {p.gated ? " - free with an account" : ""} &rarr;
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
    </div>
  );
}
