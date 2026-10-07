import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowUpRight, 
  WhatsappLogo, 
  CheckCircle, 
  Sparkle, 
  Globe, 
  ShieldCheck, 
  DeviceMobile, 
  ArrowsClockwise, 
  LockSimple 
} from "@phosphor-icons/react";

interface ConceptProject {
  id: string;
  name: string;
  location: string;
  industry: string;
  domain: string;
  accent: string;
  tagline: string;
  subheadline: string;
  imageSrc: string;
  stats: { label: string; value: string }[];
  pills: string[];
  ctaLabel: string;
}

const CONCEPTS: ConceptProject[] = [
  {
    id: "aarohi",
    name: "AAROHI DENTAL STUDIO",
    location: "Pune",
    industry: "Healthcare & Aesthetics",
    domain: "aarohi.studio",
    accent: "#C76B50", // Signature Terracotta
    tagline: "ARCHITECTURAL DENTISTRY. CLINICAL EXCELLENCE.",
    subheadline: "Minimally invasive implantology & bespoke smile design in Koregaon Park, Pune.",
    imageSrc: "/assets/demos/business-clinic.jpg",
    stats: [
      { label: "Google Rating", value: "5.0 ★ (120+)" },
      { label: "Consultation", value: "Direct WhatsApp" },
      { label: "Mobile Speed", value: "99 / 100" },
    ],
    pills: ["Painless Laser", "Same-Day Veneers", "3D CBCT Scan"],
    ctaLabel: "Book Discovery Consult",
  },
  {
    id: "krafthaus",
    name: "KRAFTHAUS INTERIORS",
    location: "Mumbai",
    industry: "Interior Architecture",
    domain: "krafthaus.design",
    accent: "#C76B50",
    tagline: "RAW BRUTALISM MEETS RESIDENTIAL WARMTH.",
    subheadline: "Architectural residences and studio workspaces across South Mumbai and Bandra.",
    imageSrc: "/assets/demo-penthouse.jpg",
    stats: [
      { label: "Portfolio Size", value: "34 Residences" },
      { label: "Design Cycle", value: "6 Weeks" },
      { label: "LCP Speed", value: "0.38s" },
    ],
    pills: ["Turnkey Execution", "Cast Concrete", "Custom Millwork"],
    ctaLabel: "View 2026 Archive",
  },
  {
    id: "mitti",
    name: "MITTI & CO.",
    location: "Pune",
    industry: "Artisanal Lifestyle",
    domain: "mitti.co.in",
    accent: "#C76B50",
    tagline: "SLOW CRAFT. TERRACOTTA & BOTANICALS.",
    subheadline: "Handcrafted stoneware and native cold-pressed botanical extractions from Maharashtra.",
    imageSrc: "/assets/demos/saffron-and-smoke/hero-dish.jpg",
    stats: [
      { label: "Direct Orders", value: "1-Click WhatsApp" },
      { label: "Cart Abandonment", value: "< 12%" },
      { label: "Static Paint", value: "100/100" },
    ],
    pills: ["Small Batch", "Artisan Sourcing", "Zero Plastic"],
    ctaLabel: "Order on WhatsApp",
  },
  {
    id: "ridge",
    name: "RIDGE FITNESS",
    location: "Bangalore",
    industry: "Athletic Performance",
    domain: "ridgefit.in",
    accent: "#C76B50",
    tagline: "HYBRID STRENGTH. MEASURED OUTCOMES.",
    subheadline: "Indiranagar's private conditioning space for founders and performance athletes.",
    imageSrc: "/assets/carousel/lead-portal.webp",
    stats: [
      { label: "Daily Cap", value: "24 Athletes" },
      { label: "Biometrics", value: "Integrated" },
      { label: "Trial Booking", value: "30 Seconds" },
    ],
    pills: ["Olympic Lifting", "Recovery Lab", "Private Coaching"],
    ctaLabel: "Reserve Performance Trial",
  },
];

export default function ReachHeroBrowser() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 6, ry: -8, tx: 0, ty: 0 });

  const activeProject = CONCEPTS[activeIdx];
  const nextProject = CONCEPTS[(activeIdx + 1) % CONCEPTS.length];
  const prevProject = CONCEPTS[(activeIdx + 2) % CONCEPTS.length];

  // Mouse tracking with gentle smoothing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const { innerWidth, innerHeight } = window;
      const xRatio = (e.clientX / innerWidth - 0.5) * 2;
      const yRatio = (e.clientY / innerHeight - 0.5) * 2;

      setTilt({
        rx: 4 - yRatio * 5,
        ry: -6 + xRatio * 7,
        tx: xRatio * 10,
        ty: yRatio * 8,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-[1240px] mx-auto pt-6 pb-12 px-2 sm:px-4 select-none"
      style={{ perspective: "1500px" }}
    >
      {/* Concept Switcher Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6 px-2">
        <div className="flex items-center gap-2.5">
          <img src="/brand/logo-mark.svg" alt="" width={14} height={18} className="h-4 w-auto object-contain" />
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#A0A0A0]">
            Interactive Concept Blueprints
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono text-[#C76B50] bg-[#C76B50]/10 border border-[#C76B50]/20 px-2.5 py-0.5 rounded-full">
            OFFICIAL STUDIO LAB
          </span>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-[#111112] border border-white/10 rounded-xl overflow-x-auto">
          {CONCEPTS.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActiveIdx(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeIdx === i
                  ? "bg-[#C76B50] text-[#FAF8F5] shadow-sm font-semibold"
                  : "text-[#7A7A7A] hover:text-[#B0B0B0] hover:bg-white/5"
              }`}
            >
              {`0${i + 1} ${c.name.split(" ")[0]}`}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Browser Composition Stage */}
      <div 
        className="relative transition-transform duration-700 ease-out min-h-[480px] sm:min-h-[540px] md:min-h-[580px]"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translate3d(${tilt.tx}px, ${tilt.ty}px, 0px)`,
        }}
      >
        {/* BACKGROUND BROWSER 2 (Deepest layer) */}
        <div 
          onClick={() => setActiveIdx((activeIdx + 2) % CONCEPTS.length)}
          className="hidden md:block absolute top-6 -right-6 lg:-right-12 w-[85%] rounded-2xl bg-[#0E0E10] border border-white/8 shadow-2xl p-4 cursor-pointer transition-all duration-500 hover:border-white/20"
          style={{
            transform: "translate3d(60px, 30px, -140px) rotateY(4deg) scale(0.92)",
            opacity: 0.45,
            filter: "blur(1.5px)",
          }}
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            </div>
            <span className="font-mono text-[10px] text-white/40">{prevProject.domain}</span>
          </div>
          <div className="pt-8 pb-14 px-6">
            <p className="font-mono text-xs text-white/40">{prevProject.industry} · {prevProject.location}</p>
            <h4 className="font-display text-2xl font-bold text-white/60 mt-2">{prevProject.name}</h4>
          </div>
        </div>

        {/* BACKGROUND BROWSER 1 (Secondary layer) */}
        <div 
          onClick={() => setActiveIdx((activeIdx + 1) % CONCEPTS.length)}
          className="hidden md:block absolute -top-4 -left-6 lg:-left-10 w-[90%] rounded-2xl bg-[#111113] border border-white/10 shadow-2xl p-4 cursor-pointer transition-all duration-500 hover:border-white/25"
          style={{
            transform: "translate3d(-40px, -20px, -70px) rotateY(-3deg) scale(0.96)",
            opacity: 0.65,
            filter: "blur(0.8px)",
          }}
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/8">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white/5 text-[11px] font-mono text-white/50">
              <LockSimple size={11} />
              <span>{nextProject.domain}</span>
            </div>
            <span className="text-[10px] font-mono text-white/40">{nextProject.location}</span>
          </div>

          <div className="pt-6 pb-12 px-6">
            <span className="text-[10px] font-mono text-[#C76B50] uppercase tracking-wider">{nextProject.industry}</span>
            <h3 className="font-display text-3xl font-bold text-white/80 mt-1">{nextProject.name}</h3>
            <p className="text-xs text-white/50 mt-1">{nextProject.tagline}</p>
          </div>
        </div>

        {/* FOREGROUND MAIN BROWSER (High Definition with Real Project Assets) */}
        <div 
          className="relative z-10 w-full rounded-2xl bg-[#0F0F11] border border-white/15 shadow-[0_30px_100px_rgba(0,0,0,0.85),0_0_40px_rgba(199,107,80,0.1)] overflow-hidden transition-all duration-300"
          style={{
            transform: "translate3d(0, 0, 20px)",
          }}
        >
          {/* Browser Chrome Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#161618] border-b border-white/10 gap-3">
            {/* Traffic Lights */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]/80 hover:bg-[#FF5F56] transition-colors" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/80 hover:bg-[#FFBD2E] transition-colors" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]/80 hover:bg-[#27C93F] transition-colors" />
            </div>

            {/* Address Bar */}
            <div className="flex items-center justify-center flex-1 max-w-[460px] mx-auto px-4 py-1.5 rounded-lg bg-[#0A0A0C] border border-white/10 text-xs font-mono text-[#A8A8A8] gap-2 shadow-inner">
              <LockSimple size={13} className="text-[#C76B50]" />
              <span className="text-white/40">https://</span>
              <span className="text-[#FAF8F5] font-medium">{activeProject.domain}</span>
              <span className="ml-auto flex items-center gap-1 text-[10px] text-[#C76B50] bg-[#C76B50]/10 px-1.5 py-0.5 rounded">
                <CheckCircle size={10} weight="fill" /> 99 CWV
              </span>
            </div>

            {/* Right Tools */}
            <div className="flex items-center gap-2 text-white/40">
              <ArrowsClockwise size={14} className="hover:text-white transition-colors cursor-pointer" />
              <DeviceMobile size={14} className="hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>

          {/* Browser Inner Page Canvas */}
          <div className="p-6 sm:p-8 md:p-10 bg-gradient-to-b from-[#121214] to-[#0A0A0C]">
            {/* Concept Nav Header */}
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#C76B50]/15 border border-[#C76B50]/30 flex items-center justify-center">
                  <img src="/brand/logo-mark.svg" alt="" width={16} height={20} className="h-4 w-auto object-contain" />
                </div>
                <div>
                  <div className="font-display text-sm font-bold tracking-tight text-[#FAF8F5]">
                    {activeProject.name}
                  </div>
                  <div className="font-mono text-[10px] text-[#7A7A7A]">
                    {activeProject.location} · {activeProject.industry}
                  </div>
                </div>
              </div>

              {/* Fictional Nav Links */}
              <div className="hidden sm:flex items-center gap-5 text-xs text-[#9A9A9A]">
                <span className="text-[#FAF8F5] font-medium">Overview</span>
                <span className="hover:text-white transition-colors cursor-pointer">Credentials</span>
                <span className="hover:text-white transition-colors cursor-pointer">Treatments</span>
                <span className="hover:text-white transition-colors cursor-pointer">Contact</span>
              </div>

              {/* WhatsApp Quick Action inside Concept */}
              <a
                href={`https://wa.me/919822379976?text=${encodeURIComponent(`Hi NextReach Studio, I saw the concept demo for ${activeProject.name} and want a similar website for my business.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] text-xs font-medium hover:bg-[#25D366]/25 transition-all cursor-pointer"
              >
                <WhatsappLogo size={14} weight="fill" />
                <span>WhatsApp Booking</span>
              </a>
            </div>

            {/* Concept Website Hero Area with Real Media Visual */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                {/* Concept Tag */}
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#C76B50]/10 border border-[#C76B50]/20 text-[10px] font-mono text-[#C76B50] mb-4">
                  <Sparkle size={12} weight="fill" />
                  <span>NEXTREACH PROPRIETARY LAYOUT</span>
                </div>

                {/* Concept Large Headline */}
                <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#FAF8F5] leading-[1.08]">
                  {activeProject.tagline}
                </h3>

                <p className="mt-4 text-sm sm:text-base text-[#9A9A9A] max-w-[50ch] leading-relaxed">
                  {activeProject.subheadline}
                </p>

                {/* Interactive Pills */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {activeProject.pills.map((pill) => (
                    <span 
                      key={pill} 
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/8 text-xs text-[#C0C0C0]"
                    >
                      <CheckCircle size={12} className="text-[#C76B50]" />
                      {pill}
                    </span>
                  ))}
                </div>

                {/* Concept Action */}
                <div className="flex items-center flex-wrap gap-4 mt-8">
                  <a
                    href={`https://wa.me/919822379976?text=${encodeURIComponent(`Hi NextReach Studio, I want to build a website inspired by the ${activeProject.name} layout.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs text-white bg-[#C76B50] hover:bg-[#D97A5E] transition-all active:scale-[0.98] shadow-md cursor-pointer"
                  >
                    <span>{activeProject.ctaLabel}</span>
                    <ArrowUpRight size={14} weight="bold" />
                  </a>

                  <div className="flex items-center gap-2 text-xs text-[#7A7A7A] font-mono">
                    <ShieldCheck size={16} className="text-[#C76B50]" />
                    <span>Domain Handover + Full Code Ownership</span>
                  </div>
                </div>
              </div>

              {/* Real Concept Photography / Media Card */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] bg-black shadow-xl group">
                  <img
                    src={activeProject.imageSrc}
                    alt={activeProject.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white text-[11px]">{activeProject.name}</div>
                      <div className="text-[10px] font-mono text-[#A0A0A0]">{activeProject.location}</div>
                    </div>
                    <span className="font-mono text-[10px] text-[#C76B50] bg-[#C76B50]/15 px-2 py-0.5 rounded">
                      VERIFIED PREVIEW
                    </span>
                  </div>
                </div>

                {/* Metrics strip */}
                <div className="p-3.5 rounded-xl bg-[#141417] border border-white/10">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {activeProject.stats.map((s) => (
                      <div key={s.label}>
                        <div className="font-mono font-bold text-xs text-[#FAF8F5]">{s.value}</div>
                        <div className="text-[9px] text-[#8A8A8A] mt-0.5 truncate">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Micro Scroll Indicator Line */}
      <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/10 text-xs font-mono text-[#7A7A7A]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C76B50]" />
          <span>NextReach Concept Engine · 4 Bespoke Blueprints</span>
        </div>
        <div className="flex items-center gap-2 text-[#FAF8F5] hover:text-[#C76B50] transition-colors cursor-pointer">
          <span className="tracking-widest">SCROLL TO REACH</span>
          <span className="text-[#C76B50] font-bold">→</span>
        </div>
      </div>
    </div>
  );
}
