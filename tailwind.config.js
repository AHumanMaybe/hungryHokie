/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
          bg: 'var(--background)',
          prim: 'var(--primary)',
          sec: 'var(--secondary)',
          acc: 'var(--accent)',
          txt: 'var(--text)'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
      width: {
        '128': '32rem',
        '160': '40rem',
        '200': '50rem',
        '256': '64rem',
      },
      height: {
        '128': '32rem',
        '160': '40rem',
        '200': '50rem',
        '256': '64rem',
      }},
  },
  plugins: [],
}

