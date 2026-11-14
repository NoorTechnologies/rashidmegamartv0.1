import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

const sections = [
  {
    title: "Information you choose to share",
    body: "When you contact Rashid Mega Mart or place an enquiry through WhatsApp, you may choose to share details such as your name, phone number, delivery details and shopping requirements. Please share only the information needed to handle your enquiry or order.",
  },
  {
    title: "How we use your information",
    body: "We use the details you provide to respond to questions, confirm product availability, coordinate orders and provide customer support. We do not ask you to send passwords, card PINs or one-time passwords over chat.",
  },
  {
    title: "Third-party services",
    body: "If you contact us through WhatsApp, that conversation is handled by WhatsApp and is also subject to its own privacy terms. Links to third-party services are outside our control.",
  },
  {
    title: "Keeping information safe",
    body: "Please avoid sharing sensitive financial or identity information unless it is genuinely required. If you have a question about information you have shared with us, contact our team using the details below.",
  },
  {
    title: "Updates to this policy",
    body: "We may update this page when our services or practices change. The latest version will be published here.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF8] px-4 py-10 text-[#30251F] sm:px-6 sm:py-14">
      <article className="mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#A83250] transition hover:text-[#87263F]">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <div className="mt-8 rounded-3xl border border-[#A83250]/10 bg-white p-6 shadow-[0_16px_50px_rgba(70,40,30,0.05)] sm:p-10">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-[#F8E8ED] text-[#A83250]">
            <ShieldCheck size={24} />
          </div>
          <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.16em] text-[#A47A2C]">Rashid Mega Mart</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-[#A83250] sm:text-4xl">Privacy Policy</h1>
          <p className="mt-3 text-sm leading-7 text-[#76665C]">
            Your privacy matters to us. This page explains, in simple terms, how we handle information you choose to share when you contact our store.
          </p>
          <div className="mt-8 space-y-7">
            {sections.map((section, index) => (
              <section key={section.title} className="border-t border-[#A83250]/10 pt-6">
                <h2 className="text-base font-extrabold text-[#30251F]">{index + 1}. {section.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[#76665C]">{section.body}</p>
              </section>
            ))}
          </div>
          <div className="mt-8 rounded-2xl bg-[#FFF9D8]/70 p-5">
            <h2 className="text-sm font-extrabold text-[#30251F]">Questions or privacy requests?</h2>
            <p className="mt-2 text-sm leading-6 text-[#76665C]">Contact Rashid Mega Mart on WhatsApp at +91 89625 31603.</p>
            <a href="https://wa.me/918962531603" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-[#138047] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#0F6B3B]">
              Contact us on WhatsApp
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
