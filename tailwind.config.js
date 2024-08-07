/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/lib/**/*.js",
  ],
  darkMode: 'class',
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
  plugins: [
    require('flowbite/plugin')
  ],
}
