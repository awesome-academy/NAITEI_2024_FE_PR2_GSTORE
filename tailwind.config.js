/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        playball: [['Playball', 'cursive']],
        raleway: [['Raleway Variable', 'sans-serif']]
      }
    }
  },
  plugins: []
}
