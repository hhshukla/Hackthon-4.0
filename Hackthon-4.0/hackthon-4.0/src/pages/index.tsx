import DummyTest from "@/Components/DummyComponent/DummyTest";
import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import SearchFilter from "../Components/SearchFilter/SearchFilter";

const index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <SearchFilter />
        {/* Your additional content goes here */}
      </main>
      <Footer />
    </div>
  );
};

export default index;
