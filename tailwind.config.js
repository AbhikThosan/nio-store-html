/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./assets/**/*.{js,html}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        "brand-voilet": "var(--brand-color-1)", // #816BFF
        "brand-cyan": "var(--brand-color-2)", // #1FCEC9
        "brand-blue": "var(--brand-color-3)", // #4B97D3
        "brand-black": "var(--brand-color-4)", // #3B4747
      },
    },
  },
  plugins: [],
};
