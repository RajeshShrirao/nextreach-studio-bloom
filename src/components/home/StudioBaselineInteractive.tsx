"use client";

import { motion } from "motion/react";
import {
  KeyIcon,
  LightningIcon,
  MagnifyingGlassIcon,
  DeviceMobileIcon,
  ChatCircleDotsIcon,
  ShieldCheckIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react";

const inclusions = [
  {
    index: "01",
    title: "100% Code & Asset Handover",
    spec: "Full Git Rights",
    description: "Complete Git repository access, design files, and DNS keys. You own every line of code on day one with zero vendor lock-in.",
    icon: KeyIcon,
  },
  {
    index: "02",
    title: "Sub-Second Speed Calibration",
    spec: "100/100 Core Web Vitals",
    description: "Engineered on modern static architecture to score 100/100 on Google Core Web Vitals with instant mobile rendering.",
    icon: LightningIcon,
  },
  {
    index: "03",
    title: "Technical Schema & Rich SEO",
    spec: "JSON-LD & OpenGraph",
    description: "JSON-LD structured metadata, OpenGraph social cards, XML sitemaps, and robots configuration configured for search engines.",
    icon: MagnifyingGlassIcon,
  },
  {
    index: "04",
    title: "Cross-Device Viewport Tuning",
    spec: "Pixel-Perfect Audits",
    description: "Pixel-perfect responsiveness audited across mobile devices, tablets, laptops, and ultra-wide desktop viewports.",
    icon: DeviceMobileIcon,
  },
  {
    index: "05",
    title: "WhatsApp & Lead Capture Routing",
    spec: "1-Tap Direct Inquiries",
    description: "Custom click-to-chat inquiry flows, contact forms, and lead qualification endpoints wired directly to your team.",
    icon: ChatCircleDotsIcon,
  },
  {
    index: "06",
    title: "30-Day Zero-Downtime Guarantee",
    spec: "Full Bug Warranty",
    description: "Post-launch warranty covering any technical bugs, hosting configurations, and deployment assurances.",
    icon: ShieldCheckIcon,
  },
];

export default function StudioBaselineInteractive() {
  return (
    <section className="studio-baseline studio-container studio-section" id="guarantees" aria-labelledby="baseline-title">
      <div className="studio-section-title">
        <div>
          <h2 id="baseline-title">
            The studio baseline.<br />
            <span className="studio-muted">Standard on every build.</span>
          </h2>
        </div>
        <a href="/about" className="studio-text-link">
          Our engineering standards <ArrowUpRightIcon size={20} />
        </a>
      </div>

      <div className="studio-baseline-interactive-grid">
        {inclusions.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.index}
              className="studio-baseline-interactive-card"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <div className="studio-baseline-card-top">
                <span className="studio-baseline-index">{item.index}</span>
                <span className="studio-baseline-spec-tag">{item.spec}</span>
                <motion.div
                  className="studio-baseline-icon-wrap"
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <Icon size={24} weight="light" className="studio-baseline-icon" />
                </motion.div>
              </div>
              <div className="studio-baseline-card-body">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
