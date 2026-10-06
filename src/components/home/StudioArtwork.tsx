"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  CaretLeftIcon,
  CaretRightIcon,
  PauseIcon,
  PlayIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  image: string;
  href: string;
  description: string;
}

const studioProjects: ProjectItem[] = [
  {
    id: "saffron-and-smoke",
    title: "Saffron & Smoke",
    category: "Luxury Dining Flagship",
    badge: "₹10,000 Tier",
    image: "/assets/demos/saffron-and-smoke/hero-dish.jpg",
    href: "/demos/saffron-and-smoke",
    description: "Cinematic reservation platform & direct WhatsApp concierge for upscale dining.",
  },
  {
    id: "kpi-command",
    title: "NextReach KPI Command",
    category: "SME Admin & Operations",
    badge: "Custom Web App",
    image: "/kpi_dashboard.png",
    href: "/portfolio",
    description: "Real-time KPI dashboard syncing operations data nightly from disparate APIs.",
  },
  {
    id: "oak-and-elm",
    title: "Oak & Elm Integrative Clinic",
    category: "Healthcare & Wellness",
    badge: "₹7,500 Tier",
    image: "/assets/demos/business-clinic.jpg",
    href: "/industries/healthcare",
    description: "Medical practice portal with practitioner directories and direct WhatsApp booking.",
  },
  {
    id: "ai-agents-suite",
    title: "Autonomous Agent Suite",
    category: "AI Agents & Automation",
    badge: "Production AI",
    image: "/assets/bento-ai-workflow.webp",
    href: "/services/ai-agent-development-pune",
    description: "Autonomous multi-agent customer routing & back-office automation system.",
  },
  {
    id: "vayu-living",
    title: "Vayu Architectural Living",
    category: "Luxury Real Estate",
    badge: "₹10,000 Tier",
    image: "/assets/demos/premium-vayu.jpg",
    href: "/industries/real-estate",
    description: "High-conversion architectural portfolio with 3-day turnaround and zero bloat.",
  },
  {
    id: "lead-portal",
    title: "Client Acquisition Engine",
    category: "Enterprise Lead Portal",
    badge: "Growth System",
    image: "/lead_portal.png",
    href: "/portfolio",
    description: "Multi-step quotation engine and qualification funnel converting cold visitors.",
  },
  {
    id: "alex-chen",
    title: "Alex Chen Creative Studio",
    category: "Creator Economy Flagship",
    badge: "₹5,000 Tier",
    image: "/assets/demos/quick-launch.jpg",
    href: "/fast-websites",
    description: "High-impact single-page storefront with case study drawers & WhatsApp booking.",
  },
  {
    id: "crew-dispatch",
    title: "Field Crew & Dispatch",
    category: "Mobile Logistics System",
    badge: "Production App",
    image: "/scheduling_app.png",
    href: "/portfolio",
    description: "Shift scheduling calendar and dispatch logs for mobile field teams.",
  },
  {
    id: "web-apps-core",
    title: "NextReach Application Core",
    category: "Modern Full-Stack Systems",
    badge: "Custom SaaS",
    image: "/assets/bento-web-apps.webp",
    href: "/services/web-application-development-pune",
    description: "Production web applications with edge deployment and 100% source code ownership.",
  },
  {
    id: "inventory-pipeline",
    title: "Order & Inventory Pipeline",
    category: "Wholesale Trade Automation",
    badge: "Operations Engine",
    image: "/inventory_workflow.png",
    href: "/portfolio",
    description: "Automated lead-to-order workflow extracting orders and updating inventory live.",
  },
];

const N = studioProjects.length;
const ANGLE_STEP = 360 / N; // 36 degrees per slot

export default function StudioArtwork() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cylinderRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [ready, setReady] = useState(false);

  // High-frequency animation values kept in refs for zero-lag 60fps GPU rendering
  const rotationRef = useRef(0);
  const targetRotationRef = useRef<number | null>(null);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const isPausedRef = useRef(false);
  const lastActiveIndexRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const dragRef = useRef({
    startX: 0,
    startY: 0,
    startRot: 0,
    lastX: 0,
    lastTime: 0,
    hasMoved: false,
  });

  const dimensionsRef = useRef({
    cardWidth: 320,
    cardHeight: 420,
    radius: 560,
  });

  // Calculate dynamic dimensions and cylinder radius
  const updateDimensions = useCallback(() => {
    if (!stageRef.current) return;
    const stageW = stageRef.current.clientWidth || window.innerWidth;
    let cardW = 320;
    let cardH = 420;

    if (stageW < 640) {
      cardW = 205;
      cardH = 275;
    } else if (stageW < 1024) {
      cardW = 260;
      cardH = 350;
    }

    // Cylindrical polygon radius: r = (w/2) / tan(π/N)
    const baseRadius = (cardW / 2) / Math.tan(Math.PI / N);
    const radius = Math.round(baseRadius * 1.14);

    dimensionsRef.current = { cardWidth: cardW, cardHeight: cardH, radius };

    if (stageRef.current) {
      stageRef.current.style.setProperty("--card-w", `${cardW}px`);
      stageRef.current.style.setProperty("--card-h", `${cardH}px`);
    }

    // Apply radius to cards immediately
    cardsRef.current.forEach((card, idx) => {
      if (card) {
        const slotAngle = idx * ANGLE_STEP;
        card.style.transform = `rotateY(${slotAngle}deg) translateZ(${radius}px)`;
      }
    });
  }, []);

  // Center target rotation on requested card index
  const rotateToIndex = useCallback((index: number) => {
    const rawRot = rotationRef.current;
    let relAngle = ((index * ANGLE_STEP + rawRot) % 360);
    if (relAngle > 180) relAngle -= 360;
    if (relAngle < -180) relAngle += 360;

    targetRotationRef.current = rawRot - relAngle;
    velocityRef.current = 0;
  }, []);

  const handlePrev = useCallback(() => {
    const nextIdx = (lastActiveIndexRef.current - 1 + N) % N;
    rotateToIndex(nextIdx);
  }, [rotateToIndex]);

  const handleNext = useCallback(() => {
    const nextIdx = (lastActiveIndexRef.current + 1) % N;
    rotateToIndex(nextIdx);
  }, [rotateToIndex]);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => {
      const next = !prev;
      isPausedRef.current = next;
      return next;
    });
  }, []);

  // Card click handler: center if angled, or follow link if already in center focus
  const handleCardClick = (index: number) => {
    if (dragRef.current.hasMoved) return;

    let relAngle = ((index * ANGLE_STEP + rotationRef.current) % 360);
    if (relAngle > 180) relAngle -= 360;
    if (relAngle < -180) relAngle += 360;

    if (Math.abs(relAngle) < 14) {
      const proj = studioProjects[index];
      if (proj) window.location.href = proj.href;
    } else {
      rotateToIndex(index);
    }
  };

  useEffect(() => {
    updateDimensions();
    setReady(true);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      isPausedRef.current = true;
      setIsPaused(true);
    }

    const stageEl = stageRef.current;
    if (!stageEl) return;

    const ro = new ResizeObserver(() => updateDimensions());
    ro.observe(stageEl);

    // Mouse / Touch Drag Handlers
    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startRot: rotationRef.current,
        lastX: e.clientX,
        lastTime: performance.now(),
        hasMoved: false,
      };
      targetRotationRef.current = null;
      velocityRef.current = 0;
      stageEl.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = stageEl.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      pointerRef.current.targetX = nx * 2;
      pointerRef.current.targetY = ny * 2;

      if (!isDraggingRef.current) return;

      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      if (Math.hypot(dx, dy) > 6) {
        dragRef.current.hasMoved = true;
      }

      // Drag sensitivity: 1px = 0.22 degrees of rotation
      rotationRef.current = dragRef.current.startRot + dx * 0.22;

      const now = performance.now();
      const dt = now - dragRef.current.lastTime;
      if (dt > 8) {
        velocityRef.current = ((e.clientX - dragRef.current.lastX) / dt) * 16 * 0.22;
        dragRef.current.lastX = e.clientX;
        dragRef.current.lastTime = now;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      if (stageEl.hasPointerCapture(e.pointerId)) {
        stageEl.releasePointerCapture(e.pointerId);
      }

      if (!dragRef.current.hasMoved) {
        // Was a tap; let click handler take care of it
        return;
      }

      // If low release velocity, snap immediately to nearest card slot
      if (Math.abs(velocityRef.current) < 0.25) {
        const nearestSlot = Math.round(-rotationRef.current / ANGLE_STEP);
        targetRotationRef.current = -nearestSlot * ANGLE_STEP;
      }
    };

    // Keyboard navigation
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    // Wheel navigation (horizontal delta)
    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 4) return;
      targetRotationRef.current = null;
      rotationRef.current -= (delta / 100) * 8;
    };

    stageEl.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("keydown", onKeyDown);
    stageEl.addEventListener("wheel", onWheel, { passive: true });

    // Main 60fps Animation Loop
    let animId = 0;
    let lastTick = performance.now();

    const tick = (now: number) => {
      const delta = Math.min((now - lastTick) / 1000, 0.05);
      lastTick = now;

      // Smooth pointer parallax lerp
      pointerRef.current.x += (pointerRef.current.targetX - pointerRef.current.x) * 0.06;
      pointerRef.current.y += (pointerRef.current.targetY - pointerRef.current.y) * 0.06;

      if (isDraggingRef.current) {
        // Rotation driven directly by pointer movements
      } else if (targetRotationRef.current !== null) {
        // Smooth spring ease toward target slot
        const diff = targetRotationRef.current - rotationRef.current;
        if (Math.abs(diff) < 0.06) {
          rotationRef.current = targetRotationRef.current;
          targetRotationRef.current = null;
        } else {
          rotationRef.current += diff * 0.12;
        }
      } else {
        // Inertia decay
        if (Math.abs(velocityRef.current) > 0.02) {
          rotationRef.current += velocityRef.current;
          velocityRef.current *= 0.94;
          if (Math.abs(velocityRef.current) <= 0.02) {
            velocityRef.current = 0;
            // Snap to nearest slot
            const nearestSlot = Math.round(-rotationRef.current / ANGLE_STEP);
            targetRotationRef.current = -nearestSlot * ANGLE_STEP;
          }
        } else if (!isPausedRef.current && !isHoveredRef.current && !reduceMotion) {
          // Ambient slow continuous auto-rotation
          rotationRef.current -= 0.065 * (delta * 60);
        }
      }

      const rawRot = rotationRef.current;

      // Update active center card index
      const centerIdx = (((Math.round(-rawRot / ANGLE_STEP) % N) + N) % N);
      if (centerIdx !== lastActiveIndexRef.current) {
        lastActiveIndexRef.current = centerIdx;
        setActiveIndex(centerIdx);
      }

      // Apply 3D pitch/yaw tilt & cylinder rotation
      if (cylinderRef.current) {
        const pitch = -pointerRef.current.y * 5.5;
        const yaw = pointerRef.current.x * 4.5;
        cylinderRef.current.style.transform = `rotateX(${pitch.toFixed(2)}deg) rotateY(${(rawRot + yaw).toFixed(2)}deg)`;
      }

      // Update each card's depth, dimming, and visibility
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;

        let relAngle = ((idx * ANGLE_STEP + rawRot) % 360);
        if (relAngle > 180) relAngle -= 360;
        if (relAngle < -180) relAngle += 360;

        const absAngle = Math.abs(relAngle);

        if (absAngle > 96) {
          // Rear cards outside the visible 180° front arc are hidden
          card.style.opacity = "0";
          card.style.pointerEvents = "none";
        } else {
          // Front cylinder arc (matching the 3D coverflow screenshot!)
          const dist = absAngle / 90; // 0 at center, 1 at 90° edge
          const opacity = 1 - Math.pow(dist, 2.2) * 0.42;
          const scrimOpacity = Math.max(0, (absAngle - 10) / 80) * 0.72;

          card.style.opacity = opacity.toFixed(3);
          card.style.pointerEvents = "auto";
          card.style.zIndex = Math.round((1 - dist) * 100).toString();

          const scrimEl = card.querySelector<HTMLElement>(".studio-carousel-card-scrim");
          if (scrimEl) {
            scrimEl.style.opacity = scrimOpacity.toFixed(3);
          }

          const isCenter = absAngle < 16;
          card.classList.toggle("is-center", isCenter);
        }
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      stageEl.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("keydown", onKeyDown);
      stageEl.removeEventListener("wheel", onWheel);
    };
  }, [handleNext, handlePrev, rotateToIndex, updateDimensions]);

  const activeProject = studioProjects[activeIndex] ?? studioProjects[0];

  return (
    <div
      className={`studio-signal-art ${ready ? "is-ready" : ""}`}
      role="region"
      aria-label="NextReach Studio featured project carousel"
    >
      <div className="studio-signal-atmosphere" aria-hidden="true" />

      {/* 3D Perspective Stage */}
      <div
        ref={stageRef}
        className="studio-carousel-stage"
        tabIndex={0}
        aria-roledescription="carousel"
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
      >
        {/* Rotating 3D Cylinder Container */}
        <div ref={cylinderRef} className="studio-carousel-cylinder">
          {studioProjects.map((project, idx) => {
            const slotAngle = idx * ANGLE_STEP;
            const radius = dimensionsRef.current.radius;
            const isCenter = idx === activeIndex;

            return (
              <div
                key={project.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className={`studio-carousel-card ${isCenter ? "is-center" : ""}`}
                style={{
                  transform: `rotateY(${slotAngle}deg) translateZ(${radius}px)`,
                }}
                onClick={() => handleCardClick(idx)}
                role="group"
                aria-roledescription="slide"
                aria-label={`${project.title} - ${project.category}`}
              >
                {/* Project Showcase Artwork */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="studio-carousel-card-img"
                  loading="eager"
                  draggable={false}
                />

                {/* Ambient Dimming Vignette for Depth Curvature */}
                <div className="studio-carousel-card-scrim" aria-hidden="true" />

                {/* Floating Glassmorphic Metadata Overlay */}
                <div className="studio-carousel-card-meta">
                  <span className="studio-carousel-card-badge">{project.badge}</span>
                  <h3 className="studio-carousel-card-title">{project.title}</h3>
                  <a
                    href={project.href}
                    className="studio-carousel-card-cta"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Explore project</span>
                    <ArrowUpRightIcon size={13} weight="bold" aria-hidden="true" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Drag & Interactive Hint */}
      <div className="studio-carousel-hint" aria-hidden="true">
        <span>drag to rotate</span>
        <span>·</span>
        <span>click card to explore</span>
      </div>

      {/* Floating Controls Bar */}
      <div className="studio-carousel-controls">
        <button
          type="button"
          className="studio-carousel-btn"
          aria-label="Previous project"
          onClick={handlePrev}
        >
          <CaretLeftIcon size={18} weight="bold" aria-hidden="true" />
        </button>

        <div className="studio-carousel-counter">
          <span>{String(activeIndex + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span style={{ color: "var(--hero-signal-soft)" }}>{activeProject.title}</span>
        </div>

        <button
          type="button"
          className="studio-carousel-btn"
          aria-label="Next project"
          onClick={handleNext}
        >
          <CaretRightIcon size={18} weight="bold" aria-hidden="true" />
        </button>

        <button
          type="button"
          className="studio-carousel-btn"
          aria-label={isPaused ? "Resume auto rotation" : "Pause auto rotation"}
          aria-pressed={isPaused}
          onClick={togglePause}
        >
          {isPaused ? (
            <PlayIcon size={16} weight="fill" aria-hidden="true" />
          ) : (
            <PauseIcon size={16} weight="fill" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
