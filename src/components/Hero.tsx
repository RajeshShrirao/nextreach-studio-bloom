export default function Hero() {
  return (
    <header className="relative pt-40 pb-20 px-6 max-w-4xl mx-auto text-center overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-violet-500/[0.07] blur-[100px] animate-float" />
        <div className="absolute top-10 right-1/4 w-56 h-56 rounded-full bg-blue-500/[0.05] blur-[80px] animate-float-delayed" />
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-96 h-40 rounded-full bg-indigo-500/[0.04] blur-[120px] animate-pulse-glow" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[10%] w-1 h-1 rounded-full bg-white/20 animate-float-slow" />
        <div className="absolute top-[25%] right-[15%] w-1.5 h-1.5 rounded-full bg-violet-400/20 animate-float-delayed" />
        <div className="absolute top-[40%] left-[20%] w-0.5 h-0.5 rounded-full bg-white/30 animate-float" />
        <div className="absolute top-[10%] right-[25%] w-1 h-1 rounded-full bg-blue-400/15 animate-float-slow" />
        <div className="absolute top-[35%] right-[8%] w-0.5 h-0.5 rounded-full bg-white/20 animate-float" />
        <div className="absolute top-[50%] left-[8%] w-1 h-1 rounded-full bg-indigo-400/15 animate-float-delayed" />
      </div>

      <div className="relative z-10">
        <div className="inline-block mb-4 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-400 font-medium tracking-wide backdrop-blur-sm">
          🌸 NEXTREACH STUDIO
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6 glow-text">
          Your 24/7 AI Employee. <br />
          <span className="text-zinc-500">
            No Salary. No Sick Days. No Sleep.
          </span>
        </h1>
        <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          A custom AI chatbot that answers customer questions, books appointments, and captures leads — even while you sleep. Built in days, not months. Priced for small businesses, not enterprises.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#pricing"
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-all btn-primary-glow"
          >
            Get Your AI Employee — From $299
          </a>
          <p className="text-sm text-zinc-500 sm:ml-4">
            Live in 3–5 days. Free demo below ↓
          </p>
        </div>
      </div>
    </header>
  );
}
