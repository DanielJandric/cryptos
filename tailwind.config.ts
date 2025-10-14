import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3b82f6", // blue-500
          600: "#2563eb",
        },
        success: { DEFAULT: "#22c55e" },
        danger: { DEFAULT: "#ef4444" },
        warning: { DEFAULT: "#f59e0b" },
        accent: {
          purple: "#8b5cf6",
          pink: "#ec4899",
          orange: "#fb923c",
        },
      },
      boxShadow: {
        'elevated': '0 10px 25px -5px rgb(0 0 0 / 0.25)',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'gradient': 'gradient-x 8s ease infinite',
        'fade-in': 'fade-in 600ms ease-out both',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6)',
        'orange-red': 'linear-gradient(135deg, #fb923c, #ef4444)',
        'purple-pink': 'linear-gradient(135deg, #8b5cf6, #ec4899)',
      },
    },
  },
  plugins: [],
};

export default config;


