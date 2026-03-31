import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { COLORS, FONT_FAMILY, PHASES, SPRING_CONFIGS } from "../constants";
import { GlassPanel } from "./GlassPanel";

export const TimeDisplay = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Time cycles: 0-30 = first time, 30-60 = second, 60-90 = third
  const cycleFrame = frame % 30;
  const cycleIndex = Math.floor(frame / 30) % 3;

  const times = [
    { time: "11:47 PM", label: "Midnight" },
    { time: "SAT 2:15 PM", label: "Weekend" },
    { time: "SUN 9:00 AM", label: "Morning" },
  ];

  const currentTime = times[cycleIndex];

  // Fade in/out between times
  const opacity = interpolate(
    cycleFrame,
    [0, 8, 22, 30],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  // Spring for scale entrance
  const scale = spring({
    frame: cycleFrame,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  return (
    <div style={{ textAlign: "center" }}>
      {/* Time */}
      <div
        style={{
          opacity,
          transform: `scale(${0.9 + scale * 0.1})`,
        }}
      >
        <h2
          style={{
            fontSize: 48,
            fontWeight: 300,
            color: COLORS.textPrimary,
            fontFamily: FONT_FAMILY,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          {currentTime.time}
        </h2>
        <p
          style={{
            fontSize: 14,
            color: COLORS.textTertiary,
            fontFamily: FONT_FAMILY,
            marginTop: 8,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          {currentTime.label}
        </p>
      </div>

      {/* Subtle indicator dots */}
      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          marginTop: 24,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor:
                i === cycleIndex ? COLORS.accent : "rgba(255, 255, 255, 0.2)",
              transition: "background-color 0.2s",
            }}
          />
        ))}
      </div>
    </div>
  );
};