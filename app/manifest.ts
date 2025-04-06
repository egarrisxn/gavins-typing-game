import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "XO Typing",
    short_name: "XO",
    description: "Typing Game.",
    id: "/",
    start_url: "/",
    theme_color: "#000000",
    background_color: "#000000",
    orientation: "any",
    display: "standalone",
    icons: [
      {
        src: "/icons/icons-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icons-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    // screenshots: [
    //   {
    //     src: "/screenshots/desktop.png",
    //     sizes: "1920x1080",
    //     type: "image/png",
    //     form_factor: "wide",
    //   },
    //   {
    //     src: "/screenshots/mobile.png",
    //     sizes: "750x1334",
    //     type: "image/png",
    //   },
    // ],
  };
}
