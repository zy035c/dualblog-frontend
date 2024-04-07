/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pigliver: {
          50: "#f9f6f8",
          100: "#f4eff2",
          200: "#e9e1e6",
          300: "#d8c9d0",
          400: "#c0a6b3",
          500: "#aa8a99",
          600: "#926f7d",
          700: "#7b5b67",
          800: "#674d56",
          900: "#58434a",
          950: "#332429",
        },
        gumi: {
          red: "#F95860",
          green: "#AAD898",
          orange: "#FAAF5C",
          yellow: "#FDF791",
          white: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
