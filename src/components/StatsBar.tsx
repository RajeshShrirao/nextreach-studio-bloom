export default function StatsBar() {
  const stats = [
    { value: "3 Days", label: "To Go Live" },
    { value: "24/7", label: "Never Offline" },
    { value: "12–18", label: "New Bookings/Week" },
    { value: "$49/mo", label: "After Setup" },
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-20 sm:mb-32">
      <div className="glass-panel rounded-2xl p-5 sm:p-7 flex flex-wrap justify-center md:justify-between gap-6 sm:gap-8 text-center animated-border-bottom">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group cursor-default transition-all duration-250 hover:scale-[1.03] px-4 py-2"
          >
            <p className="text-white font-semibold text-lg sm:text-xl tracking-tight group-hover:text-amber-200 transition-colors duration-200">
              {stat.value}
            </p>
            <p className="text-[11px] text-zinc-500 uppercase tracking-[0.08em] mt-1.5 group-hover:text-zinc-400 transition-colors duration-200">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      <p className="text-center text-[11px] text-zinc-600 mt-3 tracking-wide">
        Avg. from pilot salons, Q1 2026
      </p>
    </section>
  );
}
