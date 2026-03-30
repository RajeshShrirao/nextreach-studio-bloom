import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <main className="min-h-screen px-4 py-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to homepage
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-zinc-500 text-sm">
            Last updated: March 2026
          </p>
        </div>

        {/* Content */}
        <div className="glass-panel rounded-2xl p-8">
          <div className="prose prose-invert prose-zinc max-w-none space-y-6">
            <section>
              <h2 className="text-lg font-semibold text-white mb-3">1. Agreement to Terms</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                By accessing or using NextReach Studio&apos;s services, you agree to be bound by these
                Terms of Service and all applicable laws and regulations. If you do not agree with
                any of these terms, you are prohibited from using or accessing this service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">2. Description of Service</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                NextReach Studio provides AI-powered receptionist services for pet grooming salons
                and veterinary clinics. Our service includes a customizable chatbot that handles
                booking requests, answers customer questions, and captures leads on your website.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">3. Pricing & Payment</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Pricing is as follows:
              </p>
              <ul className="text-zinc-400 text-sm leading-relaxed list-disc list-inside mt-2 space-y-1">
                <li><strong>Starter Plan:</strong> $299 one-time setup + $49/month</li>
                <li><strong>Pro Plan:</strong> $499 one-time setup + $79/month</li>
              </ul>
              <p className="text-zinc-400 text-sm leading-relaxed mt-3">
                Payment is due before your AI receptionist goes live. We accept payment via PayPal.
                Monthly subscription fees are billed automatically unless you cancel.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">4. Cancellation & Refunds</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                You may cancel your subscription at any time. Cancellation takes effect at the end
                of your current billing period. Setup fees are non-refundable once we have begun
                building your demo. Monthly subscription fees are non-refundable.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">5. Your Responsibilities</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                You are responsible for:
              </p>
              <ul className="text-zinc-400 text-sm leading-relaxed list-disc list-inside mt-2 space-y-1">
                <li>Providing accurate business information for your AI receptionist</li>
                <li>Keeping your account credentials secure</li>
                <li>Ensuring your use of the service complies with applicable laws</li>
                <li>Responding to customer inquiries that your AI receptionist escalates to you</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">6. Intellectual Property</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                NextReach Studio and its original content, features, and functionality are owned by
                NextReach Studio and are protected by international copyright, trademark, and other
                intellectual property laws. Your custom AI receptionist configuration remains your property.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">7. Limitation of Liability</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                NextReach Studio shall not be liable for any indirect, incidental, special, consequential,
                or punitive damages resulting from your use or inability to use the service. Our total
                liability shall not exceed the amount you paid for the service in the 12 months preceding
                the claim.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">8. Service Availability</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We strive for 99.9% uptime but do not guarantee uninterrupted service. Scheduled maintenance
                will be communicated in advance when possible. We are not responsible for outages caused
                by factors beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">9. Modifications</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify you of significant
                changes via email. Continued use of the service after changes constitutes acceptance of
                the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">10. Governing Law</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                These Terms shall be governed by the laws of the United States, without regard to its
                conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">11. Contact Us</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                If you have any questions about these Terms, please contact us at{" "}
                <a href="mailto:hello@nextreachstudio.com" className="text-amber-400 hover:text-amber-300">
                  hello@nextreachstudio.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}