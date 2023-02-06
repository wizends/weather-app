/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        thundery: 'url(/src/assets/1087.jpg)'
      },
      gridTemplateColumns: {
        aside: '.5fr auto'
      },
      colors: {
        bgBlue: '#2b2048',
        bgPurple: '#301a4b',
        borderWhite: '#ffffff29'
      }

    }
  },
  plugins: []
}
