/** @type {import('tailwindcss').Config} */
export default {
  // THIS LINE IS THE KEY
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}