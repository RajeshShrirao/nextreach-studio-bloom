export default function ComparisonTable() {
  const rows = [
    {
      feature: "Price",
      ours: "$79 Flat",
      agencies: "$3,000+",
      ai: "$20/mo",
      diy: "$0",
    },
    {
      feature: "Time to Fix",
      ours: "< 24 Hours",
      agencies: "4-6 Weeks",
      ai: "Endless Loops",
      diy: "40+ Hours",
    },
    {
      feature: "Meetings",
      ours: "0",
      agencies: "3+ Calls",
      ai: "0",
      diy: "0",
    },
    {
      feature: "Emotional Toll",
      ours: "Complete Relief",
      agencies: "High Friction",
      ai: "Total Exhaustion",
      diy: "Paralyzing",
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-6 mb-32">
      <h2 className="text-3xl font-bold text-white mb-10 text-center">
        The only logical next step for your MVP.
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-sm text-zinc-500 uppercase tracking-widest">
              <th className="py-4 font-normal">Feature</th>
              <th className="py-4 font-medium text-white px-6 glass-panel rounded-t-xl">
                The Blackbox Rescue
              </th>
              <th className="py-4 font-normal px-4">Dev Agencies</th>
              <th className="py-4 font-normal px-4">AI Tools</th>
              <th className="py-4 font-normal px-4">DIY Tutorials</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rows.map((row, i) => (
              <tr key={row.feature} className="border-b border-white/5">
                <td className="py-4 text-zinc-400">{row.feature}</td>
                <td
                  className={`py-4 text-white font-medium px-6 glass-panel ${
                    i === rows.length - 1
                      ? "rounded-b-xl border-t-0"
                      : "border-y-0"
                  }`}
                >
                  {row.ours}
                </td>
                <td className="py-4 px-4 text-zinc-500">{row.agencies}</td>
                <td className="py-4 px-4 text-zinc-500">{row.ai}</td>
                <td className="py-4 px-4 text-zinc-500">{row.diy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
