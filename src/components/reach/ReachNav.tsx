import React, { useState, useEffect } from "react";
import { ArrowUpRight, List, X, WhatsappLogo } from "@phosphor-icons/react";

export default function ReachNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 transition-all duration-300">
        <nav
          className={`mx-auto max-w-6xl rounded-full px-5 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 flex items-center justify-between border ${
            scrolled
              ? "bg-[#09090A]/90 backdrop-blur-xl border-white/12 shadow-[0_16px_36px_rgba(0,0,0,0.6)]"
              : "bg-[#09090A]/60 backdrop-blur-md border-white/8 shadow-sm"
          }`}
          aria-label="Main Navigation"
        >
          {/* Brand Wordmark with Official Vector Logo Mark Asset */}
          <a
            href="/"
            className="flex items-center gap-3 text-[#FAF8F5] hover:opacity-90 transition-opacity group"
          >
            <img
              src="/brand/logo-mark.svg"
              alt="NextReach Studio Emblem"
              width={22}
              height={27}
              className="h-6 w-auto object-contain group-hover:scale-105 transition-transform"
            />
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold tracking-[-0.03em] text-base sm:text-lg text-[#FAF8F5]">
                NextReach
              </span>
              <span className="font-display font-medium text-base sm:text-lg text-[#C76B50]">
                Studio
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wide">
            <a
              href="#work"
              className="text-[#9A9A9A] hover:text-[#FAF8F5] transition-colors"
            >
              Work
            </a>
            <a
              href="#process"
              className="text-[#9A9A9A] hover:text-[#FAF8F5] transition-colors"
            >
              Process
            </a>
            <a
              href="#pricing"
              className="text-[#9A9A9A] hover:text-[#FAF8F5] transition-colors"
            >
              Pricing
            </a>
            <a
              href="/about"
              className="text-[#9A9A9A] hover:text-[#FAF8F5] transition-colors"
            >
              About
            </a>
          </div>

          {/* Primary CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Quick Icon */}
            <a
              href="https://wa.me/919822379976?text=Hi%20NextReach%20Studio%2C%20I%20want%20to%20discuss%20a%20website%20project."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp Message"
              className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/20 transition-all cursor-pointer"
            >
              <WhatsappLogo size={16} weight="fill" />
            </a>

            {/* Desktop CTA Button in Signature Terracotta (#C76B50) */}
            <a
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C76B50] text-[#FAF8F5] text-xs font-semibold tracking-tight hover:bg-[#D97A5E] hover:shadow-[0_0_24px_rgba(199,107,80,0.4)] transition-all duration-200 active:scale-95 group cursor-pointer"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight
                size={13}
                weight="bold"
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-[#FAF8F5] hover:bg-white/10 transition-colors"
            >
              {mobileOpen ? <X size={18} /> : <List size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#070707]/95 backdrop-blur-2xl md:hidden flex flex-col justify-between p-6 pt-24 animate-in fade-in duration-200">
          <div className="flex flex-col gap-6 text-lg font-display font-medium text-[#FAF8F5]">
            <a
              href="#work"
              onClick={() => setMobileOpen(false)}
              className="py-2 border-b border-white/10 flex items-center justify-between"
            >
              <span>Work</span>
              <span className="font-mono text-xs text-[#7A7A7A]">01</span>
            </a>
            <a
              href="#process"
              onClick={() => setMobileOpen(false)}
              className="py-2 border-b border-white/10 flex items-center justify-between"
            >
              <span>Process</span>
              <span className="font-mono text-xs text-[#7A7A7A]">02</span>
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileOpen(false)}
              className="py-2 border-b border-white/10 flex items-center justify-between"
            >
              <span>Pricing</span>
              <span className="font-mono text-xs text-[#7A7A7A]">03</span>
            </a>
            <a
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="py-2 border-b border-white/10 flex items-center justify-between"
            >
              <span>About</span>
              <span className="font-mono text-xs text-[#7A7A7A]">04</span>
            </a>
            <a
              href="/services"
              onClick={() => setMobileOpen(false)}
              className="py-2 border-b border-white/10 flex items-center justify-between"
            >
              <span>Services</span>
              <span className="font-mono text-xs text-[#7A7A7A]">05</span>
            </a>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
            <a
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#C76B50] text-[#FAF8F5] font-semibold text-sm shadow-lg hover:bg-[#D97A5E] transition-colors"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={16} weight="bold" />
            </a>
            <a
              href="https://wa.me/919822379976?text=Hi%20NextReach%20Studio%2C%20I%20want%20to%20discuss%20a%20website%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#161618] border border-white/10 text-[#25D366] text-sm font-medium"
            >
              <WhatsappLogo size={18} weight="fill" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
