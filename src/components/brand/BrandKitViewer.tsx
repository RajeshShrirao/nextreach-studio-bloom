import React, { useState } from "react";

interface BrandAsset {
  id: string;
  name: string;
  category: "logo" | "mark" | "monochrome" | "app" | "guidelines";
  description: string;
  src: string;
  dimensions: string;
  recommendedBackground: "light" | "dark" | "any";
  svgCode?: string;
  format: "SVG Vector" | "JPG Master Board";
  isVector: boolean;
}

const BRAND_ASSETS: BrandAsset[] = [
  {
    id: "primary-horizontal-light",
    name: "Primary Horizontal Logo (Light Canvas)",
    category: "logo",
    description: "Official full lockup for light and cream backgrounds with Charcoal 'NextReach' and Terracotta 'Studio'.",
    src: "/brand/logo-horizontal.svg",
    dimensions: "360 × 64 px (Scalable Vector)",
    recommendedBackground: "light",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "primary-horizontal-dark",
    name: "Primary Horizontal Logo (Dark Canvas)",
    category: "logo",
    description: "Official full lockup for dark surfaces, hero sections, and dark-mode UI with Crisp White wordmark.",
    src: "/brand/logo-horizontal-dark.svg",
    dimensions: "360 × 64 px (Scalable Vector)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "primary-stacked-light",
    name: "Stacked Vertical Logo (Light Canvas)",
    category: "logo",
    description: "Centered emblem above bold NextReach brand name with tracked STUDIO subtitle for square/vertical layouts.",
    src: "/brand/logo-stacked.svg",
    dimensions: "240 × 200 px (Scalable Vector)",
    recommendedBackground: "light",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "primary-stacked-dark",
    name: "Stacked Vertical Logo (Dark Canvas)",
    category: "logo",
    description: "Vertical lockup inverted for dark substrates, merchandise, packaging, and high-impact presentation decks.",
    src: "/brand/logo-stacked-dark.svg",
    dimensions: "240 × 200 px (Scalable Vector)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "standalone-mark-terracotta",
    name: "Standalone Emblem Mark (Terracotta)",
    category: "mark",
    description: "The core architectural geometric monogram fusing the Upward Arrow (Reach) with letters 'N' and 'R'.",
    src: "/brand/logo-mark.svg",
    dimensions: "120 × 150 px (Scalable Vector)",
    recommendedBackground: "any",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "standalone-mark-white",
    name: "Standalone Emblem Mark (Crisp White)",
    category: "mark",
    description: "White stroke variant of the emblem mark for dark photographs, solid color backgrounds, and laser etching.",
    src: "/brand/logo-mark-white.svg",
    dimensions: "120 × 150 px (Scalable Vector)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "standalone-mark-black",
    name: "Standalone Emblem Mark (Charcoal / Black)",
    category: "mark",
    description: "Charcoal single-color stroke variant for print documents, newspaper, receipts, and technical blueprints.",
    src: "/brand/logo-mark-black.svg",
    dimensions: "120 × 150 px (Scalable Vector)",
    recommendedBackground: "light",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "app-icon-squircle-dark",
    name: "Master App & Profile Icon (512x512 Dark)",
    category: "app",
    description: "Flagship dark squircle icon with subtle terracotta rim border and ambient radial glow for Twitter, GitHub, and mobile apps.",
    src: "/brand/app-icon.svg",
    dimensions: "512 × 512 px (Squircle Vector)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "app-icon-squircle-cream",
    name: "Cream App & Profile Icon (512x512 Light)",
    category: "app",
    description: "Light surface squircle avatar with warm cream gradient and terracotta perimeter for light mode app launchers.",
    src: "/brand/app-icon-cream.svg",
    dimensions: "512 × 512 px (Squircle Vector)",
    recommendedBackground: "light",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "mono-horizontal-black",
    name: "Monochrome Black Horizontal Logo",
    category: "monochrome",
    description: "Pure 1-color Charcoal/Black lockup for single-ink printing, letterheads, stamps, and fax transmissions.",
    src: "/brand/logo-horizontal-mono-black.svg",
    dimensions: "360 × 64 px (Scalable Vector)",
    recommendedBackground: "light",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "mono-horizontal-white",
    name: "Monochrome White Horizontal Logo",
    category: "monochrome",
    description: "Pure 1-color White lockup for vinyl cuts, dark uniforms, screen printing, and frosted glass signage.",
    src: "/brand/logo-horizontal-mono-white.svg",
    dimensions: "360 × 64 px (Scalable Vector)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "mono-horizontal-terracotta",
    name: "Monochrome Terracotta Horizontal Logo",
    category: "monochrome",
    description: "Pure 1-color Terracotta lockup for editorial craft paper, luxury packaging, and warm single-ink press.",
    src: "/brand/logo-horizontal-mono-terracotta.svg",
    dimensions: "360 × 64 px (Scalable Vector)",
    recommendedBackground: "light",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "mono-stacked-black",
    name: "Monochrome Black Stacked Logo",
    category: "monochrome",
    description: "Pure 1-color black vertical lockup for invoices, technical specs, and physical product stamps.",
    src: "/brand/logo-stacked-mono-black.svg",
    dimensions: "240 × 200 px (Scalable Vector)",
    recommendedBackground: "light",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "mono-stacked-white",
    name: "Monochrome White Stacked Logo",
    category: "monochrome",
    description: "Pure 1-color white vertical lockup for dark apparel, laser engraving, and dark packaging surfaces.",
    src: "/brand/logo-stacked-mono-white.svg",
    dimensions: "240 × 200 px (Scalable Vector)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "guidelines-clearspace",
    name: "Logo Clear-Space Exclusion Rules (1X Grid)",
    category: "guidelines",
    description: "Defines the mandatory 1X clearance boundary around all logotypes to prevent visual crowding.",
    src: "/brand/logo-clearspace.svg",
    dimensions: "720 × 320 px (Technical Vector)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "guidelines-minsize",
    name: "Minimum Size & Resolution Thresholds",
    category: "guidelines",
    description: "Guaranteed legibility minimums for Digital screens (pixels) and Physical Print (millimeters).",
    src: "/brand/logo-minsize.svg",
    dimensions: "760 × 380 px (Technical Vector)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "guidelines-misuse",
    name: "Logo Misuse & Prohibited Modifications",
    category: "guidelines",
    description: "6 mandatory visual rules: Do not distort, do not recolor, do not rotate, do not crowd, do not add shadows, do not rearrange.",
    src: "/brand/logo-misuse.svg",
    dimensions: "840 × 560 px (Technical Vector)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "guidelines-construction",
    name: "Geometric Construction & Blueprint Architecture",
    category: "guidelines",
    description: "Mathematical blueprint detailing the 60° arrow apex, vertical axis, and bezier curves of the 'N' + 'R' monogram.",
    src: "/brand/brand-construction.svg",
    dimensions: "640 × 480 px (Technical Vector)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "master-3x3-overview",
    name: "Master 3×3 Brand Identity Board",
    category: "guidelines",
    description: "High-end 3x3 identity deck presentation board encapsulating the full visual world of NextReach Studio.",
    src: "/brand/brandkit-overview.jpg",
    dimensions: "1920 × 1440 px (High-Res Comps)",
    recommendedBackground: "dark",
    format: "JPG Master Board",
    isVector: false,
  },
];

const COLOR_TOKENS = [
  {
    name: "Signature Terracotta",
    role: "Primary Brand Accent & Mark Stroke",
    hex: "#C76B50",
    rgb: "rgb(199, 107, 80)",
    hsl: "hsl(14, 52%, 55%)",
    contrast: "4.8:1 on Charcoal (AA) | 4.2:1 on Cream",
    cssVar: "--color-terracotta",
    bgClass: "bg-[#C76B50]",
    textDark: false,
  },
  {
    name: "Terracotta Hover",
    role: "Interactive Hover States & Highlights",
    hex: "#D97A5E",
    rgb: "rgb(217, 122, 94)",
    hsl: "hsl(14, 61%, 61%)",
    contrast: "5.5:1 on Charcoal (AA)",
    cssVar: "--color-terracotta-hover",
    bgClass: "bg-[#D97A5E]",
    textDark: false,
  },
  {
    name: "Terracotta Deep",
    role: "Active States & Heavy Borders",
    hex: "#A8523A",
    rgb: "rgb(168, 82, 58)",
    hsl: "hsl(13, 49%, 44%)",
    contrast: "3.9:1 on Charcoal | 5.8:1 on Cream (AA)",
    cssVar: "--color-terracotta-active",
    bgClass: "bg-[#A8523A]",
    textDark: false,
  },
  {
    name: "Warm Cream Canvas",
    role: "Primary Light Background & App Base",
    hex: "#FAF8F5",
    rgb: "rgb(250, 248, 245)",
    hsl: "hsl(36, 33%, 97%)",
    contrast: "15.2:1 on Charcoal (AAA)",
    cssVar: "--color-cream",
    bgClass: "bg-[#FAF8F5]",
    textDark: true,
  },
  {
    name: "Cream Surface",
    role: "Cards, Modals & Elevated Surfaces",
    hex: "#F3EFE8",
    rgb: "rgb(243, 239, 232)",
    hsl: "hsl(38, 28%, 93%)",
    contrast: "13.8:1 on Charcoal (AAA)",
    cssVar: "--color-cream-surface",
    bgClass: "bg-[#F3EFE8]",
    textDark: true,
  },
  {
    name: "Deep Charcoal",
    role: "Primary Typography & Dark Substrates",
    hex: "#1F1F23",
    rgb: "rgb(31, 31, 35)",
    hsl: "hsl(240, 6%, 13%)",
    contrast: "15.2:1 on Cream (AAA)",
    cssVar: "--color-charcoal",
    bgClass: "bg-[#1F1F23]",
    textDark: false,
  },
  {
    name: "Charcoal Surface",
    role: "Dark Cards & Elevated App Docks",
    hex: "#2A2A2E",
    rgb: "rgb(42, 42, 46)",
    hsl: "hsl(240, 5%, 17%)",
    contrast: "12.4:1 on Cream (AAA)",
    cssVar: "--color-charcoal-surface",
    bgClass: "bg-[#2A2A2E]",
    textDark: false,
  },
  {
    name: "Architectural Stone",
    role: "Secondary Text & Technical Labels",
    hex: "#6E6862",
    rgb: "rgb(110, 104, 98)",
    hsl: "hsl(30, 6%, 41%)",
    contrast: "4.9:1 on Cream (AA)",
    cssVar: "--color-stone",
    bgClass: "bg-[#6E6862]",
    textDark: false,
  },
];

export default function BrandKitViewer() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [previewBg, setPreviewBg] = useState<"cream" | "charcoal" | "white" | "grid">("cream");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredAssets = BRAND_ASSETS.filter((asset) => {
    if (activeTab === "all") return true;
    return asset.category === activeTab;
  });

  const handleCopyLink = async (src: string, id: string) => {
    try {
      const fullUrl = `${window.location.origin}${src}`;
      await navigator.clipboard.writeText(fullUrl);
      setCopiedId(`link-${id}`);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      // Fallback
    }
  };

  const handleCopyHex = async (hex: string, name: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedId(`hex-${name}`);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      // Fallback
    }
  };

  const handleCopySvgCode = async (src: string, id: string) => {
    try {
      const res = await fetch(src);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopiedId(`code-${id}`);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      // Fallback
    }
  };

  const getPreviewBgClass = () => {
    switch (previewBg) {
      case "charcoal":
        return "bg-[#1F1F23]";
      case "white":
        return "bg-[#FFFFFF]";
      case "grid":
        return "bg-[#FAF8F5] bg-[radial-gradient(#C76B50_1px,transparent_1px)] [background-size:16px_16px]";
      case "cream":
      default:
        return "bg-[#FAF8F5]";
    }
  };

  return (
    <div className="space-y-16">
      {/* Toast Notification */}
      {copiedId && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#1F1F23] text-[#FAF8F5] text-xs font-mono rounded-xl shadow-2xl border border-[#C76B50]/30 animate-bounce">
          <svg className="w-4 h-4 text-[#C76B50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <span>Copied to clipboard!</span>
        </div>
      )}

      {/* Filter Tabs & Preview Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 bg-white/80 backdrop-blur-md rounded-2xl border border-[#1F1F23]/8 shadow-sm">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1">
          {[
            { id: "all", label: "All Assets (19)" },
            { id: "logo", label: "Logos & Lockups" },
            { id: "mark", label: "Standalone Marks" },
            { id: "monochrome", label: "Monochrome" },
            { id: "app", label: "App & Profile Icons" },
            { id: "guidelines", label: "Rules & Blueprints" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#C76B50] text-white shadow-sm"
                  : "text-[#6E6862] hover:text-[#1F1F23] hover:bg-[#FAF8F5]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Global Preview Background Switcher */}
        <div className="flex items-center gap-2 text-xs text-[#6E6862] pl-2 border-t md:border-t-0 md:border-l border-[#1F1F23]/8 pt-2 md:pt-0">
          <span className="font-mono text-[11px] font-semibold text-[#1F1F23]">Canvas:</span>
          <div className="inline-flex rounded-lg p-0.5 bg-[#FAF8F5] border border-[#1F1F23]/8">
            <button
              title="Cream Canvas"
              onClick={() => setPreviewBg("cream")}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                previewBg === "cream" ? "bg-white text-[#1F1F23] shadow-xs font-bold" : "text-[#6E6862]"
              }`}
            >
              Cream
            </button>
            <button
              title="Dark Charcoal Canvas"
              onClick={() => setPreviewBg("charcoal")}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                previewBg === "charcoal" ? "bg-[#1F1F23] text-white shadow-xs font-bold" : "text-[#6E6862]"
              }`}
            >
              Charcoal
            </button>
            <button
              title="Pure White Canvas"
              onClick={() => setPreviewBg("white")}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                previewBg === "white" ? "bg-white text-[#1F1F23] shadow-xs font-bold" : "text-[#6E6862]"
              }`}
            >
              White
            </button>
            <button
              title="Grid Canvas"
              onClick={() => setPreviewBg("grid")}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                previewBg === "grid" ? "bg-white text-[#C76B50] shadow-xs font-bold" : "text-[#6E6862]"
              }`}
            >
              Grid
            </button>
          </div>
        </div>
      </div>

      {/* Asset Grid Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => {
          const isDarkSpec = asset.recommendedBackground === "dark";
          const cardBgClass =
            asset.category === "guidelines"
              ? "bg-[#141416]"
              : isDarkSpec && previewBg === "cream"
              ? "bg-[#1F1F23]"
              : getPreviewBgClass();

          return (
            <div
              key={asset.id}
              className="group bg-white rounded-2xl border border-[#1F1F23]/8 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#C76B50]/30 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Meta Header */}
              <div className="p-4 border-b border-[#1F1F23]/6 flex items-center justify-between gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#F0ECE4] text-[#4A4844]">
                  {asset.format}
                </span>
                <span className="text-[11px] font-mono text-[#8C847B] truncate">{asset.dimensions}</span>
              </div>

              {/* Visual Display Stage */}
              <div
                className={`relative p-8 min-h-[220px] flex items-center justify-center transition-colors duration-200 overflow-hidden ${cardBgClass}`}
              >
                <img
                  src={asset.src}
                  alt={asset.name}
                  className="max-h-[160px] max-w-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Card Footer & Action Buttons */}
              <div className="p-5 bg-white space-y-4 border-t border-[#1F1F23]/6">
                <div>
                  <h3 className="text-sm font-bold font-display text-[#1F1F23] mb-1 group-hover:text-[#C76B50] transition-colors">
                    {asset.name}
                  </h3>
                  <p className="text-xs text-[#6E6862] leading-relaxed line-clamp-2">{asset.description}</p>
                </div>

                {/* Button Toolbar */}
                <div className="flex items-center gap-2 pt-2 border-t border-[#1F1F23]/6">
                  {/* Download Direct */}
                  <a
                    href={asset.src}
                    download
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold font-mono bg-[#FAF8F5] text-[#1F1F23] border border-[#1F1F23]/10 hover:bg-[#C76B50] hover:text-white hover:border-[#C76B50] transition-all"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span>Download</span>
                  </a>

                  {/* Copy Vector Code */}
                  {asset.isVector && (
                    <button
                      type="button"
                      onClick={() => handleCopySvgCode(asset.src, asset.id)}
                      className="inline-flex items-center justify-center p-2 rounded-xl text-[#6E6862] hover:text-[#C76B50] hover:bg-[#C76B50]/10 border border-[#1F1F23]/10 transition-colors cursor-pointer"
                      title="Copy SVG XML Source Code"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                    </button>
                  )}

                  {/* Copy Link */}
                  <button
                    type="button"
                    onClick={() => handleCopyLink(asset.src, asset.id)}
                    className="inline-flex items-center justify-center p-2 rounded-xl text-[#6E6862] hover:text-[#C76B50] hover:bg-[#C76B50]/10 border border-[#1F1F23]/10 transition-colors cursor-pointer"
                    title="Copy Direct URL"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Master 3x3 Presentation Board Showcase */}
      <div className="bg-[#141416] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C76B50]/20 border border-[#C76B50]/30 text-[#E88C72] text-xs font-mono font-bold mb-2">
              <span>Identity System Master Board</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              NextReach Studio 3×3 Brand World
            </h2>
            <p className="text-xs sm:text-sm text-[#A69D92] mt-1">
              Curated visual thesis encapsulating emblem construction, typography specimens, physical stationery, and digital UI.
            </p>
          </div>

          <a
            href="/brand/brandkit-overview.jpg"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C76B50] hover:bg-[#D97A5E] text-white font-mono text-xs font-bold transition-all shadow-lg self-start sm:self-auto"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download Master Comps (JPG)</span>
          </a>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#1A1A1D]">
          <img
            src="/brand/brandkit-overview.jpg"
            alt="NextReach Studio Master Brand Guidelines 3x3 Presentation Board"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Systematic Color Tokens */}
      <section className="space-y-6 pt-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C76B50]/10 border border-[#C76B50]/20 text-[#C76B50] text-xs font-mono font-bold mb-2">
            <span>Color Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#1F1F23]">
            Curated Color Palette &amp; Contrast Tokens
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6862] mt-1 max-w-2xl">
            Our signature architectural terracotta paired with warm cream surfaces and deep charcoal typography. Click any swatch to copy its HEX value.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COLOR_TOKENS.map((token) => (
            <div
              key={token.name}
              onClick={() => handleCopyHex(token.hex, token.name)}
              className="group bg-white rounded-2xl border border-[#1F1F23]/8 p-4 shadow-sm hover:shadow-lg hover:border-[#C76B50]/40 transition-all cursor-pointer space-y-3"
            >
              {/* Color Block */}
              <div
                className={`h-24 rounded-xl border border-black/5 flex items-end justify-between p-3 transition-transform group-hover:scale-[1.02] ${token.bgClass}`}
              >
                <span
                  className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                    token.textDark ? "bg-black/10 text-black" : "bg-white/20 text-white backdrop-blur-xs"
                  }`}
                >
                  {token.hex}
                </span>
                <span
                  className={`text-[10px] font-mono opacity-80 ${token.textDark ? "text-black" : "text-white"}`}
                >
                  Click to copy
                </span>
              </div>

              {/* Meta */}
              <div>
                <h4 className="text-sm font-bold font-display text-[#1F1F23]">{token.name}</h4>
                <p className="text-[11px] text-[#6E6862] mt-0.5">{token.role}</p>
              </div>

              <div className="pt-2 border-t border-[#1F1F23]/6 space-y-1 font-mono text-[10px] text-[#8C847B]">
                <div className="flex justify-between">
                  <span>RGB:</span>
                  <span className="text-[#1F1F23] font-semibold">{token.rgb}</span>
                </div>
                <div className="flex justify-between">
                  <span>CSS:</span>
                  <span className="text-[#C76B50] font-semibold">{token.cssVar}</span>
                </div>
                <div className="text-[9px] text-[#6E6862] pt-1">{token.contrast}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography Hierarchy */}
      <section className="space-y-6 pt-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C76B50]/10 border border-[#C76B50]/20 text-[#C76B50] text-xs font-mono font-bold mb-2">
            <span>Typography System</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#1F1F23]">
            Editorial &amp; Architectural Type Hierarchy
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6862] mt-1 max-w-2xl">
            A three-tier typographic engine: Cabinet Grotesk for architectural headline weight, Plus Jakarta Sans for warm body clarity, and JetBrains Mono for code accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Display */}
          <div className="bg-white rounded-2xl border border-[#1F1F23]/8 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#C76B50]">01. HEADINGS</span>
              <span className="text-[11px] font-mono text-[#8C847B]">Weights: 700, 800</span>
            </div>
            <div>
              <div className="text-3xl font-extrabold font-display text-[#1F1F23]">Cabinet Grotesk</div>
              <p className="text-xs text-[#6E6862] mt-1">High-impact geometric display typography for hero banners, page headers, and stat counters.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#1F1F23]/6 font-display font-bold text-xl text-[#1F1F23] tracking-tight">
              NextReach Studio: High-Velocity AI Engineering
            </div>
          </div>

          {/* Body */}
          <div className="bg-white rounded-2xl border border-[#1F1F23]/8 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#C76B50]">02. BODY &amp; UI</span>
              <span className="text-[11px] font-mono text-[#8C847B]">Weights: 400, 500, 600</span>
            </div>
            <div>
              <div className="text-3xl font-bold font-body text-[#1F1F23]">Plus Jakarta Sans</div>
              <p className="text-xs text-[#6E6862] mt-1">Modern humanist sans-serif offering maximum reading comfort and crisp rendering across mobile and desktop.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#1F1F23]/6 font-body text-xs text-[#4A4844] leading-relaxed">
              We design and ship high-converting web applications and AI agent workflows with transparent milestone pricing.
            </div>
          </div>

          {/* Monospace */}
          <div className="bg-white rounded-2xl border border-[#1F1F23]/8 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#C76B50]">03. CODE &amp; METRICS</span>
              <span className="text-[11px] font-mono text-[#8C847B]">Weights: 500, 700</span>
            </div>
            <div>
              <div className="text-3xl font-mono font-bold text-[#1F1F23]">JetBrains Mono</div>
              <p className="text-xs text-[#6E6862] mt-1">Engineered for technical calculators, developer token estimators, badges, and code snippets.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#1F1F23] border border-white/10 font-mono text-xs text-[#FAF8F5]">
              <span className="text-[#C76B50]">const</span> <span className="text-[#E88C72]">studio</span> = &#123; speed: <span className="text-[#10B981]">"14d"</span> &#125;;
            </div>
          </div>
        </div>
      </section>

      {/* Brand Voice & Metaphor Summary */}
      <section className="bg-[#FAF8F5] border border-[#1F1F23]/8 rounded-3xl p-6 sm:p-10 space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C76B50]/10 border border-[#C76B50]/20 text-[#C76B50] text-xs font-mono font-bold mb-2">
            <span>Symbolic DNA</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-[#1F1F23]">
            The Meaning Behind the NextReach Emblem
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-sm font-bold text-[#C76B50] font-mono">01. The Arrow (Reach)</div>
            <p className="text-xs text-[#6E6862] leading-relaxed font-body">
              The 60° apex arrowhead at the top represents upward velocity, elevation, and business growth achieved through intelligent software.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-bold text-[#C76B50] font-mono">02. The Central Pillar (Structure)</div>
            <p className="text-xs text-[#6E6862] leading-relaxed font-body">
              The continuous vertical spine provides structural grounding, reflecting architectural discipline, uptime reliability, and senior engineering rigor.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-bold text-[#C76B50] font-mono">03. The Monogram (N &amp; R)</div>
            <p className="text-xs text-[#6E6862] leading-relaxed font-body">
              The left stroke forms the letter <strong>'N'</strong>, seamlessly integrating with the right circular bowl and leg that complete the <strong>'R'</strong>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
