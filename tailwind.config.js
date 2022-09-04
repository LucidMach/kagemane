/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "shikamaru-green-900": "#31601e",
        "shikamaru-green-500": "#547A44",
        "shikamaru-green-100": "#a2b69a",
      },
    },
  },
  plugins: [],
};
