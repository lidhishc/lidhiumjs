"use client";

import { useTheme } from "../../../context/ThemeContext";

interface DrawerProps {
  sections: { id: string; title: string }[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export default function Drawer({
  sections,
  activeSection,
  onSectionChange,
}: DrawerProps) {
  const { theme } = useTheme();

  return (
    <aside
      className={`w-45% px-20 py-4 border-r shadow-sm ${
        theme === "dark"
          ? "bg-[#15202b] border-gray-700"
          : "bg-white border-gray-300"
      }`}
    >
      <h2
        className={`text-lg font-semibold mb-4 ${
          theme === "dark" ? "text-gray-100" : "text-gray-900"
        }`}
      >
        Overview
      </h2>
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <button
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition ${
                activeSection === section.id
                  ? theme === "dark"
                    ? "bg-blue-900 text-blue-300"
                    : "bg-green-100 text-green-700"
                  : theme === "dark"
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => onSectionChange(section.id)}
            >
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
