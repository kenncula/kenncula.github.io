/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#C9A227',
          'gold-light': '#D4AF37',
        },
      },
      fontFamily: {
        display: ['Cinzel', 'Georgia', 'serif'],
      },
      rotate: {
        '360': '360deg',
      },
      transitionDuration: {
        '1500': '1500ms',
      },
      scale: {
        '175': '1.75',
        '180': '1.80',
        '185': '1.85',
        '200': '2.00',
      }
    },
  },
  plugins: [],
}