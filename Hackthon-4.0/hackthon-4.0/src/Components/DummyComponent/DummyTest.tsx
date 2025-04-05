import React from "react";
import { tv } from "tailwind-variants";

export type DummyTestProps = {
  title?: string;
  description?: string;
  image?: string;
  cta?: {
    text?: string;
    url?: string;
  };
  theme?: "light" | "dark";
};
const DummyTest = tv({
  slots: {
    verticallyPadding:
      "p-2 lg:p-6 bg-primary-blue lg:rounded-none overflow-hidden relative lg:h-[388px] mt-[40px]",
    titleClass:
      "text-base lg:text-lg font-semibold leading-6 lg:leading-8 text-primary-white lg:text-h3-desktop",
  },
  variants: {
    type: {
      left: {
        relativeClass: "-top-[50px]",
        absoluteClass:
          " -top-full left-[96px] md:left-[260px] lg:-top-2.5 lg:-left-[65px] flex justify-center items-center w-[216px] h-[216px] lg:w-[382px] lg:h-[382px] z-10",
        circleClass:
          " w-[216px] h-[216px] lg:w-[382px] lg:h-[382px] bg-primary-green rounded-full top-4 left-[108px] md:left-[275px] lg:top-3.75 lg:-left-[45px] z-10",
        contentClass:
          "pt-[207px] lg:pt-0 bg-primary-blue lg:flex lg:rounded-none overflow-hidden relative",
        flexWithCol:
          "px-6 lg:mt-0 flex flex-col justify-center items-center text-center w-full z-10",
        titleClass:
          "text-h2-semibold-mobile !font-semibold  lg:pt-20 w-[328px] text-primary-white lg:text-h3-desktop font-semibold  md:w-[585px] lg:w-[382px] xl:w-[585px]",
        descriptionClass:
          "text-body-mobile leading-4.5 font-regular pt-[11px] text-primary-white md:text-intro-desktop md:leading-6 md:font-regular md:text-primary-white md:pt-6.25 md:inline-grid md:w-[550px]",
        paddingWithFlex:
          "pt-6.5 lg:pt-8.5 pb-7.5 lg:pb-18.5 flex justify-center items-center",
        linkClass:
          "px-9 py-3.5 lg:py-5 bg-primary-green !text-primary-white border-2 border-primary-blue navigation-semibold-mobile leading-5.5 rounded-full flex justify-center items-center hover:bg-primary-white hover:!text-primary-blue w-full cursor-pointer",
      },
      center: {
        relativeClass: " -top-10",
        absoluteClass:
          " top-[20%] left-[20%] sm:top-2.5 sm:left-[24%] min-[500px]:left-[30%] min-[600px]:left-[32%] min-[600px]:top-[40%] md:top-[3px] md:left-[35%] lg:top-1 lg:left-[6%] flex justify-center items-center w-[217px] h-[217px] lg:w-[416px] lg:h-[416px] z-10",
        circleClass:
          " w-[216px] h-[216px] lg:w-[408px] lg:h-[414px] bg-primary-green rounded-full top-3.5 left-[22%] sm:top-5 min-[500px]:top-[25px] min-[500px]:left-[32%] min-[600px]:top-4 min-[600px]:left-[33.5%] sm:left-[26%] md:left-[36%] lg:top-10 lg:left-[7%] xl:left-[7.5%] z-10",
        contentClass:
          "pt-[200px] md:pt-[167px] lg:pt-0 bg-primary-green-tint-300  lg:rounded-none overflow-hidden relative lg:h-[388px]",
        flexWithCol: "mt-5 md:mt-14 lg:mt-0 w-full z-10",
        titleClass:
          "text-h3-mobile lg:pt-20 max-sm:w-[328px] text-primary-less-black lg:text-h5-semibold-desktop  lg:leading-7.5 md:w-[585px] lg:w-[382px] xl:w-[817px]",
        descriptionClass:
          "text-h3-mobile lg:pt-[104px] max-sm:w-[328px] text-primary-less-black lg:text-h5-semibold-desktop lg:leading-7 md:w-[550px]  xl:w-[817px] ",
        paddingWithFlex:
          "pt-7.5 lg:pt-[35px] pb-11.5 lg:pb-[111px] flex justify-center items-center text-nowrap w-[326px] md:w-[416px] lg:absolute lg:top-[70%] lg:left-1/2  xl:top-[47%] xl:left-1/2    ",
        linkClass:
          "px-9 py-[17px] lg:py-3.5 bg-primary-blue !text-primary-white border-2 border-primary-blue flex justify-center items-center rounded-full h-[50px]  hover:bg-primary-white hover:!text-primary-blue w-full cursor-pointer",
      },
    },
  },
});

const DummyTestComp: React.FC<DummyTestProps> = ({
  theme = "light",
}: DummyTestProps) => {
  const { verticallyPadding, titleClass } = DummyTest({});
  const themeClass =
    theme === "light" ? "bg-black text-white" : "bg-white text-black";

  return (
    <div className={`${verticallyPadding()} ${themeClass}`}>
      <h1 className={titleClass()}>HELLO</h1>
      <p className="">This is Test</p>
      <img src="" alt="dummy" />
      <a href="" className="">
        Test
      </a>
    </div>
  );
};
export default DummyTestComp;
