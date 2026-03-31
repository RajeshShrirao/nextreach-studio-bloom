import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { COLORS, FONT_FAMILY, GLASS_STYLES, CHAT_MESSAGES, SPRING_CONFIGS } from "../constants";
import { Sequence } from "remotion";

interface ChatBubbleProps {
  type: "user" | "ai" | "aiSuccess";
  text: string;
  showTyping?: boolean;
}

const ChatBubble = ({ type, text, showTyping }: ChatBubbleProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  const isUser = type === "user";
  const isAI = type === "ai";
  const isSuccess = type === "aiSuccess";

  // Typing dots animation
  const dot1 = interpolate(Math.sin(frame * 0.4), [-1, 1], [0.3, 1]);
  const dot2 = interpolate(Math.sin(frame * 0.4 + 0.5), [-1, 1], [0.3, 1]);
  const dot3 = interpolate(Math.sin(frame * 0.4 + 1), [-1, 1], [0.3, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `scale(${0.8 + scale * 0.2})`,
        alignSelf: isUser ? "flex-end" : "flex-start",
        maxWidth: "85%",
      }}
    >
      <div
        style={{
          background: isUser
            ? "rgba(255, 255, 255, 0.05)"
            : isSuccess
              ? COLORS.success
              : COLORS.accent,
          borderRadius: 16,
          borderRadiusBottomLeft: isUser ? 16 : 4,
          borderRadiusBottomRight: isUser ? 4 : 16,
          padding: "10px 14px",
          boxShadow: isSuccess
            ? "0 4px 20px rgba(52, 211, 153, 0.3)"
            : isAI
              ? "0 4px 20px rgba(251, 191, 36, 0.2)"
              : "none",
        }}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: isUser ? 400 : 500,
            color: isUser ? COLORS.textSecondary : (isSuccess ? "#fff" : COLORS.textOnAmber),
            fontFamily: FONT_FAMILY,
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {text}
          {showTyping && (
            <span style={{ marginLeft: 8, display: "inline-flex", gap: 4 }}>
              <span style={{ opacity: dot1 }}>·</span>
              <span style={{ opacity: dot2 }}>·</span>
              <span style={{ opacity: dot3 }}>·</span>
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export const ChatBubbles = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Overall fade in
  const containerOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity: containerOpacity,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: "100%",
        padding: "0 10px",
      }}
    >
      {/* AI label header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 8,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: COLORS.success,
          }}
        />
        <span
          style={{
            fontSize: 11,
            color: COLORS.textTertiary,
            fontFamily: FONT_FAMILY,
            letterSpacing: "0.05em",
          }}
        >
          AI Receptionist
        </span>
      </div>

      {/* Chat bubbles with staggered timing */}
      {CHAT_MESSAGES.map((msg, index) => (
        <Sequence
          key={index}
          from={msg.delay}
          durationInFrames={150 - msg.delay}
          premountFor={10}
          layout="none"
        >
          <ChatBubble
            type={msg.type as "user" | "ai" | "aiSuccess"}
            text={msg.text}
            showTyping={msg.typing && frame < msg.delay + 15}
          />
        </Sequence>
      ))}
    </div>
  );
};