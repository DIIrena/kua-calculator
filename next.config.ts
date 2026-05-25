import type { NextConfig } from "next";

// Clickjacking protection everywhere except /embed, which is meant to be
// iframed by arbitrary parent sites. The account and auth pages must never
// be frameable.
const nextConfig: NextConfig = {
  // @resvg/resvg-js ships a native binding (.node) that Turbopack cannot
  // bundle into a serverless function. Marking it as a server external
  // tells Next to load it from node_modules at runtime instead.
  serverExternalPackages: ["@resvg/resvg-js"],

  // The chart-image route reads three woff files at runtime to feed
  // them into Resvg (Vercel's serverless Linux has no system fonts;
  // without these the PNG would render shapes but no text). Files
  // accessed via fs.readFile / fs.readFileSync are not auto-included
  // in the function bundle by Turbopack, so we list them explicitly.
  outputFileTracingIncludes: {
    "/api/chart-image/[id]": [
      "./node_modules/@fontsource/hanken-grotesk/files/hanken-grotesk-latin-400-normal.woff",
      "./node_modules/@fontsource/hanken-grotesk/files/hanken-grotesk-latin-700-normal.woff",
      "./node_modules/@fontsource/hanken-grotesk/files/hanken-grotesk-latin-800-normal.woff",
    ],
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
