"use client";
import Hero from "./components/Hero";
import { useTheme } from "./context/ThemeContext";

export default function Home() {
   const { theme } = useTheme();
  return (
    <div className={`${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"} min-h-screen`}>
      <Hero theme={theme as "light" | "dark"} />

      <div className="container mx-auto px-6 py-10">
        {/* Alert Box */}
        {/* <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg border border-yellow-300 mb-6">
          <strong>Lidhium CLI is in Beta!</strong> 
          <p>For stable production, consider the latest Vue 3 Tooling Guide.</p>
        </div> */}

        <h2 className="text-3xl font-bold">Getting Started</h2>
        <p className={`mt-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
          Install Lidhium globally using npm:
        </p>

        <pre className="bg-gray-800 text-white p-4 rounded-lg mt-4 overflow-auto">
          <code className="text-sm">
            {`npm install -g lidhium
# OR
yarn global add lidhium`}
          </code>
        </pre>

        <h3 className="text-2xl font-semibold mt-8">Create a Project</h3>
        <pre className="bg-gray-800 text-white p-4 rounded-lg mt-4 overflow-auto">
          <code className="text-sm">
            {`lidhium init my-app
# OR
lidhium generate app-name 3000
cd my-app`}
          </code>
        </pre>

        <h3 className="text-2xl font-semibold mt-8">Start Development Server</h3>
        <pre className="bg-gray-800 text-white p-4 rounded-lg mt-4 overflow-auto">
          <code className="text-sm">{`lidhium start app-name`}</code>
        </pre>
      </div>
    </div>
  );
}
