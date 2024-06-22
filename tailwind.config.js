
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'header-bc' : '#131921',
        'header-text': '#B5B6B7'
      },
    },
  },
  plugins: [],
}
