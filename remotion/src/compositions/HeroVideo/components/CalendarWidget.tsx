import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { COLORS, FONT_FAMILY, GLASS_STYLES, SPRING_CONFIGS } from "../constants";

export const CalendarWidget = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide in from right
  const slideIn = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  // Checkmark animation
  const checkScale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  // Opacity fade
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Checkmark glow
  const glowIntensity = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0.3, 0.6]
  );

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${(1 - slideIn) * 50}px)`,
        textAlign: "center",
      }}
    >
      {/* Mini calendar card */}
      <div
        style={{
          background: GLASS_STYLES.background,
          border: GLASS_STYLES.border,
          borderRadius: 12,
          padding: "16px 20px",
          boxShadow: GLASS_STYLES.shadow,
        }}
      >
        {/* Date header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 12,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: COLORS.accent,
              fontFamily: FONT_FAMILY,
            }}
          >
            SAT
          </span>
          <span
            style={{
              fontSize: 24,
              fontWeight: 300,
              color: COLORS.textPrimary,
              fontFamily: FONT_FAMILY,
            }}
          >
            14
          </span>
        </div>

        {/* Booking info */}
        <div
          style={{
            background: "rgba(52, 211, 153, 0.1)",
            borderRadius: 8,
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 13,
              color: COLORS.success,
              fontFamily: FONT_FAMILY,
              fontWeight: 500,
            }}
          >
            2:00 PM
          </span>
          <span
            style={{
              fontSize: 13,
              color: COLORS.textSecondary,
              fontFamily: FONT_FAMILY,
            }}
          >
            — Grooming (Luna)
          </span>
        </div>

        {/* Checkmark confirmation */}
        <div
          style={{
            marginTop: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            opacity: interpolate(frame, [20, 35], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: COLORS.success,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${Math.max(0, checkScale)})`,
              boxShadow: `0 0 16px rgba(52, 211, 153, ${glowIntensity})`,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: COLORS.success,
              fontFamily: FONT_FAMILY,
            }}
          >
            Confirmed
          </span>
        </div>
      </div>
    </div>
  );
};