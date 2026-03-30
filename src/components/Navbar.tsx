"use client";

import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed w-full top-0 z-50 glass-panel border-b border-t-0 border-x-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[60px] flex items-center justify-between">
        {/* Logo + Brand */}
        <a
          href="#"
          className="flex items-center gap-2.5 group cursor-pointer"
          aria-label="NextReach Studio - Home"
        >
          <Image
            src="/logo.png"
            alt="NextReach Studio"
            width={30}
            height={30}
            className="transition-transform duration-200 group-hover:scale-105"
          />
          <span className="text-white font-semibold text-[13px] uppercase tracking-[0.1em]">
            NextReach Studio
          </span>
        </a>

        {/* Right side actions */}
        <div className="flex items-center gap-5">
          {/* Email — hidden on small mobile */}
          <a
            href="mailto:hello@nextreachstudio.com"
            className="text-zinc-500 text-[13px] hover:text-zinc-300 transition-colors duration-200 hidden sm:block cursor-pointer"
          >
            hello@nextreachstudio.com
          </a>

          {/* CTA Button — minimum 44px touch target */}
          <button
            onClick={() => window.dispatchEvent(new Event("open-chat-widget"))}
            className="text-[13px] font-semibold bg-amber-400 text-black px-5 py-2.5 rounded-full hover:bg-amber-300 transition-all duration-200 hover:shadow-[0_0_20px_rgba(251,191,36,0.2)] min-h-[44px] min-w-[44px] flex items-center focus-visible:outline-2 focus-visible:outline-amber-400 focus-visible:outline-offset-2 cursor-pointer"
          >
            Free Demo
          </button>
        </div>
      </div>
    </nav>
  );
}
