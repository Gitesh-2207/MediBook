/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:"#5f6FFF",
        brand: "#1E40AF", // example custom blue
      },
    },
  },
  plugins: [],
}
