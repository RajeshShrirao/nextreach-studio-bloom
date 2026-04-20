import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Series,
  interpolateColors,
  Img,
  staticFile,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

// ─── PALETTE ─────────────────────────────────────────────────────────────
const C = {
  bg: "#000000",
  surface: "rgba(18, 18, 18, 0.7)",
  surfaceBorder: "rgba(255, 255, 255, 0.12)",
  white: "#ffffff",
  muted: "#a1a1aa",
  red: "#ef4444",
  redSoft: "rgba(239, 68, 68, 0.15)",
  redGlow: "rgba(239, 68, 68, 0.6)",
  green: "#22c55e",
  greenSoft: "rgba(34, 197, 94, 0.15)",
  greenGlow: "rgba(34, 197, 94, 0.6)",
  amber: "#fbbf24",
  amberGlow: "rgba(251, 191, 36, 0.4)",
  bubbleDark: "rgba(28, 28, 28, 0.95)",
  bubbleGreen: "rgba(34, 197, 94, 0.2)",
  divider: "rgba(255, 255, 255, 0.1)",
};

const FONT = { fontFamily };
const SPRING_HEAVY = { damping: 30, mass: 2, stiffness: 60 };
const FADE_DUR = 30;

// ─── DYNAMIC BACKGROUND LIGHTING ───────────────────────────────────────
const BackgroundGlow: React.FC<{ color: string; glowColor: string }> = ({
  color,
  glowColor,
}) => {
  const frame = useCurrentFrame();
  const rotate = interpolate(frame, [0, 1500], [0, 360]);

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: C.bg }}>
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "100vw",
          height: "100vw",
          background: `radial-gradient(circle, ${color} 0%, transparent 50%)`,
          filter: "blur(140px)",
          transform: `rotate(${rotate}deg) translate(50px, 50px)`,
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.05,
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

// ─── GLASS CARD ──────────────────────────────────────────────────────────
const Glass: React.FC<React.PropsWithChildren<{ style?: React.CSSProperties }>> = ({
  children,
  style,
}) => (
  <div
    style={{
      backgroundColor: C.surface,
      borderRadius: 36,
      border: `1px solid ${C.surfaceBorder}`,
      backdropFilter: "blur(40px)",
      WebkitBackdropFilter: "blur(40px)",
      boxShadow:
        "0 60px 120px rgba(0,0,0,0.9), inset 0 2px 0 rgba(255,255,255,0.15)",
      ...style,
    }}
  >
    {children}
  </div>
);

// ═══════════════════════════════════════════════════════════════════════
// SCENE 1: THE HOOK (240 Frames) - STRESS & URGENCY
// ═══════════════════════════════════════════════════════════════════════
const HookPain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const fadeOut = interpolate(
    frame,
    [durationInFrames - FADE_DUR, durationInFrames],
    [1, 0],
    { extrapolateRight: "clamp" }
  );
  const dolly = interpolate(frame, [0, durationInFrames], [1, 1.1]);

  const missedCalls = Math.min(
    6,
    Math.floor(
      interpolate(frame, [20, 160], [1, 6], { extrapolateRight: "clamp" })
    )
  );

  const shakeIntensity = interpolate(missedCalls, [1, 6], [0, 12]);
  const jitterX = Math.sin(frame * 1.5) * shakeIntensity;
  const jitterY = Math.cos(frame * 1.7) * shakeIntensity;

  const textSpring = spring({ frame: frame - 10, fps, config: SPRING_HEAVY });

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", opacity: fadeOut }}
    >
      <BackgroundGlow color={C.redSoft} glowColor={C.redGlow} />
      <div
        style={{
          transform: `scale(${dolly}) translate(${jitterX}px, ${jitterY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            backgroundColor: C.redSoft,
            margin: "0 auto 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 ${shakeIntensity * 10}px ${C.redGlow}`,
            transform: `rotate(${Math.sin(frame * 0.8) * shakeIntensity * 2}deg)`,
          }}
        >
          <span style={{ fontSize: 60 }}>📵</span>
        </div>

        <p
          style={{
            opacity: textSpring,
            color: C.muted,
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 16,
            ...FONT,
          }}
        >
          Missed Calls Today
        </p>

        <h1
          style={{
            color: C.red,
            fontSize: 180,
            fontWeight: 900,
            margin: 0,
            ...FONT,
            lineHeight: 1,
            textShadow: `0 0 80px ${C.redGlow}`,
          }}
        >
          {missedCalls}
        </h1>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// SCENE 2: FINANCIAL LOSS (240 Frames) - BLEEDING REVENUE
// ═══════════════════════════════════════════════════════════════════════
const FinancialLoss: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const fadeOut = interpolate(
    frame,
    [durationInFrames - FADE_DUR, durationInFrames],
    [1, 0],
    { extrapolateRight: "clamp" }
  );
  const fadeIn = interpolate(frame, [0, FADE_DUR], [0, 1], {
    extrapolateRight: "clamp",
  });

  const totalSpring = spring({ frame: frame - 120, fps, config: SPRING_HEAVY });
  const dolly = interpolate(frame, [0, durationInFrames], [1, 1.05]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut * fadeIn,
        padding: "0 40px",
      }}
    >
      <BackgroundGlow color={C.redSoft} glowColor={C.redGlow} />
      <div style={{ transform: `scale(${dolly})`, width: "100%", maxWidth: 640 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const rowP = spring({
              frame: frame - i * 12,
              fps,
              config: { damping: 20, mass: 1, stiffness: 100 },
            });
            return (
              <div
                key={i}
                style={{
                  opacity: rowP,
                  transform: `translateX(${interpolate(rowP, [0, 1], [-50, 0])}px)`,
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: `1px solid ${C.divider}`,
                  paddingBottom: 16,
                }}
              >
                <span style={{ color: C.muted, fontSize: 24, ...FONT, fontWeight: 500 }}>
                  Missed Lead {i + 1}
                </span>
                <span style={{ color: C.red, fontSize: 24, fontWeight: 700, ...FONT }}>
                  -$80
                </span>
              </div>
            );
          })}
        </div>

        <div
          style={{
            opacity: totalSpring,
            transform: `translateY(${interpolate(totalSpring, [0, 1], [40, 0])}px)`,
            textAlign: "center",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            padding: "40px",
            borderRadius: 32,
            border: `2px solid ${C.red}`,
          }}
        >
          <p style={{ color: C.white, fontSize: 28, fontWeight: 600, ...FONT, marginBottom: 12 }}>
            6 × $80 =
          </p>
          <h2
            style={{
              color: C.red,
              fontSize: 80,
              fontWeight: 900,
              margin: 0,
              ...FONT,
              textShadow: `0 0 60px ${C.redGlow}`,
              letterSpacing: -2,
            }}
          >
            -$480
          </h2>
          <p
            style={{
              color: C.red,
              fontSize: 24,
              fontWeight: 500,
              ...FONT,
              marginTop: 12,
              textTransform: "uppercase",
              letterSpacing: 3,
            }}
          >
            Lost This Week
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// SCENE 3: PATTERN BREAK (150 Frames) - THE SILENCE
// ═══════════════════════════════════════════════════════════════════════
const PatternBreak: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const textFade = spring({
    frame: frame - 20,
    fps,
    config: { damping: 40, mass: 1 },
  });
  const dolly = interpolate(frame, [0, 150], [1, 1.1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 60px",
      }}
    >
      <div style={{ transform: `scale(${dolly})`, textAlign: "center" }}>
        <h2
          style={{
            opacity: textFade,
            color: C.white,
            fontSize: 64,
            fontWeight: 800,
            margin: 0,
            ...FONT,
            lineHeight: 1.2,
            letterSpacing: -2,
          }}
        >
          What if all 6
          <br />
          were answered?
        </h2>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// SCENE 4: SOLUTION REVEAL (330 Frames) - CALM & AUTOMATED
// ═══════════════════════════════════════════════════════════════════════
const SolutionReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeOut = interpolate(
    frame,
    [durationInFrames - FADE_DUR, durationInFrames],
    [1, 0],
    { extrapolateRight: "clamp" }
  );
  const fadeIn = interpolate(frame, [0, FADE_DUR], [0, 1], {
    extrapolateRight: "clamp",
  });
  const dolly = interpolate(frame, [0, durationInFrames], [1, 1.08]);

  const slideUp = interpolate(frame, [0, 60], [150, 0], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  });

  const msg1Spring = spring({ frame: frame - 40, fps, config: SPRING_HEAVY });
  const msg2Spring = spring({ frame: frame - 140, fps, config: SPRING_HEAVY });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 40px",
        opacity: fadeOut * fadeIn,
        perspective: 1500,
      }}
    >
      <BackgroundGlow color={C.greenSoft} glowColor={C.greenGlow} />

      <div
        style={{
          transform: `scale(${dolly}) translateY(${slideUp}px)`,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Glass style={{ width: "100%", maxWidth: 640, padding: "48px 40px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginBottom: 40,
              paddingBottom: 32,
              borderBottom: `1px solid ${C.divider}`,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: C.amber,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 40,
                boxShadow: `0 0 50px ${C.amberGlow}`,
              }}
            >
              🤖
            </div>
            <div>
              <p
                style={{
                  color: C.white,
                  fontSize: 34,
                  fontWeight: 800,
                  margin: 0,
                  ...FONT,
                  letterSpacing: -1,
                }}
              >
                AI Receptionist
              </p>
              <p
                style={{
                  color: C.green,
                  fontSize: 22,
                  margin: 0,
                  ...FONT,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 8,
                }}
              >
                <span
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: C.green,
                    borderRadius: "50%",
                    display: "inline-block",
                    boxShadow: `0 0 15px ${C.green}`,
                  }}
                />{" "}
                24/7 Active
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                opacity: msg1Spring,
                transform: `translateY(${interpolate(msg1Spring, [0, 1], [40, 0])}px)`,
                alignSelf: "flex-start",
                marginBottom: 20,
                maxWidth: "90%",
              }}
            >
              <div
                style={{
                  backgroundColor: C.bubbleDark,
                  borderRadius: "28px 28px 28px 8px",
                  padding: "24px 28px",
                  border: `1px solid ${C.surfaceBorder}`,
                }}
              >
                <p
                  style={{
                    color: C.white,
                    fontSize: 26,
                    fontWeight: 500,
                    margin: 0,
                    ...FONT,
                    lineHeight: 1.4,
                  }}
                >
                  Hi! I noticed we missed your call. I can book your appointment
                  right now 24/7.
                </p>
              </div>
            </div>

            <div
              style={{
                opacity: msg2Spring,
                transform: `translateY(${interpolate(msg2Spring, [0, 1], [40, 0])}px)`,
                alignSelf: "flex-start",
                maxWidth: "90%",
              }}
            >
              <div
                style={{
                  backgroundColor: C.bubbleGreen,
                  borderRadius: "28px 28px 28px 8px",
                  padding: "24px 28px",
                  border: `1px solid ${C.green}`,
                }}
              >
                <p
                  style={{
                    color: C.green,
                    fontSize: 26,
                    fontWeight: 700,
                    margin: 0,
                    ...FONT,
                    lineHeight: 1.4,
                  }}
                >
                  Appointment confirmed ✅ <br />
                  We will see you Thursday!
                </p>
              </div>
            </div>
          </div>
        </Glass>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// SCENE 5: REVENUE FLIP (210 Frames) - THE DOPAMINE HIT
// ═══════════════════════════════════════════════════════════════════════
const RevenueFlip: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeOut = interpolate(
    frame,
    [durationInFrames - FADE_DUR, durationInFrames],
    [1, 0],
    { extrapolateRight: "clamp" }
  );
  const fadeIn = interpolate(frame, [0, FADE_DUR], [0, 1], {
    extrapolateRight: "clamp",
  });
  const dolly = interpolate(frame, [0, durationInFrames], [1, 1.1]);

  const flipProgress = spring({
    frame: frame - 60,
    fps,
    config: { damping: 25, mass: 1.5, stiffness: 60 },
  });
  const rotationX = interpolate(flipProgress, [0, 1], [0, 360]);

  const isFlipped = rotationX >= 90;

  const currentGlow = interpolateColors(flipProgress, [0, 1], [
    C.redSoft,
    C.greenSoft,
  ]);
  const currentCore = interpolateColors(flipProgress, [0, 1], [
    C.redGlow,
    C.greenGlow,
  ]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut * fadeIn,
        perspective: 1200,
      }}
    >
      <BackgroundGlow color={currentGlow} glowColor={currentCore} />

      <div
        style={{
          transform: `scale(${dolly}) rotateX(${rotationX}deg)`,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            backgroundColor: isFlipped
              ? "rgba(34, 197, 94, 0.1)"
              : "rgba(239, 68, 68, 0.1)",
            padding: "60px 80px",
            borderRadius: 40,
            border: `2px solid ${isFlipped ? C.green : C.red}`,
            boxShadow: `0 40px 100px ${isFlipped ? C.greenGlow : C.redGlow}`,
          }}
        >
          <h2
            style={{
              color: isFlipped ? C.green : C.red,
              fontSize: 110,
              fontWeight: 900,
              margin: 0,
              ...FONT,
              textShadow: `0 0 60px ${isFlipped ? C.greenGlow : C.redGlow}`,
              letterSpacing: -3,
              transform: isFlipped ? "rotateX(180deg)" : "none",
            }}
          >
            {isFlipped ? "+$480" : "-$480"}
          </h2>
          <p
            style={{
              color: isFlipped ? C.green : C.red,
              fontSize: 32,
              fontWeight: 700,
              ...FONT,
              marginTop: 16,
              textTransform: "uppercase",
              letterSpacing: 4,
              transform: isFlipped ? "rotateX(180deg)" : "none",
            }}
          >
            {isFlipped ? "Captured" : "Lost"}
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// SCENE 6: CTA (210 Frames)
// ═══════════════════════════════════════════════════════════════════════
const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, FADE_DUR], [0, 1], {
    extrapolateRight: "clamp",
  });
  const dolly = interpolate(frame, [0, 210], [1, 1.15]);

  const headS = spring({ frame: frame - 20, fps, config: SPRING_HEAVY });
  const btnS = spring({ frame: frame - 70, fps, config: SPRING_HEAVY });
  const pulse = interpolate(
    Math.sin((frame - 70) / 15),
    [-1, 1],
    [1, 1.05]
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeIn,
      }}
    >
      <BackgroundGlow color={C.greenSoft} glowColor={C.greenGlow} />

      <div
        style={{
          transform: `scale(${dolly})`,
          textAlign: "center",
          width: "100%",
          padding: "0 40px",
        }}
      >
        <h2
          style={{
            opacity: headS,
            transform: `translateY(${interpolate(headS, [0, 1], [60, 0])}px)`,
            color: C.white,
            fontSize: 72,
            fontWeight: 800,
            marginBottom: 70,
            ...FONT,
            lineHeight: 1.1,
            textShadow: "0 30px 60px rgba(0,0,0,0.9)",
            letterSpacing: -2,
          }}
        >
          Answer every call.
          <br />
          <span style={{ color: C.green }}>Grow every month.</span>
        </h2>

        <div style={{ opacity: btnS, transform: `scale(${btnS})` }}>
          <div
            style={{
              transform: `scale(${pulse})`,
              backgroundColor: C.green,
              color: "#000",
              padding: "32px 80px",
              borderRadius: 32,
              fontSize: 36,
              fontWeight: 900,
              ...FONT,
              boxShadow: `0 40px 80px ${C.greenGlow}`,
              display: "inline-block",
              letterSpacing: -1,
            }}
          >
            Get Your AI Receptionist
          </div>
        </div>

        <Img
          src={staticFile("logo.png")}
          style={{
            opacity: btnS,
            width: 200,
            margin: "50px auto 0",
            display: "block",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// MAIN COMPOSITION
// Total Duration: 22.5 seconds (1350 frames @ 60fps)
// ═══════════════════════════════════════════════════════════════════════
export const MissedCallReel: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg }}>
    <Series>
      <Series.Sequence durationInFrames={240}>
        <HookPain />
      </Series.Sequence>
      <Series.Sequence durationInFrames={240} offset={-FADE_DUR}>
        <FinancialLoss />
      </Series.Sequence>
      <Series.Sequence durationInFrames={150} offset={0}>
        <PatternBreak />
      </Series.Sequence>
      <Series.Sequence durationInFrames={330} offset={0}>
        <SolutionReveal />
      </Series.Sequence>
      <Series.Sequence durationInFrames={210} offset={-FADE_DUR}>
        <RevenueFlip />
      </Series.Sequence>
      <Series.Sequence durationInFrames={210} offset={-FADE_DUR}>
        <CTA />
      </Series.Sequence>
    </Series>
  </AbsoluteFill>
);
