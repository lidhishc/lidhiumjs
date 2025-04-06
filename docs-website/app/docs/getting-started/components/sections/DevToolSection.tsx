"use client";

import CodeBlock from "../CodeBlock";

export default function DevToolSection() {
  return (
    <section id="dev-tool" className="h-full">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Development Tool</h1>
        <div className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          Enhance your micro-frontend development experience with built-in tools
        </div>
      </div>

      <div className="space-y-8">
        {/* Running Dev Tool */}
        <div
          id="running-dev-tool"
          className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl"
        >
          <h3 className="text-xl font-semibold mb-4">Running the Dev Tool</h3>
          <p className="mb-4">
            Launch the development tool using either yarn or npm:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">Using Yarn</h4>
              <CodeBlock code="yarn dev-tool" />
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">Using NPM</h4>
              <CodeBlock code="npm run dev-tool" />
            </div>
          </div>
          <p className="text-sm mt-4 text-gray-600 dark:text-gray-300">
            💡 Run this command from your project root directory to visualize
            your micro-frontend architecture
          </p>
        </div>

        {/* Visualization Tool */}
        <div
          id="visualization-tool"
          className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl"
        >
          <h3 className="text-xl font-semibold mb-4">
            Architecture Visualization
          </h3>
          <p className="mb-4">
            Lidhium.js includes a powerful visualization tool that helps you
            understand and manage your micro-frontend architecture:
          </p>
          <div className="space-y-6">
            <div
              id="node-types"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold mb-2">Node Types</h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <div>
                      <strong>Host App</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Main container application
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-800 mr-2"></div>
                    <div>
                      <strong>Remote App</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Micro-frontend application
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                    <div>
                      <strong>Component</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Exposed component from an app
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                    <div>
                      <strong>Inactive App</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Application not currently running
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-semibold mb-2">Connection Types</h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-4 h-0.5 bg-green-500 mr-2"></div>
                    <div>
                      <strong>Host-Remote</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Host app importing remote app
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="w-4 h-0.5 bg-gray-700 mr-2"></div>
                    <div>
                      <strong>Remote-Remote</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Remote app depending on another remote
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="w-4 h-0.5 bg-gray-400 mr-2"></div>
                    <div>
                      <strong>Component</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Component exposed by an app
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div
              id="features"
              className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"
            >
              <h4 className="font-semibold mb-2">Features</h4>
              <ul className="space-y-2">
                <li>• Interactive graph visualization</li>
                <li>• Drag and drop node rearrangement</li>
                <li>• Port number display for each application</li>
                <li>• Clear visualization of dependencies and connections</li>
                <li>• Real-time architecture overview</li>
                <li>• Detailed information on hover</li>
              </ul>
            </div>

            {/* Hover Information */}
            <div
              id="hover-details"
              className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg"
            >
              <h4 className="font-semibold mb-2">Hover Details</h4>
              <p className="text-sm mb-4">
                Hover over any app node to see detailed information about the
                application:
              </p>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>Name:</strong> Application name
                  </li>
                  <li>
                    <strong>Status:</strong> Active/Inactive state
                  </li>
                  <li>
                    <strong>Type:</strong> host/remote
                  </li>
                  <li>
                    <strong>URL:</strong> Application URL with port
                  </li>
                  <li>
                    <strong>Connected Apps:</strong> Number of connected
                    applications
                  </li>
                  <li>
                    <strong>Exposed Components:</strong> Number of components
                    exposed
                  </li>
                </ul>
              </div>
              <p className="text-sm mt-4 text-gray-600 dark:text-gray-300">
                💡 Tip: Use this information to quickly check the status and
                connections of your applications
              </p>
            </div>

            <div
              id="example-structure"
              className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
            >
              <h4 className="font-semibold mb-2">Example Structure</h4>
              <p className="text-sm mb-4">
                A typical visualization might show:
              </p>

              {/* Example Visualization Image */}
              <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="max-w-[600px] mx-auto">
                  <img
                    src="/dev-tool-example.png"
                    alt="Development Tool Visualization Example"
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700"
                  />
                  <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                    Sample visualization showing a shell app connected to two
                    remote apps, each with their exposed components
                  </p>
                </div>
              </div>

              <ul className="space-y-2 text-sm">
                <li>• Shell app (Host) running on port 3000</li>
                <li>• Remote apps running on ports 3001 and 3002</li>
                <li>• Exposed components from each remote app</li>
                <li>
                  • Connection lines showing the relationships between apps
                </li>
                <li>
                  • Inactive apps shown in red to indicate they need to be
                  started
                </li>
              </ul>
              <p className="text-sm mt-4 text-gray-600 dark:text-gray-300">
                💡 Tip: You can drag nodes to rearrange the graph and better
                visualize your architecture
              </p>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                ⚠️ If an app appears in red, make sure to start it using the
                appropriate start command
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
