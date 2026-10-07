import React from "react";
import { ArrowRight, ArrowDown } from "@phosphor-icons/react";
import ReachHero3DCanvas from "./ReachHero3DCanvas";
import ReachHeroBrowser from "./ReachHeroBrowser";

export default function ReachHero() {
  return (
    <section 
      className="relative min-h-[100dvh] pt-24 sm:pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-[#070707] text-[#FAF8F5]"
      aria-labelledby="hero-headline"
    >
      {/* 3D WebGL Background Scene */}
      <ReachHero3DCanvas />

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Eyebrow with Brand Mark */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 sm:mb-8 animate-fade-in">
          <img src="/brand/logo-mark.svg" alt="" width={13} height={16} className="h-3.5 w-auto object-contain" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#C2C2C2]">
            NEXTREACH STUDIO / DIGITAL EXPERIENCES
          </span>
        </div>

        {/* Oversized Cinematic Editorial Headline */}
        <h1
          id="hero-headline"
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[88px] font-extrabold tracking-[-0.045em] leading-[0.98] sm:leading-[0.94] max-w-5xl uppercase text-balance"
        >
          <span className="block text-[#FAF8F5]">WEBSITES THAT MOVE</span>
          <span className="block text-[#C76B50] hover:text-[#D97A5E] transition-colors duration-500">
            BUSINESSES FORWARD.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-[#9A9A9A] max-w-[42ch] font-normal leading-relaxed text-balance">
          Premium websites designed to earn trust, generate enquiries and turn visitors into customers.
        </p>

        {/* Action CTAs in Signature Terracotta (#C76B50) */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 sm:mt-10">
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#C76B50] text-[#FAF8F5] font-semibold text-sm tracking-tight hover:bg-[#D97A5E] hover:shadow-[0_0_30px_rgba(199,107,80,0.45)] transition-all duration-200 active:scale-95 group cursor-pointer"
          >
            <span>START YOUR WEBSITE</span>
            <ArrowRight
              size={16}
              weight="bold"
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>

          <a
            href="#work"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/5 border border-white/10 text-[#C4C4C4] font-medium text-sm hover:text-[#FAF8F5] hover:bg-white/10 transition-all cursor-pointer"
          >
            <span>SEE OUR WORK</span>
            <ArrowDown size={15} />
          </a>
        </div>

        {/* Capability Tags Below CTA */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 pt-6 border-t border-white/8 text-xs font-mono text-[#7A7A7A]">
          <span>Web Design</span>
          <span className="text-white/20">/</span>
          <span>Development</span>
          <span className="text-white/20">/</span>
          <span>SEO</span>
          <span className="text-white/20">/</span>
          <span>WhatsApp</span>
          <span className="text-white/20">/</span>
          <span>Analytics</span>
        </div>
      </div>

      {/* 3D Interactive Multi-Depth Browser Section */}
      <div className="relative z-10 w-full mt-8 sm:mt-12">
        <ReachHeroBrowser />
      </div>
    </section>
  );
}
