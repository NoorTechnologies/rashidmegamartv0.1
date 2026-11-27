import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Rashid Mega Mart",
  description: "Read how Rashid Mega Mart handles the information you choose to share when contacting our store.",
};

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
    <main className="min-h-screen bg-[#FAF7EF] px-4 py-10 text-[#202124] sm:px-6 sm:py-14">
      <article className="privacy-enter mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#800020] transition-colors hover:text-[#A51D3D]">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="mt-8 rounded-3xl border border-[#800020]/10 bg-white p-6 shadow-[0_16px_50px_rgba(70,40,30,0.05)] sm:p-10">
          <div className="flex items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#F8F5EC] p-2 ring-1 ring-[#E9E2D4]">
              <Image
                src="/images/logo2.png"
                alt="Rashid Mega Mart logo"
                width={48}
                height={48}
                priority
                className="size-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#806000]">Rashid Mega Mart</p>
              <h1 className="mt-1 text-3xl font-black tracking-tight text-[#800020] sm:text-4xl">Privacy Policy</h1>
            </div>
          </div>

          <p className="mt-5 text-sm leading-7 text-[#686868]">
            Your privacy matters to us. This page explains, in simple terms, how we handle information you choose to share when you contact our store.
          </p>

          <div className="mt-8 space-y-7">
            {sections.map((section, index) => (
              <section key={section.title} className="privacy-section border-t border-[#800020]/10 pt-6" style={{ animationDelay: `${index * 90}ms` }}>
                <h2 className="text-base font-extrabold text-[#202124]">{index + 1}. {section.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[#686868]">{section.body}</p>
              </section>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-[#FAF0C8]/70 p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#800020]" />
              <h2 className="text-sm font-extrabold text-[#202124]">Questions or privacy requests?</h2>
            </div>
            <p className="mt-2 text-sm leading-6 text-[#686868]">Contact Rashid Mega Mart on WhatsApp at +91 89625 31603.</p>
            <a href="https://wa.me/918962531603" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-[#168447] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#106B38]">
              Contact us on WhatsApp
            </a>
          </div>
        </div>
      </article>

      <style jsx>{`
        .privacy-enter {
          animation: privacy-enter 650ms cubic-bezier(.2,.75,.25,1) both;
        }
        .privacy-section {
          animation: privacy-section 550ms cubic-bezier(.2,.75,.25,1) both;
        }
        @keyframes privacy-enter {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes privacy-section {
          from { opacity: 0; transform: translateY(9px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .privacy-enter, .privacy-section { animation: none; }
        }
      `}</style>
    </main>
  );
}
