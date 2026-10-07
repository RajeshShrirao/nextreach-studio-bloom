import React, { useState } from "react";
import { Plus, Minus } from "@phosphor-icons/react";

interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "How quickly can my website launch?",
    answer: "Quick Launch sites go live in 1 to 2 days. Business packages take 2 to 3 days, and Premium Flagship builds launch within 3 days once your scope and materials are approved.",
  },
  {
    question: "Do you provide the domain and hosting?",
    answer: "Yes. We configure your custom domain, DNS records, and SSL hosting setup. Everything is registered in your name, meaning you own your accounts and logins with zero agency lock-in.",
  },
  {
    question: "Can you integrate WhatsApp?",
    answer: "Yes. Every website package features direct WhatsApp lead routing with pre-filled intent prompts, click-to-call mobile buttons, and conversion click tracking.",
  },
  {
    question: "Will the website be mobile friendly?",
    answer: "Absolutely. All sites are built mobile-first. Because over 75% of Indian consumer traffic arrives on smartphones, responsive ergonomics, fast fonts, and touch navigation are core priorities.",
  },
  {
    question: "Can you help with SEO?",
    answer: "Yes. Every project includes foundational technical SEO: Schema.org structured data, semantic HTML5 hierarchy, OpenGraph social previews, XML sitemaps, and Google Business Profile indexing.",
  },
  {
    question: "Can I request custom design?",
    answer: "Yes. We never rely on generic pre-made themes or bloated site builders. Every page is custom designed around your brand identity, color system, and commercial offering.",
  },
  {
    question: "What happens after launch?",
    answer: "You receive the complete production repository and deployment credentials. If you need revisions later, we handle them on small fixed scopes rather than putting you on an expensive monthly retainer.",
  },
];

export default function ReachFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section 
      id="faq"
      className="py-24 sm:py-32 bg-[#070707] text-[#FAF8F5] border-t border-white/8 relative"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C76B50] bg-[#C76B50]/10 border border-[#C76B50]/20 px-3 py-1 rounded-full">
            CLARITY &amp; ASSURANCE
          </span>
          <h2
            id="faq-heading"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.04em] uppercase leading-none mt-6"
          >
            FREQUENTLY ASKED
            <br />
            <span className="text-[#C76B50]">QUESTIONS.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#9A9A9A]">
            Everything you need to know about working with NextReach Studio.
          </p>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-white/10 border-t border-b border-white/10">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div key={faq.question} className="py-6 sm:py-7">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#FAF8F5] group-hover:text-[#C76B50] transition-colors">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/60 shrink-0 group-hover:border-[#C76B50] group-hover:text-[#C76B50] transition-colors">
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 pr-10 text-xs sm:text-sm text-[#9A9A9A] leading-relaxed animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
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
