import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Gift, Heart, Sparkles, Star } from "lucide-react";

const whatsapp = (message: string) =>
  "https://wa.me/918962531603?text=" + encodeURIComponent(message);

export default function RewardsPage() {
  return (
    <main className="relative isolate min-h-[78vh] overflow-hidden bg-[#F7F7F1] px-4 py-6 pb-28 sm:py-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(221,235,205,0.9),transparent_68%)]" />
      <div className="mx-auto max-w-5xl">
        <Link href="/profile" className="inline-flex items-center gap-2 rounded-full border border-[#E7E8DE] bg-white/80 px-3 py-2 text-xs font-bold text-[#52634B] shadow-sm transition hover:bg-white">
          <ArrowLeft size={14}/> Back to Account
        </Link>

        <section className="relative mt-5 overflow-hidden rounded-[30px] border border-[#E5E9D9] bg-[#254D32] px-5 py-8 text-white shadow-[0_22px_65px_rgba(37,77,50,0.18)] sm:px-10 sm:py-11">
          <div aria-hidden="true" className="absolute -right-12 -top-16 size-64 rounded-full border-[35px] border-white/[0.06]" />
          <div aria-hidden="true" className="absolute -bottom-28 right-28 size-64 rounded-full bg-[#D5B965]/15 blur-3xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_220px]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#E6EBCF]">
                <Sparkles size={13}/> A little extra for our regulars
              </span>
              <p className="mt-5 text-xs font-bold tracking-[0.2em] text-[#D6DDBE]">RASHID MEGA MART</p>
              <h1 className="mt-2 max-w-xl text-3xl font-black leading-[1.08] tracking-tight sm:text-5xl">Good shopping deserves a little more love.</h1>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
                We’re shaping something special for our regular customers. Tell us what kind of rewards would make your everyday shopping better.
              </p>
              <a href={whatsapp("Namaste Rashid Mega Mart! Mujhe aapke upcoming customer rewards programme ke baare mein jaankari chahiye. Please details share karein.")} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#F0D78C] px-5 text-sm font-extrabold text-[#2F422E] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#F6E4A8]">
                <Image src="/Whatsapp-3d.svg" alt="" width={21} height={21} unoptimized/> Ask about rewards <ArrowUpRight size={16}/>
              </a>
            </div>
            <div className="mx-auto flex size-44 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] shadow-[inset_0_0_45px_rgba(255,255,255,0.08)] sm:size-52">
              <div className="flex size-32 items-center justify-center rounded-full bg-[#F0D78C] text-[#315338] shadow-xl sm:size-40">
                <Gift size={76} strokeWidth={1.35}/>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border border-[#E8E9DF] bg-white p-5 shadow-[0_8px_26px_rgba(44,48,37,0.035)]">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-[#F7F1DE] text-[#9B792C]"><Star size={20}/></span>
            <h2 className="mt-4 text-base font-extrabold text-[#292B25]">Made for regulars</h2>
            <p className="mt-2 text-xs leading-5 text-[#77776E]">We want future rewards to feel useful for the customers who shop with us again and again.</p>
          </article>
          <article className="rounded-3xl border border-[#E8E9DF] bg-white p-5 shadow-[0_8px_26px_rgba(44,48,37,0.035)]">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-[#EDF4E9] text-[#426B43]"><Gift size={20}/></span>
            <h2 className="mt-4 text-base font-extrabold text-[#292B25]">Still in the works</h2>
            <p className="mt-2 text-xs leading-5 text-[#77776E]">The rewards programme is not active yet. No points, cashback or redemption benefits are currently being issued.</p>
          </article>
          <article className="rounded-3xl border border-[#E8E9DF] bg-white p-5 shadow-[0_8px_26px_rgba(44,48,37,0.035)]">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-[#F9ECE8] text-[#A75B4D]"><Heart size={20}/></span>
            <h2 className="mt-4 text-base font-extrabold text-[#292B25]">Your idea matters</h2>
            <p className="mt-2 text-xs leading-5 text-[#77776E]">Suggest discounts, useful gifts or benefits you would genuinely enjoy. We’ll pass your idea to the store team.</p>
          </article>
        </section>

        <section className="mt-5 flex flex-col gap-4 rounded-3xl border border-[#E6E8DD] bg-[#F0F3E9] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="max-w-xl">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#71866A]">Help us shape it</p>
            <h2 className="mt-1 text-xl font-black tracking-tight text-[#292B25]">What reward would you love?</h2>
            <p className="mt-1 text-xs leading-5 text-[#77776E]">Share your suggestion directly with Rashid Mega Mart.</p>
          </div>
          <a href={whatsapp("Namaste Rashid Mega Mart! Mera rewards programme ke liye suggestion hai: [Apna suggestion yahan likhein].") } target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#315F35] px-4 text-xs font-extrabold text-white transition hover:bg-[#254B29]">
            <Image src="/Whatsapp-3d.svg" alt="" width={20} height={20} unoptimized/> Suggest a reward <ArrowUpRight size={15}/>
          </a>
        </section>
      </div>
    </main>
  );
}
