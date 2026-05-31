import typography from "@tailwindcss/typography";

const config = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        accent: {
          DEFAULT: "#fbbf24",
          light: "#fcd34d",
          dark: "#f59e0b",
        },
        surface: {
          DEFAULT: "rgba(255,255,255,0.03)",
          hover: "rgba(255,255,255,0.05)",
          border: "rgba(255,255,255,0.06)",
          "border-hover": "rgba(255,255,255,0.1)",
        },
      },
      transitionDuration: {
        DEFAULT: "280ms",
      },
    },
  },
  plugins: [typography],
};

export default config;
