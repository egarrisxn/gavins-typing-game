import { siteUrl } from "@/utils/config";
import { SitemapEntry } from "@/types";

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
