import type { Config } from "tailwindcss";

export default {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: '#9A1111',
        secondary: '#718096',
        tertiary: '#fffcf8',
        light_brown: '#fff6ea',
      },
    }
  },
  plugins: [],
} satisfies Config;
