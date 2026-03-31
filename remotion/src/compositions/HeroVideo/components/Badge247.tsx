import { useCurrentFrame, interpolate } from "remotion";
import { COLORS, FONT_FAMILY } from "../constants";

export const Badge247 = ({ style }: { style?: React.CSSProperties }) => {
  const frame = useCurrentFrame();

  const pulse = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.85, 1.15]
  );
  const glowPulse = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.1, 0.3]
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 16px",
        borderRadius: 20,
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(52, 211, 153, 0.2)",
        boxShadow: `0 0 ${20 * pulse}px rgba(52, 211, 153, ${glowPulse})`,
        ...style,
      }}
    >
      {/* Pulsing dot */}
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: COLORS.success,
          transform: `scale(${pulse})`,
          boxShadow: `0 0 8px ${COLORS.successGlowStrong}`,
        }}
      />
      <span
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: COLORS.success,
          fontFamily: FONT_FAMILY,
          letterSpacing: "0.05em",
        }}
      >
        24/7
      </span>
    </div>
  );
};