/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ABEF5F",
        "primary-light": "#ABEF5F80",
        "text-black": "#1C1C1C",
      },
      fontFamily: {
        lato: ["Lato", "serif"],
        poppins: ["Poppins", "serif"],
      },
    },
  },
  plugins: [daisyui],
};
