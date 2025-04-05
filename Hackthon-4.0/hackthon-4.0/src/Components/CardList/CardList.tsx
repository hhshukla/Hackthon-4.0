import React from "react";
import Image from "next/image";
import { CardListData } from "./CardList.mock";
import { useTheme } from "next-themes";

type LayoutType = "vertical" | "horizontal";

interface CardListProps {
  layout?: LayoutType;
}

const CardList: React.FC<CardListProps> = ({ layout = "vertical" }) => {
  const isHorizontal = layout === "horizontal";
  const { theme, systemTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <div
      className={`py-10 mt-10 px-4 sm:px-6 lg:px-8 ${
        currentTheme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-3xl font-bold text-center mb-8">AI Solutions</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CardListData.map((card, index) => (
          <div
            key={index}
            className={`bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
              isHorizontal ? "flex flex-col md:flex-row" : ""
            } ${currentTheme === "dark" ? " text-blue-500" : " text-black"}`}
          >
            {/* Image */}
            <div
              className={`relative group overflow-hidden ${
                isHorizontal ? "w-full md:w-1/2 h-64 md:h-auto" : "w-full h-56"
              }`}
            >
              <Image
                src={card.image}
                alt={card.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Content */}
            <div
              className={`p-6 ${
                isHorizontal ? "md:w-1/2 flex flex-col justify-center" : ""
              } `}
            >
              <h3 className="text-xl font-semibold mb-1">{card.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{card.subtitle}</p>
              <p className="text-gray-700 text-sm mb-4">{card.description}</p>
              <a
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition w-fit"
              >
                {card.buttonText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
