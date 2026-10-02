"use client";

import { motion } from "motion/react";

const disciplines = [
  "AI Agents",
  "Web Applications",
  "Workflow Automation",
  "Mobile Apps",
  "Rapid MVPs",
  "API Integrations",
  "AI Consulting",
];

export default function HeroSection() {
  return (
    <section className="container-hero relative min-h-[85dvh] flex flex-col items-center justify-center overflow-hidden">
      {/* Warm Ambient Architectural Glow */}
      <div
        className="absolute top-1/3 left-1/2 w-[550px] h-[350px] -translate-x-1/2 rounded-full blur-[120px] pointer-events-none -z-10"
        style={{ background: "rgba(199, 107, 80, 0.07)" }}
        aria-hidden="true"
      />

      <div className="text-center relative z-10 flex flex-col items-center gap-5 sm:gap-6 w-full max-w-4xl px-4">
        {/* Studio Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as any }}
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wide text-[#C76B50] bg-[#C76B50]/10 border border-[#C76B50]/25 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C76B50]" />
            Senior-Engineered Digital Studio &middot; Pune
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as any }}
          className="text-[#1F1F23] font-display font-bold text-balance-wide max-w-3xl text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.12]"
        >
          Custom Websites &amp; Apps —
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1F1F23] via-[#C76B50] to-[#B8583D]">
            shipped in 24 to 72 hours.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as any }}
          className="text-[#6E6862] text-sm sm:text-base leading-relaxed max-w-xl font-body"
        >
          Custom-designed, mobile-first, and engineered for business revenue. Fixed-scope sprint packages starting at ₹5,000 with direct senior developer access.
        </motion.p>

        {/* Quiet Brand Monogram & Emblem Presentation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as any }}
          className="my-2 flex flex-col items-center gap-4"
        >
          <div className="relative group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 p-3 rounded-2xl bg-white border border-[#1F1F23]/8 shadow-[0_12px_36px_rgba(31,31,35,0.06)] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <img
                src="/logo.svg"
                alt="NextReach Studio Monogram"
                width={54}
                height={54}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Discipline Badges */}
          <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 max-w-xl">
            {disciplines.map((d) => (
              <span
                key={d}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono text-[#4A4844] bg-white border border-[#1F1F23]/8 shadow-sm"
              >
                {d}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as any }}
          className="flex flex-col sm:flex-row items-center gap-3 mt-2 w-full sm:w-auto"
        >
          <a
            href="#packages"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#C76B50] hover:bg-[#D97A5E] text-white font-display font-semibold text-sm shadow-[0_4px_20px_rgba(199,107,80,0.25)] transition-all duration-200 inline-flex items-center justify-center gap-2"
          >
            <span>View Website Packages (₹5k+)</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <a
            href="https://wa.me/919822379976?text=Hi%20NextReach%20Studio%2C%20I'm%20interested%20in%20a%20website%20for%20my%20business."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#1F1F23] hover:text-[#C76B50] border border-[#1F1F23]/12 shadow-sm transition-all duration-200 inline-flex items-center justify-center gap-2 text-xs font-mono font-semibold"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-600">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.99.54 1.787.876 2.796.877 3.177 0 5.764-2.587 5.765-5.766.001-3.181-2.585-5.764-5.765-5.764zm0-2c4.28 0 7.765 3.483 7.765 7.764 0 4.281-3.485 7.766-7.765 7.766-.001 0-.001 0 0 0-1.298 0-2.434-.336-3.466-.948l-4.565 1.196 1.218-4.453c-.696-1.107-1.077-2.313-1.077-3.561 0-4.281 3.484-7.764 7.765-7.764zm-2.031 6.586c-.167-.367-.344-.374-.504-.381-.131-.006-.281-.006-.431-.006s-.394.056-.6.281c-.206.225-.788.769-.788 1.875s.806 2.175.919 2.325c.112.15 1.556 2.493 3.844 3.403 1.902.756 2.288.606 2.7.568.413-.037 1.331-.544 1.519-1.069.188-.525.188-.975.131-1.069-.056-.094-.206-.15-.431-.263s-1.331-.656-1.538-.731-.356-.113-.506.113c-.15.225-.581.731-.712.881-.131.15-.262.169-.488.056-.225-.113-.949-.35-1.808-1.115-.668-.596-1.119-1.332-1.25-1.557s-.014-.347.098-.459c.101-.101.225-.262.338-.394s.15-.225.225-.375c.075-.15.038-.281-.019-.394s-.504-1.259-.701-1.69z"/>
            </svg>
            <span>Chat on WhatsApp</span>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-4 h-4 text-[#A69D92]"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
