export default function Footer() {
  return (
    <footer
      id="checkout"
      className="border-t border-white/10 bg-[#020202] pt-20 pb-10 px-6 text-center"
    >
      <h2 className="text-4xl font-bold text-white mb-6">
        Ready to cross the finish line?
      </h2>
      <p className="text-zinc-400 mb-10">
        Hand over the repo. Go to sleep. Wake up to a working app.
      </p>
      <button className="px-10 py-5 bg-white text-black font-bold text-lg rounded-xl hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] mb-20">
        Submit Your Broken Repo — $79
      </button>
      <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto text-xs text-zinc-600 border-t border-white/5 pt-8">
        <p>&copy; 2026 NextReach Studio. All rights reserved.</p>
        <p className="mt-2 md:mt-0">
          Premium Asynchronous Infrastructure Support.
        </p>
      </div>
    </footer>
  );
}
