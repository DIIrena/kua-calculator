import type { NextConfig } from "next";

// Clickjacking protection everywhere except /embed, which is meant to be
// iframed by arbitrary parent sites. The account and auth pages must never
// be frameable.
const nextConfig: NextConfig = {
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
