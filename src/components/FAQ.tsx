import { Plus } from "lucide-react";

export default function FAQ() {
  const items = [
    {
      question: "Does it know about different breeds and grooming styles?",
      answer:
        "Yes. We train it on your specific services per breed — a poodle cut vs. a teddy bear trim vs. a lion cut. It quotes the right price for the right dog, every time.",
    },
    {
      question: "Can it handle vaccination requirements?",
      answer:
        "Absolutely. It asks about rabies and other required vaccines before confirming any booking. You set the rules, it enforces them. No more awkward \"did you bring your records?\" conversations.",
    },
    {
      question: "What if someone asks something the bot doesn't know?",
      answer:
        "It collects their name, number, and question, then sends you a notification. The pet parent gets a message like \"Sarah will get back to you within the hour.\" Nobody's left hanging.",
    },
    {
      question: "How long until it's live on my site?",
      answer:
        "3 business days. You fill out a form about your services, breeds, and pricing. We build, train, test, and embed it. You approve, it goes live. No tech work on your end.",
    },
    {
      question: "Can it work alongside my existing booking system?",
      answer:
        "Yes. It can link to your existing system (like Gingr, PetExec, or even Google Calendar) or work standalone with email notifications. We'll figure out the best setup during onboarding.",
    },
    {
      question: "Can I see a demo first?",
      answer:
        "That chat bubble in the bottom-right corner? That's a live demo. Try asking it about grooming services, pricing, or booking. That's exactly what your pet parents will see.",
    },
  ];

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 mb-32">
      {/* Section header */}
      <div className="text-center mb-16">
        <p className="text-[11px] uppercase tracking-[0.1em] text-zinc-500 mb-3">FAQ</p>
        <h2 className="text-[28px] sm:text-[34px] font-bold text-white tracking-tight mb-4 leading-[1.15]">
          Questions groomers ask us.
        </h2>
      </div>

      {/* Accordion items */}
      <div className="space-y-3">
        {items.map((item, i) => (
          <details
            key={item.question}
            className="glass-panel rounded-xl group overflow-hidden"
            open={i === 0}
          >
            <summary className="font-medium text-white cursor-pointer p-5 sm:p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-200 flex justify-between items-center gap-4 select-none min-h-[52px]">
              <span className="text-[15px] leading-tight">{item.question}</span>
              <Plus className="w-4 h-4 text-zinc-500 group-open:rotate-45 transition-transform duration-200 ease-out shrink-0" />
            </summary>
            <div className="px-5 sm:px-6 pb-6 text-[14px] text-zinc-400 leading-[1.65]">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}