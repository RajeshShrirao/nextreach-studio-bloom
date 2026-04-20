import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Series,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

// ─── THE PALETTE ───────────────────────────────────────────────────────
const C = {
  bg: "#050505",
  surface: "rgba(22, 22, 22, 0.75)",
  surfaceBorder: "rgba(255, 255, 255, 0.2)",
  surfaceHighlight: "rgba(255, 255, 255, 0.12)",
  white: "#ffffff",
  muted: "#a1a1aa",
  amber: "#fbbf24",
  amberGlow: "rgba(251,191,36,0.8)",
  green: "#22c55e",
  greenGlow: "rgba(34,197,94,0.8)",
  bubbleDark: "rgba(30, 30, 30, 0.95)",
  bubbleAmber: "rgba(251,191,36,0.15)",
  divider: "rgba(255, 255, 255, 0.15)",
};

const FONT = { fontFamily };

// ─── ADJUSTED PHYSICS (Smoother, readable, but still energetic) ────────
// Slightly heavier mass and more damping than the previous version
const SMOOTH_SNAP = { damping: 18, mass: 0.8, stiffness: 110 }; 
const RELAXED_BOUNCE = { damping: 14, mass: 1.2, stiffness: 130 };

// ─── BACKGROUND VOLUMETRIC LIGHTING ────────────────────────────────────
const MovingGlow: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = interpolate(Math.sin(frame * 0.03), [-1, 1], [0.4, 0.8]); // Slowed down pulse
  
  return (
    <AbsoluteFill style={{ overflow: 'hidden', backgroundColor: C.bg }}>
      <div style={{
        position: 'absolute', top: '10%', left: '10%', width: '80vw', height: '80vw',
        background: `radial-gradient(circle, ${C.amber} 0%, transparent 50%)`,
        filter: 'blur(100px)', opacity: pulse * 0.3,
      }} />
      <div style={{
        position: 'absolute', bottom: '0%', right: '0%', width: '90vw', height: '90vw',
        background: `radial-gradient(circle, ${C.green} 0%, transparent 60%)`,
        filter: 'blur(120px)', opacity: (1 - pulse) * 0.2,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        opacity: 0.06, mixBlendMode: 'screen', pointerEvents: 'none'
      }} />
    </AbsoluteFill>
  );
};

// ─── 3D GLASS COMPONENT ────────────────────────────────────────────────
const Glass: React.FC<React.PropsWithChildren<{ style?: React.CSSProperties }>> = ({ children, style }) => {
  return (
    <div style={{
      backgroundColor: C.surface, borderRadius: 32, border: `2px solid ${C.surfaceBorder}`,
      backdropFilter: "blur(50px)", WebkitBackdropFilter: "blur(50px)",
      boxShadow: "0 40px 80px rgba(0,0,0,0.8), inset 0 2px 20px rgba(255,255,255,0.05)",
      position: 'relative', overflow: 'hidden', ...style,
    }}>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${C.surfaceHighlight} 0%, transparent 100%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </div>
  );
};

// ─── CHAT BUBBLE ─────────────────────────────────────────────────────
const ChatBubble: React.FC<{ text: string; variant: "user" | "ai"; delay: number }> = ({ text, variant, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: RELAXED_BOUNCE });
  
  const opacity = interpolate(p, [0, 1], [0, 1], { extrapolateRight: "clamp" });
  const scale = interpolate(p, [0, 1], [0.85, 1]); 
  const y = interpolate(p, [0, 1], [30, 0]); 

  if (frame < delay) return null;

  const isUser = variant === "user";
  
  return (
    <div style={{ opacity, transform: `translateY(${y}px) scale(${scale})`, maxWidth: '85%', alignSelf: isUser ? "flex-end" : "flex-start", marginBottom: 24, transformOrigin: isUser ? 'bottom right' : 'bottom left' }}>
      <div style={{ 
        backgroundColor: isUser ? C.bubbleDark : C.bubbleAmber, 
        borderRadius: isUser ? "32px 32px 8px 32px" : "32px 32px 32px 8px", 
        padding: "24px 32px", 
        border: `1px solid ${isUser ? C.surfaceBorder : 'rgba(251,191,36,0.3)'}`,
        boxShadow: isUser ? 'none' : `0 20px 40px rgba(251,191,36,0.15)`
      }}>
        <p style={{ color: isUser ? C.white : C.amber, fontSize: 32, fontWeight: isUser ? 500 : 700, margin: 0, ...FONT, lineHeight: 1.3 }}>
          {text}
        </p>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// SCENE 1: THE HOOK (90 Frames / 3s) - Extended to let the hook breathe
// ═══════════════════════════════════════════════════════════════════════
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const textPop = spring({ frame, fps, config: SMOOTH_SNAP });
  const notifDrop = spring({ frame: frame - 25, fps, config: RELAXED_BOUNCE });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `scale(${textPop})`, textAlign: 'center' }}>
         <p style={{ color: C.white, fontSize: 140, fontWeight: 900, margin: 0, ...FONT, letterSpacing: -5 }}>
          2:00 <span style={{ fontSize: 60, color: C.muted }}>AM</span>
        </p>
        <p style={{ color: C.muted, fontSize: 36, fontWeight: 600, marginTop: 10, ...FONT }}>You're asleep. Your business isn't.</p>
      </div>

      <div style={{ 
        position: 'absolute', top: 120, 
        transform: `translateY(${interpolate(notifDrop, [0, 1], [-200, 0])}px) scale(${notifDrop})`,
        opacity: notifDrop 
      }}>
        <Glass style={{ padding: '24px 40px', display: 'flex', alignItems: 'center', gap: 24, background: 'rgba(20,20,20,0.9)' }}>
          <div style={{ width: 60, height: 60, borderRadius: 16, background: C.green, display: 'flex', alignItems:'center', justifyContent: 'center', fontSize: 30 }}>💬</div>
          <div>
            <p style={{ color: C.white, margin: 0, fontSize: 28, fontWeight: 700, ...FONT }}>New Message</p>
            <p style={{ color: C.muted, margin: 0, fontSize: 24, ...FONT }}>"Can I book a groom..."</p>
          </div>
        </Glass>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// SCENE 2: THE CHAT (210 Frames / 7s) - Increased delay between messages
// ═══════════════════════════════════════════════════════════════════════
const Conversation: React.FC = () => {
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 40px" }}>
      <Glass style={{ width: "100%", maxWidth: 720, padding: "40px", height: 700, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '30px 40px', borderBottom: `1px solid ${C.divider}`, background: 'rgba(20,20,20,0.8)', display: 'flex', alignItems: 'center', gap: 20, zIndex: 10 }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: C.amber, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>🤖</div>
          <p style={{ color: C.white, fontSize: 32, fontWeight: 800, margin: 0, ...FONT }}>NextReach AI</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", paddingTop: 100 }}>
          {/* Staggered the delays significantly so the viewer can read each line */}
          <ChatBubble text="Can I book a groom for Bella tomorrow?" variant="user" delay={15} />
          <ChatBubble text="I've got 10am or 2pm. Full groom is $85. Which works?" variant="ai" delay={85} />
          <ChatBubble text="2pm please!" variant="user" delay={155} />
        </div>
      </Glass>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// SCENE 3: THE FLEX (120 Frames / 4s) - Slightly longer hold on the numbers
// ═══════════════════════════════════════════════════════════════════════
const TheFlex: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const stamp = spring({ frame: frame - 15, fps, config: RELAXED_BOUNCE });
  const moneyDrop = spring({ frame: frame - 50, fps, config: SMOOTH_SNAP });
  
  // Slower counter animation
  const countSpring = spring({ frame: frame - 50, fps, config: { damping: 40, mass: 2, stiffness: 60 } });
  const count = Math.round(interpolate(countSpring, [0, 1], [0, 85]));

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ 
        transform: `scale(${stamp})`, 
        background: C.green, color: '#000', 
        padding: '20px 60px', borderRadius: 100, 
        fontSize: 48, fontWeight: 900, ...FONT, 
        boxShadow: `0 0 100px ${C.greenGlow}`,
        marginBottom: 80, transformOrigin: 'center'
      }}>
        APPOINTMENT BOOKED
      </div>
      
      <div style={{ opacity: moneyDrop, transform: `translateY(${interpolate(moneyDrop, [0, 1], [30, 0])}px)`, textAlign: 'center' }}>
        <p style={{ color: C.muted, fontSize: 36, fontWeight: 600, margin: '0 0 10px', ...FONT, textTransform: 'uppercase', letterSpacing: 4 }}>Revenue Generated While Sleeping</p>
        <p style={{ color: C.white, fontSize: 160, fontWeight: 900, margin: 0, ...FONT, fontVariantNumeric: 'tabular-nums', textShadow: `0 20px 60px rgba(255,255,255,0.2)` }}>
          ${count}
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// SCENE 4: OUTRO / CTA (120 Frames / 4s) - Enough time to process the CTA
// ═══════════════════════════════════════════════════════════════════════
const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const scaleIn = spring({ frame, fps, config: SMOOTH_SNAP });
  const btnPulse = interpolate(Math.sin(frame * 0.10), [-1, 1], [1, 1.05]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", background: C.bg }}>
      <div style={{ transform: `scale(${scaleIn})`, textAlign: "center" }}>
        <h2 style={{ color: C.white, fontSize: 80, fontWeight: 900, marginBottom: 60, ...FONT, lineHeight: 1.1, letterSpacing: -2 }}>
          Stop losing <br />
          <span style={{ color: C.amber }}>after-hours revenue.</span>
        </h2>
        <div style={{ 
          transform: `scale(${btnPulse})`, 
          backgroundColor: C.amber, color: "#000", 
          padding: "32px 80px", borderRadius: 100, 
          fontSize: 40, fontWeight: 900, ...FONT, 
          boxShadow: `0 30px 60px ${C.amberGlow}`
        }}>
          Automate Now
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const TwoAMBooking: React.FC = () => (
  <>
    <MovingGlow />
    <Series>
      <Series.Sequence durationInFrames={90}>
        <Hook />
      </Series.Sequence>
      <Series.Sequence durationInFrames={210} offset={-10}>
        <Conversation />
      </Series.Sequence>
      <Series.Sequence durationInFrames={120} offset={-10}>
        <TheFlex />
      </Series.Sequence>
      <Series.Sequence durationInFrames={120} offset={-10}>
        <CTA />
      </Series.Sequence>
    </Series>
  </>
);