export default function Benefits() {
  const benefits = [
    {
      title: "Answers Questions 24/7",
      description:
        "\"What are your hours?\" \"Do you accept insurance?\" \"How much does X cost?\" — handled automatically, even at 2 AM.",
    },
    {
      title: "Books Appointments",
      description:
        "Customers can schedule directly through the chatbot. No phone tag, no missed calls, no lost bookings.",
    },
    {
      title: "Captures Every Lead",
      description:
        "Website visitors who leave without calling? The chatbot grabs their info before they bounce. You wake up to new leads.",
    },
    {
      title: "Custom Trained on YOUR Business",
      description:
        "Not a generic bot. It knows your services, pricing, policies, and personality. Customers can't tell it's not a person.",
    },
    {
      title: "Cheaper Than a Receptionist",
      description:
        "A part-time receptionist costs $1,500-2,500/month. Your AI employee? $49/month. And it never calls in sick.",
    },
    {
      title: "Works on Your Website",
      description:
        "Seamlessly embedded on your site. No redirects, no pop-ups from third parties. It looks and feels like part of your brand.",
    },
    {
      title: "You Stay in Control",
      description:
        "Full dashboard to review conversations, update answers, and see what customers are actually asking. Real insights, real data.",
    },
    {
      title: "One Customer Pays for It",
      description:
        "One captured lead, one booked appointment, one question answered at midnight — and the chatbot has already paid for itself.",
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-6 mb-32">
      <h2 className="text-3xl font-bold text-white mb-12 text-center">
        What your AI employee does while you&apos;re sleeping.
      </h2>
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
        {benefits.map((b) => (
          <div key={b.title} className="flex items-start gap-4">
            <div className="mt-1 w-2 h-2 rounded-full bg-white shrink-0" />
            <div>
              <h4 className="text-white font-medium mb-1">{b.title}</h4>
              <p className="text-sm text-zinc-400">{b.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
