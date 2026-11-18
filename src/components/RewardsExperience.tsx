"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Gift, MessageCircle, Share2 } from "lucide-react";

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
    `Hi! Come shop grocery kits at Rashid Mega Mart. You can get a ₹50 benefit on your first completed order, and I can receive a ₹50 referral reward too.\n\n${STORE_URL}\n\nWhen ordering, please mention my name: __________\n\nThe store team will confirm the benefit after the order is completed.`;

  const claimMessage =
    "Hi Rashid Mega Mart! I came through a referral and would like to request the ₹50 referral benefit. My name: ________. My mobile: ________. Referred by: ________. Please verify my completed order.";

  const repeatMessage =
    "Hi Rashid Mega Mart! I am an existing customer and would like to ask about my ₹50 repeat-order reward. My name: ________. My mobile: ________. Previous order details: ________.";

  return (
    <main className="min-h-[calc(100dvh-76px)] bg-[#FAF7EF] px-4 pb-14 pt-7 text-[#202124] sm:px-6 sm:pt-10">
      <div className="mx-auto w-full max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full px-2 py-2 text-xs font-bold text-[#686868] transition hover:bg-white hover:text-[#800020]">
          <ArrowLeft size={15} /> Back to shopping
        </Link>

        <section className="mt-5 rounded-3xl border border-[#E8DFD1] bg-white px-5 py-8 text-center shadow-sm sm:px-10 sm:py-10">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#FAF0C8] text-[#800020]">
            <Gift size={27} />
          </span>
          <p className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#806000] sm:text-xs">Rashid Mega Mart</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Refer a Friend</h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#686868]">
            Invite a friend on WhatsApp. When their first order is completed, the store team verifies the referral.
          </p>

          <div className="mx-auto mt-6 grid max-w-md grid-cols-2 gap-3">
            <div className="rounded-2xl border border-[#E8DFD1] bg-[#FFFBF1] p-4">
              <span className="block text-3xl font-black text-[#800020]">₹50</span>
              <span className="mt-1 block text-xs font-bold text-[#686868]">You receive</span>
            </div>
            <div className="rounded-2xl border border-[#DCEBDD] bg-[#F5FBF5] p-4">
              <span className="block text-3xl font-black text-[#168447]">₹50</span>
              <span className="mt-1 block text-xs font-bold text-[#686868]">Friend receives</span>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-3xl border border-[#E8DFD1] bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#FAF0C8] text-[#800020]"><Share2 size={19} /></span>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#806000]">Step 1</p>
              <h2 className="text-lg font-extrabold">Share with your friend</h2>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-[#686868]">Send the invite and ask your friend to mention your name while placing the order.</p>
          <a href={shareUrl(inviteMessage)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#168447] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#106B38]">
            <MessageCircle size={18} /> Share invite on WhatsApp <ArrowRight size={16} />
          </a>
        </section>

        <section className="mt-4 rounded-3xl border border-[#E8DFD1] bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#EAF3E9] text-[#168447]"><MessageCircle size={19} /></span>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#806000]">Step 2</p>
              <h2 className="text-lg font-extrabold">Ask the store to verify</h2>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-[#686868]">After the order is completed, send your name, mobile number and your friend’s name to the owner. No form or account needed.</p>
          <a href={whatsappUrl(claimMessage)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#168447] bg-white px-4 py-3 text-sm font-extrabold text-[#168447] transition hover:bg-[#F5FBF5]">
            <MessageCircle size={18} /> Message the store on WhatsApp
          </a>
          <p className="mt-3 text-center text-[11px] leading-5 text-[#8A8178]">The owner checks the completed order and confirms the ₹50 benefit manually.</p>
        </section>

        <section className="mt-4 rounded-3xl border border-[#E8DFD1] bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-base font-extrabold">Existing customer?</h2>
          <p className="mt-2 text-sm leading-6 text-[#686868]">Ask the owner about your ₹50 repeat-order reward on WhatsApp.</p>
          <a href={whatsappUrl(repeatMessage)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#800020] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#650019]">
            <MessageCircle size={17} /> Ask about repeat reward
          </a>
        </section>

        <p className="mt-5 text-center text-[11px] leading-5 text-[#8A8178]">No login, points, wallet or automatic tracking. All rewards are checked and confirmed by the store team.</p>
        <div className="mt-5 text-center">
          <Link href="/kits" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-extrabold text-[#800020] transition hover:bg-white">Continue shopping <ArrowRight size={15} /></Link>
        </div>
      </div>
    </main>
  );
}
