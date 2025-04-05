import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Lidhium JS - A modern JavaScript framework for micro-frontend development. Discover our mission, vision, and the team behind the project.",
  openGraph: {
    title: "About Lidhium JS",
    description:
      "Learn about our mission, vision, and the team behind the Lidhium JS framework",
  },
};

export default function About() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header>
        <h1 className="text-3xl font-bold">About Lidhium JS</h1>
        <p className="mt-4 text-lg">
          Learn more about our JavaScript framework and its purpose in modern
          web development.
        </p>
      </header>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Lidhium JS was created to simplify micro-frontend development, making
          it accessible to developers of all skill levels while maintaining high
          performance and type safety.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">The Team</h2>
        <p className="text-gray-600 dark:text-gray-300">
          We are a dedicated team of developers passionate about creating tools
          that make web development more efficient and enjoyable.
        </p>
      </section>
    </article>
  );
}
