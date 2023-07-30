/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-gray": "#f3f3f3",
        "custom-blue": "#d0e2f4",
      },
    },
  },
  plugins: [],
};
