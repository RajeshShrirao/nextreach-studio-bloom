import { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";
import Script from "next/script";

const CONFIG_DIR = path.join(process.cwd(), "data", "demo-configs");

interface DemoConfig {
  business_name: string;
  business_type?: string;
  greeting?: string;
  phone?: string;
  location?: string;
  website?: string;
  services?: Array<{ name: string; price: string; duration: string }>;
  theme?: { primary_color?: string; position?: string };
}

function getConfig(slug: string): DemoConfig | null {
  const filePath = path.join(CONFIG_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cfg = getConfig(slug);
  const name = cfg?.business_name ?? "Demo";
  return {
    title: `AI Receptionist Demo \u2014 ${name}`,
    description: `See the AI receptionist for ${name} in action. Built by NextReach Studio.`,
  };
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cfg = getConfig(slug);

  if (!cfg) {
    return (
      <main className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-2xl font-bold mb-3">Demo Not Found</h1>
          <p className="text-zinc-500 mb-6">
            No demo config found for &ldquo;{slug}&rdquo;.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 text-black font-medium text-sm hover:bg-amber-300 transition-all duration-200"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const accent = cfg.theme?.primary_color || "#FBBF24";

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-amber-400/20 selection:text-amber-200">
      {/* Inject the widget */}
      <Script id="nr-widget-init" strategy="afterInteractive">
        {`
          (function() {
            var s = document.createElement('script');
            s.src = '/widget.js';
            s.setAttribute('data-client-id', '${slug}');
            s.setAttribute('data-api-base', window.location.origin);
            document.head.appendChild(s);
          })();
        `}
      </Script>

      {/* Top bar */}
      <nav className="border-b border-white/[0.06] bg-[#050505]/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span
              className="text-lg font-bold"
              style={{ color: accent }}
            >
              NextReach Studio
            </span>
          </Link>
          <Link
            href="https://tally.so/r/1AMoR1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Want one? Get started
          </Link>
        </div>
      </nav>

      {/* Hero section */}
      <section className="py-16 sm:py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Label */}
          <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-zinc-600 mb-4">
            AI Receptionist Demo
          </p>

          {/* Heading */}
          <h1 className="text-3xl sm:text-[34px] font-bold leading-[1.15] tracking-[-0.015em] text-white mb-4">
            See Your AI Receptionist
            <br />
            in Action
          </h1>

          {/* Business info */}
          <div className="mb-6">
            <p
              className="text-lg font-semibold mb-1"
              style={{ color: accent }}
            >
              {cfg.business_name}
            </p>
            {cfg.business_type && (
              <p className="text-sm text-zinc-500">{cfg.business_type}</p>
            )}
          </div>

          <p className="text-zinc-400 text-[15px] leading-relaxed max-w-md mx-auto mb-2">
            Try chatting with the AI receptionist below. It knows every service, FAQ, and detail about the business.
          </p>
          <p className="text-zinc-600 text-xs">
            Powered by NextReach Studio
          </p>
        </div>
      </section>

      {/* Mock website frame */}
      <section className="px-6 pb-8">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0a0a0a] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-white/10" />
                <span className="w-3 h-3 rounded-full bg-white/10" />
                <span className="w-3 h-3 rounded-full bg-white/10" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white/[0.04] rounded-lg px-3 py-1.5 text-xs text-zinc-600 text-center border border-white/[0.06]">
                  {cfg.website || `https://${cfg.business_name?.toLowerCase().replace(/\s+/g, "")}.com`}
                </div>
              </div>
            </div>

            {/* Mock website content */}
            <div className="p-8 sm:p-12 min-h-[300px] flex flex-col items-center justify-center">
              {/* Mock nav */}
              <div className="w-full flex items-center justify-between mb-12">
                <span className="text-sm font-semibold text-white/80">
                  {cfg.business_name}
                </span>
                <div className="flex gap-6">
                  <span className="text-xs text-zinc-600">Services</span>
                  <span className="text-xs text-zinc-600">About</span>
                  <span className="text-xs text-zinc-600">Contact</span>
                </div>
              </div>

              {/* Hero mockup */}
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold text-white/90 mb-3">
                  Welcome to {cfg.business_name}
                </h2>
                {cfg.services && cfg.services.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 max-w-md mx-auto">
                    {cfg.services.slice(0, 6).map((svc, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3 text-center"
                      >
                        <p className="text-xs font-medium text-zinc-400">
                          {svc.name}
                        </p>
                        <p className="text-[11px] text-zinc-600 mt-1">
                          {svc.duration}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact info */}
              <div className="flex flex-wrap gap-4 justify-center mt-4">
                {cfg.phone && (
                  <span className="text-xs text-zinc-600 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {cfg.phone}
                  </span>
                )}
                {cfg.location && (
                  <span className="text-xs text-zinc-600 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {cfg.location.split(",")[0]}
                  </span>
                )}
              </div>
            </div>

            {/* Prompt to interact */}
            <div className="border-t border-white/[0.06] bg-white/[0.015] px-6 py-4 text-center">
              <p className="text-xs text-zinc-500">
                Click the chat button in the bottom-right corner to talk to the AI receptionist
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 sm:py-24 px-6">
        <div className="max-w-lg mx-auto text-center">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 sm:p-10 backdrop-blur-sm">
            <h2 className="text-xl sm:text-[21px] font-semibold tracking-[-0.01em] text-white mb-3">
              Want this on your site?
            </h2>
            <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
              We build a personalized AI receptionist for your business — live in 3 days.
              Starting at $299 one-time + $49/mo.
            </p>
            <a
              href="https://tally.so/r/1AMoR1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-amber-400 text-black font-semibold text-sm hover:bg-amber-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.2)] active:scale-[0.97] transition-all duration-200"
            >
              Get Started
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          <p className="text-[11px] text-zinc-700 mt-8 tracking-[0.02em]">
            Built by NextReach Studio
          </p>
        </div>
      </section>
    </main>
  );
}
