export default function Footer() {
  return (
    <footer
      id="pricing"
      className="relative bg-[#020202] pt-20 pb-10 px-6 text-center"
    >
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 gradient-divider" />

      <h2 className="text-4xl font-bold text-white mb-6">
        Stop losing customers after hours.
      </h2>
      <p className="text-zinc-400 mb-10 max-w-xl mx-auto">
        Every question unanswered is a customer lost. Every missed call is revenue walking away. Get your AI employee live in 3-5 days.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
        <a
          href="mailto:hello@nextreachstudio.com?subject=I want an AI chatbot for my business"
          className="px-10 py-5 bg-white text-black font-bold text-lg rounded-xl hover:bg-zinc-200 transition-all btn-primary-glow"
        >
          Starter — $299
        </a>
        <a
          href="mailto:hello@nextreachstudio.com?subject=I want the Pro AI chatbot package"
          className="px-10 py-5 bg-zinc-800 text-white font-bold text-lg rounded-xl hover:bg-zinc-700 transition-all border border-zinc-700 hover:border-zinc-600"
        >
          Pro — $499
        </a>
      </div>

      {/* Social proof */}
      <div className="mb-12 flex items-center justify-center gap-2 text-sm text-zinc-500">
        <div className="flex -space-x-1.5">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800 border border-zinc-700" />
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800 border border-zinc-700" />
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800 border border-zinc-700" />
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800 border border-zinc-700" />
        </div>
        <span>Trusted by 50+ small businesses</span>
      </div>

      <div className="gradient-divider max-w-6xl mx-auto mb-8" />

      <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto text-xs text-zinc-600">
        <p>&copy; 2026 NextReach Studio. All rights reserved.</p>
        <p className="mt-2 md:mt-0">
          AI-Powered Solutions for Small Businesses.
        </p>
      </div>
    </footer>
  );
}
