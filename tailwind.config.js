/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#2653F1",
        comet: "#5B6275",
        davyGrey: "#4B5563",
        harp: "#E9EDF2",
        warningRed: '#F55E5E',
        hawksBlue: '#D4DDFC',
        cloud: '#C4C4C4',
      },
    },
  },
  plugins: [],
};
