import "./globals.css"; // Ensure Tailwind styles are applied

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Lidhium JS - Modern JavaScript Framework",
    template: "%s | Lidhium JS",
  },
  description:
    "Lidhium JS is a powerful CLI tool for micro-frontend development, built with Vue 3, Webpack, and Tailwind CSS. Get started with our comprehensive documentation and examples.",
  keywords: [
    "JavaScript framework",
    "micro-frontend",
    "Vue 3",
    "Webpack",
    "Tailwind CSS",
    "CLI tool",
    "TypeScript",
    "monorepo",
  ],
  authors: [{ name: "Lidhish C" }],
  creator: "Lidhish C",
  publisher: "Lidhium JS",
  openGraph: {
    title: "Lidhium JS - Modern JavaScript Framework",
    description: "A powerful CLI tool for micro-frontend development",
    type: "website",
    url: "https://lidhiumjs.com",
    siteName: "Lidhium JS",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lidhium JS Framework",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lidhium JS",
    description: "Modern JavaScript Framework for Micro-Frontend Development",
    images: ["/twitter-image.png"],
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
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  verification: {
    google: "your-google-site-verification",
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
        <link rel="canonical" href="https://lidhiumjs.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${inter.className} bg-gray-100`}>
        <ThemeProvider>
          <Navbar />
          <main className="pt-[72px]">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
