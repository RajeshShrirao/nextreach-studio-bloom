"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckIcon,
  XIcon,
  ClockIcon,
  UserCheckIcon,
  KeyIcon,
  LightningIcon,
  ReceiptIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react";

const factors = [
  {
    id: "timeline",
    name: "Launch Timeline",
    icon: ClockIcon,
    studio: {
      title: "1 to 3 Days Guaranteed",
      desc: "Fixed-scope websites launch in 72 hours with working live staging links from day one.",
      badge: "Sprint SLA",
    },
    agency: {
      title: "6 to 8 Weeks of Delays",
      desc: "Endless discovery meetings, bloated approval chains, and delayed launch dates.",
      badge: "Chronic Delays",
    },
  },
  {
    id: "team",
    name: "Who Builds Your Site",
    icon: UserCheckIcon,
    studio: {
      title: "Direct Senior Engineer Access",
      desc: "Direct communication with the principal developer and designer writing your code. Zero telephone game.",
      badge: "Senior Craft",
    },
    agency: {
      title: "Outsourced to Junior Interns",
      desc: "You talk to a non-technical account manager who passes tickets to offshore juniors.",
      badge: "Junior Hand-off",
    },
  },
  {
    id: "ownership",
    name: "Code & Asset Ownership",
    icon: KeyIcon,
    studio: {
      title: "100% Full IP Handover on Day 1",
      desc: "Complete Git repository access, DNS routing keys, and zero proprietary lock-in. Your site belongs to you.",
      badge: "Full Freedom",
    },
    agency: {
      title: "Proprietary Hostage Retainers",
      desc: "Locked into monthly retainer contracts. If you stop paying, your website goes down.",
      badge: "Lock-in Trap",
    },
  },
  {
    id: "speed",
    name: "Performance & Code Quality",
    icon: LightningIcon,
    studio: {
      title: "Sub-Second LCP & 100/100 Scores",
      desc: "Clean static HTML with zero third-party plugin bloat. Instant mobile response.",
      badge: "Sub-Second",
    },
    agency: {
      title: "45-Plugin Slow WordPress Setups",
      desc: "Sluggish templates with frequent plugin conflicts, security alerts, and 4-second load times.",
      badge: "Heavy Bloat",
    },
  },
  {
    id: "pricing",
    name: "Pricing & Scope Transparency",
    icon: ReceiptIcon,
    studio: {
      title: "Fixed-Price Scope Lock",
      desc: "Clear upfront quotes with zero surprise invoices, hidden hourly overages, or hosting markups.",
      badge: "Scope Locked",
    },
    agency: {
      title: "Vague Estimates & Surprise Overages",
      desc: "Low initial ballpark that doubles through out-of-scope change requests and hourly billing.",
      badge: "Hidden Costs",
    },
  },
];

export default function StudioComparisonInteractive() {
  const [activeFactor, setActiveFactor] = useState(factors[0].id);
  const current = factors.find((f) => f.id === activeFactor) || factors[0];

  return (
    <section className="studio-comparison studio-container studio-section" id="studio-standard" aria-labelledby="comparison-title">
      <div className="studio-section-title">
        <div>
          <h2 id="comparison-title">
            The studio standard.<br />
            <span className="studio-muted">No agency games.</span>
          </h2>
        </div>
        <a href="/contact" className="studio-text-link">
          Start a clean project <ArrowUpRightIcon size={20} />
        </a>
      </div>

      <div className="studio-comparison-interactive-wrap">
        {/* Factor Selector Navigation */}
        <div className="studio-factor-nav" role="tablist">
          {factors.map((factor) => {
            const isActive = activeFactor === factor.id;
            const Icon = factor.icon;
            return (
              <button
                key={factor.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFactor(factor.id)}
                className={`studio-factor-tab ${isActive ? "is-active" : ""}`}
              >
                <Icon size={18} weight={isActive ? "bold" : "light"} />
                <span>{factor.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="studio-factor-active"
                    className="studio-factor-indicator"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Comparison Cards */}
        <div className="studio-comparison-cards-grid">
          {/* NextReach Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`studio-${current.id}`}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="studio-side-card studio-card-nextreach"
            >
              <div className="studio-card-top-bar">
                <span className="studio-badge-accent">THE NEXTREACH STANDARD</span>
                <span className="studio-pill-tag">{current.studio.badge}</span>
              </div>
              <div className="studio-card-content">
                <div className="studio-card-icon-title">
                  <span className="studio-check-icon" aria-hidden="true">
                    <CheckIcon size={20} weight="bold" />
                  </span>
                  <h3>{current.studio.title}</h3>
                </div>
                <p className="studio-card-desc">{current.studio.desc}</p>
              </div>
              <div className="studio-card-footer">
                <span className="studio-footer-status">
                  <span className="studio-live-dot" /> Guaranteed on every project
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Legacy Agency Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`agency-${current.id}`}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="studio-side-card studio-card-agency"
            >
              <div className="studio-card-top-bar">
                <span className="studio-badge-muted">TYPICAL AGENCY TRAP</span>
                <span className="studio-pill-muted">{current.agency.badge}</span>
              </div>
              <div className="studio-card-content">
                <div className="studio-card-icon-title">
                  <span className="studio-x-icon" aria-hidden="true">
                    <XIcon size={20} weight="bold" />
                  </span>
                  <h3>{current.agency.title}</h3>
                </div>
                <p className="studio-card-desc">{current.agency.desc}</p>
              </div>
              <div className="studio-card-footer">
                <span className="studio-footer-alert">Common agency pain point</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
