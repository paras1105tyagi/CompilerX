/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        blob1: "blob1 18s ease-in-out infinite",
        blob2: "blob2 22s ease-in-out infinite",
        blob3: "blob3 26s ease-in-out infinite",
      },
      keyframes: {
        blob1: {
          "0%, 100%": { transform: "scale(1) translate(0, 0)" },
          "33%": { transform: "scale(1.1) translate(30px, -20px)" },
          "66%": { transform: "scale(0.95) translate(-20px, 20px)" },
        },
        blob2: {
          "0%, 100%": { transform: "scale(1) translate(0, 0)" },
          "25%": { transform: "scale(1.05) translate(-20px, 30px)" },
          "50%": { transform: "scale(0.9) translate(40px, -10px)" },
          "75%": { transform: "scale(1.1) translate(-10px, -30px)" },
        },
        blob3: {
          "0%, 100%": { transform: "scale(1) translate(0, 0)" },
          "20%": { transform: "scale(1.08) translate(10px, 10px)" },
          "60%": { transform: "scale(0.92) translate(-15px, -25px)" },
        },
      },
    },
  },
  plugins: [],
}

