import React, { useState } from "react";
import { 
  MagnifyingGlass, 
  Globe, 
  ShieldCheck, 
  WhatsappLogo, 
  CheckCircle, 
  Star, 
  ArrowRight,
  Lightning,
  UserCheck
} from "@phosphor-icons/react";

interface JourneyStage {
  id: string;
  name: string;
  micro: string;
  badge: string;
  description: string;
}

const STAGES: JourneyStage[] = [
  {
    id: "search",
    name: "SEARCH",
    micro: "Discovered on Google & AI",
    badge: "STAGE 01",
    description: "Rank #1 on local search and AI answer engines. Structured schema gives you rich snippets and instant authority.",
  },
  {
    id: "land",
    name: "LAND",
    micro: "Sub-second 0.2s load",
    badge: "STAGE 02",
    description: "No spinners or bloated builders. The visitor arrives instantly on a clean, architectural mobile-first canvas.",
  },
  {
    id: "trust",
    name: "TRUST",
    micro: "Immediate Credibility",
    badge: "STAGE 03",
    description: "Verified client proof, transparent pricing, and sharp portfolio demos answer every doubt in 5 seconds.",
  },
  {
    id: "message",
    name: "MESSAGE",
    micro: "1-Click WhatsApp",
    badge: "STAGE 04",
    description: "No dead-end forms. Direct WhatsApp conversion routes high-intent prospects straight to your phone.",
  },
  {
    id: "customer",
    name: "CUSTOMER",
    micro: "Closed Enquiry",
    badge: "STAGE 05",
    description: "A qualified enquiry converted into an ongoing client relationship, without agency middlemen.",
  },
];

export default function ReachOutcome() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section 
      className="py-24 sm:py-32 bg-[#0B0B0C] text-[#FAF8F5] border-t border-white/8 relative overflow-hidden"
      aria-labelledby="outcome-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C76B50] bg-[#C76B50]/10 border border-[#C76B50]/20 px-3 py-1 rounded-full">
            THE CONVERSION FUNNEL
          </span>

          <h2
            id="outcome-heading"
            className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.04em] leading-[1.05] mt-6 uppercase"
          >
            FROM <span className="text-[#9A9A9A]">“GOOGLE THEM”</span>
            <br />
            TO <span className="text-[#C76B50]">“WHATSAPP THEM.”</span>
          </h2>

          <p className="mt-4 text-[#9A9A9A] text-sm sm:text-base leading-relaxed">
            We do not just build pretty layouts. We engineer the complete psychological journey from stranger to paying customer.
          </p>
        </div>

        {/* Step Selector Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 rounded-2xl bg-[#141416] border border-white/10 mb-10 overflow-x-auto">
          {STAGES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveStage(idx)}
              className={`p-3 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                activeStage === idx
                  ? "bg-[#1E1E22] border border-white/15 text-[#FAF8F5] shadow-sm"
                  : "text-[#7A7A7A] hover:text-[#C0C0C0] hover:bg-white/5"
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                <span className={activeStage === idx ? "text-[#C76B50]" : "text-[#7A7A7A]"}>
                  0{idx + 1}
                </span>
                {activeStage === idx && <span className="w-1.5 h-1.5 rounded-full bg-[#C76B50]" />}
              </div>
              <div className="font-display font-bold text-xs tracking-tight">{s.name}</div>
              <div className="text-[10px] text-[#8A8A8A] truncate hidden sm:block">{s.micro}</div>
            </button>
          ))}
        </div>

        {/* Interactive Visual Transformation Window */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#111113] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
          {/* Left: Stage Explainer */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#C76B50]/10 text-[#C76B50] font-mono text-[11px]">
              <Lightning size={13} weight="fill" />
              <span>{STAGES[activeStage].badge}</span>
            </div>

            <h3 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#FAF8F5]">
              {STAGES[activeStage].name}
            </h3>

            <p className="text-sm sm:text-base text-[#9A9A9A] leading-relaxed">
              {STAGES[activeStage].description}
            </p>

            <div className="pt-4 border-t border-white/8 flex items-center gap-4">
              <button
                onClick={() => setActiveStage((activeStage + 1) % STAGES.length)}
                className="inline-flex items-center gap-2 text-xs font-mono text-[#C76B50] hover:underline cursor-pointer"
              >
                <span>NEXT STEP IN FUNNEL</span>
                <ArrowRight size={14} weight="bold" />
              </button>
            </div>
          </div>

          {/* Right: Stage Visual Screen */}
          <div className="lg:col-span-7 bg-[#0A0A0C] border border-white/10 rounded-xl p-5 sm:p-6 shadow-inner min-h-[300px] flex flex-col justify-center">
            {activeStage === 0 && (
              /* STAGE 01: Google-style Search Result */
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-xs text-[#8A8A8A] font-mono border-b border-white/5 pb-3">
                  <MagnifyingGlass size={15} className="text-[#C76B50]" />
                  <span>google.com/search?q=best+architectural+interiors+mumbai</span>
                </div>
                <div className="p-4 rounded-xl bg-[#141417] border border-white/10">
                  <div className="flex items-center gap-2 text-xs text-[#A0A0A0] mb-1">
                    <Globe size={13} className="text-[#C76B50]" />
                    <span>https://krafthaus.design</span>
                    <span className="text-[#C76B50] text-[10px] bg-[#C76B50]/10 px-1.5 py-0.5 rounded font-mono">
                      RANK #1
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-[#60A5FA] hover:underline cursor-pointer">
                    Krafthaus Interiors · Architectural Residences in Mumbai
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-[#EAB308] mt-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} weight="fill" />
                      ))}
                    </div>
                    <span className="text-white/80 font-mono">5.0 (48 reviews) · Full Turnkey Architecture</span>
                  </div>
                  <p className="text-xs text-[#9A9A9A] leading-relaxed">
                    South Mumbai &amp; Bandra architectural studio. Minimalist concrete, custom millwork, bespoke residences. Handover in 6 weeks.
                  </p>
                </div>
              </div>
            )}

            {activeStage === 1 && (
              /* STAGE 02: Website Land Experience */
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between text-xs font-mono text-[#8A8A8A] border-b border-white/5 pb-3">
                  <span className="text-[#C76B50] flex items-center gap-1.5">
                    <CheckCircle size={14} weight="fill" /> 0.22s First Contentful Paint
                  </span>
                  <span>100% Performance Score</span>
                </div>
                <div className="p-5 rounded-xl bg-[#141417] border border-white/10 space-y-3">
                  <div className="font-mono text-[10px] text-[#C76B50] tracking-wider">KRAFTHAUS ARCHITECTURE</div>
                  <div className="font-display text-2xl font-bold text-[#FAF8F5]">
                    SPATIAL PRECISION FOR RESIDENCES.
                  </div>
                  <p className="text-xs text-[#9A9A9A]">
                    Designed with pure typography, high-contrast photography and zero layout shift.
                  </p>
                  <div className="flex gap-2 pt-2">
                    <span className="px-2 py-1 rounded bg-white/5 text-[10px] font-mono text-[#C0C0C0]">Astro 6 Engine</span>
                    <span className="px-2 py-1 rounded bg-white/5 text-[10px] font-mono text-[#C0C0C0]">Zero Bloatware</span>
                  </div>
                </div>
              </div>
            )}

            {activeStage === 2 && (
              /* STAGE 03: Trust Credentials */
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-xs font-mono text-[#C76B50] border-b border-white/5 pb-3">
                  <ShieldCheck size={16} weight="fill" />
                  <span>Immediate Trust Badges &amp; Clinical Verification</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-[#141417] border border-white/10">
                    <div className="text-xl font-display font-bold text-[#FAF8F5]">120+</div>
                    <div className="text-xs text-[#9A9A9A] mt-1">Verified 5-Star Reviews on Google Maps</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#141417] border border-white/10">
                    <div className="text-xl font-display font-bold text-[#C76B50]">100%</div>
                    <div className="text-xs text-[#9A9A9A] mt-1">Transparent One-Time Fixed Pricing</div>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-white/5 text-xs text-[#C0C0C0] flex items-center gap-2">
                  <UserCheck size={16} className="text-[#C76B50]" />
                  <span>Senior engineer direct communication. No account manager telephone games.</span>
                </div>
              </div>
            )}

            {activeStage === 3 && (
              /* STAGE 04: Message on WhatsApp */
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-xs font-mono text-[#25D366] border-b border-white/5 pb-3">
                  <WhatsappLogo size={16} weight="fill" />
                  <span>High-Converting WhatsApp Lead Routing</span>
                </div>
                <div className="p-4 rounded-xl bg-[#141417] border border-[#25D366]/30 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-black">
                      <WhatsappLogo size={20} weight="fill" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#FAF8F5]">NextReach Studio Concierge</div>
                      <div className="text-[10px] text-[#25D366] font-mono">Typically replies in 15 mins</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#1F2937]/50 text-xs text-[#E2E8F0] border border-white/5">
                    “Hi NextReach, I saw your Business Package (₹7,500). My clinic needs a fast, modern website with Google Maps integration.”
                  </div>
                  <div className="text-right text-[10px] font-mono text-[#7A7A7A]">Status: Delivered 14:02</div>
                </div>
              </div>
            )}

            {activeStage === 4 && (
              /* STAGE 05: Customer Acquisition */
              <div className="space-y-4 animate-in fade-in duration-300 text-center py-4">
                <div className="w-12 h-12 rounded-full bg-[#C76B50]/20 border border-[#C76B50] mx-auto flex items-center justify-center text-[#C76B50] mb-2">
                  <CheckCircle size={28} weight="fill" />
                </div>
                <h4 className="font-display text-2xl font-bold text-[#FAF8F5]">
                  New Client Acquired.
                </h4>
                <p className="text-xs text-[#9A9A9A] max-w-sm mx-auto leading-relaxed">
                  Project scoped, scope agreed, 3-day turnaround initiated. Zero sales commission lost to aggregators or expensive ad agencies.
                </p>
                <div className="inline-block font-mono text-[11px] text-[#C76B50] bg-[#C76B50]/10 border border-[#C76B50]/20 px-3 py-1 rounded-full">
                  LIFETIME ROI UNLOCKED
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
