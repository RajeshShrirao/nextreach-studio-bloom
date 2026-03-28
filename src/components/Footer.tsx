export default function Footer() {
  return (
    <footer
      id="pricing"
      className="border-t border-white/10 bg-[#020202] pt-20 pb-10 px-6 text-center"
    >
      <h2 className="text-4xl font-bold text-white mb-6">
        Stop losing customers after hours.
      </h2>
      <p className="text-zinc-400 mb-10 max-w-xl mx-auto">
        Every question unanswered is a customer lost. Every missed call is revenue walking away. Get your AI employee live in 3-5 days.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
        <a
          href="mailto:hello@nextreachstudio.com?subject=I want an AI chatbot for my business"
          className="px-10 py-5 bg-white text-black font-bold text-lg rounded-xl hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)]"
        >
          Starter — $299
        </a>
        <a
          href="mailto:hello@nextreachstudio.com?subject=I want the Pro AI chatbot package"
          className="px-10 py-5 bg-zinc-800 text-white font-bold text-lg rounded-xl hover:bg-zinc-700 transition-all border border-zinc-700"
        >
          Pro — $499
        </a>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto text-xs text-zinc-600 border-t border-white/5 pt-8">
        <p>&copy; 2026 NextReach Studio. All rights reserved.</p>
        <p className="mt-2 md:mt-0">
          AI-Powered Solutions for Small Businesses.
        </p>
      </div>
    </footer>
  );
}
