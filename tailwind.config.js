/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'taxman-charcoal': '#1a1a1a',
        'taxman-black': '#0a0a0a',
        'taxman-offwhite': '#f5f5dc',
        'taxman-gold': '#b8860b',
        'taxman-green': '#00ff41',
        'taxman-red': '#ff0033',
      },
      fontFamily: {
        'headline': ['Bebas Neue', 'Impact', 'sans-serif'],
        'body': ['Inter', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

