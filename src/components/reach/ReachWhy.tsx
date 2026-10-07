import React from "react";
import { Sparkle, ShieldCheck, Rocket } from "@phosphor-icons/react";

export default function ReachWhy() {
  const principles = [
    {
      num: "01",
      icon: Sparkle,
      title: "DESIGN FIRST",
      desc: "We obsess over typography, spacing, and tactile polish. You never get an off-the-shelf theme or cookie-cutter template.",
    },
    {
      num: "02",
      icon: ShieldCheck,
      title: "BUILT FOR BUSINESS",
      desc: "Every pixel serves commercial conversion: 0.2s load speeds, structured schema for search engines, and direct WhatsApp contact.",
    },
    {
      num: "03",
      icon: Rocket,
      title: "FAST TO LAUNCH",
      desc: "1 to 3 days delivery. You communicate directly with the senior engineer writing your code, not an account coordinator.",
    },
  ];

  return (
    <section 
      className="py-24 sm:py-32 bg-[#0B0B0C] text-[#FAF8F5] border-t border-white/8 relative"
      aria-labelledby="why-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C76B50] bg-[#C76B50]/10 border border-[#C76B50]/20 px-3 py-1 rounded-full">
            STUDIO PHILOSOPHY
          </span>
          <h2
            id="why-heading"
            className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.04em] uppercase leading-none mt-6"
          >
            SMALL TEAM.
            <br />
            <span className="text-[#C76B50]">BIG DIGITAL ENERGY.</span>
          </h2>

          <div className="mt-6 space-y-1 font-mono text-xs sm:text-sm text-[#9A9A9A]">
            <p>No bloated retainers.</p>
            <p>No six-week approval cycles.</p>
            <p>No unnecessary complexity.</p>
          </div>
        </div>

        {/* 3 Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.num}
                className="p-6 sm:p-8 rounded-2xl bg-[#111114] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-white/8">
                    <span className="font-mono text-xs text-[#C76B50] font-bold">
                      {p.num}
                    </span>
                    <Icon size={20} className="text-[#C76B50]" />
                  </div>

                  <h3 className="font-display text-2xl font-bold tracking-tight text-[#FAF8F5] mt-6 mb-3">
                    {p.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#9A9A9A] leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 font-mono text-[10px] text-[#7A7A7A] uppercase tracking-wider">
                  NextReach Standard
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
