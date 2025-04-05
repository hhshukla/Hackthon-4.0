/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ Include your src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
