/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'DM Sans', 'sans-serif'],
      },
      colors: {
        ink: '#07173a',
        primary: '#FF6B5C',
        coral: '#FF6B5C',
        orange: '#FF9F45',
        primarySoft: '#FFB36B',
        cyan: '#22D3EE',
        blue: '#3B82F6',
      },
    },
  },
  plugins: [],
};
