import type { SiteConfig } from "@/types";

export const siteUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : (process?.env?.NEXT_PUBLIC_SITE_URL ??
      process?.env?.NEXT_PUBLIC_VERCEL_URL ??
      "https://gavins-typing-game.vercel.app");

export const siteConfig: SiteConfig = {
  title: "GTG | Gavin's Typing Game",
  description: "Thus Spoke Rohan Kishibe Edition",
  url: siteUrl,
  ogImage: `${siteUrl}/opengraph-image.png`,
  twitterImage: `${siteUrl}/twitter-image.png`,
  socialHandle: "@eg__xo",
  links: {
    x: "https://x.com/eg__xo",
    github: "https://github.com/egarrisxn",
    website: "https://egxo.dev",
    linkedin: "https://linkedin.com/in/ethan-gx",
  },
};
