
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
        'header-text': '#B5B6B7',
        'facebook': '#1877f2',
        'twitter': '#1da1f2',
        'linkedin': '#0a66c2',
        'instagram': '#c32aa3'
      },
    },
  },
  plugins: [],
}
