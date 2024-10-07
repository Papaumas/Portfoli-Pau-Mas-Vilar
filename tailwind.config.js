/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'default-bg': '#ECEBF7',
      },
      fontFamily: {
        noto: ['Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}