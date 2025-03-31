import "./globals.css"; // Ensure Tailwind styles are applied

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LidhiumJS",
  description: "Documentation for our JavaScript Library",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <ThemeProvider>
          <Navbar />
          <main className="pt-[72px]">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
