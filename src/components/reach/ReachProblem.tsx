import React from "react";
import { ArrowDown, WarningCircle, CheckCircle, ShieldCheck } from "@phosphor-icons/react";

export default function ReachProblem() {
  const steps = [
    {
      num: "01",
      keyword: "ATTENTION",
      failState: "Visitors bounce in 2.8 seconds from sluggish generic templates.",
      studioFix: "Cinematic typography and bespoke art direction that stop the scroll.",
    },
    {
      num: "02",
      keyword: "TRUST",
      failState: "No local proof, no clear credentials, and dated aesthetics.",
      studioFix: "Fast 0.3s load, verified social proof, and architectural polish.",
    },
    {
      num: "03",
      keyword: "ACTION",
      failState: "Friction-heavy 10-field contact forms that get abandoned.",
      studioFix: "1-click direct WhatsApp routing with pre-filled enquiry context.",
    },
  ];

  return (
    <section 
      className="relative py-24 sm:py-32 lg:py-40 bg-[#070707] text-[#FAF8F5] border-t border-white/8 overflow-hidden"
      aria-labelledby="problem-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Numbering & Label */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C76B50] bg-[#C76B50]/10 border border-[#C76B50]/20 px-2.5 py-1 rounded">
            01 / THE PROBLEM
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Huge Typographic Headline */}
        <div className="space-y-4 max-w-4xl">
          <h2
            id="problem-heading"
            className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] leading-[1.02] text-[#FAF8F5]"
          >
            YOUR BUSINESS DOESN'T NEED ANOTHER WEBSITE.
          </h2>
          <p className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.035em] leading-[1.06] text-[#C76B50]">
            IT NEEDS A DIGITAL FRONT DOOR PEOPLE ACTUALLY TRUST.
          </p>
        </div>

        <p className="mt-8 text-base sm:text-lg text-[#9A9A9A] max-w-2xl leading-relaxed">
          Most small business websites fail not because the owner lacks passion, but because the site feels like a neglected brochure. No clear visual hierarchy, slow loading speeds, and zero urgency to reach out.
        </p>

        {/* The Triad: Attention -> Trust -> Action */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-16 sm:mt-20">
          {steps.map((step, idx) => (
            <div
              key={step.keyword}
              className="relative p-6 sm:p-8 rounded-2xl bg-[#0E0E10] border border-white/10 hover:border-[#C76B50]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/8">
                  <span className="font-mono text-xs text-[#7A7A7A]">{step.num}</span>
                  {idx < 2 ? (
                    <ArrowDown size={16} className="text-[#C76B50] group-hover:translate-y-1 transition-transform" />
                  ) : (
                    <CheckCircle size={18} weight="fill" className="text-[#C76B50]" />
                  )}
                </div>

                <div className="mt-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7A7A7A]">PHASE</span>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FAF8F5] mt-1 group-hover:text-[#C76B50] transition-colors">
                    {step.keyword}
                  </h3>
                </div>

                <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
                  <div className="flex items-start gap-2.5 text-xs text-[#8A8A8A]">
                    <WarningCircle size={15} className="text-[#FF5F56] shrink-0 mt-0.5" />
                    <span>{step.failState}</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#FAF8F5]">
                    <ShieldCheck size={15} className="text-[#C76B50] shrink-0 mt-0.5" />
                    <span>{step.studioFix}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#7A7A7A]">
                <span>Status</span>
                <span className="text-[#C76B50]">Engineered by Studio</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
