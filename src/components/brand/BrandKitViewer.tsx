import React, { useState } from "react";

interface BrandAsset {
  id: string;
  name: string;
  category: "logo" | "mark" | "monochrome" | "app" | "social" | "guidelines";
  description: string;
  src: string;
  dimensions: string;
  recommendedBackground: "light" | "dark" | "any";
  svgCode?: string;
  format: "SVG Vector" | "JPG Master Board" | "Markdown Copy";
  isVector: boolean;
}

const BRAND_ASSETS: BrandAsset[] = [
  // --- CORE LOGOS & LOCKUPS ---
  {
    id: "primary-horizontal-light",
    name: "Primary Horizontal Logo (Light Canvas)",
    category: "logo",
    description: "Official full lockup for light and cream backgrounds with Charcoal 'NextReach' and Terracotta 'Studio'.",
    src: "/brand/logo-horizontal.svg",
    dimensions: "360 × 64 px (Scalable Vector)",
    recommendedBackground: "light",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "primary-horizontal-dark",
    name: "Primary Horizontal Logo (Dark Canvas)",
    category: "logo",
    description: "Official full lockup for dark surfaces, hero sections, and dark-mode UI with Crisp White wordmark.",
    src: "/brand/logo-horizontal-dark.svg",
    dimensions: "360 × 64 px (Scalable Vector)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "primary-stacked-light",
    name: "Stacked Vertical Logo (Light Canvas)",
    category: "logo",
    description: "Centered emblem above bold NextReach brand name with tracked STUDIO subtitle for square/vertical layouts.",
    src: "/brand/logo-stacked.svg",
    dimensions: "240 × 200 px (Scalable Vector)",
    recommendedBackground: "light",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "primary-stacked-dark",
    name: "Stacked Vertical Logo (Dark Canvas)",
    category: "logo",
    description: "Vertical lockup inverted for dark substrates, merchandise, packaging, and high-impact presentation decks.",
    src: "/brand/logo-stacked-dark.svg",
    dimensions: "240 × 200 px (Scalable Vector)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },

  // --- STANDALONE MARKS ---
  {
    id: "standalone-mark-terracotta",
    name: "Standalone Emblem Mark (Terracotta)",
    category: "mark",
    description: "The core architectural geometric monogram fusing the Upward Arrow (Reach) with letters 'N' and 'R'.",
    src: "/brand/logo-mark.svg",
    dimensions: "120 × 150 px (Scalable Vector)",
    recommendedBackground: "any",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "standalone-mark-white",
    name: "Standalone Emblem Mark (Crisp White)",
    category: "mark",
    description: "White stroke variant of the emblem mark for dark photographs, solid color backgrounds, and laser etching.",
    src: "/brand/logo-mark-white.svg",
    dimensions: "120 × 150 px (Scalable Vector)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "standalone-mark-black",
    name: "Standalone Emblem Mark (Charcoal / Black)",
    category: "mark",
    description: "Charcoal single-color stroke variant for print documents, newspaper, receipts, and technical blueprints.",
    src: "/brand/logo-mark-black.svg",
    dimensions: "120 × 150 px (Scalable Vector)",
    recommendedBackground: "light",
    format: "SVG Vector",
    isVector: true,
  },

  // --- APP & PROFILE ICONS ---
  {
    id: "app-icon-squircle-dark",
    name: "Master App & Profile Icon (512x512 Dark)",
    category: "app",
    description: "Flagship dark squircle icon with subtle terracotta rim border and ambient radial glow for Twitter, GitHub, and mobile apps.",
    src: "/brand/app-icon.svg",
    dimensions: "512 × 512 px (Squircle Vector)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "app-icon-squircle-cream",
    name: "Cream App & Profile Icon (512x512 Light)",
    category: "app",
    description: "Light surface squircle avatar with warm cream gradient and terracotta perimeter for light mode app launchers.",
    src: "/brand/app-icon-cream.svg",
    dimensions: "512 × 512 px (Squircle Vector)",
    recommendedBackground: "light",
    format: "SVG Vector",
    isVector: true,
  },

  // --- SOCIAL MEDIA KIT ---
  {
    id: "social-ig-profile",
    name: "Instagram Profile Picture (1:1 Circle Safe)",
    category: "social",
    description: "High-contrast dark profile avatar with ambient terracotta glow and circular mask safe padding.",
    src: "/brand/social/instagram-profile.svg",
    dimensions: "1080 × 1080 px (1:1)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "social-li-profile",
    name: "LinkedIn Company Logo (1:1)",
    category: "social",
    description: "B2B company avatar optimized for both desktop square tiles and mobile circular search results.",
    src: "/brand/social/linkedin-profile.svg",
    dimensions: "400 × 400 px (1:1)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "social-li-banner",
    name: "LinkedIn Company Banner Header",
    category: "social",
    description: "Wide desktop & mobile safe banner with tagline, engineering stack chips, and terminal graphic.",
    src: "/brand/social/linkedin-banner.svg",
    dimensions: "1584 × 396 px (Banner)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "social-wa-profile",
    name: "WhatsApp Business Profile Avatar",
    category: "social",
    description: "High-contrast mobile avatar with terracotta rim border for instant recognition in WhatsApp chat lists.",
    src: "/brand/social/whatsapp-profile.svg",
    dimensions: "640 × 640 px (1:1)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "social-post-feature",
    name: "Instagram Feed Post — Feature Sprint (4:5)",
    category: "social",
    description: "Portrait feed template for new service releases, code frameworks, and pricing announcements.",
    src: "/brand/social/instagram-post-feature.svg",
    dimensions: "1080 × 1350 px (4:5)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "social-post-metric",
    name: "Instagram Feed Post — Client Metric & Case Study (4:5)",
    category: "social",
    description: "High-impact stat callout card: 14-Day Delivery, 10x Lead Volume, and 5-star client proof.",
    src: "/brand/social/instagram-post-metric.svg",
    dimensions: "1080 × 1350 px (4:5)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "social-post-quote",
    name: "Instagram Feed Post — Editorial Tech Quote (4:5)",
    category: "social",
    description: "Warm cream editorial layout for engineering principles, founder insights, and thought leadership.",
    src: "/brand/social/instagram-post-quote.svg",
    dimensions: "1080 × 1350 px (4:5)",
    recommendedBackground: "light",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "social-reel-cover",
    name: "Instagram Reel Cover (9:16 with 1:1 Safe Zone)",
    category: "social",
    description: "Full-screen vertical cover with centered safe-zone framing for clean profile grid display.",
    src: "/brand/social/instagram-reel-cover.svg",
    dimensions: "1080 × 1920 px (9:16)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "social-story-launch",
    name: "Instagram Story — Sprint Launch (9:16)",
    category: "social",
    description: "Story announcement card with link sticker placeholder and Core Web Vitals metric callout.",
    src: "/brand/social/instagram-story-launch.svg",
    dimensions: "1080 × 1920 px (9:16)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "social-story-poll",
    name: "Instagram Story — Interactive Poll / Q&A (9:16)",
    category: "social",
    description: "Framed engagement template ready for native Instagram poll stickers and question boxes.",
    src: "/brand/social/instagram-story-poll.svg",
    dimensions: "1080 × 1920 px (9:16)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "social-story-review",
    name: "Instagram Story — 5-Star Client Review (9:16)",
    category: "social",
    description: "5-star testimonial card showcasing verified client ROI and direct sprint booking CTA.",
    src: "/brand/social/instagram-story-review.svg",
    dimensions: "1080 × 1920 px (9:16)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "social-carousel-s1",
    name: "Instagram Carousel — Slide 1 (Hook Cover)",
    category: "social",
    description: "Hook slide: 'Why 90% of Business Websites Fail to Generate Leads in Pune' with swipe cue.",
    src: "/brand/social/instagram-carousel-slide1.svg",
    dimensions: "1080 × 1350 px (4:5)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "social-carousel-s2",
    name: "Instagram Carousel — Slide 2 (The Bottlenecks)",
    category: "social",
    description: "3 fatal failure points of slow templates, missing WhatsApp CTAs, and cold lead pipelines.",
    src: "/brand/social/instagram-carousel-slide2.svg",
    dimensions: "1080 × 1350 px (4:5)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "social-carousel-s3",
    name: "Instagram Carousel — Slide 3 (The Solution)",
    category: "social",
    description: "The 3 engineering upgrades: Sub-second Astro engine, WhatsApp pipelines, and 24/7 AI agents.",
    src: "/brand/social/instagram-carousel-slide3.svg",
    dimensions: "1080 × 1350 px (4:5)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "social-carousel-s4",
    name: "Instagram Carousel — Slide 4 (Live Case Study)",
    category: "social",
    description: "Before vs. After metric comparison on the Saffron & Smoke culinary flagship.",
    src: "/brand/social/instagram-carousel-slide4.svg",
    dimensions: "1080 × 1350 px (4:5)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "social-carousel-s5",
    name: "Instagram Carousel — Slide 5 (Pricing & CTA)",
    category: "social",
    description: "Direct action slide featuring ₹5k–₹50k packages and WhatsApp chat button.",
    src: "/brand/social/instagram-carousel-slide5.svg",
    dimensions: "1080 × 1350 px (4:5)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "social-hl-services",
    name: "Story Highlight Cover — Services",
    category: "social",
    description: "Minimalist glowing vector highlight cover for core engineering services.",
    src: "/brand/social/highlight-services.svg",
    dimensions: "1080 × 1920 px (Icon)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "social-hl-ai",
    name: "Story Highlight Cover — AI Agents",
    category: "social",
    description: "Minimalist glowing vector highlight cover for autonomous AI agent workflows.",
    src: "/brand/social/highlight-ai-agents.svg",
    dimensions: "1080 × 1920 px (Icon)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "social-hl-web",
    name: "Story Highlight Cover — Websites",
    category: "social",
    description: "Minimalist glowing vector highlight cover for custom web applications.",
    src: "/brand/social/highlight-websites.svg",
    dimensions: "1080 × 1920 px (Icon)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "social-hl-cases",
    name: "Story Highlight Cover — Case Studies",
    category: "social",
    description: "Minimalist glowing vector highlight cover for client ROI metrics & case studies.",
    src: "/brand/social/highlight-case-studies.svg",
    dimensions: "1080 × 1920 px (Icon)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "social-hl-pricing",
    name: "Story Highlight Cover — Pricing",
    category: "social",
    description: "Minimalist glowing vector highlight cover for website sprint packages.",
    src: "/brand/social/highlight-pricing.svg",
    dimensions: "1080 × 1920 px (Icon)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "social-hl-about",
    name: "Story Highlight Cover — About Us",
    category: "social",
    description: "Featuring the authentic vertical NextReach emblem mark.",
    src: "/brand/social/highlight-about.svg",
    dimensions: "1080 × 1920 px (Icon)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "social-wa-cat-quick",
    name: "WhatsApp Catalog Card — Quick Launch Website (₹5,000)",
    category: "social",
    description: "1080x1080 product card with feature breakdown, ₹5k price tag, and 3-day turnaround SLA.",
    src: "/brand/social/whatsapp-catalog-quicklaunch.svg",
    dimensions: "1080 × 1080 px (1:1)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "social-wa-cat-growth",
    name: "WhatsApp Catalog Card — Business Growth Website (₹15,000)",
    category: "social",
    description: "1080x1080 product card for multi-page SEO platforms with WhatsApp CRM routing.",
    src: "/brand/social/whatsapp-catalog-growth.svg",
    dimensions: "1080 × 1080 px (1:1)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "social-wa-cat-ai",
    name: "WhatsApp Catalog Card — Autonomous AI Agent (₹25,000+)",
    category: "social",
    description: "1080x1080 product card for 24/7 LLM customer qualification & WhatsApp CRM triage.",
    src: "/brand/social/whatsapp-catalog-ai-agent.svg",
    dimensions: "1080 × 1080 px (1:1)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "social-wa-cat-custom",
    name: "WhatsApp Catalog Card — Custom Web App & MVP (₹50,000+)",
    category: "social",
    description: "1080x1080 product card for full-stack React platforms with auth, database, and 14-day SLA.",
    src: "/brand/social/whatsapp-catalog-custom-app.svg",
    dimensions: "1080 × 1080 px (1:1)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },

  // --- MONOCHROME SUITE ---
  {
    id: "mono-horizontal-black",
    name: "Monochrome Black Horizontal Logo",
    category: "monochrome",
    description: "Pure 1-color Charcoal/Black lockup for single-ink printing, letterheads, stamps, and fax transmissions.",
    src: "/brand/logo-horizontal-mono-black.svg",
    dimensions: "360 × 64 px (Scalable Vector)",
    recommendedBackground: "light",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "mono-horizontal-white",
    name: "Monochrome White Horizontal Logo",
    category: "monochrome",
    description: "Pure 1-color White lockup for vinyl cuts, dark uniforms, screen printing, and frosted glass signage.",
    src: "/brand/logo-horizontal-mono-white.svg",
    dimensions: "360 × 64 px (Scalable Vector)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "mono-horizontal-terracotta",
    name: "Monochrome Terracotta Horizontal Logo",
    category: "monochrome",
    description: "Pure 1-color Terracotta lockup for editorial craft paper, luxury packaging, and warm single-ink press.",
    src: "/brand/logo-horizontal-mono-terracotta.svg",
    dimensions: "360 × 64 px (Scalable Vector)",
    recommendedBackground: "light",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "mono-stacked-black",
    name: "Monochrome Black Stacked Logo",
    category: "monochrome",
    description: "Pure 1-color black vertical lockup for invoices, technical specs, and physical product stamps.",
    src: "/brand/logo-stacked-mono-black.svg",
    dimensions: "240 × 200 px (Scalable Vector)",
    recommendedBackground: "light",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "mono-stacked-white",
    name: "Monochrome White Stacked Logo",
    category: "monochrome",
    description: "Pure 1-color white vertical lockup for dark apparel, laser engraving, and dark packaging surfaces.",
    src: "/brand/logo-stacked-mono-white.svg",
    dimensions: "240 × 200 px (Scalable Vector)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },

  // --- GUIDELINES & BLUEPRINTS ---
  {
    id: "guidelines-clearspace",
    name: "Logo Clear-Space Exclusion Rules (1X Grid)",
    category: "guidelines",
    description: "Defines the mandatory 1X clearance boundary around all logotypes to prevent visual crowding.",
    src: "/brand/logo-clearspace.svg",
    dimensions: "720 × 320 px (Technical Vector)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "guidelines-minsize",
    name: "Minimum Size & Resolution Thresholds",
    category: "guidelines",
    description: "Guaranteed legibility minimums for Digital screens (pixels) and Physical Print (millimeters).",
    src: "/brand/logo-minsize.svg",
    dimensions: "760 × 380 px (Technical Vector)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "guidelines-misuse",
    name: "Logo Misuse & Prohibited Modifications",
    category: "guidelines",
    description: "6 mandatory visual rules: Do not distort, do not recolor, do not rotate, do not crowd, do not add shadows, do not rearrange.",
    src: "/brand/logo-misuse.svg",
    dimensions: "840 × 560 px (Technical Vector)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "guidelines-construction",
    name: "Geometric Construction & Blueprint Architecture",
    category: "guidelines",
    description: "Mathematical blueprint detailing the 60° arrow apex, vertical axis, and bezier curves of the 'N' + 'R' monogram.",
    src: "/brand/brand-construction.svg",
    dimensions: "640 × 480 px (Technical Vector)",
    recommendedBackground: "dark",
    format: "SVG Vector",
    isVector: true,
  },
  {
    id: "master-3x3-overview",
    name: "Master 3×3 Brand Identity Board",
    category: "guidelines",
    description: "High-end 3x3 identity deck presentation board encapsulating the full visual world of NextReach Studio.",
    src: "/brand/brandkit-overview.jpg",
    dimensions: "1920 × 1440 px (High-Res Comps)",
    recommendedBackground: "dark",
    format: "JPG Master Board",
    isVector: false,
  },
];

const COLOR_TOKENS = [
  {
    name: "Signature Terracotta",
    role: "Primary Brand Accent & Mark Stroke",
    hex: "#C76B50",
    rgb: "rgb(199, 107, 80)",
    hsl: "hsl(14, 52%, 55%)",
    contrast: "4.8:1 on Charcoal (AA) | 4.2:1 on Cream",
    cssVar: "--color-terracotta",
    bgClass: "bg-[#C76B50]",
    textDark: false,
  },
  {
    name: "Terracotta Hover",
    role: "Interactive Hover States & Highlights",
    hex: "#D97A5E",
    rgb: "rgb(217, 122, 94)",
    hsl: "hsl(14, 61%, 61%)",
    contrast: "5.5:1 on Charcoal (AA)",
    cssVar: "--color-terracotta-hover",
    bgClass: "bg-[#D97A5E]",
    textDark: false,
  },
  {
    name: "Terracotta Deep",
    role: "Active States & Heavy Borders",
    hex: "#A8523A",
    rgb: "rgb(168, 82, 58)",
    hsl: "hsl(13, 49%, 44%)",
    contrast: "3.9:1 on Charcoal | 5.8:1 on Cream (AA)",
    cssVar: "--color-terracotta-active",
    bgClass: "bg-[#A8523A]",
    textDark: false,
  },
  {
    name: "Warm Cream Canvas",
    role: "Primary Light Background & App Base",
    hex: "#FAF8F5",
    rgb: "rgb(250, 248, 245)",
    hsl: "hsl(36, 33%, 97%)",
    contrast: "15.2:1 on Charcoal (AAA)",
    cssVar: "--color-cream",
    bgClass: "bg-[#FAF8F5]",
    textDark: true,
  },
  {
    name: "Cream Surface",
    role: "Cards, Modals & Elevated Surfaces",
    hex: "#F3EFE8",
    rgb: "rgb(243, 239, 232)",
    hsl: "hsl(38, 28%, 93%)",
    contrast: "13.8:1 on Charcoal (AAA)",
    cssVar: "--color-cream-surface",
    bgClass: "bg-[#F3EFE8]",
    textDark: true,
  },
  {
    name: "Deep Charcoal",
    role: "Primary Typography & Dark Substrates",
    hex: "#1F1F23",
    rgb: "rgb(31, 31, 35)",
    hsl: "hsl(240, 6%, 13%)",
    contrast: "15.2:1 on Cream (AAA)",
    cssVar: "--color-charcoal",
    bgClass: "bg-[#1F1F23]",
    textDark: false,
  },
  {
    name: "Charcoal Surface",
    role: "Dark Cards & Elevated App Docks",
    hex: "#2A2A2E",
    rgb: "rgb(42, 42, 46)",
    hsl: "hsl(240, 5%, 17%)",
    contrast: "12.4:1 on Cream (AAA)",
    cssVar: "--color-charcoal-surface",
    bgClass: "bg-[#2A2A2E]",
    textDark: false,
  },
  {
    name: "Architectural Stone",
    role: "Secondary Text & Technical Labels",
    hex: "#6E6862",
    rgb: "rgb(110, 104, 98)",
    hsl: "hsl(30, 6%, 41%)",
    contrast: "4.9:1 on Cream (AA)",
    cssVar: "--color-stone",
    bgClass: "bg-[#6E6862]",
    textDark: false,
  },
];

const IG_BIOS = [
  {
    title: "01. Direct Response & High Conversion",
    badge: "RECOMMENDED FOR PUNE SMES",
    text: `NextReach Studio | Web & AI 🚀
Senior-engineered websites & AI agents.
⚡ Shipped in 3–14 days | ₹5k+
📍 Pune & Global
👇 Book a Sprint / Chat on WhatsApp
wa.me/919822379976`,
    chars: 142,
  },
  {
    title: "02. High-Tech & Autonomous AI",
    badge: "FOUNDERS & CTOS",
    text: `NextReach Studio
High-velocity AI & custom web engineering.
Autonomous agents • React/Astro • Fast MVPs
Zero fluff. Fixed-scope delivery.
👇 Explore Live Portfolios
nextreachstudio.vercel.app`,
    chars: 148,
  },
  {
    title: "03. Minimalist Authority",
    badge: "LUXURY & ARCHITECTURAL",
    text: `NextReach Studio
Architecture of intelligent software.
Websites • AI Systems • Enterprise MVPs
Senior engineers. 14-day execution.
📍 Pune, MH
👇 Start Your Project
nextreachstudio.vercel.app/contact`,
    chars: 146,
  },
];

interface WhatsAppSuiteTemplate {
  id: string;
  num: string;
  title: string;
  stage: "First Touch" | "Sales & Pricing" | "Intake & Proposals" | "Closing & Delivery";
  badge: string;
  file: string;
  description: string;
  text: string;
}

const WHATSAPP_SUITE_TEMPLATES: WhatsAppSuiteTemplate[] = [
  {
    id: "wa-01-welcome",
    num: "01",
    title: "WhatsApp Welcome & Auto-Responder",
    stage: "First Touch",
    badge: "INBOUND AUTO-RESPONDER",
    file: "/brand/whatsapp-suite/01-welcome-message.md",
    description: "Instant greeting for inbound ads, website button clicks, and after-hours triage.",
    text: `Hey there! 👋 Welcome to NextReach Studio.

We build senior-engineered, ultra-fast websites and AI workflows that actually generate leads for Pune businesses. ⚡

To get you the exact timeline & package in 2 minutes:
1️⃣ What is your business name & industry?
2️⃣ Are you launching a new website or redesigning an existing one?
3️⃣ What is your target launch date?

(Or if you'd like to browse our packages first, just reply "MENU"!) 🚀`,
  },
  {
    id: "wa-02-menu",
    num: "02",
    title: "WhatsApp Package Menu (₹5k / ₹15k / ₹25k+)",
    stage: "Sales & Pricing",
    badge: "3-TIER PRICING MENU",
    file: "/brand/whatsapp-suite/02-package-menu.md",
    description: "Scannable product menu sent when leads ask for service options or reply MENU.",
    text: `Here are our fixed-scope Website Engineering Packages at NextReach Studio 🚀

⚡ 1. QUICK LAUNCH WEBSITE — ₹5,000 (One-Time)
• 1-Page High-Converting Digital Flagship
• Sub-second mobile load speeds (Astro 6)
• 1-Tap direct WhatsApp lead button
• Full Vercel hosting setup + Free SSL
⏱️ Delivery: 3 Days Flat

🚀 2. BUSINESS GROWTH PLATFORM — ₹15,000 (One-Time) [Most Popular]
• 5 to 8 Custom Engineered Pages (Home, Services, Case Studies, Contact)
• Local Pune SEO + Rich Schema Structured Data
• Interactive components (Quote calculators / filters)
• Lead routing straight to your WhatsApp & email
⏱️ Delivery: 7 Days Flat

🤖 3. CUSTOM WEB APP & AI WORKFLOW — ₹25,000 to ₹50,000+
• Full-stack React 19 / Astro application
• 24/7 Autonomous AI Agent for customer triage & auto-booking
• Secure database (Supabase/PostgreSQL) + Auth
⏱️ Delivery: 14 Days Flat

---
💡 All packages include:
Zero monthly agency retainers • 100% full source code ownership • 30-day post-launch warranty support.

Which package aligns best with your goals? Reply 1, 2, or 3! 👇`,
  },
  {
    id: "wa-03-portfolio",
    num: "03",
    title: "WhatsApp Portfolio Showcase & Live Links",
    stage: "First Touch",
    badge: "SOCIAL PROOF & LIVE DEMOS",
    file: "/brand/whatsapp-suite/03-portfolio-message.md",
    description: "Fast link drops of live high-performance client demos and interactive tool hubs.",
    text: `Here are a few live websites and flagships we've engineered recently: 🌟

🍽️ Luxury Dining & Hospitality Demo:
👉 https://nextreachstudio.vercel.app/demos/saffron-and-smoke
(Load time: 0.38s • 100/100 Core Web Vitals • Instant WhatsApp reservation flow)

🏥 Healthcare & Clinic Flagship:
👉 https://nextreachstudio.vercel.app/industries/healthcare
(Engineered for patient appointment booking & medical specialty trust)

🏢 High-Growth Business & SaaS Architecture:
👉 https://nextreachstudio.vercel.app/portfolio
(Case studies, tech benchmarks, and lead conversion data)

🛠️ Live AI Developer Tools Hub (Engineered by us):
👉 https://nextreachstudio.vercel.app/tools/ai-token-calculator
(Interactive React calculators used by developers daily)

---
All our sites are built using modern Astro 6 & React 19 architecture — meaning they load 4x faster than typical WordPress sites and convert significantly more mobile traffic.

Would you like us to put together a quick 3-day sprint concept for your business? 🚀`,
  },
  {
    id: "wa-04-pricing",
    num: "04",
    title: "WhatsApp Pricing & Transparency Terms",
    stage: "Sales & Pricing",
    badge: "50/50 MILESTONE TERMS",
    file: "/brand/whatsapp-suite/04-pricing-message.md",
    description: "Clear milestone payment structure (50% booking deposit / 50% launch sign-off).",
    text: `Here is our transparent, fixed-scope pricing breakdown. Zero hidden agency retainers. 🤝

📌 PRICING TIERS:
1️⃣ Quick Launch Website (1-Page): ₹5,000 flat
2️⃣ Business Growth Platform (5-8 Pages): ₹15,000 flat
3️⃣ Autonomous AI Agent + Custom App: ₹25,000 – ₹50,000+

---
💳 PAYMENT TERMS (Milestone-Based):
• 50% Upfront Booking Deposit (To lock your sprint slot & start design)
• 50% Final Payment (Only after you review & approve your site on your live domain)

---
🛡️ WHAT IS 100% INCLUDED (₹0 Extra):
✅ Custom UI/UX design (tailored to your brand)
✅ Mobile & tablet responsive architecture
✅ Free hosting setup on Vercel (Fast global CDN)
✅ Free lifetime SSL security certificate (HTTPS)
✅ 1-Tap WhatsApp lead capture setup
✅ 30-Day post-launch support warranty for any minor text/image edits

---
🌐 ONLY THIRD-PARTY COST (If you don't already own it):
• Domain Name (.com / .in): ~₹800–₹1,000/year (paid directly to GoDaddy/Namecheap in your name).

Ready to lock in a sprint slot this week? 🚀`,
  },
  {
    id: "wa-05-gallery",
    num: "05",
    title: "Industry Website Examples Gallery (Pune Niches)",
    stage: "Sales & Pricing",
    badge: "NICHE-SPECIFIC DEMOS",
    file: "/brand/whatsapp-suite/05-website-examples-gallery.md",
    description: "Targeted demo links for Clinics, Food Brands, Real Estate, and Manufacturing.",
    text: `Here are our industry-specific website examples tailored for Pune businesses: 🌟

🍽️ Food & Restaurants: https://nextreachstudio.vercel.app/demos/saffron-and-smoke
(1-Tap WhatsApp table reservation, 0.3s load speed, digital menu)

🏥 Healthcare & Clinics: https://nextreachstudio.vercel.app/industries/healthcare
(Doctor credentials, specialty list, direct WhatsApp appointment booking)

🏢 Real Estate & Builders: https://nextreachstudio.vercel.app/industries/real-estate
(Brochure downloads, floor plan slider, site visit scheduling)

⚙️ Manufacturing & B2B: https://nextreachstudio.vercel.app/industries/manufacturing
(Product specs table, WhatsApp RFQ triggers, ISO compliance proofs)

💼 Consulting & Legal: https://nextreachstudio.vercel.app/services/ai-consulting-pune
(Case study breakdowns, client trust badges, direct discovery chat)

Which industry demo matches closest with your vision? 👇`,
  },
  {
    id: "wa-06-qualify",
    num: "06",
    title: "60-Second Lead Qualification Questionnaire",
    stage: "First Touch",
    badge: "RAPID LEAD TRIAGE",
    file: "/brand/whatsapp-suite/06-qualification-questionnaire.md",
    description: "5 quick questions to qualify prospect scope, timeline, and asset readiness in 60 seconds.",
    text: `To make sure we recommend the exact right package for your business, could you answer these 5 quick questions? (Takes ~60 seconds): ⏱️

1️⃣ Business Name & Industry:
(e.g., Kulkarni Dental Clinic, Pune)

2️⃣ Project Scope:
A) 1-Page High-Converting Fast Website (₹5,000 | 3 Days)
B) 5–8 Page Business Growth Website with SEO (₹15,000 | 7 Days)
C) Custom Web App or AI Automation Agent (₹25,000+ | 14 Days)

3️⃣ Do you already have a domain name (like yourbusiness.com)?
[ Yes / No / Need help choosing ]

4️⃣ Do you have logo, text, or photos ready?
[ Yes ready / Partial / Need NextReach to write the copy & provide graphics ]

5️⃣ What is your ideal launch date?
[ As soon as possible / Within 7 days / Later this month ]

---
Just reply with your answers (e.g., 1: Apex Real Estate, 2: B, 3: Yes, 4: Partial, 5: This week) and we’ll share your custom project plan! 🚀`,
  },
  {
    id: "wa-07-intake",
    num: "07",
    title: "Client Requirement Intake Form",
    stage: "Intake & Proposals",
    badge: "ASSET & CONTENT INTAKE",
    file: "/brand/whatsapp-suite/07-requirement-form.md",
    description: "Structured intake form capturing business info, offerings, color theme, and WhatsApp lead routing.",
    text: `📋 FAST WEBSITE SPRINT INTAKE FORM
Please copy, fill in the details below, and send back to start your sprint! 🚀

---
1. BUSINESS & CONTACT DETAILS:
• Official Business Name: 
• Tagline / Slogan (if any):
• Physical Address (for Google Map embed):
• Primary Phone Number & WhatsApp Number for Leads:
• Official Contact Email:

2. SERVICES / PRODUCTS:
• Top 3 to 6 services/products you offer:
  1) 
  2) 
  3) 
• Any special pricing, discounts, or package deals to highlight?

3. BRAND ASSETS:
• Logo file: (Please attach PNG/SVG/PDF or let us know if you need one designed)
• Preferred Color Theme: [ Terracotta & Charcoal / Deep Navy & White / Emerald & Cream / Custom ]
• 2–3 Competitor or Reference websites you like:

4. DOMAIN & SOCIAL MEDIA:
• Do you own a domain? (If yes, which registrar: GoDaddy / Hostinger / Namecheap):
• Social media profile links (Instagram, LinkedIn, Facebook, YouTube):

5. PRIMARY CALL TO ACTION:
• What is the #1 action you want visitors to take?
  [ ] Chat on WhatsApp
  [ ] Call Directly
  [ ] Fill a Quote Form
  [ ] Book an Appointment

---
Once received, our senior engineers will build your live staging link within 48–72 hours! ⚡`,
  },
  {
    id: "wa-08-quote",
    num: "08",
    title: "Professional WhatsApp Quote Template",
    stage: "Intake & Proposals",
    badge: "ITEMIZED QUOTATION",
    file: "/brand/whatsapp-suite/08-quote-template.md",
    description: "Itemized formal quote with deliverable breakdown, turnaround SLA, and milestone terms.",
    text: `📄 PROJECT QUOTATION — NEXTREACH STUDIO
Date: {{Date}} | Quotation Ref: NR-{{QuoteNumber}}
Prepared For: {{ClientName}} ({{BusinessName}})

---
🚀 PROJECT TITLE:
{{PackageName}} (e.g. 1-Page Quick Launch Website Sprint / 7-Day Business Growth Platform)

---
📦 ITEMIZED SCOPE OF DELIVERABLES:
1. Custom UI/UX Architecture (Mobile & Desktop Responsive)
2. Ultra-Fast Frontend Build (Astro 6 Engine, sub-second load times)
3. 1-Tap WhatsApp Lead Capture & Pre-filled Message System
4. Hero Section, Services Showcase, About Us, Client Reviews & Contact Map
5. Free Global CDN Hosting Setup on Vercel
6. Free Lifetime SSL Security Certificate (HTTPS)
7. Basic Google SEO Meta Tags & Rich Schema Structured Data
8. 30-Day Post-Launch Warranty Support (Minor text/image updates)

---
⏱️ ESTIMATED TIMELINE:
• Development & Staging Review: {{TimelineDays}} Days (e.g., 3 Days / 7 Days)
• Target Launch Date: {{TargetLaunchDate}}

---
💰 INVESTMENT SUMMARY:
• Subtotal: ₹{{PriceAmount}}
• Hosting & SSL Setup: ₹0 (Included Free)
• Monthly Retainers: ₹0 (Zero Monthly Fees)
--------------------------------------
TOTAL FIXED INVESTMENT: ₹{{PriceAmount}}

---
💳 MILESTONE PAYMENT SCHEDULE:
• Milestone 1 (50% Upfront): ₹{{DepositAmount}} (To lock sprint & begin design)
• Milestone 2 (50% on Launch): ₹{{BalanceAmount}} (Upon live domain handover)

---
Valid for: 7 Days from issuance.
To accept this quotation and reserve your sprint slot, reply "APPROVE" to receive payment details! 🚀`,
  },
  {
    id: "wa-09-proposal",
    num: "09",
    title: "1-Page Fast Website Sprint Proposal",
    stage: "Intake & Proposals",
    badge: "EXECUTIVE PROPOSAL",
    file: "/brand/whatsapp-suite/09-proposal-template.md",
    description: "Concise 1-page sprint agreement covering technical scope, milestones, and commercial terms.",
    text: `# FAST WEBSITE SPRINT PROPOSAL
**Client:** {{ClientBusinessName}}
**Agency:** NextReach Studio (Pune, MH)
**Prepared By:** Rajesh Shrirao (Principal Engineer)

## 1. Executive Summary & Objective
{{ClientBusinessName}} requires an ultra-fast, high-converting digital web platform to establish market authority, rank on Google local search in Pune, and convert inbound mobile traffic directly into WhatsApp inquiries and phone bookings.

## 2. Technical Scope of Work
- Custom UI/UX Engineering (Tailored to your brand; zero bloated WordPress themes).
- Sub-second performance (100/100 Core Web Vitals on Astro 6).
- 1-Tap WhatsApp booking action button with pre-filled inquiry parameters.
- Local Pune SEO metadata + JSON-LD Schema markup.
- Deployed on Vercel Global Edge CDN with SSL encryption and 99.99% uptime.

## 3. Sprint Timeline & Milestones
- Day 1–2: Content structuring, wireframing & live staging link preview.
- Day 3–{{TimelineDays}}: WhatsApp routing QA & client revisions.
- Day {{TimelineDays}}: DNS domain mapping, Google Search Console indexing & final handover.

## 4. Investment & Commercial Terms
- Total Fixed Investment: ₹{{PriceAmount}} (Zero monthly agency retainers)
- 50% Deposit (₹{{DepositAmount}}) / 50% Launch Balance (₹{{BalanceAmount}})
- Includes 30-Day Post-Launch Support Warranty.

To approve, reply "APPROVED" on WhatsApp to lock in this week's sprint slot! 🚀`,
  },
  {
    id: "wa-10-followup",
    num: "10",
    title: "3-Stage WhatsApp Follow-Up Sequences",
    stage: "Sales & Pricing",
    badge: "LEAD NURTURING (24H / 48H / 7D)",
    file: "/brand/whatsapp-suite/10-follow-up-sequences.md",
    description: "3 polite, non-pushy follow-up touchpoints to revive quiet leads and close sprint slots.",
    text: `[STAGE 1 — 24H AFTER QUOTE]
Hi {{Name}}! 👋 Just following up to make sure you received our package details and quote for {{BusinessName}}. Do you have any questions about the 3-day timeline or what’s included in the sprint? Happy to answer right here on WhatsApp! 🚀

---
[STAGE 2 — 48H VALUE & PROOF DROP]
Hey {{Name}}! Sharing a quick reference: 🌟
We just delivered a flagship platform for a Pune client that achieved a 0.3-second load speed and generated 10+ WhatsApp inquiries in its first week:
👉 https://nextreachstudio.vercel.app/demos/saffron-and-smoke
We have 2 engineering sprint slots open for this week. Would you like to lock in one for {{BusinessName}}? ⚡

---
[STAGE 3 — 7D SPRINT QUEUE CLOSING]
Hi {{Name}}, we're finalizing our development schedule for next week and wanted to check in before closing our current sprint queue. 🗓️
If you're still planning to launch the website for {{BusinessName}}, we can have you live in 3 to 7 days. If priorities have shifted, no problem at all! Feel free to reach back out whenever you're ready. 🤝`,
  },
  {
    id: "wa-11-objections",
    num: "11",
    title: "WhatsApp Objection Handling Cards (6 Scenarios)",
    stage: "Sales & Pricing",
    badge: "BATTLE-TESTED SCRIPTS",
    file: "/brand/whatsapp-suite/11-objection-handling-cards.md",
    description: "Instant responses for cheap WordPress freelancers, 2-day delivery rushes, and content readiness.",
    text: `⚡ OBJECTION 1: "Another agency quoted ₹2,000–₹3,000 on WordPress."
👉 Response: "Cheap WordPress themes take 4–6 seconds to load and break with plugin updates. We build clean, custom Astro 6 code that loads under 0.5s with a direct WhatsApp conversion engine. A fast site pays for itself in the first 1–2 client inquiries!"

⚡ OBJECTION 2: "Can you do it in 2 days instead of 3?"
👉 Response: "Yes, absolutely! If you can share your logo, service list, and phone number today, our engineering team can fast-track your sprint to have your staging preview ready in 48 hours."

⚡ OBJECTION 3: "Are there any hidden monthly or yearly costs?"
👉 Response: "Zero hidden fees! We do NOT charge monthly maintenance retainers. Hosting on Vercel is free, SSL is free for life, and domain is only ~₹800/yr paid directly to GoDaddy. You own 100% of your code."

⚡ OBJECTION 4: "What if I don't like the design or want changes?"
👉 Response: "You get a private staging link at 48–72 hours to review and request changes. We only launch when you are 100% satisfied, plus you get a 30-day post-launch warranty!"

⚡ OBJECTION 5: "I don't have text or photos ready."
👉 Response: "No problem! Just send bullet points or a voice note of your services, and our team will write high-converting copy and source licensed HD photography for you."`,
  },
  {
    id: "wa-12-payment",
    num: "12",
    title: "WhatsApp Payment Instructions (UPI / Bank / Razorpay)",
    stage: "Closing & Delivery",
    badge: "PAYMENT COLLECTION",
    file: "/brand/whatsapp-suite/12-payment-instructions.md",
    description: "Formatted UPI, IMPS, and card payment instructions for 50% deposit transfer.",
    text: `💳 PAYMENT DETAILS — NEXTREACH STUDIO

Thank you for choosing NextReach Studio! Here are the official payment details to confirm your sprint slot:

---
📌 INVOICE SUMMARY:
• Package: {{PackageName}}
• Total Amount: ₹{{TotalAmount}}
• Upfront 50% Booking Deposit: ₹{{DepositAmount}}
• Remaining 50% Balance: ₹{{BalanceAmount}} (Due only after live domain launch)

---
📲 OPTION 1: UPI / QR CODE (Instant Confirmation)
• UPI ID: 9822379976@upi
• Google Pay / PhonePe / Paytm: +91 98223 79976
• Name: Rajesh Shrirao / NextReach Studio

---
🏦 OPTION 2: DIRECT BANK TRANSFER (IMPS / NEFT)
• Account Name: NextReach Studio
• Bank: HDFC Bank / ICICI Bank
• Account Number: 50200088991122
• IFSC Code: HDFC0001234 | Branch: Pune, MH

---
📸 NEXT STEP:
Once completed, please reply here with a quick screenshot of the payment receipt. Our team will immediately send your Onboarding Checklist and begin your Day 1 Sprint! 🚀`,
  },
  {
    id: "wa-13-onboarding",
    num: "13",
    title: "Client Onboarding Guide & Day 0 Checklist",
    stage: "Closing & Delivery",
    badge: "DAY 0 SPRINT KICKOFF",
    file: "/brand/whatsapp-suite/13-client-onboarding-document.md",
    description: "Welcome guide and checklist sent immediately after receiving the booking deposit.",
    text: `🎉 Welcome to NextReach Studio! Your sprint is officially locked in.

Here is what will happen over the next 3 to 7 days:

---
🗓️ SPRINT ROADMAP:
• DAY 0 (Today): Onboarding & asset collection
• DAY 1–2: UI/UX layout engineering, mobile optimization & copy build
• DAY 3: Private Staging Preview Link delivered to your WhatsApp for review
• DAY 3 / 7: Revisions completed + Live Domain Launch on your custom .com/.in!

---
📋 DAY 0 ASSET CHECKLIST (Please share whatever you have ready):
1️⃣ Logo file (PNG with transparent background or high-res JPG)
2️⃣ Primary phone number & WhatsApp number for customer leads
3️⃣ Service list / key offerings you want highlighted
4️⃣ High-res photos of your team, office, clinic, or products (Or let us source HD photos)
5️⃣ Domain registrar login (GoDaddy / Hostinger) OR let us know if you'd like us to purchase the domain for you.

---
👨‍💻 YOUR DEDICATED SPRINT ENGINEER:
• Lead: Rajesh Shrirao (Principal Engineer)
• Contact / WhatsApp: +91 98223 79976
• Direct Support Hours: 9:00 AM – 8:00 PM IST

We're excited to build something incredible for your business! 🚀`,
  },
  {
    id: "wa-14-handoff",
    num: "14",
    title: "Project Handoff & 30-Day Warranty Dossier",
    stage: "Closing & Delivery",
    badge: "FINAL DELIVERY & WARRANTY",
    file: "/brand/whatsapp-suite/14-project-handoff-document.md",
    description: "Formal completion message with live domain verification, DNS handover, and review request.",
    text: `🚀 YOUR WEBSITE IS OFFICIALLY LIVE! Congratulations {{ClientName}}!

Here is your complete Project Handoff Dossier & Access Guide:

---
🌐 LIVE WEBSITE ACCESS:
• Official Domain: https://{{ClientDomainName}}
• SSL Status: Active (HTTPS 256-bit Encrypted)
• Speed Performance: 100/100 Mobile Score (Astro 6 Engine)

---
📦 WHAT WAS CONFIGURED & DELIVERED:
1. Complete frontend codebase deployed on Vercel Global Edge CDN.
2. 1-Tap WhatsApp Lead Action Button mapped to {{ClientWhatsAppNumber}}.
3. Google SEO tags, OpenGraph social preview cards & JSON-LD local schema.
4. Google Analytics 4 (GA4) / Search Console ownership connected to your email.
5. All vector logos and optimized image assets bundled.

---
🛡️ 30-DAY POST-LAUNCH WARRANTY:
Your website includes 30 days of complimentary technical support from NextReach Studio.
• Free minor text changes, phone number updates, or photo swaps.
• 24/7 uptime monitoring.
• Direct engineer WhatsApp support at +91 98223 79976.

---
⭐ A QUICK FAVOR:
If you loved our speed, communication, and work quality, a quick 1-minute review would mean the world to our studio team:
👉 {{GoogleReviewLink / TestimonialLink}}

Thank you for trusting NextReach Studio with your digital flagship! 🥂`,
  },
];

export default function BrandKitViewer() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedWaStage, setSelectedWaStage] = useState<string>("all");
  const [previewBg, setPreviewBg] = useState<"cream" | "charcoal" | "white" | "grid">("cream");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredAssets = BRAND_ASSETS.filter((asset) => {
    if (activeTab === "all") return true;
    return asset.category === activeTab;
  });

  const filteredWaTemplates = WHATSAPP_SUITE_TEMPLATES.filter((tmpl) => {
    if (selectedWaStage === "all") return true;
    return tmpl.stage === selectedWaStage;
  });

  const handleCopyLink = async (src: string, id: string) => {
    try {
      const fullUrl = `${window.location.origin}${src}`;
      await navigator.clipboard.writeText(fullUrl);
      setCopiedId(`link-${id}`);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      // Fallback
    }
  };

  const handleCopyHex = async (hex: string, name: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedId(`hex-${name}`);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      // Fallback
    }
  };

  const handleCopyText = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(`text-${id}`);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      // Fallback
    }
  };

  const handleCopySvgCode = async (src: string, id: string) => {
    try {
      const res = await fetch(src);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopiedId(`code-${id}`);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      // Fallback
    }
  };

  const getPreviewBgClass = () => {
    switch (previewBg) {
      case "charcoal":
        return "bg-[#1F1F23]";
      case "white":
        return "bg-[#FFFFFF]";
      case "grid":
        return "bg-[#FAF8F5] bg-[radial-gradient(#C76B50_1px,transparent_1px)] [background-size:16px_16px]";
      case "cream":
      default:
        return "bg-[#FAF8F5]";
    }
  };

  return (
    <div className="space-y-16">
      {/* Toast Notification */}
      {copiedId && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#1F1F23] text-[#FAF8F5] text-xs font-mono rounded-xl shadow-2xl border border-[#C76B50]/30 animate-bounce">
          <svg className="w-4 h-4 text-[#C76B50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <span>Copied to clipboard!</span>
        </div>
      )}

      {/* Filter Tabs & Preview Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 bg-white/80 backdrop-blur-md rounded-2xl border border-[#1F1F23]/8 shadow-sm">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1">
          {[
            { id: "all", label: `All Assets (${BRAND_ASSETS.length})` },
            { id: "logo", label: "Logos & Lockups" },
            { id: "mark", label: "Standalone Marks" },
            { id: "social", label: "Social Media Kit (21)" },
            { id: "app", label: "App & Profile Icons" },
            { id: "monochrome", label: "Monochrome" },
            { id: "guidelines", label: "Rules & Blueprints" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#C76B50] text-white shadow-sm"
                  : "text-[#6E6862] hover:text-[#1F1F23] hover:bg-[#FAF8F5]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Global Preview Background Switcher */}
        <div className="flex items-center gap-2 text-xs text-[#6E6862] pl-2 border-t md:border-t-0 md:border-l border-[#1F1F23]/8 pt-2 md:pt-0">
          <span className="font-mono text-[11px] font-semibold text-[#1F1F23]">Canvas:</span>
          <div className="inline-flex rounded-lg p-0.5 bg-[#FAF8F5] border border-[#1F1F23]/8">
            <button
              title="Cream Canvas"
              onClick={() => setPreviewBg("cream")}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                previewBg === "cream" ? "bg-white text-[#1F1F23] shadow-xs font-bold" : "text-[#6E6862]"
              }`}
            >
              Cream
            </button>
            <button
              title="Dark Charcoal Canvas"
              onClick={() => setPreviewBg("charcoal")}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                previewBg === "charcoal" ? "bg-[#1F1F23] text-white shadow-xs font-bold" : "text-[#6E6862]"
              }`}
            >
              Charcoal
            </button>
            <button
              title="Pure White Canvas"
              onClick={() => setPreviewBg("white")}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                previewBg === "white" ? "bg-white text-[#1F1F23] shadow-xs font-bold" : "text-[#6E6862]"
              }`}
            >
              White
            </button>
            <button
              title="Grid Canvas"
              onClick={() => setPreviewBg("grid")}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                previewBg === "grid" ? "bg-white text-[#C76B50] shadow-xs font-bold" : "text-[#6E6862]"
              }`}
            >
              Grid
            </button>
          </div>
        </div>
      </div>

      {/* Asset Grid Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => {
          const isDarkSpec = asset.recommendedBackground === "dark";
          const cardBgClass =
            asset.category === "guidelines"
              ? "bg-[#141416]"
              : isDarkSpec && previewBg === "cream"
              ? "bg-[#1F1F23]"
              : getPreviewBgClass();

          return (
            <div
              key={asset.id}
              className="group bg-white rounded-2xl border border-[#1F1F23]/8 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#C76B50]/30 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Meta Header */}
              <div className="p-4 border-b border-[#1F1F23]/6 flex items-center justify-between gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#F0ECE4] text-[#4A4844]">
                  {asset.format}
                </span>
                <span className="text-[11px] font-mono text-[#8C847B] truncate">{asset.dimensions}</span>
              </div>

              {/* Visual Display Stage */}
              <div
                className={`relative p-8 min-h-[220px] flex items-center justify-center transition-colors duration-200 overflow-hidden ${cardBgClass}`}
              >
                <img
                  src={asset.src}
                  alt={asset.name}
                  className="max-h-[170px] max-w-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Card Footer & Action Buttons */}
              <div className="p-5 bg-white space-y-4 border-t border-[#1F1F23]/6">
                <div>
                  <h3 className="text-sm font-bold font-display text-[#1F1F23] mb-1 group-hover:text-[#C76B50] transition-colors">
                    {asset.name}
                  </h3>
                  <p className="text-xs text-[#6E6862] leading-relaxed line-clamp-2">{asset.description}</p>
                </div>

                {/* Button Toolbar */}
                <div className="flex items-center gap-2 pt-2 border-t border-[#1F1F23]/6">
                  {/* Download Direct */}
                  <a
                    href={asset.src}
                    download
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold font-mono bg-[#FAF8F5] text-[#1F1F23] border border-[#1F1F23]/10 hover:bg-[#C76B50] hover:text-white hover:border-[#C76B50] transition-all"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span>Download</span>
                  </a>

                  {/* Copy Vector Code */}
                  {asset.isVector && (
                    <button
                      type="button"
                      onClick={() => handleCopySvgCode(asset.src, asset.id)}
                      className="inline-flex items-center justify-center p-2 rounded-xl text-[#6E6862] hover:text-[#C76B50] hover:bg-[#C76B50]/10 border border-[#1F1F23]/10 transition-colors cursor-pointer"
                      title="Copy SVG XML Source Code"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                    </button>
                  )}

                  {/* Copy Link */}
                  <button
                    type="button"
                    onClick={() => handleCopyLink(asset.src, asset.id)}
                    className="inline-flex items-center justify-center p-2 rounded-xl text-[#6E6862] hover:text-[#C76B50] hover:bg-[#C76B50]/10 border border-[#1F1F23]/10 transition-colors cursor-pointer"
                    title="Copy Direct URL"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Copyable Instagram Bio Suite */}
      <section className="bg-white rounded-3xl border border-[#1F1F23]/8 p-6 sm:p-10 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C76B50]/10 border border-[#C76B50]/20 text-[#C76B50] text-xs font-mono font-bold mb-2">
              <span>Copy-Ready Bio Architecture</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#1F1F23]">
              Official Instagram &amp; Social Bios (&le; 150 Chars)
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6862] mt-1">
              Pre-formatted, line-break optimized copy with WhatsApp shortlink triggers. Click any card to copy directly into your clipboard.
            </p>
          </div>

          <a
            href="/brand/social/instagram-bios.md"
            download
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#1F1F23]/10 text-[#1F1F23] hover:text-[#C76B50] text-xs font-mono font-bold transition-all self-start sm:self-auto"
          >
            <span>View Raw Markdown (.MD) &rarr;</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {IG_BIOS.map((bio, index) => (
            <div
              key={bio.title}
              className="bg-[#FAF8F5] rounded-2xl border border-[#1F1F23]/8 p-5 flex flex-col justify-between space-y-4 hover:border-[#C76B50]/40 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#C76B50]/10 text-[#C76B50]">
                    {bio.badge}
                  </span>
                  <span className="text-[11px] font-mono text-[#8C847B]">{bio.chars} / 150 chars</span>
                </div>
                <h4 className="text-sm font-bold font-display text-[#1F1F23]">{bio.title}</h4>
                <pre className="p-3.5 rounded-xl bg-[#1F1F23] text-[#FAF8F5] font-mono text-xs whitespace-pre-wrap leading-relaxed">
                  {bio.text}
                </pre>
              </div>

              <button
                type="button"
                onClick={() => handleCopyText(bio.text, `bio-${index}`)}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono font-bold bg-[#C76B50] hover:bg-[#D97A5E] text-white transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <span>Copy Bio Text</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* WhatsApp Fast Website Sales, Onboarding & Delivery Suite (14 Parts) */}
      <section className="bg-white rounded-3xl border border-[#1F1F23]/8 p-6 sm:p-10 space-y-8 shadow-sm" id="whatsapp-playbook">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#059669] text-xs font-mono font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span>WhatsApp Fast Website Sales &amp; Delivery Suite</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#1F1F23]">
              14-Part WhatsApp Fast Website Playbook
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6862] mt-1 max-w-2xl">
              Turnkey copy-paste templates specifically engineered for selling, qualifying, quoting, onboarding, and delivering NextReach Studio Fast Websites (₹5k Quick Launch, ₹15k Growth, ₹25k+ AI Agents).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
            <a
              href="/brand/whatsapp-suite/README.md"
              download
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#1F1F23]/10 text-[#1F1F23] hover:text-[#C76B50] text-xs font-mono font-bold transition-all shadow-xs"
            >
              <svg className="w-4 h-4 text-[#C76B50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download Full Suite (.ZIP / MD)</span>
            </a>
          </div>
        </div>

        {/* Stage Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#FAF8F5] rounded-xl border border-[#1F1F23]/8">
          {[
            { id: "all", label: `All 14 Templates` },
            { id: "First Touch", label: "01. Inbound & First Touch" },
            { id: "Sales & Pricing", label: "02. Sales, Demos & Objections" },
            { id: "Intake & Proposals", label: "03. Intake, Quote & Proposal" },
            { id: "Closing & Delivery", label: "04. Payments, Onboarding & Handoff" },
          ].map((stageTab) => (
            <button
              key={stageTab.id}
              onClick={() => setSelectedWaStage(stageTab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                selectedWaStage === stageTab.id
                  ? "bg-[#1F1F23] text-white shadow-xs"
                  : "text-[#6E6862] hover:text-[#1F1F23] hover:bg-white/80"
              }`}
            >
              {stageTab.label}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredWaTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-[#FAF8F5] rounded-2xl border border-[#1F1F23]/8 p-6 flex flex-col justify-between space-y-4 hover:border-[#C76B50]/40 transition-all shadow-xs group"
            >
              <div className="space-y-3">
                {/* Header Badge & Stage */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#C76B50] text-white font-mono text-xs font-bold flex items-center justify-center">
                      {template.num}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#C76B50]/10 text-[#C76B50]">
                      {template.badge}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#8C847B]">Stage: {template.stage}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold font-display text-[#1F1F23] group-hover:text-[#C76B50] transition-colors">
                    {template.title}
                  </h3>
                  <p className="text-xs text-[#6E6862] mt-0.5">{template.description}</p>
                </div>

                {/* Preformatted Copy Viewport */}
                <div className="relative">
                  <pre className="p-4 rounded-xl bg-[#1F1F23] text-[#FAF8F5] font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-[220px] overflow-y-auto border border-white/5 selection:bg-[#C76B50]">
                    {template.text}
                  </pre>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#1F1F23]/6">
                <button
                  type="button"
                  onClick={() => handleCopyText(template.text, template.id)}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-mono font-bold bg-[#10B981] hover:bg-[#059669] text-white transition-colors cursor-pointer shadow-xs"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  <span>Copy WhatsApp Message</span>
                </button>

                <a
                  href={template.file}
                  download
                  className="inline-flex items-center justify-center p-2.5 rounded-xl text-[#6E6862] hover:text-[#C76B50] hover:bg-[#C76B50]/10 border border-[#1F1F23]/10 transition-colors"
                  title="Download Raw Markdown (.MD)"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Master 3x3 Presentation Board Showcase */}
      <div className="bg-[#141416] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C76B50]/20 border border-[#C76B50]/30 text-[#E88C72] text-xs font-mono font-bold mb-2">
              <span>Identity System Master Board</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              NextReach Studio 3×3 Brand World
            </h2>
            <p className="text-xs sm:text-sm text-[#A69D92] mt-1">
              Curated visual thesis encapsulating emblem construction, typography specimens, physical stationery, and digital UI.
            </p>
          </div>

          <a
            href="/brand/brandkit-overview.jpg"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C76B50] hover:bg-[#D97A5E] text-white font-mono text-xs font-bold transition-all shadow-lg self-start sm:self-auto"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download Master Comps (JPG)</span>
          </a>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#1A1A1D]">
          <img
            src="/brand/brandkit-overview.jpg"
            alt="NextReach Studio Master Brand Guidelines 3x3 Presentation Board"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Systematic Color Tokens */}
      <section className="space-y-6 pt-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C76B50]/10 border border-[#C76B50]/20 text-[#C76B50] text-xs font-mono font-bold mb-2">
            <span>Color Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#1F1F23]">
            Curated Color Palette &amp; Contrast Tokens
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6862] mt-1 max-w-2xl">
            Our signature architectural terracotta paired with warm cream surfaces and deep charcoal typography. Click any swatch to copy its HEX value.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COLOR_TOKENS.map((token) => (
            <div
              key={token.name}
              onClick={() => handleCopyHex(token.hex, token.name)}
              className="group bg-white rounded-2xl border border-[#1F1F23]/8 p-4 shadow-sm hover:shadow-lg hover:border-[#C76B50]/40 transition-all cursor-pointer space-y-3"
            >
              {/* Color Block */}
              <div
                className={`h-24 rounded-xl border border-black/5 flex items-end justify-between p-3 transition-transform group-hover:scale-[1.02] ${token.bgClass}`}
              >
                <span
                  className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                    token.textDark ? "bg-black/10 text-black" : "bg-white/20 text-white backdrop-blur-xs"
                  }`}
                >
                  {token.hex}
                </span>
                <span
                  className={`text-[10px] font-mono opacity-80 ${token.textDark ? "text-black" : "text-white"}`}
                >
                  Click to copy
                </span>
              </div>

              {/* Meta */}
              <div>
                <h4 className="text-sm font-bold font-display text-[#1F1F23]">{token.name}</h4>
                <p className="text-[11px] text-[#6E6862] mt-0.5">{token.role}</p>
              </div>

              <div className="pt-2 border-t border-[#1F1F23]/6 space-y-1 font-mono text-[10px] text-[#8C847B]">
                <div className="flex justify-between">
                  <span>RGB:</span>
                  <span className="text-[#1F1F23] font-semibold">{token.rgb}</span>
                </div>
                <div className="flex justify-between">
                  <span>CSS:</span>
                  <span className="text-[#C76B50] font-semibold">{token.cssVar}</span>
                </div>
                <div className="text-[9px] text-[#6E6862] pt-1">{token.contrast}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography Hierarchy */}
      <section className="space-y-6 pt-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C76B50]/10 border border-[#C76B50]/20 text-[#C76B50] text-xs font-mono font-bold mb-2">
            <span>Typography System</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#1F1F23]">
            Editorial &amp; Architectural Type Hierarchy
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6862] mt-1 max-w-2xl">
            A three-tier typographic engine: Cabinet Grotesk for architectural headline weight, Plus Jakarta Sans for warm body clarity, and JetBrains Mono for code accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Display */}
          <div className="bg-white rounded-2xl border border-[#1F1F23]/8 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#C76B50]">01. HEADINGS</span>
              <span className="text-[11px] font-mono text-[#8C847B]">Weights: 700, 800</span>
            </div>
            <div>
              <div className="text-3xl font-extrabold font-display text-[#1F1F23]">Cabinet Grotesk</div>
              <p className="text-xs text-[#6E6862] mt-1">High-impact geometric display typography for hero banners, page headers, and stat counters.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#1F1F23]/6 font-display font-bold text-xl text-[#1F1F23] tracking-tight">
              NextReach Studio: High-Velocity AI Engineering
            </div>
          </div>

          {/* Body */}
          <div className="bg-white rounded-2xl border border-[#1F1F23]/8 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#C76B50]">02. BODY &amp; UI</span>
              <span className="text-[11px] font-mono text-[#8C847B]">Weights: 400, 500, 600</span>
            </div>
            <div>
              <div className="text-3xl font-bold font-body text-[#1F1F23]">Plus Jakarta Sans</div>
              <p className="text-xs text-[#6E6862] mt-1">Modern humanist sans-serif offering maximum reading comfort and crisp rendering across mobile and desktop.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#1F1F23]/6 font-body text-xs text-[#4A4844] leading-relaxed">
              We design and ship high-converting web applications and AI agent workflows with transparent milestone pricing.
            </div>
          </div>

          {/* Monospace */}
          <div className="bg-white rounded-2xl border border-[#1F1F23]/8 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#C76B50]">03. CODE &amp; METRICS</span>
              <span className="text-[11px] font-mono text-[#8C847B]">Weights: 500, 700</span>
            </div>
            <div>
              <div className="text-3xl font-mono font-bold text-[#1F1F23]">JetBrains Mono</div>
              <p className="text-xs text-[#6E6862] mt-1">Engineered for technical calculators, developer token estimators, badges, and code snippets.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#1F1F23] border border-white/10 font-mono text-xs text-[#FAF8F5]">
              <span className="text-[#C76B50]">const</span> <span className="text-[#E88C72]">studio</span> = &#123; speed: <span className="text-[#10B981]">"14d"</span> &#125;;
            </div>
          </div>
        </div>
      </section>

      {/* Brand Voice & Metaphor Summary */}
      <section className="bg-[#FAF8F5] border border-[#1F1F23]/8 rounded-3xl p-6 sm:p-10 space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C76B50]/10 border border-[#C76B50]/20 text-[#C76B50] text-xs font-mono font-bold mb-2">
            <span>Symbolic DNA</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-[#1F1F23]">
            The Meaning Behind the NextReach Emblem
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-sm font-bold text-[#C76B50] font-mono">01. The Arrow (Reach)</div>
            <p className="text-xs text-[#6E6862] leading-relaxed font-body">
              The 60° apex arrowhead at the top represents upward velocity, elevation, and business growth achieved through intelligent software.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-bold text-[#C76B50] font-mono">02. The Central Pillar (Structure)</div>
            <p className="text-xs text-[#6E6862] leading-relaxed font-body">
              The continuous vertical spine provides structural grounding, reflecting architectural discipline, uptime reliability, and senior engineering rigor.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-bold text-[#C76B50] font-mono">03. The Monogram (N &amp; R)</div>
            <p className="text-xs text-[#6E6862] leading-relaxed font-body">
              The left stroke forms the letter <strong>'N'</strong>, seamlessly integrating with the right circular bowl and leg that complete the <strong>'R'</strong>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
