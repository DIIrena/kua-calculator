import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";
import { SPACES } from "@/lib/spaces";

// Shared primary-nav item list. Used by both the desktop nav surface
// and the mobile <details> hamburger surface in SiteHeader so the two
// surfaces never drift out of sync.
//
// Server Component only. No client JS, no analytics import.
//
// Surface prop:
//   "desktop": 6 items (Calculator / Guide / Rooms / Products / About /
//              Account or Sign in). No "Start here" because the brand
//              mark on the left already links home.
//   "mobile":  7 items (Start here / Find my Kua number / Ultimate
//              Guide / Rooms / Products / About / Account or Sign in
//              + Sign out). Friendlier labels for the same destinations.
//
// Items NOT in the primary nav (intentionally moved to the footer or
// kept reachable via the Guide and internal links):
//   - Life areas (/life)        -> footer
//   - Articles index (/articles)-> footer + linked from /guide internals
//   - "Everything About Feng Shui" mega menu was removed; it duplicated
//     /guide and was the biggest cause of the crowded primary nav.

export type NavSurface = "desktop" | "mobile";

export default function NavItems({
  signedIn,
  surface,
}: {
  signedIn: boolean;
  surface: NavSurface;
}) {
  const calculatorLabel =
    surface === "mobile" ? "Find my Kua number" : "Calculator";
  const guideLabel = surface === "mobile" ? "Ultimate Guide" : "Guide";

  return (
    <>
      {/* Mobile-only: Start here links back to the homepage. The
          brand mark in SiteHeader already does this on desktop. */}
      {surface === "mobile" ? (
        <Link href="/" className="site-nav-link">
          Start here
        </Link>
      ) : null}

      {/* 1. Calculator (free tool) - primary feature */}
      <Link
        href="/kua-calculator"
        className="site-nav-link site-nav-link-feature"
      >
        {calculatorLabel}
      </Link>

      {/* 2. Guide (Ultimate Feng Shui Guide hub) - primary feature */}
      <Link href="/guide" className="site-nav-link site-nav-link-feature">
        {guideLabel}
      </Link>

      {/* 3. Rooms dropdown - the 6 rooms + a See all rooms link */}
      <details className="nav-dropdown">
        <summary className="nav-dropdown-summary nav-dropdown-summary-feature">
          Rooms
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

      {/* 4. Products - the paid shop */}
      <Link href="/products" className="site-nav-link site-nav-link-feature">
        Products
      </Link>

      {/* 5. About - the architect-as-author trust page */}
      <Link href="/about" className="site-nav-link site-nav-link-quiet">
        About
      </Link>

      {/* 6. Account or Sign in - visually quieter than the public actions
            above. SignOutButton renders next to Account when signed-in. */}
      {signedIn ? (
        <>
          <Link
            href="/account"
            className="site-nav-link site-nav-link-quiet"
          >
            Account
          </Link>
          <SignOutButton />
        </>
      ) : (
        <Link
          href="/sign-in"
          className="site-nav-link site-nav-link-quiet"
        >
          Sign in
        </Link>
      )}
    </>
  );
}
