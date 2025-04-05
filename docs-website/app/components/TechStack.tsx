import Image from "next/image";
import { useTheme } from "../context/ThemeContext";

interface TechItem {
  name: string;
  imageUrl: string;
  alt: string;
  description: string;
}

export default function TechStack() {
  const { theme } = useTheme();

  const techStack: TechItem[] = [
    {
      name: "Vue 3",
      imageUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
      alt: "Vue.js 3 Framework Logo",
      description:
        "Progressive JavaScript Framework for building user interfaces",
    },
    {
      name: "Webpack",
      imageUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
      alt: "Webpack Module Bundler Logo",
      description: "Module bundler for modern JavaScript applications",
    },
    {
      name: "Tailwind CSS",
      imageUrl:
        "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
      alt: "Tailwind CSS Framework Logo",
      description: "Utility-first CSS framework for rapid UI development",
    },
  ];

  return (
    <section
      id="tech-stack"
      aria-label="Technology Stack"
      className="container mx-auto px-4 py-16"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Powered By Modern Tech Stack
          <span className="sr-only">- Our Core Technologies</span>
        </h2>
        <p className="text-center text-lg mb-8 max-w-2xl mx-auto">
          Built with industry-leading technologies to ensure reliability,
          performance, and developer satisfaction.
        </p>
        <div className="flex items-center justify-center gap-12 md:gap-16">
          {techStack.map((tech) => (
            <div key={tech.name} className="relative group">
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <Image
                  src={tech.imageUrl}
                  alt={tech.alt}
                  fill
                  className={`object-contain ${
                    theme === "dark" ? "filter invert" : ""
                  }`}
                />
              </div>
              <div className="sr-only">
                {tech.name} - {tech.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
