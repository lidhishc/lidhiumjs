"use client";

import CodeBlock from "../CodeBlock";

export default function BindSection() {
  return (
    <section id="bind-micro-app" className="h-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Bind Applications</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Connect your micro-frontend applications through an interactive
          selection process. Both host and remote applications can be connected
          to other remote applications.
        </p>
      </div>

      <div className="space-y-8">
        {/* Binding Scenarios */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Binding Scenarios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">Host App Binding</h4>
              <p className="text-sm mb-3">
                Connect remote apps to your host application:
              </p>
              <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm">
                <div className="font-semibold mb-1">shell (host)</div>
                <div className="pl-4 text-gray-600 dark:text-gray-400">
                  ↳ remote-app-1
                </div>
                <div className="pl-4 text-gray-600 dark:text-gray-400">
                  ↳ remote-app-2
                </div>
              </div>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">Remote App Binding</h4>
              <p className="text-sm mb-3">
                Connect remote apps to other remote apps:
              </p>
              <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm">
                <div className="font-semibold mb-1">remote-app-1</div>
                <div className="pl-4 text-gray-600 dark:text-gray-400">
                  ↳ remote-app-2
                </div>
                <div className="pl-4 text-gray-600 dark:text-gray-400">
                  ↳ remote-app-3
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Before You Start</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">Requirements</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Minimum 2 applications created</li>
                <li>Source application (host or remote)</li>
                <li>Target remote application(s)</li>
                <li>Remote app with exposed components</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">Important Notes</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Run command from source app directory</li>
                <li>Remote apps should be properly configured</li>
                <li>Each app should have unique ports</li>
                <li>Avoid circular dependencies</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Step by Step Guide */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">
            Interactive Binding Process
          </h3>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="p-4 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-lg mb-3">
                Step 1: Navigate to Source App
              </h4>
              <div className="space-y-2">
                <div>
                  <p className="text-sm mb-1">For app:</p>
                  <CodeBlock code="cd apps/shell" />
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                Navigate to the application directory that will consume
                components from other apps
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-lg mb-3">
                Step 2: Run Bind Command
              </h4>
              <div className="mb-3">
                <CodeBlock code="lidhium bind" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This will launch an interactive interface to select available
                remote applications
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-lg mb-3">
                Step 3: Select Remote Apps
              </h4>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg font-mono text-sm mb-3">
                Select applications to connect:
                <div className="pl-4 mt-2 space-y-1">
                  <div className="text-green-600 dark:text-green-400">
                    → remote-app-1 (port: 3001)
                  </div>
                  <div className="text-green-600 dark:text-green-400">
                    → remote-app-2 (port: 3002)
                  </div>
                  <div className="text-gray-500">
                    {" "}
                    remote-app-3 (port: 3003)
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Use ↑↓ to move, space to select, enter to confirm
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose which remote applications to connect to your current
                application
              </p>
            </div>
          </div>
        </div>

        {/* Example Configuration */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">
            What Happens After Binding
          </h3>
          <div className="space-y-6">
            <div className="p-4 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-lg mb-3">
                Configuration Updates
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                After running{" "}
                <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">
                  lidhium bind
                </code>{" "}
                in the shell app directory and selecting remote-app1, the
                lidhium.config.json file is updated:
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
      "remotes": [
        "remote-app1"
      ],
      "exposedComponents": {},
      "url": "http://localhost:3000"
    },
    "remote-app1": {
      "port": "3001",
      "appType": "remote",
      "remotes": [],
      "exposedComponents": {},
      "url": "http://localhost:3001"
    }
  }
}`}
              />
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h5 className="font-semibold mb-2">What Changed:</h5>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>
                    Added &quot;remote-app1&quot; to shell&apos;s remotes array
                  </li>
                  <li>Created remote-app1 configuration with port 3001</li>
                  <li>Set up the connection between shell and remote-app1</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-semibold mb-2">Configuration Structure</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <strong>Project Level:</strong>
                    <ul className="list-disc pl-5 mt-1">
                      <li>project: Your project name</li>
                      <li>webapp: Framework type (vue3)</li>
                      <li>bundler: Build tool (webpack)</li>
                    </ul>
                  </li>
                  <li>
                    <strong>App Level:</strong>
                    <ul className="list-disc pl-5 mt-1">
                      <li>port: Unique port number</li>
                      <li>appType: &quot;host&quot; or &quot;remote&quot;</li>
                      <li>remotes: Array of connected remote apps</li>
                      <li>exposedComponents: Components to share</li>
                      <li>url: App&apos;s development URL</li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-semibold mb-2">Important Notes</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Each app must have a unique port number</li>
                  <li>Host app can connect to multiple remote apps</li>
                  <li>Remote apps can expose components for sharing</li>
                  <li>URLs must match the port numbers</li>
                  <li>Component paths are relative to the app&apos;s root</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Common Issues</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Wrong Directory:</strong>
              <span className="text-sm ml-2">
                Make sure you&apos;re in the correct source application
                directory
              </span>
            </li>
            <li>
              <strong>Port Conflicts:</strong>
              <span className="text-sm ml-2">
                Ensure each application uses a unique port
              </span>
            </li>
            <li>
              <strong>Missing Components:</strong>
              <span className="text-sm ml-2">
                Verify components are properly exposed in remote apps
              </span>
            </li>
            <li>
              <strong>Connection Issues:</strong>
              <span className="text-sm ml-2">
                Check if all applications are running and accessible
              </span>
            </li>
            <li>
              <strong>Circular Dependencies:</strong>
              <span className="text-sm ml-2">
                Avoid creating circular dependencies between remote apps
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
