"use client";

import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed w-full top-0 z-50 glass-panel border-b border-t-0 border-x-0">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo + Brand */}
        <a
          href="#"
          className="flex items-center gap-3 group cursor-pointer -ml-2"
          aria-label="NextReach Studio - Home"
        >
          <Image
            src="/logo.png"
            alt="NextReach Studio"
            width={32}
            height={32}
            className="transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-white font-light text-sm tracking-[0.08em] hidden sm:inline">
            NextReach Studio
          </span>
        </a>

        {/* Right side actions */}
        <div className="flex items-center gap-6">
          {/* Email — hidden on small mobile */}
          <a
            href="mailto:hello@nextreachstudio.com"
            className="text-zinc-500 text-xs hover:text-zinc-300 transition-colors duration-300 hidden sm:block cursor-pointer"
          >
            hello@nextreachstudio.com
          </a>

          {/* CTA Button */}
          <button
            onClick={() => window.dispatchEvent(new Event("open-chat-widget"))}
            className="text-sm font-medium bg-amber-400 text-black px-6 py-2.5 rounded-full hover:bg-amber-300 transition-all duration-300 hover:shadow-[0_0_28px_rgba(251,191,36,0.25)] min-h-[44px] flex items-center focus-visible:outline-2 focus-visible:outline-amber-400 focus-visible:outline-offset-2 cursor-pointer"
          >
            Free Demo
          </button>
        </div>
      </div>
    </nav>
  );
}
