/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yt-black': '#0f0f0f',
        'yt-light-black': '#1a1a1a',
        'yt-gray': '#272727',
        'yt-light-gray': '#3f3f3f',
        'yt-white': '#ffffff',
        'yt-spec-text-primary': '#f1f1f1',
        'yt-spec-text-secondary': '#aaaaaa',
        'yt-red': '#ff0000',
        'yt-blue': '#3ea6ff',
      },
      fontFamily: {
        'roboto': ['Roboto', 'Arial', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      boxShadow: {
        'yt': '0 2px 8px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}
