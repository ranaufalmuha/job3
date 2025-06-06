/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "highlight": "#0052ff",
        "headlines": "#1d1d1f",
        "description": "#555e67",
      },
    },
  },
  plugins: [],
}

