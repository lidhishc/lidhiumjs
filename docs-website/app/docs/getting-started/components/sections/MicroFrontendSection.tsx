"use client";

import CodeBlock from "../CodeBlock";

export default function MicroFrontendSection() {
  const handleSectionChange = (sectionId: string) => {
    // Find the section element and trigger click on the corresponding drawer button
    const drawerButton = document.querySelector(
      `button[data-section-id="${sectionId}"]`
    );
    if (drawerButton instanceof HTMLElement) {
      drawerButton.click();
    }
  };

  return (
    <section id="generate-micro-frontend" className="h-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Create new micro-app</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Create independent micro-frontend applications that can be federated
          together
        </p>
      </div>

      <div className="space-y-8">
        {/* Basic Command */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Basic Command</h3>
          <p className="mb-4">
            To generate a new micro-frontend application, use the generate
            command:
          </p>
          <CodeBlock code={`lidhium generate <app-name> <port>`} />

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">Parameters:</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                    app-name
                  </code>
                  : Name of your micro-frontend application
                </li>
                <li>
                  <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                    port
                  </code>
                  : Development server port number
                </li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">Example:</h4>
              <CodeBlock code={`lidhium generate shell 3000`} />
            </div>
          </div>
        </div>

        {/* Application Types */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Application Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                Host Application
              </h4>
              <p className="text-sm">
                The first application you generate becomes the host (shell)
                application. It:
              </p>
              <ul className="mt-2 space-y-1 text-sm list-disc pl-4">
                <li>Serves as the main container</li>
                <li>Manages routing between micro-frontends</li>
                <li>Handles shared dependencies</li>
                <li>Coordinates communication</li>
              </ul>
            </div>
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
                Remote Applications
              </h4>
              <p className="text-sm">
                Subsequent applications become remote applications. They:
              </p>
              <ul className="mt-2 space-y-1 text-sm list-disc pl-4">
                <li>Run independently</li>
                <li>Expose components to the host</li>
                <li>Can share functionality</li>
                <li>Maintain their own state</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Configuration Example */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">
            Configuration Structure
          </h3>
          <p className="mb-4">
            After generating applications, your lidhium.config.json will look
            like this:
          </p>
          <CodeBlock
            code={`{
  "project": "my-app",
  "webapp": "vue3",
  "bundler": "webpack",
  "apps": {
   "shell": {
      "port": "3000",
      "appType": "host",
      "remotes": [],
      "exposedComponents": {},
      "url": "http://localhost:3000"
    }
  }
}`}
          />
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-semibold mb-2">Configuration Breakdown:</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                  project
                </code>
                : Name of your project
              </li>
              <li>
                <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                  webapp
                </code>
                : Framework being used (vue3)
              </li>
              <li>
                <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                  bundler
                </code>
                : Module bundler for the project (webpack)
              </li>
              <li>
                <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                  apps.{"<app-name>"}
                </code>
                : Configuration for the application
                <ul className="mt-2 pl-4 space-y-2">
                  <li>
                    <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                      port
                    </code>
                    : Development server port (3000)
                  </li>
                  <li>
                    <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                      appType
                    </code>
                    : Type of the application (&quot;host&quot; or
                    &quot;remote&quot;)
                  </li>
                  <li>
                    <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                      remotes
                    </code>
                    : List of remote applications connected to this app
                  </li>
                  <li>
                    <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                      exposedComponents
                    </code>
                    : Components shared by this application
                  </li>
                  <li>
                    <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                      url
                    </code>
                    : Development server URL
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">
            Important Considerations
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                Directory Structure
              </h4>
              <p className="text-sm">
                Run the generate command from your project&apos;s root
                directory. The new application will be created in the{" "}
                <code className="bg-yellow-100 dark:bg-yellow-800 px-2 py-1 rounded">
                  apps/
                </code>{" "}
                directory.
              </p>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Port Numbers
              </h4>
              <p className="text-sm">
                Each micro-frontend must use a unique port number to avoid
                conflicts during development. Common port ranges:
              </p>
              <ul className="mt-2 space-y-1 text-sm list-disc pl-4">
                <li>Host application: 3000</li>
                <li>First remote: 3001</li>
                <li>Second remote: 3002</li>
                <li>And so on...</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                Generated Features
              </h4>
              <p className="text-sm">Each generated application includes:</p>
              <ul className="mt-2 space-y-1 text-sm list-disc pl-4">
                <li>Vue 3 setup with TypeScript</li>
                <li>Module Federation configuration</li>
                <li>Development server setup</li>
                <li>Build configuration</li>
                <li>Component examples</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="p-6 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
          <div className="space-y-4">
            <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <h4 className="font-semibold mb-2">1. Navigate to App Folder</h4>
              <CodeBlock code="cd apps/my-app" />
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                Change to your application directory to manage its components
              </p>
            </div>

            <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <h4 className="font-semibold mb-2">2. Expose Components</h4>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                Learn how to{" "}
                <button
                  onClick={() => handleSectionChange("expose-the-remote-app")}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  expose your components
                </button>{" "}
                for other applications to use
              </p>
            </div>

            <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <h4 className="font-semibold mb-2">3. Bind Other Apps</h4>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                Learn how to{" "}
                <button
                  onClick={() => handleSectionChange("bind-the-host-app")}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  bind your applications
                </button>{" "}
                to enable component sharing
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
