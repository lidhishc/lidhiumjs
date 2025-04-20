/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./apps/**/*.{vue,jsx,tsx}",
    "./apps/**/*.vue",
    "./global/**/*.{vue,jsx,tsx}",
    "./global/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e6f0ff",
          100: "#cce0ff",
          200: "#99c2ff",
          300: "#66a3ff",
          400: "#3385ff",
          500: "#0066ff",
          600: "#0052cc",
          700: "#003d99",
          800: "#002966",
          900: "#001433",
          950: "#000919",
        },
        secondary: {
          50: "#e6eeff",
          100: "#b3cbff",
          200: "#80a8ff",
          300: "#4d85ff",
          400: "#1a62ff",
          500: "#0047e6",
          600: "#0038b3",
          700: "#002980",
          800: "#001a4d",
        },
      },
    },
  },
  plugins: [],
};
