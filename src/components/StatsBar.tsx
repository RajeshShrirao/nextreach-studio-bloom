export default function StatsBar() {
  const stats = [
    { value: "3–5 Days", label: "To Go Live" },
    { value: "24/7", label: "Never Offline" },
    { value: "$299", label: "Starting Price" },
    { value: "$49/mo", label: "Hosting & Support" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 mb-24">
      <div className="glass-panel rounded-2xl p-6 md:p-8 flex flex-wrap justify-center md:justify-between gap-8 text-center animated-border-bottom">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="group cursor-default transition-all duration-300 hover:scale-105 px-4"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <p className="text-white font-semibold text-xl tracking-tight group-hover:text-zinc-100 transition-colors">
              {stat.value}
            </p>
            <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1 group-hover:text-zinc-400 transition-colors">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
