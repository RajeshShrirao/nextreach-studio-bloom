"""Render the visual book and self-contained SVG templates with Chromium.

Prerequisites: Python playwright, Pillow, pypdf, pypdfium2, and Playwright Chromium.
Start Astro, then: python3 scripts/export-brand-book.py --url http://localhost:4321
After rerendering, rebuild Astro so the static output includes the new artifacts.
"""
import argparse
import json
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

from PIL import Image, ImageDraw, ImageFont
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "public" / "brand" / "book"
FORMATS = {
    "offer-portrait": (1080, 1350),
    "brand-square": (1080, 1080),
    "story-vertical": (1080, 1920),
    "brand-landscape": (1200, 628),
    "brand-open-graph": (1200, 630),
}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--url", default="http://localhost:4321")
    parser.add_argument("--skip-templates", action="store_true", help="Keep already-rendered PNGs")
    args = parser.parse_args()
    url = args.url.rstrip("/")
    OUTPUT.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1440, "height": 1000}, device_scale_factor=1)
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        for name, (w, h) in FORMATS.items():
            if args.skip_templates:
                continue
            page.set_viewport_size({"width": w, "height": h})
            response = page.goto(f"{url}/brand/book/templates/{name}.svg", wait_until="networkidle")
            if response.status != 200:
                raise RuntimeError(f"Template request failed: {name}: {response.status}")
            page.evaluate("async () => { await document.fonts.ready; }")
            page.locator("svg").screenshot(path=str(OUTPUT / "templates" / f"{name}.png"))
            with Image.open(OUTPUT / "templates" / f"{name}.png") as image:
                if image.size != (w, h):
                    raise RuntimeError(f"Wrong dimensions for {name}: {image.size}")
            print(f"Rendered {name}.png ({w} × {h})")

        page.set_viewport_size({"width": 1440, "height": 1000})
        response = page.goto(f"{url}/brand/book/", wait_until="networkidle")
        if response.status != 200:
            raise RuntimeError(f"Brand book request failed: {response.status}")
        page.evaluate("async () => { document.querySelectorAll('img').forEach(i => i.loading = 'eager'); await document.fonts.ready; await Promise.all(Array.from(document.images, i => i.decode().catch(() => {}))); }")
        if page.locator(".bb-sheet").count() != 30:
            raise RuntimeError("Expected exactly 30 document pages")

        # Check image integrity and sheet containment before printing.
        broken = page.evaluate("Array.from(document.images).filter(i => !i.naturalWidth).map(i => i.src)")
        if broken:
            raise RuntimeError(f"Broken images: {broken}")
        page.emulate_media(media="print")
        visible_pages = page.locator(".bb-sheet:visible").count()
        if visible_pages != 30:
            raise RuntimeError(f"Print stylesheet hides document pages: {visible_pages}/30 visible")
        overflow = page.evaluate("""() => Array.from(document.querySelectorAll('.bb-sheet')).flatMap(s => {
            const r = s.getBoundingClientRect();
            const footer = s.querySelector('.bb-page-footer').getBoundingClientRect();
            const bad = Array.from(s.querySelectorAll('.bb-page-content > *')).filter(e => {
                const b = e.getBoundingClientRect(); return b.bottom > footer.top + 1 || b.right > r.right + 1;
            });
            return bad.map(e => ({page: s.id, element: e.className}));
        })""")
        if overflow:
            raise RuntimeError(f"Print content overflow: {json.dumps(overflow)}")
        # PDF hyperlinks must remain useful after the local preview server stops.
        page.evaluate("""() => document.querySelectorAll('.bb-sheet a[href^="/"]').forEach(a => {
            a.href = 'https://www.nextreachstudio.in' + a.getAttribute('href');
        })""")
        pdf_path = OUTPUT / "NextReach-Studio-Brand-Book.pdf"
        page.pdf(path=str(pdf_path), print_background=True,
                 prefer_css_page_size=True, display_header_footer=False, tagged=True, outline=True)
        # Validate the rendered PDF, not only the HTML used to create it.
        from pypdf import PdfReader
        pdf = PdfReader(pdf_path)
        if len(pdf.pages) != 30:
            raise RuntimeError(f"Exported PDF has {len(pdf.pages)} pages, expected 30")
        empty_pages = [i + 1 for i, sheet in enumerate(pdf.pages) if len((sheet.extract_text() or '').strip()) < 60]
        if empty_pages:
            raise RuntimeError(f"Empty or unreadable PDF pages: {empty_pages}")
        print("Exported 30-page brand book PDF")

        # Rasterize the actual exported PDF, so a blank print export cannot pass
        # just because the screen-mode HTML looks correct.
        import pypdfium2 as pdfium
        document = pdfium.PdfDocument(str(pdf_path))
        thumbs = []
        for i in range(len(document)):
            pdf_page = document[i]
            bitmap = pdf_page.render(scale=4 / 3 if i == 0 else .6)
            image = bitmap.to_pil().convert("RGB")
            if i == 0:
                image.save(OUTPUT / "brand-book-cover.jpg", quality=92)
            image.thumbnail((360, 225), Image.Resampling.LANCZOS)
            thumbs.append(image.copy())
            bitmap.close()
            pdf_page.close()
        document.close()
        board = Image.new("RGB", (5 * 384 + 24, 6 * 260 + 24), "#2A2A2D")
        draw = ImageDraw.Draw(board)
        font = ImageFont.load_default(size=14)
        for i, image in enumerate(thumbs):
            x, y = 24 + (i % 5) * 384, 24 + (i // 5) * 260
            board.paste(image, (x, y))
            draw.text((x, y + 232), f"{i + 1:02d} / {page.locator('.bb-sheet').nth(i).get_attribute('id')}", fill="#F5F1E9", font=font)
        board.save(OUTPUT / "brand-book-overview.jpg", quality=90)

        page.emulate_media(media="screen")
        for width in (390, 768, 1440):
            page.set_viewport_size({"width": width, "height": 900})
            overflowing = page.evaluate("document.documentElement.scrollWidth > innerWidth")
            if overflowing:
                raise RuntimeError(f"Horizontal overflow at {width}px")
        if errors:
            raise RuntimeError(f"Browser errors: {errors}")
        browser.close()

    # Portable handover: no absolute project paths or environment files.
    archive = OUTPUT / "NextReach-Studio-Brand-Assets.zip"
    with ZipFile(archive, "w", ZIP_DEFLATED) as pack:
        for file in OUTPUT.rglob("*"):
            if file.is_file() and file != archive:
                pack.write(file, "NextReach-Studio/" + str(file.relative_to(OUTPUT)))
        for file in (ROOT / "public" / "brand").glob("*"):
            if file.is_file() and file.suffix in (".svg", ".png"):
                pack.write(file, "NextReach-Studio/logos/" + file.name)
        for file in (ROOT / "public" / "fonts").iterdir():
            if file.is_file():
                pack.write(file, "NextReach-Studio/fonts/" + file.name)
    print(f"Packaged {archive.name}")


if __name__ == "__main__":
    main()
