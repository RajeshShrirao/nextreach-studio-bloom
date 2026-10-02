"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface CapabilityTab {
  id: string;
  label: string;
  badge: string;
  title: string;
  description: string;
  deliverables: string[];
  ctaLabel: string;
  ctaHref: string;
}

const capabilityTabs: CapabilityTab[] = [
  {
    id: "websites",
    label: "Website Sprints",
    badge: "24-72h Delivery",
    title: "High-Performance Websites & Digital Flagships",
    description: "Bespoke custom design engineered for conversions, SEO dominance, and sub-second mobile speed. Fixed-scope packages starting at ₹5,000.",
    deliverables: [
      "100% Mobile-First Architecture",
      "Sub-Second Core Web Vitals",
      "WhatsApp Concierge Routing",
      "Full Source Code & IP Handover",
    ],
    ctaLabel: "View Website Packages (₹5k+)",
    ctaHref: "#packages",
  },
  {
    id: "web-apps",
    label: "Web Apps & SaaS",
    badge: "2-4 Week Sprints",
    title: "Custom Web Applications & Multi-Tenant Portals",
    description: "Multi-tenant platforms, internal business dashboards, and subscription SaaS products built with modern full-stack frameworks.",
    deliverables: [
      "Role-Based Authentication",
      "Stripe & Razorpay Billing",
      "PostgreSQL & REST/GraphQL APIs",
      "Automated Cloud Deployment",
    ],
    ctaLabel: "Explore Web App Services",
    ctaHref: "/services/web-application-development-pune",
  },
  {
    id: "ai-agents",
    label: "AI Agents & Flow",
    badge: "Autonomous Systems",
    title: "Autonomous AI Agents & Operational Workflows",
    description: "Custom AI agents for customer support, lead qualification, and multi-system data flows using OpenAI, Claude, Gemini, and MCP.",
    deliverables: [
      "Multi-Agent Orchestration",
      "CRM & WhatsApp Integration",
      "Document Processing Pipelines",
      "Secure Private Deployments",
    ],
    ctaLabel: "Explore AI Agent Solutions",
    ctaHref: "/services/ai-agent-development-pune",
  },
];

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<string>("websites");
  const currentTab = capabilityTabs.find((t) => t.id === activeTab) || capabilityTabs[0];

  return (
    <section className="relative pt-24 pb-14 sm:pt-32 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Studio Editorial Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-xs font-mono font-bold uppercase tracking-[0.24em] text-[#C76B50] mb-3 sm:mb-4"
        >
          Senior-Engineered Digital Studio &middot; Pune
        </motion.p>

        {/* Master Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-3xl sm:text-5xl lg:text-[3.75rem] font-display font-bold text-[#1F1F23] tracking-[-0.03em] leading-[1.1] mb-5 max-w-3xl text-balance"
        >
          Custom Websites &amp; Web Platforms
          <br />
          <span className="text-[#C76B50]">
            built for revenue, shipped in days.
          </span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-sm sm:text-base lg:text-lg text-[#6E6862] leading-relaxed max-w-2xl font-body mb-8"
        >
          We engineer bespoke websites, SaaS web applications, and autonomous AI workflows with fixed-scope sprint pricing. Direct senior developer access. No agency overhead.
        </motion.p>

        {/* Primary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mb-10"
        >
          <a
            href="#packages"
            className="w-full sm:w-auto min-h-[46px] px-6 py-3 rounded-xl bg-[#C76B50] hover:bg-[#D97A5E] text-white font-display font-semibold text-sm shadow-[0_4px_16px_rgba(199,107,80,0.22)] transition-all duration-200 inline-flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>View Website Packages (₹5k+)</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <a
            href="https://wa.me/919822379976?text=Hi%20NextReach%20Studio%2C%20I'm%20interested%20in%20launching%20a%20project%20for%20my%20business."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-[46px] px-5 py-3 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#1F1F23] hover:text-[#C76B50] border border-[#1F1F23]/12 shadow-sm transition-all duration-200 inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-mono font-semibold hover:-translate-y-0.5 active:translate-y-0"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-600">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.99.54 1.787.876 2.796.877 3.177 0 5.764-2.587 5.765-5.766.001-3.181-2.585-5.764-5.765-5.764zm0-2c4.28 0 7.765 3.483 7.765 7.764 0 4.281-3.485 7.766-7.765 7.766-.001 0-.001 0 0 0-1.298 0-2.434-.336-3.466-.948l-4.565 1.196 1.218-4.453c-.696-1.107-1.077-2.313-1.077-3.561 0-4.281 3.484-7.764 7.765-7.764zm-2.031 6.586c-.167-.367-.344-.374-.504-.381-.131-.006-.281-.006-.431-.006s-.394.056-.6.281c-.206.225-.788.769-.788 1.875s.806 2.175.919 2.325c.112.15 1.556 2.493 3.844 3.403 1.902.756 2.288.606 2.7.568.413-.037 1.331-.544 1.519-1.069.188-.525.188-.975.131-1.069-.056-.094-.206-.15-.431-.263s-1.331-.656-1.538-.731-.356-.113-.506.113c-.15.225-.581.731-.712.881-.131.15-.262.169-.488.056-.225-.113-.949-.35-1.808-1.115-.668-.596-1.119-1.332-1.25-1.557s-.014-.347.098-.459c.101-.101.225-.262.338-.394s.15-.225.225-.375c.075-.15.038-.281-.019-.394s-.504-1.259-.701-1.69z"/>
            </svg>
            <span>Chat on WhatsApp</span>
          </a>
        </motion.div>

        {/* Tactile Creamy Capability Deck */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-3xl rounded-2xl border border-[#1F1F23]/10 bg-white p-5 sm:p-7 shadow-[0_4px_24px_rgba(42,42,45,0.04)] text-left"
        >
          {/* Tab Selector Row */}
          <div className="flex flex-wrap items-center gap-2 pb-4 mb-4 border-b border-[#1F1F23]/8">
            {capabilityTabs.map((tab) => {
              const isSelected = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "bg-[#C76B50] text-white shadow-sm"
                      : "bg-[#FAF8F5] text-[#4A4844] hover:bg-[#F0ECE4] hover:text-[#1F1F23]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
            <span className="ml-auto hidden sm:inline-block text-xs font-mono font-semibold text-[#C76B50]">
              {currentTab.badge}
            </span>
          </div>

          {/* Active Tab Content Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <h3 className="text-base sm:text-lg font-display font-bold text-[#1F1F23] mb-1.5">
                {currentTab.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6862] leading-relaxed font-body mb-4">
                {currentTab.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                {currentTab.deliverables.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs sm:text-sm text-[#4A4844] font-body">
                    <span className="text-[#C76B50] font-bold text-xs shrink-0">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#1F1F23]/8">
                <a
                  href={currentTab.ctaHref}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#C76B50] hover:text-[#D97A5E] transition-colors"
                >
                  <span>{currentTab.ctaLabel}</span>
                  <span>&rarr;</span>
                </a>
                <span className="text-xs font-mono text-[#6E6862]">
                  Fixed Milestones &bull; No Retainers
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Concrete Trust Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.45 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-10 pt-8 border-t border-[#1F1F23]/8 w-full max-w-3xl text-center"
        >
          <div>
            <p className="text-xl sm:text-2xl font-display font-bold text-[#1F1F23]">24-72h</p>
            <p className="text-[11px] font-mono text-[#6E6862] uppercase tracking-wider mt-0.5">Sprint Turnaround</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-display font-bold text-[#C76B50]">₹5,000+</p>
            <p className="text-[11px] font-mono text-[#6E6862] uppercase tracking-wider mt-0.5">Fixed Scopes</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-display font-bold text-[#1F1F23]">100%</p>
            <p className="text-[11px] font-mono text-[#6E6862] uppercase tracking-wider mt-0.5">Code &amp; IP Rights</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-display font-bold text-[#1F1F23]">Direct</p>
            <p className="text-[11px] font-mono text-[#6E6862] uppercase tracking-wider mt-0.5">Senior Engineers</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
