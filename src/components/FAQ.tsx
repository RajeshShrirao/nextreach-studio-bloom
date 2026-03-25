export default function FAQ() {
  const items = [
    {
      question: "What if you dive into the repo and actually can't fix it?",
      answer:
        "If the AI generated something so fundamentally broken that a surgical fix is impossible within the bounds of this service, you get a 100% refund immediately, along with a clear explanation of what architectural shift you need to make. Zero risk.",
    },
    {
      question: "Do we need to jump on a call so I can explain the codebase?",
      answer:
        "Absolutely not. You know enough to give me the Vercel URL, the repo, and the exact error message your terminal is spitting out. That is all the context I need to trace the stack trace and deploy a fix.",
    },
    {
      question: "Is it safe to share my codebase? Will you steal my idea?",
      answer:
        "I run a dedicated studio building complex AI frameworks and developer tooling. I have zero interest in stealing your niche booking app or lead tracker. My reputation is built on silent, secure infrastructure support.",
    },
    {
      question: "What tech stacks do you support?",
      answer:
        "This offer is hyper-optimized for the standard AI-builder output: Next.js (Pages or App router), React, Supabase, Firebase, Stripe, and Vercel deployments. If your app is built on this stack, I can fix it.",
    },
  ];

  return (
    <section className="max-w-3xl mx-auto px-6 mb-32">
      <h2 className="text-3xl font-bold text-white mb-10 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {items.map((item, i) => (
          <details
            key={item.question}
            className="glass-panel rounded-xl group overflow-hidden"
            open={i === 0}
          >
            <summary className="font-medium text-white cursor-pointer p-6 bg-white/5 hover:bg-white/10 transition-colors flex justify-between items-center">
              {item.question}
              <span className="text-zinc-500 group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <div className="p-6 pt-0 text-sm text-zinc-400 mt-2">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
