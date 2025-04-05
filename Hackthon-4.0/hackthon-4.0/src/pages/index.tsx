// pages/index.tsx

import { ThemeProvider } from "next-themes";
import Banner from "@/Components/Banner/Banner";
import { BannerData } from "@/Components/Banner/Banner.mock";
import React from "react";
import ThemeSwitcher from "@/Components/ThemeSwicher/ThemeSwithcher";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
// import CategoryList from "@/Components/CategoryList/CategoryList";
import CardList from "@/Components/CardList/CardList";
import ChatBot from "@/Components/Chatbot/Chatbot";
import ContentBlock from "@/Components/ContentBlock/ContentBlock";
// import SearchFilter from "@/Components/SearchFilter/SearchFilter";
const Index = () => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <ThemeSwitcher />
      <Header />
      <Banner {...BannerData} />
      <CardList layout="vertical" />
      <ContentBlock />
      {/* <CategoryList /> */}
      {/* <SearchFilter /> */}
      <Footer />
      <ChatBot />
    </ThemeProvider>
  );
};

export default Index;
