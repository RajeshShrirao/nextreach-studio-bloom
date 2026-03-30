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
        "Absolutely. It asks about rabies and other required vaccines before capturing a booking request. You set the rules, it enforces them. No more awkward \"did you bring your records?\" conversations.",
    },
    {
      question: "What if someone asks something the bot doesn't know?",
      answer:
        "It collects their name, number, and question, then sends you a notification. The pet parent gets a message like \"Sarah will get back to you within the hour.\" Nobody's left hanging.",
    },
    {
      question: "How long until it's live on my site?",
      answer:
        "3 business days. You fill out a form about your services, breeds, and pricing. We build, train, test, and embed it on your site. You approve, it goes live. No tech work on your end.",
    },
    {
      question: "Can it work with my existing website?",
      answer:
        "Yes! It works on any website — WordPress, Wix, Squarespace, even a plain HTML page. When someone wants to book, the bot captures their breed, service, and preferred time, then sends you a summary by email. You keep your current booking process — we just make sure you never miss a request.",
    },
    {
      question: "Can I see a demo first?",
      answer:
        "That chat bubble in the bottom-right corner? That's a live demo. Try asking it about grooming services, pricing, or booking. That's exactly what your pet parents will see.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-6 sm:px-8 mb-40">
      {/* Section header */}
      <div className="text-center mb-20">
        <p className="text-xs uppercase tracking-[0.12em] text-zinc-500 mb-4 font-light">Questions</p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-[-0.01em] mb-6 leading-[1.2]">
          Answered.
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
            <summary className="font-light text-white cursor-pointer p-6 sm:p-8 bg-white/[0.015] hover:bg-white/[0.025] transition-all duration-300 flex justify-between items-start gap-6 select-none min-h-[60px]">
              <span className="text-lg leading-[1.5] font-light text-left">{item.question}</span>
              <Plus className="w-5 h-5 text-zinc-500 group-open:rotate-45 transition-transform duration-300 ease-out shrink-0 mt-1" />
            </summary>
            <div className="px-6 sm:px-8 pb-8 text-base text-zinc-400 leading-[1.8] font-light">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
