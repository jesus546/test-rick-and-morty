/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      "2xl": { max: "3535px" },
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }
      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }
      md: { max: "767px" }, //1024
      // => @media (max-width: 767px) { ... }
      sm: { max: "649px" }, //768
      // => @media (max-width: 639px) { ... }
    },
    extend: {},
  },
  plugins: [],
};
