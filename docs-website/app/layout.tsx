import type { Metadata } from "next";
import "./globals.css"; // Ensure Tailwind styles are applied
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";

export const metadata: Metadata = {
  title: "LidhiumJS",
  description: "Documentation for our JavaScript Library",
  icons: {
    icon: "/logo.png", 
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
       <ThemeProvider>
        <Navbar />
        <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
