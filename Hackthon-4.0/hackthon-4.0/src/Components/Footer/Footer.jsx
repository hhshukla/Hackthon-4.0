import React from "react";
import { useTheme } from "next-themes";

const Footer = () => {
  const { theme, systemTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <footer
      className={`${
        currentTheme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }"bg-black text-white"`}
    >
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <img
                src="file-6JcaQAPzYXvw9RwLXzkjGv (1).jpg"
                className="h-10 w-10 rounded-lg shadow-lg"
                alt="The Errors Logo"
              />
              <span
                className={` ${
                  currentTheme === "dark" ? " text-white" : " text-black"
                } text-xl font-bold`}
              >
                The Errors
              </span>
            </div>
            <p
              className={` ${
                currentTheme === "dark" ? " text-white" : " text-black"
              } text-xl font-bold`}
            >
              Innovating the future, one line of code at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div
            className={`${
              currentTheme === "dark" ? " text-white" : " text-black"
            } "text-center"`}
          >
            <div className="flex justify-center gap-8">
              <a
                href="#"
                className="hover:text-gray-400 transition-colors duration-300 flex items-center gap-2"
              >
                <span>About</span>
              </a>
              <a
                href="#"
                className="hover:text-gray-400 transition-colors duration-300 flex items-center gap-2"
              >
                <span>Services</span>
              </a>
              <a
                href="#"
                className="hover:text-gray-400 transition-colors duration-300 flex items-center gap-2"
              >
                <span>Contact</span>
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div
            className={`text-center md:text-right ${
              currentTheme === "dark" ? " text-white" : " text-black"
            }`}
          >
            <div className="flex justify-center md:justify-end gap-6">
              <a
                href="#"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© 2024 The Errors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
