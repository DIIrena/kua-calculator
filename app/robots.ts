import type { MetadataRoute } from "next";

// Replaces the Flask /robots.txt route. AI crawlers are explicitly allowed,
// matching the original policy. /embed is noindex via its own metadata.
// The sitemap reference points crawlers at /articles and /products quickly.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: "https://myfengshuihome.com/sitemap.xml",
  };
}
