import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Lidhium JS - A powerful CLI tool for micro-frontend development. Build modern applications with Vue 3, Webpack, and Tailwind CSS.",
  openGraph: {
    title: "Lidhium JS - Modern JavaScript Framework",
    description:
      "Build better applications faster with our comprehensive toolset for micro-frontend development",
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
