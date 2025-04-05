import React, { useState } from "react";
import { useTheme } from "next-themes";
import ThemeSwitcher from "../ThemeSwicher/ThemeSwithcher";
import Link from "next/link";
import { useRouter } from "next/router"; // Add this import

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter(); // Add router

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { theme, systemTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  // Function to determine if link is active
  const isActive = (path) => router.pathname === path;

  return (
    <nav
      className={` ${
        currentTheme === "dark" ? "bg-black text-white" : "bg-white text-black"
      } shadow-md fixed w-full z-20 top-0 start-0`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-6 py-3">
        <a href="/" className="flex items-center gap-3">
          <img
            src="file-6JcaQAPzYXvw9RwLXzkjGv (1).jpg"
            className="h-10 w-10 rounded"
            alt="The Errors Logo"
          />
          <span
            className={` ${
              currentTheme === "dark" ? " text-white" : " text-black"
            } text-xl font-bold`}
          >
            The Errors
          </span>
        </a>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md font-medium"
          >
            Let's Connect
          </button>
          <button
            onClick={toggleMenu}
            type="button"
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-full left-0 right-0 ${
            currentTheme === "dark" ? "bg-black" : "bg-white"
          } shadow-md md:shadow-none md:relative md:flex md:w-auto md:bg-transparent`}
        >
          <ul className="flex flex-col md:flex-row md:items-center p-4 md:p-0 gap-4">
            <li>
              <Link
                href="/"
                className={`${
                  isActive("/")
                    ? "text-blue-600 font-bold border-b-2 border-blue-600"
                    : `${
                        currentTheme === "dark" ? "text-white" : "text-gray-600"
                      } hover:text-blue-600`
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className={`${
                  isActive("/products")
                    ? "text-blue-600 font-bold border-b-2 border-blue-600"
                    : `${
                        currentTheme === "dark" ? "text-white" : "text-gray-600"
                      } hover:text-blue-600`
                }`}
              >
                Products
              </Link>
            </li>
            <li>
              <a href="/service" className="text-gray-600 hover:text-blue-600">
                Services
              </a>
            </li>
            <li>
              <Link
                href="/contact"
                className={`${
                  isActive("/contact")
                    ? "text-blue-600 font-bold border-b-2 border-blue-600"
                    : `${
                        currentTheme === "dark" ? "text-white" : "text-gray-600"
                      } hover:text-blue-600`
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Header;
