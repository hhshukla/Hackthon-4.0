import React from "react";
import "./Banner.mock";
import { useTheme } from "next-themes";
import Image from "next/image";

interface BannerProps {
  img?: string;
  title1?: string;
  title2?: string;
  description?: string;
  buttonText1?: string;
  buttonText2?: string;
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the banner be? */
  position?: "left" | "right" | "center";
}

const Banner = ({
  img,
  title1,
  title2,
  description,
  buttonText1,
  buttonText2,
  position = "center", // default to "center" if not provided
}: BannerProps) => {
  const { theme, systemTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <>
      <div
        className={`${
          currentTheme === "dark"
            ? "bg-black text-white"
            : "bg-white text-black"
        } `}
      >
        <div className="relative">
          {img && (
            <Image
              src={img}
              alt="banner-image"
              layout="responsive"
              width={400}
              height={300}
            />
          )}
          <div
            className={`md:absolute md:inset-0 lg:top-1/2 flex flex-col justify-center
                md:opacity-50 p-6 rounded-lg shadow-lg m-4 lg:w-1/2 md:h-[400px]
                ${
                  position === "left"
                    ? "items-start lg:left-0 text-left"
                    : position === "right"
                    ? "items-end lg:right-0 text-right"
                    : "items-center lg:left-1/2 transform lg:-translate-x-1/2 text-center"
                }
                ${
                  currentTheme === "dark"
                    ? "bg-blue-500 md:opacity-50 text-black"
                    : "bg-white text-black"
                }`}
          >
            <h2 className="font-bold font-sans mb-4 text-2xl">{title1}</h2>
            <h3 className="font-semibold font-sans mb-4 text-xl">{title2}</h3>
            <p className="font-sans font-medium md:m-4 text-center">
              {description}
            </p>
            <div className="m-6 flex flex-col md:flex-row md:justify-center">
              <a
                href="#"
                className={`p-4  rounded-lg font-semibold m-3 cursor-pointer  ${
                  currentTheme === "light"
                    ? "bg-blue-500 text-black"
                    : "bg-white text-black"
                }`}
              >
                {buttonText1}
              </a>
              <a
                href="#"
                className="p-4 bg-black rounded-lg text-white mr-2 font-semibold m-3 cursor-pointer"
              >
                {buttonText2}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
