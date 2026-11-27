import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Rashid Mega Mart",
  description:
    "Read how Rashid Mega Mart handles the information you choose to share when contacting our store.",
};

const sections = [
  {
    number: "01",
    title: "Information you choose to share",
    body: "When you contact Rashid Mega Mart or place an enquiry through WhatsApp, you may choose to share details such as your name, phone number, delivery details and shopping requirements. Please share only the information needed to handle your enquiry or order.",
  },
  {
    number: "02",
    title: "How we use your information",
    body: "We use the details you provide to respond to questions, confirm product availability, coordinate orders and provide customer support. We do not ask you to send passwords, card PINs or one-time passwords over chat.",
  },
  {
    number: "03",
    title: "Third-party services",
    body: "If you contact us through WhatsApp, that conversation is handled by WhatsApp and is also subject to its own privacy terms. Links to third-party services are outside our control.",
  },
  {
    number: "04",
    title: "Keeping information safe",
    body: "Please avoid sharing sensitive financial or identity information unless it is genuinely required. If you have a question about information you have shared with us, contact our team using the details below.",
  },
  {
    number: "05",
    title: "Updates to this policy",
    body: "We may update this page when our services or practices change. The latest version will be published here.",
  },
];

const WHATSAPP_URL = "https://wa.me/918962531603";

export default function PrivacyPolicyPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#FAF8F1] px-3 pb-28 pt-5 text-[#24231F] sm:px-6 sm:pt-8 lg:px-8 lg:pb-16">
      <div aria-hidden="true" className="pointer-events-none absolute -left-28 top-24 -z-10 size-72 rounded-full bg-[#D9E9D2]/55 blur-3xl sm:size-[26rem]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 top-[28rem] -z-10 size-80 rounded-full bg-[#F1E3C5]/65 blur-3xl" />

      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/"
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#E7DFD0] bg-white/85 px-4 text-xs font-bold text-[#315F35] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-[#C9DCC4] hover:shadow-md"
        >
          <ArrowLeft size={14} /> Back to store
        </Link>

        <header className="relative mt-5 overflow-hidden rounded-[28px] border border-[#1D7545]/20 bg-[radial-gradient(ellipse_at_75%_20%,rgba(247,201,40,.20),transparent_35%),linear-gradient(135deg,#0A6338_0%,#08703A_55%,#064D2C_100%)] px-5 py-7 text-white shadow-[0_18px_48px_rgba(19,77,43,.18)] sm:mt-7 sm:rounded-[34px] sm:px-10 sm:py-10">
          <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-20 size-64 rounded-full border border-white/10 sm:size-80" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-2 top-12 size-40 rounded-full border border-[#F7C928]/20 sm:right-10 sm:top-8 sm:size-52" />
          <div className="relative flex flex-col items-center text-center sm:flex-row sm:items-center sm:gap-6 sm:text-left">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-[25px] border border-white/55 bg-white p-2.5 shadow-[0_12px_28px_rgba(0,0,0,.16)] sm:size-24 sm:rounded-[28px]">
              <Image
                src="/images/logo2.png"
                alt="Rashid Mega Mart original logo"
                width={88}
                height={88}
                priority
                className="size-full object-contain"
              />
            </div>
            <div className="mt-4 min-w-0 sm:mt-0">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#F9E7A4] backdrop-blur sm:text-[10px]">
                <ShieldCheck size={12} /> Your trust matters
              </span>
              <h1 className="mt-3 text-[clamp(2rem,7vw,3.5rem)] font-black leading-[1.02] tracking-[-0.055em]">
                Privacy <span className="text-[#F7D66D]">Policy</span>
              </h1>
              <p className="mx-auto mt-2 max-w-xl text-[12px] leading-6 text-white/80 sm:mx-0 sm:text-sm">
                A clear, simple explanation of how Rashid Mega Mart handles the information you choose to share with us.
              </p>
            </div>
          </div>
          <div className="relative mt-6 flex flex-wrap items-center justify-center gap-2 border-t border-white/15 pt-4 text-[9px] font-semibold text-white/75 sm:justify-start sm:text-[10px]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5"><CheckCircle2 size={12} className="text-[#F7D66D]" /> Simple and transparent</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5"><Clock3 size={12} className="text-[#F7D66D]" /> Policy updates shown here</span>
          </div>
        </header>

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_270px] lg:items-start lg:gap-6">
          <article className="min-w-0 overflow-hidden rounded-[26px] border border-[#E9E1D2] bg-white/95 p-5 shadow-[0_12px_34px_rgba(57,45,24,.055)] sm:rounded-[30px] sm:p-8 lg:p-9">
            <div className="flex items-start gap-3 border-b border-[#EEE8DD] pb-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3E6] text-[#315F35]">
                <Sparkles size={18} />
              </span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#806000]">Rashid Mega Mart · Customer information</p>
                <p className="mt-1 text-[12px] leading-6 text-[#716B62] sm:text-sm">
                  Your privacy matters to us. This page explains, in simple terms, how we handle information you choose to share when you contact our store.
                </p>
              </div>
            </div>

            <div className="mt-2 divide-y divide-[#EEE8DD]">
              {sections.map((section) => (
                <section key={section.number} className="grid gap-2 py-5 sm:grid-cols-[46px_minmax(0,1fr)] sm:gap-4 sm:py-6">
                  <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[#F7F1E4] text-[10px] font-black tracking-wide text-[#8A6A2B]">
                    {section.number}
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-[15px] font-extrabold tracking-[-0.02em] text-[#29251F] sm:text-base">{section.title}</h2>
                    <p className="mt-2 text-[12px] leading-[1.8] text-[#716B62] sm:text-[13px]">{section.body}</p>
                  </div>
                </section>
              ))}
            </div>
          </article>

          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[24px] border border-[#DCE8D7] bg-[linear-gradient(145deg,#F0F7EC,#FFFFFF)] p-5 shadow-[0_8px_24px_rgba(49,95,53,.06)]">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-white text-[#315F35] shadow-sm">
                <ShieldCheck size={21} />
              </div>
              <h2 className="mt-4 text-base font-black text-[#263B2A]">Share only what is needed</h2>
              <p className="mt-2 text-xs leading-6 text-[#687264]">
                Please do not share passwords, card PINs or one-time passwords over chat.
              </p>
            </div>

            <div className="rounded-[24px] border border-[#E9DFC9] bg-[linear-gradient(145deg,#FFF9E9,#FFFFFF)] p-5 shadow-[0_8px_24px_rgba(90,67,29,.055)]">
              <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#8A6A2B]">Need assistance?</p>
              <h2 className="mt-2 text-base font-black text-[#30251F]">We’re here to help.</h2>
              <p className="mt-2 text-xs leading-6 text-[#716B62]">For a privacy question or request, contact Rashid Mega Mart directly.</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#168447] px-4 text-xs font-extrabold text-white shadow-[0_7px_18px_rgba(22,132,71,.18)] transition hover:-translate-y-0.5 hover:bg-[#106B38] hover:shadow-lg"
              >
                Contact on WhatsApp <ArrowUpRight size={15} />
              </a>
              <p className="mt-3 text-center text-[10px] font-semibold text-[#746D62]">+91 89625 31603</p>
            </div>
          </aside>
        </div>

        <footer className="mt-5 flex flex-col items-center justify-between gap-3 rounded-2xl border border-[#E9E1D2] bg-white/75 px-4 py-4 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-2.5">
            <Image src="/images/logo2.png" alt="" width={34} height={34} className="size-8 object-contain" />
            <div>
              <p className="text-[11px] font-black text-[#30251F]">Rashid Mega Mart</p>
              <p className="text-[9px] text-[#8A8175]">Everyday essentials, thoughtfully packed.</p>
            </div>
          </div>
          <Link href="/" className="inline-flex items-center gap-1 text-[10px] font-extrabold text-[#315F35] transition hover:text-[#800020]">
            Continue shopping <ExternalLink size={12} />
          </Link>
        </footer>
      </div>
    </main>
  );
}
