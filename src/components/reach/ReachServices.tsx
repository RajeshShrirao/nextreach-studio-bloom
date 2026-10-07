import React, { useState } from "react";
import { ArrowUpRight, Plus, Minus } from "@phosphor-icons/react";

interface ServiceItem {
  num: string;
  title: string;
  tagline: string;
  details: string;
  specs: string[];
  link: string;
}

const SERVICES: ServiceItem[] = [
  {
    num: "01",
    title: "WEB DESIGN",
    tagline: "Premium interfaces designed around your business.",
    details: "We reject cookie-cutter templates. Every layout is crafted with tight typographic tracking, generous whitespace, and mobile-first ergonomics tailored specifically to your industry.",
    specs: ["Custom Architecture", "Dark / Light Balance", "Retina Asset Optimization", "Responsive Breakpoints"],
    link: "/services",
  },
  {
    num: "02",
    title: "DEVELOPMENT",
    tagline: "Fast, responsive, production-ready websites.",
    details: "Built on Astro 6 and modern static architecture for near-instant 0.2s load speeds. No heavy WordPress databases, zero vulnerability plugins, and flawless Core Web Vitals.",
    specs: ["Astro 6 + React 19", "Tailwind CSS v4 Engine", "Sub-0.3s LCP Speeds", "Zero Layout Shift"],
    link: "/services/web-application-development-pune",
  },
  {
    num: "03",
    title: "SEO FOUNDATION",
    tagline: "Technical foundations designed to help people discover you.",
    details: "Structured schema markup, local Google Business Profile citations, clean semantic HTML, and XML sitemaps that ensure search engines and AI answer engines index you on day one.",
    specs: ["Schema.org JSON-LD", "Local 3-Pack Signals", "AI Search Indexing (AEO)", "Sitemap & Robots Automation"],
    link: "/services/ai-automation-pune",
  },
  {
    num: "04",
    title: "WHATSAPP",
    tagline: "Turn visitors into conversations.",
    details: "Skip clunky 10-field contact forms that get abandoned. We wire pre-filled 1-click WhatsApp routing directly to your phone so inquiries become instant paying client chats.",
    specs: ["Pre-filled Context Prompts", "Click-to-Call Sticky Bar", "Conversion Funnel Tracking", "Zero Sales Friction"],
    link: "/contact",
  },
  {
    num: "05",
    title: "ANALYTICS",
    tagline: "Understand where your customers come from.",
    details: "Lightweight, privacy-first analytics setup. Track visitor journeys, referral channels, ad conversion attribution, and WhatsApp click events without bloated cookie banners.",
    specs: ["GA4 / Plausible Integration", "Event-Level Attribution", "WhatsApp Click Tracking", "Privacy-Compliant Setup"],
    link: "/contact",
  },
];

export default function ReachServices() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(0);

  return (
    <section 
      id="services"
      className="py-24 sm:py-32 lg:py-40 bg-[#070707] text-[#FAF8F5] border-t border-white/8 relative"
      aria-labelledby="services-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C76B50] bg-[#C76B50]/10 border border-[#C76B50]/20 px-3 py-1 rounded-full">
            CAPABILITY BLUEPRINTS
          </span>
          <h2
            id="services-heading"
            className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.04em] uppercase leading-none mt-6"
          >
            EVERYTHING
            <br />
            YOUR DIGITAL
            <br />
            <span className="text-[#C76B50]">FRONT DOOR NEEDS.</span>
          </h2>
          <p className="mt-6 text-[#9A9A9A] text-sm sm:text-base leading-relaxed max-w-xl">
            Each discipline is tuned to ensure your website commands respect in the first five seconds and turns attention into real commercial pipeline.
          </p>
        </div>

        {/* Elegant Expanding Rows */}
        <div className="border-t border-white/10 divide-y divide-white/10">
          {SERVICES.map((s, idx) => {
            const isExpanded = hoveredIdx === idx;

            return (
              <div
                key={s.num}
                onMouseEnter={() => setHoveredIdx(idx)}
                onClick={() => setHoveredIdx(isExpanded ? null : idx)}
                className={`py-8 sm:py-10 transition-colors duration-300 cursor-pointer ${
                  isExpanded ? "bg-[#0E0E10]/80" : "hover:bg-white/[0.02]"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Number + Title */}
                  <div className="flex items-baseline gap-6 sm:gap-10">
                    <span className="font-mono text-sm sm:text-base text-[#C76B50]">
                      {s.num}
                    </span>
                    <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase text-[#FAF8F5]">
                      {s.title}
                    </h3>
                  </div>

                  {/* Right: Tagline preview and Expand trigger */}
                  <div className="flex items-center justify-between md:justify-end gap-6 md:w-1/2">
                    <p className="text-xs sm:text-sm text-[#9A9A9A] max-w-sm">
                      {s.tagline}
                    </p>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/60 shrink-0">
                      {isExpanded ? <Minus size={14} /> : <Plus size={14} />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details Panel */}
                {isExpanded && (
                  <div className="mt-8 pt-6 border-t border-white/8 grid grid-cols-1 md:grid-cols-12 gap-6 animate-in fade-in duration-200">
                    <div className="md:col-span-7">
                      <p className="text-sm text-[#B0B0B0] leading-relaxed">
                        {s.details}
                      </p>
                      <div className="mt-4">
                        <a
                          href={s.link}
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C76B50] hover:underline"
                        >
                          <span>Explore specialized documentation</span>
                          <ArrowUpRight size={13} weight="bold" />
                        </a>
                      </div>
                    </div>

                    <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {s.specs.map((spec) => (
                        <div
                          key={spec}
                          className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px] font-mono text-[#A0A0A0]"
                        >
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
