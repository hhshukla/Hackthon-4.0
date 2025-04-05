import { ThemeProvider } from "next-themes";
import Banner from "@/Components/Banner/Banner";
import { BannerData } from "@/Components/Banner/Banner.mock";
import DummyTest from "@/Components/DummyComponent/DummyTest";
import React from "react";
import "../styles/globals.css";
import ThemeSwitcher from "@/Components/ThemeSwicher/ThemeSwithcher";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";

const index = () => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <ThemeSwitcher />
      <Header />
      <Banner {...BannerData} />
      <DummyTest />
      <Footer />
    </ThemeProvider>
  );
};

export default index;
