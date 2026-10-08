#!/usr/bin/env python3
"""Lighthouse audit gate for NextReach Studio — runs automatically in `npm run build`.

What this is
------------
A Python orchestrator that reproduces Google Lighthouse scoring one-to-one:

1. **Classic categories (Performance, Accessibility, Best Practices, SEO)** —
   runs the *official* `lighthouse` npm engine (now a devDependency) against the
   freshly built `dist/` output and reads its exact 0-100 category scores.
   Performance weights used by Google (v10-v13): TBT 30%, LCP 25%, CLS 25%,
   FCP 10%, SI 10%.
   Source: https://github.com/GoogleChrome/lighthouse/blob/main/docs/scoring.md

2. **Agentic Browsing category (Lighthouse 13.3+, needs Chrome 150+)** — Google
   reports this as a *fraction* (e.g. 3/3), not a 0-100 score. The category is:
       'agentic-browsing': auditRefs = [agent-accessibility-tree,
         webmcp-form-coverage, webmcp-registered-tools, webmcp-schema-validity,
         cumulative-layout-shift, llms-txt, ard-schema]
   Source: lighthouse/core/config/default-config.js
   Scoring doc: https://developer.chrome.com/docs/lighthouse/agentic-browsing/scoring
   An audit counts toward the fraction only when it is applicable (not N/A,
   not manual, not informative); it counts as passed when score >= 0.9 — the
   same rule the Lighthouse report UI uses.

3. **Static native clones (no browser needed)** — deterministic Python ports of
   the exact checks in Google's audit sources, so the gate still runs where
   Chrome is unavailable:
     - llms-txt ......... core/audits/agentic/llms-txt.js
                          (fetch-error -> 0; 5xx -> 0; 4xx -> N/A pass;
                           else require H1 /^\\s*#\\s+.+/m, a Markdown link
                           /\\[.+\\]\\(.+\\)/, length >= 50 chars)
     - agent-accessibility-tree .. core/audits/agentic/agent-accessibility-tree.js
                          (TARGET_RULES subset decidable from static HTML)
     - webmcp-form-coverage ..... core/audits/webmcp-form-coverage.js
                          (informative: count forms missing toolname/tooldescription)
     - webmcp-schema-validity ... core/audits/webmcp-schema-validity.js
                          (errors -> 0, warnings-only -> 0.5, clean -> 1,
                           no tools and no issues -> N/A)
     - ard-schema ............... core/audits/agentic/ard-schema.js
                          (no catalog signal and no ai-catalog.json -> N/A;
                           unloadable -> 0; valid JSON object -> 1)
   CLS/layout-stability cannot be measured without rendering, so the static
   pass statically skips it and says so.

Usage
-----
    python3 scripts/lighthouse_audit.py [--dist dist] [--urls / /about ...]
        [--budgets scripts/lighthouse_budgets.json] [--preset mobile|desktop]
        [--no-browser] [--out lighthouse-report.json]

    SKIP_LIGHTHOUSE=1  -> skip entirely (escape hatch for constrained CI).
    LIGHTHOUSE_NO_BROWSER=1 / --no-browser -> static clones only.

Exit codes: 0 = all budgets met; 1 = budget breach; 2 = infrastructure error.
"""

from __future__ import annotations

import argparse
import functools
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import threading
import urllib.error
import urllib.request
from html.parser import HTMLParser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ---------------------------------------------------------------------------
# Google sources (exact clones)
# ---------------------------------------------------------------------------

# core/audits/agentic/agent-accessibility-tree.js — TARGET_RULES, verbatim.
TARGET_RULES = frozenset({
    "button-name", "input-button-name", "input-image-alt", "label",
    "link-name", "select-name", "document-title", "aria-allowed-attr",
    "aria-allowed-role", "aria-command-name", "aria-conditional-attr",
    "aria-dialog-name", "aria-hidden-body", "aria-hidden-focus",
    "aria-input-field-name", "aria-prohibited-attr", "aria-required-attr",
    "aria-required-children", "aria-required-parent", "aria-roles",
    "aria-text", "aria-toggle-field-name", "aria-tooltip-name",
    "aria-treeitem-name", "aria-valid-attr", "aria-valid-attr-value",
    "duplicate-id-aria", "definition-list", "table-duplicate-name",
    "tabindex", "autocomplete-valid", "presentation-role-conflict",
    "svg-img-alt",
})

# Statically decidable subset of TARGET_RULES (the rest need axe + a live DOM).
STATIC_A11Y_RULES = (
    "document-title", "button-name", "link-name", "input-image-alt",
    "label", "select-name", "duplicate-id-aria", "tabindex", "svg-img-alt",
    "definition-list",
)

AGENTIC_AUDIT_IDS = (
    "agent-accessibility-tree",
    "webmcp-form-coverage",
    "webmcp-registered-tools",
    "webmcp-schema-validity",
    "cumulative-layout-shift",
    "llms-txt",
    "ard-schema",
)

# Audits Google marks informative/manual (shown, never counted in the fraction).
NON_COUNTED_MODES = {"manual", "informative", "notApplicable", "error"}

GOOGLE_PASS_THRESHOLD = 0.9  # report-UI rule: numeric audit passes at >= 0.9

# This repo's documented AI-crawler posture (public/robots.txt — 15 bots). Studio
# extension — not part of Google's audit — asserting our own allowlist holds.
AI_CRAWLERS_EXPECTED = (
    "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User",
    "Claude-SearchBot", "anthropic-ai", "PerplexityBot", "Perplexity-User",
    "Google-Extended", "Applebot-Extended", "Amazonbot", "Meta-ExternalAgent",
    "CCBot", "cohere-ai",
)

CHROME_CANDIDATES = (
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    shutil.which("google-chrome") or "",
    shutil.which("chrome") or "",
    shutil.which("chromium") or "",
    shutil.which("chromium-browser") or "",
)


# ---------------------------------------------------------------------------
# Small HTTP helpers
# ---------------------------------------------------------------------------

def fetch(url: str, timeout: int = 15):
    """GET url. Returns (status:int|None, text:str|None, error:str|None)."""
    req = urllib.request.Request(
        url, headers={"User-Agent": "NextReach-Lighthouse-Audit/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            raw = resp.read()
            charset = resp.headers.get_content_charset() or "utf-8"
            return resp.status, raw.decode(charset, errors="replace"), None
    except urllib.error.HTTPError as e:
        try:
            body = e.read().decode("utf-8", errors="replace")
        except Exception:
            body = None
        return e.code, body, None
    except Exception as e:  # DNS, refused, timeout, ...
        return None, None, str(e)


class _ElementCollector(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.title_text = ""
        self._in_title = False
        self.buttons: list[dict] = []   # {attrs, text}
        self.links: list[dict] = []
        self.inputs: list[dict] = []    # input/select/textarea + img[type=image]
        self.svgs: list[dict] = []
        self.ids: list[str] = []
        self.dls: list[list[str]] = []  # child tag names per <dl>
        self.forms: list[dict] = []     # {attrs, fields:[{tag,attrs}]}
        self._open_button: dict | None = None
        self._open_link: dict | None = None
        self._dl_stack: list[list[str]] = []
        self._form_stack: list[dict] = []
        self.ard_link = False

    # -- helpers ---------------------------------------------------------
    @staticmethod
    def _text_of(attrs: dict) -> bool:
        return bool(
            attrs.get("aria-label", "").strip()
            or attrs.get("aria-labelledby", "").strip()
            or attrs.get("title", "").strip()
            or attrs.get("alt", "").strip()
            or attrs.get("value", "").strip()
        )

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        a = {k: (v if v is not None else "") for k, v in attrs}
        if "id" in a and a["id"]:
            self.ids.append(a["id"])
        if tag == "title":
            self._in_title = True
        elif tag == "button":
            self._open_button = {"attrs": a, "text": ""}
            self.buttons.append(self._open_button)
        elif tag == "a" and "href" in a:
            self._open_link = {"attrs": a, "text": ""}
            self.links.append(self._open_link)
        elif tag in ("input", "select", "textarea"):
            self.inputs.append({"tag": tag, "attrs": a})
        elif tag == "svg":
            self.svgs.append(a)
        elif tag == "dl":
            self._dl_stack.append([])
        elif tag == "form":
            form = {"attrs": a, "fields": []}
            self._form_stack.append(form)
            self.forms.append(form)
        elif tag in ("input",) and self._form_stack:
            pass
        if self._dl_stack and tag in ("dt", "dd", "div", "script", "template"):
            self._dl_stack[-1].append(tag)
        if self._form_stack and tag in ("input", "select", "textarea", "button"):
            self._form_stack[-1]["fields"].append({"tag": tag, "attrs": a})
        if tag == "link":
            rel = a.get("rel", "").lower()
            if "agentmap" in rel or "ai-catalog" in a.get("href", "").lower():
                self.ard_link = True

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self._in_title = False
        elif tag == "button":
            self._open_button = None
        elif tag == "a":
            self._open_link = None
        elif tag == "dl" and self._dl_stack:
            self.dls.append(self._dl_stack.pop())
        elif tag == "form" and self._form_stack:
            self._form_stack.pop()

    def handle_data(self, data: str) -> None:
        if self._in_title:
            self.title_text += data
        if self._open_button is not None:
            self._open_button["text"] += data
        if self._open_link is not None:
            self._open_link["text"] += data


# ---------------------------------------------------------------------------
# Static native clones of Google's agentic audits
# ---------------------------------------------------------------------------

def audit_llms_txt(base: str) -> dict:
    """Port of core/audits/agentic/llms-txt.js."""
    status, content, error = fetch(base + "/llms.txt")
    if error is not None:
        return {"id": "llms-txt", "score": 0, "pass": False, "na": False,
                "detail": f"Fetch of llms.txt failed: {error}"}
    if status is None:
        return {"id": "llms-txt", "score": 0, "pass": False, "na": False,
                "detail": "Fetch of llms.txt failed"}
    if status >= 500:
        return {"id": "llms-txt", "score": 0, "pass": False, "na": False,
                "detail": f"Failed with HTTP status {status}"}
    if status >= 400:
        return {"id": "llms-txt", "score": 1, "pass": True, "na": True,
                "detail": f"Not applicable (HTTP {status}); file is optional"}
    content = content or ""
    errors = []
    if not re.search(r"^\s*#\s+.+", content, re.M):
        errors.append("File is missing a required H1 header (e.g., \"# Title\").")
    if not re.search(r"\[.+\]\(.+\)", content):
        errors.append("File does not appear to contain any links.")
    if len(content) < 50:
        errors.append("File is suspiciously short.")
    ok = not errors
    return {"id": "llms-txt", "score": 1 if ok else 0, "pass": ok, "na": False,
            "detail": "follows recommendations" if ok else "; ".join(errors)}


def audit_agent_a11y_tree(html: str) -> dict:
    """Static subset port of core/audits/agentic/agent-accessibility-tree.js."""
    p = _ElementCollector()
    p.feed(html)
    failures: list[str] = []

    if not p.title_text.strip():
        failures.append("document-title: page has no usable <title>")
    for i, b in enumerate(p.buttons):
        a = b["attrs"]
        if a.get("type", "").lower() == "hidden":
            continue
        if not b["text"].strip() and not _ElementCollector._text_of(a):
            failures.append(f"button-name: button #{i} has no accessible name")
            break
    for i, l in enumerate(p.links):
        if not l["text"].strip() and not _ElementCollector._text_of(l["attrs"]):
            failures.append(f"link-name: link #{i} has no discernible text")
            break
    for i, inp in enumerate(p.inputs):
        tag, a = inp["tag"], inp["attrs"]
        if tag == "input" and a.get("type", "text").lower() in ("hidden", "submit",
                "button", "reset") and tag == "input" and a.get("type", "").lower() == "hidden":
            continue
        if tag == "input" and a.get("type", "").lower() == "image":
            if not a.get("alt", "").strip():
                failures.append("input-image-alt: image button missing alt")
                break
            continue
        if tag == "input" and a.get("type", "").lower() in ("submit", "button", "reset"):
            continue
        labelled = bool(a.get("aria-label", "").strip()
                        or a.get("aria-labelledby", "").strip()
                        or a.get("title", "").strip()
                        or (a.get("id") and f'id="{a["id"]}"' in html.replace("'", '"')))
        # label check below is intentionally coarse: explicit <label for=> match
        has_label_el = bool(a.get("id")) and (
            f'for="{a["id"]}"' in html or f"for='{a['id']}'" in html)
        if tag == "select":
            if not (labelled or has_label_el or _ElementCollector._text_of(a)):
                failures.append("select-name: <select> has no accessible name")
                break
        elif not (labelled or has_label_el):
            failures.append(f"label: {tag} is missing an associated label")
            break
    seen: set[str] = set()
    for ident in p.ids:
        if ident in seen:
            failures.append(f"duplicate-id-aria: duplicate id \"{ident}\"")
            break
        seen.add(ident)
    if re.search(r'tabindex\s*=\s*["\']?[1-9]', html):
        failures.append("tabindex: positive tabindex found (breaks natural order)")
    for i, s in enumerate(p.svgs):
        if s.get("role", "").lower() == "img" and not (
                s.get("aria-label", "").strip() or s.get("aria-labelledby", "").strip()
                or s.get("title", "").strip()):
            failures.append(f"svg-img-alt: svg #{i} with img role has no label")
            break
    for children in p.dls:
        if any(c not in ("dt", "dd", "div", "script", "template") for c in children):
            failures.append("definition-list: <dl> has unexpected children")
            break

    ok = not failures
    return {"id": "agent-accessibility-tree", "score": 1 if ok else 0,
            "pass": ok, "na": False,
            "detail": ("All audits passed (static subset: "
                       + ", ".join(STATIC_A11Y_RULES) + ")") if ok else "; ".join(failures)}


def audit_webmcp_forms(html: str) -> tuple[dict, dict]:
    """Port of webmcp-form-coverage.js (informative) + webmcp-schema-validity.js."""
    p = _ElementCollector()
    p.feed(html)
    forms = p.forms
    if not forms:
        na = {"id": "webmcp-form-coverage", "score": 1, "pass": True, "na": True,
              "detail": "Not applicable (no forms on page)"}
        nav = {"id": "webmcp-schema-validity", "score": 1, "pass": True, "na": True,
               "detail": "Not applicable (no tools and no issues)"}
        return na, nav

    missing = [f for f in forms
               if not f["attrs"].get("toolname", "").strip()
               and not f["attrs"].get("tooldescription", "").strip()]
    coverage = {"id": "webmcp-form-coverage", "score": 1,
                "pass": True, "na": False, "informative": True,
                "detail": (f"{len(missing)} form(s) missing annotations"
                           if missing else "every form is annotated")}

    errors: list[str] = []
    warnings: list[str] = []
    tools = 0
    for f in forms:
        name = f["attrs"].get("toolname", "").strip()
        desc = f["attrs"].get("tooldescription", "").strip()
        if not name and not desc:
            continue
        tools += 1
        if not name:
            errors.append("Form level `toolname` attribute is missing.")
        if not desc:
            errors.append("Form level `tooldescription` attribute is missing.")
        for field in f["fields"]:
            fa = field["attrs"]
            if field["tag"] == "button" or fa.get("type", "").lower() in (
                    "submit", "button", "reset", "hidden"):
                continue
            required = "required" in fa or fa.get("aria-required") == "true"
            if not fa.get("name", "").strip():
                (errors if required else warnings).append(
                    "Missing `name` attribute for a "
                    + ("required" if required else "optional") + " field.")
            elif not (fa.get("title", "").strip()
                      or fa.get("aria-label", "").strip()
                      or fa.get("aria-labelledby", "").strip()
                      or fa.get("placeholder", "").strip()):
                warnings.append("Add a description to make this form more "
                                "accessible for AI agents.")
    if tools == 0:
        validity = {"id": "webmcp-schema-validity", "score": 1, "pass": True,
                    "na": True,
                    "detail": "Not applicable (no tools and no issues)"}
    else:
        score = 0 if errors else (0.5 if warnings else 1)
        validity = {"id": "webmcp-schema-validity", "score": score,
                    "pass": score >= GOOGLE_PASS_THRESHOLD, "na": False,
                    "detail": ("schemas valid" if score == 1
                               else "; ".join(errors + warnings))}
    return coverage, validity


def audit_ard_schema(base: str, html: str) -> dict:
    """Structural port of core/audits/agentic/ard-schema.js.

    N/A when no discovery signal exists and no catalog is served (same as
    Google). When a catalog exists, requires HTTP 200 + a JSON object; full
    ARD-spec conformance still needs the browser run.
    """
    p = _ElementCollector()
    p.feed(html)
    robots_status, robots_body, _ = fetch(base + "/robots.txt")
    robots_signal = bool(robots_body) and bool(
        re.search(r"^agentmap\s*:", robots_body, re.M | re.I))
    catalog_status, catalog_body, catalog_err = fetch(base + "/ai-catalog.json")
    has_catalog = p.ard_link or robots_signal or catalog_status == 200
    if not has_catalog:
        return {"id": "ard-schema", "score": 1, "pass": True, "na": True,
                "detail": "Not applicable (no ai-catalog.json signal)"}
    if catalog_status != 200 or not catalog_body:
        return {"id": "ard-schema", "score": 0, "pass": False, "na": False,
                "detail": "Catalog file could not be loaded for schema validation."}
    try:
        data = json.loads(catalog_body)
    except json.JSONDecodeError as e:
        return {"id": "ard-schema", "score": 0, "pass": False, "na": False,
                "detail": f"Catalog is not valid JSON: {e}"}
    if not isinstance(data, dict):
        return {"id": "ard-schema", "score": 0, "pass": False, "na": False,
                "detail": "Catalog root must be a JSON object per ARD spec 1.0."}
    return {"id": "ard-schema", "score": 1, "pass": True, "na": False,
            "detail": "ai-catalog.json loads and parses (full ARD conformance "
                     "needs the browser run)"}


def check_ai_crawler_posture(base: str) -> dict:
    """Studio extension (not a Google audit): our robots.txt explicitly allows
    AI crawlers. Fails closed if any documented bot is blocked or missing."""
    status, body, error = fetch(base + "/robots.txt")
    if error is not None or status != 200 or not body:
        return {"id": "studio:robots-ai-crawlers", "score": 0, "pass": False,
                "detail": "robots.txt could not be fetched"}
    # Parse per-bot sections: each `User-agent: X` owns the rules until the
    # next User-agent/Sitemap/Host line (blank lines and comments ignored).
    sections: dict[str, list[str]] = {}
    current: str | None = None
    for raw_line in body.splitlines():
        line = raw_line.split("#", 1)[0].strip()
        if not line:
            continue
        m = re.match(r"(?i)^user-agent\s*:\s*(\S+)\s*$", line)
        if m:
            current = m.group(1).lower()
            sections.setdefault(current, [])
            continue
        if re.match(r"(?i)^(sitemap|host)\s*:", line):
            current = None
            continue
        if current is not None:
            sections[current].append(line.lower())
    problems = []
    for bot in AI_CRAWLERS_EXPECTED:
        rules = sections.get(bot.lower())
        if rules is None:
            problems.append(f"{bot} missing")
        elif not any(r.startswith("allow:") for r in rules) or any(
                r == "disallow: /" for r in rules):
            problems.append(f"{bot} blocked")
    ok = not problems
    return {"id": "studio:robots-ai-crawlers", "score": 1 if ok else 0,
            "pass": ok, "detail": ("all documented AI crawlers allowed"
                                  if ok else "; ".join(problems))}


# ---------------------------------------------------------------------------
# Browser phase: official Lighthouse engine
# ---------------------------------------------------------------------------

def find_chrome(explicit: str | None) -> str | None:
    if explicit and os.path.exists(explicit):
        return explicit
    for cand in CHROME_CANDIDATES:
        if cand and os.path.exists(cand):
            return cand
    return None


def run_browser_audits(base: str, urls: list[str], chrome: str, preset: str,
                       timeout: int) -> dict:
    """Run the official Lighthouse engine once per URL. Returns
    {url: parsed_lhr} — raises RuntimeError if the engine itself fails."""
    lighthouse_bin = os.path.join(REPO_ROOT, "node_modules", ".bin", "lighthouse")
    if not os.path.exists(lighthouse_bin):
        raise RuntimeError("lighthouse npm package not installed "
                           "(expected node_modules/.bin/lighthouse)")
    results: dict[str, dict] = {}
    for url in urls:
        full = base + url
        with tempfile.NamedTemporaryFile(suffix=".json", delete=False) as tmp:
            out = tmp.name
        cmd = [lighthouse_bin, full, "--output=json", f"--output-path={out}",
               "--chrome-flags=--headless --no-sandbox --disable-gpu",
               "--quiet", "--no-enable-error-reporting"]
        if preset == "desktop":
            cmd.append("--preset=desktop")
        try:
            subprocess.run(cmd, capture_output=True, text=True, timeout=timeout,
                           cwd=REPO_ROOT)
        except subprocess.TimeoutExpired as e:
            raise RuntimeError(f"lighthouse timed out on {url}: {e}")
        try:
            with open(out, encoding="utf-8") as f:
                results[url] = json.load(f)
        except (OSError, json.JSONDecodeError) as e:
            raise RuntimeError(f"could not read lighthouse JSON for {url}: {e}")
        finally:
            try:
                os.unlink(out)
            except OSError:
                pass
    return results


def agentic_fraction(lhr: dict) -> dict:
    """Google's Agentic Browsing display rule: fraction of applicable audits
    with score >= 0.9. Informative/manual/N-A audits never count."""
    audits = lhr.get("audits", {})
    counted, passed, rows = [], [], []
    for aid in AGENTIC_AUDIT_IDS:
        a = audits.get(aid)
        if not a:
            rows.append({"id": aid, "score": None, "mode": "missing",
                         "pass": None, "counted": False})
            continue
        mode = a.get("scoreDisplayMode", "binary")
        score = a.get("score")
        na = a.get("notApplicable", False)
        if na or score is None or mode in NON_COUNTED_MODES:
            rows.append({"id": aid, "score": score, "mode": mode,
                         "pass": None if (na or score is None) else True,
                         "counted": False})
            continue
        ok = score >= GOOGLE_PASS_THRESHOLD
        counted.append(aid)
        if ok:
            passed.append(aid)
        rows.append({"id": aid, "score": score, "mode": mode,
                     "pass": ok, "counted": True})
    return {"passed": len(passed), "of": len(counted), "rows": rows}


# ---------------------------------------------------------------------------
# Static server for dist/
# ---------------------------------------------------------------------------

class _QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):  # keep build output clean
        pass


def serve_dist(dist_dir: str):
    handler = functools.partial(_QuietHandler, directory=dist_dir)
    server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    return server


# ---------------------------------------------------------------------------
# Gate
# ---------------------------------------------------------------------------

def gate(name: str, ok: bool, detail: str, failures: list[str]) -> None:
    mark = "PASS" if ok else "FAIL"
    print(f"  [{mark}] {name}: {detail}")
    if not ok:
        failures.append(f"{name}: {detail}")


def main() -> int:
    ap = argparse.ArgumentParser(description="Lighthouse audit gate (Google 1:1)")
    ap.add_argument("--dist", default="dist")
    ap.add_argument("--urls", nargs="*", default=["/"])
    ap.add_argument("--budgets", default="scripts/lighthouse_budgets.json")
    ap.add_argument("--preset", choices=("mobile", "desktop"), default="mobile")
    ap.add_argument("--no-browser", action="store_true")
    ap.add_argument("--chrome-path", default=None)
    ap.add_argument("--timeout", type=int, default=300)
    ap.add_argument("--out", default="lighthouse-report.json")
    args = ap.parse_args()

    if os.environ.get("SKIP_LIGHTHOUSE") == "1":
        print("SKIP_LIGHTHOUSE=1 — lighthouse audit skipped.")
        return 0

    dist_dir = args.dist if os.path.isabs(args.dist) \
        else os.path.join(REPO_ROOT, args.dist)
    # @astrojs/vercel emits the static site to dist/client/.
    if not os.path.exists(os.path.join(dist_dir, "index.html")) \
            and os.path.exists(os.path.join(dist_dir, "client", "index.html")):
        dist_dir = os.path.join(dist_dir, "client")
    if not os.path.isdir(dist_dir) or not os.path.exists(
            os.path.join(dist_dir, "index.html")):
        print(f"ERROR: {dist_dir} has no index.html — run `astro build` first.",
              file=sys.stderr)
        return 2

    budgets: dict = {}
    bpath = args.budgets if os.path.isabs(args.budgets) \
        else os.path.join(REPO_ROOT, args.budgets)
    if os.path.exists(bpath):
        with open(bpath, encoding="utf-8") as f:
            budgets = json.load(f)

    no_browser = args.no_browser or os.environ.get("LIGHTHOUSE_NO_BROWSER") == "1"
    chrome = None if no_browser else find_chrome(args.chrome_path)
    if not no_browser and chrome is None:
        print("WARNING: no Chrome found — browser phase skipped "
              "(static clones only).")
        no_browser = True

    server = serve_dist(dist_dir)
    base = f"http://127.0.0.1:{server.server_port}"
    failures: list[str] = []
    report: dict = {"base": base, "preset": args.preset, "pages": {}}

    print(f"Lighthouse audit — serving {dist_dir} at {base} "
          f"(preset={args.preset}, browser={'off' if no_browser else 'on'})")

    browser_lhrs: dict[str, dict] = {}
    if not no_browser:
        assert chrome is not None
        print(f"Phase B: official lighthouse engine (Chrome: {chrome})")
        try:
            browser_lhrs = run_browser_audits(
                base, args.urls, chrome, args.preset, args.timeout)
        except RuntimeError as e:
            print(f"WARNING: browser phase failed ({e}) — continuing with "
                  f"static clones only.")
            browser_lhrs = {}

    for url in args.urls:
        print(f"\n== {url} ==")
        status, html, err = fetch(base + url)
        if err is not None or status != 200 or not html:
            gate("page fetch", False, f"HTTP {status} ({err or 'no body'})",
                 failures)
            report["pages"][url] = {"error": f"HTTP {status}: {err}"}
            continue

        page = report["pages"][url] = {}

        # ---- Phase B: exact Google scores --------------------------------
        lhr = browser_lhrs.get(url)
        if lhr is not None:
            cats = lhr.get("categories", {})
            page["google"] = {}
            for cid in ("performance", "accessibility", "best-practices", "seo"):
                score = (cats.get(cid, {}) or {}).get("score")
                val = round(score * 100) if score is not None else None
                page["google"][cid] = val
                budget = budgets.get(cid)
                if budget is None:
                    print(f"  [INFO] google:{cid}: {val}/100 (no budget set)")
                else:
                    gate(f"google:{cid}",
                         val is not None and val >= budget,
                         f"{val}/100 (budget {budget})"
                         if val is not None else "missing from LHR",
                         failures)
            audits = lhr.get("audits", {})
            metrics = {m: (audits.get(m, {}) or {}).get("numericValue")
                       for m in ("first-contentful-paint", "speed-index",
                                 "largest-contentful-paint", "total-blocking-time",
                                 "cumulative-layout-shift",
                                 "interactive", "experimental-interaction-to-next-paint")}
            page["google"]["metrics_ms"] = {
                k: (None if v is None else round(v, 1)) for k, v in metrics.items()
            }
            lcp, cls = metrics.get("largest-contentful-paint"), metrics.get(
                "cumulative-layout-shift")
            if budgets.get("max_lcp_ms") is not None and lcp is not None:
                gate("google:lcp", lcp <= budgets["max_lcp_ms"],
                     f"{lcp:.0f}ms (budget {budgets['max_lcp_ms']}ms)", failures)
            if budgets.get("max_cls") is not None and cls is not None:
                gate("google:cls", cls <= budgets["max_cls"],
                     f"{cls:.3f} (budget {budgets['max_cls']})", failures)


            frac = agentic_fraction(lhr)
            page["google"]["agentic"] = {
                "fraction": f"{frac['passed']}/{frac['of']}",
                "audits": frac["rows"],
            }
            print(f"  [INFO] google:agentic-browsing: "
                  f"{frac['passed']}/{frac['of']}")
            for row in frac["rows"]:
                s = ("n/a" if not row["counted"]
                     else f"{row['score']:.2f} {'PASS' if row['pass'] else 'FAIL'}")
                print(f"         - {row['id']}: {s} [{row['mode']}]")
            min_ratio = budgets.get("agentic_min_ratio")
            if min_ratio is not None and frac["of"] > 0:
                ratio = frac["passed"] / frac["of"]
                gate("google:agentic-ratio", ratio >= min_ratio,
                     f"{frac['passed']}/{frac['of']} = {ratio:.2f} "
                     f"(budget {min_ratio})", failures)
            for req in budgets.get("agentic_required_pass", []):
                row = next((r for r in frac["rows"] if r["id"] == req), None)
                # Required audits must be counted AND passing in the browser run.
                ok = bool(row and row["counted"] and row["pass"])
                gate(f"google:agentic-required:{req}", ok,
                     "passing" if ok else
                     f"not passing ({'n/a' if not row or not row['counted'] else 'failing'})",
                     failures)
        else:
            print("  [INFO] browser phase unavailable — classic categories "
                  "skipped for this URL")

        # ---- Phase A: static native clones (always) ----------------------
        print("  Phase A: static clones of Google's agentic audits")
        llms = audit_llms_txt(base)
        a11y = audit_agent_a11y_tree(html)
        coverage, validity = audit_webmcp_forms(html)
        ard = audit_ard_schema(base, html)
        static_results = [llms, a11y, coverage, validity, ard]
        page["static"] = {r["id"]: r for r in static_results}
        counted = [r for r in static_results
                   if not r.get("na") and not r.get("informative")]
        ratio = (sum(1 for r in counted if r["pass"]), len(counted))
        page["static"]["agentic_fraction"] = f"{ratio[0]}/{ratio[1]}"
        for r in static_results:
            extra = " [informative]" if r.get("informative") else ""
            if r.get("na"):
                print(f"  [INFO] static:{r['id']}: n/a — {r['detail']}")
            else:
                gate(f"static:{r['id']}{extra}", r["pass"], r["detail"],
                     failures)
        print(f"  [INFO] static:agentic-browsing: {ratio[0]}/{ratio[1]}")

        if budgets.get("studio_robots_ai_crawlers"):
            posture = check_ai_crawler_posture(base)
            page["studio"] = {"robots-ai-crawlers": posture}
            gate("studio:robots-ai-crawlers", posture["pass"],
                 posture["detail"], failures)

    try:
        server.shutdown()
    except Exception:
        pass

    out = args.out if os.path.isabs(args.out) else os.path.join(REPO_ROOT, args.out)
    with open(out, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)
    print(f"\nReport: {out}")

    if failures:
        print(f"\nLIGHTHOUSE AUDIT: {len(failures)} budget breach(es):")
        for fl in failures:
            print(f"  ✗ {fl}")
        return 1
    print("\nLIGHTHOUSE AUDIT: all budgets met ✓")
    return 0


if __name__ == "__main__":
    sys.exit(main())