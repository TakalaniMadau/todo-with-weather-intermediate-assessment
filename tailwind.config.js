/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/views/**/*.{erb,html}",
    "./app/helpers/**/*.rb",
    "./app/assets/stylesheets/**/*.css",
    "./app/javascript/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
};
