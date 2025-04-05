import DummyTest from "@/Components/DummyComponent/DummyTest";
import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

const index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Your main content goes here */}
      </main>
      <Footer />
    </div>
  );
};

export default index;
