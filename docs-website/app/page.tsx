"use client";

import Features from "./components/Featues";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";

export default function Home() {
  return (
    <div className={`${"bg-white text-gray-800"} min-h-screen`}>
      <Hero theme="light" />
      <Features theme="light" />
      <TechStack />
      <div className="container mx-auto px-6 py-10"></div>
    </div>
  );
}
