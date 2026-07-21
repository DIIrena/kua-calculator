import type { NextConfig } from "next";

// Clickjacking protection everywhere except /embed, which is meant to be
// iframed by arbitrary parent sites. The account and auth pages must never
// be frameable.
const nextConfig: NextConfig = {
  // @resvg/resvg-js ships a native binding (.node) that Turbopack cannot
  // bundle into a serverless function. puppeteer-core and the chromium
  // stub ship binaries / large compressed assets that must also be
  // loaded from node_modules at runtime rather than being inlined.
  serverExternalPackages: [
    "@resvg/resvg-js",
    "puppeteer-core",
    "@sparticuz/chromium-min",
  ],

  // The chart-image route reads three TTF files at runtime to feed
  // them into Resvg (Vercel's serverless Linux has no system fonts;
  // without these the PNG would render shapes but no text). The TTFs
  // are committed into lib/fonts/ so Next file tracing definitely
  // bundles them, but the explicit include here is belt-and-braces.
  // The PDF render route uses the same fonts via @font-face in the
  // template; chromium-min fetches the chromium binary from a remote
  // pack on cold start (see lib/pdf/render.ts), so no chromium binary
  // is bundled here.
  outputFileTracingIncludes: {
    "/api/chart-image/[id]": ["./lib/fonts/*.ttf"],
    "/api/og/[slug]": ["./lib/fonts/*.ttf"],
    "/api/compass/[id]/render": [
      "./lib/fonts/*.ttf",
      "./content/blocks/*.md",
      "./content/photos/*.jpg",
    ],
    "/api/dev/sample-compass": [
      "./lib/fonts/*.ttf",
      "./content/blocks/*.md",
      "./content/photos/*.jpg",
    ],
    // The post-checkout fulfilment server actions (fulfillCompass for the
    // Compass + Extended Kua Report, fulfillMoveIn for the Move-In Report)
    // run on this route and read content/blocks + the day-calendar JSON at
    // runtime. Bundle them so personalised delivery works on Vercel.
    "/products/[slug]/success": [
      "./lib/fonts/*.ttf",
      "./content/blocks/*.md",
      "./content/photos/*.jpg",
      "./lib/day-calendar-*.json",
    ],
  },
  async redirects() {
    return [
      // Legacy sales page route. The product is now the Personal
      // Feng Shui Compass at /products/personal-feng-shui-compass.
      // 301 so search engines transfer link equity.
      {
        source: "/home-harmony-map",
        destination: "/products/personal-feng-shui-compass",
        permanent: true,
      },
      // The refund policy now lives inside the consolidated legal page.
      // The old URL is referenced by the Stripe support settings and may
      // be indexed; 301 keeps every existing pointer working.
      {
        source: "/refunds",
        destination: "/legal",
        permanent: true,
      },
      // The $9 Good Days Calendar product is retired; its dates are now
      // the free /good-days page (shop-redesign task A2).
      {
        source: "/products/good-days-calendar-2026",
        destination: "/good-days",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // The embeddable widget: framing by any origin is the point.
        source: "/embed",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors *",
          },
        ],
      },
      {
        // Every other route: only this origin may frame it.
        source: "/:path((?!embed).*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self'",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
