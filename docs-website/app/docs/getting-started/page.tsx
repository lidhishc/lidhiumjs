"use client";

import { useEffect, useRef, useState } from "react";

import BindSection from "./components/sections/BindSection";
import BuildSection from "./components/sections/BuildSection";
import CommandsSection from "./components/sections/CommandsSection";
import DevToolSection from "./components/sections/DevToolSection";
import Drawer from "./components/Drawer";
import ExposeSection from "./components/sections/ExposeSection";
import InstallationSection from "./components/sections/InstallationSection";
import MicroFrontendSection from "./components/sections/MicroFrontendSection";
import RunApplicationsSection from "./components/sections/RunApplicationsSection";
import { useTheme } from "../../context/ThemeContext";

const sections = [
  { id: "installation", title: "Installation" },
  { id: "generate-micro-frontend", title: "Create new micro-app" },
  { id: "expose-the-remote-app", title: "Expose Components" },
  { id: "bind-micro-app", title: "Bind Micro-app" },
  { id: "run-applications", title: "Run applications" },
  { id: "build-app", title: "Build Application" },
  { id: "commands", title: "Commands" },
  { id: "dev-tool", title: "Development Tool" },
];

export default function GettingStarted() {
  const [activeSection, setActiveSection] = useState("installation");
  const { theme } = useTheme();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Get the hash from URL (remove the # symbol)
    const hash = window.location.hash.slice(1);
    // If hash exists and matches a section id, set it as active
    if (hash && sections.some((section) => section.id === hash)) {
      setActiveSection(hash);
    }
  }, []);

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    // Update URL hash when section changes
    window.location.hash = sectionId;
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
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
      <main ref={mainRef} className="flex-1 px-50 pt-6 overflow-y-auto h-[90%]">
        {activeSection === "installation" && <InstallationSection />}
        {activeSection === "generate-micro-frontend" && (
          <MicroFrontendSection />
        )}
        {activeSection === "expose-the-remote-app" && <ExposeSection />}
        {activeSection === "bind-micro-app" && <BindSection />}
        {activeSection === "run-applications" && <RunApplicationsSection />}
        {activeSection === "build-app" && <BuildSection />}
        {activeSection === "commands" && <CommandsSection />}
        {activeSection === "dev-tool" && <DevToolSection />}
      </main>
    </div>
  );
}
