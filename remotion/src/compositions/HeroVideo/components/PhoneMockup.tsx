import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, FONT_FAMILY, GLASS_STYLES } from "../constants";

interface PhoneMockupProps {
  children?: React.ReactNode;
  vibrating?: boolean;
  style?: React.CSSProperties;
}

export const PhoneMockup = ({
  children,
  vibrating = false,
  style,
}: PhoneMockupProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle floating animation
  const floatY = interpolate(Math.sin(frame * 0.04), [-1, 1], [-4, 4]);

  // Phone vibration when ringing
  const shakeX = vibrating
    ? interpolate(Math.sin(frame * 0.8), [-1, 1], [-5, 5])
    : 0;

  return (
    <div
      style={{
        transform: `translateY(${floatY}px) translateX(${shakeX}px)`,
        ...style,
      }}
    >
      {/* Phone frame */}
      <div
        style={{
          width: 280,
          height: 360,
          borderRadius: GLASS_STYLES.borderRadiusXl,
          background: GLASS_STYLES.background,
          border: GLASS_STYLES.border,
          boxShadow:
            "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.03) inset",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 12,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dynamic island / notch */}
        <div
          style={{
            width: 80,
            height: 24,
            borderRadius: 12,
            backgroundColor: "#1a1a1a",
            marginBottom: 16,
          }}
        />

        {/* Screen area */}
        <div
          style={{
            flex: 1,
            width: "100%",
            borderRadius: GLASS_STYLES.borderRadiusLg,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          {children}
        </div>

        {/* Home indicator */}
        <div
          style={{
            width: 100,
            height: 4,
            borderRadius: 2,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            marginTop: 12,
          }}
        />
      </div>
    </div>
  );
};