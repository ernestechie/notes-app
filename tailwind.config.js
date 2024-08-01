/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#061c36',
        secondary: '#fc730e',
      },
    },
  },
  plugins: [],
};
