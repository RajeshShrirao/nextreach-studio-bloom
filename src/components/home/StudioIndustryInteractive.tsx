"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import {
  FactoryIcon,
  TruckIcon,
  GraduationCapIcon,
  BuildingsIcon,
  FirstAidKitIcon,
  ShoppingBagIcon,
  ForkKnifeIcon,
  HardHatIcon,
  RocketLaunchIcon,
  DogIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react";

// Order and slugs mirror /industries so the two grids read as the same list. All ten
// industry pages exist; keeping them all here matters because the homepage is the
// strongest internal-link source on the site and an unlinked page will not rank.
//
// The `kpi` line is a description of what gets built, not a result we are claiming.
// Do not put a measured-sounding figure here — nothing on these cards has been measured.
const verticals = [
  {
    index: "01",
    sector: "Manufacturing",
    outcome: "Shop floor and office, on one system",
    description: "Production tracking, inventory and auto-reorder thresholds, digital inspection forms, and an order-to-delivery pipeline built around your actual workflows.",
    href: "/industries/manufacturing",
    icon: FactoryIcon,
    tag: "Production & ERP",
    kpi: "Custom, not a template",
  },
  {
    index: "02",
    sector: "Logistics & Supply Chain",
    outcome: "Live dispatch and client portals",
    description: "Fleet interfaces, shipment tracking pipelines, and billing automation dashboards that replace the spreadsheet-and-phone-call workflow.",
    href: "/industries/logistics",
    icon: TruckIcon,
    tag: "Freight & Fleets",
    kpi: "Automated dispatch",
  },
  {
    index: "03",
    sector: "Education & EdTech",
    outcome: "Portals for staff, students and parents",
    description: "Attendance, grades and fees in one place, plus admission platforms with document upload and automated merit lists.",
    href: "/industries/education",
    icon: GraduationCapIcon,
    tag: "Schools & EdTech",
    kpi: "Admissions online",
  },
  {
    index: "04",
    sector: "Real Estate & Architecture",
    outcome: "High-ticket portfolio showcases",
    description: "Ultra-crisp property tours that stay sharp on a phone, lead qualification funnels, and automated broker routing.",
    href: "/industries/real-estate",
    icon: BuildingsIcon,
    tag: "Estates & Architecture",
    kpi: "Sharp on every screen",
  },
  {
    index: "05",
    sector: "Healthcare & Aesthetics",
    outcome: "Booking without the phone call",
    description: "Practitioner profiles, appointment scheduling, and intake forms that respect patient privacy — for clinics, dentists and practitioners.",
    href: "/industries/healthcare",
    icon: FirstAidKitIcon,
    tag: "Medical & Dental",
    kpi: "Booking flows that finish",
  },
  {
    index: "06",
    sector: "Retail & D2C Brands",
    outcome: "Catalog to checkout, without friction",
    description: "Catalog showcases, WhatsApp commerce, and conversion-focused checkouts that stay fast as the product list grows.",
    href: "/industries/retail",
    icon: ShoppingBagIcon,
    tag: "Commerce & D2C",
    kpi: "Built to sell",
  },
  {
    index: "07",
    sector: "Restaurants & Hospitality",
    outcome: "A menu that opens instantly",
    description: "Culinary storytelling, menus that load on congested mobile networks, and reservation flows that hand off to WhatsApp.",
    href: "/industries/restaurants",
    icon: ForkKnifeIcon,
    tag: "Dining & Cafes",
    kpi: "Mobile-first menus",
  },
  {
    index: "08",
    sector: "Construction & Contracting",
    outcome: "Project tracking that works on-site",
    description: "Milestone and budget visibility, material and procurement tracking, workforce attendance, and client portals with site photo updates.",
    href: "/industries/construction",
    icon: HardHatIcon,
    tag: "Builders & Contractors",
    kpi: "Built for site conditions",
  },
  {
    index: "09",
    sector: "Tech Startups & SaaS",
    outcome: "Investor-grade pages and MVPs",
    description: "Fast landing pages for paid ad traffic, interactive product walkthroughs, and scalable full-stack applications.",
    href: "/industries/saas-tech-startups-pune",
    icon: RocketLaunchIcon,
    tag: "Software & AI",
    kpi: "Ad traffic ready",
  },
  {
    index: "10",
    sector: "Pet Grooming & Veterinary",
    outcome: "Bookings, reminders and pet records",
    description: "Online booking with automated reminders, pet profiles carrying medical history and grooming notes, and WhatsApp follow-ups.",
    href: "/industries/pet-grooming",
    icon: DogIcon,
    tag: "Pet Care & Vets",
    kpi: "Fewer no-shows",
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
          Explore all 10 sectors <ArrowUpRightIcon size={20} />
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
