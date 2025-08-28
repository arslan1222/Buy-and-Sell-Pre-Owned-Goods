/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#056135",
        'primary2': "#cae4d7",
        'primaryhover': "#1f754b"
      },
      gridTemplateColumns: {
        'auto' : 'repeat(auto-fill, minmax(200px, 1fr))'
      }
    },

  },
  plugins: [],
}