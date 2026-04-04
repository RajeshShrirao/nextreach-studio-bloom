import { Plus } from "lucide-react";

export default function FAQ() {
  const items = [
    {
      question: "What if it says something wrong to a client?",
      answer:
        "It only works with information you give it. If something falls outside that, it tells the client a team member will follow up — never guesses.",
    },
    {
      question: "Will it replace the personal touch I have with clients?",
      answer:
        "It handles logistics. Everything that builds your relationship with clients still happens with you. The AI clears the path so that time is protected.",
    },
    {
      question: "Can it connect with my existing booking system?",
      answer:
        "It captures every detail and sends it straight to your inbox. You confirm bookings the way you always have. No disruption to your current process.",
    },
    {
      question: "What if my clients prefer a real person?",
      answer:
        "Most clients don't care if it's AI — they care that someone answered. If someone insists on a person, the AI captures their number and you call back right away.",
    },
    {
      question: "How long does setup actually take?",
      answer:
        "Three days. We handle everything. You approve before it goes live.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-6 sm:px-8 mb-40">
      {/* Section header */}
      <div className="text-center mb-20">
        <p className="text-xs uppercase tracking-[0.12em] text-zinc-500 mb-4">Questions</p>
        <h2 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl text-white tracking-[-0.01em] mb-6 leading-[1.2]">
          The questions you&apos;re actually thinking about.
        </h2>
      </div>

      {/* Accordion items */}
      <div className="space-y-4">
        {items.map((item, i) => (
          <details
            key={item.question}
            className="glass-panel rounded-2xl group overflow-hidden"
            open={i === 0}
          >
            <summary className="text-white cursor-pointer p-6 sm:p-8 bg-white/[0.015] hover:bg-white/[0.025] transition-all duration-300 flex justify-between items-start gap-6 select-none min-h-[60px]">
              <span className="text-lg leading-[1.5] text-left">{item.question}</span>
              <Plus className="w-5 h-5 text-zinc-500 group-open:rotate-45 transition-transform duration-300 ease-out shrink-0 mt-1" />
            </summary>
            <div className="px-6 sm:px-8 pb-8 text-base text-zinc-400 leading-[1.8]">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
