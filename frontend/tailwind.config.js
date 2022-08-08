const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: { min: "0px", max: "475px" },
      ...defaultTheme.screens,
    },
    maxWidth: {
      input: "80px",
    },
    extend: {},
  },
  plugins: [],
};
