import { ThemeProvider } from "next-themes";
import Banner from "@/Components/Banner/Banner";
import { BannerData } from "@/Components/Banner/Banner.mock";
import DummyTest from "@/Components/DummyComponent/DummyTest";
import React from "react";
import "../styles/globals.css";
import ThemeSwitcher from "@/Components/ThemeSwicher/ThemeSwithcher";

const index = () => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <ThemeSwitcher />
      <Banner {...BannerData} />
      <DummyTest />
    </ThemeProvider>
  );
};

export default index;
