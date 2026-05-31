import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://nextreachstudio.com",
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      customPages: [
        "https://nextreachstudio.com/tools/ai-token-calculator",
        "https://nextreachstudio.com/tools/llm-cost-calculator",
        "https://nextreachstudio.com/tools/context-window-calculator",
        "https://nextreachstudio.com/tools/vram-estimator",
        "https://nextreachstudio.com/tools/prompt-formatter",
      ],
    }),
  ],
  adapter: vercel(),
  output: "static",
});
