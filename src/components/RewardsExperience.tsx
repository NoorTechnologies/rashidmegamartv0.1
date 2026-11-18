"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Gift, Share2, ShieldCheck } from "lucide-react";

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

  return (
    <main className="min-h-[calc(100dvh-76px)] bg-[radial-gradient(ellipse_at_10%_0%,rgba(22,132,71,.08),transparent_34%),#FAF7EF] px-3 pb-28 pt-3 text-[#202124] sm:px-6 sm:pb-16 sm:pt-7">
      <div className="mx-auto w-full max-w-4xl">
        <Link href="/" className="inline-flex min-h-9 items-center gap-2 rounded-full px-2 text-xs font-bold text-[#686868] transition hover:bg-white hover:text-[#800020]">
          <ArrowLeft size={15} /> Back to shopping
        </Link>

        <section className="relative isolate mt-2 overflow-hidden rounded-[22px] border border-[#A9D5B5] bg-[linear-gradient(120deg,#0D6134_0%,#168447_55%,#104B2B_100%)] px-4 py-5 text-white shadow-[0_12px_30px_rgba(16,107,56,.18)] sm:mt-4 sm:rounded-[28px] sm:px-9 sm:py-9">
          <div className="pointer-events-none absolute -right-12 -top-16 size-48 rounded-full bg-[#F7C928]/15 blur-3xl sm:size-56" />
          <div className="relative">
            <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[.12em] text-[#FFF1A8] sm:px-3 sm:text-[10px]">
              RASHID MEGA MART · CUSTOMER REWARDS
            </span>
            <div className="mt-3 flex items-center gap-3 sm:mt-5 sm:gap-6">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold text-white/75 sm:text-xs">GOOD SHOPPING. GOOD FRIENDS. GOOD REWARDS.</p>
                <h1 className="mt-1.5 text-[27px] font-black leading-[1.08] tracking-tight sm:mt-2 sm:text-5xl">
                  Share the love.<br /><span className="text-[#FFE17A]">Earn ₹50 rewards.</span>
                </h1>
                <p className="mt-2 max-w-lg text-[12px] leading-[1.55] text-white/85 sm:mt-3 sm:text-sm sm:leading-6">
                  Invite a friend to shop with us. Your friend gets a ₹50 benefit and you can receive ₹50 after their first completed order is verified by our store team.
                </p>
              </div>
              <div className="flex size-[68px] shrink-0 items-center justify-center rounded-[20px] border border-white/20 bg-white/10 shadow-inner sm:size-36 sm:rounded-[28px]">
                <Gift className="size-9 text-[#FFE17A] sm:size-20" strokeWidth={1.6} />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-6 sm:gap-3">
              <div className="rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 sm:rounded-2xl sm:p-4">
                <span className="block text-[26px] font-black leading-none text-[#FFE17A] sm:text-4xl">₹50</span>
                <span className="mt-1 block text-[10px] font-bold text-white/85 sm:text-xs">For you</span>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 sm:rounded-2xl sm:p-4">
                <span className="block text-[26px] font-black leading-none text-white sm:text-4xl">₹50</span>
                <span className="mt-1 block text-[10px] font-bold text-white/85 sm:text-xs">For your friend</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-3 grid gap-3 md:mt-4 md:grid-cols-2 md:gap-4">
          <article className="rounded-[20px] border border-[#E8DFD1] bg-white p-4 shadow-[0_4px_16px_rgba(32,20,18,.04)] sm:rounded-3xl sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#FAF0C8] text-[#806000] sm:size-11 sm:rounded-2xl"><Share2 size={19} /></span>
              <div><p className="text-[9px] font-extrabold uppercase tracking-wider text-[#806000]">STEP 1</p><h2 className="text-base font-extrabold sm:text-lg">Invite a friend</h2></div>
            </div>
            <p className="mt-2 text-[12px] leading-5 text-[#686868] sm:mt-3 sm:text-sm sm:leading-6">Share your invite and ask your friend to mention your name when ordering.</p>
            <a href={shareUrl(inviteMessage)} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#168447] px-3 py-2.5 text-xs font-extrabold text-white transition hover:bg-[#106B38] active:scale-[.99] sm:mt-5 sm:min-h-12 sm:text-sm">
              <Image src="/Whatsapp-3d.svg" alt="" width={22} height={22} unoptimized /> Share invite on WhatsApp <ArrowRight size={15} />
            </a>
          </article>

          <article className="rounded-[20px] border border-[#E8DFD1] bg-white p-4 shadow-[0_4px_16px_rgba(32,20,18,.04)] sm:rounded-3xl sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF3E9] text-[#168447] sm:size-11 sm:rounded-2xl"><ShieldCheck size={19} /></span>
              <div><p className="text-[9px] font-extrabold uppercase tracking-wider text-[#168447]">STEP 2</p><h2 className="text-base font-extrabold sm:text-lg">Verify your reward</h2></div>
            </div>
            <p className="mt-2 text-[12px] leading-5 text-[#686868] sm:mt-3 sm:text-sm sm:leading-6">After the order is completed, message the store with your details and your friend’s name. No account or form needed.</p>
            <a href={whatsappUrl(claimMessage)} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#168447] bg-[#F5FBF5] px-3 py-2.5 text-xs font-extrabold text-[#106B38] transition hover:bg-[#EAF3E9] sm:mt-5 sm:min-h-12 sm:text-sm">
              <Image src="/Whatsapp-3d.svg" alt="" width={22} height={22} unoptimized /> Message the store
            </a>
          </article>
        </section>

        <p className="mx-auto mt-4 max-w-2xl text-center text-[10px] leading-[1.55] text-[#8A8178] sm:mt-5 sm:text-[11px] sm:leading-5">Rewards are manually checked and confirmed by the store team after order completion. No points, wallet or automatic tracking.</p>
        <div className="mt-3 text-center sm:mt-5"><Link href="/kits" className="inline-flex min-h-10 items-center gap-2 rounded-full px-5 py-2.5 text-xs font-extrabold text-[#800020] transition hover:bg-white">Explore grocery kits <ArrowRight size={15} /></Link></div>
      </div>
    </main>
  );
}
