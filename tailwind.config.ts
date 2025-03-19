import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(2deg)" },
          "100%": { transform: "translateY(0px) rotate(0deg)" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": { 
            opacity: "1",
            transform: "scale(1)",
            boxShadow: "0 0 0 0 rgba(var(--primary-rgb), 0.7)"
          },
          "50%": { 
            opacity: "0.95",
            transform: "scale(1.05)",
            boxShadow: "0 0 20px 5px rgba(var(--primary-rgb), 0.3)"
          },
        }
      },
      animation: {
        "fade-in": "fade-in 0.7s ease-out",
        "fade-in-up": "fade-in-up 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        "float": "float 5s ease-in-out infinite",
        "slide-in-left": "slide-in-left 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-in-right": "slide-in-right 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        "scale-in": "scale-in 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config

export default config 