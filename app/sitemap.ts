import type { MetadataRoute } from "next";

/* Single-page site: one URL, max priority. Matches metadataBase in
   app/layout.tsx — keep the two in sync if the domain changes. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://wecareforparents.in",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
