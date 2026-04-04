import {
  AbsoluteFill,
  Composition,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { HeroVideo } from "./compositions/HeroVideo/HeroVideo";
import { HeroLoop } from "./compositions/HeroLoop/HeroLoop";

const TITLE_FRAMES = 30;
const PHONE_FRAMES = 60;
const ANSWER_FRAMES = 90;
const BOOKING_FRAMES = 60;
const OUTRO_FRAMES = 60;

// Scene 1: Intro - Title
const IntroScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, TITLE_FRAMES], [0, 1], { extrapolateRight: "clamp" });
  const scale = spring({ frame, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#050505", justifyContent: "center", alignItems: "center" }}>
      <div style={{
        opacity,
        transform: `scale(${0.8 + scale * 0.2})`,
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: 72,
          fontWeight: 700,
          color: "#ffffff",
          margin: 0,
          fontFamily: "Inter, sans-serif"
        }}>
          NextReach
        </h1>
        <p style={{
          fontSize: 28,
          color: "#fbbf24",
          marginTop: 16,
          fontFamily: "Inter, sans-serif"
        }}>
          AI Receptionist for Pet Businesses
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Phone Rings
const PhoneScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ringOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const phoneScale = spring({ frame: frame - 15, fps, config: { damping: 15, stiffness: 200 } });

  // Phone vibration effect
  const shake = interpolate(
    Math.sin(frame * 0.5),
    [-1, 1],
    [-5, 5]
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#050505", justifyContent: "center", alignItems: "center" }}>
      <div style={{
        opacity: ringOpacity,
        transform: `translateX(${shake}px) scale(${phoneScale})`,
        textAlign: "center"
      }}>
        {/* Phone mockup */}
        <div style={{
          width: 200,
          height: 400,
          borderRadius: 40,
          backgroundColor: "#1a1a1a",
          border: "3px solid #333",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 20
        }}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: "#22c55e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02A11.36 11.36 0 0 1 3.99 4.01C3.99 3.56 3.54 3.18 3.27 2.73 2.73 2.13 2.55 1.34 2.72.64l1.14 1.12c.46.46.71 1.1.7 1.76-.04 1.65.63 3.31 2.06 4.72 1.43 1.41 3.07 2.1 4.72 2.06.66-.01 1.3.24 1.76.7l1.12 1.14c.7.17 1.49-.01 2.09-.55.45-.27.83-.72.83-1.27v-.02z"/>
            </svg>
          </div>
          <p style={{ color: "#fff", fontSize: 18, fontFamily: "Inter, sans-serif" }}>Incoming Call...</p>
          <p style={{ color: "#fbbf24", fontSize: 24, marginTop: 10, fontFamily: "Inter, sans-serif" }}>Pet Salon</p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: AI Answers
const AIAnswerScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const bubbleOpacity = interpolate(frame, [15, 45], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#050505", justifyContent: "center", alignItems: "center" }}>
      <div style={{ opacity, textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: 32, fontFamily: "Inter, sans-serif", marginBottom: 40 }}>
          AI Receptionist Answers
        </h2>

        {/* Chat bubbles */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
          <div style={{
            backgroundColor: "#333",
            borderRadius: 16,
            padding: "16px 24px",
            maxWidth: 400
          }}>
            <p style={{ color: "#ccc", fontSize: 16, margin: 0, fontFamily: "Inter, sans-serif" }}>
              "Hi! Thanks for calling. How can I help you today?"
            </p>
          </div>

          <div style={{
            opacity: bubbleOpacity,
            backgroundColor: "#fbbf24",
            borderRadius: 16,
            padding: "16px 24px",
            maxWidth: 400
          }}>
            <p style={{ color: "#000", fontSize: 16, margin: 0, fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
              "I'd like to book a grooming appointment for my dog."
            </p>
          </div>

          <div style={{
            opacity: interpolate(frame, [45, 75], [0, 1], { extrapolateRight: "clamp" }),
            backgroundColor: "#22c55e",
            borderRadius: 16,
            padding: "16px 24px",
            maxWidth: 400
          }}>
            <p style={{ color: "#fff", fontSize: 16, margin: 0, fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
              "Great! I have openings this Thursday at 2pm. Does that work?"
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Booking Confirmed
const BookingScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 200 } });
  const checkmarkOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#050505", justifyContent: "center", alignItems: "center" }}>
      <div style={{
        transform: `scale(${scale})`,
        textAlign: "center"
      }}>
        <div style={{
          opacity: checkmarkOpacity,
          width: 120,
          height: 120,
          borderRadius: "50%",
          backgroundColor: "#22c55e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px"
        }}>
          <svg width="60" height="60" viewBox="0 0 24 24" fill="white">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
        </div>
        <h2 style={{ color: "#fff", fontSize: 42, fontFamily: "Inter, sans-serif", margin: 0 }}>
          Booking Confirmed!
        </h2>
        <p style={{ color: "#888", fontSize: 20, marginTop: 12, fontFamily: "Inter, sans-serif" }}>
          Thursday, March 27 at 2:00 PM
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: CTA
const CTAScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const buttonScale = spring({ frame: frame - 15, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#050505", justifyContent: "center", alignItems: "center" }}>
      <div style={{ opacity, textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: 48, fontFamily: "Inter, sans-serif", marginBottom: 16 }}>
          Never Miss a Call Again
        </h2>
        <p style={{ color: "#888", fontSize: 24, marginBottom: 40, fontFamily: "Inter, sans-serif" }}>
          24/7 AI receptionist that books appointments while you focus on your business
        </p>

        <div style={{
          transform: `scale(${buttonScale})`,
          backgroundColor: "#fbbf24",
          color: "#000",
          padding: "20px 48px",
          borderRadius: 12,
          fontSize: 24,
          fontWeight: 600,
          fontFamily: "Inter, sans-serif",
          display: "inline-block",
          boxShadow: "0 0 40px rgba(251, 191, 36, 0.4)"
        }}>
          Book a Demo
        </div>

        <p style={{ color: "#555", fontSize: 16, marginTop: 24, fontFamily: "Inter, sans-serif" }}>
          nextreach.ai
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Main composition
const LandingPageVideo = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#050505" }}>
      <Sequence from={0} durationInFrames={TITLE_FRAMES + PHONE_FRAMES} premountFor={15}>
        <IntroScene />
      </Sequence>

      <Sequence
        from={TITLE_FRAMES}
        durationInFrames={PHONE_FRAMES + ANSWER_FRAMES}
        premountFor={15}
      >
        <PhoneScene />
      </Sequence>

      <Sequence
        from={TITLE_FRAMES + PHONE_FRAMES}
        durationInFrames={ANSWER_FRAMES + BOOKING_FRAMES}
        premountFor={15}
      >
        <AIAnswerScene />
      </Sequence>

      <Sequence
        from={TITLE_FRAMES + PHONE_FRAMES + ANSWER_FRAMES}
        durationInFrames={BOOKING_FRAMES + OUTRO_FRAMES}
        premountFor={15}
      >
        <BookingScene />
      </Sequence>

      <Sequence
        from={TITLE_FRAMES + PHONE_FRAMES + ANSWER_FRAMES + BOOKING_FRAMES}
        durationInFrames={OUTRO_FRAMES}
        premountFor={15}
      >
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="LandingPageVideo"
        component={LandingPageVideo}
        durationInFrames={TITLE_FRAMES + PHONE_FRAMES + ANSWER_FRAMES + BOOKING_FRAMES + OUTRO_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="HeroVideo"
        component={HeroVideo}
        durationInFrames={450}
        fps={30}
        width={640}
        height={480}
      />
      <Composition
        id="HeroLoop"
        component={HeroLoop}
        durationInFrames={720}
        fps={60}
        width={640}
        height={480}
      />
    </>
  );
};