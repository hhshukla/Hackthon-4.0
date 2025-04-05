"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { CategoryListData } from "./CategoryList.mock";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";

type Product = {
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  category: string;
  rating: number;
};

const ITEMS_PER_PAGE_DESKTOP = 9;
const ITEMS_PER_PAGE_MOBILE = 4;

const CategoryList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  // Update the sortOrder type
  const [sortOrder, setSortOrder] = useState<
    "asc" | "desc" | "rating-high" | "rating-low"
  >("asc");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [mounted, setMounted] = useState<boolean>(false);
  const [facetOpen, setFacetOpen] = useState<boolean>(true);
  const [selectedFacets, setSelectedFacets] = useState<Set<string>>(new Set());

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    setMounted(true);
  }, []);
  const { theme, systemTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;
  const itemsPerPage =
    windowWidth < 768 ? ITEMS_PER_PAGE_MOBILE : ITEMS_PER_PAGE_DESKTOP;

  const categories: string[] = useMemo(() => {
    const allCategories = CategoryListData.flatMap((item) =>
      item.data.map((dataItem) => dataItem.Category)
    );
    return ["All", ...Array.from(new Set(allCategories))];
  }, []);

  const filteredData: Product[] = useMemo(() => {
    let allProducts = CategoryListData.flatMap((item) =>
      item.data.map((product) => ({
        title: product.Title,
        description: product.Description,
        thumbnail: product.Images[0],
        price: product.Price,
        category: product.Category,
        rating: product.Rating, // Add rating to the mapped product
      }))
    );

    if (selectedCategory !== "All") {
      allProducts = allProducts.filter(
        (item) => item.category === selectedCategory
      );
    }

    if (selectedFacets.size > 0) {
      allProducts = allProducts.filter((item) =>
        selectedFacets.has(item.category)
      );
    }

    if (searchQuery) {
      allProducts = allProducts.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Update the sorting logic
    switch (sortOrder) {
      case "asc":
        allProducts.sort((a, b) => a.price - b.price);
        break;
      case "desc":
        allProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating-high":
        allProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "rating-low":
        allProducts.sort((a, b) => a.rating - b.rating);
        break;
    }

    return allProducts;
  }, [searchQuery, sortOrder, selectedCategory, selectedFacets]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Trigger search when voice stops
  useEffect(() => {
    if (!listening && transcript) {
      setSearchQuery(transcript);
      setCurrentPage(1);
    }
  }, [listening, transcript]);

  const startListening = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Browser does not support speech recognition.");
      return;
    }
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const toggleFacet = () => setFacetOpen(!facetOpen);

  const toggleCheckbox = (category: string) => {
    const updatedFacets = new Set(selectedFacets);
    if (updatedFacets.has(category)) {
      updatedFacets.delete(category);
    } else {
      updatedFacets.add(category);
    }
    setSelectedFacets(updatedFacets);
    setCurrentPage(1);
  };

  if (!mounted) return null;

  return (
    <div
      className={`flex flex-col lg:flex-row p-4 gap-6 mt-6 border-y-2 ${
        currentTheme === "light"
          ? " bg-white border border-black"
          : " bg-black border border-white"
      }`}
    >
      {/* Left Facets Sidebar */}
      <div className="w-full md:w-64">
        {/* Category Dropdown */}
        <div className="mb-6 text-white">
          <select
            className={`border px-3 py-1 rounded-md w-full ${
              currentTheme === "dark"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Accordion Facet Filter */}
        <div className="border rounded-md overflow-hidden">
          <button
            onClick={toggleFacet}
            className="w-full px-4 py-2 font-semibold text-left bg-gray-100 hover:bg-gray-200 text-black flex items-center justify-between"
          >
            <span>Filter by Category</span>
            <svg
              className={`w-4 h-4 transform transition-transform duration-300 ${
                facetOpen ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <AnimatePresence initial={false}>
            {facetOpen && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-4 py-2 bg-white border-t"
              >
                <div className="space-y-2">
                  {categories
                    .filter((cat) => cat !== "All")
                    .map((category, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-2 text-black"
                      >
                        <input
                          type="checkbox"
                          checked={selectedFacets.has(category)}
                          onChange={() => toggleCheckbox(category)}
                        />
                        {category}
                      </label>
                    ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Product Grid */}
      <div className="flex-1 space-y-6">
        {/* Top Controls */}
        <div className="flex flex-wrap gap-4 items-center justify-between ">
          {/* Search */}
          <div
            onClick={listening ? stopListening : startListening}
            className={`flex relative w-full sm:w-auto border px-3 py-1 rounded-md  justify-center items-center outline-none transition-all duration-300 ${
              listening
                ? "border-red-500 text-red-500 animate-pulse"
                : "border-gray-400 text-gray-500"
            }`}
            title={listening ? "Stop voice search" : "Start voice search"}
          >
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-md w-64 bg-transparent outline-none ${
                currentTheme === "dark" ? "text-white" : "text-black"
              }`}
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 14a3 3 0 003-3V5a3 3 0 00-6 0v6a3 3 0 003 3zm5-3a5 5 0 01-10 0H5a7 7 0 0014 0h-2zm-5 7a1 1 0 00-1 1v2h2v-2a1 1 0 00-1-1z" />
            </svg>

            {listening && (
              <p className="text-green-600 text-sm mt-2">Listening... 🎙️</p>
            )}
            <button
              onClick={() => {
                setSearchQuery("");
                resetTranscript(); // Clear the transcript
                setCurrentPage(1);
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-black rounded-full p-1 w-6 h-6 flex items-center justify-center"
              title="Clear search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Sort */}
          <select
            className={`border px-3 py-1 rounded-md text-black ${
              currentTheme === "dark" ? "text-white" : "text-black"
            }`}
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(
                e.target.value as "asc" | "desc" | "rating-high" | "rating-low"
              )
            }
          >
            <option value="asc">Price: Low → High</option>
            <option value="desc">Price: High → Low</option>
            <option value="rating-high">Rating: High → Low</option>
            <option value="rating-low">Rating: Low → High</option>
          </select>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {paginatedData.map((data, index) => (
            <div
              key={index}
              className={`shadow-lg rounded-xl overflow-hidden ${
                currentTheme === "dark"
                  ? "bg-black text-white border-2 border-white"
                  : "bg-white text-black"
              }`}
            >
              <Image
                src={data?.thumbnail}
                alt={data?.title}
                layout="responsive"
                width={400}
                height={300}
                className="w-full h-44 object-contain p-4"
              />
              <div
                className={`px-4 pb-4 ${
                  currentTheme === "dark" ? "text-white" : "text-black"
                }`}
              >
                <h3 className="text-lg font-semibold mb-2">{data?.title}</h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                  {data.description}
                </p>
                <div className="text-base font-bold text-pink-600">
                  ${data.price.toFixed(2)}
                </div>
                <div className="text-base font-bold text-pink-600">
                  Rating: {data.rating} ⭐
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-black px-4 py-3 sm:px-6 mb-6 rounded-lg mt-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                ${
                  currentPage === 1
                    ? "text-gray-400 bg-gray-100 dark:text-gray-500 dark:bg-gray-800"
                    : "text-gray-700 bg-white hover:bg-gray-50 dark:text-gray-200 dark:bg-black dark:hover:bg-gray-800"
                }`}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                ${
                  currentPage === totalPages
                    ? "text-gray-400 bg-gray-100 dark:text-gray-500 dark:bg-gray-800"
                    : "text-gray-700 bg-white hover:bg-gray-50 dark:text-gray-200 dark:bg-black dark:hover:bg-gray-800"
                }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-200">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, filteredData.length)}
                </span>{" "}
                of <span className="font-medium">{filteredData.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center rounded-l-md px-2 py-2
                    ${
                      currentPage === 1
                        ? "text-gray-400 bg-gray-100 dark:text-gray-500 dark:bg-gray-800"
                        : "text-gray-700 bg-white hover:bg-gray-50 dark:text-gray-200 dark:bg-black dark:hover:bg-gray-800"
                    }`}
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold
                      ${
                        currentPage === idx + 1
                          ? "z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:text-gray-200 dark:ring-gray-700 dark:hover:bg-gray-800"
                      }`}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2
                    ${
                      currentPage === totalPages
                        ? "text-gray-400 bg-gray-100 dark:text-gray-500 dark:bg-gray-800"
                        : "text-gray-700 bg-white hover:bg-gray-50 dark:text-gray-200 dark:bg-black dark:hover:bg-gray-800"
                    }`}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
