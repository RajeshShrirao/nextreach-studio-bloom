export default function FAQ() {
  const items = [
    {
      question: "How is this different from ChatGPT on my website?",
      answer:
        "ChatGPT is generic — it doesn't know your business, your pricing, or your policies. Our chatbot is custom-trained on YOUR specific information. It knows your hours, your services, your FAQs. Customers get accurate answers, not hallucinations.",
    },
    {
      question: "What if my customers ask something the bot doesn't know?",
      answer:
        "The chatbot gracefully hands off complex questions to you. It collects the customer's info and question, then notifies you so you can follow up. No customer is ever left hanging.",
    },
    {
      question: "How long does setup take?",
      answer:
        "3-5 business days from the day you send us your business info. We build it, train it, test it, and embed it on your site. You just approve and go live.",
    },
    {
      question: "What's included in the $49/month support?",
      answer:
        "Hosting, uptime monitoring, monthly performance reports, and up to 5 content updates per month (new services, changed hours, etc.). We keep your chatbot accurate and running.",
    },
    {
      question: "Can I see a demo first?",
      answer:
        "Absolutely. Scroll up — there's a live demo chatbot on this page. Try asking it questions. That's exactly what your customers will experience.",
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
