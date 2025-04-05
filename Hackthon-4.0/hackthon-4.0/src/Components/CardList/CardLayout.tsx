import React, { useState } from "react";
import CardList from "./CardList";

const CardListWrapper = () => {
  const [layout, setLayout] = useState<"vertical" | "horizontal">("vertical");

  return (
    <div className="p-4">
      {/* Layout Switch Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setLayout("vertical")}
          className={`px-4 py-2 rounded ${
            layout === "vertical"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Vertical
        </button>
        <button
          onClick={() => setLayout("horizontal")}
          className={`px-4 py-2 rounded ${
            layout === "horizontal"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Horizontal
        </button>
      </div>

      {/* Pass Layout Prop */}
      <CardList layout={layout} />
    </div>
  );
};

export default CardListWrapper;
