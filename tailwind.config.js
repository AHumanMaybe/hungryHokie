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
          bg2: 'var(--off-background)',
          prim: 'var(--primary)',
          prim2: 'var(--primary-varient1)',
          sec: 'var(--secondary)',
          sec2: 'var(--secondary-varient1)',
          acc: 'var(--accent)',
          txt: 'var(--text)',
          cw: '#FFFFFF',
          dc: 'var(--decoration)',
          itb: 'var(--input-textbox)'
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

