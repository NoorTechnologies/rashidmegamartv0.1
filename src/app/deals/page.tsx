import Link from "next/link";
import { ArrowRight, Sparkles, Tag } from "lucide-react";
import Footer from "@/components/Footer";
import KitCard from "@/components/KitCard";
import { kits } from "@/data/kits";

export const metadata = {
  title: "Top Deals",
  description: "Explore value-packed grocery kit deals from Rashid Mega Mart.",
};

export default function DealsPage() {
  const available = kits.filter((kit) => kit.isAvailable);
  const featured = [...available].sort((a, b) => {
    const savingA = (a.oldPrice ?? a.price) - a.price;
    const savingB = (b.oldPrice ?? b.price) - b.price;
    return savingB - savingA || a.price - b.price;
  });

  return (
    <main className="min-h-screen overflow-x-clip bg-[#FAF7EF]">
      <section data-reveal className="relative isolate overflow-hidden bg-[linear-gradient(125deg,#106B38_0%,#168447_60%,#800020_100%)] px-4 pb-8 pt-8 text-white sm:px-6 sm:pb-12 sm:pt-12">
        <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-[#F7C928]/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl" data-reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-extrabold tracking-[0.14em]"><Sparkles size={14} className="text-[#F7C928]" /> RASHID MEGA MART · TOP DEALS</span>
          <h1 className="mt-4 max-w-2xl text-3xl font-black leading-tight sm:text-5xl">Smart grocery deals.<br /><span className="text-[#F7C928]">More value in every kit.</span></h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/85 sm:text-base">Explore our available ready-made grocery kits, compare what is included and choose the one that fits your home.</p>
          <Link href="/kits" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#F7C928] px-5 py-3 text-sm font-black text-[#202124] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#FFE16A]">Explore all kits <ArrowRight size={17} /></Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-5 flex items-end justify-between gap-3" data-reveal>
          <div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#806000]">Pick your value</p><h2 className="mt-1 text-2xl font-black text-[#202124] sm:text-3xl">Available Kit Deals</h2><p className="mt-1 text-xs text-[#686868] sm:text-sm">Every kit shows its listed price and included essentials.</p></div>
          <span className="shrink-0 rounded-full bg-[#EAF3E9] px-3 py-1.5 text-[10px] font-extrabold text-[#106B38]">{available.length} kits</span>
        </div>
        {featured.length ? (
          <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-5 lg:grid-cols-3" data-reveal-group>
            {featured.map((kit) => <div key={kit.id} data-reveal-item><KitCard kit={kit} /></div>)}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#E8DFD1] bg-white p-8 text-center"><Tag className="mx-auto text-[#168447]" size={28} /><p className="mt-3 font-bold text-[#202124]">New kit deals are coming soon.</p></div>
        )}
        <p className="mt-6 text-center text-[10px] leading-5 text-[#77716C]">Prices and kit contents are subject to store confirmation. No unverified discount is applied.</p>
      </section>
      <Footer />
    </main>
  );
}
