/**
 * NextReach Studio — Curtains: Iris from Click Engine
 * 
 * Inspired by Motion+ (motion.dev) "Curtains: Iris from click" (Matt Perry).
 * Provides a GPU-accelerated cover-then-reveal iris page & element transition system
 * where a circular aperture expands outward directly from the pointer's click position.
 */

export interface IrisOrigin {
  x: number; // Raw pixels or fraction (0..1)
  y: number; // Raw pixels or fraction (0..1)
}

export interface IrisOptions {
  origin?: IrisOrigin;
  duration?: number; // In seconds (default: 0.50)
  easing?: string;
  label?: string;
  accentColor?: string;
}

export type IrisEffect = {
  name: string;
  durationMs: number;
  options: IrisOptions;
  cover: (targetOrigin?: IrisOrigin, label?: string) => Promise<void>;
  reveal: (targetOrigin?: IrisOrigin) => Promise<void>;
};

export interface CurtainsOptions {
  effect?: IrisEffect;
  href?: string;
  label?: string;
  onCovered?: () => void | Promise<void>;
}

const STORAGE_KEY = "nextreach_iris_transition";

/**
 * Resolves pixel coordinates from either fraction (0..1) or absolute pixels.
 */
function resolveCoords(origin?: IrisOrigin): { x: number; y: number } {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1920;
  const vh = typeof window !== "undefined" ? window.innerHeight : 1080;

  if (!origin) {
    return { x: vw / 2, y: vh / 2 };
  }

  const x = origin.x <= 1 && origin.x >= 0 ? origin.x * vw : origin.x;
  const y = origin.y <= 1 && origin.y >= 0 ? origin.y * vh : origin.y;

  return { x, y };
}

/**
 * Calculates the exact radius required to fully envelop the viewport from (x, y).
 */
function getEnvelopingRadius(x: number, y: number): number {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  return Math.hypot(Math.max(x, vw - x), Math.max(y, vh - y)) + 48;
}

/**
 * Ensures or retrieves the global top-layer Iris curtain element.
 */
function getOrCreateCurtain(): {
  overlay: HTMLElement;
  curtain: HTMLElement;
  ring: HTMLElement;
  hud: HTMLElement;
  hudTitle: HTMLElement;
  hudTag: HTMLElement;
} {
  let overlay = document.getElementById("nextreach-iris-portal");

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "nextreach-iris-portal";
    overlay.className = "iris-portal";
    overlay.setAttribute("aria-hidden", "true");

    // Attempt Popover API for true top-layer elevation without z-index fighting
    if ("showPopover" in HTMLElement.prototype) {
      try {
        overlay.setAttribute("popover", "manual");
      } catch {
        // Fallback to high z-index fixed portal
      }
    }

    overlay.innerHTML = `
      <div class="iris-curtain-backdrop"></div>
      <div class="iris-curtain-ring"></div>
      <div class="iris-curtain-hud">
        <div class="iris-hud-badge">
          <span class="iris-hud-dot"></span>
          <span class="iris-hud-tag">PAGE TRANSITION</span>
        </div>
        <h2 class="iris-hud-title">NextReach Studio</h2>
        <div class="iris-hud-track"><div class="iris-hud-bar"></div></div>
      </div>
    `;

    document.body.appendChild(overlay);
  }

  const curtain = overlay.querySelector(".iris-curtain-backdrop") as HTMLElement;
  const ring = overlay.querySelector(".iris-curtain-ring") as HTMLElement;
  const hud = overlay.querySelector(".iris-hud") as HTMLElement;
  const hudTitle = overlay.querySelector(".iris-hud-title") as HTMLElement;
  const hudTag = overlay.querySelector(".iris-hud-tag") as HTMLElement;

  return { overlay, curtain, ring, hud, hudTitle, hudTag };
}

/**
 * Factory for creating an Iris transition effect from the pointer position.
 * Mirrors Motion+ `iris({ origin: { x, y } })`.
 */
export function iris(options: IrisOptions = {}) {
  const durationSec = options.duration ?? 0.50; // 0.50s matching Motion+ reference
  const durationMs = durationSec * 1000;
  const easing = options.easing ?? "cubic-bezier(0.22, 1, 0.36, 1)";

  return {
    name: "iris",
    durationMs,
    options,
    cover: async (targetOrigin?: IrisOrigin, label?: string) => {
      if (typeof window === "undefined") return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const origin = targetOrigin || options.origin;
      const { x, y } = resolveCoords(origin);
      const maxRadius = getEnvelopingRadius(x, y);

      const { overlay, curtain, ring, hudTitle, hudTag } = getOrCreateCurtain();

      if (label && hudTitle) {
        hudTitle.textContent = label;
      }
      if (options.label && hudTag) {
        hudTag.textContent = options.label.toUpperCase();
      }

      // Show overlay in top layer
      overlay.classList.add("is-active");
      if ("showPopover" in overlay && !overlay.matches(":popover-open")) {
        try {
          overlay.showPopover();
        } catch {
          // ignore popover state error
        }
      }

      if (reducedMotion) {
        curtain.style.clipPath = "none";
        curtain.style.opacity = "1";
        return;
      }

      // Position glowing wavefront ring at pointer origin
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
      ring.style.width = "0px";
      ring.style.height = "0px";
      ring.style.opacity = "1";

      // 1. Animate curtain circle clip-path expanding outward
      const curtainAnim = curtain.animate(
        [
          { clipPath: `circle(0px at ${x}px ${y}px)`, opacity: 1 },
          { clipPath: `circle(${maxRadius}px at ${x}px ${y}px)`, opacity: 1 },
        ],
        {
          duration: durationMs,
          easing,
          fill: "forwards",
        }
      );

      // 2. Animate luminous rose-gold wavefront ring
      const ringAnim = ring.animate(
        [
          {
            width: "0px",
            height: "0px",
            opacity: 1,
            transform: "translate(-50%, -50%) scale(1)",
            borderColor: "rgba(242, 179, 151, 1)",
            boxShadow: "0 0 50px rgba(223, 137, 107, 0.95), inset 0 0 25px rgba(223, 137, 107, 0.6)",
          },
          {
            width: `${maxRadius * 2}px`,
            height: `${maxRadius * 2}px`,
            opacity: 0.65,
            transform: "translate(-50%, -50%) scale(1)",
            borderColor: "rgba(223, 137, 107, 0.5)",
            boxShadow: "0 0 70px rgba(223, 137, 107, 0.4), inset 0 0 35px rgba(223, 137, 107, 0.2)",
          },
        ],
        {
          duration: durationMs,
          easing,
          fill: "forwards",
        }
      );

      await Promise.all([curtainAnim.finished, ringAnim.finished]);
    },

    reveal: async (targetOrigin?: IrisOrigin) => {
      if (typeof window === "undefined") return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const { overlay, curtain, ring } = getOrCreateCurtain();

      if (reducedMotion) {
        overlay.classList.remove("is-active");
        if ("hidePopover" in overlay && overlay.matches(":popover-open")) {
          try { overlay.hidePopover(); } catch { /* ignore */ }
        }
        return;
      }

      const origin = targetOrigin || options.origin;
      const { x, y } = resolveCoords(origin);
      const maxRadius = getEnvelopingRadius(x, y);

      // Fade wavefront ring
      ring.animate([{ opacity: 0.6 }, { opacity: 0 }], {
        duration: 250,
        fill: "forwards",
      });

      // Aperture reveal / smooth contraction from center
      const revealAnim = curtain.animate(
        [
          {
            clipPath: `circle(${maxRadius}px at ${x}px ${y}px)`,
            opacity: 1,
            transform: "scale(1)",
          },
          {
            clipPath: `circle(0px at ${x}px ${y}px)`,
            opacity: 0.4,
            transform: "scale(1.02)",
          },
        ],
        {
          duration: durationMs * 0.9,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          fill: "forwards",
        }
      );

      await revealAnim.finished;

      overlay.classList.remove("is-active");
      if ("hidePopover" in overlay && overlay.matches(":popover-open")) {
        try {
          overlay.hidePopover();
        } catch {
          // ignore
        }
      }
    },
  };
}

/**
 * Standalone Curtains executor.
 * Covers the view with Iris effect from click, executes callback or navigation,
 * then reveals the new view.
 */
export async function curtains(
  update?: () => void | Promise<void>,
  options: CurtainsOptions = {}
): Promise<void> {
  if (typeof window === "undefined") return;

  const irisEffect = options.effect || iris();
  const origin = irisEffect.options.origin;
  const label = options.label || "NextReach Studio";

  // Step 1: Cover view with expanding Iris circle
  await irisEffect.cover(origin, label);

  // If this was an external or full page navigation
  if (options.href) {
    try {
      const coords = resolveCoords(origin);
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          x: coords.x,
          y: coords.y,
          label,
          time: Date.now(),
        })
      );
    } catch {
      // ignore storage failure
    }

    if (options.onCovered) {
      await options.onCovered();
    }

    window.location.href = options.href;
    return;
  }

  // Step 2: Perform state update while fully covered
  if (update) {
    await update();
  }
  if (options.onCovered) {
    await options.onCovered();
  }

  // Allow one RAF tick for React / DOM to commit
  await new Promise((resolve) => requestAnimationFrame(resolve));

  // Step 3: Reveal view
  await irisEffect.reveal(origin);
}

/**
 * Initializes automatic reveal on page loads if an Iris transition was stored,
 * and sets up global click handler on eligible links.
 */
export function initCurtainsPageTransitions(): void {
  if (typeof window === "undefined") return;

  // Check for inbound Iris reveal from previous page
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      sessionStorage.removeItem(STORAGE_KEY);
      const data = JSON.parse(raw);
      if (Date.now() - data.time < 5000) {
        const effect = iris({
          origin: { x: data.x, y: data.y },
          duration: 0.45,
        });

        // Set curtain initially fully covering, then reveal
        const { overlay, curtain } = getOrCreateCurtain();
        overlay.classList.add("is-active");
        if ("showPopover" in overlay) {
          try { overlay.showPopover(); } catch { /* ignore */ }
        }
        curtain.style.opacity = "1";
        curtain.style.clipPath = `circle(150% at ${data.x}px ${data.y}px)`;

        requestAnimationFrame(() => {
          effect.reveal({ x: data.x, y: data.y });
        });
      }
    }
  } catch {
    // ignore
  }

  // Delegate click handler for internal links & interactive triggers
  document.addEventListener("click", (e: MouseEvent) => {
    // Ignore modified clicks (cmd, ctrl, shift, right-click)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }

    const target = (e.target as HTMLElement)?.closest("a[href]") as HTMLAnchorElement | null;
    if (!target) return;

    // Check if target has explicit opt-out
    if (target.dataset.noTransition !== undefined || target.target === "_blank") {
      return;
    }

    const href = target.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
      return;
    }

    // Only handle internal links on same origin
    const url = new URL(target.href, window.location.origin);
    if (url.origin !== window.location.origin) {
      return;
    }

    // If navigating to the exact current page + hash, let anchor smooth scroll handle it
    if (url.pathname === window.location.pathname && url.search === window.location.search) {
      return;
    }

    e.preventDefault();

    const label = target.getAttribute("data-transition-label") || target.innerText.trim().slice(0, 32) || "Loading...";

    curtains(undefined, {
      href: target.href,
      label,
      effect: iris({
        origin: { x: e.clientX, y: e.clientY },
        duration: 0.50,
      }),
    });
  });
}

/**
 * React 19 hook matching Motion+ `useCurtains()`.
 */
export function useCurtains() {
  return curtains;
}
