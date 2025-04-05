"use client";

import CodeBlock from "../CodeBlock";

export default function RunApplicationsSection() {
  return (
    <section id="run-applications" className="h-full">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-4">Running Applications</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            To run your micro-frontend applications, you need to start both the
            remote and main applications. The remote application should be
            started before the main application.
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">
            Start Remote Application
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm mb-2">
                From project root, start the remote app:
              </p>
              <CodeBlock code="yarn start remote-app" />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Start Main Application</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm mb-2">
                From project root, start the main app:
              </p>
              <CodeBlock code="yarn start app" />
            </div>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">
            Binded Connection Requirements
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Both main and remote apps must be running simultaneously</li>
            <li>Start remote apps before the main app</li>
            <li>Keep terminal windows open for both applications</li>
            <li>Verify connection in browser console</li>
          </ul>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Best Practices</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Use different terminal windows for each app</li>
            <li>Monitor both terminal outputs for errors</li>
            <li>Keep port numbers sequential (3000, 3001, etc.)</li>
            <li>Check the app&apos;s port in lidhium.config.json</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Verification</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Once both applications are running, you can verify the connection
            by:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Opening the main app in your browser</li>
            <li>Checking the browser console for any errors</li>
            <li>Verifying that components from the remote app are loading</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
