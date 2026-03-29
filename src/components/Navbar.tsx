"use client";

import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed w-full top-0 z-50 glass-panel border-b border-t-0 border-x-0">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <Image src="/logo.png" alt="NextReach Studio" width={32} height={32} />
          <span className="text-white font-semibold text-sm uppercase tracking-widest">
            NextReach Studio
          </span>
        </a>
        <button
          onClick={() => window.dispatchEvent(new Event("open-chat-widget"))}
          className="text-xs font-medium bg-amber-400 text-black px-5 py-2.5 rounded-full hover:bg-amber-300 transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] min-h-[44px] flex items-center focus-visible:outline-2 focus-visible:outline-amber-400 focus-visible:outline-offset-2"
        >
          Free Demo
        </button>
      </div>
    </nav>
  );
}
