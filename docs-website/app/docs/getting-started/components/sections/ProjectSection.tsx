"use client";

import CodeBlock from "../CodeBlock";

export default function ProjectSection() {
  return (
    <section id="creating-project" className="h-full">
      <h2 className="text-2xl font-bold">Creating a New Project</h2>
      <p className="mt-2">
        You can create a new Lidhium.js project using the following command:
      </p>
      <CodeBlock code={`lidhium init <project-name>`} />

      <h5 className="mt-2">Example:</h5>
      <CodeBlock code={`lidhium init my-app`} />

      <p className="mt-2">
        This will generate a new project in the current folder, with all
        necessary dependencies and configurations pre-configured.
      </p>
    </section>
  );
}
