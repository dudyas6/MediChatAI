/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#128ef3", // Primary color
        secondary: "#75c6fc", // Secondary color
        background: "#f7f7f7", // Background color
      },
    },
    screens: {
      xs: "331px",
      sm: "480px",
      md: "768px",
      lg: "1124px",
      xl: "1440px",
    },
  },
  plugins: [require("flowbite/plugin")],
};
