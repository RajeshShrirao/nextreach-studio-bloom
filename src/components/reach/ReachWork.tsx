import React, { useState } from "react";
import { 
  ArrowUpRight, 
  LockSimple, 
  X, 
  WhatsappLogo, 
  CheckCircle
} from "@phosphor-icons/react";

interface ProjectItem {
  id: string;
  name: string;
  category: string;
  location: string;
  year: string;
  tier: string;
  tagline: string;
  summary: string;
  domain: string;
  imageSrc: string;
  deliverables: string[];
  visualAccent: string;
  previewHeroTitle: string;
  previewHeroDesc: string;
  badgeTone: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "aarohi",
    name: "AAROHI DENTAL STUDIO",
    category: "Healthcare & Aesthetics",
    location: "Pune",
    year: "2026",
    tier: "₹10,000 Premium",
    tagline: "Architectural surgical studio and patient discovery experience.",
    summary: "Created to eliminate clinical intimidation. Warm Japanese stone palette, 3D scan booking flow, and direct WhatsApp dental triage.",
    domain: "aarohi.studio",
    imageSrc: "/assets/demos/business-clinic.jpg",
    deliverables: ["Full 5-Page Experience", "Local Map Schema", "Direct WhatsApp Booking", "Sub-0.3s Performance"],
    visualAccent: "#C76B50",
    previewHeroTitle: "PRECISION SURGICAL DENTISTRY.",
    previewHeroDesc: "Minimal intervention smile architecture and micro-implants in Koregaon Park.",
    badgeTone: "bg-[#C76B50]/10 text-[#C76B50] border-[#C76B50]/20",
  },
  {
    id: "krafthaus",
    name: "KRAFTHAUS INTERIORS",
    category: "Interior Architecture",
    location: "Mumbai",
    year: "2026",
    tier: "₹10,000 Premium",
    tagline: "Brutalist residential portfolio with editorial spatial gallery.",
    summary: "Replaces traditional PDF brochures with an interactive archive of residential works across Bandra and South Mumbai.",
    domain: "krafthaus.design",
    imageSrc: "/assets/demo-penthouse.jpg",
    deliverables: ["34 Project Case Studies", "High-Resolution Image Pipeline", "Client Inquiries via WhatsApp", "Zero-Shift Grid"],
    visualAccent: "#C76B50",
    previewHeroTitle: "RAW BRUTALISM. CALM LIVING.",
    previewHeroDesc: "Cast concrete, custom oak millwork, and balanced residential architecture.",
    badgeTone: "bg-[#C76B50]/10 text-[#C76B50] border-[#C76B50]/20",
  },
  {
    id: "mitti",
    name: "MITTI & CO.",
    category: "Artisanal Lifestyle",
    location: "Pune",
    year: "2026",
    tier: "₹7,500 Business",
    tagline: "Direct-to-consumer stoneware & botanicals catalogue.",
    summary: "Fast catalog showcasing small-batch terracotta craft. Visitors add items to cart and checkout in one tap over WhatsApp.",
    domain: "mitti.co.in",
    imageSrc: "/assets/demos/saffron-and-smoke/hero-dish.jpg",
    deliverables: ["Product Showcase", "Instant WhatsApp Checkout", "Artisan Provenance Stories", "Mobile-First Ergonomics"],
    visualAccent: "#C76B50",
    previewHeroTitle: "SLOW LIVING. NATIVE BOTANICALS.",
    previewHeroDesc: "Handcrafted stoneware and cold-pressed botanical extractions from rural Maharashtra.",
    badgeTone: "bg-[#C76B50]/10 text-[#C76B50] border-[#C76B50]/20",
  },
  {
    id: "ridge",
    name: "RIDGE FITNESS",
    category: "Athletic Performance",
    location: "Bangalore",
    year: "2026",
    tier: "₹7,500 Business",
    tagline: "High-intensity athletic conditioning & private club booking.",
    summary: "Dark carbon interface for an Indiranagar training studio with live cap indicators and immediate session reservation.",
    domain: "ridgefit.in",
    imageSrc: "/assets/demo-villa.jpg",
    deliverables: ["Real-time Slot Counter", "Coach Profiles", "Integrated WhatsApp Concierge", "SEO Map Pack Indexing"],
    visualAccent: "#C76B50",
    previewHeroTitle: "HYBRID STRENGTH. INDIRANAGAR.",
    previewHeroDesc: "Daily capacity capped at 24 athletes to guarantee coach attention and results.",
    badgeTone: "bg-[#C76B50]/10 text-[#C76B50] border-[#C76B50]/20",
  },
];

export default function ReachWork() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section 
      id="work"
      className="py-24 sm:py-32 lg:py-40 bg-[#070707] text-[#FAF8F5] border-t border-white/8 relative"
      aria-labelledby="work-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/brand/logo-mark.svg" alt="" width={14} height={18} className="h-4 w-auto object-contain" />
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#A0A0A0]">
                SELECTED WORK · 2026 ARCHIVE
              </span>
            </div>
            <h2
              id="work-heading"
              className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.04em] uppercase leading-none"
            >
              BUILT TO BE
              <br />
              <span className="text-[#C76B50]">REMEMBERED.</span>
            </h2>
          </div>

          <div className="max-w-md text-left md:text-right">
            <span className="inline-block px-3 py-1 rounded-full font-mono text-[11px] text-[#C76B50] bg-[#C76B50]/10 border border-[#C76B50]/20 mb-2">
              CONCEPT PROJECTS · NO FABRICATED CLAIMS
            </span>
            <p className="text-xs sm:text-sm text-[#8A8A8A]">
              We showcase pure concept blueprints built with production rigor. Inspect the live UI architecture and responsive layouts below.
            </p>
          </div>
        </div>

        {/* Project Cards Stack with Real Media Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mt-12 sm:mt-16">
          {PROJECTS.map((p, idx) => (
            <article
              key={p.id}
              className="group relative rounded-2xl bg-[#0F0F12] border border-white/10 hover:border-[#C76B50]/40 transition-all duration-300 flex flex-col overflow-hidden shadow-xl"
            >
              {/* Card Browser Top Chrome */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#151518] border-b border-white/8 text-xs font-mono text-[#8A8A8A]">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="ml-2 text-[10px] text-white/40">0{idx + 1}</span>
                </div>

                <div className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-black/40 text-[11px] text-white/60">
                  <LockSimple size={11} className="text-[#C76B50]" />
                  <span>{p.domain}</span>
                </div>

                <span className="text-[10px] font-mono text-[#C76B50]">CONCEPT</span>
              </div>

              {/* Simulated High-End Browser Canvas Preview with Photography */}
              <div className="relative p-6 sm:p-8 bg-gradient-to-b from-[#131316] to-[#0A0A0C] flex-1 flex flex-col justify-between min-h-[300px]">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#A0A0A0]">
                      {p.category} · {p.location}
                    </span>
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${p.badgeTone}`}>
                      {p.tier}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FAF8F5] group-hover:text-[#C76B50] transition-colors">
                    {p.name}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-[#9A9A9A] leading-relaxed line-clamp-2">
                    {p.summary}
                  </p>
                </div>

                {/* Media Image Banner inside card */}
                <div className="mt-6 relative rounded-xl overflow-hidden aspect-[16/9] border border-white/10 bg-black">
                  <img
                    src={p.imageSrc}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-xs">
                    <div className="font-display font-bold text-white text-[13px]">{p.previewHeroTitle}</div>
                    <div className="text-[11px] text-[#A0A0A0] mt-0.5">{p.previewHeroDesc}</div>
                  </div>
                </div>

                {/* Footer Strip with Action Button */}
                <div className="mt-6 pt-4 border-t border-white/8 flex items-center justify-between">
                  <span className="font-mono text-xs text-[#7A7A7A]">{p.year} Archive</span>

                  <button
                    onClick={() => setSelectedProject(p)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#FAF8F5] hover:text-[#C76B50] transition-colors cursor-pointer"
                  >
                    <span>View concept</span>
                    <ArrowUpRight size={14} weight="bold" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Concept Blueprint Modal Drawer */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl rounded-2xl bg-[#111114] border border-white/15 p-6 sm:p-10 shadow-2xl text-[#FAF8F5] max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <img src="/brand/logo-mark.svg" alt="" width={18} height={22} className="h-5 w-auto object-contain" />
                <div>
                  <h4 className="font-display text-xl sm:text-2xl font-bold">
                    {selectedProject.name}
                  </h4>
                  <div className="font-mono text-xs text-[#8A8A8A]">
                    {selectedProject.location} · {selectedProject.category} · {selectedProject.tier}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/15 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-6 space-y-6">
              <div className="relative rounded-xl overflow-hidden aspect-[16/9] border border-white/10">
                <img
                  src={selectedProject.imageSrc}
                  alt={selectedProject.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#C76B50]">
                  DESIGN ARCHITECTURE &amp; STRATEGY
                </span>
                <p className="mt-2 text-sm text-[#A0A0A0] leading-relaxed">
                  {selectedProject.summary} {selectedProject.tagline}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0A0A0C] border border-white/10">
                <div className="font-mono text-xs uppercase text-[#7A7A7A] mb-3">
                  Scope Deliverables Included in this Tier
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedProject.deliverables.map((d) => (
                    <div key={d} className="flex items-center gap-2 text-[#E2E8F0]">
                      <CheckCircle size={14} className="text-[#C76B50]" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-[#161619] border border-white/10 flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#25D366]/10 text-[#25D366]">
                    <WhatsappLogo size={22} weight="fill" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Build a similar website for your business</div>
                    <div className="text-[11px] text-[#8A8A8A]">Starts at {selectedProject.tier.split(" ")[0]} · Delivered in 2 to 3 days</div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/919822379976?text=${encodeURIComponent(`Hi NextReach Studio, I am interested in building a website with the layout of ${selectedProject.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C76B50] hover:bg-[#D97A5E] text-white text-xs font-semibold hover:shadow-lg transition-transform active:scale-95 cursor-pointer"
                >
                  <span>Scope via WhatsApp</span>
                  <ArrowUpRight size={14} weight="bold" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
