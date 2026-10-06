import React from "react";

export interface NextReachBadgeProps {
  /** Visual variant: 'pill' (default), 'minimal', 'card', 'floating', or 'banner' */
  variant?: "pill" | "minimal" | "card" | "floating" | "banner";
  /** Color theme: 'dark' (default), 'light', 'glass', or 'terracotta' */
  theme?: "dark" | "light" | "glass" | "terracotta";
  /** Attribution phrase */
  phrase?: "Crafted by" | "Engineered by" | "Built by" | "Designed & Developed by" | "Powered by" | string;
  /** Name of the client website for UTM tracking (e.g. 'shadow-shuriken', 'saffron-and-smoke') */
  clientName?: string;
  /** Fixed position when variant="floating" */
  position?: "bottom-right" | "bottom-left";
  /** Whether to show 'Pune • Worldwide' subtext in card/banner */
  showLocation?: boolean;
  /** Whether to show quick WhatsApp sprint button in expanded card */
  showWhatsApp?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const NextReachBadge: React.FC<NextReachBadgeProps> = ({
  variant = "pill",
  theme = "dark",
  phrase = "Crafted by",
  clientName = "client-site",
  position = "bottom-right",
  showLocation = true,
  showWhatsApp = false,
  className = "",
}) => {
  const baseUrl = "https://www.nextreachstudio.in/";
  const queryParams = new URLSearchParams({
    utm_source: clientName,
    utm_medium: `badge_${variant}`,
    utm_campaign: "attribution",
  });
  const studioHref = `${baseUrl}?${queryParams.toString()}`;

  // Theme styling definitions
  const themeStyles = {
    dark: {
      bg: "bg-[#18181B]/95 hover:bg-[#222226]",
      border: "border-white/10 hover:border-[#C76B50]/60",
      textSub: "text-[#A1A1AA]",
      textBrand: "text-white",
      markBg: "bg-[#27272A]",
      accentText: "text-[#C76B50]",
      shadow: "shadow-lg shadow-black/30",
      arrow: "text-[#C76B50]",
    },
    light: {
      bg: "bg-[#FDFBF7] hover:bg-white",
      border: "border-black/10 hover:border-[#C76B50]/60",
      textSub: "text-[#71717A]",
      textBrand: "text-[#18181B]",
      markBg: "bg-[#F4EFEA]",
      accentText: "text-[#C76B50]",
      shadow: "shadow-md shadow-black/5",
      arrow: "text-[#C76B50]",
    },
    glass: {
      bg: "bg-black/60 backdrop-blur-md hover:bg-black/80",
      border: "border-white/15 hover:border-[#C76B50]/80",
      textSub: "text-[#D4D4D8]",
      textBrand: "text-white",
      markBg: "bg-white/10",
      accentText: "text-[#E07A5F]",
      shadow: "shadow-2xl shadow-black/50",
      arrow: "text-[#E07A5F]",
    },
    terracotta: {
      bg: "bg-[#C76B50] hover:bg-[#D97A5E]",
      border: "border-white/25 hover:border-white/50",
      textSub: "text-white/85",
      textBrand: "text-white",
      markBg: "bg-white/20",
      accentText: "text-white",
      shadow: "shadow-lg shadow-[#C76B50]/30",
      arrow: "text-white",
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.dark;

  // Monoline Architectural Emblem pure vector mark
  const Emblem = ({ size = 16, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg
      viewBox="0 0 120 150"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <polyline points="29,38 60,8 91,38" />
      <line x1="60" y1="8" x2="60" y2="142" />
      <path d="M 10,142 L 10,40 Q 10,33 17,37 L 60,142" />
      <path d="M 60,54 C 88,54 110,66 110,83 C 110,100 88,104 60,104" />
      <line x1="60" y1="104" x2="110" y2="142" />
    </svg>
  );

  // Minimal 1-line variant
  if (variant === "minimal") {
    return (
      <a
        href={studioHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${phrase} NextReach Studio`}
        className={`inline-flex items-center gap-2 text-xs font-sans transition-all duration-200 group select-none ${className}`}
      >
        <div className="w-4 h-4 flex items-center justify-center text-[#C76B50] group-hover:scale-110 transition-transform">
          <Emblem size={14} color="#C76B50" />
        </div>
        <span className={theme === "light" ? "text-zinc-600" : "text-zinc-400"}>
          {phrase}{" "}
          <strong className={`font-semibold group-hover:text-[#C76B50] transition-colors ${theme === "light" ? "text-zinc-900" : "text-white"}`}>
            NextReach Studio
          </strong>
        </span>
        <span className="text-[#C76B50] text-[10px] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
          ↗
        </span>
      </a>
    );
  }

  // Floating dock variant
  if (variant === "floating") {
    const posClass = position === "bottom-left" ? "left-5 bottom-5" : "right-5 bottom-5";
    return (
      <div className={`fixed ${posClass} z-50 ${className}`}>
        <NextReachBadge
          variant="pill"
          theme={theme}
          phrase={phrase}
          clientName={clientName}
          className="shadow-2xl hover:scale-105"
        />
      </div>
    );
  }

  // Banner / Agency Footer Block variant
  if (variant === "banner") {
    return (
      <div
        className={`rounded-2xl p-5 sm:p-6 border transition-all duration-200 ${currentTheme.bg} ${currentTheme.border} ${currentTheme.shadow} ${className}`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center p-2 ${currentTheme.markBg} text-[#C76B50]`}>
              <Emblem size={24} color="#C76B50" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-semibold tracking-wider uppercase text-[#C76B50]">
                {phrase}
              </div>
              <div className={`text-base font-bold tracking-tight font-display ${currentTheme.textBrand}`}>
                NextReach <span className="text-[#C76B50]">Studio</span>
              </div>
              <p className={`text-xs ${currentTheme.textSub} mt-0.5`}>
                Senior-Engineered Web Platforms &amp; Autonomous AI Systems
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {showWhatsApp && (
              <a
                href="https://wa.me/919822379976?text=Hi%20NextReach%20Studio,%20I%20saw%20your%20work%20and%20would%20like%20to%20inquire."
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600/15 text-emerald-400 hover:bg-emerald-600/25 border border-emerald-500/30 transition-colors inline-flex items-center gap-1.5"
              >
                <span>WhatsApp</span>
              </a>
            )}
            <a
              href={studioHref}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#C76B50] hover:bg-[#D97A5E] text-white shadow-md shadow-[#C76B50]/20 transition-all inline-flex items-center gap-1.5 group"
            >
              <span>Visit Studio</span>
              <span className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Expanded Card variant
  if (variant === "card") {
    return (
      <div
        className={`rounded-2xl p-4 border max-w-sm transition-all duration-200 ${currentTheme.bg} ${currentTheme.border} ${currentTheme.shadow} ${className}`}
      >
        <div className="flex items-center gap-3 mb-2.5">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center p-1.5 ${currentTheme.markBg} text-[#C76B50]`}>
            <Emblem size={20} color="#C76B50" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#C76B50]">
              {phrase}
            </span>
            <div className={`text-sm font-bold leading-tight ${currentTheme.textBrand}`}>
              NextReach <span className="text-[#C76B50]">Studio</span>
            </div>
          </div>
        </div>
        <p className={`text-xs ${currentTheme.textSub} leading-relaxed mb-3`}>
          Custom digital flagships, web applications &amp; autonomous AI agents shipped in days.
        </p>
        <div className="flex items-center justify-between pt-2.5 border-t border-white/5">
          {showLocation && (
            <span className="text-[10px] font-mono text-zinc-500">
              Pune, India • Shipped Fast
            </span>
          )}
          <a
            href={studioHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#C76B50] hover:underline inline-flex items-center gap-1"
          >
            <span>Explore studio</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    );
  }

  // Default: Pill Badge
  return (
    <a
      href={studioHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${phrase} NextReach Studio`}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all duration-200 group select-none ${currentTheme.bg} ${currentTheme.border} ${currentTheme.shadow} ${className}`}
    >
      <div className={`w-5 h-5 rounded-md flex items-center justify-center p-0.5 ${currentTheme.markBg} text-[#C76B50] group-hover:scale-110 transition-transform`}>
        <Emblem size={14} color={theme === "terracotta" ? "#FFFFFF" : "#C76B50"} />
      </div>
      <div className="flex items-center gap-1 leading-none font-sans">
        <span className={`text-[11px] font-normal ${currentTheme.textSub}`}>
          {phrase}
        </span>
        <span className={`text-xs font-bold tracking-tight ${currentTheme.textBrand}`}>
          NextReach <span className={theme === "terracotta" ? "text-white" : currentTheme.accentText}>Studio</span>
        </span>
      </div>
      <span className={`text-[10px] font-bold ${currentTheme.arrow} transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform`}>
        ↗
      </span>
    </a>
  );
};

export default NextReachBadge;
