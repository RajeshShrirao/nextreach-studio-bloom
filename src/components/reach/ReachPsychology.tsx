import React from "react";

export default function ReachPsychology() {
  const tiers = [
    {
      price: "₹5K",
      intent: "GET ONLINE.",
      tag: "Baseline Credibility",
      desc: "Stop sending potential clients to an empty domain or an inactive Instagram page.",
      isAccent: false,
    },
    {
      price: "₹7.5K",
      intent: "LOOK ESTABLISHED.",
      tag: "Commercial Authority",
      desc: "Look like a reputable, five-star local business that customers immediately trust.",
      isAccent: false,
    },
    {
      price: "₹10K",
      intent: "LOOK UNFORGETTABLE.",
      tag: "Category Leader",
      desc: "Command premium pricing by presenting a digital experience that rivals a ₹1,00,000 design firm.",
      isAccent: true,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#070707] text-[#FAF8F5] border-t border-b border-white/8 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Supporting Micro Statement */}
        <p className="text-center font-mono text-xs uppercase tracking-[0.22em] text-[#8A8A8A] mb-12 sm:mb-16">
          “Your website is often the first impression your customer gets.”
        </p>

        {/* 3 Striking Typographic Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 border-t border-b border-white/10">
          {tiers.map((t) => (
            <div
              key={t.price}
              className={`py-8 md:py-12 px-4 sm:px-8 flex flex-col justify-between transition-colors ${
                t.isAccent ? "bg-[#C76B50]/[0.03]" : ""
              }`}
            >
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#7A7A7A]">
                  {t.tag}
                </span>
                <div
                  className={`font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mt-2 ${
                    t.isAccent ? "text-[#C76B50]" : "text-[#FAF8F5]"
                  }`}
                >
                  {t.price}
                </div>
                <div className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#E2E8F0] mt-1">
                  {t.intent}
                </div>
              </div>

              <p className="mt-6 text-xs sm:text-sm text-[#8A8A8A] leading-relaxed">
                {t.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
