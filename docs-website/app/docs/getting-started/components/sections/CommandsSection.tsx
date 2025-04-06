"use client";

import CodeBlock from "../CodeBlock";
import { useTheme } from "../../../../context/ThemeContext";

export default function CommandsSection() {
  const { theme } = useTheme();

  return (
    <section id="commands" className="h-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">CLI Commands</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Lidhium.js provides a comprehensive set of CLI commands to manage your
          micro-frontend applications
        </p>
      </div>

      <div className="space-y-8">
        {/* Initialize Command */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Initialize Project</h3>
          <CodeBlock code="lidhium init <project-name>" />
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm mb-2">
              Creates a new Lidhium.js project with:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Vue 3 + TypeScript setup</li>
              <li>Module Federation configuration</li>
              <li>Development environment</li>
              <li>Project structure</li>
            </ul>
          </div>
        </div>

        {/* Generate Command */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Generate Application</h3>
          <CodeBlock code="lidhium generate <app-name> <port>" />
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm mb-2">
              Creates a new micro-frontend application:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>First app becomes the host application</li>
              <li>Subsequent apps become remote applications</li>
              <li>Updates lidhium.config.json automatically</li>
              <li>Sets up necessary dependencies</li>
            </ul>
          </div>
        </div>

        {/* Expose Command */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Expose Components</h3>
          <CodeBlock code="lidhium expose <component-path>" />
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm mb-2">
              Makes components available for federation:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Updates module federation config</li>
              <li>Configures component sharing</li>
              <li>Sets up remote entry points</li>
              <li>Updates lidhium.config.json exposedComponents</li>
            </ul>
          </div>
        </div>

        {/* Bind Command */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Bind Applications</h3>

          <div className="mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Connect your micro-frontend applications in an interactive way.
              The bind command helps you establish connections between your host
              app and remote apps through a user-friendly interface.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">Prerequisites</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>At least 2 applications (1 host + 1 remote)</li>
                <li>All applications properly initialized</li>
                <li>Remote app(s) with exposed components</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">What You&apos;ll Get</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Interactive app selection interface</li>
                <li>Automatic configuration setup</li>
                <li>Immediate connection verification</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-6">
            <h4 className="font-semibold mb-2">Example Scenario</h4>
            <p className="text-sm mb-4">Let&apos;s say you have:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
              <li>
                <strong>shell</strong>: Your host application (port 3000)
              </li>
              <li>
                <strong>remote-app</strong>: A remote application with
                components (port 3001)
              </li>
            </ul>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <div>
                <p className="text-sm font-semibold mb-1">
                  Step 1: Navigate to host app
                </p>
                <CodeBlock code="cd apps/shell" />
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">
                  Step 2: Run bind command
                </p>
                <CodeBlock code="lidhium bind" />
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">
                  Step 3: Select remote app
                </p>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm font-mono">
                  Select apps to connect:
                  <div className="pl-2 text-green-600 dark:text-green-400">
                    ✓ remote-app (port: 3001)
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-semibold mb-2">
              What Happens Behind the Scenes:
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Updates host app&apos;s configuration</li>
              <li>Sets up module federation connections</li>
              <li>Configures webpack for remote loading</li>
              <li>Enables component sharing between apps</li>
            </ul>
          </div>
        </div>

        {/* Start Command */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Development Server</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm mb-2">Start a specific application:</p>
              <CodeBlock code="npm run start <app-name>" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                or
              </p>
              <CodeBlock code="yarn start <app-name>" />
            </div>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm mb-2">Example:</p>
              <CodeBlock code="yarn start shell" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                This will start the shell app on port 3000
              </p>
            </div>
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">Best Practices</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Start remote apps before the shell app</li>
                <li>Keep port numbers sequential (3000, 3001, etc.)</li>
                <li>Use the same package manager (npm or yarn) consistently</li>
                <li>Check the app&apos;s port in lidhium.config.json</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Build Command */}
        <div
          id="build-app"
          className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl"
        >
          <h3 className="text-xl font-semibold mb-4">Production Build</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm mb-2">Build a specific application:</p>
              <CodeBlock code="npm run build <app-name>" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                or
              </p>
              <CodeBlock code="yarn build <app-name>" />
            </div>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm mb-2">Example:</p>
              <CodeBlock code="yarn build shell" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                This will build the shell app for production
              </p>
            </div>
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">Best Practices</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Build remote apps before the shell app</li>
                <li>Check the app&apos;s port in lidhium.config.json</li>
                <li>Use the same package manager (npm or yarn) consistently</li>
                <li>Verify build output in the dist directory</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Help Command */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Get Help</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">General Help</h4>
              <CodeBlock code="lidhium --help" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Command-specific Help</h4>
              <CodeBlock code="lidhium <command> --help" />
            </div>
          </div>
        </div>

        {/* Command Summary */}
        <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Quick Reference</h3>
          <div className="overflow-x-auto">
            <table
              className={`w-full ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <thead
                className={theme === "dark" ? "bg-gray-800" : "bg-gray-100"}
              >
                <tr>
                  <th className="px-4 py-2 text-left">Command</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">init</td>
                  <td className="px-4 py-2">Create new project</td>
                  <td className="px-4 py-2 font-mono text-sm">
                    lidhium init my-app
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">generate</td>
                  <td className="px-4 py-2">Create new micro-frontend</td>
                  <td className="px-4 py-2 font-mono text-sm">
                    lidhium generate shell 3000
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Run from project root
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">expose</td>
                  <td className="px-4 py-2">Share components</td>
                  <td className="px-4 py-2 font-mono text-sm">
                    lidhium expose views/Hello.vue
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Run from app directory
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">bind</td>
                  <td className="px-4 py-2">Connect applications</td>
                  <td className="px-4 py-2 font-mono text-sm">
                    lidhium bind
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Run from app directory
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">start</td>
                  <td className="px-4 py-2">Run development server</td>
                  <td className="px-4 py-2 font-mono text-sm">
                    yarn start shell
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Run from project root
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">build</td>
                  <td className="px-4 py-2">Build for production</td>
                  <td className="px-4 py-2 font-mono text-sm">
                    yarn build shell
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Run from project root
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
