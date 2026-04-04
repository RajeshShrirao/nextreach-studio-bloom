import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { COLORS, FONT_FAMILY, GLASS_STYLES } from "./constants";

const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
const SMOOTH = { damping: 200 };

// All animations run at half speed — every timing doubled from the original 6s loop.
// New total: 12s = 720 frames at 60fps.

// ─── Scene 1: Missed Call (0s – 3s = 0–180) ───
const MissedCallScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card is pre-visible at loop start
  const entrance = spring({ frame, fps, durationInFrames: 36, config: SMOOTH, delay: -40 });

  // Pulse ring: ~1s per cycle, rings 3x, fades after missed
  const ringPhase = (frame % 60);
  const ringOpacity = interpolate(ringPhase, [0, 30], [1, 0.3], { extrapolateRight: "clamp" }) *
                      (frame < 120 ? 1 : 0);

  // Transition to "Missed Call" state
  const missedFade = interpolate(frame, [100, 130], [0, 1], { easing: EASE_OUT, extrapolateRight: "clamp" });

  // Phone card fade out at end of scene
  const exitFade = interpolate(frame, [160, 180], [1, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: COLORS.bgBase }} />
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: exitFade,
        }}
      >
        <div style={{
          width: 260,
          height: 320,
          borderRadius: GLASS_STYLES.borderRadiusXl,
          background: GLASS_STYLES.background,
          border: GLASS_STYLES.border,
          boxShadow: GLASS_STYLES.shadow,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 16,
        }}>
          <div style={{
            width: 72, height: 20, borderRadius: 10,
            backgroundColor: "#1a1a1a", marginTop: 8, marginBottom: 20,
          }} />

          {/* Ring indicator */}
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            backgroundColor: missedFade > 0.5 ? "rgba(239, 68, 68, 0.08)" : "rgba(251, 191, 36, 0.12)",
            border: `2px solid rgba(${missedFade > 0.5 ? "239, 68, 68" : "251, 191, 36"}, ${ringOpacity * (1 - missedFade * 0.5)})`,
            opacity: 0.3 + (1 - missedFade) * 0.7,
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 16,
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke={missedFade > 0.5 ? "rgba(239,68,68,0.8)" : "rgba(251,191,36,0.9)"}
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>

          <p style={{
            color: COLORS.textPrimary, fontSize: 16, fontWeight: 500,
            fontFamily: FONT_FAMILY, margin: 0, marginBottom: 4,
          }}>
            Emma R.
          </p>
          <p style={{
            color: COLORS.textSecondary, fontSize: 12,
            fontFamily: FONT_FAMILY, margin: 0, marginBottom: 20,
          }}>
            Client
          </p>

          <div style={{
            opacity: 1 - missedFade,
            color: COLORS.callGreen, fontSize: 11,
            fontFamily: FONT_FAMILY, letterSpacing: "0.08em",
            textTransform: "uppercase", marginBottom: 4,
          }}>
            Incoming Call
          </div>

          <div style={{
            opacity: missedFade,
            color: "#ef4444", fontSize: 11,
            fontFamily: FONT_FAMILY, letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>
            Missed Call
          </div>

          <div style={{
            opacity: missedFade,
            marginTop: "auto",
            color: COLORS.textTertiary, fontSize: 10,
            fontFamily: FONT_FAMILY,
          }}>
            2:14 PM
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─── Scene 2: Handoff (3s – 5.5s = 180–330) ───
const HandoffScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card slides out — slower
  const slideOut = spring({ frame: frame - 10, fps, durationInFrames: 30, config: SMOOTH });

  // Gold line draws left to right — slower
  const lineProgress = interpolate(frame, [10, 60], [0, 1], { easing: EASE_OUT, extrapolateRight: "clamp" });

  // "AI ANSWERING" label
  const labelOpacity = interpolate(frame, [50, 80], [0, 1], { easing: EASE_OUT, extrapolateRight: "clamp" });

  // Waveform bars breathing — slower period
  const bar1Scale = interpolate(Math.sin(frame * 0.075), [-1, 1], [0.5, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bar2Scale = interpolate(Math.sin(frame * 0.075 + 1), [-1, 1], [0.5, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bar3Scale = interpolate(Math.sin(frame * 0.075 + 2), [-1, 1], [0.5, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bar4Scale = interpolate(Math.sin(frame * 0.075 + 3), [-1, 1], [0.5, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: COLORS.bgBase }} />
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 0,
        }}
      >
        {/* Phone frame sliding out */}
        <div style={{
          width: 260, height: 120,
          borderRadius: GLASS_STYLES.borderRadiusXl,
          background: GLASS_STYLES.background,
          border: GLASS_STYLES.border,
          boxShadow: GLASS_STYLES.shadow,
          transform: `translateY(${-slideOut * 24}px)`,
          opacity: Math.max(0, 1 - slideOut),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: -12,
        }}>
          <p style={{
            color: COLORS.textTertiary, fontSize: 11,
            fontFamily: FONT_FAMILY, letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>
            Call Handoff...
          </p>
        </div>

        {/* Gold line */}
        <div style={{
          width: 120, height: 2,
          backgroundColor: "rgba(251, 191, 36, 0.3)",
          borderRadius: 1,
          marginBottom: 16,
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            width: `${lineProgress * 100}%`,
            height: 2,
            backgroundColor: COLORS.accent,
            borderRadius: 1,
            boxShadow: "0 0 8px rgba(251, 191, 36, 0.4)",
          }} />
        </div>

        {/* AI ANSWERING label */}
        <p style={{
          opacity: labelOpacity,
          color: COLORS.accent, fontSize: 11,
          fontFamily: FONT_FAMILY, letterSpacing: "0.1em",
          textTransform: "uppercase", marginBottom: 16,
          fontWeight: 500,
        }}>
          AI ANSWERING
        </p>

        {/* Waveform — 4 bars */}
        <div style={{
          display: "flex", alignItems: "center", gap: 5,
          height: 28,
        }}>
          {[bar1Scale, bar2Scale, bar3Scale, bar4Scale].map((scale, i) => (
            <div key={i} style={{
              width: 4,
              minHeight: 6,
              height: 8 + scale * 20,
              backgroundColor: COLORS.accent,
              borderRadius: 2,
              opacity: 0.6 + scale * 0.4,
              boxShadow: "0 0 4px rgba(251, 191, 36, 0.2)",
            }} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─── Scene 3: Booking Confirmed (5.5s – 9.5s = 330–570) ───
const BookingScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card entrance: slide from top 24px — slower spring
  const entrance = spring({ frame: frame, fps, durationInFrames: 36, config: SMOOTH });
  const translateY = interpolate(entrance, [0, 1], [-24, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Staggered field reveals — slower
  const nameOp = interpolate(frame, [16, 36], [0, 1], { easing: EASE_OUT, extrapolateRight: "clamp" });
  const serviceOp = interpolate(frame, [32, 52], [0, 1], { easing: EASE_OUT, extrapolateRight: "clamp" });
  const timeOp = interpolate(frame, [48, 68], [0, 1], { easing: EASE_OUT, extrapolateRight: "clamp" });
  const badgeOp = interpolate(frame, [64, 90], [0, 1], { easing: EASE_OUT, extrapolateRight: "clamp" });

  // Exit at end of scene
  const exitOpacity = interpolate(frame, [200, 240], [1, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: COLORS.bgBase }} />
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: exitOpacity,
        }}
      >
        <div style={{
          width: 280,
          borderRadius: GLASS_STYLES.borderRadiusXl,
          background: GLASS_STYLES.background,
          border: GLASS_STYLES.border,
          boxShadow: `${GLASS_STYLES.shadow}, 0 0 40px rgba(52, 211, 153, 0.08)`,
          padding: "20px 24px",
          transform: `translateY(${translateY}px)`,
          opacity,
        }}>
          <p style={{
            color: COLORS.success, fontSize: 11,
            fontFamily: FONT_FAMILY, letterSpacing: "0.1em",
            textTransform: "uppercase", margin: 0, marginBottom: 16,
            fontWeight: 500,
          }}>
            Booking Confirmed
          </p>

          <div style={{
            height: 1,
            backgroundColor: "rgba(255,255,255,0.06)",
            marginBottom: 16,
          }} />

          <div style={{
            opacity: nameOp,
            display: "flex", justifyContent: "space-between",
            marginBottom: 12,
          }}>
            <span style={{ color: COLORS.textTertiary, fontSize: 12, fontFamily: FONT_FAMILY }}>Client</span>
            <span style={{ color: COLORS.textPrimary, fontSize: 13, fontWeight: 500, fontFamily: FONT_FAMILY }}>Emma R.</span>
          </div>

          <div style={{
            opacity: serviceOp,
            display: "flex", justifyContent: "space-between",
            marginBottom: 12,
          }}>
            <span style={{ color: COLORS.textTertiary, fontSize: 12, fontFamily: FONT_FAMILY }}>Service</span>
            <span style={{ color: COLORS.textPrimary, fontSize: 13, fontWeight: 500, fontFamily: FONT_FAMILY }}>Full Groom</span>
          </div>

          <div style={{
            opacity: timeOp,
            display: "flex", justifyContent: "space-between",
            marginBottom: 16,
          }}>
            <span style={{ color: COLORS.textTertiary, fontSize: 12, fontFamily: FONT_FAMILY }}>Time</span>
            <span style={{ color: COLORS.textPrimary, fontSize: 13, fontWeight: 500, fontFamily: FONT_FAMILY }}>Tomorrow, 10:30 AM</span>
          </div>

          <div style={{
            opacity: badgeOp,
            display: "flex", justifyContent: "center",
          }}>
            <span style={{
              display: "inline-block",
              padding: "4px 16px",
              borderRadius: 999,
              background: "rgba(251, 191, 36, 0.12)",
              border: "1px solid rgba(251, 191, 36, 0.3)",
              color: COLORS.accent,
              fontSize: 12,
              fontWeight: 600,
              fontFamily: FONT_FAMILY,
            }}>
              Booked
            </span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─── Scene 4: Stats Flash (9.5s – 12s = 570–720) ───
const StatsScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow count-up
  const t1 = interpolate(frame, [15, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bookings = Math.round(t1 * 14);
  const missed = Math.round(t1 * 0);
  const days = Math.round(t1 * 3);

  // Label staggering — slower
  const labelOp1 = interpolate(frame, [8, 28], [0, 1], { easing: EASE_OUT, extrapolateRight: "clamp" });
  const labelOp2 = interpolate(frame, [20, 40], [0, 1], { easing: EASE_OUT, extrapolateRight: "clamp" });
  const labelOp3 = interpolate(frame, [32, 52], [0, 1], { easing: EASE_OUT, extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: COLORS.bgBase }} />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <div style={{ opacity: labelOp1, textAlign: "center" }}>
          <p style={{
            color: COLORS.accent, fontSize: 48,
            fontFamily: FONT_FAMILY, fontWeight: 700,
            margin: 0, lineHeight: 1.1,
            textShadow: "0 0 24px rgba(251, 191, 36, 0.2)",
          }}>
            {bookings}
          </p>
          <p style={{
            color: COLORS.textTertiary, fontSize: 12,
            fontFamily: FONT_FAMILY, letterSpacing: "0.06em",
            textTransform: "uppercase", margin: 0, marginTop: 4,
          }}>
            bookings this week
          </p>
        </div>

        <div style={{ opacity: labelOp2, textAlign: "center" }}>
          <p style={{
            color: COLORS.success, fontSize: 48,
            fontFamily: FONT_FAMILY, fontWeight: 700,
            margin: 0, lineHeight: 1.1,
            textShadow: "0 0 24px rgba(52, 211, 153, 0.2)",
          }}>
            {missed}
          </p>
          <p style={{
            color: COLORS.textTertiary, fontSize: 12,
            fontFamily: FONT_FAMILY, letterSpacing: "0.06em",
            textTransform: "uppercase", margin: 0, marginTop: 4,
          }}>
            missed calls
          </p>
        </div>

        <div style={{ opacity: labelOp3, textAlign: "center" }}>
          <p style={{
            color: COLORS.textPrimary, fontSize: 48,
            fontFamily: FONT_FAMILY, fontWeight: 700,
            margin: 0, lineHeight: 1.1,
          }}>
            {days}
          </p>
          <p style={{
            color: COLORS.textTertiary, fontSize: 12,
            fontFamily: FONT_FAMILY, letterSpacing: "0.06em",
            textTransform: "uppercase", margin: 0, marginTop: 4,
          }}>
            days to set up
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─── Main HeroLoop Composition (12s = 720 frames at 60fps) ───
export const HeroLoop = () => {
  return (
    <AbsoluteFill>
      {/* Scene 1: Missed Call (0 – 180) */}
      <Sequence from={0} durationInFrames={180} premount={20} layout="none">
        <MissedCallScene />
      </Sequence>
      {/* Scene 2: Handoff (180 – 330) */}
      <Sequence from={180} durationInFrames={150} premount={16} layout="none">
        <HandoffScene />
      </Sequence>
      {/* Scene 3: Booking Confirmed (330 – 570) */}
      <Sequence from={330} durationInFrames={240} premount={20} layout="none">
        <BookingScene />
      </Sequence>
      {/* Scene 4: Stats Flash (570 – 720) */}
      <Sequence from={570} durationInFrames={150} premount={20} layout="none">
        <StatsScene />
      </Sequence>
    </AbsoluteFill>
  );
};
