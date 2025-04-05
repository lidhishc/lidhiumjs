import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Getting Started",
  description:
    "Learn how to install and set up Lidhium JS in your project. Step-by-step guide for beginners to start building micro-frontend applications.",
  openGraph: {
    title: "Getting Started with Lidhium JS",
    description:
      "Step-by-step guide to install and set up Lidhium JS for micro-frontend development",
  },
};

export default function GettingStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
