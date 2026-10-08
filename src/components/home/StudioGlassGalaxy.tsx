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
import { curtains, iris } from "@/utils/curtains";

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
  // Unique 3D trajectory parameters for Reveal
  revealFrom: {
    x: number;
    y: number;
    z: number;
    rotateX: number;
    rotateY: number;
    rotateZ: number;
  };
  // Unique 3D trajectory parameters for Scroll Fly-Out
  scrollFly: {
    x: number;
    y: number;
    z: number;
    rotateX: number;
    rotateY: number;
    rotateZ: number;
    scale: number;
  };
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
    depth: 1.2,
    initialRotate: -3.5,
    accentColor: "#df896b",
    icon: DeviceMobileIcon,
    revealFrom: {
      x: -360,
      y: -220,
      z: -700,
      rotateX: 35,
      rotateY: -50,
      rotateZ: -20,
    },
    scrollFly: {
      x: -320,
      y: -200,
      z: 500,
      rotateX: 25,
      rotateY: -40,
      rotateZ: -14,
      scale: 1.35,
    },
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
    depth: 0.95,
    initialRotate: 3.2,
    accentColor: "#f2b397",
    icon: GlobeIcon,
    revealFrom: {
      x: 380,
      y: -240,
      z: -650,
      rotateX: 30,
      rotateY: 48,
      rotateZ: 20,
    },
    scrollFly: {
      x: 340,
      y: -210,
      z: 460,
      rotateX: 20,
      rotateY: 42,
      rotateZ: 15,
      scale: 1.35,
    },
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
    revealFrom: {
      x: 360,
      y: 280,
      z: -800,
      rotateX: -38,
      rotateY: 45,
      rotateZ: -16,
    },
    scrollFly: {
      x: 330,
      y: 260,
      z: 520,
      rotateX: -28,
      rotateY: 36,
      rotateZ: -12,
      scale: 1.4,
    },
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
    depth: 1.0,
    initialRotate: 3.8,
    accentColor: "#df896b",
    icon: CrownIcon,
    revealFrom: {
      x: -370,
      y: 260,
      z: -750,
      rotateX: -35,
      rotateY: -45,
      rotateZ: 18,
    },
    scrollFly: {
      x: -330,
      y: 240,
      z: 480,
      rotateX: -24,
      rotateY: -36,
      rotateZ: 14,
      scale: 1.38,
    },
  },
];

export default function StudioGlassGalaxy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nebulaCoreRef = useRef<HTMLDivElement>(null);
  const orbitsRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);
  const cardMotionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardTiltRefs = useRef<(HTMLDivElement | null)[]>([]);
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

  // Card click with Iris transition
  const handleCardClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    card: GalaxyCardItem
  ) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
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

  // Advanced 3D Reveal and Scroll Parallax Animations
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 900) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const motionEls = cardMotionRefs.current.filter(Boolean) as HTMLDivElement[];
    const heroSection = document.querySelector(".studio-hero") as HTMLElement;
    const heroTitle = document.querySelector("#hero-title") as HTMLElement;
    const heroDesc = document.querySelector(".studio-hero-description") as HTMLElement;
    const heroActions = document.querySelector(".studio-hero-actions") as HTMLElement;
    const heroIndex = document.querySelector(".studio-hero-index") as HTMLElement;
    const heroFoot = document.querySelector(".studio-hero-foot") as HTMLElement;

    let ctx: any = null;
    let stRef: any = null;

    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      stRef = ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
      // =========================================================================
      // 1. MASTER 3D REVEAL TIMELINE
      // =========================================================================
      const revealTl = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => {
          // Start subtle zero-G floating drift once reveal completes
          motionEls.forEach((el, i) => {
            const periods = [4.3, 5.2, 4.7, 5.5];
            const yAmps = [8, 9, 7, 8];
            const rotAmps = [1.2, 1.5, 1.1, 1.4];

            gsap.to(el, {
              y: `+=${yAmps[i % 4]}`,
              rotationZ: `+=${rotAmps[i % 4]}`,
              duration: periods[i % 4],
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
            });
          });
        },
      });

      // A. Nebula Core Expansion
      if (nebulaCoreRef.current) {
        gsap.set(nebulaCoreRef.current, { scale: 0.25, opacity: 0 });
        revealTl.to(
          nebulaCoreRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 1.6,
            ease: "power2.out",
          },
          0
        );
      }

      // B. Orbital Rings Fade & Unfurl
      if (orbitsRef.current) {
        gsap.set(orbitsRef.current, { scale: 0.6, opacity: 0, rotate: -25 });
        revealTl.to(
          orbitsRef.current,
          {
            scale: 1,
            opacity: 0.85,
            rotate: 0,
            duration: 1.8,
            ease: "power3.out",
          },
          0.1
        );
      }

      // C. Sparkles Staggered Twinkle Appearance
      if (sparklesRef.current) {
        gsap.set(sparklesRef.current, { opacity: 0 });
        revealTl.to(
          sparklesRef.current,
          { opacity: 1, duration: 1.2, ease: "power2.out" },
          0.3
        );
      }

      // D. Central Typography 3D Perspective Unfold
      if (heroTitle) {
        const titleSpans = heroTitle.querySelectorAll("span");
        if (titleSpans.length > 0) {
          gsap.set(titleSpans, {
            y: 70,
            rotateX: 45,
            z: -120,
            opacity: 0,
            filter: "blur(12px)",
            transformPerspective: 1000,
          });

          revealTl.to(
            titleSpans,
            {
              y: 0,
              rotateX: 0,
              z: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.3,
              stagger: 0.12,
              ease: "power4.out",
            },
            0.15
          );
        }
      }

      // E. Hero Description, CTAs, Index & Foot
      const subElements = [heroDesc, heroActions, heroIndex, heroFoot].filter(Boolean);
      if (subElements.length > 0) {
        gsap.set(subElements, { y: 35, opacity: 0 });
        revealTl.to(
          subElements,
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.08,
            ease: "power3.out",
          },
          0.35
        );
      }

      // F. The 4 Glass Galaxy Cards Swoop in from Deep 3D Space
      motionEls.forEach((motionEl, i) => {
        const item = GALAXY_CARDS[i];
        if (!motionEl || !item) return;

        // Set initial distant 3D cosmic coordinates
        gsap.set(motionEl, {
          x: item.revealFrom.x,
          y: item.revealFrom.y,
          z: item.revealFrom.z,
          rotateX: item.revealFrom.rotateX,
          rotateY: item.revealFrom.rotateY,
          rotateZ: item.revealFrom.rotateZ,
          scale: 0.35,
          opacity: 0,
          filter: "blur(18px)",
          transformPerspective: 1200,
          transformStyle: "preserve-3d",
        });

        // Swoop forward into orbital resting slot
        revealTl.to(
          motionEl,
          {
            x: 0,
            y: 0,
            z: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: item.initialRotate,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.45,
            ease: "power4.out",
          },
          0.25 + i * 0.1
        );
      });

      // =========================================================================
      // 2. 3D SCROLL PARALLAX GALAXY WARP (Camera Dive)
      // =========================================================================
      if (heroSection) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "bottom top",
            scrub: 1.1,
            invalidateOnRefresh: true,
          },
        });

        // A. 3D Warp Fly-Out for the 4 Cards
        motionEls.forEach((motionEl, i) => {
          const item = GALAXY_CARDS[i];
          if (!motionEl || !item) return;

          scrollTl.to(
            motionEl,
            {
              x: item.scrollFly.x,
              y: item.scrollFly.y,
              z: item.scrollFly.z,
              rotateX: item.scrollFly.rotateX,
              rotateY: item.scrollFly.rotateY,
              rotateZ: item.scrollFly.rotateZ,
              scale: item.scrollFly.scale,
              opacity: 0,
              ease: "none",
            },
            0
          );
        });

        // B. Headline 3D Forward Push (flies toward camera then fades)
        if (heroTitle) {
          scrollTl.to(
            heroTitle,
            {
              z: 160,
              y: 50,
              scale: 1.1,
              opacity: 0,
              ease: "none",
            },
            0
          );
        }

        // C. Description, CTAs & Index fade out
        if (subElements.length > 0) {
          scrollTl.to(
            subElements,
            {
              y: 60,
              opacity: 0,
              ease: "none",
              stagger: 0.03,
            },
            0
          );
        }

        // D. Nebula Expansion & Dissolve
        if (nebulaCoreRef.current) {
          scrollTl.to(
            nebulaCoreRef.current,
            {
              scale: 1.45,
              opacity: 0.12,
              ease: "none",
            },
            0
          );
        }

        // E. Orbital Rings Expansion
        if (orbitsRef.current) {
          scrollTl.to(
            orbitsRef.current,
            {
              scale: 1.5,
              opacity: 0,
              rotate: 35,
              ease: "none",
            },
            0
          );
        }
      }
      }, containerRef);
    });

    // =========================================================================
    // 3. DESKTOP 3D MOUSE PARALLAX & SPECULAR SHEEN (Tilt Wrapper)
    // =========================================================================
    const tiltEls = cardTiltRefs.current.filter(Boolean) as HTMLDivElement[];

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseState.current.targetX = (e.clientX / innerWidth - 0.5) * 2;
      mouseState.current.targetY = (e.clientY / innerHeight - 0.5) * 2;

      // Update card specular sheen
      tiltEls.forEach((card) => {
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
      state.currentX += (state.targetX - state.currentX) * 0.08;
      state.currentY += (state.targetY - state.currentY) * 0.08;

      tiltEls.forEach((card, i) => {
        const item = GALAXY_CARDS[i];
        if (!card || !item) return;

        const tiltX = -state.currentY * 8;
        const tiltY = state.currentX * 8;
        const moveX = state.currentX * 20 * item.depth;
        const moveY = state.currentY * 16 * item.depth;

        card.style.transform = `translate3d(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px, 0) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
      });

      mouseState.current.rafId = requestAnimationFrame(tick);
    };

    mouseState.current.rafId = requestAnimationFrame(tick);

    return () => {
      if (ctx) ctx.revert();
      cancelAnimationFrame(mouseState.current.rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (stRef) stRef.getAll().forEach((t: any) => t.kill());
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
        <div ref={nebulaCoreRef} className="studio-nebula-core"></div>
        <div className="studio-nebula-ambient-tl"></div>
        <div className="studio-nebula-ambient-br"></div>
      </div>

      {/* Cosmic Orbital Rings */}
      <div ref={orbitsRef} className="studio-galaxy-orbits" aria-hidden="true">
        <div className="studio-orbit-ring studio-orbit-outer"></div>
        <div className="studio-orbit-ring studio-orbit-inner"></div>
      </div>

      {/* Twinkling Star Dust Particles */}
      <div ref={sparklesRef} className="studio-galaxy-sparkles" aria-hidden="true">
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
        className="studio-galaxy-desktop-cards"
        aria-hidden={isMobile ? "true" : "false"}
      >
        {GALAXY_CARDS.map((card, idx) => {
          const Icon = card.icon;
          const isHovered = hoveredCard === card.id;

          return (
            <div
              key={card.id}
              className={`studio-galaxy-card-anchor studio-pos-${card.position}`}
            >
              {/* GSAP 3D Motion Wrapper (Controlled by GSAP for 3D Reveal and Scroll Fly-Out) */}
              <div
                ref={(el) => {
                  cardMotionRefs.current[idx] = el;
                }}
                className="studio-galaxy-card-motion"
              >
                {/* Mouse Tilt & Liquid Glass Container */}
                <div
                  ref={(el) => {
                    cardTiltRefs.current[idx] = el;
                  }}
                  className={`studio-galaxy-card ${isHovered ? "is-hovered" : ""}`}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Specular Liquid Glass Sheen */}
                  <div className="studio-galaxy-card-sheen" aria-hidden="true" />

                  {/* Refined Minimalist Header */}
                  <div className="studio-card-glass-header">
                    <div className="studio-card-tag-minimal">
                      <span
                        className="studio-card-status-dot"
                        style={{ backgroundColor: card.accentColor }}
                      />
                      <span>{card.badge}</span>
                    </div>
                    <div className="studio-card-metric-tag">
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
                      loading="lazy"
                      decoding="async"
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
                  <div className="studio-card-tag-minimal">
                    <span
                      className="studio-card-status-dot"
                      style={{ backgroundColor: card.accentColor }}
                    />
                    <span>{card.badge}</span>
                  </div>
                  <span className="studio-card-metric-tag">{card.metric}</span>
                </div>

                <div className="studio-mobile-card-img-wrap">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="studio-mobile-card-img"
                    width={360}
                    height={225}
                    loading="lazy"
                    decoding="async"
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
        <div className="studio-mobile-dots" role="group" aria-label="Choose showcase">
          {GALAXY_CARDS.map((card, idx) => (
            <button
              key={card.id}
              type="button"
              className={`studio-mobile-dot ${activeMobileIdx === idx ? "is-active" : ""}`}
              onClick={() => scrollToCard(idx)}
              aria-label={`Show ${card.title}`}
              aria-current={activeMobileIdx === idx ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
