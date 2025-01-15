/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ABEF5F",
        "primary-light": "#ABEF5F80",
        "dark-01": "#1C1C1C",
        deleteColor: "#fa3f19",
        updateColor: "#f4a62a",
      },
      fontFamily: {
        lato: ["Lato", "serif"],
        poppins: ["Poppins", "serif"],
      },
    },
  },
  plugins: [daisyui],
};
