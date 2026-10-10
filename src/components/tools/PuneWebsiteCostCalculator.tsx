import React, { useState } from "react";

interface OptionItem {
  id: string;
  label: string;
  description: string;
  basePrice: number;
  timelineDays: number;
  cwvScore: string;
}

const PROJECT_TYPES: OptionItem[] = [
  {
    id: "landing",
    label: "Landing Page / Funnel",
    description: "Single high-converting page for paid ads, product launch, or lead generation",
    basePrice: 12000,
    timelineDays: 4,
    cwvScore: "98-100",
  },
  {
    id: "starter",
    label: "Starter Business Site",
    description: "3 to 5 pages (Home, About, Services, Contact) for local Pune service businesses",
    basePrice: 24000,
    timelineDays: 10,
    cwvScore: "95-100",
  },
  {
    id: "commercial",
    label: "Growth / Commercial Site",
    description: "6 to 12 custom pages with service pillar clusters, case studies, and lead capture",
    basePrice: 48000,
    timelineDays: 21,
    cwvScore: "95-100",
  },
  {
    id: "ecommerce",
    label: "E-Commerce Store",
    description: "Product catalogue, Razorpay/UPI gateway, cart, customer accounts, order management",
    basePrice: 65000,
    timelineDays: 30,
    cwvScore: "90-95",
  },
  {
    id: "webapp",
    label: "Custom Web App / MVP",
    description: "Database-driven platform, authentication, dashboards, role-based workflows, third-party APIs",
    basePrice: 160000,
    timelineDays: 45,
    cwvScore: "92-98",
  },
];

interface TechStackItem {
  id: string;
  label: string;
  description: string;
  priceMultiplier: number;
  annualHostingCost: number;
  cwvRisk: "minimal" | "moderate" | "high";
}

const TECH_STACKS: TechStackItem[] = [
  {
    id: "astro",
    label: "Modern Static (Astro + Tailwind)",
    description: "Zero client-side JS overhead, sub-second TTFB, immune to WordPress exploits, 99+ Core Web Vitals",
    priceMultiplier: 1.0,
    annualHostingCost: 3500,
    cwvRisk: "minimal",
  },
  {
    id: "nextjs",
    label: "Full-Stack (Next.js / React 19)",
    description: "Dynamic server-side rendering, API routes, database integrations, modern enterprise architecture",
    priceMultiplier: 1.25,
    annualHostingCost: 8000,
    cwvRisk: "minimal",
  },
  {
    id: "custom-wp",
    label: "Custom WordPress (Engineered)",
    description: "Handcrafted theme, block editor, strict plugin hygiene, client content editing capability",
    priceMultiplier: 1.05,
    annualHostingCost: 12000,
    cwvRisk: "moderate",
  },
  {
    id: "template-wp",
    label: "Pre-built WordPress Template",
    description: "Commercial Elementor/ThemeForest template (what ₹9,999 budget agencies typically deploy)",
    priceMultiplier: 0.65,
    annualHostingCost: 16000,
    cwvRisk: "high",
  },
];

interface FeatureItem {
  id: string;
  label: string;
  description: string;
  price: number;
  recommended: boolean;
}

const FEATURES: FeatureItem[] = [
  {
    id: "seo",
    label: "Local Pune SEO & Schema Setup",
    description: "Geo-targeted meta, LocalBusiness JSON-LD, FAQ schema, sitemap, GSC setup",
    price: 8000,
    recommended: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp Business Flow",
    description: "Interactive click-to-chat with automated greeting and lead source tracking",
    price: 3000,
    recommended: true,
  },
  {
    id: "payments",
    label: "Payment Gateway (Razorpay/UPI)",
    description: "Direct instant checkout, webhook verification, invoice generation",
    price: 9000,
    recommended: false,
  },
  {
    id: "copywriting",
    label: "Editorial Conversion Copywriting",
    description: "Written from scratch by a technical writer — no generic AI placeholder filler",
    price: 12000,
    recommended: true,
  },
  {
    id: "crm",
    label: "CRM & Email Lead Pipeline",
    description: "Sync form submissions to HubSpot, Notion, Google Sheets, or custom webhook",
    price: 6000,
    recommended: false,
  },
  {
    id: "multilang",
    label: "Bilingual (English + Marathi/Hindi)",
    description: "Localized content architecture for Maharashtra state reach",
    price: 10000,
    recommended: false,
  },
];

export default function PuneWebsiteCostCalculator() {
  const [selectedType, setSelectedType] = useState<string>("commercial");
  const [selectedTech, setSelectedTech] = useState<string>("astro");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["seo", "whatsapp", "copywriting"]);
  const [copied, setCopied] = useState<boolean>(false);

  const currentType = PROJECT_TYPES.find((t) => t.id === selectedType) || PROJECT_TYPES[2];
  const currentTech = TECH_STACKS.find((t) => t.id === selectedTech) || TECH_STACKS[0];

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const featuresTotal = selectedFeatures.reduce((sum, fId) => {
    const f = FEATURES.find((item) => item.id === fId);
    return sum + (f ? f.price : 0);
  }, 0);

  const baseCalculated = Math.round(currentType.basePrice * currentTech.priceMultiplier);
  const totalDevelopmentCost = baseCalculated + featuresTotal;

  // Formatting currency
  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const copyEstimateSpec = () => {
    const spec = `--- NEXTREACH STUDIO PUNE WEBSITE ESTIMATE ---
Project Scope: ${currentType.label}
Tech Architecture: ${currentTech.label}
Selected Modules: ${selectedFeatures.map((fId) => FEATURES.find((f) => f.id === fId)?.label).join(", ")}
Estimated Development: ${formatINR(totalDevelopmentCost)}
Estimated Timeline: ~${currentType.timelineDays} working days
Estimated Annual Operating Cost: ${formatINR(currentTech.annualHostingCost)}/year
Architecture Risk: ${currentTech.cwvRisk.toUpperCase()}
Generated on nextreachstudio.in`;

    navigator.clipboard.writeText(spec).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="bg-[#f7f6f2] dark:bg-[#1f201e] border border-[#d8d8ce] dark:border-[#383932] rounded-2xl p-6 sm:p-8 my-8 shadow-sm font-sans transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d8d8ce] dark:border-[#383932] pb-6 mb-6">
        <div>
          <span className="text-[11px] font-mono tracking-wider uppercase text-[#97402e] dark:text-[#e58d72] font-semibold bg-[#97402e]/10 dark:bg-[#e58d72]/15 px-2.5 py-1 rounded-full">
            Interactive Tool · Pune Market 2026
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#242522] dark:text-[#f4f2eb] mt-2 font-display">
            Pune Website Development Cost Estimator
          </h3>
          <p className="text-sm text-[#56564f] dark:text-[#b1b1a6] mt-1">
            Configure your project parameters to get a realistic, line-by-line quote benchmark.
          </p>
        </div>
        <div className="text-right sm:self-center">
          <div className="text-xs font-mono text-[#56564f] dark:text-[#b1b1a6] uppercase">Estimated Budget</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#97402e] dark:text-[#e58d72] font-mono">
            {formatINR(totalDevelopmentCost)}
          </div>
        </div>
      </div>

      {/* Step 1: Project Type */}
      <div className="mb-6">
        <label className="block text-xs font-mono uppercase tracking-wider text-[#56564f] dark:text-[#b1b1a6] mb-3">
          1. Select Project Type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PROJECT_TYPES.map((type) => {
            const isSelected = selectedType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedType(type.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "border-[#97402e] dark:border-[#e58d72] bg-[#97402e]/5 dark:bg-[#e58d72]/10 ring-1 ring-[#97402e] dark:ring-[#e58d72]"
                    : "border-[#d8d8ce] dark:border-[#383932] bg-white dark:bg-[#252623] hover:border-[#97402e]/50"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm text-[#242522] dark:text-[#f4f2eb]">{type.label}</span>
                  <span className="text-xs font-mono text-[#97402e] dark:text-[#e58d72] font-medium">
                    {formatINR(type.basePrice)}
                  </span>
                </div>
                <p className="text-xs text-[#56564f] dark:text-[#b1b1a6] leading-relaxed">{type.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Architecture / Tech Stack */}
      <div className="mb-6">
        <label className="block text-xs font-mono uppercase tracking-wider text-[#56564f] dark:text-[#b1b1a6] mb-3">
          2. Select Tech Architecture & Engineering Tier
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TECH_STACKS.map((tech) => {
            const isSelected = selectedTech === tech.id;
            return (
              <button
                key={tech.id}
                type="button"
                onClick={() => setSelectedTech(tech.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "border-[#97402e] dark:border-[#e58d72] bg-[#97402e]/5 dark:bg-[#e58d72]/10 ring-1 ring-[#97402e] dark:ring-[#e58d72]"
                    : "border-[#d8d8ce] dark:border-[#383932] bg-white dark:bg-[#252623] hover:border-[#97402e]/50"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm text-[#242522] dark:text-[#f4f2eb]">{tech.label}</span>
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                      tech.cwvRisk === "minimal"
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                        : tech.cwvRisk === "moderate"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                        : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                    }`}
                  >
                    CWV Risk: {tech.cwvRisk}
                  </span>
                </div>
                <p className="text-xs text-[#56564f] dark:text-[#b1b1a6] leading-relaxed">{tech.description}</p>
                <div className="mt-2 text-[11px] font-mono text-[#56564f] dark:text-[#b1b1a6]">
                  Annual Ops: ~{formatINR(tech.annualHostingCost)}/yr
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Add-on Capabilities */}
      <div className="mb-6">
        <label className="block text-xs font-mono uppercase tracking-wider text-[#56564f] dark:text-[#b1b1a6] mb-3">
          3. Optional Features & Growth Integrations
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {FEATURES.map((feat) => {
            const isChecked = selectedFeatures.includes(feat.id);
            return (
              <label
                key={feat.id}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  isChecked
                    ? "border-[#97402e]/60 dark:border-[#e58d72]/60 bg-white dark:bg-[#252623]"
                    : "border-[#d8d8ce] dark:border-[#383932] bg-white/50 dark:bg-[#252623]/50 opacity-80 hover:opacity-100"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleFeature(feat.id)}
                  className="mt-1 h-4 w-4 rounded border-[#d8d8ce] text-[#97402e] focus:ring-[#97402e]"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-[#242522] dark:text-[#f4f2eb]">{feat.label}</span>
                    <span className="text-[11px] font-mono text-[#97402e] dark:text-[#e58d72]">+{formatINR(feat.price)}</span>
                  </div>
                  <p className="text-[11px] text-[#56564f] dark:text-[#b1b1a6] leading-tight mt-0.5">
                    {feat.description}
                  </p>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Technical Warning if Template chosen */}
      {selectedTech === "template-wp" && (
        <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 text-xs mb-6 leading-relaxed">
          <strong>The Template Pitfall Warning:</strong> Choosing pre-made template builds reduces upfront cost but typically incurs 
          ₹15,000–₹25,000 in annual maintenance, vulnerability patching, and slow server upgrades. In benchmarks across Pune, 
          67% of template-based sites fail Google Core Web Vitals on mobile, suppressing organic rankings in Pune.
        </div>
      )}

      {/* Summary Box */}
      <div className="p-5 rounded-xl bg-white dark:bg-[#252623] border border-[#d8d8ce] dark:border-[#383932] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto text-left">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#56564f] dark:text-[#b1b1a6]">Total Build</div>
            <div className="text-lg font-bold text-[#97402e] dark:text-[#e58d72] font-mono">
              {formatINR(totalDevelopmentCost)}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-[#56564f] dark:text-[#b1b1a6]">Timeline</div>
            <div className="text-sm font-semibold text-[#242522] dark:text-[#f4f2eb] font-mono">
              ~{currentType.timelineDays} working days
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-[#56564f] dark:text-[#b1b1a6]">Annual Ops</div>
            <div className="text-sm font-semibold text-[#242522] dark:text-[#f4f2eb] font-mono">
              ~{formatINR(currentTech.annualHostingCost)}/yr
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-[#56564f] dark:text-[#b1b1a6]">Target CWV</div>
            <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
              {currentType.cwvScore}/100
            </div>
          </div>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <button
            type="button"
            onClick={copyEstimateSpec}
            className="flex-1 md:flex-none text-xs font-mono px-4 py-2.5 rounded-lg border border-[#d8d8ce] dark:border-[#383932] hover:bg-[#f7f6f2] dark:hover:bg-[#1f201e] text-[#242522] dark:text-[#f4f2eb] transition-colors"
          >
            {copied ? "Copied Spec ✓" : "Copy Spec"}
          </button>
          <a
            href="/contact"
            className="flex-1 md:flex-none text-xs font-mono font-medium px-5 py-2.5 rounded-lg bg-[#97402e] text-[#fffaf5] hover:bg-[#7e3425] transition-colors text-center inline-block"
          >
            Discuss Project →
          </a>
        </div>
      </div>
    </div>
  );
}
