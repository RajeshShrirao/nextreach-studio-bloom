"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <header className="relative pt-40 pb-24 sm:pt-48 sm:pb-36 px-6 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Premium ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] pointer-events-none">
        <div className="absolute top-20 left-1/4 w-80 h-80 rounded-full bg-amber-500/[0.04] blur-[120px] animate-float" />
        <div className="absolute top-40 right-1/3 w-64 h-64 rounded-full bg-amber-500/[0.02] blur-[100px] animate-float-delayed" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
        {/* Copy — left side */}
        <div className="flex-1 text-center lg:text-left">
          {/* Premium label */}
          <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] text-[12px] text-zinc-400 font-light tracking-wider backdrop-blur-sm animate-fade-in-up">
            <Sparkles className="w-3.5 h-3.5 text-amber-400/70 shrink-0" />
            <span>AI FOR PET GROOMING &amp; VET CLINICS</span>
          </div>

          {/* Premium heading */}
          <h1 className="text-[48px] sm:text-[64px] lg:text-[72px] font-light text-white tracking-[-0.02em] leading-[1.1] mb-8 animate-fade-in-up" style={{ animationDelay: '50ms' }}>
            Your salon&apos;s
            <br />
            <span className="text-amber-400 font-normal">new best hire.</span>
          </h1>

          {/* Body copy */}
          <p className="text-lg text-zinc-400 mb-12 max-w-lg mx-auto lg:mx-0 leading-[1.7] font-light animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            An AI receptionist that handles bookings, answers pet parent questions, and captures leads — even when you&apos;re elbow-deep in a golden doodle.
          </p>

          {/* CTA group */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            <button
              onClick={() => window.dispatchEvent(new Event("open-chat-widget"))}
              className="w-full sm:w-auto px-10 py-4 bg-amber-400 text-black font-medium text-base rounded-lg hover:bg-amber-300 transition-all duration-300 btn-primary-glow focus-visible:outline-2 focus-visible:outline-amber-400 focus-visible:outline-offset-3 cursor-pointer"
            >
              See It in Action
            </button>
            <p className="text-sm text-zinc-500 font-light">
              No payment until you approve.
            </p>
          </div>
        </div>

        {/* Hero image with chat overlay — right side */}
        <div className="flex-1 max-w-md lg:max-w-lg relative w-full animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="relative rounded-3xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/60">
            <Image
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80"
              alt="Happy golden retriever being groomed at a professional salon"
              width={600}
              height={450}
              className="w-full h-auto object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Chat UI overlay */}
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
              <div className="glass-panel rounded-2xl p-5 space-y-4">
                {/* Header row */}
                <div className="flex items-center gap-2.5 pb-4 border-b border-white/[0.04]">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow shrink-0" />
                  <span className="text-white text-sm font-light">AI Receptionist</span>
                </div>
                {/* User bubble */}
                <div className="flex gap-3">
                  <div className="bg-white/[0.05] text-zinc-300 text-sm rounded-2xl rounded-bl-md px-4 py-3 max-w-[78%] leading-relaxed font-light">
                    Do you groom huskies?
                  </div>
                </div>
                {/* AI bubble */}
                <div className="flex gap-3 justify-end">
                  <div className="bg-amber-400 text-black text-sm rounded-2xl rounded-br-md px-4 py-3 max-w-[78%] leading-relaxed font-medium">
                    Yes! Book now?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
