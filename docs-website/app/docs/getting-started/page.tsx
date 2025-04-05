"use client";

import BindSection from "./components/sections/BindSection";
import CommandsSection from "./components/sections/CommandsSection";
import Drawer from "./components/Drawer";
import ExposeSection from "./components/sections/ExposeSection";
import InstallationSection from "./components/sections/InstallationSection";
import MicroFrontendSection from "./components/sections/MicroFrontendSection";
import ProjectSection from "./components/sections/ProjectSection";
import RunApplicationsSection from "./components/sections/RunApplicationsSection";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const sections = [
  { id: "installation", title: "Installation" },
  { id: "creating-project", title: "Creating a Project" },
  { id: "generate-micro-frontend", title: "Generate a new micro-frontend" },
  { id: "expose-the-remote-app", title: "Expose the remote application" },
  { id: "bind-the-host-app", title: "Bind the host application" },
  { id: "run-applications", title: "Run applications" },
  { id: "commands", title: "Commands" },
];

export default function GettingStarted() {
  const [activeSection, setActiveSection] = useState("installation");
  const { theme } = useTheme();

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  return (
    <div
      className={`flex h-screen ${
        theme === "dark" ? "bg-[#0d1b2a] text-white" : "bg-gray-50 text-black"
      }`}
    >
      <Drawer
        sections={sections}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      <main className="flex-1 px-50 pt-6 overflow-y-auto h-[85%]">
        {activeSection === "installation" && <InstallationSection />}
        {activeSection === "creating-project" && <ProjectSection />}
        {activeSection === "generate-micro-frontend" && (
          <MicroFrontendSection />
        )}
        {activeSection === "expose-the-remote-app" && <ExposeSection />}
        {activeSection === "bind-the-host-app" && <BindSection />}
        {activeSection === "run-applications" && <RunApplicationsSection />}
        {activeSection === "commands" && <CommandsSection />}
      </main>
    </div>
  );
}
