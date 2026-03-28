export default function Hero() {
  return (
    <header className="pt-40 pb-20 px-6 max-w-4xl mx-auto text-center">
      <div className="inline-block mb-4 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-400 font-medium tracking-wide">
        🌸 NEXTREACH STUDIO
      </div>
      <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
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
          className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          Get Your AI Employee — From $299
        </a>
        <p className="text-sm text-zinc-500 sm:ml-4">
          Live in 3–5 days. Free demo below ↓
        </p>
      </div>
    </header>
  );
}
