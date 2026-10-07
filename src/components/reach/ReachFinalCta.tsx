import React from "react";
import { ArrowRight, ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react";

export default function ReachFinalCta() {
  const whatsappUrl = "https://wa.me/919822379976?text=" + encodeURIComponent("Hi NextReach Studio, I am ready to start a website project for my business.");

  return (
    <section 
      className="py-32 sm:py-44 lg:py-52 bg-[#070707] text-[#FAF8F5] border-t border-white/8 relative overflow-hidden text-center flex flex-col items-center justify-center"
      aria-labelledby="final-cta-heading"
    >
      {/* Animated Expanding Concentric Rings in Background (Terracotta) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0" aria-hidden="true">
        <svg className="w-[800px] h-[800px] sm:w-[1100px] sm:h-[1100px] opacity-25" viewBox="0 0 1000 1000">
          <circle cx="500" cy="500" r="160" fill="none" stroke="#C76B50" strokeWidth="1" strokeDasharray="3 6" className="animate-pulse" />
          <circle cx="500" cy="500" r="280" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <circle cx="500" cy="500" r="390" fill="none" stroke="rgba(199,107,80,0.3)" strokeWidth="1" strokeDasharray="6 12" />
          <circle cx="500" cy="500" r="480" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        </svg>

        {/* Ambient Terracotta Spotlight */}
        <div 
          className="absolute w-[520px] h-[520px] rounded-full blur-[170px] opacity-15 pointer-events-none"
          style={{ background: "#C76B50" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full font-mono text-xs uppercase tracking-[0.25em] text-[#C76B50] bg-[#C76B50]/10 border border-[#C76B50]/20 mb-8">
          <img src="/brand/logo-mark.svg" alt="" width={12} height={15} className="h-3 w-auto object-contain" />
          <span>THE NEXT MOVE</span>
        </div>

        {/* Massive Cinematic Headline */}
        <h2
          id="final-cta-heading"
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[92px] font-extrabold tracking-[-0.045em] leading-[0.95] uppercase text-balance"
        >
          READY TO
          <br />
          REACH
          <br />
          <span className="text-[#C76B50]">WHAT'S NEXT?</span>
        </h2>

        {/* Supporting Copy */}
        <p className="mt-8 text-base sm:text-xl text-[#9A9A9A] max-w-xl mx-auto leading-relaxed text-balance">
          Tell us where your business is today.
          <br />
          We'll help build where it goes next.
        </p>

        {/* Dual High-Contrast CTAs with Signature Terracotta */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mt-10 sm:mt-12">
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#C76B50] text-[#FAF8F5] font-semibold text-sm tracking-tight hover:bg-[#D97A5E] hover:shadow-[0_0_35px_rgba(199,107,80,0.5)] transition-all duration-200 active:scale-95 group cursor-pointer"
          >
            <span>START YOUR WEBSITE</span>
            <ArrowRight size={16} weight="bold" className="group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#141417] border border-white/15 text-[#25D366] font-medium text-sm hover:bg-[#1E1E22] hover:border-[#25D366]/40 transition-all cursor-pointer"
          >
            <WhatsappLogo size={18} weight="fill" />
            <span>CHAT ON WHATSAPP</span>
            <ArrowUpRight size={14} weight="bold" />
          </a>
        </div>

        {/* Pricing Anchor Reminder */}
        <div className="mt-12 font-mono text-xs text-[#7A7A7A] flex items-center justify-center gap-4 flex-wrap">
          <span>Fixed Packages: ₹5,000 / ₹7,500 / ₹10,000</span>
          <span className="text-white/20">·</span>
          <span>1 to 3 Days Turnaround</span>
          <span className="text-white/20">·</span>
          <span>Full Ownership</span>
        </div>
      </div>
    </section>
  );
}
