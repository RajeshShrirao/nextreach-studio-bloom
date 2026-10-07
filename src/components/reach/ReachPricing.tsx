import React from "react";
import { Check, Sparkle, WhatsappLogo } from "@phosphor-icons/react";
import { buildWhatsAppUrl } from "@/data/websitePackages";

export default function ReachPricing() {
  const cards = [
    {
      id: "quick-launch",
      name: "QUICK LAUNCH",
      price: "₹5,000",
      target: "For businesses that need a professional online presence fast.",
      time: "1 to 2 days delivery",
      features: [
        "1-page website",
        "Responsive design",
        "WhatsApp integration",
        "Contact section",
        "Basic SEO",
        "1 to 2 day delivery",
      ],
      cta: "GET STARTED →",
      isFeatured: false,
      whatsappMsg: "Hi NextReach Studio, I am interested in the Quick Launch package (₹5,000). My business is:",
    },
    {
      id: "business",
      name: "BUSINESS",
      price: "₹7,500",
      target: "For businesses ready to look established online.",
      time: "2 to 3 days delivery",
      features: [
        "3 to 5 sections or pages",
        "Services / gallery",
        "Contact forms",
        "Basic SEO",
        "Analytics",
        "2 to 3 day delivery",
      ],
      cta: "GET STARTED →",
      isFeatured: false,
      whatsappMsg: "Hi NextReach Studio, I am interested in the Business package (₹7,500). My business is:",
    },
    {
      id: "premium",
      name: "PREMIUM",
      price: "₹10,000",
      target: "For businesses that want to look significantly bigger than they are.",
      time: "3 days delivery",
      features: [
        "5 to 7 pages",
        "Premium UI",
        "Custom interactions",
        "Animations",
        "SEO foundations",
        "Analytics",
        "WhatsApp conversion",
        "3-day delivery",
      ],
      cta: "BUILD PREMIUM →",
      isFeatured: true,
      whatsappMsg: "Hi NextReach Studio, I want to build the Premium package (₹10,000). My business is:",
    },
  ];

  return (
    <section 
      id="pricing"
      className="py-24 sm:py-32 lg:py-40 bg-[#070707] text-[#FAF8F5] border-t border-white/8 relative overflow-hidden"
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C76B50] bg-[#C76B50]/10 border border-[#C76B50]/20 px-3 py-1 rounded-full">
            TRANSPARENT VALUE
          </span>
          <h2
            id="pricing-heading"
            className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.04em] uppercase leading-none mt-6"
          >
            CHOOSE YOUR
            <br />
            <span className="text-[#C76B50]">NEXT REACH.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#9A9A9A] leading-relaxed">
            One-time fixed pricing. Full source code and domain handover. No monthly retainer lock-in.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {cards.map((c) => {
            const waUrl = buildWhatsAppUrl(c.whatsappMsg);

            return (
              <div
                key={c.id}
                className={`relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  c.isFeatured
                    ? "bg-[#101013] border-2 border-[#C76B50] shadow-[0_0_50px_rgba(199,107,80,0.25)] md:-translate-y-3 z-10"
                    : "bg-[#0E0E10] border border-white/10 hover:border-white/25"
                }`}
              >
                {/* Most Popular Badge */}
                {c.isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-[#C76B50] text-[#FAF8F5] font-mono font-bold text-[10px] tracking-widest uppercase shadow-md flex items-center gap-1.5">
                    <Sparkle size={11} weight="fill" />
                    <span>MOST POPULAR · OBVIOUS CHOICE</span>
                  </div>
                )}

                <div>
                  {/* Card Title & Target */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/8">
                    <h3 className="font-display text-xl font-bold uppercase tracking-tight text-[#FAF8F5]">
                      {c.name}
                    </h3>
                    <span className="font-mono text-xs text-[#7A7A7A]">{c.time}</span>
                  </div>

                  {/* Price Display */}
                  <div className="mt-6 mb-4">
                    <div className={`font-display text-4xl sm:text-5xl font-extrabold tracking-tight ${c.isFeatured ? "text-[#C76B50]" : "text-[#FAF8F5]"}`}>
                      {c.price}
                    </div>
                    <p className="mt-2 text-xs sm:text-sm text-[#9A9A9A] leading-relaxed min-h-[40px]">
                      {c.target}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="mt-6 pt-6 border-t border-white/8 space-y-3">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#7A7A7A]">
                      INCLUDED IN THIS SCOPE:
                    </div>
                    {c.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-xs text-[#D1D5DB]">
                        <Check size={14} weight="bold" className="text-[#C76B50] shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Button */}
                <div className="mt-8 pt-6 border-t border-white/8">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-semibold tracking-tight transition-all duration-200 cursor-pointer ${
                      c.isFeatured
                        ? "bg-[#C76B50] text-[#FAF8F5] hover:bg-[#D97A5E] shadow-lg hover:shadow-[0_0_25px_rgba(199,107,80,0.4)] active:scale-98"
                        : "bg-white/5 border border-white/10 text-[#FAF8F5] hover:bg-white/10 hover:border-white/20 active:scale-98"
                    }`}
                  >
                    <WhatsappLogo size={16} weight="fill" />
                    <span>{c.cta}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
