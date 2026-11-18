"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Gift, MessageCircle, Sparkles } from "lucide-react";

const whatsapp = (message: string) =>
  "https://wa.me/918962531603?text=" + encodeURIComponent(message);

export default function RewardsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF7] px-4 py-5 pb-28 sm:py-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/profile" className="inline-flex min-h-9 items-center gap-2 text-sm font-semibold text-[#53634D] transition hover:text-[#254B29]">
          <ArrowLeft size={16} /> My Account
        </Link>

        <header className="mt-6 border-b border-[#E9E8DF] pb-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#6B8062]">
            <Gift size={16} /> Rashid Mega Mart
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-black tracking-tight text-[#292B25] sm:text-4xl">Customer Rewards</h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5EFD9] px-3 py-1.5 text-[11px] font-bold text-[#806523]">
              <Sparkles size={13} /> Coming soon
            </span>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#696A61] sm:text-base">
            We’re planning something extra for our regular shoppers. The rewards programme isn’t live yet, and no points or cashback are being issued at this time.
          </p>
        </header>

        <section className="mt-6 rounded-2xl border border-[#E7E7DE] bg-white p-4 sm:p-5">
          <h2 className="text-base font-extrabold text-[#292B25]">What we’re planning</h2>
          <div className="mt-4 divide-y divide-[#F0EFE9]">
            <div className="flex gap-3 py-3 first:pt-0">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#F4F1E5] text-[#92752F]"><Gift size={18}/></span>
              <div><h3 className="text-sm font-bold text-[#34352E]">Useful customer benefits</h3><p className="mt-1 text-xs leading-5 text-[#77776E]">Offers and rewards that make regular shopping more worthwhile.</p></div>
            </div>
            <div className="flex gap-3 py-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#EDF3E9] text-[#426B43]"><MessageCircle size={18}/></span>
              <div><h3 className="text-sm font-bold text-[#34352E]">Your suggestions matter</h3><p className="mt-1 text-xs leading-5 text-[#77776E]">Tell us which discounts, gifts or benefits you’d actually use.</p></div>
            </div>
          </div>
        </section>

        <section className="mt-4 flex flex-col gap-3 rounded-2xl bg-[#F0F3EA] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div>
            <h2 className="text-base font-extrabold text-[#292B25]">Have a reward idea?</h2>
            <p className="mt-1 text-xs leading-5 text-[#6F7167]">Send your suggestion directly to our store team.</p>
          </div>
          <a href={whatsapp("Hello Rashid Mega Mart! I have a suggestion for your upcoming customer rewards programme: ")} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#315F35] px-4 text-sm font-bold text-white transition hover:bg-[#254B29]">
            <Image src="/Whatsapp-3d.svg" alt="" width={20} height={20} unoptimized /> Suggest a reward <ArrowUpRight size={16}/>
          </a>
        </section>

        <p className="mt-5 text-center text-xs text-[#898A80]">
          Need help? <a className="font-semibold text-[#426B43] underline underline-offset-2" href={whatsapp("Hello Rashid Mega Mart! I need help with customer rewards.")} target="_blank" rel="noopener noreferrer">Chat with Rashid Mega Mart</a>
        </p>
      </div>
    </main>
  );
}
