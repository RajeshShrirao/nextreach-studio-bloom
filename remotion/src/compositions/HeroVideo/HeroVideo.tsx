import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import { COLORS, FPS, TOTAL_DURATION, PHASES, GLASS_STYLES } from "./constants";
import { PhoneMockup } from "./components/PhoneMockup";
import { Badge247 } from "./components/Badge247";
import { TimeDisplay } from "./components/TimeDisplay";
import { IncomingCall } from "./components/IncomingCall";
import { ChatBubbles } from "./components/ChatBubbles";
import { CalendarWidget } from "./components/CalendarWidget";

export const HeroVideo = () => {
  const frame = useCurrentFrame();

  // Cross-fade at loop transition (frames 420-450 fade to 0 state)
  const loopFade = interpolate(
    frame,
    [420, 450],
    [1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgBase }}>
      {/* Background ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "30%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: COLORS.accentGlow,
          filter: "blur(80px)",
          opacity: 0.3,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "30%",
          right: "20%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: COLORS.successGlow,
          filter: "blur(60px)",
          opacity: 0.15,
        }}
      />

      {/* Main content container */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
          opacity: loopFade,
        }}
      >
        {/* 24/7 Badge - always visible */}
        <Badge247 style={{ marginBottom: 24, alignSelf: "flex-end" }} />

        {/* Phase 1: 24/7 Time Display (frames 0-90) */}
        <Sequence
          from={PHASES.phase1.start}
          durationInFrames={PHASES.phase1.duration}
          premountFor={15}
        >
          <PhoneMockup vibrating={false}>
            <TimeDisplay />
          </PhoneMockup>
        </Sequence>

        {/* Phase 2: Incoming Call (frames 90-210) */}
        <Sequence
          from={PHASES.phase2.start}
          durationInFrames={PHASES.phase2.duration}
          premountFor={15}
        >
          <PhoneMockup vibrating={true}>
            <IncomingCall />
          </PhoneMockup>
        </Sequence>

        {/* Phase 3: Chat Conversation (frames 210-360) */}
        <Sequence
          from={PHASES.phase3.start}
          durationInFrames={PHASES.phase3.duration}
          premountFor={15}
        >
          <PhoneMockup vibrating={false}>
            <ChatBubbles />
          </PhoneMockup>
        </Sequence>

        {/* Phase 4: Calendar + Loop Transition (frames 360-450) */}
        <Sequence
          from={PHASES.phase4.start}
          durationInFrames={PHASES.phase4.duration}
          premountFor={15}
        >
          <PhoneMockup vibrating={false}>
            <CalendarWidget />
          </PhoneMockup>
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};