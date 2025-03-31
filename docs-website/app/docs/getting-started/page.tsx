"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Clipboard, ClipboardCheck } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const sections = [
  { id: "installation", title: "Installation" },
  { id: "creating-project", title: "Creating a Project" },
  { id: "generate-micro-frontend", title: "Generate a new micro-frontend" },
  { id: "generate-remote-micro-frontend", title: "Generate a remote micro-frontend" },
  { id: "expose-the-remote-app", title: "Expose the remote application" },
  { id: "bind-the-host-app", title: "Bind the host application" },
  { id: "run-applications", title: "Run applications" },
  { id: "commands", title: "Commands" },
];

interface CodeBlockProps {
  code: string;
}

function CodeBlock({ code }: CodeBlockProps) {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative w-3/5 mt-4">
      <pre
        className={`p-4 rounded-lg mt-4 overflow-auto relative ${theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-900"
          }`}
      >
        <code className="text-sm">{code}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-300"
      >
        {copied ? <ClipboardCheck size={18} /> : <Clipboard size={18} />}
      </button>
    </div>
  );
}

export default function GettingStarted() {
  const [activeSection, setActiveSection] = useState("installation");
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const nextStep = () => {
    setActiveIndex((prev) => Math.min(prev + 1, sections.length - 1))
    setActiveSection(sections[activeIndex + 1].id)
  };
  const prevStep = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0))
    setActiveSection(sections[activeIndex - 1].id)
  };
  return (
    <div className={`flex h-screen ${theme === "dark" ? "bg-[#0d1b2a] text-white" : "bg-gray-50 text-black"}`}>
      <aside className={`w-45%  px-20 py-4 border-r shadow-sm ${theme === "dark" ? "bg-[#15202b] border-gray-700" : "bg-white border-gray-300"}`}>
        <h2 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}>Overview</h2>
        <ul>
          {sections.map((section) => (
            <li key={section.id}>
              <button
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition ${activeSection === section.id
                  ? theme === "dark"
                    ? "bg-blue-900 text-blue-300"
                    : "bg-green-100 text-green-700"
                  : theme === "dark"
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-100"
                  }`}
                onClick={() => setActiveSection(section.id)}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 px-50 pt-6 overflow-y-auto h-[85%]">
        {activeSection === "installation" && (
          <section id="installation" className=" h-full">
            <h1 className="text-3xl font-bold mb-6">Getting Started with Lidhium.js</h1>
            <p className="text-lg mb-4">Lidhium.js is a powerful CLI tool designed to simplify the process of creating and managing micro-frontend applications with Webpack. With its built-in support for Vue 3 and seamless module federation, it enables developers to quickly build scalable and modular frontend applications.</p>

            <h2 className="text-2xl font-bold">Installation</h2>
            <p className="mt-2">To start using Lidhium.js, you need to install it globally using npm or yarn. This will make the CLI commands available throughout your system.</p>
            <CodeBlock code={`npm install -g lidhium\n# OR\nyarn global add lidhium`} />
          </section>
        )}

        {activeSection === "creating-project" && (
          <section id="creating-project" className=" h-full">
            <h2 className="text-2xl font-bold">Creating a New Project</h2>
            <p className="mt-2">You can create a new Lidhium.js project using the following command:</p>
            <CodeBlock code={`lidhium init my-app\n# OR\nlidhium generate app-name 3000`} />
            <p className="mt-2">This will generate a new project structure with all necessary dependencies and Webpack configurations preconfigured.</p>
          </section>
        )}

        {activeSection === "generate-micro-frontend" && (
          <section id="generate-micro-frontend" className=" h-full">
            <h2 className="text-2xl font-bold">Generating a Micro-Frontend</h2>
            <p className="mt-2">To generate a micro-frontend, run the following command:</p>
            <CodeBlock code={`lidhium generate app-name 3000\n\nRun the application using\nyarn start app-name`} />

            <p className="mt-2">This will set up a new micro-frontend application that runs independently and can later be federated with other applications.</p>
          </section>
        )}

        {activeSection === "generate-remote-micro-frontend" && (
          <section id="generate-remote-micro-frontend" className=" h-full">
            <h2
              className={`text-2xl font-bold ${theme === "dark" ? "text-gray-100" : "text-gray-800"}`}
            >
              Generate a remote micro-frontend
            </h2>

            <h5
              className={`text-lg font-semibold mt-2 ${theme === "dark" ? "text-gray-100" : "text-gray-800"}`}
            >
              Run it in a different port
            </h5>

            {/* CLI command */}
            <CodeBlock code={`lidhium generate remote 3001\n\nRun the application using\nyarn start remote`} />

            <p className={`mt-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Create a component inside this remote which you can consume inside the app created in the previous step.
            </p>

            <h5
              className={`text-lg font-semibold mt-4 ${theme === "dark" ? "text-gray-100" : "text-gray-800"}`}
            >
              Component File:{" "}
              <span className="font-mono bg-gray-700 text-white px-2 py-1 rounded">
                apps/remote/src/components/HJ.vue
              </span>
            </h5>

            <CodeBlock
              code={`<script lang="ts">
export default {
  name: "HJ",
  components: {},
  computed: {},
  methods: {},
};
</script>`}
            />

            <p className="mt-2">
              After setting up, you can create a component inside this remote app that can be consumed inside the host application.
            </p>
          </section>
        )}

        {activeSection === 'expose-the-remote-app' && (
          <section id="expose-the-remote-app" className=" h-full">
            <h5>Go to the path of remote app in terminal </h5>
            <CodeBlock code={`cd remote\nlidhium expose ./src/components/HJ.vue`} />

          </section>
        )}

        {activeSection === 'bind-the-host-app' && (
          <section id="bind-the-host-app" className=" h-full">
            <h5>Go to the path of remote app in terminal </h5>
            <h6>Always make sure that we never create a component with the same name of the exposed component</h6>
            <CodeBlock code={`cd my-app\nlidhium bind`} />

          </section>
        )}
        {activeSection === "run-applications" && (
          <section id="run-applications" className=" h-full">
            <h5>Run the applications </h5>
            <CodeBlock code={` cd remote\n yarn start remote\n\n cd my-app\n\n yarn start`} />
            <h6>We can see the component created in one micro-frontend is being used in the other frontend using the Lidhium.js library. Even when the remote application is stopped, you can see the first application will work without any issue.</h6>
          </section>
        )}

        {activeSection === "commands" && (
          <section id="commands" className=" h-full">
            <h2 className="text-2xl font-bold">Commands</h2>
            <p className="mt-2">Lidhium.js provides several useful CLI commands:</p>
            <CodeBlock code={`lidhium init - Initialize a new project\nlidhium generate - Generate a new micro-frontend\nlidhium start - Start the development server\nlidhium build - Build for production\nlidhium expose - Expose components for module federation\nlidhium bind - Bind federated components`} />


            <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-gray-100" : "text-gray-800"}`}>Commands</h2>
            <p className={`mt-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Lidhium provides several CLI commands:</p>
            <table className={`w-full mt-4 border ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
              <thead>
                <tr className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}>
                  <th className="border p-2 text-left">Command</th>
                  <th className="border p-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-2 font-mono">init</td><td className="border p-2">Initialize a new project</td></tr>
                <tr><td className="border p-2 font-mono">generate</td><td className="border p-2">Generate a new micro-frontend app</td></tr>
                <tr><td className="border p-2 font-mono">start</td><td className="border p-2">Start development server</td></tr>
                <tr><td className="border p-2 font-mono">build</td><td className="border p-2">Build for production</td></tr>
                <tr><td className="border p-2 font-mono">expose</td><td className="border p-2">Expose components for federation</td></tr>
                <tr><td className="border p-2 font-mono">bind</td><td className="border p-2">Bind federated components</td></tr>
              </tbody>
            </table>
            <p className={`mt-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Use <span className="font-mono px-2 py-1 rounded bg-gray-700 text-white">lidhium -h</span> for more help.
            </p>
          </section>
        )}

        {/* Navigation Buttons */}
        <div className="sticky bottom-0 left-0 w-ful dark:bg-[#15202b] flex justify-between">
          <button
            onClick={prevStep}
            disabled={activeIndex === 0}
            className={`px-4 py-2 rounded-md flex items-center gap-2 text-white ${activeIndex === 0 ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            <ArrowLeft size={18} /> Back
          </button>
          <button
            onClick={nextStep}
            disabled={activeIndex === sections.length - 1}
            className={`px-4 py-2 rounded-md flex items-center gap-2 text-white ${activeIndex === sections.length - 1 ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
          >
            Next <ArrowRight size={18} />
          </button>
        </div>
      </main>
    </div>
  );
}
