import { Code } from "lucide-react";
import {
  SiWordpress,
  SiWix,
  SiSquarespace,
  SiShopify,
} from "@icons-pack/react-simple-icons";

const platforms = [
  {
    name: "WordPress",
    description: "Most popular CMS",
    icon: SiWordpress,
  },
  {
    name: "Wix",
    description: "Drag & drop sites",
    icon: SiWix,
  },
  {
    name: "Squarespace",
    description: "Beautiful templates",
    icon: SiSquarespace,
  },
  {
    name: "Shopify",
    description: "E-commerce stores",
    icon: SiShopify,
  },
  {
    name: "Custom HTML",
    description: "Any website, really",
    icon: Code,
  },
];

export default function Integrations() {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-40">
      {/* Section header */}
      <div className="text-center mb-20">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4 font-bold">
          Compatibility
        </p>
        <h2 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl text-white tracking-[-0.01em] mb-6 leading-[1.2]">
          Works on any website.
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto leading-[1.7] text-lg">
          One line of code. Works everywhere &mdash; no matter what platform your site runs on.
        </p>
      </div>

      {/* Platform cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <div
              key={platform.name}
              className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col items-center justify-center text-center group min-h-[140px] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-400/[0.08] flex items-center justify-center mb-4 text-amber-400/80 transition-all duration-300 group-hover:bg-amber-400/[0.12] group-hover:text-amber-400 group-hover:scale-110">
                <Icon size={28} />
              </div>
              <p className="text-white text-sm leading-tight mb-1">{platform.name}</p>
              <p className="text-zinc-500 text-xs leading-tight">{platform.description}</p>
            </div>
          );
        })}
      </div>

      {/* One-liner code snippet */}
      <div className="mt-12 max-w-2xl mx-auto">
        <div className="glass-panel rounded-2xl p-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-3 font-bold">Just one line of code</p>
          <code className="text-sm text-amber-400/80 font-mono break-all leading-relaxed">
            {`<script src="nextreachstudio.com/widget.js" data-client-id="your-salon">`}
          </code>
        </div>
      </div>
    </section>
  );
}
