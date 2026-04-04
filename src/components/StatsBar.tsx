export default function StatsBar() {
  const stats = [
    { value: "3 Days", label: "Days to go live", sublabel: "No dev needed" },
    { value: "24/7", label: "Always answering", sublabel: "Even at midnight" },
    { value: "12–16", label: "Missed calls recovered / week", sublabel: "That were going to voicemail" },
    { value: "$49/mo", label: "Less than one no-show", sublabel: "Pays for itself week one" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-32 sm:mb-48">
      <div className="glass-panel rounded-3xl p-8 sm:p-12 flex flex-wrap justify-center md:justify-between gap-8 sm:gap-12 text-center animated-border-bottom">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group cursor-default transition-all duration-400 hover:scale-[1.05] px-4 py-2"
          >
            <p className="text-white font-display font-bold text-2xl sm:text-3xl tracking-tight group-hover:text-amber-300 transition-colors duration-300">
              {stat.value}
            </p>
            <p className="text-xs text-zinc-500 uppercase tracking-[0.1em] mt-2 group-hover:text-zinc-400 transition-colors duration-300">
              {stat.label}
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              {stat.sublabel}
            </p>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-zinc-600 mt-4 tracking-[0.05em]">
        Avg. from pilot salons, Q1 2026
      </p>
    </section>
  );
}
