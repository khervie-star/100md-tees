"use client";

import type { Metadata } from "next";
import { Inter, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider, UserProvider } from "@/context";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

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

const jk_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jk_sans",
});

const queryClient = new QueryClient();

const URL_BASE = "https://devworks-solutions.vercel.app/";

// export const metadata: Metadata = {
//   metadataBase: new URL(URL_BASE),
//   alternates: {
//     canonical: "/",
//     languages: {
//       "en-US": "/en-US",
//     },
//   },
//   openGraph: {
//     title: "100MD Tees",
//     description: "Software Development | Networking | IT Solutions",
//     url: URL_BASE,
//     siteName: "100MD Tees",
//     images: [
//       {
//         url: `${URL_BASE}/logos/logo_trs/4.png`, // Must be an absolute URL
//         width: 800,
//         height: 600,
//       },
//       {
//         url: `${URL_BASE}/logos/logo_trs/4.png`, // Must be an absolute URL
//         width: 1800,
//         height: 1600,
//         alt: "100MD Tees",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
//   title: "100MD Tees",
//   description: "Software Development | Networking | IT Solutions",
// };

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
        className={`${inter.variable} ${outfit.variable} ${jk_sans.variable}`}>
        <QueryClientProvider client={queryClient}>
          <CookiesProvider>
            <AuthProvider>
              <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                  // Define default options
                  className: "",
                  duration: 5000,

                  // Default options for specific types
                  success: {
                    className:
                      "border-[3px] border-green border-solid bg-[#fafafa]",
                  },
                }}
              />
              <UserProvider>{children}</UserProvider>
            </AuthProvider>
          </CookiesProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
