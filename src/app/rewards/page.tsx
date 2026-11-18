import Link from "next/link";
import { ArrowLeft, Gift, MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/918962531603?text=" + encodeURIComponent("Hello Rashid Mega Mart! Please tell me about upcoming rewards and offers.");

export default function RewardsPage() {
  return (
    <main className="min-h-[72vh] bg-[#FAFAF7] px-4 py-8 pb-28 sm:py-12">
      <div className="mx-auto max-w-2xl rounded-3xl border border-[#E9E7DE] bg-white p-5 shadow-[0_8px_30px_rgba(44,48,37,0.04)] sm:p-8">
        <Link href="/profile" className="inline-flex items-center gap-2 text-xs font-bold text-[#4D7046] transition hover:opacity-70">
          <ArrowLeft size={15}/> Back to Account
        </Link>
        <div className="mt-8 flex size-14 items-center justify-center rounded-2xl bg-[#F8F1DE] text-[#8A6A22]">
          <Gift size={25}/>
        </div>
        <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#71866A]">Rashid Mega Mart</p>
        <h1 className="mt-2 text-2xl font-black tracking-tight text-[#292B25] sm:text-3xl">Customer Rewards</h1>
        <p className="mt-3 text-sm leading-6 text-[#77776E]">
          We are preparing a rewards programme for our regular customers. There are no points or redeemable rewards active yet, so nothing will be added to your account until the store announces the programme.
        </p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#426B43] px-5 text-sm font-extrabold text-white transition hover:bg-[#345A36]">
          <MessageCircle size={17}/> Ask about upcoming offers
        </a>
      </div>
    </main>
  );
}
