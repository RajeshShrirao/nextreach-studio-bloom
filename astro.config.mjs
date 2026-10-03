import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://nextreachstudio.vercel.app",
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
        "https://nextreachstudio.vercel.app/tools/ai-token-calculator",
        "https://nextreachstudio.vercel.app/tools/llm-cost-calculator",
        "https://nextreachstudio.vercel.app/tools/context-window-calculator",
        "https://nextreachstudio.vercel.app/tools/vram-estimator",
        "https://nextreachstudio.vercel.app/tools/prompt-formatter",
        "https://nextreachstudio.vercel.app/privacy",
        "https://nextreachstudio.vercel.app/terms",
        "https://nextreachstudio.vercel.app/about",
        "https://nextreachstudio.vercel.app/contact",
        "https://nextreachstudio.vercel.app/services/ai-agent-development-pune",
        "https://nextreachstudio.vercel.app/services/ai-automation-pune",
        "https://nextreachstudio.vercel.app/services/custom-software-development-pune",
        "https://nextreachstudio.vercel.app/services/web-application-development-pune",
        "https://nextreachstudio.vercel.app/services/mvp-development-pune",
        "https://nextreachstudio.vercel.app/services/flutter-app-development-pune",
        "https://nextreachstudio.vercel.app/services/android-app-development-pune",
        "https://nextreachstudio.vercel.app/services/ios-app-development-pune",
        "https://nextreachstudio.vercel.app/services/api-integration-pune",
        "https://nextreachstudio.vercel.app/services/business-automation-pune",
        "https://nextreachstudio.vercel.app/services/ai-consulting-pune",
        "https://nextreachstudio.vercel.app/services/custom-saas-development-pune",
        "https://nextreachstudio.vercel.app/industries/manufacturing",
        "https://nextreachstudio.vercel.app/industries/logistics",
        "https://nextreachstudio.vercel.app/industries/education",
        "https://nextreachstudio.vercel.app/industries/real-estate",
        "https://nextreachstudio.vercel.app/industries/healthcare",
        "https://nextreachstudio.vercel.app/industries/retail",
        "https://nextreachstudio.vercel.app/industries/restaurants",
        "https://nextreachstudio.vercel.app/industries/construction",
        "https://nextreachstudio.vercel.app/industries/pet-grooming",
        "https://nextreachstudio.vercel.app/demos/saffron-and-smoke",
        "https://nextreachstudio.vercel.app/attribution",
        "https://nextreachstudio.vercel.app/brand",
      ],
    }),
  ],
  adapter: vercel(),
  output: "static",
});
