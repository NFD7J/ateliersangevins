import type { MetadataRoute } from "next";

// Keep the team/admin area out of search engine indexes. This complements the
// per-page `robots: { index: false }` metadata already set on those routes.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/espace-equipe",
    },
  };
}
