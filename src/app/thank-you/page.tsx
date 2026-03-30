import Link from "next/link";
import { CheckCircle, ArrowLeft, Mail, Clock, Sparkles } from "lucide-react";

export default function ThankYou() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center">
        {/* Success icon */}
        <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <CheckCircle className="w-10 h-10 text-emerald-400" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
          We got your details!
        </h1>

        {/* Message */}
        <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
          Thanks for reaching out. We&apos;re reviewing your business info and
          will build a personalized AI receptionist demo just for you.
        </p>

        {/* What happens next */}
        <div className="glass-panel rounded-2xl p-6 mb-6 text-left">
          <h2 className="text-amber-400 font-semibold text-xs uppercase tracking-widest mb-5">
            What happens next
          </h2>
          <div className="space-y-5">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <p className="text-white text-sm font-medium mb-1">Within 48 hours</p>
                <p className="text-zinc-400 text-sm">
                  We build a custom demo tailored to your salon&apos;s services, breeds, and pricing.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <p className="text-white text-sm font-medium mb-1">Check your inbox</p>
                <p className="text-zinc-400 text-sm">
                  You&apos;ll get an email with your demo link and next steps.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <p className="text-white text-sm font-medium mb-1">Approve & go live</p>
                <p className="text-zinc-400 text-sm">
                  Once you approve the demo, we&apos;ll send a PayPal invoice. No payment until you&apos;re happy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment note */}
        <div className="glass-panel rounded-xl p-4 mb-8">
          <p className="text-zinc-400 text-sm">
            <span className="text-white font-medium">Payment:</span> PayPal invoice via email — no accounts to create, no apps to install.
          </p>
        </div>

        {/* Back to site */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to homepage
        </Link>
      </div>
    </main>
  );
}