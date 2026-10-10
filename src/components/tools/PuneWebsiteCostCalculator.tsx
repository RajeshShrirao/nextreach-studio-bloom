import React, { useState } from "react";

interface CityBenchmark {
  id: string;
  name: string;
  shortLabel: string;
  region: string;
  multiplier: number;
  marketDescription: string;
  keyHubs: string[];
  agencyPricingRange: string;
}

const MH_CITIES: CityBenchmark[] = [
  {
    id: "pune",
    name: "Pune (PCMC & City)",
    shortLabel: "Pune",
    region: "Tech, Engineering & Startup Hub",
    multiplier: 1.0,
    marketDescription: "The engineering benchmark: mature software talent from Hinjewadi and Kharadi, balanced studio pricing, and high adoption of modern static stacks (Astro, React, Next.js).",
    keyHubs: ["Baner", "Hinjewadi", "Kharadi", "Balewadi", "Kothrud", "Bhosari MIDC"],
    agencyPricingRange: "₹25,000 – ₹65,000",
  },
  {
    id: "mumbai",
    name: "Mumbai (MMR / Thane / Navi Mumbai)",
    shortLabel: "Mumbai",
    region: "Financial Capital & Corporate Headquarters",
    multiplier: 1.35,
    marketDescription: "Premium metro pricing: commercial rents in BKC and Lower Parel inflate agency retainers by 35–50%. Many Mumbai enterprises hire Pune engineering studios for identical code quality at sensible rates.",
    keyHubs: ["BKC", "Lower Parel", "Andheri East", "Vashi", "Thane West", "Nariman Point"],
    agencyPricingRange: "₹45,000 – ₹1,20,000",
  },
  {
    id: "nagpur",
    name: "Nagpur",
    shortLabel: "Nagpur",
    region: "Vidarbha Commercial Capital & Logistics SEZ",
    multiplier: 0.85,
    marketDescription: "Emerging IT and logistics corridor centered around MIHAN. Strong demand for supply chain portals, manufacturing B2B sites, and educational institutes.",
    keyHubs: ["MIHAN SEZ", "Civil Lines", "Dharampeth", "Wardha Road", "Hingna MIDC"],
    agencyPricingRange: "₹20,000 – ₹50,000",
  },
  {
    id: "nashik",
    name: "Nashik",
    shortLabel: "Nashik",
    region: "North Maharashtra Industrial & Agribusiness Corridor",
    multiplier: 0.80,
    marketDescription: "Manufacturing MIDCs (Satpur/Ambad), wine tourism, and export agribusiness. High demand for industrial product catalogues, RFQ inquiry systems, and resort booking engines.",
    keyHubs: ["Satpur MIDC", "Ambad MIDC", "Gangapur Road", "College Road", "Sinnar"],
    agencyPricingRange: "₹18,000 – ₹45,000",
  },
  {
    id: "sambhajinagar",
    name: "Chhatrapati Sambhajinagar",
    shortLabel: "Chh. Sambhajinagar",
    region: "Marathwada Automotive & Pharma Hub",
    multiplier: 0.80,
    marketDescription: "Heavy engineering and auto component powerhouse (Waluj, Shendra DMIC, Chikalthana). Businesses require precision specification catalogues, vendor portals, and ISO-compliant B2B sites.",
    keyHubs: ["Waluj MIDC", "Shendra DMIC", "Chikalthana", "CIDCO", "Railway Station MIDC"],
    agencyPricingRange: "₹18,000 – ₹45,000",
  },
  {
    id: "kolhapur",
    name: "Kolhapur",
    shortLabel: "Kolhapur",
    region: "Southern Maharashtra Foundry, Textile & Trade Center",
    multiplier: 0.75,
    marketDescription: "Manufacturing exports (Shiroli, Gokul Shirgaon), foundry engineering, and retail trade. Dominated by cheap template vendors; businesses upgrading to custom code see rapid local pack wins.",
    keyHubs: ["Shiroli MIDC", "Gokul Shirgaon", "Shahupuri", "Laxmipuri", "Ichalkaranji"],
    agencyPricingRange: "₹15,000 – ₹40,000",
  },
];

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
    description: "3 to 5 pages (Home, About, Services, Contact) for local service businesses and consultancies",
    basePrice: 24000,
    timelineDays: 10,
    cwvScore: "95-100",
  },
  {
    id: "commercial",
    label: "Growth / Commercial Site",
    description: "6 to 12 custom pages with service pillar clusters, case studies, and local SEO lead capture",
    basePrice: 48000,
    timelineDays: 21,
    cwvScore: "95-100",
  },
  {
    id: "ecommerce",
    label: "E-Commerce Store",
    description: "Product catalogue, Razorpay/UPI gateway, cart, customer accounts, and order management",
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
    description: "Commercial Elementor/ThemeForest template (what budget agencies typically deploy)",
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
    label: "Local Maharashtra SEO & Schema Setup",
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
  const [selectedCity, setSelectedCity] = useState<string>("pune");
  const [selectedType, setSelectedType] = useState<string>("commercial");
  const [selectedTech, setSelectedTech] = useState<string>("astro");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["seo", "whatsapp", "copywriting"]);
  const [copied, setCopied] = useState<boolean>(false);

  const currentCity = MH_CITIES.find((c) => c.id === selectedCity) || MH_CITIES[0];
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

  // Scaled with city multiplier and tech multiplier
  const baseCalculated = Math.round(currentType.basePrice * currentTech.priceMultiplier * currentCity.multiplier);
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
    const spec = `--- NEXTREACH STUDIO MAHARASHTRA WEBSITE ESTIMATE ---
City Market: ${currentCity.name} (${currentCity.region})
Project Scope: ${currentType.label}
Tech Architecture: ${currentTech.label}
Selected Modules: ${selectedFeatures.map((fId) => FEATURES.find((f) => f.id === fId)?.label).join(", ")}
Estimated Development: ${formatINR(totalDevelopmentCost)}
Local Market Benchmark: ${currentCity.agencyPricingRange}
Estimated Timeline: ~${currentType.timelineDays} working days
Estimated Annual Operating Cost: ${formatINR(currentTech.annualHostingCost)}/year
Architecture CWV Risk: ${currentTech.cwvRisk.toUpperCase()}
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
            Maharashtra Market 2026 · Interactive Tool
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#242522] dark:text-[#f4f2eb] mt-2 font-display">
            Maharashtra Website Development Cost Estimator
          </h3>
          <p className="text-sm text-[#56564f] dark:text-[#b1b1a6] mt-1">
            Compare realistic pricing benchmarks across Pune, Mumbai, Nagpur, Nashik, Sambhajinagar, and Kolhapur.
          </p>
        </div>
        <div className="text-right sm:self-center">
          <div className="text-xs font-mono text-[#56564f] dark:text-[#b1b1a6] uppercase">
            Estimated Budget ({currentCity.shortLabel})
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#97402e] dark:text-[#e58d72] font-mono">
            {formatINR(totalDevelopmentCost)}
          </div>
        </div>
      </div>

      {/* Step 1: City Market Selection */}
      <div className="mb-6">
        <label className="block text-xs font-mono uppercase tracking-wider text-[#56564f] dark:text-[#b1b1a6] mb-3">
          1. Select Maharashtra City Market
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {MH_CITIES.map((city) => {
            const isSelected = selectedCity === city.id;
            return (
              <button
                key={city.id}
                type="button"
                onClick={() => setSelectedCity(city.id)}
                className={`px-3 py-2.5 rounded-xl border text-center transition-all ${
                  isSelected
                    ? "border-[#97402e] dark:border-[#e58d72] bg-[#97402e]/10 dark:bg-[#e58d72]/15 ring-1 ring-[#97402e] dark:ring-[#e58d72]"
                    : "border-[#d8d8ce] dark:border-[#383932] bg-white dark:bg-[#252623] hover:border-[#97402e]/50"
                }`}
              >
                <div className="font-semibold text-xs text-[#242522] dark:text-[#f4f2eb]">{city.shortLabel}</div>
                <div className="text-[10px] font-mono text-[#56564f] dark:text-[#b1b1a6] mt-0.5">
                  {city.multiplier > 1.0 ? `+${Math.round((city.multiplier - 1.0) * 100)}%` : city.multiplier < 1.0 ? `-${Math.round((1.0 - city.multiplier) * 100)}%` : "Base"}
                </div>
              </button>
            );
          })}
        </div>

        {/* City Insight Box */}
        <div className="mt-3 p-3.5 rounded-xl bg-white/70 dark:bg-[#252623]/70 border border-[#d8d8ce]/60 dark:border-[#383932]/60 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
            <span className="font-bold text-[#242522] dark:text-[#f4f2eb]">{currentCity.name} Market Profile:</span>
            <span className="font-mono text-[11px] text-[#97402e] dark:text-[#e58d72] font-medium">
              Typical Agency Range: {currentCity.agencyPricingRange}
            </span>
          </div>
          <p className="text-[#56564f] dark:text-[#b1b1a6] leading-relaxed mb-1.5">{currentCity.marketDescription}</p>
          <div className="text-[11px] text-[#56564f] dark:text-[#b1b1a6]">
            <strong>Key commercial hubs:</strong> {currentCity.keyHubs.join(", ")}
          </div>
        </div>
      </div>

      {/* Step 2: Project Type */}
      <div className="mb-6">
        <label className="block text-xs font-mono uppercase tracking-wider text-[#56564f] dark:text-[#b1b1a6] mb-3">
          2. Select Project Scope
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PROJECT_TYPES.map((type) => {
            const isSelected = selectedType === type.id;
            const adjustedBase = Math.round(type.basePrice * currentCity.multiplier);
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
                    {formatINR(adjustedBase)}
                  </span>
                </div>
                <p className="text-xs text-[#56564f] dark:text-[#b1b1a6] leading-relaxed">{type.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Architecture / Tech Stack */}
      <div className="mb-6">
        <label className="block text-xs font-mono uppercase tracking-wider text-[#56564f] dark:text-[#b1b1a6] mb-3">
          3. Select Tech Architecture & Engineering Tier
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

      {/* Step 4: Add-on Capabilities */}
      <div className="mb-6">
        <label className="block text-xs font-mono uppercase tracking-wider text-[#56564f] dark:text-[#b1b1a6] mb-3">
          4. Optional Modules & Integrations
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
          ₹15,000–₹25,000 in annual maintenance, vulnerability patching, and slow server upgrades. In benchmarks across {currentCity.name}, 
          67% of template-based sites fail Google Core Web Vitals on mobile, suppressing organic rankings.
        </div>
      )}

      {/* Summary Box */}
      <div className="p-5 rounded-xl bg-white dark:bg-[#252623] border border-[#d8d8ce] dark:border-[#383932] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto text-left">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#56564f] dark:text-[#b1b1a6]">
              Total ({currentCity.shortLabel})
            </div>
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
