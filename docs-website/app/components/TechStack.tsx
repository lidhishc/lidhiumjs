import Image from "next/image";
import { useTheme } from "../context/ThemeContext";

interface TechItem {
  name: string;
  imageUrl: string;
}

export default function TechStack() {
  const { theme } = useTheme();

  const techStack: TechItem[] = [
    {
      name: "Vue 3",
      imageUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    },
    {
      name: "Webpack",
      imageUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
    },
    {
      name: "Tailwind CSS",
      imageUrl:
        "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Powered By Modern Tech Stack
        </h2>
        <div className="flex items-center justify-center gap-12 md:gap-16">
          {techStack.map((tech) => (
            <div key={tech.name} className="relative w-16 h-16 md:w-20 md:h-20">
              <Image
                src={tech.imageUrl}
                alt={`${tech.name} logo`}
                fill
                className={`object-contain ${
                  theme === "dark" ? "filter invert" : ""
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
