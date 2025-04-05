import React from "react";
import CategoryList from "@/Components/CategoryList/CategoryList";
// import SearchFilter from '@/Components/SearchFilter/SearchFilter';
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import { ThemeProvider } from "next-themes";
import ThemeSwitcher from "@/Components/ThemeSwicher/ThemeSwithcher";

const ProductsPage = () => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <ThemeSwitcher />
      <Header />
      <CategoryList />
      <Footer />
    </ThemeProvider>
  );
};

export default ProductsPage;
