import { Check, X } from "lucide-react";

export default function ComparisonTable() {
  const rows = [
    {
      feature: "Monthly Cost",
      ours: "$49/mo",
      receptionist: "$2,000+/mo",
      otherChatbots: "$100-300/mo",
      missed: "Lost bookings",
      check: [true, false, false, false],
    },
    {
      feature: "Availability",
      ours: "24/7/365",
      receptionist: "9-5 (maybe)",
      otherChatbots: "Limited",
      missed: "Gone at night",
      check: [true, false, false, false],
    },
    {
      feature: "Setup Time",
      ours: "3 Days",
      receptionist: "2-4 Weeks",
      otherChatbots: "DIY (weeks)",
      missed: "N/A",
      check: [true, false, false, false],
    },
    {
      feature: "Breed Knowledge",
      ours: "Custom trained",
      receptionist: "Depends on person",
      otherChatbots: "Generic",
      missed: "None",
      check: [true, true, false, false],
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-6 mb-32">
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Comparison</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Compare your options.
        </h2>
      </div>
      <div className="overflow-x-auto rounded-2xl -mx-6 px-6">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b border-white/10 text-xs text-zinc-500 uppercase tracking-widest">
              <th className="py-4 font-normal">Feature</th>
              <th className="py-4 font-medium text-white px-6 glass-panel rounded-t-xl">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  NextReach AI
                </div>
              </th>
              <th className="py-4 font-normal px-4">Hire Receptionist</th>
              <th className="py-4 font-normal px-4">Other Chatbots</th>
              <th className="py-4 font-normal px-4">Do Nothing</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rows.map((row, i) => (
              <tr
                key={row.feature}
                className={`border-b border-white/5 ${
                  i % 2 === 1 ? "bg-white/[0.015]" : ""
                }`}
              >
                <td className="py-4 text-zinc-400">{row.feature}</td>
                <td
                  className={`py-4 text-white font-medium px-6 glass-panel ${
                    i === rows.length - 1
                      ? "rounded-b-xl border-t-0"
                      : "border-y-0"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    {row.ours}
                  </div>
                </td>
                <td className="py-4 px-4 text-zinc-500">
                  <div className="flex items-center gap-2">
                    {row.check[1] ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400/60 shrink-0" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                    )}
                    {row.receptionist}
                  </div>
                </td>
                <td className="py-4 px-4 text-zinc-500">
                  <div className="flex items-center gap-2">
                    {row.check[2] ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400/60 shrink-0" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                    )}
                    {row.otherChatbots}
                  </div>
                </td>
                <td className="py-4 px-4 text-zinc-500">
                  <div className="flex items-center gap-2">
                    <X className="w-3.5 h-3.5 text-red-400/60 shrink-0" />
                    {row.missed}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
