"use client";

import Image from "next/image";
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
          {/* Premium label */}
          <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] text-[12px] text-zinc-400 font-light tracking-wider backdrop-blur-sm animate-fade-in-up">
            <Sparkles className="w-3.5 h-3.5 text-amber-400/70 shrink-0" />
            <span>AI FOR PET GROOMING &amp; VET CLINICS</span>
          </div>

          {/* Premium heading with gradient text effect */}
          <h1 className="text-[48px] sm:text-[64px] lg:text-[72px] font-light text-white tracking-[-0.02em] leading-[1.1] mb-8 animate-fade-in-up" style={{ animationDelay: '50ms' }}>
            Your salon&apos;s
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-transparent bg-clip-text opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                backgroundSize: '200% 100%',
                animation: 'gradient-shift 4s ease-in-out infinite'
              }}>
                new best hire.
              </span>
              <span className="text-amber-400 font-normal">new best hire.</span>
            </span>
          </h1>

          {/* Body copy */}
          <p className="text-lg text-zinc-400 mb-12 max-w-lg mx-auto lg:mx-0 leading-[1.7] font-light animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            An AI receptionist that captures bookings, answers pet parent questions, and sends you every lead — even when you&apos;re elbow-deep in a golden doodle.
          </p>

          {/* CTA group */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            <button
              onClick={() => window.dispatchEvent(new Event("open-chat-widget"))}
              className="group relative w-full sm:w-auto px-10 py-4 bg-amber-400 text-black font-medium text-base rounded-lg hover:bg-amber-300 transition-all duration-300 btn-primary-glow focus-visible:outline-2 focus-visible:outline-amber-400 focus-visible:outline-offset-3 cursor-pointer overflow-hidden"
            >
              {/* Shine effect on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">See It in Action</span>
            </button>
            <p className="text-sm text-zinc-500 font-light">
              No payment until you approve.
            </p>
          </div>
        </div>

        {/* Hero image with chat overlay — right side */}
        <div className="flex-1 max-w-md lg:max-w-lg relative w-full animate-fade-in-up group" style={{ animationDelay: '200ms' }}>
          {/* Premium frame with glow effect */}
          <div className="absolute -inset-3 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 rounded-4xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
          
          <div className="relative rounded-3xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/60 group-hover:shadow-black/80 transition-all duration-500">
            <Image
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80"
              alt="Happy golden retriever being groomed at a professional salon"
              width={600}
              height={450}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            {/* Premium gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Ambient light effect on hover */}
            <div className="absolute -top-1/2 right-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Premium Chat UI overlay with staggered animations */}
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div className="glass-panel rounded-2xl p-5 space-y-4 backdrop-blur-md">
                {/* Header row */}
                <div className="flex items-center gap-2.5 pb-4 border-b border-white/[0.06]">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow shrink-0" />
                  <span className="text-white text-sm font-light tracking-wide">AI Receptionist</span>
                </div>
                
                {/* User bubble with stagger */}
                <div className="flex gap-3 animate-fade-in-up" style={{ animationDelay: '350ms' }}>
                  <div className="bg-white/[0.05] text-zinc-300 text-sm rounded-2xl rounded-bl-md px-4 py-3 max-w-[78%] leading-relaxed font-light hover:bg-white/[0.08] transition-colors duration-300">
                    Do you groom huskies?
                  </div>
                </div>
                
                {/* AI bubble with typing effect */}
                <div className="flex gap-3 justify-end animate-fade-in-up" style={{ animationDelay: '450ms' }}>
                  <div className="bg-gradient-to-r from-amber-400 to-amber-300 text-black text-sm rounded-2xl rounded-br-md px-4 py-3 max-w-[78%] leading-relaxed font-medium shadow-lg shadow-amber-500/20">
                    <span>Yes! Absolutely.</span>
                    {/* Typing indicator dots */}
                    <div className="flex gap-1.5 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black/30 animate-typing-dot" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-black/30 animate-typing-dot" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-black/30 animate-typing-dot" style={{ animationDelay: '300ms' }} />
                    </div>
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
