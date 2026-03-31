import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { COLORS, FONT_FAMILY, GLASS_STYLES, SPRING_CONFIGS } from "../constants";

export const IncomingCall = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide in animation
  const slideIn = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  // Ring pulse
  const ringPulse = interpolate(
    Math.sin(frame * 0.15),
    [-1, 1],
    [0.9, 1.1]
  );

  // Glow intensity
  const glowIntensity = interpolate(
    Math.sin(frame * 0.15),
    [-1, 1],
    [0.2, 0.5]
  );

  return (
    <div
      style={{
        transform: `translateY(${(1 - slideIn) * 30}px)`,
        opacity: slideIn,
        textAlign: "center",
        width: "100%",
      }}
    >
      {/* Call icon with pulse */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: COLORS.callGreen,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px",
          transform: `scale(${ringPulse})`,
          boxShadow: `0 0 40px rgba(34, 197, 94, ${glowIntensity})`,
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02a11.36 11.36 0 0 1 8.19-8.19c.35-.11.74-.03 1.02.24l1.66 1.95c-2.93-1.41-5.48-4.06-6.83-6.89l1.97-1.57c.28-.27.67-.35 1.01-.24a11.36 11.36 0 0 1 3.53 8.19c.55.92.01 1.49-.24 1.02l-1.66-1.95c-.28-.27-.67-.35-1.02-.24a11.36 11.36 0 0 0-8.19 8.19c-.11.35-.03.74.24 1.02l1.95 1.66c-2.93 1.35-5.48 3.9-6.89 6.83z" />
        </svg>
      </div>

      {/* Incoming call text */}
      <p
        style={{
          fontSize: 12,
          color: COLORS.textTertiary,
          fontFamily: FONT_FAMILY,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          margin: "0 0 8px",
        }}
      >
        Incoming Call
      </p>

      {/* Caller info */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: 12,
          padding: "12px 20px",
          display: "inline-block",
        }}
      >
        <p
          style={{
            fontSize: 18,
            fontWeight: 500,
            color: COLORS.textPrimary,
            fontFamily: FONT_FAMILY,
            margin: 0,
          }}
        >
          Pet Parent
        </p>
        <p
          style={{
            fontSize: 14,
            color: COLORS.textSecondary,
            fontFamily: FONT_FAMILY,
            marginTop: 4,
          }}
        >
          Golden Retriever
        </p>
      </div>

      {/* Answer hint */}
      <div
        style={{
          marginTop: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: COLORS.callGreen,
            animation: "pulse 1s infinite",
          }}
        />
        <span
          style={{
            fontSize: 12,
            color: COLORS.success,
            fontFamily: FONT_FAMILY,
          }}
        >
          AI Answering...
        </span>
      </div>
    </div>
  );
};