import Banner from "@/Components/Banner/Banner";
import { BannerData } from "@/Components/Banner/Banner.mock";
import DummyTest from "@/Components/DummyComponent/DummyTest";
import React from "react";
import "../styles/globals.css";

const index = () => {
  return (
    <div>
      <DummyTest />
      <Banner {...BannerData} />
    </div>
  );
};

export default index;
