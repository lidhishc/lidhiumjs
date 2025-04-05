import Image from "next/image";

interface FeatureTileProps {
  theme: "light" | "dark";
  title: string;
  description: string;
  image: string;
}

export default function FeatureTile({
  theme,
  title,
  description,
  image,
}: FeatureTileProps) {
  return (
    <div
      className={`rounded-lg shadow-md w-60 h-60 flex flex-col items-center justify-center ${
        theme === "dark"
          ? "bg-gray-600 text-gray-100"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <Image src={image} alt={title} width={75} height={75} className="mb-4" />
      <p className="text-center text-sm font-light mb-1 p-2">{description}</p>
    </div>
  );
}
