import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BannerSliderData } from "./BannerSlider.mock";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Parallax, Pagination, Navigation } from "swiper/modules";

// interface BannerSliderProps {
//   title: string;
//   subTitle: string;
//   text: string;
//   bgImage:string;
// }

const BannerSlider = () => {
  return (
    <div className="relative">
      <Swiper
        style={{
          "--swiper-navigation-color": "#000",
          "--swiper-pagination-color": "#000",
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation]}
        className="mySwiper"
      >
        {BannerSliderData?.map((slide, index) => (
          <SwiperSlide key={index}>
            <img src={slide.bgImage} alt="bgCar" className="w-full h-[500px]" />
            <div className="md:absolute inset-0 flex flex-col justify-center items-center md:items-start md:pl-12 ">
              <div className="mt-4 bg-primary1 w-[400px] p-4 flex flex-col justify-center items-center rounded-2xl">
                <div className="" data-swiper-parallax="-300">
                  <button className=" bg-mainWhite text-2xl text-primary1 font-ralewayBold font-md mr-5 p-2 hover:bg-lightBlack hover:text-mainWhite">
                    New Car
                  </button>
                  <button className="bg-mainWhite text-2xl text-primary1 font-ralewayBold font-md p-2 hover:bg-lightBlack hover:text-mainWhite">
                    Used Car
                  </button>
                </div>
                <div className="flex mt-4 ">
                  <div
                    className="text-mainWhite mr-5"
                    data-swiper-parallax="-200"
                  >
                    <input type="radio" name="radio" className="mr-1" />
                    By Budget
                  </div>
                  <div className="text-mainWhite" data-swiper-parallax="-200">
                    <input type="radio" name="radio" className="mr-1" />
                    By Brand
                  </div>
                </div>

                <div className="text-black1 flex flex-col mt-4" data-swiper-parallax="-100">
                  <select name="languages" className="border-black3 border-2 outline-none px-4 py-2 text-primary1 text-xl font-md font-ralewayBold cursor-pointer"id="lang">
                    <option value="javascript">Select Budget</option>
                    <option value="1-5Lakh">1-5Lakh</option>
                    <option value="5-10Lakh">5-10Lakh</option>
                    <option value="10-15Lakh">10-15Lakh</option>
                    <option value="15-20Lakh">15-20Lakh</option>
                    <option value="UpTo 20Lakh">UpTo 20Lakh</option>
                 
                  </select>
                  <select name="languages" className="border-black3 border-2 outline-none px-4 py-2 text-primary1 text-xl font-md font-ralewayBold cursor-pointer" id="lang">
                    <option value="All Vehicle Type">All Vehicle Type</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="MUV">MUV</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>
                <div className="mt-4 flex ">
                  <button className="bg-mainWhite text-primary1 px-28 py-2 text-xl font-ralewayBold font-md hover:bg-darkBlack hover:text-mainWhite rounded-[3px]">Search</button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
