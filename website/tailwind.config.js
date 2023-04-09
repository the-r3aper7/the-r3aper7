/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        signika: ['Signika', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        'matte-black': '#28282B',
      }
    },
  },
  plugins: [],
};
