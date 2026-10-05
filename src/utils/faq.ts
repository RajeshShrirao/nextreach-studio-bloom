/**
 * FAQPage structured-data extraction.
 *
 * Parses the raw MDX body of an article and returns the question/answer pairs from its
 * "## Frequently Asked Questions" section, so the page can emit schema.org FAQPage markup
 * that is guaranteed to match the visible copy.
 *
 * Why parse raw body rather than the rendered HTML:
 *   - The rendered DOM is not available in the frontmatter, and searching it would mean
 *     rendering before deciding whether to emit schema.
 *   - The source format is regular enough to parse reliably, and parsing source means the
 *     schema is derived from exactly what the author wrote.
 *
 * Format this expects (verified across all 19 articles that carry an FAQ section):
 *
 *     ## Frequently Asked Questions
 *
 *     **Question ending in a question mark?**
 *     A single answer paragraph. May contain markdown links and bold.
 *
 *     **Next question?**
 *     Next answer.
 *
 *     ---
 *
 *     Closing CTA paragraphs (not part of the FAQ)
 *
 * Section boundaries are deliberately strict. Three things terminate extraction:
 *   1. A horizontal rule (`---`) — every article closes its FAQ with one before the
 *      trailing CTA copy. Without this rule the closing paragraphs would be swallowed
 *      into the last answer.
 *   2. A subsequent heading of any level.
 *   3. End of file.
 */

import { retext } from "retext";
import retextSmartypants from "retext-smartypants";

export interface FaqPair {
  /** The question, as rendered. */
  name: string;
  /** The accepted answer, as rendered. */
  text: string;
}

const FAQ_HEADING = /^##[ \t]+Frequently Asked Questions[ \t]*$/m;
const QUESTION = /^\*\*(.+?)\*\*[ \t]*$/;
const HORIZONTAL_RULE = /^[ \t]*(?:-{3,}|\*{3,}|_{3,})[ \t]*$/;
const HEADING = /^#{1,6}[ \t]+/;

// Astro runs remark-smartypants over MDX at render time, so the page shows curly quotes
// where the source file has straight ones. Schema text that does not match what the
// browser paints is a mismatch with Google's "FAQ content must be visible on the page"
// requirement, so the same transform is applied here.
//
// These two passes mirror what remark-smartypants does internally: pass one converts
// quotes (with dashes, ellipses and backticks disabled so string length is preserved),
// pass two converts the punctuation (with quotes disabled so they are not double-run).
// processSync is used so extraction stays synchronous.
const quotePass = retext().use(retextSmartypants, {
  ellipses: false,
  dashes: false,
  backticks: false,
});
const punctuationPass = retext().use(retextSmartypants, { quotes: false });

/**
 * Convert markdown to the plain text the page actually renders.
 *
 * Link, bold and code span are the only constructs present in the FAQ sections — verified
 * across all 19 articles — so nothing more aggressive is applied. Stripping single `*`,
 * for instance, would mangle prose containing a literal asterisk, and there is none to
 * justify the risk.
 *
 * Known limitation: code-span content is flattened before the typography pass, so a code
 * span containing a straight quote would be converted where Astro leaves it alone. No FAQ
 * answer currently contains one, and the build-time verification catches it if one is
 * ever added.
 */
function toRenderedText(input: string): string {
  const flattened = input
    // [label](target) -> label. Keeps the sentence readable; drops the URL.
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    // **bold** / __bold__ -> bold
    .replace(/(\*\*|__)(.+?)\1/g, "$2")
    // `code` -> code
    .replace(/`([^`]+)`/g, "$1");

  const smartened = punctuationPass
    .processSync(quotePass.processSync(flattened).toString())
    .toString();

  return smartened.replace(/\s+/g, " ").trim();
}

/**
 * Extract FAQ pairs from an article body.
 *
 * Returns an empty array when the article has no FAQ section, so callers can emit
 * conditionally without a separate existence check.
 */
export function extractFaq(body: string | undefined | null): FaqPair[] {
  if (!body) return [];

  const headingMatch = FAQ_HEADING.exec(body);
  if (!headingMatch) return [];

  // Slice from just past the heading line.
  const sectionStart = headingMatch.index + headingMatch[0].length;
  const lines = body.slice(sectionStart).split("\n");

  // Terminate at the first horizontal rule or heading — whichever comes first.
  const kept: string[] = [];
  for (const line of lines) {
    if (HORIZONTAL_RULE.test(line) || HEADING.test(line)) break;
    kept.push(line);
  }

  const pairs: FaqPair[] = [];
  let current: { name: string; parts: string[] } | null = null;

  for (const line of kept) {
    const question = QUESTION.exec(line);
    if (question) {
      if (current) pairs.push({ name: toRenderedText(current.name), text: toRenderedText(current.parts.join(" ")) });
      current = { name: question[1], parts: [] };
      continue;
    }
    if (current && line.trim() !== "") {
      current.parts.push(line.trim());
    }
  }
  if (current) pairs.push({ name: toRenderedText(current.name), text: toRenderedText(current.parts.join(" ")) });

  // Drop anything that failed to parse into a complete pair rather than emitting an
  // incomplete Question/Answer node, which would be invalid markup.
  return pairs.filter((pair) => pair.name.length > 0 && pair.text.length > 0);
}

/** Build the schema.org FAQPage node, or null when there is nothing to describe. */
export function buildFaqPageSchema(
  body: string | undefined | null,
  pageUrl: string,
): Record<string, unknown> | null {
  const faq = extractFaq(body);
  if (faq.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faqpage`,
    mainEntity: faq.map((pair) => ({
      "@type": "Question",
      name: pair.name,
      acceptedAnswer: {
        "@type": "Answer",
        text: pair.text,
      },
    })),
  };
}
