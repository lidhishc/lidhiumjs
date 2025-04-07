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
import Navbar from "../../components/Navbar";
import RunApplicationsSection from "./components/sections/RunApplicationsSection";

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
  const mainRef = useRef<HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    // Get the hash from URL (remove the # symbol)
    const hash = window.location.hash.slice(1);
    // If hash exists and matches a section id, set it as active
    if (hash && sections.some((section) => section.id === hash)) {
      setActiveSection(hash);
    }
  }, []);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setIsDrawerOpen(false);

    // Handle scroll behavior for both mobile and desktop
    if (window.innerWidth < 768) {
      // md breakpoint
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onDrawerToggle={toggleDrawer} isDrawerOpen={isDrawerOpen} />
      <div className="flex flex-col md:flex-row w-full flex-1 bg-gray-50 text-black">
        {/* Drawer */}
        <div
          className={`fixed md:sticky top-14 w-64 h-[calc(100vh-3.5rem)] transition-transform duration-300 ease-in-out z-40 ${
            isDrawerOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          } bg-gray-50`}
        >
          <Drawer
            sections={sections}
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            onClose={() => setIsDrawerOpen(false)}
          />
        </div>

        {/* Main Content */}
        <main
          ref={mainRef}
          className="flex-1 w-full md:h-[calc(100vh-3.5rem)] px-4 md:px-8 lg:px-12 py-6 md:overflow-y-auto"
        >
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

        {/* Overlay for mobile */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setIsDrawerOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
