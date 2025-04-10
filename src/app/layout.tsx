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
  title: "100MD Tees | Wear it. Own it. Mint it.",
  description: "Customize apparel, mint your designs as NFTs, and earn with 100MD Tees - the future of fashion meets Web3.",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    title: "100MD Tees | Wear it. Own it. Mint it.",
    description: "Design your own apparel, get it shipped, and own it as an NFT. Join the next-gen fashion marketplace on the blockchain.",
    url: URL_BASE,
    siteName: "100MD Tees",
    images: [
      {
        url: `${URL_BASE}/images/auth_images_1.png`,
        width: 800,
        height: 600,
        alt: "100MD Tees Logo",
      },
      {
        url: `${URL_BASE}/images/auth_images_1.png`,
        width: 1800,
        height: 1600,
        alt: "Mint your custom fashion NFT on 100MD Tees",
      },
    ],
    locale: "en_US",
    type: "website",
  },
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
