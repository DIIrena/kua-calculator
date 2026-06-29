import Link from "next/link";
import { auth } from "@/auth";
import NavItems from "@/components/NavItems";
import BrandHeart from "@/components/BrandHeart";

// Server Component. Reflects logged-in state.
//
// The header renders TWO separate primary-nav surfaces so the desktop
// nav is never wrapped in a closed <details> element:
//
//   - Desktop: <nav className="site-nav site-nav-desktop"> outside any
//     <details>. Always visible at >880px, hidden at <=880px.
//   - Mobile: <details className="mobile-nav-toggle"> wrapping
//     <nav className="site-nav site-nav-mobile">. Always visible at
//     <=880px, hidden at >880px. Native <details> keeps the toggle
//     JS-free (Server Component) and preserves keyboard + screen
//     reader behaviour via the WAI-ARIA disclosure pattern.
//
// Both surfaces render <NavItems> so the link list cannot drift.

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
          <BrandHeart />
        </span>
        <span className="brand-text">
          <span className="brand-sub">My Feng Shui Home</span>
        </span>
      </Link>

      {/* Desktop nav: always rendered, always visible at >880px. CSS
          hides it at <=880px and reveals the mobile hamburger instead. */}
      <nav className="site-nav site-nav-desktop" aria-label="Primary">
        <NavItems signedIn={signedIn} />
      </nav>

      {/* Mobile nav: hidden by default; revealed at <=880px. Native
          <details> hamburger, JS-free, WAI-ARIA disclosure pattern.
          Compact summary row to avoid eating the first viewport. */}
      <details className="mobile-nav-toggle">
        <summary
          className="mobile-nav-summary"
          aria-label="Open menu"
        >
          <span className="mobile-nav-summary-label">Menu</span>
          <span className="mobile-nav-summary-mark" aria-hidden="true">
            <BrandHeart />
          </span>
          <span className="mobile-nav-summary-icon" aria-hidden="true">
            &#9776;
          </span>
        </summary>
        <nav className="site-nav site-nav-mobile" aria-label="Primary (mobile)">
          <NavItems signedIn={signedIn} />
        </nav>
      </details>
    </header>
  );
}
