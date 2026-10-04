"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  LightningIcon,
  CpuIcon,
  CodeIcon,
  ShieldCheckIcon,
  GaugeIcon,
  CheckCircleIcon,
  PauseIcon,
  PlayIcon,
} from "@phosphor-icons/react";

const AUTO_SWITCH_INTERVAL = 2600; // 2.6s per tab snappy auto-cycle

const tabs = [
  {
    id: "speed",
    label: "Speed Diagnostic",
    icon: LightningIcon,
    metric: "0.64s",
    metricLabel: "Largest Contentful Paint (LCP)",
    score: 100,
    scoreLabel: "Google Core Web Vitals",
    badge: "Sub-Second Global Edge",
    description:
      "Engineered on Astro 6 with zero client-side JavaScript bloat. Pages load instantaneously even on congested mobile 4G networks.",
    stats: [
      { name: "Time to First Byte (TTFB)", value: "85ms", status: "Optimal" },
      { name: "Cumulative Layout Shift (CLS)", value: "0.00", status: "Perfect" },
      { name: "Total Blocking Time (TBT)", value: "0ms", status: "Instant" },
      { name: "Total Bundle Size", value: "38 KB", status: "Ultra-light" },
    ],
    comparison: {
      nextreach: { label: "NextReach Studio", value: "38 KB", percent: 6 },
      legacy: { label: "Typical WordPress Agency Site", value: "2.8 MB", percent: 100 },
    },
  },
  {
    id: "engine",
    label: "Static Architecture",
    icon: CpuIcon,
    metric: "0kb",
    metricLabel: "Unnecessary JS Hydration",
    score: 99,
    scoreLabel: "Best Practices Audit",
    badge: "Astro 6 + React 19 Islands",
    description:
      "Interactive components are isolated into lightweight client islands. The rest of your site renders as pure, lightning-fast static HTML.",
    stats: [
      { name: "Serverless Edge Caching", value: "Global Vercel/Cloudflare", status: "Active" },
      { name: "Image Optimization", value: "Automated WebP/AVIF", status: "Active" },
      { name: "CSS Architecture", value: "Tailwind CSS v4 (Zero runtime)", status: "Active" },
      { name: "Mobile Viewport Calibration", value: "iOS Safari & Android Tested", status: "Active" },
    ],
    comparison: {
      nextreach: { label: "NextReach (Static Islands)", value: "0.2s Render", percent: 8 },
      legacy: { label: "Monolithic CMS (40+ Plugins)", value: "3.4s Render", percent: 92 },
    },
  },
  {
    id: "integrity",
    label: "Code & Standards",
    icon: CodeIcon,
    metric: "100%",
    metricLabel: "Type-Safe Codebase",
    score: 100,
    scoreLabel: "Accessibility (WCAG AA)",
    badge: "TypeScript & Semantic HTML",
    description:
      "Every component is structured with semantic markup, ARIA labels, and strict TypeScript types to ensure lifetime maintainability.",
    stats: [
      { name: "Structured Schema", value: "JSON-LD Rich Snippets", status: "Included" },
      { name: "OpenGraph Metadata", value: "Custom Social Preview Cards", status: "Included" },
      { name: "Accessibility Contrast", value: "WCAG 2.1 AA Compliant", status: "Passed" },
      { name: "Sitemap & Robots", value: "Automated XML Generator", status: "Included" },
    ],
    comparison: {
      nextreach: { label: "Clean Modular Components", value: "100% Maintainable", percent: 100 },
      legacy: { label: "Unmaintainable Page Builder Bloat", value: "Fragmented Code", percent: 25 },
    },
  },
  {
    id: "ownership",
    label: "100% IP Handover",
    icon: ShieldCheckIcon,
    metric: "Day 1",
    metricLabel: "Full Git Rights & Keys",
    score: 100,
    scoreLabel: "Client Ownership Index",
    badge: "Zero Vendor Lock-in",
    description:
      "You receive the complete Git repository, raw design assets, and DNS keys upon launch. No hostage hosting, no monthly retainer traps.",
    stats: [
      { name: "Source Code Transfer", value: "GitHub / GitLab Repository", status: "Full Rights" },
      { name: "Domain & DNS Routing", value: "Your Cloudflare / Namecheap Account", status: "Your Control" },
      { name: "Zero Retainer Hostage", value: "Host anywhere, pay ₹0 forced fees", status: "Guaranteed" },
      { name: "Post-Launch Warranty", value: "30-Day Zero-Downtime Guarantee", status: "Included" },
    ],
    comparison: {
      nextreach: { label: "Full Ownership & Independence", value: "Your Assets", percent: 100 },
      legacy: { label: "Proprietary Hostage Retainers", value: "Locked In", percent: 20 },
    },
  },
];

export default function StudioSpecInteractive() {
  const [tabIndex, setTabIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextTab = useCallback(() => {
    setTabIndex((prev) => (prev + 1) % tabs.length);
  }, []);

  // Auto-switching effect
  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;

    timerRef.current = setInterval(nextTab, AUTO_SWITCH_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, shouldReduceMotion, nextTab, tabIndex]);

  const current = tabs[tabIndex] || tabs[0];

  return (
    <section
      className="studio-spec-section studio-container"
      aria-label="Interactive Studio Benchmarks"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="studio-spec-interactive-card">
        {/* Header Navigation Tabs with Auto-Progress */}
        <div className="studio-spec-tabs-header">
          <div className="studio-spec-tabs-list" role="tablist">
            {tabs.map((tab, idx) => {
              const isActive = tabIndex === idx;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setTabIndex(idx)}
                  className={`studio-spec-tab-btn ${isActive ? "is-active" : ""}`}
                >
                  <Icon size={18} weight={isActive ? "bold" : "light"} />
                  <span>{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="studio-spec-tab-pill"
                      className="studio-spec-tab-indicator"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    >
                      {/* Linear Auto-Switch Progress Bar */}
                      {!isPaused && !shouldReduceMotion && (
                        <motion.div
                          key={`progress-${idx}`}
                          className="studio-tab-progress-line"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: AUTO_SWITCH_INTERVAL / 1000, ease: "linear" }}
                        />
                      )}
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="studio-spec-live-badge">
            <button
              type="button"
              className="studio-marquee-pause-btn"
              onClick={() => setIsPaused((prev) => !prev)}
              title={isPaused ? "Resume auto-switching" : "Pause auto-switching"}
              aria-label={isPaused ? "Resume auto-switching" : "Pause auto-switching"}
            >
              {isPaused ? <PlayIcon size={13} weight="bold" /> : <PauseIcon size={13} weight="bold" />}
            </button>
            <span className={`studio-live-dot ${isPaused ? "is-paused-dot" : ""}`} aria-hidden="true" />
            <span>{isPaused ? "AUTO-CYCLE PAUSED" : "LIVE AUDIT BENCHMARK"}</span>
          </div>
        </div>

        {/* Dynamic Interactive Body */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="studio-spec-content-grid"
          >
            {/* Left Column: Big Visual Metric & Description */}
            <div className="studio-spec-primary">
              <div className="studio-spec-badge-row">
                <span className="studio-spec-pill">{current.badge}</span>
                <div className="studio-spec-score-pill">
                  <GaugeIcon size={16} weight="fill" />
                  <span>{current.score}/100 Score</span>
                </div>
              </div>

              <div className="studio-spec-hero-metric">
                <div className="studio-spec-huge-number">
                  <motion.span
                    key={current.metric}
                    initial={{ scale: 0.94, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  >
                    {current.metric}
                  </motion.span>
                </div>
                <div className="studio-spec-huge-label">
                  <p className="studio-metric-subtitle">{current.metricLabel}</p>
                  <p className="studio-metric-score-detail">{current.scoreLabel}</p>
                </div>
              </div>

              <p className="studio-spec-description">{current.description}</p>

              {/* Visual Bundle / Payload Comparison Bar */}
              <div className="studio-spec-compare-bar">
                <div className="studio-compare-labels">
                  <span className="studio-compare-title">Payload Efficiency Benchmark</span>
                  <span className="studio-compare-diff">98% Lighter</span>
                </div>
                <div className="studio-compare-tracks">
                  <div className="studio-track-row">
                    <span className="studio-track-name">{current.comparison.nextreach.label}</span>
                    <div className="studio-track-rail">
                      <motion.div
                        className="studio-track-fill studio-fill-accent"
                        initial={{ width: 0 }}
                        animate={{ width: `${current.comparison.nextreach.percent}%` }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                    </div>
                    <span className="studio-track-val studio-accent">{current.comparison.nextreach.value}</span>
                  </div>
                  <div className="studio-track-row">
                    <span className="studio-track-name">{current.comparison.legacy.label}</span>
                    <div className="studio-track-rail">
                      <motion.div
                        className="studio-track-fill studio-fill-muted"
                        initial={{ width: 0 }}
                        animate={{ width: `${current.comparison.legacy.percent}%` }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                    </div>
                    <span className="studio-track-val studio-muted">{current.comparison.legacy.value}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 4 Micro-Diagnostic Stats */}
            <div className="studio-spec-secondary">
              <h4 className="studio-stats-heading">ENGINEERING SPEC SHEET</h4>
              <div className="studio-stats-list">
                {current.stats.map((stat, i) => (
                  <motion.div
                    key={stat.name}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 + 0.05, duration: 0.18 }}
                    className="studio-stat-row"
                  >
                    <div className="studio-stat-info">
                      <span className="studio-stat-name">{stat.name}</span>
                      <span className="studio-stat-val">{stat.value}</span>
                    </div>
                    <span className="studio-stat-badge">
                      <CheckCircleIcon size={14} weight="fill" />
                      <span>{stat.status}</span>
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
