import Link from "next/link";
import { auth } from "@/auth";
import SignOutButton from "@/components/SignOutButton";
import {
  articlesInCategory,
  type ArticleCategory,
} from "@/lib/articles";
import { LIFE_AREAS } from "@/lib/life-areas";
import { SPACES } from "@/lib/spaces";

// Server Component. Reflects logged-in state and renders the primary nav.
//
// Nav order (left to right):
//   1. Life pillars (dropdown - 9 bagua-area pages, the primary funnel)
//   2. Space (dropdown - 6 rooms of the home)
//   3. Products (direct link to /products shelf - the paid shop)
//   4. Everything About Feng Shui (single mega dropdown - every article
//      grouped by its topic category)
//   5. Calculator (free tool, direct link)
//   6. Sign in / Account (auth)

type NavCategory = {
  category: ArticleCategory;
  label: string;
  /** Items to show before the category's article list. */
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

export default async function SiteHeader() {
  let signedIn = false;
  try {
    const session = await auth();
    signedIn = Boolean(session?.user);
  } catch {
    signedIn = false;
  }

  return (
    <header className="site-header">
      <Link
        href="/"
        className="brand"
        aria-label="My Feng Shui Home, home"
      >
        <span className="brand-mark" aria-hidden="true">
          <svg
            viewBox="0 0 709 709"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            aria-hidden="true"
          >
            <g
              transform="translate(0,709) scale(0.1,-0.1)"
              fill="currentColor"
              stroke="none"
            >
              <path d="M2099 6066 c-360 -52 -679 -212 -929 -466 -423 -429 -566 -1046 -376 -1615 47 -140 104 -256 188 -381 62 -93 172 -206 1314 -1343 l1247 -1241 516 509 c284 280 852 846 1262 1258 794 797 793 795 890 993 439 885 -19 1938 -969 2230 -171 52 -259 64 -462 64 -151 0 -205 -4 -296 -22 -225 -45 -416 -124 -599 -247 -100 -68 -182 -146 -915 -874 l-805 -800 250 0 250 -1 690 683 c750 741 732 725 936 814 357 154 811 121 1138 -85 317 -199 517 -494 576 -852 25 -147 17 -368 -19 -503 -29 -111 -74 -221 -137 -335 -39 -70 -109 -143 -749 -785 -388 -390 -897 -897 -1131 -1128 l-426 -419 -1107 1102 c-616 612 -1126 1128 -1150 1162 -247 348 -286 836 -99 1234 115 243 323 454 571 577 387 191 853 168 1217 -60 l83 -52 126 126 125 126 -42 30 c-199 143 -418 239 -653 285 -140 28 -380 35 -515 16z" />
              <path d="M3904 4889 l-121 -121 321 -319 321 -318 250 -1 250 0 -440 440 c-242 242 -444 440 -450 440 -6 0 -65 -54 -131 -121z" />
              <path d="M3486 4326 c-57 -21 -88 -47 -116 -97 -51 -92 -18 -210 74 -264 92 -54 218 -22 270 68 32 56 40 97 27 145 -32 116 -152 186 -255 148z" />
              <path d="M2660 3330 l0 -470 885 0 885 0 0 470 0 470 -175 0 -175 0 0 -290 0 -290 -535 0 -535 0 0 290 0 290 -175 0 -175 0 0 -470z" />
            </g>
          </svg>
        </span>
        <span className="brand-text">
          <span className="brand-sub">My Feng Shui Home</span>
        </span>
      </Link>

      <nav className="site-nav" aria-label="Primary">
        {/* 1. Life pillars - the primary funnel to the paid Map */}
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

        {/* 2. Space - room-by-room guidance for each of the six rooms */}
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

        {/* 3. Products - the paid shop, direct link */}
        <Link href="/products" className="site-nav-link site-nav-link-feature">
          Products
        </Link>

        {/* 4. Everything About Feng Shui - one mega menu containing
            all four topic categories with their articles. */}
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

        {/* 5. Calculator - direct link */}
        <Link href="/kua-calculator" className="site-nav-link">
          Calculator
        </Link>

        {/* 6. Account / Sign in */}
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
      </nav>
    </header>
  );
}
