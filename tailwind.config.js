/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        "brand-violet": "var(--brand-color-1)",
        "brand-cyan": "var(--brand-color-2)",
        "brand-blue": "var(--brand-color-3)",
        "brand-black": "var(--brand-color-4)",
      },
    },
  },
  plugins: [],
};
