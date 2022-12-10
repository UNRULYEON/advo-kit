/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        'coolblue': '#0090E3',
        'dark-blue': '#285DAB',
        'hot-orange': '#FF6B00',
      },
    },
  },
  plugins: [],
}
