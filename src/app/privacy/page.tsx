import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <p className="text-zinc-500 text-sm">
            Last updated: March 2026
          </p>
        </div>

        {/* Content */}
        <div className="glass-panel rounded-2xl p-8">
          <div className="prose prose-invert prose-zinc max-w-none space-y-6">
            <section>
              <h2 className="text-lg font-semibold text-white mb-3">1. Information We Collect</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                When you sign up for NextReach Studio, we collect information you provide directly to us,
                including your name, email address, business name, phone number, and any other details
                you share through our contact forms or chat widget.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">2. How We Use Your Information</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="text-zinc-400 text-sm leading-relaxed list-disc list-inside mt-2 space-y-1">
                <li>Provide, maintain, and improve our AI receptionist services</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Communicate with you about products, services, and events</li>
                <li>Monitor and analyze trends, usage, and activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">3. Data Your AI Receptionist Collects</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                When visitors interact with your AI receptionist, we may collect conversation data,
                booking requests, and contact information from pet parents. This data is stored securely
                and is accessible only to you through your admin dashboard.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">4. Data Security</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction. However,
                no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">5. Data Retention</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We retain your personal information for as long as your account is active or as needed
                to provide you services. You may request deletion of your account and associated data
                at any time by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">6. Third-Party Services</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We may use third-party services (such as payment processors and AI providers) that
                have their own privacy policies. We do not sell or rent your personal information
                to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">7. Your Rights</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                You have the right to access, correct, or delete your personal information. To exercise
                these rights, contact us at{" "}
                <a href="mailto:hello@nextreachstudio.com" className="text-amber-400 hover:text-amber-300">
                  hello@nextreachstudio.com
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">8. Changes to This Policy</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes
                by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">9. Contact Us</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{" "}
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