import Link from "next/link";
import { ArrowRight, BadgeCheck, MessageCircle, Ticket, ShieldCheck } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Coupons & Offers",
  description: "Ask Rashid Mega Mart about currently available and verified grocery coupons.",
};

const couponWhatsApp = "https://wa.me/918962531603?text=" + encodeURIComponent("Hello Rashid Mega Mart! Please share the currently active grocery coupons and their terms.");

export default function CouponsPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#FAF7EF]">
      <section className="relative isolate overflow-hidden bg-[linear-gradient(125deg,#800020_0%,#650019_55%,#202124_100%)] px-4 pb-9 pt-8 text-white sm:px-6 sm:pb-12 sm:pt-12">
        <div className="pointer-events-none absolute -right-14 -top-20 size-64 rounded-full bg-[#F7C928]/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl" data-reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-extrabold tracking-[0.14em]"><Ticket size={14} className="text-[#F7C928]" /> COUPONS · STORE VERIFIED</span>
          <h1 className="mt-4 max-w-2xl text-3xl font-black leading-tight sm:text-5xl">A little extra saving<br /><span className="text-[#F7C928]">starts with the right coupon.</span></h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/85 sm:text-base">Check with our store for current coupon availability, eligible kits and offer terms before placing your order.</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-3 py-8 sm:px-6 sm:py-12">
        <article className="relative overflow-hidden rounded-3xl border border-[#E8DFD1] bg-white p-5 shadow-[0_12px_36px_rgba(32,20,18,0.07)] sm:p-8" data-reveal>
          <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-[#F7C928]/15 blur-2xl" />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-[#FAF0C8] text-[#806000]"><Ticket size={32} /></div>
            <div className="min-w-0 flex-1">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF3E9] px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-[#106B38]"><ShieldCheck size={12} /> Store-confirmed offers</span>
              <h2 className="mt-2 text-xl font-black text-[#202124] sm:text-2xl">Ask for today’s active coupon</h2>
              <p className="mt-2 max-w-2xl text-xs leading-5 text-[#686868] sm:text-sm">Coupon codes and discounts are shared only after the store confirms the current offer. Ask us which coupon applies to your selected kit.</p>
              <a href={couponWhatsApp} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#168447] px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#106B38]"><MessageCircle size={17} /> Get coupon on WhatsApp <ArrowRight size={16} /></a>
            </div>
          </div>
        </article>

        <div className="mt-5 grid gap-3 sm:grid-cols-2" data-reveal-group>
          <article data-reveal-item className="rounded-2xl border border-[#E8DFD1] bg-white p-4"><BadgeCheck className="text-[#168447]" size={21} /><h3 className="mt-2 text-sm font-extrabold text-[#202124]">Verified before checkout</h3><p className="mt-1 text-xs leading-5 text-[#686868]">The store confirms coupon validity, eligible kits and final payable amount on WhatsApp.</p></article>
          <article data-reveal-item className="rounded-2xl border border-[#E8DFD1] bg-white p-4"><Ticket className="text-[#806000]" size={21} /><h3 className="mt-2 text-sm font-extrabold text-[#202124]">No expired code surprises</h3><p className="mt-1 text-xs leading-5 text-[#686868]">We do not display made-up coupon codes or discounts that have not been approved by the store.</p></article>
        </div>
        <div className="mt-7 text-center"><Link href="/deals" className="inline-flex items-center gap-2 text-sm font-extrabold text-[#800020] transition hover:text-[#168447]">Explore Top Deals <ArrowRight size={16} /></Link></div>
      </section>
      <Footer />
    </main>
  );
}
