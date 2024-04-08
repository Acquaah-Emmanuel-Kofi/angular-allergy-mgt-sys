/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'history-card-bg': "url('/assets/images/history-card-bg.jpg')",
        'facts-bg': "url('/assets/images/patreon.jpeg')",
        'landing-bg': "url('/assets/images/landing-bg.webp')"
      },
      fontSize: {
        'sm': '14px',
      },
      width: {
        'half-width': "50%",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}