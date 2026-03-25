export default function Hero() {
  return (
    <header className="pt-40 pb-20 px-6 max-w-4xl mx-auto text-center">
      <div className="inline-block mb-4 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-400 font-medium tracking-wide">
        THE BLACKBOX RESCUE
      </div>
      <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
        Your AI MVP Looks Great Locally. <br />
        <span className="text-zinc-500">
          On Vercel, It&apos;s a 500 Error Nightmare.
        </span>
      </h1>
      <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
        You built it in Bolt or Lovable. You got excited. But the second you
        tried to connect Supabase auth, fire a Stripe webhook, or deploy to
        production, everything broke. AI keeps rewriting files and making it
        worse.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="#checkout"
          className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          Rescue My Code — $79 Flat Fee
        </a>
        <p className="text-sm text-zinc-500 sm:ml-4">
          Zero calls. 24hr turnaround.
        </p>
      </div>
    </header>
  );
}
