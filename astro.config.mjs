import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.nextreachstudio.in",
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
      filter: (page) =>
        !page.endsWith("/fast-websites/thanks") &&
        !page.endsWith("/fast-websites/thanks/") &&
        !page.endsWith("/404") &&
        !page.endsWith("/404/") &&
        !page.endsWith("/500") &&
        !page.endsWith("/500/"),
    }),
  ],
  adapter: vercel(),
  output: "static",
});
