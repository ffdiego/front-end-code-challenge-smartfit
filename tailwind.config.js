module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gotham: ["Gotham", "sans-serif"],
      },
      colors: {
        sf: {
          "dark-grey": "#333333",
          "medium-grey": "#808080",
          "light-grey": "#ededed",
          yellow: "#FFB612",
          red: "#dc0a17",
          green: "#2FC022",
        },
      },
    },
  },
  plugins: [],
};
