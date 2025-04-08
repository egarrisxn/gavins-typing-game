import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tiny.Type.Test",
    short_name: "3T",
    description: "An easy-to-use typing game.",
    id: "/",
    start_url: "/",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    orientation: "any",
    display: "standalone",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-192.png",
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
