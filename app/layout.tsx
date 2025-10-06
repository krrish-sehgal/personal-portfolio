import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://krrishsehgal.vercel.app"),
  title: {
    default: "Krrish Sehgal - Bitcoin & Blockchain Developer",
    template: "%s | Krrish Sehgal",
  },
  description:
    "Bitcoin & Blockchain Developer | GSoC & Summer of Bitcoin Contributor | Building secure blockchain solutions, Bitcoin applications, and AI-driven systems. Open to Bitcoin development roles.",
  keywords: [
    "Bitcoin Developer",
    "Blockchain Developer",
    "Bitcoin Jobs",
    "Summer of Bitcoin",
    "Google Summer of Code",
    "PSBT Signing",
    "Cryptography",
    "Krrish Sehgal",
    "Bitcoin Engineer",
    "Lightning Network",
    "Cryptocurrency Developer",
    "Open Source Contributor",
    "Blockchain Engineer",
    "Bitcoin Programming",
    "Software Engineer",
  ],
  authors: [{ name: "Krrish Sehgal", url: "https://github.com/krrish-sehgal" }],
  creator: "Krrish Sehgal",
  publisher: "Krrish Sehgal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://krrishsehgal.vercel.app",
    title: "Krrish Sehgal - Bitcoin & Blockchain Developer",
    description:
      "Bitcoin & Blockchain Developer seeking opportunities in Bitcoin development. GSoC & Summer of Bitcoin contributor with expertise in blockchain, cryptography, and secure applications.",
    siteName: "Krrish Sehgal Portfolio",
    images: [
      {
        url: "/images/krrishSehgal_tech.png",
        width: 1200,
        height: 630,
        alt: "Krrish Sehgal - Bitcoin Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Krrish Sehgal - Bitcoin & Blockchain Developer",
    description:
      "Bitcoin Developer | GSoC & Summer of Bitcoin Contributor | Open to Bitcoin development opportunities",
    creator: "@KrrishSehgal",
    images: ["/images/krrishSehgal_tech.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  );
}
