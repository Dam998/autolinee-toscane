import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#151A1E",
        green: "#58F57B",
        red: "#FF4E4E",
        blue: "#4690FF",
        yellow: "#FFDB5B",
        orange: "#FFA463",
        purple: "#9A5CFF",
        white: "#FFFFFF",

        "black-dark": "#101316",
        "green-dark": "#003A25",
        "red-dark": "#4A0000",
        "blue-dark": "#002152",
        "yellow-dark": "#3D2F00",
        "orange-dark": "#502100",
        "purple-dark": "#2C0073",
        "white-dark": "#C9D2D9",

        "black-light": "#2F3A42",
        "green-light": "#C6FFD2",
        "red-light": "#FF9D9D",
        "blue-light": "#92BDFF",
        "yellow-light": "#FFF2C3",
        "orange-light": "#FFCDA9",
        "purple-light": "#D9C1FF",
      },
    },
  },
  plugins: [],
};
export default config;
