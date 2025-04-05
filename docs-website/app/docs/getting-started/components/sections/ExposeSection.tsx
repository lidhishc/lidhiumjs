"use client";

import CodeBlock from "../CodeBlock";

export default function ExposeSection() {
  return (
    <section id="expose-the-remote-app" className="h-full">
      <h2 className="text-2xl font-bold">Expose the components</h2>
      <p className="mt-2">
        Exposing components helps to make them available for other applications.
      </p>

      <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg w-3/5 mt-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <span className="font-bold">Note:</span> Make sure to run this command
          from the application folder.
        </p>
      </div>

      <CodeBlock code={`lidhium expose <component-path>`} />
      <p className="mt-2">
        The command will expose the component to the other applications.
      </p>

      <h5 className="mt-10">Example:</h5>

      <p className="mt-2">Step 1: Go to the application folder</p>
      <CodeBlock code={`cd my-app`} />

      <p className="mt-2">Step 2: Expose the component</p>
      <CodeBlock code={`lidhium expose ./src/components/HelloWorld.vue`} />
      <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg w-3/5 mt-4">
        <p className="text-sm text-red-800 dark:text-red-200">
          <span className="font-bold">Note:</span> Make sure that the exposed
          components has unique names.
        </p>
      </div>
    </section>
  );
}
