import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster as SonnerToaster } from "sonner";
import { siteConfig } from "@/utils/config";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.title,
  referrer: "origin-when-cross-origin",
  creator: siteConfig.links.website,
  keywords: [
    "typescript",
    "javascript",
    "nextjs",
    "next15",
    "react",
    "react19",
    "tailwindCSS",
    "tailwindv4",
    "shadcnui",
    "eslint",
    "vercel",
  ],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.title,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.socialHandle,
    site: siteConfig.socialHandle,
  },
  appleWebApp: {
    capable: true,
    title: siteConfig.title,
    startupImage: siteConfig.ogImage,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020618" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            <Navbar />
            {children}
            <SonnerToaster richColors closeButton position="bottom-right" />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
