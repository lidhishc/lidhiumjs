"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/lidhishc/lidhiumjs")
      .then((response) => response.json())
      .then((data) => setStars(data.stargazers_count))
      .catch((error) => console.error("Error fetching GitHub stars:", error));
  }, []);

  const GitHubButton = () => (
    <Link
      href="https://github.com/lidhishc/lidhiumjs"
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors border ${
        theme === "dark"
          ? "bg-gray-800 hover:bg-gray-700 border-gray-700"
          : "bg-white hover:bg-gray-50 border-gray-200 shadow-sm"
      }`}
    >
      <svg
        className={`w-5 h-5 ${theme === "dark" ? "text-white" : "text-black"}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
        />
      </svg>
      {stars !== null && <span className="text-sm font-medium">{stars}</span>}
    </Link>
  );

  return (
    <nav
      className={`w-full ${
        theme === "dark" ? "bg-black" : "bg-white"
      } fixed top-0 z-50 border-b ${
        theme === "dark" ? "border-gray-800" : "border-gray-200"
      }`}
    >
      <div className="mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center">
              <Image
                src="/logov2.png"
                alt="Easy Fetch Logo"
                width={35}
                height={35}
                priority
                className="invert-0 dark:invert"
              />
              <h1 className="text-xl font-bold ml-2 bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
                Lidhium JS
              </h1>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/docs/getting-started"
              className="text-sm hover:opacity-80"
            >
              Documentation
            </Link>
            <Link href="/docs/examples" className="text-sm hover:opacity-80">
              Examples
            </Link>
            <Link href="/docs/about" className="text-sm hover:opacity-80">
              About
            </Link>

            <GitHubButton />

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors border ${
                theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700 border-gray-700"
                  : "bg-white hover:bg-gray-50 border-gray-200 shadow-sm"
              }`}
              aria-label="Toggle theme"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                {theme === "light" ? "🌙" : "☀️"}
              </div>
            </button>
          </div>

          <div className="flex md:hidden items-center space-x-4">
            <GitHubButton />

            {/* Theme Toggle Button - Mobile */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors border ${
                theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700 border-gray-700"
                  : "bg-white hover:bg-gray-50 border-gray-200 shadow-sm"
              }`}
              aria-label="Toggle theme"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                {theme === "light" ? "🌙" : "☀️"}
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 -mr-2"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-5 h-5 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-64 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="py-2 space-y-1">
            <Link
              href="/docs/getting-started"
              className="block hover:opacity-80 py-2 text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Documentation
            </Link>
            <Link
              href="/docs/examples"
              className="block hover:opacity-80 py-2 text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Examples
            </Link>
            <Link
              href="/docs/about"
              className="block hover:opacity-80 py-2 text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
