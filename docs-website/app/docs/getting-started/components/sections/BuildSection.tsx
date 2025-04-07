"use client";

import CodeBlock from "../CodeBlock";

export default function BuildSection() {
  return (
    <section id="build-app" className="h-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Build Application</h2>
        <p className="text-lg text-gray-600">
          Build your micro-frontend applications for production deployment with
          optimized performance and bundling.
        </p>
      </div>

      <div className="space-y-8">
        {/* Basic Build Commands */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Build Commands</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold mb-2">Using Yarn</h4>
              <CodeBlock code="yarn build <app-name>" />
              <p className="text-sm mt-2 text-gray-600">
                Example: <code>yarn build shell</code>
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold mb-2">Using NPM</h4>
              <CodeBlock code="npm run build <app-name>" />
              <p className="text-sm mt-2 text-gray-600">
                Example: <code>npm run build remote-app</code>
              </p>
            </div>
          </div>
        </div>

        {/* Build Process */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Build Process</h3>
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold mb-2">What Happens During Build</h4>
              <ul className="space-y-2 text-sm list-disc pl-4">
                <li>Code optimization and minification</li>
                <li>Bundle splitting for better performance</li>
                <li>Generation of production-ready assets</li>
                <li>Creation of module federation bundles</li>
                <li>Compilation of TypeScript to JavaScript</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Build Output */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Build Output</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold mb-2">Output Directory Structure</h4>
              <CodeBlock
                code={`dist/
├── js/           # JavaScript bundles
├── css/          # Compiled CSS
├── assets/       # Other assets
└── index.html    # Entry point`}
              />
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold mb-2">Key Files</h4>
              <ul className="space-y-2 text-sm list-disc pl-4">
                <li>Main application bundle</li>
                <li>Module federation container</li>
                <li>Chunk files for code splitting</li>
                <li>Asset files (images, fonts, etc.)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Best Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold mb-2">Do&apos;s</h4>
              <ul className="space-y-2 text-sm list-disc pl-4">
                <li>Build remote apps before host app</li>
                <li>Verify all dependencies are installed</li>
                <li>Check for environment variables</li>
                <li>Review bundle sizes</li>
              </ul>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-semibold mb-2">Don&apos;ts</h4>
              <ul className="space-y-2 text-sm list-disc pl-4">
                <li>Skip building remote apps</li>
                <li>Ignore build warnings</li>
                <li>Deploy without testing the build</li>
                <li>Mix development and production builds</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="bg-red-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Common Issues</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Build Failures:</strong>
              <span className="text-sm ml-2">
                Check for missing dependencies or configuration errors
              </span>
            </li>
            <li>
              <strong>Large Bundle Size:</strong>
              <span className="text-sm ml-2">
                Review and optimize your imports and dependencies
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
