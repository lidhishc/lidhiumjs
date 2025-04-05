import FeatureTile from "./FeatureTile";

interface FeaturesProps {
  theme: "light" | "dark";
}

const features = [
  {
    title: "Easy Setup",
    description: `Getting started with Lidhium JS is quick and easy. Follow docs to get your project running in no time.`,
    image: "/easy-fetch-logo.svg",
    alt: "Easy setup illustration showing simple configuration steps",
  },
  {
    title: "Type Safety",
    description:
      "Built with TypeScript for complete type safety and better developer experience with autocomplete support.",
    image: "/type-safety-logo.svg",
    alt: "TypeScript type safety illustration showing code completion",
  },
  // ... existing features ...
];

export default function Features({ theme }: FeaturesProps) {
  return (
    <section
      id="features"
      aria-label="Features"
      className="container mx-auto px-4 py-16"
    >
      <h2
        className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Why Choose Lidhium JS?
        <span className="sr-only">- Feature Overview</span>
      </h2>
      <p className="text-center text-lg mb-8 max-w-2xl mx-auto">
        A modern JavaScript framework designed for performance, type safety, and
        developer experience. Build better applications faster with our
        comprehensive toolset.
      </p>
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
    </section>
  );
}
