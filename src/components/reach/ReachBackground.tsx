import React from "react";

export default function ReachBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Subtle architectural radial lighting pools in Signature Terracotta (#C76B50) */}
      <div 
        className="absolute -top-[15%] left-1/2 h-[800px] w-[1000px] -translate-x-1/2 rounded-full opacity-[0.11] blur-[150px]"
        style={{
          background: "radial-gradient(circle, #C76B50 0%, rgba(199,107,80,0) 70%)",
        }}
      />
      <div 
        className="absolute top-[42%] -left-[10%] h-[650px] w-[750px] rounded-full opacity-[0.06] blur-[160px]"
        style={{
          background: "radial-gradient(circle, #DF896B 0%, rgba(223,137,107,0) 70%)",
        }}
      />
      <div 
        className="absolute bottom-[8%] -right-[5%] h-[700px] w-[800px] rounded-full opacity-[0.07] blur-[170px]"
        style={{
          background: "radial-gradient(circle, #C76B50 0%, rgba(199,107,80,0) 70%)",
        }}
      />

      {/* Subtle Japanese editorial grid lines */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Monochromatic film grain noise overlay */}
      <div 
        className="reach-grain fixed inset-0 z-50 pointer-events-none opacity-[0.024]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
