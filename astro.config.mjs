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
      filter: (page) => !page.endsWith("/fast-websites/thanks"),
      customPages: [
        "https://www.nextreachstudio.in/tools/ai-token-calculator",
        "https://www.nextreachstudio.in/tools/llm-cost-calculator",
        "https://www.nextreachstudio.in/tools/context-window-calculator",
        "https://www.nextreachstudio.in/tools/vram-estimator",
        "https://www.nextreachstudio.in/tools/prompt-formatter",
        "https://www.nextreachstudio.in/privacy",
        "https://www.nextreachstudio.in/terms",
        "https://www.nextreachstudio.in/about",
         "https://www.nextreachstudio.in/contact",
         "https://www.nextreachstudio.in/fast-websites",
        "https://www.nextreachstudio.in/services/ai-agent-development-pune",
        "https://www.nextreachstudio.in/services/ai-automation-pune",
        "https://www.nextreachstudio.in/services/custom-software-development-pune",
        "https://www.nextreachstudio.in/services/web-application-development-pune",
        "https://www.nextreachstudio.in/services/mvp-development-pune",
        "https://www.nextreachstudio.in/services/flutter-app-development-pune",
        "https://www.nextreachstudio.in/services/android-app-development-pune",
        "https://www.nextreachstudio.in/services/ios-app-development-pune",
        "https://www.nextreachstudio.in/services/api-integration-pune",
        "https://www.nextreachstudio.in/services/business-automation-pune",
        "https://www.nextreachstudio.in/services/ai-consulting-pune",
        "https://www.nextreachstudio.in/services/custom-saas-development-pune",
        "https://www.nextreachstudio.in/industries/saas-tech-startups-pune",
        "https://www.nextreachstudio.in/industries/manufacturing",
        "https://www.nextreachstudio.in/industries/logistics",
        "https://www.nextreachstudio.in/industries/education",
        "https://www.nextreachstudio.in/industries/real-estate",
        "https://www.nextreachstudio.in/industries/healthcare",
        "https://www.nextreachstudio.in/industries/retail",
        "https://www.nextreachstudio.in/industries/restaurants",
        "https://www.nextreachstudio.in/industries/construction",
        "https://www.nextreachstudio.in/industries/pet-grooming",
        "https://www.nextreachstudio.in/demos/saffron-and-smoke",
        "https://www.nextreachstudio.in/attribution",
        "https://www.nextreachstudio.in/brand",
      ],
    }),
  ],
  adapter: vercel(),
  output: "static",
});
