import fs from "node:fs";
import path from "node:path";

/**
 * Post-build check that FAQPage structured data matches what the browser paints.
 *
 * Google requires FAQ content to be visible on the page, and the emitted JSON-LD is
 * derived from the MDX source while the page is rendered through Astro's markdown
 * pipeline (which runs smartypants and turns straight quotes into curly ones). This
 * asserts the two did not drift apart.
 *
 * Run after `npm run build`:
 *
 *     npm run verify:faq
 *
 * Exits non-zero if any page fails, so it can gate CI.
 */

const CONTENT_DIR = path.resolve("src/content/blog");
const BUILD_DIR = path.resolve("dist/client/blog");

const unesc = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");

const stripTags = (s) => unesc(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

if (!fs.existsSync(BUILD_DIR)) {
  console.error(`Build output not found at ${BUILD_DIR} — run \`npm run build\` first.`);
  process.exit(1);
}

const problems = [];
const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(d, e.name)) : e.name === "index.html" ? [path.join(d, e.name)] : [],
  );

// Source side: which articles actually declare an FAQ section.
const sourcesWithFaq = new Set();
for (const file of fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"))) {
  const body = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  if (/^##[ \t]+Frequently Asked Questions[ \t]*$/m.test(body)) sourcesWithFaq.add(file.replace(/\.mdx$/, ""));
}

let pages = 0;
let names = 0;
let texts = 0;
let invalid = 0;
const slugsWithSchema = new Set();

for (const file of walk(BUILD_DIR)) {
  const html = fs.readFileSync(file, "utf8");
  const slug = path.basename(path.dirname(file));

  const hasSchema = html.includes('"@type":"FAQPage"');
  if (hasSchema) slugsWithSchema.add(slug);

  const isSourceFaq = sourcesWithFaq.has(slug);
  if (isSourceFaq && !hasSchema) problems.push(`${slug}: source has an FAQ section but no FAQPage schema emitted`);
  if (!isSourceFaq && hasSchema) problems.push(`${slug}: FAQPage schema emitted but source has no FAQ section`);

  for (const block of [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => m[1],
  )) {
    let obj;
    try {
      obj = JSON.parse(block);
    } catch (err) {
      invalid++;
      problems.push(`${slug}: invalid JSON-LD (${err.message})`);
      continue;
    }
    if (obj["@type"] !== "FAQPage") continue;
    pages++;

    if (!/^https:\/\/.+#faqpage$/.test(obj["@id"] ?? "")) problems.push(`${slug}: unexpected FAQPage @id: ${obj["@id"]}`);
    if (!Array.isArray(obj.mainEntity) || obj.mainEntity.length === 0) {
      problems.push(`${slug}: FAQPage has an empty mainEntity`);
      continue;
    }

    for (const q of obj.mainEntity) {
      if (q["@type"] !== "Question") problems.push(`${slug}: entry @type is ${q["@type"]}, expected Question`);
      if (typeof q.name !== "string" || !q.name.trim()) problems.push(`${slug}: question has no name`);

      const a = q.acceptedAnswer;
      if (!a || a["@type"] !== "Answer" || typeof a.text !== "string") {
        problems.push(`${slug}: malformed acceptedAnswer for "${q.name}"`);
        continue;
      }
      if (a.text.length < 20) problems.push(`${slug}: answer under 20 chars for "${q.name}"`);

      // Locate the rendered question/answer pair. Matching raw against raw is the
      // assertion itself — if schema and rendered text differ, this finds nothing.
      const match = html.match(new RegExp(`<strong>${escRe(q.name)}</strong>([\\s\\S]*?)</p>`));
      if (!match) {
        problems.push(`${slug}: rendered question not found in page for "${q.name}"`);
        continue;
      }
      const renderedQ = stripTags(match[0].match(/<strong>([\s\S]*?)<\/strong>/)[1]);
      const renderedA = stripTags(match[1]);

      if (renderedQ === q.name) names++;
      else problems.push(`${slug}: QUESTION differs from rendered copy\n      schema: ${q.name}\n      render: ${renderedQ}`);

      if (renderedA === a.text) texts++;
      else
        problems.push(
          `${slug}: ANSWER differs from rendered copy\n      schema: ${a.text.slice(0, 120)}\n      render: ${renderedA.slice(0, 120)}`,
        );
    }
  }
}

for (const slug of sourcesWithFaq) {
  if (!slugsWithSchema.has(slug)) problems.push(`${slug}: source has an FAQ section but no built page carries it`);
}

console.log(`source articles with an FAQ section : ${sourcesWithFaq.size}`);
console.log(`built pages carrying FAQPage        : ${pages}`);
console.log(`invalid JSON-LD blocks              : ${invalid}`);
console.log(`question names byte-identical       : ${names}`);
console.log(`answer texts byte-identical         : ${texts}`);
console.log("");

if (problems.length) {
  console.error(`FAIL — ${problems.length} problem(s):`);
  for (const p of problems) console.error("  - " + p);
  process.exit(1);
}
console.log("PASS — every FAQPage question and answer is byte-identical to the rendered page.");
