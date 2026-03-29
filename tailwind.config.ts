const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
  plugins: [],
};

export default config;
