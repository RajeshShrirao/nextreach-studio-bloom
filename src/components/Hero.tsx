"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <header className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden">
      {/* Ambient glow orbs — positioned with Golden Ratio */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[680px] h-[480px] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-amber-500/[0.05] blur-[100px] animate-float" />
        <div className="absolute top-8 right-1/4 w-56 h-56 rounded-full bg-amber-500/[0.03] blur-[80px] animate-float-delayed" />
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-80 h-36 rounded-full bg-amber-500/[0.025] blur-[120px] animate-pulse-glow" />
      </div>

      {/* Subtle floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[18%] left-[12%] w-1 h-1 rounded-full bg-amber-400/20 animate-float-slow" />
        <div className="absolute top-[28%] right-[18%] w-1.5 h-1.5 rounded-full bg-amber-400/15 animate-float-delayed" />
        <div className="absolute top-[42%] left-[22%] w-0.5 h-0.5 rounded-full bg-amber-300/20 animate-float" />
        <div className="absolute top-[12%] right-[28%] w-1 h-1 rounded-full bg-amber-400/10 animate-float-slow" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Copy — left side */}
        <div className="flex-1 text-center lg:text-left">
          {/* Pill label */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-[13px] text-zinc-400 font-medium tracking-wide backdrop-blur-sm animate-fade-in-up">
            <Sparkles className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
            <span>BUILT FOR PET GROOMING &amp; VET CLINICS</span>
          </div>

          {/* Display heading — Golden Ratio scale */}
          <h1 className="text-[42px] sm:text-[55px] lg:text-[55px] font-bold text-white tracking-tight leading-[1.08] mb-6 glow-text animate-fade-in-up" style={{ animationDelay: '50ms' }}>
            Your grooming salon&apos;s
            <br />
            <span className="text-amber-400">new best hire.</span>
          </h1>

          {/* Body copy */}
          <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-[1.65] animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            An AI receptionist that handles bookings, answers pet parent questions, and captures leads — even when you&apos;re elbow-deep in a golden doodle at 7&nbsp;PM.
          </p>

          {/* CTA group */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            <button
              onClick={() => window.dispatchEvent(new Event("open-chat-widget"))}
              className="w-full sm:w-auto px-8 py-4 bg-amber-400 text-black font-semibold text-[15px] rounded-xl hover:bg-amber-300 transition-all duration-200 btn-primary-glow focus-visible:outline-2 focus-visible:outline-amber-400 focus-visible:outline-offset-2 cursor-pointer"
            >
              See It in Action — Free Demo
            </button>
            <p className="text-[13px] text-zinc-500 pl-1">
              No payment until you approve your demo.
            </p>
          </div>
        </div>

        {/* Hero image with chat overlay — right side */}
        <div className="flex-1 max-w-md lg:max-w-lg relative w-full animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/50">
            <Image
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80"
              alt="Happy golden retriever being groomed at a professional salon"
              width={600}
              height={450}
              className="w-full h-auto object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

            {/* Chat UI overlay */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
              <div className="glass-panel rounded-2xl p-4 space-y-3">
                {/* Header row */}
                <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.06]">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow shrink-0" />
                  <span className="text-white text-[13px] font-medium">AI Receptionist — Live Demo</span>
                </div>
                {/* User bubble */}
                <div className="flex gap-2">
                  <div className="bg-white/[0.06] text-zinc-300 text-[13px] rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[78%] leading-relaxed">
                    Do you groom huskies? Mine is shedding everywhere.
                  </div>
                </div>
                {/* AI bubble */}
                <div className="flex gap-2 justify-end">
                  <div className="bg-amber-400 text-black text-[13px] rounded-2xl rounded-br-md px-4 py-2.5 max-w-[78%] leading-relaxed font-medium">
                    Yes! Our deshedding package is $85 — includes bath, blowout, and undercoat removal. Want to book?
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
