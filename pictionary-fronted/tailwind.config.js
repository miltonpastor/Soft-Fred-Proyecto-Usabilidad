/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue01: "#123595",
        blue02: "#204AD0",
        green01: "#38C41C"
      }
    },
  },
  plugins: [],
}

