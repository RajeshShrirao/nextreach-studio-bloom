export default function Navbar() {
  return (
    <nav className="fixed w-full top-0 z-50 glass-panel border-b border-t-0 border-x-0">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          {/* Logo mark */}
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-white/15 to-white/5 border border-white/10 flex items-center justify-center group-hover:from-white/20 group-hover:to-white/10 transition-all duration-300">
            <span className="text-white text-xs font-bold">N</span>
          </div>
          <span className="text-white font-semibold tracking-wide text-sm uppercase tracking-widest">
            NextReach Studio
          </span>
        </a>
        <a
          href="#pricing"
          className="text-xs font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
        >
          Get Your AI Employee
        </a>
      </div>
    </nav>
  );
}
