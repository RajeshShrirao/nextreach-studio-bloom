"use client";

import Image from "next/image";
import { Sparkles, Circle } from "lucide-react";

export default function Hero() {
  return (
    <header className="relative pt-32 pb-20 sm:pb-24 px-6 max-w-6xl mx-auto overflow-hidden">
      {/* Warm ambient glow orbs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-amber-500/[0.06] blur-[100px] animate-float" />
        <div className="absolute top-10 right-1/4 w-64 h-64 rounded-full bg-amber-500/[0.04] blur-[80px] animate-float-delayed" />
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-96 h-40 rounded-full bg-amber-500/[0.03] blur-[120px] animate-pulse-glow" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[10%] w-1 h-1 rounded-full bg-amber-400/20 animate-float-slow" />
        <div className="absolute top-[25%] right-[15%] w-1.5 h-1.5 rounded-full bg-amber-400/15 animate-float-delayed" />
        <div className="absolute top-[40%] left-[20%] w-0.5 h-0.5 rounded-full bg-amber-300/25 animate-float" />
        <div className="absolute top-[10%] right-[25%] w-1 h-1 rounded-full bg-amber-400/10 animate-float-slow" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Copy */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-400 font-medium tracking-wide backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400/70" />
            <span>BUILT FOR PET GROOMING & VET CLINICS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6 glow-text">
            Your grooming salon&apos;s<br />
            <span className="text-amber-400">new best hire.</span>
          </h1>
          <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            An AI receptionist that handles bookings, answers pet parent questions, and captures leads — even when you&apos;re elbow-deep in a golden doodle at 7 PM.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              onClick={() => window.dispatchEvent(new Event("open-chat-widget"))}
              className="w-full sm:w-auto px-8 py-4 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-300 transition-all duration-300 btn-primary-glow focus-visible:outline-2 focus-visible:outline-amber-400 focus-visible:outline-offset-2"
            >
              See It in Action — Free Demo
            </button>
            <p className="text-sm text-zinc-500">
              Live on your site in 3 days. No credit card.
            </p>
          </div>
        </div>

        {/* Hero image */}
        <div className="flex-1 max-w-md lg:max-w-lg relative">
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/40">
            <Image
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80"
              alt="Happy golden retriever being groomed at a professional salon"
              width={600}
              height={450}
              className="w-full h-auto object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 glass-panel rounded-xl p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Circle className="w-3 h-3 fill-emerald-400 text-emerald-400" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Buddy&apos;s Grooming</p>
                <p className="text-zinc-400 text-xs">AI receptionist handled 14 bookings today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
