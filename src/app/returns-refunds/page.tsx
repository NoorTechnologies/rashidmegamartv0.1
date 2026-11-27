import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, RotateCcw, ShieldCheck, MessageCircle, Check } from "lucide-react";

export const metadata = {
  title: "Returns & Refunds | Rashid Mega Mart",
  description: "Understand how to report damaged, incorrect or missing items to Rashid Mega Mart.",
};

const sections = [
  {
    title: "When can I contact you?",
    body: "Please contact Rashid Mega Mart as soon as possible after delivery if an item is damaged, incorrect or missing from your order. Our team will review the details with you.",
  },
  {
    title: "What should I share?",
    body: "Please share your order details and clear photos of the item or package, where relevant. This helps our team understand and review the issue.",
  },
  {
    title: "How are requests reviewed?",
    body: "Our team reviews the product, its condition, the photos you share and the order details. We may contact you if we need more information.",
  },
  {
    title: "Refunds, returns and replacements",
    body: "After reviewing your request, our store team will explain the available next steps directly with you. A return, replacement or refund is not automatic and is not guaranteed by submitting a request.",
  },
  {
    title: "How will I receive an update?",
    body: "Our team will contact you using the details you provide and confirm the applicable resolution and any next steps.",
  },
];

const supportMessage = "Hello Rashid Mega Mart Support, I need help with a return or refund request.\n\nOrder ID: \nIssue (damaged / incorrect / missing item): \nDelivery date: \nDetails: \n\nI can share photos if needed.";

export default function ReturnsRefundsPage() {
  return (
    <main className="min-h-screen bg-[#FAF7EF] px-4 py-10 pb-28 text-[#202124] sm:px-6 sm:py-14">
      <article className="privacy-enter mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#800020] transition-colors hover:text-[#A51D3D]">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="mt-8 rounded-3xl border border-[#800020]/10 bg-white p-6 shadow-[0_16px_50px_rgba(70,40,30,0.05)] sm:p-10">
          <div className="flex items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#F8F5EC] p-2 ring-1 ring-[#E9E2D4]">
              <Image src="/images/logo2.png" alt="Rashid Mega Mart logo" width={48} height={48} priority className="size-full object-contain" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#806000]">Rashid Mega Mart</p>
              <h1 className="mt-1 text-3xl font-black tracking-tight text-[#800020] sm:text-4xl">Returns & Refunds</h1>
            </div>
          </div>

          <p className="mt-5 text-sm leading-7 text-[#686868]">
            Something not right with your grocery delivery? Here is how to report an issue and what happens next.
          </p>

          <div className="mt-7 rounded-2xl border border-[#E8E2D7] bg-[#FAF8F3] p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#800020] ring-1 ring-[#E9E2D4]">
                <RotateCcw size={18} />
              </span>
              <div>
                <h2 className="text-sm font-extrabold text-[#202124]">Please report delivery issues promptly</h2>
                <p className="mt-1 text-sm leading-6 text-[#686868]">Contact us as soon as possible after delivery with your order details and clear photos, where relevant. Our team will review your request before confirming the next steps.</p>
              </div>
            </div>
          </div>

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
              <h2 className="text-sm font-extrabold text-[#202124]">Important to know</h2>
            </div>
            <p className="mt-2 text-sm leading-6 text-[#686868]">Every request is reviewed individually. Contacting us does not automatically confirm a return, replacement or refund. Please never share your OTP, card PIN or banking password.</p>
          </div>

          <div className="mt-6 border-t border-[#800020]/10 pt-6">
            <h2 className="text-base font-extrabold text-[#202124]">Need help with a return or refund?</h2>
            <p className="mt-2 text-sm leading-6 text-[#686868]">Send your order details to our support team on WhatsApp. A message template will be ready for you.</p>
            <a href={`https://wa.me/918962531603?text=${encodeURIComponent(supportMessage)}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#168447] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#106B38]">
              <MessageCircle size={16} /> Contact support on WhatsApp
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
