"use client";

import { Clipboard, ClipboardCheck } from "lucide-react";

import { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";

interface CodeBlockProps {
  code: string;
}

export default function CodeBlock({ code }: CodeBlockProps) {
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
    <div className="relative mt-4">
      <pre
        className={`p-4 rounded-lg mt-4 overflow-auto relative ${
          theme === "dark"
            ? "bg-gray-900 text-gray-300"
            : "bg-gray-100 text-gray-900"
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
