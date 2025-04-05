import CardList from "@/Components/CardList/CardList";
import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import React from "react";

const service = () => {
  return (
    <div>
      <Header />
      <CardList layout="horizontal" />

      <Footer />
    </div>
  );
};

export default service;
