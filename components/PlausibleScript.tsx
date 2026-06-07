"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

// Plausible Analytics loader. Mounted once in the (site) layout. Three
// hard constraints:
//
//   1. No-op when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is not set. Local dev and
//      previews stay tracker-free unless explicitly opted in.
//   2. The script only loads on marketing surfaces. It is excluded from
//      the calculator core, the embed widget, and every account /
//      auth / privacy route. The calculator can be embedded by other
//      sites and must stay free of third-party JS; the account, sign-in,
//      and privacy routes are private surfaces and should not surface
//      visitor behaviour to Plausible either.
//   3. Cookie-free script. No consent banner needed.

const EXCLUDED_PREFIXES = [
  "/kua-calculator",
  "/embed",
  "/account",
  "/sign-in",
  "/privacy",
];

export default function PlausibleScript() {
  const pathname = usePathname() ?? "/";
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  if (!domain) return null;
  if (EXCLUDED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return null;
  }

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
