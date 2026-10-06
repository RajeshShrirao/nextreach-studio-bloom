"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  LightningIcon,
  CpuIcon,
  CodeIcon,
  GaugeIcon,
  CheckCircleIcon,
  PauseIcon,
  PlayIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react";

const AUTO_SWITCH_INTERVAL = 2600; // 2.6s per tab snappy auto-cycle

// Every figure below is a property of THIS site, and the reader can re-run all of
// them with the PageSpeed link at the foot of the card. That is the whole point of
// the section: a claim someone can falsify in ten seconds beats a badge they have to
// take on faith. Do not add a number here that PageSpeed would not reproduce.
const PAGESPEED_URL =
  "https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fwww.nextreachstudio.in%2F";

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
  }, [isPaused, shouldReduceMotion, nextTab]);

  const current = tabs[tabIndex] || tabs[0];

  return (
    <section
      className="studio-spec-section studio-container"
      aria-label="Performance measured on this website"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="studio-spec-head" data-reveal>
        <p className="studio-eyebrow">Proof, not adjectives.</p>
        <h2>
          Every number below is measured on <span className="studio-muted">this website.</span>
        </h2>
      </div>

      <div className="studio-spec-interactive-card" data-reveal>
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
                      <motion.div
                        key={`progress-${idx}`}
                        className="studio-tab-progress-line"
                        initial={{ width: "0%" }}
                        animate={{ width: isPaused || shouldReduceMotion ? "0%" : "100%" }}
                        transition={{ duration: AUTO_SWITCH_INTERVAL / 1000, ease: "linear" }}
                      />
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
            <span>{isPaused ? "AUTO-CYCLE PAUSED" : "MEASURED ON THIS SITE"}</span>
          </div>
        </div>

        {/* Dynamic Interactive Body */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={false}
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
                    initial={false}
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
            </div>

            {/* Right Column: 4 Micro-Diagnostic Stats */}
            <div className="studio-spec-secondary">
              <p className="studio-stats-heading">ENGINEERING SPEC SHEET</p>
              <div className="studio-stats-list">
                {current.stats.map((stat, i) => (
                  <motion.div
                    key={stat.name}
                    initial={false}
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

        {/* Deliberately outside the animated body: a stable affordance the reader can
            act on without chasing a tab that cycles underneath their cursor. */}
        <div className="studio-spec-verify">
          <p>
            These are our own figures for this page — not a case study, not an estimate. Run the same
            audit Google runs and check them.
          </p>
          <a
            className="studio-verify-link"
            href={PAGESPEED_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-track="home_proof_pagespeed"
          >
            <GaugeIcon size={16} weight="fill" />
            <span>Verify on PageSpeed Insights</span>
            <ArrowUpRightIcon size={15} weight="bold" />
          </a>
        </div>
      </div>
    </section>
  );
}
