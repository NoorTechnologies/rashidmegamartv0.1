"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Gift, Share2, Sparkles, ShieldCheck } from "lucide-react";

const WHATSAPP_NUMBER = "918962531603";
const STORE_URL = "https://rashidmegamartv0-1.vercel.app";

function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function shareUrl(message: string) {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export default function RewardsExperience() {
  const inviteMessage =
    `Hi! Come shop grocery kits at Rashid Mega Mart. You can get a ₹50 benefit on your first completed order, and I can receive a ₹50 referral reward too.\\n\\n${STORE_URL}\\n\\nWhen ordering, please mention my name: __________\\n\\nThe store team will confirm the benefit after the order is completed.`;

  const claimMessage =
    "Hi Rashid Mega Mart! I came through a referral and would like to request the ₹50 referral benefit. My name: ________. My mobile: ________. Referred by: ________. Please verify my completed order.";

  const repeatMessage =
    "Hi Rashid Mega Mart! I am an existing customer and would like to ask about my ₹50 repeat-order reward. My name: ________. My mobile: ________. Previous order details: ________.";

  return (
    <main className="min-h-[calc(100dvh-76px)] bg-[radial-gradient(ellipse_at_10%_0%,rgba(22,132,71,.10),transparent_34%),#FAF7EF] px-4 pb-14 pt-5 text-[#202124] sm:px-6 sm:pt-8">
      <div className="mx-auto w-full max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full px-2 py-2 text-xs font-bold text-[#686868] transition hover:bg-white hover:text-[#800020]">
          <ArrowLeft size={15} /> Back to shopping
        </Link>

        <section className="relative isolate mt-4 overflow-hidden rounded-[28px] border border-[#A9D5B5] bg-[linear-gradient(120deg,#0D6134_0%,#168447_55%,#104B2B_100%)] px-5 py-7 text-white shadow-[0_18px_48px_rgba(16,107,56,.22)] sm:px-9 sm:py-10">
          <div className="pointer-events-none absolute -right-12 -top-16 size-56 rounded-full bg-[#F7C928]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-12 size-56 rounded-full bg-white/10 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#FFF1A8] backdrop-blur">
              <Sparkles size={12} /> Rashid Mega Mart · Customer Rewards
            </span>
            <div className="mt-5 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <div className="max-w-xl">
                <p className="text-xs font-bold text-white/75">GOOD SHOPPING. GOOD FRIENDS. GOOD REWARDS.</p>
                <h1 className="mt-2 text-3xl font-black leading-[1.08] tracking-tight sm:text-5xl">Share the love.<br /><span className="text-[#FFE17A]">Earn ₹50 rewards.</span></h1>
                <p className="mt-3 max-w-lg text-sm leading-6 text-white/85">Invite a friend to shop with us. Your friend gets a ₹50 benefit and you can receive ₹50 after their first completed order is verified by our store team.</p>
              </div>
              <div className="flex size-28 shrink-0 items-center justify-center rounded-[28px] border border-white/20 bg-white/10 shadow-inner backdrop-blur sm:size-36">
                <Gift className="size-16 text-[#FFE17A] sm:size-20" strokeWidth={1.5} />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur sm:p-4">
                <span className="block text-3xl font-black text-[#FFE17A] sm:text-4xl">₹50</span>
                <span className="mt-1 block text-[11px] font-bold text-white/85 sm:text-xs">For you</span>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur sm:p-4">
                <span className="block text-3xl font-black text-white sm:text-4xl">₹50</span>
                <span className="mt-1 block text-[11px] font-bold text-white/85 sm:text-xs">For your friend</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-4 md:grid-cols-2">
          <article className="rounded-3xl border border-[#E8DFD1] bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-[#FAF0C8] text-[#806000]"><Share2 size={20} /></span>
              <div><p className="text-[10px] font-extrabold uppercase tracking-wider text-[#806000]">Step 1</p><h2 className="text-lg font-extrabold">Invite a friend</h2></div>
            </div>
            <p className="mt-3 text-sm leading-6 text-[#686868]">Share your personal invite and ask your friend to mention your name when ordering.</p>
            <a href={shareUrl(inviteMessage)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#168447] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#106B38] active:scale-[.99]">
              <Image src="/Whatsapp-3d.svg" alt="" width={23} height={23} unoptimized /> Share invite on WhatsApp <ArrowRight size={16} />
            </a>
          </article>

          <article className="rounded-3xl border border-[#E8DFD1] bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-[#EAF3E9] text-[#168447]"><ShieldCheck size={20} /></span>
              <div><p className="text-[10px] font-extrabold uppercase tracking-wider text-[#168447]">Step 2</p><h2 className="text-lg font-extrabold">Verify your reward</h2></div>
            </div>
            <p className="mt-3 text-sm leading-6 text-[#686868]">After the order is completed, message the store with your details and your friend’s name. No account or form needed.</p>
            <a href={whatsappUrl(claimMessage)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#168447] bg-[#F5FBF5] px-4 py-3 text-sm font-extrabold text-[#106B38] transition hover:bg-[#EAF3E9]">
              <Image src="/Whatsapp-3d.svg" alt="" width={23} height={23} unoptimized /> Message the store
            </a>
          </article>
        </section>

        <section className="mt-4 flex flex-col gap-3 rounded-3xl border border-[#E8DFD1] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div><p className="text-[10px] font-extrabold uppercase tracking-wider text-[#806000]">Already shop with us?</p><h2 className="mt-1 text-lg font-extrabold">Ask about your repeat-order reward</h2><p className="mt-1 text-xs leading-5 text-[#686868]">Send your previous order details to the store team.</p></div>
          <a href={whatsappUrl(repeatMessage)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#800020] px-5 py-3 text-xs font-extrabold text-white transition hover:bg-[#650019]"><Image src="/Whatsapp-3d.svg" alt="" width={21} height={21} unoptimized /> Ask for reward</a>
        </section>

        <p className="mt-5 text-center text-[11px] leading-5 text-[#8A8178]">Rewards are manually checked and confirmed by the store team after order completion. No points, wallet or automatic tracking.</p>
        <div className="mt-5 text-center"><Link href="/kits" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-extrabold text-[#800020] transition hover:bg-white">Explore grocery kits <ArrowRight size={15} /></Link></div>
      </div>
    </main>
  );
}
