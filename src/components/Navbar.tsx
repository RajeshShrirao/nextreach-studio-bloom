export default function Navbar() {
  return (
    <nav className="fixed w-full top-0 z-50 glass-panel border-b border-t-0 border-x-0">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-white font-semibold tracking-wide text-sm uppercase tracking-widest">
          NextReach Studio
        </span>
        <a
          href="#pricing"
          className="text-xs font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors"
        >
          Get Your AI Employee
        </a>
      </div>
    </nav>
  );
}
