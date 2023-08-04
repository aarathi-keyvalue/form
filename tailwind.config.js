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
        warningRed: "#F55E5E",
        hawksBlue: "#D4DDFC",
        cloud: "#C4C4C4",
      },
      animation: {
        "slide-to-top": "slide-top ease-in forwards 0.7s",
        "slide-to-bottom": "slide-bottom ease-out forwards 0.7s",
      },
      keyframes: {
        "slide-top": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0%)" },
        },
        "slide-bottom": {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
    },
  },
  plugins: [],
};
