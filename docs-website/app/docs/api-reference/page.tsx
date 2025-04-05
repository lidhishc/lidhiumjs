import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Reference",
  description:
    "Comprehensive API documentation for Lidhium JS. Explore all available functions, methods, and configuration options for building micro-frontend applications.",
  openGraph: {
    title: "Lidhium JS API Reference",
    description:
      "Complete API documentation and reference guide for Lidhium JS framework",
  },
};

export default function APIReference() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header>
        <h1 className="text-3xl font-bold">API Reference</h1>
        <p className="mt-4 text-lg">
          Explore the functions and methods available in Lidhium JS for building
          micro-frontend applications.
        </p>
      </header>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Core Functions</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Documentation coming soon...
        </p>
      </section>
    </article>
  );
}
