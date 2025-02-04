/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#121063',
        tahiti: '#3ab7bf',
        bermuda: '#78dcca',
        purple: '#7c4dff',
        white: '#ffffff',
        gray100: '#f5f5f5',
        gray200: '#eeeeee',
      }
    },
  },
  plugins: [],
}

