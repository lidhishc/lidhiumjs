import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Examples",
  description:
    "Explore real-world examples and use cases of Lidhium JS. Learn how to implement micro-frontend architecture in your projects with practical examples.",
  openGraph: {
    title: "Lidhium JS Examples",
    description:
      "Practical examples and use cases for implementing micro-frontend architecture with Lidhium JS",
  },
};

export default function Examples() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header>
        <h1 className="text-3xl font-bold">Examples</h1>
        <p className="mt-4 text-lg">
          Explore practical examples and use cases of Lidhium JS in action.
        </p>
      </header>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Featured Examples</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Examples coming soon...
        </p>
      </section>
    </article>
  );
}
