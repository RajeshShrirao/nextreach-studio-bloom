// Build self-contained, editable ad masters using the existing logo and fonts.
// Run before the Astro build. The companion Python script renders PNGs and PDF.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const publicDir = path.join(root, "public");
const output = path.join(publicDir, "brand/book/templates");
await mkdir(output, { recursive: true });

const data = async (relative, type) => `data:${type};base64,${(await readFile(path.join(publicDir, relative))).toString("base64")}`;
const [cabinet, jakarta, mono, logoLight, logoDark] = await Promise.all([
  data("fonts/cabinet-grotesk-variable.woff2", "font/woff2"),
  data("fonts/plus-jakarta-sans-latin.woff2", "font/woff2"),
  data("fonts/jetbrains-mono-latin.woff2", "font/woff2"),
  data("brand/logo-horizontal.png", "image/png"),
  data("brand/logo-horizontal-dark.png", "image/png"),
]);
const fontStyles = `
  @font-face { font-family: 'NR Cabinet'; src: url('${cabinet}') format('woff2'); font-weight: 100 900; }
  @font-face { font-family: 'NR Jakarta'; src: url('${jakarta}') format('woff2'); font-weight: 400 700; }
  @font-face { font-family: 'NR Mono'; src: url('${mono}') format('woff2'); font-weight: 400 500; }
  .display { font-family: 'NR Cabinet', sans-serif; font-weight: 750; letter-spacing: -4px; }
  .body { font-family: 'NR Jakarta', sans-serif; font-weight: 400; }
  .label { font-family: 'NR Mono', monospace; font-weight: 400; }
  .cta { font-family: 'NR Jakarta', sans-serif; font-weight: 600; }
`;
const escape = s => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
const text = (x, y, content, size, color, className = "body", extra = "") => `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" class="${className}" ${extra}>${escape(content)}</text>`;
const logo = (x, y, w, dark = false) => `<image x="${x}" y="${y}" width="${w}" height="${w * 64 / 360}" href="${dark ? logoDark : logoLight}" />`;
const mark = (x, y, scale, color = "#C76B50") => `<g transform="translate(${x},${y}) scale(${scale})" fill="none" stroke="${color}" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="29,38 60,8 91,38"/><line x1="60" y1="8" x2="60" y2="142"/><path d="M 10,142 L 10,40 Q 10,33 17,37 L 60,142"/><path d="M 60,54 C 88,54 110,66 110,83 C 110,100 88,104 60,104"/><line x1="60" y1="104" x2="110" y2="142"/></g>`;
const button = (x, y, w, h, label, dark = false, fontSize = 32) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${dark ? "#E58D72" : "#97402E"}" />${text(x + 32, y + h / 2 + fontSize * .35, label, fontSize, dark ? "#2A2A2D" : "#F5F1E9", "cta")}`;
const svg = (w, h, title, background, content) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc">
  <title id="title">${escape(title)}</title>
  <desc id="desc">NextReach Studio editable campaign master. Live text and embedded brand fonts. Preserve the supplied logo, margins, and color roles.</desc>
  <defs><style>${fontStyles}</style></defs>
  <rect width="${w}" height="${h}" fill="${background}" />
  <!-- EDIT CAMPAIGN COPY BELOW. Logo artwork and fonts are embedded. -->
  ${content}
</svg>
`;

const portrait = svg(1080, 1350, "NextReach / portrait website offer", "#F5F1E9", [
  logo(72, 72, 420),
  text(72, 350, "Your business.", 112, "#2A2A2D", "display"),
  text(72, 468, "Online.", 112, "#97402E", "display"),
  `<line x1="72" y1="550" x2="1008" y2="550" stroke="#A69D92" stroke-width="1"/>`,
  text(72, 650, "FIXED-SCOPE WEBSITES", 28, "#625B54", "label", 'letter-spacing="2"'),
  text(72, 822, "From ₹5,000.", 140, "#2A2A2D", "display"),
  text(72, 918, "One focused page. One clear next action.", 36, "#2A2A2D"),
  button(72, 1018, 710, 96, "Chat on WhatsApp ↗"),
  text(72, 1210, "After approved scope, content and assets.", 28, "#625B54"),
  text(72, 1264, "nextreachstudio.in", 28, "#625B54", "label"),
].join("\n"));

const square = svg(1080, 1080, "NextReach / square brand campaign", "#2A2A2D", [
  logo(72, 72, 440, true),
  text(72, 370, "Reach", 154, "#F5F1E9", "display"),
  text(72, 526, "what’s next.", 144, "#E58D72", "display"),
  text(72, 650, "Websites, AI and digital products", 38, "#F5F1E9"),
  text(72, 706, "built to move your business forward.", 38, "#F5F1E9"),
  `<line x1="72" y1="798" x2="1008" y2="798" stroke="#A69D92" stroke-width="1"/>`,
  button(72, 852, 560, 94, "Start a project ↗", true),
  text(72, 1010, "nextreachstudio.in", 28, "#A69D92", "label"),
].join("\n"));

const story = svg(1080, 1920, "NextReach / vertical AI and automation campaign", "#2A2A2D", [
  `<!-- Working safe area: x=90..990; y=250..1580. Verify actual platform preview. -->`,
  logo(90, 280, 460, true),
  text(90, 596, "Less busywork.", 108, "#F5F1E9", "display"),
  text(90, 728, "More possibility.", 108, "#E58D72", "display"),
  text(90, 882, "AI agents and connected workflows", 38, "#F5F1E9"),
  text(90, 940, "that give your team its time back.", 38, "#F5F1E9"),
  `<g fill="none" stroke="#C76B50" stroke-width="1.5" opacity=".5"><rect x="90" y="1080" width="440" height="200"/><rect x="210" y="1140" width="440" height="200"/><rect x="330" y="1200" width="440" height="200"/></g>`,
  mark(850, 1230, 1),
  button(90, 1450, 630, 92, "Start a project ↗", true),
  text(90, 1580, "nextreachstudio.in", 28, "#A69D92", "label"),
].join("\n"));

const landscapeContent = [
  `<rect x="820" width="380" height="630" fill="#2A2A2D"/>`,
  logo(64, 44, 350),
  text(64, 250, "Reach", 100, "#2A2A2D", "display"),
  text(64, 352, "what’s next.", 100, "#97402E", "display"),
  text(64, 424, "Websites, AI and digital products.", 28, "#2A2A2D"),
  button(64, 486, 320, 68, "Start a project ↗", false, 24),
  text(64, 594, "nextreachstudio.in", 22, "#625B54", "label"),
  mark(920, 194, 1.5),
].join("\n");

for (const [name, content] of Object.entries({
  "offer-portrait": portrait,
  "brand-square": square,
  "story-vertical": story,
  "brand-landscape": svg(1200, 628, "NextReach / landscape brand campaign", "#F5F1E9", landscapeContent),
  "brand-open-graph": svg(1200, 630, "NextReach / link-preview brand campaign", "#F5F1E9", landscapeContent),
})) {
  await writeFile(path.join(output, `${name}.svg`), content);
  console.log(`Generated ${name}.svg`);
}
