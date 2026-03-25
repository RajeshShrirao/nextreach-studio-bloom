export default function StatsBar() {
  const stats = [
    { value: "24 Hours", label: "Turnaround Time" },
    { value: "100% Async", label: "Zero Live Meetings" },
    { value: "$79 Flat", label: "No Scope Creep" },
    { value: "Next.js", label: "Native Expertise" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 mb-24">
      <div className="glass-panel rounded-2xl p-6 md:p-8 flex flex-wrap justify-center md:justify-between gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-white font-semibold text-xl">{stat.value}</p>
            <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
