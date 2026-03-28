export default function ComparisonTable() {
  const rows = [
    {
      feature: "Monthly Cost",
      ours: "$49/mo",
      receptionist: "$2,000+/mo",
      otherChatbots: "$100-300/mo",
      missed: "Lost customers",
    },
    {
      feature: "Availability",
      ours: "24/7/365",
      receptionist: "9-5 (maybe)",
      otherChatbots: "Limited",
      missed: "Never there",
    },
    {
      feature: "Setup Time",
      ours: "3-5 Days",
      receptionist: "2-4 Weeks",
      otherChatbots: "DIY (weeks)",
      missed: "N/A",
    },
    {
      feature: "Handles Complexity",
      ours: "Custom trained",
      receptionist: "Depends on person",
      otherChatbots: "Generic scripts",
      missed: "No",
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-6 mb-32">
      <h2 className="text-3xl font-bold text-white mb-10 text-center">
        The math is simple.
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-sm text-zinc-500 uppercase tracking-widest">
              <th className="py-4 font-normal">Feature</th>
              <th className="py-4 font-medium text-white px-6 glass-panel rounded-t-xl">
                NextReach AI
              </th>
              <th className="py-4 font-normal px-4">Hire Receptionist</th>
              <th className="py-4 font-normal px-4">Other Chatbots</th>
              <th className="py-4 font-normal px-4">Do Nothing</th>
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
                <td className="py-4 px-4 text-zinc-500">{row.receptionist}</td>
                <td className="py-4 px-4 text-zinc-500">{row.otherChatbots}</td>
                <td className="py-4 px-4 text-zinc-500">{row.missed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
