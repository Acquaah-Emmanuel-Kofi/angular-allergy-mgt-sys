/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'history-card-bg': "url('/assets/images/history-card-bg.jpg')",
        'facts-bg': "url('/assets/images/patreon.jpeg')",
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}