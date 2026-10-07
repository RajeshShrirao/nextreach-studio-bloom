import React, { useState } from "react";
import { CheckCircle, Clock } from "@phosphor-icons/react";

interface TimelineDay {
  day: string;
  title: string;
  focus: string;
  deliverable: string;
  milestones: string[];
}

const TIMELINE: TimelineDay[] = [
  {
    day: "DAY 01",
    title: "Direction & Architecture",
    focus: "Discovery call & positioning extraction",
    deliverable: "Approved structural wireframe & copy spine",
    milestones: [
      "20-minute direct discovery call with principal engineer",
      "Analysis of top local competitors and map rankings",
      "Clear positioning statement and WhatsApp intent definition",
      "Typography selection and color palette lock",
    ],
  },
  {
    day: "DAY 02",
    title: "Design & Production Build",
    focus: "Full UI crafting and mobile-first code development",
    deliverable: "Private interactive staging link for review",
    milestones: [
      "Custom layout implementation in Astro 6 and Tailwind v4",
      "Retina asset compression and SVG graphic optimization",
      "Interactive WhatsApp booking integration",
      "Sub-0.3s speed optimization and Core Web Vitals audit",
    ],
  },
  {
    day: "DAY 03",
    title: "Launch & Complete Handover",
    focus: "Production deployment, domain connection & ownership transfer",
    deliverable: "Live website, Google indexation & full source repository",
    milestones: [
      "DNS configuration and SSL certification in your name",
      "Google Search Console submission & Schema verification",
      "WhatsApp test conversion check across iOS and Android",
      "Full source code and hosting credentials handed over to you",
    ],
  },
];

const STAGES = [
  {
    num: "01",
    title: "SHOW US YOUR BUSINESS",
    desc: "Share your business type, current challenges, and goals. No lengthy briefs required.",
  },
  {
    num: "02",
    title: "WE FIND YOUR EDGE",
    desc: "We extract what makes customers choose you over competitors and structure the messaging.",
  },
  {
    num: "03",
    title: "WE BUILD THE EXPERIENCE",
    desc: "We write the copy, craft the responsive UI, and deliver live staging previews.",
  },
  {
    num: "04",
    title: "YOU GO LIVE",
    desc: "Domain wired, Google indexing triggered, full source code and logins handed over in your name.",
  },
];

export default function ReachProcess() {
  const [activeDayIdx, setActiveDayIdx] = useState(0);

  return (
    <section 
      id="process"
      className="py-24 sm:py-32 lg:py-40 bg-[#0B0B0C] text-[#FAF8F5] border-t border-white/8 relative"
      aria-labelledby="process-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C76B50] bg-[#C76B50]/10 border border-[#C76B50]/20 px-3 py-1 rounded-full">
              DELIVERY SYSTEM
            </span>
            <h2
              id="process-heading"
              className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.04em] uppercase leading-none mt-6"
            >
              FROM IDEA
              <br />
              TO LIVE
              <br />
              <span className="text-[#C76B50]">IN DAYS.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-display text-xl sm:text-2xl font-bold text-[#FAF8F5]">
              “Simple process. No agency theatre.”
            </p>
            <p className="text-xs sm:text-sm text-[#8A8A8A] mt-2">
              No six-week discovery workshops or layers of junior account executives. You deal directly with the senior engineer engineering your product.
            </p>
          </div>
        </div>

        {/* 4 Stages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14 sm:mt-16">
          {STAGES.map((st) => (
            <div
              key={st.num}
              className="p-6 rounded-2xl bg-[#111114] border border-white/10 hover:border-[#C76B50]/40 transition-colors"
            >
              <span className="font-mono text-xs text-[#C76B50] font-bold">
                {st.num}
              </span>
              <h3 className="font-display text-lg font-bold text-[#FAF8F5] mt-4 mb-2">
                {st.title}
              </h3>
              <p className="text-xs text-[#9A9A9A] leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive 3-Day Visual Timeline */}
        <div className="mt-16 sm:mt-20 p-6 sm:p-10 rounded-2xl bg-[#0F0F12] border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-white/8">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[#C76B50]" />
              <span className="font-mono text-xs uppercase tracking-wider text-[#FAF8F5]">
                Interactive 3-Day Sprint Schedule
              </span>
            </div>

            {/* Day Selector Buttons */}
            <div className="flex items-center gap-2 p-1 bg-black/40 border border-white/10 rounded-xl">
              {TIMELINE.map((t, idx) => (
                <button
                  key={t.day}
                  onClick={() => setActiveDayIdx(idx)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    activeDayIdx === idx
                      ? "bg-[#C76B50] text-[#FAF8F5] font-bold shadow-sm"
                      : "text-[#8A8A8A] hover:text-white"
                  }`}
                >
                  {t.day}
                </button>
              ))}
            </div>
          </div>

          {/* Active Day Detail Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-xs text-[#C76B50]">
                {TIMELINE[activeDayIdx].day} · MILESTONE
              </span>
              <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-[#FAF8F5]">
                {TIMELINE[activeDayIdx].title}
              </h4>
              <p className="text-sm text-[#9A9A9A]">
                Primary Focus: {TIMELINE[activeDayIdx].focus}
              </p>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#C76B50]">
                Day Deliverable: {TIMELINE[activeDayIdx].deliverable}
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#070707] border border-white/10 rounded-xl p-6 space-y-3">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#7A7A7A] mb-2">
                Sprint Checkpoints Completed
              </div>
              {TIMELINE[activeDayIdx].milestones.map((m) => (
                <div key={m} className="flex items-start gap-2.5 text-xs text-[#D1D5DB]">
                  <CheckCircle size={15} weight="fill" className="text-[#C76B50] shrink-0 mt-0.5" />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
