import type { Config } from "tailwindcss";

const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        white100: "#F7FAFC",
        green: "#1C4532",
        black: "#171923",
        grey: "#718096",
        slate: "#A0AEC0",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        outfit: ["var(--font-outfit)"],
        jk_sans: ["var(--font-jk_sans)"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
