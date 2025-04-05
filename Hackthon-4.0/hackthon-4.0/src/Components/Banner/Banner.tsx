import React from "react";
import "./Banner.mock";

interface BannerProps {
  img?: string;
  title1?: string;
  title2?: string;
  description?: string;
  buttonText1?: string;
  buttonText2?: string;
}

const Banner = ({
  // img,
  title1,
  title2,
  description,
  buttonText1,
  buttonText2,
}: BannerProps) => {
  return (
    <>
      <div className="">
        <div className="container mx-auto">
          <div className="flex flex-col justify-center  w-96 m-4">
            <h2 className="font-ralewayBold text-6xl font-md text-white text-center">
              {title1}
              <br />
              <span className="text-2xl">{title2}</span>
            </h2>
            <p className="text-center mt-5 text-white text-base font-light font-raleway">
              {description}
            </p>
            <div className="pt-10 flex justify-center items-center">
              <a
                href="#"
                className="bg-primary p-[10px] font-normal text-white hover:bg-hover"
              >
                {buttonText1}
              </a>
              <a
                href="#"
                className="bg-hover p-[10px] font-normal text-white ml-[10px]"
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
