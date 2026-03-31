import { COLORS, GLASS_STYLES } from "../constants";

interface GlassPanelProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const GlassPanel = ({ children, style, className }: GlassPanelProps) => {
  return (
    <div
      style={{
        background: GLASS_STYLES.background,
        border: GLASS_STYLES.border,
        boxShadow: GLASS_STYLES.shadow,
        borderRadius: GLASS_STYLES.borderRadius,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
      className={className}
    >
      {/* Inner highlight for depth effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />
      {children}
    </div>
  );
};