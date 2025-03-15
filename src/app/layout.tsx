import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL("https://candlemc.net"),
  title: "CandleMC - Fast. Lightweight. Flexible.",
  description: "High-performance, flexible Minecraft server software focused on user experience.",
  keywords: ["minecraft", "server", "minecraft server", "performance", "candlemc", "java", "candle"],
  authors: [{ name: "CandleMC Team" }],
  openGraph: {
    title: "CandleMC - Fast. Lightweight. Flexible.",
    description: "High-performance, flexible Minecraft server software focused on user experience.",
    url: "https://candlemc.net",
    siteName: "CandleMC",
    images: [
      {
        url: "/logo512.png",
        width: 512,
        height: 512,
        alt: "CandleMC Logo"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CandleMC - Fast. Lightweight. Flexible.",
    description: "High-performance, flexible Minecraft server software focused on user experience.",
    images: ["/logo512.png"],
  },
  icons: {
    icon: [
      {
        url: "/logo128.png",
        sizes: "128x128",
        type: "image/png"
      },
      {
        url: "/logo512.png", 
        sizes: "512x512",
        type: "image/png"
      }
    ],
    shortcut: "/logo128.png",
    apple: "/logo128.png",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
