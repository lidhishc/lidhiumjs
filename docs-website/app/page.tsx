"use client";

import Features from "./components/Featues";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import { useTheme } from "./context/ThemeContext";

export default function Home() {
  const { theme } = useTheme();
  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-800"
      } min-h-screen`}
    >
      <Hero theme={theme as "light" | "dark"} />
      <Features theme={theme as "light" | "dark"} />
      <TechStack />
      <div className="container mx-auto px-6 py-10"></div>
    </div>
  );
}
