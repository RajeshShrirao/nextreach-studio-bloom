"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CaretDown,
  WhatsappLogo,
  ArrowRight,
  Check,
  Lightning,
  ShieldCheck,
  Gauge,
  Clock,
  Sparkle,
  Cpu,
} from "@phosphor-icons/react";

interface SprintTier {
  id: string;
  name: string;
  price: string;
  turnaround: string;
  description: string;
  deliverables: string[];
  ctaText: string;
  waQuery: string;
}

const sprintTiers: SprintTier[] = [
  {
    id: "starter",
    name: "One-Page Sprint",
    price: "₹5,000",
    turnaround: "24-48 Hours",
    description: "High-converting single-page digital flagship with sub-second mobile speed, SEO schema, and direct WhatsApp lead routing.",
    deliverables: [
      "Mobile-First Responsive Layout",
      "Sub-Second Core Web Vitals (100/100)",
      "WhatsApp Concierge Routing",
      "Full Code & Domain DNS Handover",
    ],
    ctaText: "Order ₹5k Sprint on WhatsApp",
    waQuery: "Hi NextReach Studio, I want to book the One-Page Website Sprint (₹5,000) for my business.",
  },
  {
    id: "flagship",
    name: "Multi-Page Flagship",
    price: "₹10,000",
    turnaround: "48-72 Hours",
    description: "Up to 5 custom-designed pages (Home, About, Services, Case Studies, Contact) with editorial brand aesthetics and reservation engine.",
    deliverables: [
      "Up to 5 Bespoke Designed Pages",
      "Booking & Reservation Form Flow",
      "Automated WhatsApp Confirmation",
      "Technical Local SEO & Rich Schema",
    ],
    ctaText: "Order ₹10k Flagship on WhatsApp",
    waQuery: "Hi NextReach Studio, I want to book the Multi-Page Flagship package (₹10,000) for my business.",
  },
  {
    id: "webapp",
    name: "Custom Web App / MVP",
    price: "₹15,000+",
    turnaround: "1-2 Weeks",
    description: "Full-stack web application with role-based authentication, database integration, admin dashboard, and payment gateways.",
    deliverables: [
      "Role-Based User Authentication",
      "Database & REST/GraphQL APIs",
      "Razorpay / Stripe Billing Integration",
      "Automated Vercel / Cloud Deployment",
    ],
    ctaText: "Discuss Web App Architecture",
    waQuery: "Hi NextReach Studio, I want to discuss custom Web App / MVP development.",
  },
  {
    id: "ai-agents",
    name: "AI Autonomous Agents",
    price: "₹20,000+",
    turnaround: "1-2 Weeks",
    description: "Intelligent autonomous AI workflows, customer support agents with WhatsApp routing, and multi-agent systems with MCP tools.",
    deliverables: [
      "Multi-Agent Orchestration & MCP",
      "24/7 WhatsApp Lead Qualification",
      "Document & Invoicing Pipelines",
      "Zero-Data-Retention Security",
    ],
    ctaText: "Explore AI Agent Solutions",
    waQuery: "Hi NextReach Studio, I want to discuss Autonomous AI Agent development.",
  },
];

export default function HeroSection() {
  const [activeTier, setActiveTier] = useState<string>("starter");
  const currentTier = sprintTiers.find((t) => t.id === activeTier) || sprintTiers[0];

  return (
    <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Studio Eyebrow Bar */}
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#1F1F23]/8 shadow-xs mb-5"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#1F1F23]">
            Senior Engineering Studio &bull; Pune
          </span>
          <span className="hidden sm:inline text-[#1F1F23]/20">&bull;</span>
          <span className="hidden sm:inline text-[11px] font-mono text-[#C76B50] font-semibold">
            Sprint Slots Open for Q2
          </span>
        </motion.div>

        {/* Master Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-3xl sm:text-5xl lg:text-[4rem] font-display font-bold text-[#1F1F23] tracking-[-0.035em] leading-[1.08] mb-6 max-w-4xl text-balance"
        >
          Custom Websites &amp; Web Platforms
          <br />
          <span className="text-[#C76B50]">
            built for revenue, shipped in days.
          </span>
        </motion.h1>

        {/* Crisp Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-sm sm:text-base lg:text-lg text-[#6E6862] leading-relaxed max-w-2xl font-body mb-8"
        >
          Senior full-stack developers building bespoke digital flagships, high-velocity web applications, and autonomous AI agents. Fixed-scope sprint pricing from ₹5,000. No agency overhead.
        </motion.p>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto"
        >
          <a
            href="#packages"
            className="w-full sm:w-auto min-h-[46px] px-6 py-3 rounded-xl bg-[#C76B50] hover:bg-[#D97A5E] text-white font-display font-semibold text-sm shadow-[0_4px_18px_rgba(199,107,80,0.24)] transition-all duration-200 inline-flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Explore All Packages (₹5k+)</span>
            <CaretDown weight="bold" className="w-4 h-4" />
          </a>
          <a
            href="https://wa.me/919822379976?text=Hi%20NextReach%20Studio%2C%20I'm%20interested%20in%20launching%20a%20website%20or%20web%20app%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-[46px] px-5 py-3 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#1F1F23] hover:text-[#C76B50] border border-[#1F1F23]/12 shadow-xs transition-all duration-200 inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-mono font-semibold hover:-translate-y-0.5 active:translate-y-0"
          >
            <WhatsappLogo weight="fill" className="w-4 h-4 text-emerald-600" />
            <span>WhatsApp Senior Dev (Sub-2m Reply)</span>
          </a>
        </motion.div>
      </div>

      {/* ==================== AWWWARDS-INSPIRED BENTO COMMAND STAGE ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch max-w-6xl mx-auto"
      >
        {/* Command Module 1: Interactive Sprint Configurator (7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-[#1F1F23]/10 bg-white p-5 sm:p-7 shadow-[0_4px_24px_rgba(42,42,45,0.04)] flex flex-col justify-between">
          <div>
            {/* Top Selector Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-[#1F1F23]/8">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#6E6862] flex items-center gap-1.5">
                <Cpu weight="bold" className="w-3.5 h-3.5 text-[#C76B50]" />
                Interactive Sprint Configurator
              </span>
              <span className="text-xs font-mono font-bold text-[#C76B50] flex items-center gap-1">
                <Clock weight="bold" className="w-3.5 h-3.5" />
                {currentTier.turnaround}
              </span>
            </div>

            {/* Pill Selectors */}
            <div className="flex flex-wrap gap-2 mb-5">
              {sprintTiers.map((tier) => {
                const isSelected = tier.id === activeTier;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setActiveTier(tier.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-[#C76B50] text-white shadow-xs"
                        : "bg-[#FAF8F5] text-[#4A4844] hover:bg-[#F0ECE4] hover:text-[#1F1F23]"
                    }`}
                  >
                    {tier.name}
                  </button>
                );
              })}
            </div>

            {/* Animated Active Tier Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTier.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
              >
                <div className="flex items-baseline justify-between gap-2 mb-2">
                  <h3 className="text-base sm:text-lg font-display font-bold text-[#1F1F23]">
                    {currentTier.name}
                  </h3>
                  <span className="text-lg sm:text-xl font-display font-bold text-[#C76B50]">
                    {currentTier.price}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#6E6862] leading-relaxed font-body mb-4">
                  {currentTier.description}
                </p>

                {/* Deliverables Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {currentTier.deliverables.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-[#4A4844] font-body">
                      <Check weight="bold" className="w-3.5 h-3.5 text-[#C76B50] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quick Action Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[#1F1F23]/8 mt-2">
            <a
              href={`https://wa.me/919822379976?text=${encodeURIComponent(currentTier.waQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#C76B50] hover:text-[#D97A5E] transition-colors"
            >
              <span>{currentTier.ctaText}</span>
              <ArrowRight weight="bold" className="w-3.5 h-3.5" />
            </a>
            <span className="text-[11px] font-mono text-[#8C847B]">
              100% IP &bull; Fixed Scope
            </span>
          </div>
        </div>

        {/* Command Module 2: Live Engineering Telemetry & Discipline (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-[#1F1F23]/10 bg-white p-5 sm:p-7 shadow-[0_4px_24px_rgba(42,42,45,0.04)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1F1F23]/8">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#6E6862] flex items-center gap-1.5">
                <Gauge weight="bold" className="w-3.5 h-3.5 text-[#C76B50]" />
                Quality &amp; Speed Telemetry
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold border border-emerald-200">
                <Lightning weight="fill" className="w-3 h-3 text-emerald-600" />
                Lighthouse 100/100
              </span>
            </div>

            {/* Metrics Matrix */}
            <div className="space-y-3.5 mb-5">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F5] border border-[#1F1F23]/6">
                <div>
                  <p className="text-xs font-bold text-[#1F1F23] font-display">First Contentful Paint</p>
                  <p className="text-[11px] text-[#6E6862] font-body">Sub-second instant load</p>
                </div>
                <span className="text-xs font-mono font-bold text-[#C76B50]">0.3s FCP</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F5] border border-[#1F1F23]/6">
                <div>
                  <p className="text-xs font-bold text-[#1F1F23] font-display">Code &amp; Database Rights</p>
                  <p className="text-[11px] text-[#6E6862] font-body">Direct Git repo handover</p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700">100% Ownership</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F5] border border-[#1F1F23]/6">
                <div>
                  <p className="text-xs font-bold text-[#1F1F23] font-display">Engineering Communication</p>
                  <p className="text-[11px] text-[#6E6862] font-body">Direct senior developer</p>
                </div>
                <span className="text-xs font-mono font-bold text-[#1F1F23]">0 Middlemen</span>
              </div>
            </div>
          </div>

          {/* Direct Hotline Footer */}
          <div className="pt-4 border-t border-[#1F1F23]/8">
            <a
              href="https://wa.me/919822379976?text=Hi%20NextReach%20Studio%2C%20I%20want%20to%20consult%20directly%20with%20a%20senior%20developer%20on%20my%20architecture."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F0ECE4] text-[#1F1F23] hover:text-[#C76B50] border border-[#1F1F23]/10 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <WhatsappLogo weight="fill" className="w-4 h-4 text-emerald-600" />
              <span>Instant Developer WhatsApp Hotline</span>
              <ArrowRight weight="bold" className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
