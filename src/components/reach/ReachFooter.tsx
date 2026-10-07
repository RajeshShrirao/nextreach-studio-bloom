import React from "react";
import { ArrowUpRight } from "@phosphor-icons/react";

export default function ReachFooter() {
  return (
    <footer className="py-20 bg-[#070707] text-[#FAF8F5] border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/8">
          {/* Brand & Positioning with Official Logo Asset */}
          <div className="md:col-span-5 space-y-4">
            <a href="/" className="flex items-center gap-3 group">
              <img
                src="/brand/logo-mark.svg"
                alt="NextReach Studio Emblem"
                width={24}
                height={30}
                className="h-7 w-auto object-contain group-hover:scale-105 transition-transform"
              />
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-2xl tracking-tight text-[#FAF8F5]">
                  NextReach
                </span>
                <span className="font-display font-medium text-2xl text-[#C76B50]">
                  Studio
                </span>
              </div>
            </a>
            <p className="font-display text-lg text-[#9A9A9A] font-medium max-w-sm">
              Websites that move businesses forward.
            </p>
            <div className="font-mono text-xs text-[#7A7A7A] pt-2">
              <p>Pune / India</p>
              <p>Working worldwide</p>
            </div>
          </div>

          {/* Direct Navigation */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#7A7A7A] block mb-2">
              DIRECT NAVIGATION
            </span>
            <ul className="space-y-2 text-sm font-mono">
              <li>
                <a href="#work" className="text-[#9A9A9A] hover:text-[#C76B50] transition-colors">
                  Work
                </a>
              </li>
              <li>
                <a href="#process" className="text-[#9A9A9A] hover:text-[#C76B50] transition-colors">
                  Process
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-[#9A9A9A] hover:text-[#C76B50] transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919822379976"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9A9A9A] hover:text-[#25D366] transition-colors inline-flex items-center gap-1"
                >
                  <span>WhatsApp</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/rajesh.shrirao/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9A9A9A] hover:text-[#C76B50] transition-colors inline-flex items-center gap-1"
                >
                  <span>Instagram</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Directory & Ecosystem Links */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#7A7A7A] block mb-2">
              ECOSYSTEM &amp; DIRECTORY
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#8A8A8A]">
              <a href="/services" className="hover:text-white transition-colors">Services</a>
              <a href="/industries/restaurants" className="hover:text-white transition-colors">Industries</a>
              <a href="/blog" className="hover:text-white transition-colors">Journal / Blog</a>
              <a href="/guides" className="hover:text-white transition-colors">Guides</a>
              <a href="/resources" className="hover:text-white transition-colors">Resources</a>
              <a href="/brand" className="hover:text-white transition-colors">Brand Kit</a>
              <a href="/tools" className="hover:text-white transition-colors">Developer Tools</a>
              <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            </div>
          </div>
        </div>

        {/* Footer Base Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#7A7A7A]">
          <div>
            © 2026 NextReach Studio. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Built with Astro 6, React 19 &amp; Tailwind CSS v4.</span>
            <span className="text-[#C76B50]">·</span>
            <a href="/brand" className="text-[#C76B50] hover:underline">Official Brand Kit</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
