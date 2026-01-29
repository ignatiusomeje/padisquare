import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://padisquare-theta.vercel.app/"),
  keywords: [
    "Padisquare marketplace",
    "multi-vendor marketplace Nigeria",
    "online marketplace Nigeria",
    "buy and sell products online",
    "online shopping platform Nigeria",
    "create online store Nigeria",
    "marketplace for small businesses",
    "vendor storefront platform",
    "sell products online Nigeria",
    "local online marketplace",
    "Nigerian vendors marketplace",
    "e-commerce platform Nigeria",
  ],
  title: {
    default: "Padisquare",
    template: `%s | shop`,
  },
  openGraph: {
    description:
      "Padisquare is a modern multi-vendor marketplace where businesses create storefronts and sell products online. Shop trusted vendors across Nigeria.",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
