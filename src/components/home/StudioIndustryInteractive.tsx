"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import {
  FirstAidKitIcon,
  ForkKnifeIcon,
  RocketLaunchIcon,
  BuildingsIcon,
  TruckIcon,
  ShoppingBagIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react";

const verticals = [
  {
    index: "01",
    sector: "Healthcare & Aesthetics",
    outcome: "Patient trust and seamless consultations",
    description: "Doctor profiles, appointment scheduling flows, and HIPAA-aware intake forms built for clinics and practitioners.",
    href: "/industries/healthcare",
    icon: FirstAidKitIcon,
    tag: "Medical & Dental",
    kpi: "Zero booking drop-off",
  },
  {
    index: "02",
    sector: "Fine Dining & Hospitality",
    outcome: "Sensory visual menus and instant tables",
    description: "Immersive culinary storytelling, blazing mobile menu speed, and automated WhatsApp reservation codes.",
    href: "/industries/restaurants",
    icon: ForkKnifeIcon,
    tag: "Dining & Cafes",
    kpi: "0.4s mobile menu speed",
  },
  {
    index: "03",
    sector: "Tech Startups & SaaS",
    outcome: "Investor-grade landing pages and MVPs",
    description: "Sub-second LCP for paid ad traffic, interactive product walkthroughs, and scalable full-stack web applications.",
    href: "/industries/saas-tech-startups-pune",
    icon: RocketLaunchIcon,
    tag: "Software & AI",
    kpi: "100/100 Core Web Vitals",
  },
  {
    index: "04",
    sector: "Real Estate & Architecture",
    outcome: "High-ticket portfolio showcases",
    description: "Ultra-crisp visual property tours, lead qualification funnels, and automated broker WhatsApp routing.",
    href: "/industries/real-estate",
    icon: BuildingsIcon,
    tag: "Estates & Architecture",
    kpi: "High-res instant preview",
  },
  {
    index: "05",
    sector: "Logistics & Supply Chain",
    outcome: "Live dispatch and client portals",
    description: "Fleet management interfaces, automated shipment tracking pipelines, and billing automation dashboards.",
    href: "/industries/logistics",
    icon: TruckIcon,
    tag: "Freight & Fleets",
    kpi: "Automated routing",
  },
  {
    index: "06",
    sector: "Retail & D2C Brands",
    outcome: "Fast storefronts and direct checkouts",
    description: "Catalog showcases, WhatsApp commerce integration, and instant conversion-focused checkouts.",
    href: "/industries/retail",
    icon: ShoppingBagIcon,
    tag: "Commerce & D2C",
    kpi: "Sub-second cart flow",
  },
];

export default function StudioIndustryInteractive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlightBg = useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, rgba(180, 84, 60, 0.08), transparent 80%)`;

  return (
    <section
      className="studio-industries studio-container studio-section"
      id="industries"
      aria-labelledby="industries-title"
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      <div className="studio-section-title">
        <div>
          <h2 id="industries-title">
            Built for your industry.<br />
            <span className="studio-muted">Engineered for your goals.</span>
          </h2>
        </div>
        <a href="/industries" className="studio-text-link">
          Explore all 9 sectors <ArrowUpRightIcon size={20} />
        </a>
      </div>

      <div className="studio-industry-interactive-grid">
        {/* Cursor Spotlight Layer */}
        <motion.div
          className="studio-spotlight-layer"
          style={{ background: spotlightBg }}
          aria-hidden="true"
        />

        {verticals.map((item) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={item.index}
              href={item.href}
              className="studio-industry-interactive-card group"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="studio-industry-top">
                <span className="studio-industry-index">{item.index}</span>
                <span className="studio-industry-tag">{item.tag}</span>
                <Icon size={26} weight="light" className="studio-industry-icon" />
              </div>

              <div className="studio-industry-content">
                <h3>{item.sector}</h3>
                <p className="studio-industry-outcome">{item.outcome}</p>
                <p className="studio-industry-desc">{item.description}</p>
              </div>

              <div className="studio-industry-kpi-badge">
                <span className="studio-live-dot" />
                <span>{item.kpi}</span>
              </div>

              <div className="studio-industry-footer">
                <span>View industry playbook</span>
                <span className="studio-industry-arrow" aria-hidden="true">
                  <ArrowUpRightIcon size={18} />
                </span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
