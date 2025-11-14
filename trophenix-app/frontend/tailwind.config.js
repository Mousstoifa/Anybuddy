/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'scroll-left': 'scroll-left 80s linear infinite',
        'scroll': 'scroll 30s linear infinite',
      },
      keyframes: {
        'scroll-left': {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(-100%)' }
        },
        'scroll': {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(-50%)' }
        }
      }
    },
  },
  plugins: [],
}
