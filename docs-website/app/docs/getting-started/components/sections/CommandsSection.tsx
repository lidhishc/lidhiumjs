"use client";

import CodeBlock from "../CodeBlock";
import { useTheme } from "../../../../context/ThemeContext";

export default function CommandsSection() {
  const { theme } = useTheme();

  return (
    <section id="commands" className="h-full">
      <h2 className="text-2xl font-bold">Commands</h2>
      <p className="mt-2">Lidhium.js provides several useful CLI commands:</p>
      <CodeBlock
        code={`lidhium init - Initialize a new project\nlidhium generate - Generate a new micro-frontend\nlidhium start - Start the development server\nlidhium build - Build for production\nlidhium expose - Expose components for module federation\nlidhium bind - Bind federated components`}
      />

      <h2
        className={`text-2xl font-bold ${
          theme === "dark" ? "text-gray-100" : "text-gray-800"
        }`}
      >
        Commands
      </h2>
      <p
        className={`mt-2 ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
      >
        Lidhium provides several CLI commands:
      </p>
      <table
        className={`w-full mt-4 border ${
          theme === "dark" ? "border-gray-600" : "border-gray-300"
        }`}
      >
        <thead>
          <tr className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}>
            <th className="border p-2 text-left">Command</th>
            <th className="border p-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2 font-mono">init</td>
            <td className="border p-2">Initialize a new project</td>
          </tr>
          <tr>
            <td className="border p-2 font-mono">generate</td>
            <td className="border p-2">Generate a new micro-frontend app</td>
          </tr>
          <tr>
            <td className="border p-2 font-mono">start</td>
            <td className="border p-2">Start development server</td>
          </tr>
          <tr>
            <td className="border p-2 font-mono">build</td>
            <td className="border p-2">Build for production</td>
          </tr>
          <tr>
            <td className="border p-2 font-mono">expose</td>
            <td className="border p-2">Expose components for federation</td>
          </tr>
          <tr>
            <td className="border p-2 font-mono">bind</td>
            <td className="border p-2">Bind federated components</td>
          </tr>
        </tbody>
      </table>
      <p
        className={`mt-4 ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
      >
        Use{" "}
        <span className="font-mono px-2 py-1 rounded bg-gray-700 text-white">
          lidhium -h
        </span>{" "}
        for more help.
      </p>
    </section>
  );
}
