"use client";

import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <header className="relative pt-40 pb-24 sm:pt-48 sm:pb-36 px-6 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Premium ambient glow with multiple layers */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none">
        {/* Primary glow */}
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-amber-500/[0.05] blur-[140px] animate-float" />
        
        {/* Secondary glow */}
        <div className="absolute top-48 right-1/3 w-72 h-72 rounded-full bg-amber-500/[0.03] blur-[120px] animate-float-delayed" />
        
        {/* Tertiary subtle glow */}
        <div className="absolute top-32 right-1/4 w-64 h-64 rounded-full bg-emerald-500/[0.015] blur-[100px] animate-float-slow" />
      </div>

      {/* Interactive spotlight effect (premium feature) */}
      <div className="absolute -top-40 right-0 w-[800px] h-[800px] pointer-events-none">
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-amber-500/[0.08] via-transparent to-transparent blur-[150px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{
          animation: 'spotlight-sweep 20s linear infinite',
          transformOrigin: 'center'
        }} />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
        {/* Copy — left side */}
        <div className="flex-1 text-center lg:text-left">
          {/* Interruption line */}
          <div className="mb-8 border-l-[3px] border-amber-400 pl-4 max-w-lg animate-fade-in-up">
            <p className="text-sm text-zinc-500 italic leading-relaxed font-display font-normal">
              Right now, someone&apos;s calling your salon. You&apos;re with a client.
              It rings out. They book somewhere else. This happens 12&ndash;16 times a week.
            </p>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-[48px] sm:text-[64px] lg:text-[72px] text-white tracking-[-0.03em] leading-[1.1] mb-8 animate-fade-in-up" style={{ animationDelay: '50ms' }}>
            That&apos;s the last time
            <br />
            <span className="text-amber-400">it happens.</span>
          </h1>

          {/* Body copy */}
          <p className="text-lg text-zinc-400 mb-12 max-w-lg mx-auto lg:mx-0 leading-[1.7] animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            An AI that books appointments, answers questions, and follows up &mdash;
            while you do the work you actually love.
          </p>

          {/* CTA group */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            <button
              onClick={() => window.dispatchEvent(new Event("open-chat-widget"))}
              className="group relative w-full sm:w-auto px-10 py-4 bg-amber-400 text-black font-bold text-base rounded-lg tracking-[0.08em] uppercase hover:bg-amber-300 transition-all duration-300 btn-primary-glow focus-visible:outline-2 focus-visible:outline-amber-400 focus-visible:outline-offset-3 cursor-pointer overflow-hidden"
            >
              {/* Shine effect on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">See it in action</span>
            </button>
            <a href="https://tally.so/r/1AMoR1" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-amber-400 transition-colors duration-300">
              Book a demo &rarr;
            </a>
          </div>
        </div>

        {/* Hero video — right side */}
        <div className="flex-1 max-w-md lg:max-w-lg relative w-full animate-fade-in-up group" style={{ animationDelay: '200ms' }}>
          {/* Premium frame with glow effect */}
          <div className="absolute -inset-3 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 rounded-4xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

          <div className="relative rounded-3xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/60 group-hover:shadow-black/80 transition-all duration-500">
            {/* Animated hero video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover"
              poster="/hero-video-poster.png"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </header>
  );
}
