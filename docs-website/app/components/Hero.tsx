import Link from "next/link";

interface HeroProps {
  theme: "light" | "dark";
}

export default function Hero({ theme }: HeroProps) {
  return (
    <div
      className={`text-center py-16 border-b ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <h1 className="text-5xl font-bold">Lidhium JS</h1>
      <p className={`mt-4 text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
        ⚡ A powerful CLI tool for micro-frontend development with Webpack
      </p>

      <Link href="docs/getting-started">
        <button
          className="mt-6 px-6 py-3 font-semibold rounded-lg shadow transition
          bg-orange-500 text-white hover:bg-pink-600"
        >
          Get Started →
        </button>
      </Link>
    </div>
  );
}
