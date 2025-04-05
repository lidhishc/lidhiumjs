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
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">About Lidhium JS</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Learn more about our JavaScript framework and its purpose in modern
          web development.
        </p>
      </header>

      <div className="space-y-12">
        {/* Mission Section */}
        <section className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-8 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Lidhium JS was created to simplify micro-frontend development,
            making it accessible to developers of all skill levels while
            maintaining high performance and type safety.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <div>
                <strong>Simplify Development</strong>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Streamline the process of building and managing micro-frontend
                  applications
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <div>
                <strong>Ensure Type Safety</strong>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Built with TypeScript for robust type checking and better
                  developer experience
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <div>
                <strong>Optimize Performance</strong>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Focus on delivering high-performance solutions with efficient
                  module federation
                </p>
              </div>
            </li>
          </ul>
        </section>

        {/* Core Values Section */}
        <section className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-8 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <h3 className="font-semibold mb-2">Innovation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Continuously evolving and improving our framework to meet modern
                development needs
              </p>
            </div>
            <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <h3 className="font-semibold mb-2">Reliability</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Building stable and dependable tools that developers can trust
              </p>
            </div>
            <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <h3 className="font-semibold mb-2">Community</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Fostering an inclusive and supportive developer community
              </p>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-8 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Core Technologies</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">
                    ▹
                  </span>
                  Vue 3 with Composition API
                </li>
                <li className="flex items-center">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">
                    ▹
                  </span>
                  TypeScript for type safety
                </li>
                <li className="flex items-center">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">
                    ▹
                  </span>
                  Webpack Module Federation
                </li>
                <li className="flex items-center">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">
                    ▹
                  </span>
                  Tailwind CSS for styling
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Development Tools</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">
                    ▹
                  </span>
                  ESLint & Prettier
                </li>
                <li className="flex items-center">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">
                    ▹
                  </span>
                  Jest for testing
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Get Started Section */}
        <section className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 p-8 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Ready to build your next micro-frontend application? Get started
            with Lidhium JS today.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <a
              href="/docs/getting-started"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              Documentation
            </a>
            <a
              href="/docs/examples"
              className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
            >
              View Examples
            </a>
          </div>
        </section>
      </div>
    </article>
  );
}
