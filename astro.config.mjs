import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.nextreachstudio.com",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    mdx(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      customPages: [
        "https://www.nextreachstudio.com/tools/ai-token-calculator",
        "https://www.nextreachstudio.com/tools/llm-cost-calculator",
        "https://www.nextreachstudio.com/tools/context-window-calculator",
        "https://www.nextreachstudio.com/tools/vram-estimator",
        "https://www.nextreachstudio.com/tools/prompt-formatter",
      ],
    }),
  ],
  adapter: vercel(),
  output: "static",
});
