import FeatureTile from "./FeatureTile";

interface FeaturesProps {
  theme: "light" | "dark";
}

const features = [
  {
    title: "Easy Setup",
    description: `Getting started with Lidhium JS is quick and easy. Follow docs to get your project running in no time.`,
    image: "/easy-fetch-logo.svg",
  },
  {
    title: "Type Safety",
    description:
      "Built with TypeScript for complete type safety and better developer experience with autocomplete support.",
    image: "/type-safety-logo.svg",
  },
  {
    title: "Single Config",
    description:
      "Manage multiple applications with a single configuration file. Simplify your setup and maintain consistency across apps.",
    image: "/config-logo.svg",
  },
  {
    title: "Monorepo Support",
    description:
      "Built-in support for monorepo architecture. Manage multiple packages and applications in a single repository efficiently.",
    image: "/monorepo-logo.svg",
  },
  {
    title: "Performance First",
    description:
      "Optimized for performance with minimal overhead and efficient data handling for faster applications.",
    image: "/performance-logo.svg",
  },
  {
    title: "Dev Tool",
    description:
      "Built-in development tool for monitoring your applications and components.",
    image: "/dev-tools-logo.svg",
  },
];

export default function Features({ theme }: FeaturesProps) {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2
        className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Why Choose Lidhium JS?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center items-stretch max-w-5xl mx-auto">
        {features.map((feature) => (
          <FeatureTile
            key={feature.title}
            theme={theme as "light" | "dark"}
            title={feature.title}
            description={feature.description}
            image={feature.image}
          />
        ))}
      </div>
    </div>
  );
}
