import "@/styles/globals.css";

import { Metadata, Viewport } from "next";

import { siteConfig } from "../config/site";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Analytics } from "@/components/ui/analytics";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { Toaster as DefaultToaster } from "@/components/ui/toaster";
import { Toaster as NewYorkSonner } from "@/components/ui/sonner";
import { Toaster as NewYorkToaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "DrakeAlia",
      url: "http://www.github.com/DrakeAlia",
    },
  ],
  creator: "drakealia",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@drake___alia",
  },
  icons: {
    icon: [
      {
        url: "/images/logo.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/logo.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    shortcut: "/images/logo.png",
    apple: {
      url: "/images/logo.png",
      type: "image/png",
      rel: "apple-touch-icon",
    },
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.className
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div vaul-drawer-wrapper="">
              <div className="relative flex min-h-screen flex-col bg-background">
                <SiteHeader />
                <main className="flex-1">{children}</main>
                <SiteFooter />
              </div>
            </div>
            <ThemeSwitcher />
            <Analytics />
            <NewYorkToaster />
            <DefaultToaster />
            <NewYorkSonner />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
