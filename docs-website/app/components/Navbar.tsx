"use client";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className={`p-4 border-b ${
        theme === "dark"
          ? "bg-[#09222c] text-white border-gray-700"
          : "bg-white text-black border-gray-300"
      }`}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image src="/lidhium-logo.png" alt="Logo" width={120} height={40} priority className="invert-0 dark:invert filter-blue-500"/>
        </Link>

        <div className="flex space-x-4 items-center">
          <Link href="/docs/getting-started" className="hover:opacity-80">
            Getting Started
          </Link>
          <Link href="/docs/api-reference" className="hover:opacity-80">
            Documentation
          </Link>
          <Link href="/docs/examples" className="hover:opacity-80">
            Examples
          </Link>
          <Link href="/docs/about" className="hover:opacity-80">
            About
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`px-3 py-2 border rounded-lg transition ${
              theme === "dark"
                ? "bg-gray-800 text-white border-gray-600"
                : "bg-gray-200 text-black border-gray-400"
            }`}
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
}
