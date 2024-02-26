/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        128: "38pc",
        120: "30pc",
        110: "15pc",
      },
      width: {
        128: "44pc",
        120: "30pc",
        111: "15pc",
        110: "25pc",
      },
      margin: {
        120: "377px",
        101: "323px",
      },
      lineHeight: {
        12: "14.25rem",
      },
    },
  },
  plugins: [],
};
