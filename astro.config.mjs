import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://nextreachstudio.in",
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
        "https://nextreachstudio.in/tools/ai-token-calculator",
        "https://nextreachstudio.in/tools/llm-cost-calculator",
        "https://nextreachstudio.in/tools/context-window-calculator",
        "https://nextreachstudio.in/tools/vram-estimator",
        "https://nextreachstudio.in/tools/prompt-formatter",
        "https://nextreachstudio.in/privacy",
        "https://nextreachstudio.in/terms",
        "https://nextreachstudio.in/about",
        "https://nextreachstudio.in/contact",
        "https://nextreachstudio.in/services/ai-agent-development-pune",
        "https://nextreachstudio.in/services/ai-automation-pune",
        "https://nextreachstudio.in/services/custom-software-development-pune",
        "https://nextreachstudio.in/services/web-application-development-pune",
        "https://nextreachstudio.in/services/mvp-development-pune",
        "https://nextreachstudio.in/services/flutter-app-development-pune",
        "https://nextreachstudio.in/services/android-app-development-pune",
        "https://nextreachstudio.in/services/ios-app-development-pune",
        "https://nextreachstudio.in/services/api-integration-pune",
        "https://nextreachstudio.in/services/business-automation-pune",
        "https://nextreachstudio.in/services/ai-consulting-pune",
        "https://nextreachstudio.in/services/custom-saas-development-pune",
        "https://nextreachstudio.in/industries/saas-tech-startups-pune",
        "https://nextreachstudio.in/industries/manufacturing",
        "https://nextreachstudio.in/industries/logistics",
        "https://nextreachstudio.in/industries/education",
        "https://nextreachstudio.in/industries/real-estate",
        "https://nextreachstudio.in/industries/healthcare",
        "https://nextreachstudio.in/industries/retail",
        "https://nextreachstudio.in/industries/restaurants",
        "https://nextreachstudio.in/industries/construction",
        "https://nextreachstudio.in/industries/pet-grooming",
        "https://nextreachstudio.in/demos/saffron-and-smoke",
        "https://nextreachstudio.in/attribution",
        "https://nextreachstudio.in/brand",
      ],
    }),
  ],
  adapter: vercel(),
  output: "static",
});
