/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  extend: {},
  theme: {
    screens: {
      sm: '500px',
      // => @media (min-width: 500px)
      md: '768px',
      // => @media (min-width: 768px)
      lg: '1024px',
      // => @media (min-width: 1024px)
      xl: '1280px',
      // => @media (min-width: 1280px)
      '2xl': '1536px',
      // => @media (min-width: 1536px)
    },
    colors: {
      snow: '#FFFAFA',
      coralRed: '#FF4343',
      begonia: '#FF7171',
      taupeGray: '#878787',
      chineseBlack: '#14161A',
      gunmetal: '#2C313A',
      chineseBlackVoid: '#10131C',
    },
  },
  plugins: [],
};
