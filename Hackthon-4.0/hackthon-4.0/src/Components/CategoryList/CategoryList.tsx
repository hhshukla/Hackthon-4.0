import React from "react";
import Image from "next/image";
import { CategoryListData } from "./CategoryList.mock";

const CategoryList = () => {
  return (
    <div className="relative w-full overflow-x-auto whitespace-nowrap flex space-x-4 p-4 bg-gray-50">
      {CategoryListData?.map((data, index) => (
        <div
          key={index}
          className="inline-block w-72 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200"
        >
          <Image
            src={data?.thumbnail}
            alt={data?.title}
            layout="responsive"
            width={400}
            height={300}
            className="w-full h-44 object-contain p-4"
          />
          <div className="px-4 pb-4">
            <h3 className="text-lg font-semibold mb-2">{data.title}</h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-3">
              {data?.description}
            </p>
            <div className="text-base font-bold text-pink-600">
              ${data?.price?.toFixed(2)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
