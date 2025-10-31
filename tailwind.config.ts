import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "gentle-glow": "gentle-glow 4s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "gentle-glow": {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1) rotate(0deg)",
          },
          "50%": {
            opacity: "0.8",
            transform: "scale(1.1) rotate(180deg)",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;