import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, Outfit, Plus_Jakarta_Sans } from "next/font/google";


import "./globals.css";
import "@burnt-labs/abstraxion/dist/index.css";
import "@burnt-labs/ui/dist/index.css";
import { ProviderTree } from "@/provider-tree";


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});


const jk_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jk_sans",
});

const URL_BASE = "https://100md-tees.vercel.app/";

export const metadata: Metadata = {
  metadataBase: new URL(URL_BASE),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    title: "100MD Tees",
    description: "Software Development | Networking | IT Solutions",
    url: URL_BASE,
    siteName: "100MD Tees",
    images: [
      {
        url: `${URL_BASE}/logos/logo_trs/4.png`, // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: `${URL_BASE}/logos/logo_trs/4.png`, // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: "100MD Tees",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  title: "100MD Tees",
  description: "Software Development | Networking | IT Solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} ${jk_sans.variable} ${bricolage.variable} font-bricolage`}>
        <ProviderTree>{children}</ProviderTree>
      </body>
    </html>
  );
}
