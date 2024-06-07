import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

const config = withUt({
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          purple: "#9333EA",
          violet: "#4957CC",
          "soft-violet": "#243E63",
          green: "#5CB139",
          "soft-green": "#F5EFE6",
          "medium-green": "#E8DFCA",
          "high-green": "#4F6F52",
          "dark-green": "#1A4D2E",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          opsional: "#ff7e33",
          navy: "#135DB3",
          yellow: "#FFCE52",
          "subtle-yellow": "#FFF5E5",
          "subtle-blue": "#63D6FA",
          "soft-blue": "#6FCBFD",
          orange: "#DC5B1A",
          green: "#35AC32",
          red: "#B00020",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          red: "#F13024",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "inner-shadow-light": "inset 0 0 0 9px rgb(255 255 255 / 30%)",
        "inner-shadow-primary": "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)",
        1: "0px 1px 2px rgba(0, 0, 0, 0.05), 0px 1px 3px 1px rgba(0, 0, 0, 0.03)",
        2: "0px 1px 2px rgba(159, 159, 159, 0.1), 0px 2px 6px 2px rgba(149, 149, 149, 0.05)",
        3: "0px 4px 8px 3px rgba(149, 149, 149, 0.05), 0px 2px 2px rgba(37, 37, 37, 0.05)",
        4: "1px 4px 15px rgba(57, 57, 57, 0.1)",
        5: "0px 12.5216px 11.1442px rgba(37, 37, 37, 0.03), 0px 6.6501px 5.91859px rgba(37, 37, 37, 0.02), 0px 2.76726px 2.46286px rgba(37, 37, 37, 0.01)",
        6: "2px 1px 20px rgba(138, 138, 138, 0.1), -2px 1px 10px 1px rgba(0, 0, 0, 0.05)",
        7: "0px 16px 48px rgba(0, 0, 0, 0.25)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
}) satisfies Config;

export default config;
