import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        artistic: ["var(--font-playfair)", "serif"],
      },
      colors: {
        primary: "rgb(var(--accent-primary-rgb) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary-rgb) / <alpha-value>)",
        background: "rgb(var(--bg-page-rgb) / <alpha-value>)",
        page: "rgb(var(--bg-page-rgb) / <alpha-value>)",
        surface: "rgb(var(--bg-surface-rgb) / <alpha-value>)",
        subtle: "rgb(var(--bg-subtle-rgb) / <alpha-value>)",
        foreground: {
          DEFAULT: "rgb(var(--text-primary-rgb) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary-rgb) / <alpha-value>)",
          muted: "rgb(var(--text-muted-rgb) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent-primary-rgb) / <alpha-value>)",
          soft: "var(--accent-soft)",
        },
      },
      borderColor: {
        subtle: "var(--border-subtle)",
        faint: "var(--border-light)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-hover)",
        cta: "var(--cta-shadow)",
        "cta-hover": "var(--cta-shadow-hover)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "spin-slow": "spin 2.67s linear infinite",
        shimmer: "shimmer 4.3s linear infinite",
        scroll: "scroll 40s linear infinite",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};
export default config;
