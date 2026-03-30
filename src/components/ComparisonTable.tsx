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
    <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-32">
      {/* Section header */}
      <div className="text-center mb-16">
        <p className="text-[11px] uppercase tracking-[0.1em] text-zinc-500 mb-3">Comparison</p>
        <h2 className="text-[28px] sm:text-[34px] font-bold text-white tracking-tight mb-4 leading-[1.15]">
          Compare your options.
        </h2>
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto rounded-2xl">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-white/[0.1] text-[11px] text-zinc-500 uppercase tracking-[0.08em]">
              <th className="py-4 font-normal text-left pl-4">Feature</th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`py-4 px-5 text-left ${col.key === "ours" ? "font-medium text-white" : "font-normal"}`}
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
          <tbody className="text-[14px]">
            {rows.map((row, i) => (
              <tr
                key={row.feature}
                className={`border-b border-white/[0.05] ${i % 2 === 1 ? "bg-white/[0.012]" : ""}`}
              >
                <td className="py-4 pl-4 text-zinc-400">{row.feature}</td>
                {columns.map((col, ci) => {
                  const val = row[col.key as keyof typeof row] as string;
                  const checked = row.check[ci];
                  return (
                    <td
                      key={col.key}
                      className={`py-4 px-5 ${col.key === "ours" ? "text-white font-medium" : "text-zinc-500"}`}
                    >
                      <div className="flex items-center gap-2">
                        <StatusIcon positive={checked} faint={col.key !== "ours"} />
                        {val}
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
      <div className="sm:hidden space-y-3">
        {columns.map((col) => (
          <div
            key={col.key}
            className={`glass-panel rounded-xl p-5 ${
              col.highlight ? "border-amber-400/20" : ""
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              {col.highlight && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
              )}
              <h3 className={`text-[14px] font-medium ${col.highlight ? "text-amber-400" : "text-white"}`}>
                {col.label}
              </h3>
            </div>
            <div className="space-y-3">
              {rows.map((row) => {
                const val = row[col.key as keyof typeof row] as string;
                const ci = columns.indexOf(col);
                const checked = row.check[ci];
                return (
                  <div key={row.feature} className="flex items-center justify-between">
                    <span className="text-[12px] text-zinc-500">{row.feature}</span>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[13px] ${col.highlight ? "text-white font-medium" : "text-zinc-400"}`}>
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