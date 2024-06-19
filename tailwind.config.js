/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./views/*.ejs"
  ],
  theme: {
    extend: {
      colors: {
        secondary: 'rgb(238, 238, 238)',
      },
      boxShadow: {
        'yellow-bottom': '0 4px 6px -1px rgba(252, 211, 77, 0.5), 0 2px 4px -1px rgba(252, 211, 77, 0.25)',
      }
    },
  },
  plugins: [],
}

