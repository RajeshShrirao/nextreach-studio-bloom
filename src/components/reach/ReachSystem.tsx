import React, { useState, useEffect } from "react";
import { Sparkle, CheckCircle } from "@phosphor-icons/react";

interface NodeData {
  id: string;
  name: string;
  num: string;
  role: string;
  description: string;
  metric: string;
}

const NODES: NodeData[] = [
  {
    id: "attention",
    name: "ATTENTION",
    num: "01",
    role: "Visual Stopping Power",
    description: "Cinematic typography and bespoke art direction that halts the 3-second scroll bounce.",
    metric: "3.4x Longer First Read",
  },
  {
    id: "trust",
    name: "TRUST",
    num: "02",
    role: "Proof & Credentials",
    description: "Immediate Google Map ratings, transparent scope, and crisp senior engineering delivery.",
    metric: "Zero Agency Bloat",
  },
  {
    id: "discovery",
    name: "DISCOVERY",
    num: "03",
    role: "AI & Organic Reach",
    description: "Built to be cited by Perplexity, Gemini, ChatGPT and Google AI Overview summaries.",
    metric: "AEO / GEO Optimized",
  },
  {
    id: "seo",
    name: "SEO",
    num: "04",
    role: "Local Search Dominance",
    description: "Technical schema, local citation alignment, and verified Google Business Profile links.",
    metric: "Rank 1 Map-Pack Target",
  },
  {
    id: "whatsapp",
    name: "WHATSAPP",
    num: "05",
    role: "Frictionless Conversation",
    description: "Converts passive visitors into direct WhatsApp chats with pre-filled enquiry parameters.",
    metric: "4.8x Lead Velocity",
  },
  {
    id: "conversion",
    name: "CONVERSION",
    num: "06",
    role: "Business Revenue",
    description: "The complete circle closing with booked appointments and contracted clients.",
    metric: "Immediate Cash Flow",
  },
];

export default function ReachSystem() {
  const [activeNode, setActiveNode] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % NODES.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section 
      className="py-24 sm:py-32 lg:py-40 bg-[#0B0B0C] text-[#FAF8F5] border-t border-white/8 relative overflow-hidden"
      aria-labelledby="system-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C76B50] bg-[#C76B50]/10 border border-[#C76B50]/20 px-3 py-1 rounded-full">
            THE SIGNATURE ENGINE
          </span>
          <h2
            id="system-heading"
            className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.04em] uppercase leading-none mt-6"
          >
            REACH
            <br />
            <span className="text-[#C76B50]">WHAT'S NEXT.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#9A9A9A] leading-relaxed">
            A website is not an isolated island. It is the central gravitational hub of an integrated business growth loop.
          </p>
        </div>

        {/* Circular / Radial Interactive Composition */}
        <div 
          className="relative max-w-[700px] h-[520px] sm:h-[620px] mx-auto flex items-center justify-center select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Orbital SVG Tracks */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="-300 -300 600 600">
            {/* Concentric rings */}
            <circle cx="0" cy="0" r="120" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="0" cy="0" r="210" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <circle cx="0" cy="0" r="255" fill="none" stroke="rgba(199,107,80,0.12)" strokeWidth="1" strokeDasharray="2 6" />

            {/* Pulsing ray to active node in Terracotta */}
            {(() => {
              const angle = (activeNode * 60 - 90) * (Math.PI / 180);
              const x = Math.cos(angle) * 210;
              const y = Math.sin(angle) * 210;
              return (
                <line
                  x1="0"
                  y1="0"
                  x2={x}
                  y2={y}
                  stroke="#C76B50"
                  strokeWidth="1.5"
                  strokeOpacity="0.7"
                  strokeDasharray="4 4"
                />
              );
            })()}
          </svg>

          {/* Center Hub: YOUR BUSINESS with Official Logo Mark */}
          <div className="relative z-20 w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#111114] border-2 border-[#C76B50]/30 shadow-[0_0_60px_rgba(199,107,80,0.18)] flex flex-col items-center justify-center p-4 text-center">
            <img src="/brand/logo-mark.svg" alt="" width={22} height={28} className="h-6 w-auto object-contain mb-2 animate-pulse" />
            <div className="font-display font-extrabold text-sm sm:text-base tracking-tight text-[#FAF8F5]">
              YOUR BUSINESS
            </div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-[#C76B50] mt-0.5">
              CENTRAL HUB
            </div>
          </div>

          {/* 6 Orbiting Nodes */}
          {NODES.map((node, i) => {
            const angleDeg = i * 60 - 90;
            const angleRad = angleDeg * (Math.PI / 180);
            const radius = 210;
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius;
            const isActive = activeNode === i;

            return (
              <button
                key={node.id}
                onClick={() => setActiveNode(i)}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                className={`absolute z-30 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer shadow-lg ${
                  isActive
                    ? "bg-[#18181C] border-[#C76B50] shadow-[0_0_24px_rgba(199,107,80,0.3)] scale-110"
                    : "bg-[#111113] border-white/10 hover:border-white/30 hover:bg-[#161619]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-[9px] ${isActive ? "text-[#C76B50]" : "text-[#7A7A7A]"}`}>
                    {node.num}
                  </span>
                  <span className={`font-display text-xs sm:text-sm font-bold tracking-tight ${
                    isActive ? "text-[#C76B50]" : "text-[#FAF8F5]"
                  }`}>
                    {node.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Node Details Card */}
        <div className="mt-8 max-w-xl mx-auto p-6 rounded-2xl bg-[#121215] border border-white/10 shadow-xl text-center">
          <div className="flex items-center justify-center gap-2 font-mono text-xs text-[#C76B50] uppercase tracking-wider mb-2">
            <Sparkle size={14} weight="fill" />
            <span>NODE {NODES[activeNode].num} · {NODES[activeNode].role}</span>
          </div>

          <h3 className="font-display text-2xl font-bold text-[#FAF8F5]">
            {NODES[activeNode].name}
          </h3>

          <p className="mt-2 text-sm text-[#9A9A9A] leading-relaxed">
            {NODES[activeNode].description}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#FAF8F5]">
            <CheckCircle size={14} className="text-[#C76B50]" />
            <span>Studio Impact: {NODES[activeNode].metric}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
