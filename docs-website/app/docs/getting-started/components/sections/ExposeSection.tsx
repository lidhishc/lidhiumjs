"use client";

import CodeBlock from "../CodeBlock";
import Link from "next/link";

export default function ExposeSection() {
  return (
    <section id="expose-the-remote-app" className="h-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Expose Components</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Share components from your remote applications to be used in the host
          application and other remote applications
        </p>
      </div>

      <div className="space-y-8">
        {/* Basic Command */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Basic Command</h3>
          <p className="mb-4">
            Use the expose command to make your components available for
            federation:
          </p>
          <CodeBlock code={`cd remote-app\nlidhium expose <component-path>`} />

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">Parameters:</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                    component-path
                  </code>
                  : Path to the component relative to src/views/
                </li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">Example:</h4>
              <CodeBlock code="lidhium expose views/Hello.vue" />
            </div>
          </div>
        </div>

        {/* Configuration Example */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Configuration Example</h3>
          <p className="mb-4">
            After exposing components, your lidhium.config.json will include
            them in the exposedComponents section:
          </p>
          <CodeBlock
            code={`{
  "remote-app": {
    "port": "3005",
    "appType": "remote",
    "url": "http://localhost:3005",
    "remotes": ["remote-app2", "remote-app3"],
    "exposedComponents": {
      "Hello": {
        "source": "./src/views/Hello.vue",
        "remoteComponentValue": "remote-app/Hello"
      }
    }
  }
}`}
          />
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-semibold mb-2">Configuration Breakdown:</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                  source
                </code>
                : Path to your component file
              </li>
              <li>
                <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                  remoteComponentValue
                </code>
                : Unique identifier used to import the component
              </li>
              <li>
                <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                  remotes
                </code>
                : List of other remote apps that can use this component
              </li>
            </ul>
          </div>
        </div>

        {/* Using Exposed Components */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">
            Using Exposed Components
          </h3>
          <p className="mb-4">
            To use exposed components in other micro-frontends, import them
            using Vue&apos;s <code>defineAsyncComponent</code>:
          </p>
          <CodeBlock
            code={`import { defineAsyncComponent } from 'vue'

// Import the exposed component
const HelloComponent = defineAsyncComponent(() => 
  import('remote-app/Hello')
)

export default {
  components: {
    HelloComponent
  }
}`}
          />
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-semibold mb-2">Key Points:</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded">
                  defineAsyncComponent
                </code>
                : Loads the component asynchronously for better performance
              </li>
              <li>
                <code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded">
                  remote-app/Hello
                </code>
                : Uses the remoteComponentValue from the configuration
              </li>

              <li>
                <code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded">
                  Binding Required
                </code>
                : Make sure the remote app is properly bind to your application.
                for more information, refer to the{" "}
                <Link
                  href="#bind-the-host-app"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Bind Micro-app
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Important Notes</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <div>
                <strong>Component Names</strong>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Each exposed component must have a unique name within its
                  remote application (e.g., &quot;Hello&quot;,
                  &quot;MyApp&quot;)
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <div>
                <strong>Remote Access</strong>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Components can be accessed by both the host app and other
                  remote apps specified in the remotes array
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <div>
                <strong>Directory Structure</strong>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Components should be placed in the src/views directory for
                  proper exposure
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Best Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                Do&apos;s
              </h4>
              <ul className="space-y-2 text-sm list-disc pl-4">
                <li>Use descriptive component names</li>
                <li>Place components in src/views directory</li>
                <li>Configure proper remote access in lidhium.config.json</li>
                <li>Use unique names within each remote app</li>
              </ul>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">
                Don&apos;ts
              </h4>
              <ul className="space-y-2 text-sm list-disc pl-4">
                <li>Duplicate component names within a remote app</li>
                <li>Place components outside src/views</li>
                <li>Forget to specify required remote access</li>
                <li>Use complex paths in component sources</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Troubleshooting</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Verify the component is in the src/views directory</li>
            <li>Check that the component name is unique in your remote app</li>
            <li>
              Ensure the remote app&apos;s port and URL are correctly configured
            </li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="p-6 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Verify Exposure:</strong>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Check the lidhium.config.json in your project&apos;s root
                directory. The component should be listed under the remote
                app&apos;s exposedComponents section with its source and
                remoteComponentValue.
              </p>
            </li>
            <li>
              <strong>Update Host App:</strong>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Ensure your host application has the remote app listed in its
                remotes array
              </p>
            </li>
            <li>
              <strong>Test Integration:</strong>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Import and use the component using its remoteComponentValue
                (e.g., &quot;remote1/Hello&quot;)
              </p>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
