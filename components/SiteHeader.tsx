import Link from "next/link";
import { auth } from "@/auth";
import NavItems from "@/components/NavItems";

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

      {/* Desktop nav: always rendered, always visible at >880px. CSS
          hides it at <=880px and reveals the mobile hamburger instead. */}
      <nav className="site-nav site-nav-desktop" aria-label="Primary">
        <NavItems signedIn={signedIn} />
      </nav>

      {/* Mobile nav: hidden by default; revealed at <=880px. Native
          <details> hamburger, JS-free, WAI-ARIA disclosure pattern. */}
      <details className="mobile-nav-toggle">
        <summary
          className="mobile-nav-summary"
          aria-label="Open menu"
        >
          <span className="mobile-nav-summary-label">Menu</span>
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
