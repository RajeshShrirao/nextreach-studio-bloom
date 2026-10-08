"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  ArrowUpRightIcon,
  SparkleIcon,
  DeviceMobileIcon,
  GlobeIcon,
  ChatCircleDotsIcon,
  CrownIcon,
} from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { curtains, iris } from "@/utils/curtains";

// Register ScrollTrigger safely in browser context
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface GalaxyCardItem {
  id: string;
  pillar: string;
  title: string;
  badge: string;
  metric: string;
  description: string;
  image: string;
  href: string;
  position: "top-left" | "top-right" | "bottom-right" | "bottom-left";
  depth: number;
  initialRotate: number;
  accentColor: string;
  icon: typeof DeviceMobileIcon;
}

const GALAXY_CARDS: GalaxyCardItem[] = [
  {
    id: "mobile-app",
    pillar: "Mobile App",
    title: "Zenith Mobile App",
    badge: "iOS & Android",
    metric: "60 FPS Native",
    description: "Sub-second responsiveness, biometric auth & tactile haptic polish.",
    image: "/assets/hero/card-mobile-app.jpg",
    href: "/services/flutter-app-development-pune",
    position: "top-left",
    depth: 1.15,
    initialRotate: -3.5,
    accentColor: "#df896b",
    icon: DeviceMobileIcon,
  },
  {
    id: "web-app",
    pillar: "Web Platform & SaaS",
    title: "Astra Core Platform",
    badge: "Custom SaaS",
    metric: "Sub-second LCP",
    description: "Mission-critical real-time operations portal with live data sync & analytics.",
    image: "/assets/hero/card-website.jpg",
    href: "/services/web-application-development-pune",
    position: "top-right",
    depth: 0.92,
    initialRotate: 3.2,
    accentColor: "#f2b397",
    icon: GlobeIcon,
  },
  {
    id: "whatsapp-ai",
    pillar: "AI Agent for WhatsApp",
    title: "Agent Nova (WhatsApp)",
    badge: "Autonomous AI",
    metric: "24/7 Smart CRM",
    description: "Instant qualification, automated quotes & calendar booking inside WhatsApp.",
    image: "/assets/hero/card-whatsapp-ai.jpg",
    href: "/services/ai-agent-development-pune",
    position: "bottom-right",
    depth: 1.25,
    initialRotate: -2.8,
    accentColor: "#34d399",
    icon: ChatCircleDotsIcon,
  },
  {
    id: "luxury-web",
    pillar: "Luxury Flagship",
    title: "Elara Luxury Flagship",
    badge: "₹10,000 Tier",
    metric: "3-Day Delivery",
    description: "Cinematic reservation platform for bespoke hospitality & architectural estates.",
    image: "/assets/hero/card-luxury-web.jpg",
    href: "/demos/saffron-and-smoke",
    position: "bottom-left",
    depth: 0.98,
    initialRotate: 3.8,
    accentColor: "#df896b",
    icon: CrownIcon,
  },
];

export default function StudioGlassGalaxy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileReelRef = useRef<HTMLDivElement>(null);

  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Parallax physics state
  const mouseState = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    rafId: 0,
  });

  // Track responsive screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 900);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Sync mobile active card on scroll
  const handleMobileScroll = useCallback(() => {
    const el = mobileReelRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.offsetWidth * 0.82;
    const idx = Math.round(scrollLeft / (cardWidth + 14));
    setActiveMobileIdx(Math.min(Math.max(0, idx), GALAXY_CARDS.length - 1));
  }, []);

  const scrollToCard = (index: number) => {
    const el = mobileReelRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth * 0.82;
    el.scrollTo({
      left: index * (cardWidth + 14),
      behavior: "smooth",
    });
    setActiveMobileIdx(index);
  };

  // Card click with optional Iris transition
  const handleCardClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    card: GalaxyCardItem
  ) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return; // Allow new tab navigation
    e.preventDefault();

    curtains(undefined, {
      href: card.href,
      label: card.title,
      effect: iris({
        origin: { x: e.clientX, y: e.clientY },
        duration: 0.50,
        label: card.pillar,
        accentColor: card.accentColor,
      }),
    });
  };

  // 3D Reveal and Scroll Parallax Animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || isMobile) {
      // Clean static presentation for mobile / reduced motion
      return;
    }

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const heroSection = document.querySelector(".studio-hero");

    // 1. Initial 3D Reveal Animation
    const ctx = gsap.context(() => {
      // Set cards in deep 3D perspective
      gsap.set(cards, {
        opacity: 0,
        scale: 0.65,
        z: -280,
        filter: "blur(14px)",
      });

      // Animate cards zooming into orbital positions
      gsap.to(cards, {
        opacity: 1,
        scale: 1,
        z: 0,
        filter: "blur(0px)",
        duration: 1.25,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15,
      });

      // 2. Scroll-Triggered 3D Parallax Galaxy Fly-out
      if (heroSection) {
        ScrollTrigger.create({
          trigger: heroSection,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          onUpdate: (self) => {
            const p = self.progress; // 0 to 1 as hero scrolls out

            cards.forEach((card, i) => {
              const item = GALAXY_CARDS[i];
              if (!card || !item) return;

              let dirX = 1;
              let dirY = 1;

              if (item.position === "top-left") {
                dirX = -1.2;
                dirY = -0.9;
              } else if (item.position === "top-right") {
                dirX = 1.3;
                dirY = -0.85;
              } else if (item.position === "bottom-right") {
                dirX = 1.15;
                dirY = 1.1;
              } else if (item.position === "bottom-left") {
                dirX = -1.1;
                dirY = 1.05;
              }

              const scrollX = dirX * p * 200;
              const scrollY = dirY * p * 160;
              const scrollZ = p * 220;
              const rotY = dirX * p * 24;
              const rotX = dirY * p * 18;
              const fade = Math.max(0, 1 - p * 1.4);

              card.style.setProperty("--scroll-x", `${scrollX.toFixed(1)}px`);
              card.style.setProperty("--scroll-y", `${scrollY.toFixed(1)}px`);
              card.style.setProperty("--scroll-z", `${scrollZ.toFixed(1)}px`);
              card.style.setProperty("--scroll-rx", `${rotX.toFixed(1)}deg`);
              card.style.setProperty("--scroll-ry", `${rotY.toFixed(1)}deg`);
              card.style.setProperty("--scroll-fade", `${fade.toFixed(2)}`);
            });

            // Parallax subtle drift on central text
            const copyEl = document.querySelector(".studio-hero-galaxy-copy") as HTMLElement;
            if (copyEl) {
              const copyY = p * 80;
              const copyFade = Math.max(0, 1 - p * 1.3);
              const copyScale = 1 - p * 0.05;
              copyEl.style.transform = `translate3d(0, ${copyY.toFixed(1)}px, 0) scale(${copyScale.toFixed(3)})`;
              copyEl.style.opacity = copyFade.toFixed(2);
            }
          },
        });
      }
    }, containerRef);

    // 3. Desktop 3D Mouse Parallax & Specular Sheen (RAF Lerp)
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseState.current.targetX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      mouseState.current.targetY = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

      // Update card sheen coordinate
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardX = ((e.clientX - rect.left) / rect.width) * 100;
        const cardY = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--mouse-x", `${cardX.toFixed(1)}%`);
        card.style.setProperty("--mouse-y", `${cardY.toFixed(1)}%`);
      });
    };

    const handleMouseLeave = () => {
      mouseState.current.targetX = 0;
      mouseState.current.targetY = 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const tick = () => {
      const state = mouseState.current;
      state.currentX += (state.targetX - state.currentX) * 0.07;
      state.currentY += (state.targetY - state.currentY) * 0.07;

      cards.forEach((card, i) => {
        const item = GALAXY_CARDS[i];
        if (!card || !item) return;

        const tiltX = -state.currentY * 7;
        const tiltY = state.currentX * 7;
        const moveX = state.currentX * 24 * item.depth;
        const moveY = state.currentY * 18 * item.depth;

        card.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
        card.style.setProperty("--move-x", `${moveX.toFixed(1)}px`);
        card.style.setProperty("--move-y", `${moveY.toFixed(1)}px`);
      });

      mouseState.current.rafId = requestAnimationFrame(tick);
    };

    mouseState.current.rafId = requestAnimationFrame(tick);

    return () => {
      ctx.revert();
      cancelAnimationFrame(mouseState.current.rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className="studio-galaxy-stage"
      aria-label="NextReach interactive showcase galaxy"
    >
      {/* Warm Ambient Nebula & Luminous Glows */}
      <div className="studio-galaxy-nebula" aria-hidden="true">
        <div className="studio-nebula-core"></div>
        <div className="studio-nebula-ambient-tl"></div>
        <div className="studio-nebula-ambient-br"></div>
      </div>

      {/* Cosmic Orbital Rings */}
      <div className="studio-galaxy-orbits" aria-hidden="true">
        <div className="studio-orbit-ring studio-orbit-outer"></div>
        <div className="studio-orbit-ring studio-orbit-inner"></div>
      </div>

      {/* Twinkling Star Dust Particles */}
      <div className="studio-galaxy-sparkles" aria-hidden="true">
        {[
          { top: "14%", left: "18%", delay: "0.2s", size: 14 },
          { top: "22%", left: "42%", delay: "1.4s", size: 10 },
          { top: "18%", right: "24%", delay: "0.8s", size: 16 },
          { top: "35%", right: "12%", delay: "2.1s", size: 12 },
          { bottom: "28%", left: "15%", delay: "1.8s", size: 13 },
          { bottom: "16%", left: "38%", delay: "0.5s", size: 15 },
          { bottom: "22%", right: "18%", delay: "2.4s", size: 14 },
          { bottom: "38%", right: "32%", delay: "1.1s", size: 11 },
          { top: "48%", left: "8%", delay: "1.9s", size: 12 },
          { top: "52%", right: "6%", delay: "0.9s", size: 13 },
        ].map((star, i) => (
          <span
            key={i}
            className="studio-sparkle-star"
            style={{
              top: star.top,
              left: star.left,
              right: star.right,
              bottom: star.bottom,
              animationDelay: star.delay,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
          >
            <SparkleIcon size={star.size} weight="fill" />
          </span>
        ))}
      </div>

      {/* DESKTOP 3D GALAXY ORBITAL CARDS */}
      <div
        ref={cardsContainerRef}
        className="studio-galaxy-desktop-cards"
        aria-hidden={isMobile ? "true" : "false"}
      >
        {GALAXY_CARDS.map((card, idx) => {
          const Icon = card.icon;
          const isHovered = hoveredCard === card.id;

          return (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className={`studio-galaxy-card-anchor studio-pos-${card.position}`}
              style={
                {
                  "--initial-rot": `${card.initialRotate}deg`,
                  "--card-depth": card.depth,
                } as React.CSSProperties
              }
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`studio-galaxy-card ${isHovered ? "is-hovered" : ""}`}
              >
                {/* Specular Liquid Glass Sheen */}
                <div className="studio-galaxy-card-sheen" aria-hidden="true" />

                {/* Floating Meta Header Badge */}
                <div className="studio-card-glass-header">
                  <div className="studio-card-badge-pill">
                    <span
                      className="studio-card-status-dot"
                      style={{ backgroundColor: card.accentColor }}
                    />
                    <span>{card.badge}</span>
                  </div>
                  <div className="studio-card-metric-pill">
                    <span>{card.metric}</span>
                  </div>
                </div>

                {/* Artwork Preview Screen */}
                <div className="studio-galaxy-card-preview">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="studio-card-img"
                    width={480}
                    height={300}
                    loading={idx < 2 ? "eager" : "lazy"}
                    decoding={idx < 2 ? "sync" : "async"}
                    draggable={false}
                  />
                  <div className="studio-card-preview-vignette" />
                </div>

                {/* Card Glass Footer */}
                <div className="studio-card-glass-footer">
                  <div className="studio-card-info">
                    <div className="studio-card-pillar-tag">
                      <Icon size={12} weight="bold" />
                      <span>{card.pillar}</span>
                    </div>
                    <h3 className="studio-card-title">{card.title}</h3>
                  </div>

                  <a
                    href={card.href}
                    className="studio-card-explore-btn"
                    aria-label={`Explore ${card.title}`}
                    onClick={(e) => handleCardClick(e, card)}
                  >
                    <ArrowUpRightIcon size={14} weight="bold" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MOBILE TUNED LIQUID GLASS REEL (Screen < 900px, 0 Lag, High LCP) */}
      <div
        className="studio-galaxy-mobile-deck"
        aria-hidden={!isMobile ? "true" : "false"}
      >
        <div className="studio-mobile-deck-header">
          <div className="studio-mobile-deck-label">
            <span className="studio-deck-dot" />
            <span>Interactive Flagship Suite</span>
          </div>
          <div className="studio-mobile-deck-hint">
            <span>Swipe to explore</span>
          </div>
        </div>

        {/* Smooth Horizontal Touch Snap Swiper */}
        <div
          ref={mobileReelRef}
          className="studio-mobile-reel"
          onScroll={handleMobileScroll}
        >
          {GALAXY_CARDS.map((card, idx) => {
            const Icon = card.icon;
            const isActive = activeMobileIdx === idx;

            return (
              <div
                key={card.id}
                className={`studio-mobile-card ${isActive ? "is-active" : ""}`}
              >
                <div className="studio-mobile-card-top">
                  <div className="studio-card-badge-pill">
                    <span
                      className="studio-card-status-dot"
                      style={{ backgroundColor: card.accentColor }}
                    />
                    <span>{card.badge}</span>
                  </div>
                  <span className="studio-card-metric-pill">{card.metric}</span>
                </div>

                <div className="studio-mobile-card-img-wrap">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="studio-mobile-card-img"
                    width={360}
                    height={225}
                    loading={idx === 0 ? "eager" : "lazy"}
                    decoding={idx === 0 ? "sync" : "async"}
                  />
                  <div className="studio-card-preview-vignette" />
                </div>

                <div className="studio-mobile-card-details">
                  <div className="studio-card-pillar-tag">
                    <Icon size={12} weight="bold" />
                    <span>{card.pillar}</span>
                  </div>
                  <h3 className="studio-mobile-card-title">{card.title}</h3>
                  <p className="studio-mobile-card-desc">{card.description}</p>
                </div>

                <a
                  href={card.href}
                  className="studio-mobile-card-action"
                  onClick={(e) => handleCardClick(e, card)}
                >
                  <span>Explore experience</span>
                  <ArrowUpRightIcon size={14} weight="bold" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Mobile Indicator Dots */}
        <div className="studio-mobile-dots" role="tablist">
          {GALAXY_CARDS.map((card, idx) => (
            <button
              key={card.id}
              type="button"
              className={`studio-mobile-dot ${activeMobileIdx === idx ? "is-active" : ""}`}
              onClick={() => scrollToCard(idx)}
              aria-label={`Show ${card.title}`}
              aria-selected={activeMobileIdx === idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
