import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";
import {
  articlesInCategory,
  type ArticleCategory,
} from "@/lib/articles";
import { LIFE_AREAS } from "@/lib/life-areas";
import { SPACES } from "@/lib/spaces";

// Shared primary-nav item list. Used by both the desktop nav surface and
// the mobile <details> hamburger surface in SiteHeader so the two
// surfaces never drift out of sync.
//
// Server Component only. No client JS, no analytics import.
//
// Nav order (left to right on desktop, top to bottom on mobile):
//   1. Life pillars (dropdown)
//   2. Space (dropdown)
//   3. Products
//   4. Guide
//   5. Everything About Feng Shui (mega dropdown)
//   6. Calculator
//   7. Account / Sign in

type NavCategory = {
  category: ArticleCategory;
  label: string;
  pinned?: Array<{ label: string; href: string }>;
};

const NAV_CATEGORIES: ReadonlyArray<NavCategory> = [
  { category: "foundations", label: "Foundations" },
  { category: "bagua", label: "The Bagua Map" },
  { category: "room-by-room", label: "Room by Room" },
  {
    category: "methodology",
    label: "Methodology",
    pinned: [
      { label: "The Compass School (deep dive)", href: "/methodology" },
    ],
  },
];

export default function NavItems({ signedIn }: { signedIn: boolean }) {
  return (
    <>
      {/* 1. Life pillars */}
      <details className="nav-dropdown">
        <summary className="nav-dropdown-summary nav-dropdown-summary-feature">
          Life pillars
          <span className="nav-dropdown-caret" aria-hidden="true">
            &#9662;
          </span>
        </summary>
        <div className="nav-dropdown-panel" role="menu">
          {LIFE_AREAS.map((a) => (
            <Link
              key={a.slug}
              href={`/life/${a.slug}`}
              role="menuitem"
              className="nav-dropdown-link"
            >
              {a.label}
            </Link>
          ))}
          <Link
            href="/life"
            role="menuitem"
            className="nav-dropdown-link nav-dropdown-see-all"
          >
            All nine life areas &rarr;
          </Link>
        </div>
      </details>

      {/* 2. Space */}
      <details className="nav-dropdown">
        <summary className="nav-dropdown-summary nav-dropdown-summary-feature">
          Space
          <span className="nav-dropdown-caret" aria-hidden="true">
            &#9662;
          </span>
        </summary>
        <div className="nav-dropdown-panel" role="menu">
          {SPACES.map((s) => (
            <Link
              key={s.slug}
              href={`/space/${s.slug}`}
              role="menuitem"
              className="nav-dropdown-link"
            >
              {s.label}
            </Link>
          ))}
          <Link
            href="/space"
            role="menuitem"
            className="nav-dropdown-link nav-dropdown-see-all"
          >
            All six rooms &rarr;
          </Link>
        </div>
      </details>

      {/* 3. Products */}
      <Link href="/products" className="site-nav-link site-nav-link-feature">
        Products
      </Link>

      {/* 4. Guide */}
      <Link href="/guide" className="site-nav-link site-nav-link-feature">
        Guide
      </Link>

      {/* 5. Everything About Feng Shui */}
      <details className="nav-dropdown nav-dropdown-mega">
        <summary className="nav-dropdown-summary nav-dropdown-summary-feature">
          Everything About Feng Shui
          <span className="nav-dropdown-caret" aria-hidden="true">
            &#9662;
          </span>
        </summary>
        <div className="nav-dropdown-panel nav-mega-panel" role="menu">
          {NAV_CATEGORIES.map((nav) => {
            const articles = articlesInCategory(nav.category);
            return (
              <div key={nav.category} className="nav-mega-section">
                <Link
                  href={`/articles/category/${nav.category}`}
                  className="nav-mega-section-title"
                  role="menuitem"
                >
                  {nav.label}
                </Link>
                <ul className="nav-mega-section-list">
                  {nav.pinned?.map((p) => (
                    <li key={p.href}>
                      <Link
                        href={p.href}
                        role="menuitem"
                        className="nav-dropdown-link nav-dropdown-pinned"
                      >
                        {p.label}
                      </Link>
                    </li>
                  ))}
                  {articles.map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/articles/${a.slug}`}
                        role="menuitem"
                        className="nav-dropdown-link"
                      >
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <Link
            href="/articles"
            role="menuitem"
            className="nav-mega-see-all"
          >
            See the full article index &rarr;
          </Link>
        </div>
      </details>

      {/* 6. Calculator */}
      <Link href="/kua-calculator" className="site-nav-link">
        Calculator
      </Link>

      {/* 7. Account / Sign in */}
      {signedIn ? (
        <>
          <Link href="/account" className="site-nav-link">
            Account
          </Link>
          <SignOutButton />
        </>
      ) : (
        <Link href="/sign-in" className="site-nav-link">
          Sign in
        </Link>
      )}
    </>
  );
}
