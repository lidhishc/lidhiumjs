"use client";

import CodeBlock from "../CodeBlock";

export default function InstallationSection() {
  return (
    <section id="installation" className="h-full">
      <h1 className="text-3xl font-bold mb-6">
        Getting Started with Lidhium.js
      </h1>
      <p className="text-lg mb-4">
        Lidhium.js is a powerful CLI tool designed to simplify the process of
        creating and managing micro-frontend applications with Webpack.
      </p>
      <p className="text-lg mb-4">
        Built-in support for:
        <br />• Vue 3
        <br />• Webpack
        <br />• Tailwind CSS
      </p>
      <p>
        it enables developers to quickly build scalable and modular frontend
        applications.
      </p>
      <h2 className="text-2xl font-bold mt-3">Installation</h2>
      <p className="mt-2">
        To start using Lidhium.js, you need to install it globally using npm or
        yarn. This will make the CLI commands available throughout your system.
      </p>
      <CodeBlock
        code={`npm install -g lidhium\n# OR\nyarn global add lidhium`}
      />
    </section>
  );
}
