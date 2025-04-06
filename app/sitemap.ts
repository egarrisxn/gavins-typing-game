import type { SitemapEntry } from "@/utils/types";
import { siteUrl } from "@/utils/env";

export default async function sitemap(): Promise<SitemapEntry[]> {
  const staticPages: SitemapEntry[] = [
    {
      url: siteUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
  return [...staticPages];
}
