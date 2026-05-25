import type { Metadata } from "next";
import Link from "next/link";
import { LIFE_AREAS } from "@/lib/life-areas";
import { articlesForLifeArea } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Feng shui by life area | My Feng Shui Home",
  description:
    "Browse feng shui guidance by life concern. Money, love, career, health, fame, knowledge, creativity, travel, and the centre. Nine areas, free reading.",
  alternates: { canonical: "https://myfengshuihome.com/life" },
  openGraph: {
    type: "website",
    title: "Feng shui by life area",
    description:
      "Money, love, career, health, fame, knowledge, creativity, travel, and the centre. Nine areas, free reading.",
    url: "https://myfengshuihome.com/life",
  },
};

export default function LifeIndexPage() {
  return (
    <div className="page-content life-index">
      <p className="eyebrow">By life area</p>
      <h1 className="life-index-heading">
        What part of your life do you want to improve?
      </h1>
      <p className="life-index-lede">
        The bagua has <strong>nine sectors</strong> traditionally tied to nine
        life areas. Pick the one that matters to you right now. We give you
        three free moves you can make tonight, plus every article on the site
        that addresses that area.
      </p>

      <ul className="life-grid">
        {LIFE_AREAS.map((area) => {
          const articleCount = articlesForLifeArea(area.slug).length;
          return (
            <li key={area.slug}>
              <Link href={`/life/${area.slug}`} className="life-card">
                <p className="life-card-eyebrow">{area.bagua}</p>
                <h2 className="life-card-title">{area.label}</h2>
                <p className="life-card-tagline">{area.tagline}</p>
                <p className="life-card-meta">
                  {articleCount}{" "}
                  {articleCount === 1 ? "article" : "articles"} &rarr;
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
