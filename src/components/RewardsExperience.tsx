"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Gift,
  HeartHandshake,
  MessageCircle,
  Share2,
  Sparkles,
  TicketPercent,
} from "lucide-react";

const WHATSAPP_NUMBER = "918962531603";
const STORE_URL = "https://rashidmegamartv0-1.vercel.app";

function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function shareUrl(message: string) {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export default function RewardsExperience() {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [referrerName, setReferrerName] = useState("");
  const [orderReference, setOrderReference] = useState("");
  const [repeatName, setRepeatName] = useState("");
  const [repeatPhone, setRepeatPhone] = useState("");
  const [repeatOrder, setRepeatOrder] = useState("");

  const referralMessage =
    `Hey! Shop groceries and family kits from Rashid Mega Mart. 🎁\n\nYou can get ₹50 off your first eligible order after the store confirms it. I can also receive a ₹50 reward.\n\nBrowse: ${STORE_URL}\n\nWhen ordering on WhatsApp, mention my name: ${customerName.trim() || "________"}\n\nOffer is confirmed manually by the store after successful order completion.`;

  const referralClaimMessage =
    `Hi Rashid Mega Mart! I want to claim the Refer & Earn reward.\n\nMy name: ${customerName.trim()}\nMy mobile: +91 ${customerPhone}\nReferred by: ${referrerName.trim()}\nOrder reference (if available): ${orderReference.trim() || "Will share with the team"}\n\nPlease verify the completed order and confirm the ₹50 referral coupon for both customers.`;

  const repeatClaimMessage =
    `Hi Rashid Mega Mart! I want to request my ₹50 repeat-order reward.\n\nName: ${repeatName.trim()}\nMobile: +91 ${repeatPhone}\nPrevious order reference: ${repeatOrder.trim()}\n\nPlease check my completed order and confirm whether my reward coupon is eligible.`;

  const validPhone = (value: string) => /^[6-9]\d{9}$/.test(value);

  return (
    <main className="min-h-[calc(100dvh-76px)] bg-[#FAF8F4] px-4 pb-16 pt-7 text-[#29231F] sm:px-6 sm:pt-12">
      <div className="mx-auto w-full max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full px-2 py-2 text-xs font-bold text-[#76665C] transition hover:bg-white hover:text-[#A83250]">
          <ArrowLeft size={15} /> Back to shopping
        </Link>

        <section className="relative mt-5 overflow-hidden rounded-[28px] border border-[#EDE5D9] bg-white shadow-[0_18px_55px_rgba(49,34,23,0.07)] sm:mt-7 sm:rounded-[36px]">
          <div className="absolute -right-16 -top-20 size-64 rounded-full bg-[#F7EBCB]/70 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 size-64 rounded-full bg-[#F7E8EC]/70 blur-3xl" />
          <div className="relative px-5 py-8 text-center sm:px-12 sm:py-12">
            <span className="mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-[#FFF5D9] text-[#A47A2C] shadow-sm">
              <Gift size={27} strokeWidth={1.8} />
            </span>
            <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#A47A2C] sm:text-xs">A little thank-you for sharing</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-[#30251F] sm:text-5xl">Rewards, made personal.</h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#76665C] sm:text-base">
              Share the love, shop again and request your rewards directly with our store team on WhatsApp.
            </p>

            <div className="mx-auto mt-7 grid max-w-xl grid-cols-2 gap-3 sm:mt-9 sm:gap-4">
              <div className="rounded-2xl border border-[#F0E5C9] bg-[#FFFBF1] px-3 py-4 sm:py-5">
                <span className="block text-3xl font-black tracking-tight text-[#A83250] sm:text-4xl">₹50</span>
                <span className="mt-1 block text-[11px] font-bold text-[#76665C] sm:text-xs">Your referral reward</span>
              </div>
              <div className="rounded-2xl border border-[#DCEBDD] bg-[#F5FBF5] px-3 py-4 sm:py-5">
                <span className="block text-3xl font-black tracking-tight text-[#168447] sm:text-4xl">₹50</span>
                <span className="mt-1 block text-[11px] font-bold text-[#76665C] sm:text-xs">Your friend saves</span>
              </div>
            </div>
            <p className="mt-4 text-[10px] leading-5 text-[#94877C]">Rewards are confirmed manually after the referred order is successfully completed.</p>
          </div>
        </section>

        <div className="mt-6 grid gap-4 lg:grid-cols-2 lg:gap-5">
          <section className="rounded-3xl border border-[#EDE5D9] bg-white p-5 shadow-[0_8px_28px_rgba(49,34,23,0.045)] sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-[#F8E8ED] text-[#A83250]"><Share2 size={20} /></span>
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#A47A2C]">Step 01 · Invite</p>
                <h2 className="text-lg font-extrabold text-[#30251F]">Refer a friend</h2>
              </div>
            </div>
            <p className="mt-4 text-xs leading-5 text-[#76665C]">Share your invite through WhatsApp. Ask your friend to mention your name when placing their order.</p>
            <label htmlFor="referrer-name" className="mb-1.5 mt-5 block text-xs font-bold text-[#554D47]">Your name</label>
            <input id="referrer-name" value={customerName} onChange={(event) => setCustomerName(event.target.value.slice(0, 60))} maxLength={60} placeholder="Enter your name" className="min-h-12 w-full rounded-xl border border-[#EAE4DE] bg-[#FCFBF9] px-4 text-sm outline-none transition focus:border-[#A83250] focus:ring-2 focus:ring-[#A83250]/10" />
            <a href={shareUrl(referralMessage)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#168447] px-4 py-3 text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(22,132,71,0.16)] transition hover:bg-[#116B39] active:scale-[0.99]">
              <MessageCircle size={18} /> Share invite on WhatsApp <ArrowRight size={16} />
            </a>
          </section>

          <section className="rounded-3xl border border-[#EDE5D9] bg-white p-5 shadow-[0_8px_28px_rgba(49,34,23,0.045)] sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-[#EAF5EC] text-[#168447]"><TicketPercent size={20} /></span>
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#A47A2C]">Step 02 · Request</p>
                <h2 className="text-lg font-extrabold text-[#30251F]">Claim referral reward</h2>
              </div>
            </div>
            <p className="mt-4 text-xs leading-5 text-[#76665C]">After your referred order is completed, send these details to the store for verification.</p>
            <div className="mt-5 grid gap-3">
              <div>
                <label htmlFor="claim-name" className="mb-1.5 block text-xs font-bold text-[#554D47]">Your name *</label>
                <input id="claim-name" required value={customerName} onChange={(event) => setCustomerName(event.target.value.slice(0, 60))} maxLength={60} placeholder="Full name" className="min-h-11 w-full rounded-xl border border-[#EAE4DE] bg-[#FCFBF9] px-3.5 text-sm outline-none focus:border-[#A83250]" />
              </div>
              <div>
                <label htmlFor="claim-phone" className="mb-1.5 block text-xs font-bold text-[#554D47]">Your mobile number *</label>
                <input id="claim-phone" type="tel" inputMode="numeric" value={customerPhone} onChange={(event) => setCustomerPhone(event.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="10-digit number" className="min-h-11 w-full rounded-xl border border-[#EAE4DE] bg-[#FCFBF9] px-3.5 text-base outline-none focus:border-[#A83250]" />
              </div>
              <div>
                <label htmlFor="referred-by" className="mb-1.5 block text-xs font-bold text-[#554D47]">Referred by *</label>
                <input id="referred-by" value={referrerName} onChange={(event) => setReferrerName(event.target.value.slice(0, 60))} maxLength={60} placeholder="Friend's name" className="min-h-11 w-full rounded-xl border border-[#EAE4DE] bg-[#FCFBF9] px-3.5 text-sm outline-none focus:border-[#A83250]" />
              </div>
              <div>
                <label htmlFor="ref-order" className="mb-1.5 block text-xs font-bold text-[#554D47]">Order reference (optional)</label>
                <input id="ref-order" value={orderReference} onChange={(event) => setOrderReference(event.target.value.slice(0, 50))} maxLength={50} placeholder="Order date / item / reference" className="min-h-11 w-full rounded-xl border border-[#EAE4DE] bg-[#FCFBF9] px-3.5 text-sm outline-none focus:border-[#A83250]" />
              </div>
            </div>
            <a aria-disabled={!customerName.trim() || !validPhone(customerPhone) || !referrerName.trim()} href={customerName.trim() && validPhone(customerPhone) && referrerName.trim() ? whatsappUrl(referralClaimMessage) : undefined} target="_blank" rel="noopener noreferrer" className={`mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-extrabold text-white transition active:scale-[0.99] ${customerName.trim() && validPhone(customerPhone) && referrerName.trim() ? "bg-[#168447] hover:bg-[#116B39]" : "cursor-not-allowed bg-[#B9C7BC]"}`}>
              <MessageCircle size={18} /> Send claim to owner
            </a>
          </section>

          <section className="rounded-3xl border border-[#EDE5D9] bg-white p-5 shadow-[0_8px_28px_rgba(49,34,23,0.045)] sm:p-7 lg:col-span-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-[#FFF5D9] text-[#A47A2C]"><HeartHandshake size={20} /></span>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#A47A2C]">Come back & save</p>
                  <h2 className="text-lg font-extrabold text-[#30251F]">Repeat Order Reward</h2>
                </div>
              </div>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#F5FBF5] px-3 py-1.5 text-[10px] font-bold text-[#168447]"><Sparkles size={13} /> ₹50 off your next eligible order</span>
            </div>
            <p className="mt-3 max-w-2xl text-xs leading-5 text-[#76665C]">Already shopped with us? Share your previous order details and ask the store to verify your repeat-order reward.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div>
                <label htmlFor="repeat-name" className="mb-1.5 block text-xs font-bold text-[#554D47]">Your name *</label>
                <input id="repeat-name" value={repeatName} onChange={(event) => setRepeatName(event.target.value.slice(0, 60))} placeholder="Full name" className="min-h-11 w-full rounded-xl border border-[#EAE4DE] bg-[#FCFBF9] px-3.5 text-sm outline-none focus:border-[#A83250]" />
              </div>
              <div>
                <label htmlFor="repeat-phone" className="mb-1.5 block text-xs font-bold text-[#554D47]">Mobile number *</label>
                <input id="repeat-phone" type="tel" inputMode="numeric" value={repeatPhone} onChange={(event) => setRepeatPhone(event.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="10-digit number" className="min-h-11 w-full rounded-xl border border-[#EAE4DE] bg-[#FCFBF9] px-3.5 text-base outline-none focus:border-[#A83250]" />
              </div>
              <div>
                <label htmlFor="repeat-order" className="mb-1.5 block text-xs font-bold text-[#554D47]">Previous order details *</label>
                <input id="repeat-order" value={repeatOrder} onChange={(event) => setRepeatOrder(event.target.value.slice(0, 70))} placeholder="Order date / item / reference" className="min-h-11 w-full rounded-xl border border-[#EAE4DE] bg-[#FCFBF9] px-3.5 text-sm outline-none focus:border-[#A83250]" />
              </div>
            </div>
            <a aria-disabled={!repeatName.trim() || !validPhone(repeatPhone) || !repeatOrder.trim()} href={repeatName.trim() && validPhone(repeatPhone) && repeatOrder.trim() ? whatsappUrl(repeatClaimMessage) : undefined} target="_blank" rel="noopener noreferrer" className={`mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-extrabold text-white transition active:scale-[0.99] sm:w-auto sm:min-w-64 ${repeatName.trim() && validPhone(repeatPhone) && repeatOrder.trim() ? "bg-[#A83250] hover:bg-[#87263F]" : "cursor-not-allowed bg-[#C8B9BD]"}`}>
              <MessageCircle size={18} /> Request repeat reward
            </a>
          </section>
        </div>

        <section className="mt-5 rounded-2xl border border-[#EDE5D9] bg-white/80 px-5 py-5 sm:px-7">
          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#168447]" />
            <div>
              <h2 className="text-sm font-extrabold text-[#30251F]">How reward approval works</h2>
              <p className="mt-1 text-xs leading-5 text-[#76665C]">Tell your friend to mention your name at checkout. Once the store confirms the order is completed, the owner verifies eligibility and sends the ₹50 coupon to each eligible customer on WhatsApp. Repeat-order rewards are also verified by the store.</p>
              <p className="mt-2 text-[10px] font-semibold leading-5 text-[#9A8D82]">No automatic tracking or coupon balance is stored on this website. Rewards are subject to owner confirmation and cannot be self-issued.</p>
            </div>
          </div>
        </section>

        <div className="mt-7 text-center">
          <Link href="/kits" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-extrabold text-[#A83250] transition hover:bg-white">Continue shopping <ArrowRight size={15} /></Link>
        </div>
      </div>
    </main>
  );
}
