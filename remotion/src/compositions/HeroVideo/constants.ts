// Brand colors matching globals.css and site design
export const COLORS = {
  bgBase: "#050505",
  bgElevated: "#0a0a0a",
  bgSurface: "rgba(255, 255, 255, 0.03)",
  bgPanel: "rgba(255, 255, 255, 0.05)",

  textPrimary: "#ffffff",
  textSecondary: "#a1a1aa", // zinc-400
  textTertiary: "#71717a", // zinc-500
  textOnAmber: "#000000",

  accent: "#fbbf24", // amber-400
  accentHover: "#f59e0b", // amber-500
  accentGlow: "rgba(251, 191, 36, 0.15)",
  accentGradient: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",

  success: "#34d399", // emerald-400
  successGlow: "rgba(52, 211, 153, 0.15)",
  successGlowStrong: "rgba(52, 211, 153, 0.3)",

  callGreen: "#22c55e", // green-500

  border: "rgba(255, 255, 255, 0.06)",
  borderHover: "rgba(255, 255, 255, 0.1)",
};

// Glassmorphism styling matching globals.css .glass-panel
export const GLASS_STYLES = {
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.008) 100%)",
  border: "1px solid rgba(255, 255, 255, 0.06)",
  shadow:
    "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.015) inset",
  borderRadius: 16,
  borderRadiusLg: 24,
  borderRadiusXl: 32,
};

export const FONT_FAMILY =
  "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";

// Animation timing constants (15 seconds = 450 frames at 30fps)
export const FPS = 30;
export const TOTAL_DURATION = 450;

export const PHASES = {
  // Phase 1: 24/7 availability display
  phase1: {
    start: 0,
    duration: 90, // 0-3s
  },
  // Phase 2: Incoming call
  phase2: {
    start: 90,
    duration: 120, // 3-7s
  },
  // Phase 3: Chat conversation
  phase3: {
    start: 210,
    duration: 150, // 7-12s
  },
  // Phase 4: Calendar + loop transition
  phase4: {
    start: 360,
    duration: 90, // 12-15s
  },
};

// Composition dimensions
export const COMPOSITION = {
  width: 640,
  height: 480,
};

// Spring configs per Remotion best practices
export const SPRING_CONFIGS = {
  smooth: { damping: 200 }, // Smooth, no bounce (subtle reveals)
  snappy: { damping: 20, stiffness: 200 }, // Snappy, minimal bounce
  bouncy: { damping: 8 }, // Bouncy entrance
};

// Time display values for cycling animation
export const TIME_VALUES = [
  { time: "11:47 PM", label: "Midnight" },
  { time: "SAT 2:15 PM", label: "Weekend" },
  { time: "SUN 9:00 AM", label: "Morning" },
];

// Chat conversation messages
export const CHAT_MESSAGES = [
  {
    type: "user",
    text: "Do you have availability Saturday?",
    delay: 0,
  },
  {
    type: "ai",
    text: "Yes! I have 10am and 2pm open.",
    delay: 25,
    typing: true,
  },
  {
    type: "user",
    text: "2pm works!",
    delay: 55,
  },
  {
    type: "aiSuccess",
    text: "Booked! Sat at 2pm for Luna.",
    delay: 75,
  },
];