import Link from "next/link";

export default function ThankYou() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/20">
          <span className="text-4xl">🐾</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          We got your details!
        </h1>

        {/* Message */}
        <p className="text-gray-400 text-lg mb-6 leading-relaxed">
          Thanks for reaching out. We&apos;re reviewing your business info and
          will build a personalized AI receptionist demo just for you.
        </p>

        {/* What happens next */}
        <div className="glass-panel rounded-2xl p-6 mb-8 text-left">
          <h2 className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-4">
            What happens next
          </h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="text-amber-400 font-bold shrink-0">1.</span>
              <p className="text-gray-300 text-sm">
                We build a custom demo tailored to your salon — usually within
                48 hours.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-amber-400 font-bold shrink-0">2.</span>
              <p className="text-gray-300 text-sm">
                You&apos;ll get an email at{" "}
                <span className="text-white">the address you provided</span>{" "}
                with your demo link and next steps.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-amber-400 font-bold shrink-0">3.</span>
              <p className="text-gray-300 text-sm">
                Once you approve the demo, we&apos;ll send a PayPal invoice for
                your chosen plan. No payment until you&apos;re happy with what
                you see.
              </p>
            </div>
          </div>
        </div>

        {/* Payment note */}
        <div className="glass-panel rounded-xl p-4 mb-8">
          <p className="text-gray-400 text-sm">
            💳 <span className="text-white font-medium">Payment info:</span>{" "}
            We&apos;ll send you a PayPal invoice directly via email — no
            accounts to create, no apps to install. Just pay and your AI
            receptionist goes live.
          </p>
        </div>

        {/* Back to site */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
