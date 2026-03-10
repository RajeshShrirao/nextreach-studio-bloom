# Theme

## `tailwind.config.ts`

```tsx
import type { Config } from "tailwindcss";

export default {
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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "Monaco", "Consolas", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

## `src/index.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;200;300;400;500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 220 26% 14%;
    --card: 0 0% 100%;
    --card-foreground: 220 26% 14%;
    --card-subtle: 220 14% 96%;
    --primary: 221 83% 53%;
    --primary-foreground: 0 0% 100%;
    --accent: 142 71% 45%;
    --accent-foreground: 0 0% 100%;
    --muted: 220 14% 96%;
    --muted-foreground: 220 8% 46%;
    --border: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: 221 83% 53%;
    --radius: 0.75rem;
    --gradient-primary: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-light)));
    --gradient-brand: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)));
  }
}
```
