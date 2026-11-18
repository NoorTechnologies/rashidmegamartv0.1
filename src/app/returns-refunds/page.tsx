import Link from "next/link";
import { ArrowLeft, MessageCircle, RotateCcw } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/918962531603?text=" + encodeURIComponent("Hello Rashid Mega Mart, I need help with a return or refund for my order.");

export const metadata = {
  title: "Returns & Refunds",
  description: "Rashid Mega Mart returns, damaged-item and refund support information.",
};

export default function ReturnsRefundsPage() {
  return (
    <main className="min-h-[70vh] bg-[#FAF8F5] px-4 py-8 pb-28 sm:py-12">
      <article className="mx-auto max-w-3xl rounded-[28px] border border-[#E9E5DC] bg-[#FFFEFA] p-5 shadow-[0_12px_40px_rgba(39,31,22,0.06)] sm:p-9">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#315F35] transition hover:opacity-70"><ArrowLeft size={15} /> Back to store</Link>
        <div className="mt-7 flex size-12 items-center justify-center rounded-2xl bg-[#EAF3E6] text-[#315F35]"><RotateCcw size={22} /></div>
        <p className="mt-5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#52764B]">Customer support</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-[#29231F] sm:text-4xl">Returns & Refunds</h1>
        <p className="mt-3 text-sm leading-7 text-[#716B62]">We want every grocery order from Rashid Mega Mart to reach you correctly and in good condition. If something is not right, contact our team so we can review it.</p>

        <div className="mt-8 space-y-6">
          <section>
            <h2 className="text-base font-extrabold text-[#29231F]">Damaged, incorrect or missing items</h2>
            <p className="mt-2 text-sm leading-7 text-[#716B62]">Please contact us as soon as possible after delivery. Share your order details and clear photos of the item or package so our team can understand the issue.</p>
          </section>
          <section>
            <h2 className="text-base font-extrabold text-[#29231F]">Return and refund review</h2>
            <p className="mt-2 text-sm leading-7 text-[#716B62]">Requests are reviewed based on the product, its condition and the order details. Our team will confirm the available resolution directly with you. A return or refund is not automatic just by submitting a request.</p>
          </section>
          <section>
            <h2 className="text-base font-extrabold text-[#29231F]">Need help?</h2>
            <p className="mt-2 text-sm leading-7 text-[#716B62]">Message our store team with your order information. Please do not share passwords, OTPs or payment PINs.</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#315F35] px-5 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#254B29]"><MessageCircle size={17} /> Contact us on WhatsApp</a>
          </section>
        </div>
        <p className="mt-9 border-t border-[#EAE5DC] pt-5 text-[11px] leading-5 text-[#8A8379]">For any return or refund request, the store team will explain the applicable next steps after reviewing the order.</p>
      </article>
    </main>
  );
}
