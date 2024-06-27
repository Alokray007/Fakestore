
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'header-bc' : '#FAFBFC',
        'header-text': '#B5B6B7',
        'cart-btn': '#802C6E',
        'facebook': '#1877f2',
        'twitter': '#1da1f2',
        'linkedin': '#0a66c2',
        'instagram': '#c32aa3'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
