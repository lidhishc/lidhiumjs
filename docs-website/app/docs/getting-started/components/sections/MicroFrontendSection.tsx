"use client";

import CodeBlock from "../CodeBlock";

export default function MicroFrontendSection() {
  return (
    <section id="generate-micro-frontend" className="h-full">
      <h2 className="text-2xl font-bold">Generating a Micro-App</h2>
      <p className="mt-5 mb-8">
        To generate a micro-app, run the following command:
      </p>
      <CodeBlock code={`lidhium generate <app-name> <port>`} />

      <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg w-3/5">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <span className="font-bold">Note:</span> run this command from root
          folder of the project.
        </p>
      </div>

      <h5 className="mt-8">Example:</h5>
      <CodeBlock code={`lidhium generate shell 3000`} />

      <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg w-3/5 mt-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <span className="font-bold">Note:</span> Make sure to use different
          name and port numbers for each micro-frontend application to avoid
          conflicts. The port number specified will be used when running the
          application in development mode.
        </p>
      </div>

      <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg w-3/5 mt-4">
        <p className="text-sm text-red-800 dark:text-red-200">
          <span className="font-bold">Note:</span> The first will be always the
          host/shell application. The others will be the remote applications.
        </p>
      </div>

      <p className="mt-2">
        This will set up a new micro-frontend application that runs
        independently and can later be federated with other applications.
      </p>
    </section>
  );
}
