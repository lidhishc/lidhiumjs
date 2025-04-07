"use client";

interface DrawerProps {
  sections: Array<{ id: string; title: string }>;
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  onClose: () => void;
}

export default function Drawer({
  sections,
  activeSection,
  onSectionChange,
  onClose,
}: DrawerProps) {
  return (
    <nav className="h-full overflow-y-auto bg-gray-50 border-r border-gray-200">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Table of Contents
        </h2>
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => {
                  onSectionChange(section.id);
                  onClose();
                }}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  activeSection === section.id
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
