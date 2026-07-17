import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LIFE_AREAS, findLifeArea, type LifeArea } from "@/lib/life-areas";
import { articlesForLifeArea, CATEGORIES } from "@/lib/articles";

type Params = Promise<{ area: string }>;

export async function generateStaticParams() {
  return LIFE_AREAS.map((a) => ({ area: a.slug }));
}

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const { area } = await props.params;
  const meta = findLifeArea(area);
  if (!meta) return { title: "Not found" };
  return {
    title: `Feng shui for ${meta.label.toLowerCase()} | My Feng Shui Home`,
    description: meta.shortDescription,
    alternates: { canonical: `https://myfengshuihome.com/life/${area}` },
    openGraph: {
      type: "website",
      title: `Feng shui for ${meta.label.toLowerCase()}`,
      description: meta.shortDescription,
      url: `https://myfengshuihome.com/life/${area}`,
    },
  };
}

export default async function LifeAreaPage(props: { params: Params }) {
  const { area } = await props.params;
  const meta = findLifeArea(area);
  if (!meta) notFound();

  const articles = articlesForLifeArea(area as LifeArea);

  return (
    <div className="life-area-page">
      {/* Hero - landing-page style, no price */}
      <section className="life-area-hero">
        <div className="page-content">
          <p className="eyebrow">
            Feng shui · {meta.bagua} sector
          </p>
          <h1 className="life-area-heading">
            Feng shui for <em>{meta.label.toLowerCase()}</em>.
          </h1>
          <p className="life-area-lede">{meta.longDescription}</p>
        </div>
      </section>

      {/* Three starter moves - free, immediate */}
      <section className="home-section home-section-paper life-area-starters">
        <div className="page-content">
          <h2>Three moves you can make tonight. Free.</h2>
          <p className="home-section-lede">
            None of these need a compass, a Kua number, new furniture, or
            money. Pick one. Do it before bed.
          </p>
          <ol className="life-area-starter-list">
            {meta.starters.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Articles tagged with this life area */}
      <section
        className="home-section home-section-cream life-area-articles"
        aria-labelledby="life-articles-heading"
      >
        <div className="page-content">
          <h2 id="life-articles-heading">
            Read deeper. Every article we have on {meta.label.toLowerCase()}.
          </h2>
          {articles.length === 0 ? (
            <p className="home-section-lede">
              We are still writing for this area. Until then, the{" "}
              <Link href="/articles" className="article-back-link">
                full article index
              </Link>{" "}
              has plenty to read.
            </p>
          ) : (
            <ul className="articles-list">
              {articles.map((a) => (
                <li key={a.slug} className="article-list-item">
                  <Link
                    href={`/articles/${a.slug}`}
                    className="article-list-link"
                  >
                    <p className="article-list-category">
                      {CATEGORIES[a.category].title}
                    </p>
                    <h3 className="article-list-title">{a.title}</h3>
                    <p className="article-list-teaser">{a.teaser}</p>
                    <p className="article-list-meta">
                      {a.readingTime}
                      {a.gated ? (
                        <>
                          {" · "}
                          <span className="article-gated-pill">
                            Free account
                          </span>
                        </>
                      ) : null}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Funnel to the paid Personal Feng Shui Compass */}
      <section
        className="home-section home-section-paper life-area-map-cta"
        aria-labelledby="map-cta-heading"
      >
        <div className="page-content">
          <div className="life-area-map-cta-inner">
            <div>
              <p className="eyebrow">For the full personalised version</p>
              <h2 id="map-cta-heading">
                Get the {meta.label.toLowerCase()} sector keyed to <em>your</em> home.
              </h2>
              <p className="home-section-lede">{meta.mapPitch}</p>
            </div>
            <div className="life-area-map-cta-card">
              <p className="map-page-price-eyebrow">The Personal Feng Shui Compass</p>
              <p className="map-page-price-amount">$19</p>
              <p className="map-page-price-suffix">
                one-time, personalised
              </p>
              <Link
                href="/products/personal-feng-shui-compass"
                className="cta-primary"
              >
                See the Compass
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Back link */}
      <section className="home-section home-section-cream life-area-back-section">
        <div className="page-content">
          <p>
            <Link href="/life" className="article-back-link">
              &larr; All nine life areas
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
