import React from "react";
import { useTheme } from "next-themes";
import { ContentBlockData } from "./ContentBlock.mock";
import Image from "next/image";

interface ContentBlockProps {
  title?: string;
  description?: string;
  tags?: string[];
  category?: string;
  image?: string;
  cta?: {
    label: string;
    url: string;
  };
}

const Banner = ({
  title = ContentBlockData.title,
  description = ContentBlockData.description,
  tags = ContentBlockData.tags,
  category = ContentBlockData.category,
  image = ContentBlockData.image,
  cta = ContentBlockData.cta,
}: ContentBlockProps) => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div
      className={`p-6 rounded-lg shadow-md transition-all ${
        currentTheme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-white text-black"
      }`}
    >
      {image && (
        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          layout="responsive"
          className="w-full h-64 object-cover rounded-md mb-4"
        />
      )}

      {category && (
        <span className="text-sm uppercase text-blue-600 font-semibold">
          {category}
        </span>
      )}

      <h4 className="text-2xl font-bold my-2">{title}</h4>
      <p className="text-base mb-4">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-200 text-black text-sm px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {cta && (
        <a
          href={cta.url}
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
        >
          {cta.label}
        </a>
      )}
    </div>
  );
};

export default Banner;
