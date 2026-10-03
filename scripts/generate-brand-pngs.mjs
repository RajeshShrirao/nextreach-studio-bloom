import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const BRAND_DIR = path.resolve("./public/brand");

function getSvgFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getSvgFiles(filePath));
    } else if (file.endsWith(".svg")) {
      results.push(filePath);
    }
  }
  return results;
}

async function convertAllSvgs() {
  const svgFiles = getSvgFiles(BRAND_DIR);
  console.log(`Found ${svgFiles.length} SVG files to rasterize into high-res PNGs.`);

  for (const svgPath of svgFiles) {
    const pngPath = svgPath.replace(/\.svg$/, ".png");
    try {
      // Rasterize with sharp with high density (300 DPI for crisp edges)
      await sharp(svgPath, { density: 300 })
        .png({ compressionLevel: 9, quality: 100 })
        .toFile(pngPath);
      console.log(`✓ Generated: ${path.relative(process.cwd(), pngPath)}`);
    } catch (err) {
      console.error(`✗ Error converting ${svgPath}:`, err.message);
    }
  }

  console.log("All brand SVGs successfully rasterized to high-res PNGs!");
}

convertAllSvgs();
