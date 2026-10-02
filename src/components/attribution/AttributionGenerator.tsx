import React, { useState } from "react";
import { NextReachBadge } from "./NextReachBadge";

export const AttributionGenerator: React.FC = () => {
  const [variant, setVariant] = useState<"pill" | "minimal" | "card" | "floating" | "banner">("pill");
  const [theme, setTheme] = useState<"dark" | "light" | "glass" | "terracotta">("dark");
  const [phrase, setPhrase] = useState<string>("Crafted by");
  const [clientName, setClientName] = useState<string>("shadow-shuriken");
  const [previewBg, setPreviewBg] = useState<"dark" | "light" | "charcoal">("dark");
  const [activeTab, setActiveTab] = useState<"react" | "astro" | "html" | "script">("react");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const phraseOptions = [
    "Crafted by",
    "Engineered by",
    "Built by",
    "Designed & Developed by",
    "Powered by",
  ];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Generate dynamic code snippets
  const getReactUsageCode = () => {
    return `// 1. Install or copy NextReachBadge.tsx to your components folder
import { NextReachBadge } from "@/components/attribution/NextReachBadge";

export function Footer() {
  return (
    <footer className="py-8 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <p className="text-sm text-zinc-400">© 2026 Your Company</p>
        <NextReachBadge
          variant="${variant}"
          theme="${theme}"
          phrase="${phrase}"
          clientName="${clientName || "client-site"}"
        />
      </div>
    </footer>
  );
}`;
  };

  const getAstroUsageCode = () => {
    return `---
// 1. Copy NextReachBadge.astro to src/components/
import NextReachBadge from "@/components/attribution/NextReachBadge.astro";
---

<footer class="py-8 border-t border-zinc-800">
  <div class="max-w-7xl mx-auto flex items-center justify-between">
    <p class="text-sm text-zinc-400">© 2026 Your Company</p>
    <NextReachBadge
      variant="${variant}"
      theme="${theme}"
      phrase="${phrase}"
      clientName="${clientName || "client-site"}"
    />
  </div>
</footer>`;
  };

  const getHtmlCode = () => {
    const isTerracotta = theme === "terracotta";
    const isLight = theme === "light";
    const bg = isTerracotta ? "#C76B50" : isLight ? "#FDFBF7" : "#18181B";
    const border = isTerracotta ? "rgba(255,255,255,0.25)" : isLight ? "rgba(39,39,42,0.15)" : "rgba(255,255,255,0.12)";
    const textSub = isTerracotta ? "rgba(255,255,255,0.85)" : isLight ? "#71717A" : "#A1A1AA";
    const textBrand = isLight ? "#18181B" : "#FFFFFF";
    const accent = isTerracotta ? "#FFFFFF" : "#C76B50";
    const markBg = isTerracotta ? "rgba(255,255,255,0.2)" : isLight ? "#F4EFEA" : "#27272A";

    return `<!-- NextReach Studio Attribution Badge -->
<a 
  href="https://nextreachstudio.vercel.app/?utm_source=${encodeURIComponent(clientName || "client-site")}&utm_medium=html_badge&utm_campaign=attribution"
  target="_blank"
  rel="noopener noreferrer"
  style="display: inline-flex; align-items: center; gap: 8px; text-decoration: none; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 6px 14px 6px 8px; background: ${bg}; border: 1px solid ${border}; border-radius: 9999px; box-shadow: 0 4px 16px rgba(0,0,0,0.15); transition: all 0.2s ease;"
>
  <span style="display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 6px; background: ${markBg}; color: ${accent}; padding: 2px;">
    <svg viewBox="0 0 120 150" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="29,38 60,8 91,38" />
      <line x1="60" y1="8" x2="60" y2="142" />
      <path d="M 10,142 L 10,40 Q 10,33 17,37 L 60,142" />
      <path d="M 60,54 C 88,54 110,66 110,83 C 110,100 88,104 60,104" />
      <line x1="60" y1="104" x2="110" y2="142" />
    </svg>
  </span>
  <span style="display: inline-flex; align-items: center; gap: 4px; font-size: 11.5px; line-height: 1;">
    <span style="color: ${textSub}; font-weight: 500;">${phrase}</span>
    <span style="color: ${textBrand}; font-weight: 700;">NextReach <span style="color: ${accent};">Studio</span></span>
    <span style="color: ${accent}; font-size: 10px; margin-left: 1px;">↗</span>
  </span>
</a>`;
  };

  const getScriptCode = () => {
    return `<!-- NextReach Studio Universal Embed (Webflow / Shopify / WordPress / Squarespace) -->
<script 
  src="https://nextreachstudio.vercel.app/attribution/badge.js"
  data-theme="${theme}"
  data-variant="${variant}"
  data-phrase="${phrase}"
  data-client="${clientName || "client-site"}"
  data-position="bottom-right"
  async
></script>`;
  };

  const activeSnippet =
    activeTab === "react"
      ? getReactUsageCode()
      : activeTab === "astro"
      ? getAstroUsageCode()
      : activeTab === "html"
      ? getHtmlCode()
      : getScriptCode();

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10">
      {/* Configuration & Controls Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Customization Controls */}
        <div className="lg:col-span-5 bg-[#1F1F23]/90 border border-white/10 rounded-2xl p-6 space-y-6 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <div className="w-2 h-2 rounded-full bg-[#C76B50] animate-pulse" />
            <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-white">
              Badge Customizer
            </h3>
          </div>

          {/* Client Name Input for UTM */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2 font-mono uppercase tracking-wider">
              Client Site / Project Identifier
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ""))}
              placeholder="e.g. shadow-shuriken, saffron-and-smoke"
              className="w-full bg-[#141416] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#C76B50] transition-colors font-mono"
            />
            <p className="text-[11px] text-zinc-500 mt-1">
              Auto-appends <code className="text-[#C76B50]">?utm_source={clientName || "client-site"}</code> for studio referral tracking.
            </p>
          </div>

          {/* Attribution Phrase Selector */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2 font-mono uppercase tracking-wider">
              Attribution Phrase
            </label>
            <div className="grid grid-cols-2 gap-2">
              {phraseOptions.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPhrase(p)}
                  className={`text-xs px-3 py-2 rounded-xl text-left font-medium transition-all ${
                    phrase === p
                      ? "bg-[#C76B50] text-white font-semibold shadow-md shadow-[#C76B50]/20"
                      : "bg-[#141416] text-zinc-400 hover:text-white hover:bg-white/5 border border-white/5"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Badge Variant Selector */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2 font-mono uppercase tracking-wider">
              Layout Variant
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["pill", "minimal", "card", "floating", "banner"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVariant(v)}
                  className={`text-xs px-3 py-2 rounded-xl text-center capitalize font-medium transition-all ${
                    variant === v
                      ? "bg-[#C76B50] text-white font-semibold shadow-md shadow-[#C76B50]/20"
                      : "bg-[#141416] text-zinc-400 hover:text-white hover:bg-white/5 border border-white/5"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Selector */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2 font-mono uppercase tracking-wider">
              Color Theme
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(["dark", "light", "glass", "terracotta"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTheme(t)}
                  className={`text-xs px-2.5 py-2 rounded-xl text-center capitalize font-medium transition-all ${
                    theme === t
                      ? "bg-white text-zinc-950 font-bold shadow-md"
                      : "bg-[#141416] text-zinc-400 hover:text-white hover:bg-white/5 border border-white/5"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Preview Background Toggle */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2 font-mono uppercase tracking-wider">
              Preview Canvas Canvas Background
            </label>
            <div className="flex gap-2">
              {(
                [
                  { id: "dark", label: "Dark Canvas", color: "bg-[#141416]" },
                  { id: "light", label: "Light Canvas", color: "bg-[#FAF8F5]" },
                  { id: "charcoal", label: "Charcoal Mesh", color: "bg-[#2A2A2E]" },
                ] as const
              ).map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setPreviewBg(b.id)}
                  className={`flex-1 text-[11px] py-1.5 px-2 rounded-lg border text-center transition-all ${
                    previewBg === b.id
                      ? "border-[#C76B50] text-white font-semibold"
                      : "border-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Preview & Code Generator */}
        <div className="lg:col-span-7 space-y-6">
          {/* Live Preview Card */}
          <div className="bg-[#1F1F23]/90 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">
                Live Interactive Preview
              </span>
              <span className="text-[11px] font-mono text-[#C76B50] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Target: nextreachstudio.vercel.app
              </span>
            </div>

            <div
              className={`min-h-[220px] rounded-xl p-8 flex items-center justify-center transition-colors border border-white/5 relative overflow-hidden ${
                previewBg === "dark"
                  ? "bg-[#121214]"
                  : previewBg === "light"
                  ? "bg-[#F4EFEA]"
                  : "bg-[#25252A]"
              }`}
            >
              {/* Subtle background grid */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(#C76B50 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />

              <div className="relative z-10 w-full flex justify-center">
                <NextReachBadge
                  variant={variant}
                  theme={theme}
                  phrase={phrase}
                  clientName={clientName}
                  showLocation={true}
                  showWhatsApp={true}
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-zinc-400 gap-2">
              <span className="font-mono text-[11px]">
                Clicking the badge opens studio with referral parameters.
              </span>
              <a
                href={`https://nextreachstudio.vercel.app/?utm_source=${clientName || "test"}&utm_medium=preview&utm_campaign=attribution`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C76B50] hover:underline font-medium inline-flex items-center gap-1"
              >
                <span>Test Live Link</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* 1-Click Code Snippet Generator */}
          <div className="bg-[#1F1F23]/90 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
              {/* Framework Tabs */}
              <div className="flex items-center gap-1 bg-[#141416] p-1 rounded-xl border border-white/10">
                {(
                  [
                    { id: "react", label: "React / Next.js" },
                    { id: "astro", label: "Astro" },
                    { id: "html", label: "Vanilla HTML" },
                    { id: "script", label: "CMS Embed Script" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-[#C76B50] text-white font-semibold shadow-sm"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Copy Button */}
              <button
                type="button"
                onClick={() => handleCopy(activeSnippet, "active-snippet")}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow-md active:scale-95"
              >
                {copiedKey === "active-snippet" ? (
                  <>
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <span>Copy Snippet</span>
                    <span className="text-[10px] font-mono">⌘C</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Display Area */}
            <div className="relative">
              <pre className="bg-[#121214] border border-white/10 rounded-xl p-4 text-xs font-mono text-zinc-300 overflow-x-auto max-h-[260px] leading-relaxed select-all">
                <code>{activeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Static Vector Assets & Download Hub */}
      <div className="bg-[#1F1F23]/90 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <h3 className="text-base font-bold font-display text-white">
              Vector SVG Badges &amp; Master Assets
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Ready-to-use vector SVG files hosted directly in the studio repository under <code className="text-[#C76B50]">/public/attribution/</code>.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-zinc-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
              Zero Dependencies • Pure Vectors
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Dark Badge SVG */}
          <div className="bg-[#141416] border border-white/10 rounded-xl p-4 space-y-3 hover:border-[#C76B50]/40 transition-colors">
            <div className="h-20 bg-[#1F1F23] rounded-lg flex items-center justify-center p-2">
              <img src="/attribution/nextreach-badge-dark.svg" alt="Dark Badge" className="max-h-10" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white font-mono">nextreach-badge-dark.svg</span>
              <a
                href="/attribution/nextreach-badge-dark.svg"
                download="nextreach-badge-dark.svg"
                className="text-[11px] font-mono text-[#C76B50] hover:underline font-semibold"
              >
                Download ↓
              </a>
            </div>
          </div>

          {/* Light Badge SVG */}
          <div className="bg-[#141416] border border-white/10 rounded-xl p-4 space-y-3 hover:border-[#C76B50]/40 transition-colors">
            <div className="h-20 bg-[#FAF8F5] rounded-lg flex items-center justify-center p-2">
              <img src="/attribution/nextreach-badge-light.svg" alt="Light Badge" className="max-h-10" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white font-mono">nextreach-badge-light.svg</span>
              <a
                href="/attribution/nextreach-badge-light.svg"
                download="nextreach-badge-light.svg"
                className="text-[11px] font-mono text-[#C76B50] hover:underline font-semibold"
              >
                Download ↓
              </a>
            </div>
          </div>

          {/* Terracotta Badge SVG */}
          <div className="bg-[#141416] border border-white/10 rounded-xl p-4 space-y-3 hover:border-[#C76B50]/40 transition-colors">
            <div className="h-20 bg-[#1F1F23] rounded-lg flex items-center justify-center p-2">
              <img src="/attribution/nextreach-badge-terracotta.svg" alt="Terracotta Badge" className="max-h-10" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white font-mono">nextreach-badge-terracotta.svg</span>
              <a
                href="/attribution/nextreach-badge-terracotta.svg"
                download="nextreach-badge-terracotta.svg"
                className="text-[11px] font-mono text-[#C76B50] hover:underline font-semibold"
              >
                Download ↓
              </a>
            </div>
          </div>

          {/* Banner Card SVG */}
          <div className="bg-[#141416] border border-white/10 rounded-xl p-4 space-y-3 hover:border-[#C76B50]/40 transition-colors">
            <div className="h-20 bg-[#1F1F23] rounded-lg flex items-center justify-center p-2 overflow-hidden">
              <img src="/attribution/nextreach-banner.svg" alt="Banner Card" className="max-h-12 scale-90" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white font-mono">nextreach-banner.svg</span>
              <a
                href="/attribution/nextreach-banner.svg"
                download="nextreach-banner.svg"
                className="text-[11px] font-mono text-[#C76B50] hover:underline font-semibold"
              >
                Download ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttributionGenerator;
