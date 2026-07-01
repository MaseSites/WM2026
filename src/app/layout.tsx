import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { LiveTicker } from "@/components/layout/LiveTicker";
import { MobileNav } from "@/components/layout/MobileNav";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: "WorldMap 26 — FIFA World Cup 2026 Live",
    template: "%s · WorldMap 26",
  },
  description:
    "Live scores, xG, predictions and the definitive knockout bracket for the FIFA World Cup 2026 across the USA, Canada and Mexico.",
  keywords: ["World Cup 2026", "live scores", "football", "xG", "bracket", "FIFA"],
  authors: [{ name: "WorldMap" }],
  openGraph: {
    title: "WorldMap 26 — FIFA World Cup 2026 Live",
    description: "Live scores, xG and predictions for the World Cup 2026.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1020",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300..800&family=JetBrains+Mono:wght@400..600&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://flagcdn.com" />
      </head>
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <Topbar />
            <LiveTicker />
            <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-6 pb-28 md:px-6 lg:pb-12">
              {children}
            </main>
            <SiteFooter />
          </div>
        </div>
        <MobileNav />
      </body>
    </html>
  );
}
