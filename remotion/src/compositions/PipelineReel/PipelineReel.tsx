import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Series,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

// ─── PREMIUM PALETTE ───────────────────────────────────────────────────
const C = {
  bg: "#000000",
  surface: "rgba(20, 20, 20, 0.6)",
  surfaceBorder: "rgba(255, 255, 255, 0.12)",
  white: "#ffffff",
  muted: "#a1a1aa",
  amber: "#fbbf24",
  amberGlow: "rgba(251, 191, 36, 0.6)",
  amberSoft: "rgba(251, 191, 36, 0.15)",
  red: "#ef4444",
  redSoft: "rgba(239, 68, 68, 0.15)",
  green: "#22c55e",
  greenSoft: "rgba(34, 197, 94, 0.15)",
  greenGlow: "rgba(34, 197, 94, 0.6)",
  dim: "#404040",
  divider: "rgba(255, 255, 255, 0.08)",
};

const FONT = { fontFamily };
const SPRING_HEAVY = { damping: 30, mass: 2, stiffness: 60 };

// ─── DYNAMIC BACKGROUND ───────────────────────────────────────────────
const VolumetricGlow: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const rotate = interpolate(frame, [0, 1000], [0, 360]);
  
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "5%",
          width: "110vw",
          height: "110vw",
          background: `radial-gradient(circle, ${color} 0%, transparent 50%)`,
          filter: "blur(140px)",
          opacity: 0.5,
          transform: `rotate(${rotate}deg) translate(20px, 20px)`,
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        opacity: 0.04, mixBlendMode: 'screen', pointerEvents: 'none'
      }} />
    </AbsoluteFill>
  );
};

// ─── UI COMPONENTS ────────────────────────────────────────────────────
const Card: React.FC<
  React.PropsWithChildren<{ style?: React.CSSProperties; variant?: "chaos" | "system" }>
> = ({ children, style, variant }) => (
  <div
    style={{
      backgroundColor: C.surface,
      borderRadius: 28,
      border: `1px solid ${variant === "chaos" ? "rgba(239, 68, 68, 0.3)" : C.surfaceBorder}`,
      backdropFilter: "blur(30px)",
      WebkitBackdropFilter: "blur(30px)",
      boxShadow: variant === "chaos" ? "0 50px 100px rgba(0,0,0,0.9)" : "0 40px 80px rgba(0,0,0,0.8)",
      padding: "24px 32px",
      ...style,
    }}
  >
    {children}
  </div>
);

// ═══════════════════════════════════════════════════════════════════════
// SCENE 1 & 2: CHAOS TO SYSTEM TRANSITION (480 Frames / 8s)
// ═══════════════════════════════════════════════════════════════════════
const ChaosToSystem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const wipeProgress = spring({
    frame: frame - 160,
    fps,
    config: { damping: 35, mass: 2.5, stiffness: 45 },
  });
  const wipeX = interpolate(wipeProgress, [0, 1], [-20, 120]);

  const dolly = interpolate(frame, [0, 480], [0.95, 1.12], { easing: Easing.out(Easing.cubic) });
  const tiltX = Math.sin(frame / 60) * 3; 
  const tiltY = Math.cos(frame / 80) * 3;

  const bTextP = spring({ frame: frame - 10, fps, config: SPRING_HEAVY });
  const bCard1P = spring({ frame: frame - 25, fps, config: SPRING_HEAVY });
  const bCard2P = spring({ frame: frame - 40, fps, config: SPRING_HEAVY });
  const bCard3P = spring({ frame: frame - 55, fps, config: SPRING_HEAVY });

  const float1 = Math.sin(frame / 12) * 6;
  const float2 = Math.cos(frame / 15) * 5;
  const float3 = Math.sin(frame / 18) * 4;

  const afterScale = interpolate(wipeProgress, [0, 1], [0.92, 1]);

  return (
    <AbsoluteFill
      style={{ backgroundColor: C.bg, justifyContent: "center", alignItems: "center", perspective: 1200 }}
    >
      <VolumetricGlow color={wipeProgress > 0.5 ? C.greenSoft : C.redSoft} />

      <div
        style={{
          transform: `scale(${dolly}) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d"
        }}
      >
        {/* ========================================== */}
        {/* BEFORE SIDE (CHAOS) - PERFECTLY CENTERED */}
        {/* ========================================== */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            clipPath: `polygon(0% 0%, ${wipeX}% 0%, ${wipeX}% 100%, 0% 100%)`,
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <p
              style={{
                opacity: bTextP,
                transform: `translateY(${interpolate(bTextP, [0, 1], [30, 0])}px)`,
                color: C.red,
                fontSize: 26,
                fontWeight: 900,
                letterSpacing: 6,
                textTransform: "uppercase",
                marginBottom: 40,
                textAlign: "center",
                ...FONT,
              }}
            >
              Before
            </p>

            <Card
              variant="chaos"
              style={{
                opacity: bCard1P,
                width: 340,
                transform: `scale(${interpolate(bCard1P, [0, 1], [0.8, 1])}) rotate(-5deg) translate(${20}px, ${interpolate(bCard1P, [0, 1], [40, 0]) + float1}px)`,
                marginBottom: 20,
              }}
            >
              <p style={{ color: C.white, fontSize: 32, fontWeight: 800, margin: 0, ...FONT }}>
                📵 7 Missed
              </p>
            </Card>

            <Card
              variant="chaos"
              style={{
                opacity: bCard2P,
                width: 340,
                backgroundColor: "#fef08a",
                transform: `scale(${interpolate(bCard2P, [0, 1], [0.8, 1])}) rotate(4deg) translate(-10px, ${interpolate(bCard2P, [0, 1], [40, 0]) + float2}px)`,
                marginBottom: 20,
              }}
            >
              <p
                style={{
                  color: "#854d0e",
                  fontSize: 28,
                  fontWeight: 700,
                  margin: 0,
                  ...FONT,
                  fontStyle: "italic",
                }}
              >
                📌 Call Sarah ASAP!!
              </p>
            </Card>

            <Card
              variant="chaos"
              style={{
                opacity: bCard3P,
                width: 440,
                transform: `scale(${interpolate(bCard3P, [0, 1], [0.8, 1])}) rotate(-2deg) translate(20px, ${interpolate(bCard3P, [0, 1], [40, 0]) + float3}px)`,
              }}
            >
              <p style={{ color: C.muted, fontSize: 24, fontWeight: 500, margin: 0, ...FONT }}>
                📅 (Empty Calendar)
              </p>
            </Card>
          </div>
        </div>

        {/* ========================================== */}
        {/* THE GLOWING AMBER WIPE BAR */}
        {/* ========================================== */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${wipeX}%`,
            width: 12,
            backgroundColor: "#fff",
            boxShadow: `0 0 30px 10px ${C.amber}, 0 0 100px 40px ${C.amberSoft}`,
            zIndex: 10,
            opacity: wipeProgress > 0 && wipeProgress < 1 ? 1 : 0,
            transform: 'translateX(-50%)',
          }}
        />

        {/* ========================================== */}
        {/* AFTER SIDE (SYSTEM) - PERFECTLY CENTERED */}
        {/* ========================================== */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            clipPath: `polygon(${wipeX}% 0%, 100% 0%, 100% 100%, ${wipeX}% 100%)`,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              width: "100%",
              transform: `scale(${afterScale})`, 
              transformOrigin: 'center center' // Scales out from the middle
            }}>
            <p
              style={{
                color: C.green,
                fontSize: 26,
                fontWeight: 900,
                letterSpacing: 6,
                textTransform: "uppercase",
                marginBottom: 40,
                textAlign: "center",
                ...FONT,
              }}
            >
              After
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%", alignItems: "center" }}>
              <Card
                style={{
                  width: "100%",
                  maxWidth: 500,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ color: C.muted, fontSize: 26, ...FONT }}>Calls Answered</span>
                <span style={{ color: C.white, fontSize: 32, fontWeight: 800, ...FONT }}>6/6</span>
              </Card>
              <Card
                style={{
                  width: "100%",
                  maxWidth: 500,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ color: C.muted, fontSize: 26, ...FONT }}>Appointments</span>
                <span style={{ color: C.white, fontSize: 32, fontWeight: 800, ...FONT }}>6 Booked</span>
              </Card>
              <Card
                style={{
                  width: "100%",
                  maxWidth: 500,
                  borderLeft: `8px solid ${C.green}`,
                  backgroundColor: C.greenSoft,
                }}
              >
                <p
                  style={{
                    color: C.muted,
                    fontSize: 22,
                    fontWeight: 600,
                    margin: "0 0 8px",
                    ...FONT,
                  }}
                >
                  Revenue Today
                </p>
                <p
                  style={{
                    color: C.white,
                    fontSize: 54,
                    fontWeight: 900,
                    margin: 0,
                    ...FONT,
                    textShadow: `0 0 40px ${C.greenGlow}`,
                  }}
                >
                  $510.00
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// SCENE 3: METRICS BREAKDOWN (360 Frames / 6s)
// ═══════════════════════════════════════════════════════════════════════
const MetricsGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const dolly = interpolate(frame, [0, 360], [1, 1.1]);

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", padding: "0 50px" }}
    >
      <VolumetricGlow color={C.greenSoft} />
      <div style={{ transform: `scale(${dolly})`, width: "100%", maxWidth: 600 }}>
        <MetricCard icon="⚡" label="24/7 Response" value="100% Answered" delay={20} />
        <MetricCard icon="🎯" label="Capture Rate" value="6/6 Booked" delay={60} />
        <MetricCard
          icon="💰"
          label="Total Revenue"
          value="$510 Captured"
          delay={100}
          accent={C.green}
        />
      </div>
    </AbsoluteFill>
  );
};

const MetricCard: React.FC<{
  icon: string;
  label: string;
  value: string;
  delay: number;
  accent?: string;
}> = ({ icon, label, value, delay, accent = C.white }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: SPRING_HEAVY });

  if (p <= 0) return null;

  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [40, 0])}px)`,
        marginBottom: 32,
      }}
    >
      <Card
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          borderLeft:
            accent !== C.white
              ? `8px solid ${accent}`
              : `1px solid ${C.surfaceBorder}`,
        }}
      >
        <span style={{ fontSize: 44 }}>{icon}</span>
        <div>
          <p
            style={{
              color: C.muted,
              fontSize: 20,
              fontWeight: 600,
              margin: 0,
              ...FONT,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {label}
          </p>
          <p style={{ color: accent, fontSize: 34, fontWeight: 800, margin: 0, ...FONT }}>
            {value}
          </p>
        </div>
      </Card>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// SCENE 4: FINAL CTA (240 Frames / 4s)
// ═══════════════════════════════════════════════════════════════════════
const FinalCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headS = spring({ frame: frame - 20, fps, config: SPRING_HEAVY });
  const btnS = spring({ frame: frame - 80, fps, config: SPRING_HEAVY });
  const pulse = interpolate(Math.sin(frame / 15), [-1, 1], [1, 1.05]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "0 40px",
      }}
    >
      <VolumetricGlow color={C.greenSoft} />
      <div
        style={{
          opacity: headS,
          transform: `translateY(${interpolate(headS, [0, 1], [40, 0])}px)`,
        }}
      >
        <h1
          style={{
            color: C.white,
            fontSize: 72,
            fontWeight: 900,
            marginBottom: 24,
            ...FONT,
            lineHeight: 1.1,
            letterSpacing: -2,
          }}
        >
          From chaos to
          <br />
          <span style={{ color: C.amber }}>pipeline.</span>
        </h1>
        <p
          style={{
            color: C.muted,
            fontSize: 28,
            fontWeight: 500,
            marginBottom: 60,
            ...FONT,
          }}
        >
          AI that fills your calendar automatically.
        </p>

        <div style={{ opacity: btnS, transform: `scale(${btnS * pulse})` }}>
          <div
            style={{
              backgroundColor: C.amber,
              color: "#000",
              padding: "28px 60px",
              borderRadius: 32,
              fontSize: 32,
              fontWeight: 900,
              ...FONT,
              boxShadow: `0 40px 80px ${C.amberGlow}`,
            }}
          >
            See it in action
          </div>
        </div>
        <p
          style={{
            color: C.dim,
            fontSize: 20,
            fontWeight: 700,
            marginTop: 40,
            letterSpacing: 6,
            opacity: 0.5,
          }}
        >
          NEXTREACH.AI
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// MAIN COMPOSITION
// Total Duration: 1080 Frames (18s @ 60fps)
// ═══════════════════════════════════════════════════════════════════════
export const PipelineReel: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg }}>
    <Series>
      <Series.Sequence durationInFrames={480}>
        <ChaosToSystem />
      </Series.Sequence>
      <Series.Sequence durationInFrames={360} offset={-30}>
        <MetricsGrid />
      </Series.Sequence>
      <Series.Sequence durationInFrames={240} offset={-30}>
        <FinalCTA />
      </Series.Sequence>
    </Series>
  </AbsoluteFill>
);