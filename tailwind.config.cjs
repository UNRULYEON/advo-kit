/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Open Sans', ...fontFamily.sans],
    },
    extend: {
      spacing: {
        'fill-available': '-webkit-fill-available',
      },
      colors: {
        coolblue: '#0090E3',
        'dark-blue': '#285DAB',
        'hot-orange': '#FF6B00',
        'cool-black': '#111111',
        'gray-blue': '#F2F7FC',
        'evening-blue': '#1E4680',
        'curious-blue': '#199BE5',
        navy: '#003366',
        silver: '#BBBBBB',
        gray: '#DDDDDD',
        brightgrey: '#eee',
      },
    },
  },
  plugins: [],
};
