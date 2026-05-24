/** @type {import('tailwindcss').Config} */

function withAccentVar(varName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgb(var(${varName}) / ${opacityValue})`;
    }
    return `rgb(var(${varName}))`;
  };
}

export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: withAccentVar('--accent'),
          'gold-light': withAccentVar('--accent-light'),
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