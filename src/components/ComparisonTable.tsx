import { Check, X } from "lucide-react";

const rows = [
  {
    feature: "Monthly Cost",
    ours: "$49/mo",
    receptionist: "$2,000+/mo",
    otherChatbots: "$100-300/mo",
    statusQuo: "Lost bookings",
    check: [true, false, false, false],
  },
  {
    feature: "Availability",
    ours: "24/7/365",
    receptionist: "9-5 (maybe)",
    otherChatbots: "Limited",
    statusQuo: "Gone at night",
    check: [true, false, false, false],
  },
  {
    feature: "Setup Time",
    ours: "3 Days",
    receptionist: "2-4 Weeks",
    otherChatbots: "DIY (weeks)",
    statusQuo: "N/A",
    check: [true, false, false, false],
  },
  {
    feature: "Breed Knowledge",
    ours: "Custom trained",
    receptionist: "Depends on person",
    otherChatbots: "Generic",
    statusQuo: "None",
    check: [true, true, false, false],
  },
];

const columns = [
  { key: "ours", label: "NextReach AI", highlight: true },
  { key: "receptionist", label: "Hire Receptionist", highlight: false },
  { key: "otherChatbots", label: "Other Chatbots", highlight: false },
  { key: "statusQuo", label: "Status Quo", highlight: false },
];

function StatusIcon({ positive, faint }: { positive: boolean; faint?: boolean }) {
  if (positive) {
    return <Check className={`w-3.5 h-3.5 shrink-0 ${faint ? "text-emerald-400/60" : "text-emerald-400"}`} />;
  }
  return <X className={`w-3.5 h-3.5 shrink-0 ${faint ? "text-zinc-600" : "text-red-400/60"}`} />;
}

export default function ComparisonTable() {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-40">
      {/* Section header */}
      <div className="text-center mb-20">
        <p className="text-xs uppercase tracking-[0.12em] text-zinc-500 mb-4 font-light">Comparison</p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-[-0.01em] mb-6 leading-[1.2]">
          See how we compare.
        </h2>
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto rounded-3xl border border-white/[0.06]">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-white/[0.06] text-xs text-zinc-500 uppercase tracking-[0.1em] font-light">
              <th className="py-6 font-light text-left pl-6">Feature</th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`py-6 px-6 text-left ${col.key === "ours" ? "font-light text-white" : "font-light"}`}
                >
                  <div className="flex items-center gap-2">
                    {col.key === "ours" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
                    )}
                    {col.label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-base">
            {rows.map((row, i) => (
              <tr
                key={row.feature}
                className={`border-b border-white/[0.04] ${i % 2 === 1 ? "bg-white/[0.008]" : ""}`}
              >
                <td className="py-6 pl-6 text-zinc-400 font-light">{row.feature}</td>
                {columns.map((col, ci) => {
                  const val = row[col.key as keyof typeof row] as string;
                  const checked = row.check[ci];
                  return (
                    <td
                      key={col.key}
                      className={`py-6 px-6 ${col.key === "ours" ? "text-white font-light" : "text-zinc-500"}`}
                    >
                      <div className="flex items-center gap-3">
                        <StatusIcon positive={checked} faint={col.key !== "ours"} />
                        <span className="font-light">{val}</span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="sm:hidden space-y-4">
        {columns.map((col) => (
          <div
            key={col.key}
            className={`glass-panel rounded-2xl p-6 ${
              col.highlight ? "border-amber-400/15" : ""
            }`}
          >
            <div className="flex items-center gap-2.5 mb-6">
              {col.highlight && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
              )}
              <h3 className={`text-base font-light ${col.highlight ? "text-amber-400" : "text-white"}`}>
                {col.label}
              </h3>
            </div>
            <div className="space-y-4">
              {rows.map((row) => {
                const val = row[col.key as keyof typeof row] as string;
                const ci = columns.indexOf(col);
                const checked = row.check[ci];
                return (
                  <div key={row.feature} className="flex items-center justify-between">
                    <span className="text-sm text-zinc-500 font-light">{row.feature}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${col.highlight ? "text-white font-light" : "text-zinc-400 font-light"}`}>
                        {val}
                      </span>
                      <StatusIcon positive={checked} faint={!col.highlight} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
