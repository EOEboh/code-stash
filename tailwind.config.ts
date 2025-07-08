/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563eb", // blue-600
          hover: "#1d4ed8", // blue-700
          dark: "#1e40af", // blue-800
          light: "#bfdbfe", // blue-200
        },
        accent: {
          purple: "#9333ea", // purple-600
          green: "#16a34a", // green-600
        },
        neutral: {
          900: "#111827", // gray-900
          600: "#4b5563", // gray-600
          500: "#6b7280", // gray-500
        },
        background: {
          light: "#f8fafc", // slate-50
          soft: "#eff6ff", // blue-50
          subtle: "#e0e7ff", // indigo-100
        },
        // background: "var(--background)",
        // foreground: "var(--foreground)",
        // sidebar: {
        //   DEFAULT: "hsl(var(--sidebar-background))",
        //   foreground: "hsl(var(--sidebar-foreground))",
        //   primary: "hsl(var(--sidebar-primary))",
        //   "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
        //   accent: "hsl(var(--sidebar-accent))",
        //   "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
        //   border: "hsl(var(--sidebar-border))",
        //   ring: "hsl(var(--sidebar-ring))",
        // },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
} satisfies Config;
