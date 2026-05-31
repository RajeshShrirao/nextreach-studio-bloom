import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const blog = await getCollection("blog", ({ data }) => !data.draft);
  const guides = await getCollection("guides", ({ data }) => !data.draft);
  const resources = await getCollection("resources", ({ data }) => !data.draft);

  const allItems = [
    ...blog.map((p) => ({
      title: p.data.title,
      pubDate: p.data.pubDate,
      description: p.data.description,
      link: `/blog/${p.slug}/`,
      categories: p.data.tags,
    })),
    ...guides.map((p) => ({
      title: p.data.title,
      pubDate: p.data.pubDate,
      description: p.data.description,
      link: `/guides/${p.slug}/`,
      categories: p.data.tags,
    })),
    ...resources.map((p) => ({
      title: p.data.title,
      pubDate: p.data.pubDate,
      description: p.data.description,
      link: `/resources/${p.slug}/`,
      categories: p.data.tags,
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: "NextReach Studio",
    description:
      "Practical tools, guides, and resources for AI builders, Claude Code users, indie hackers, and full-stack developers building with LLMs.",
    site: context.site!,
    items: allItems,
    customData: `<language>en-us</language>`,
    stylesheet: "/rss-styles.xsl",
  });
}
