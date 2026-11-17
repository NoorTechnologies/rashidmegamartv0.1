import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, MessageCircle, Package, HeartHandshake } from "lucide-react";
import Footer from "@/components/Footer";
import KitCard from "@/components/KitCard";
import { kits } from "@/data/kits";

export default function HomePage() {
  const availableKits = kits.filter((kit) => kit.isAvailable);
  const featuredKits = availableKits.filter((kit) => kit.isFeatured).slice(0, 4);
  const displayKits = featuredKits.length ? featuredKits : availableKits.slice(0, 4);
  const startingPrice = availableKits.length
    ? Math.min(...availableKits.map((kit) => kit.price))
    : null;

  return (
    <main className="min-h-screen w-full overflow-x-clip bg-[#FFF9D8]/30">
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FEF9C3] via-white to-[#FFF9D8]/50 px-3 pb-9 pt-6 text-[#171717] sm:px-5 sm:pb-12 sm:pt-10">
        <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#D4A84F]/15 blur-[90px]" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#A83250]/[0.07] blur-[90px]" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4A84F]/40 bg-white/90 px-4 py-2 text-[10px] font-bold tracking-wide text-[#A83250] shadow-sm sm:text-xs">
            <Package size={15} /> SMART GROCERY KITS
          </span>
          <div className="mt-5 flex flex-col items-center">
            <Image src="/images/logo2.png" alt="Rashid Mega Mart Logo" width={110} height={110} priority className="h-20 w-20 object-contain sm:h-24 sm:w-24" />
            <h1 className="mt-3 max-w-2xl text-2xl font-black leading-tight tracking-tight text-[#171717] sm:text-4xl md:text-5xl">
              Welcome to <span className="mt-1 block text-[#A83250]">Rashid Mega Mart</span>
            </h1>
            <p className="mt-3 max-w-md text-xs leading-6 text-[#6A7282] sm:text-sm">
              Thoughtfully packed grocery kits for your home, at great value.
            </p>
          </div>
          <div className="relative mt-3 w-full max-w-[560px]">
            <div className="pointer-events-none absolute inset-x-8 bottom-2 h-10 rounded-full bg-[#D4A84F]/20 blur-2xl" />
            <div className="relative mx-auto h-[176px] w-full overflow-hidden rounded-2xl sm:h-[340px] sm:rounded-3xl">
              <Image src="/hero.png" alt="Rashid Mega Mart grocery kits" fill priority sizes="(max-width: 640px) 100vw, 560px" className="object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.12)]" />
            </div>
          </div>
          <Link href="/kits" className="rmm-button-primary mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-7 py-3 text-sm">
            Explore Grocery Kits <ArrowRight size={18} />
          </Link>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-semibold text-[#6A7282] sm:text-xs">
            <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#138047]" /> Value-packed combos</span>
            <span className="flex items-center gap-2"><Truck size={16} className="text-[#138047]" /> Delivery on confirmation</span>
          </div>
        </div>
      </section>

      {startingPrice !== null && (
        <section className="mx-auto w-full max-w-7xl px-3 pt-7 min-[480px]:px-5 sm:pt-10 md:px-6 lg:px-8" aria-label="Grocery kit offers">
          <div className="relative isolate overflow-hidden rounded-[24px] bg-gradient-to-r from-[#8F1235] via-[#B51232] to-[#D62E46] px-5 py-6 text-white shadow-[0_18px_45px_rgba(143,18,53,0.22)] sm:rounded-[30px] sm:px-8 sm:py-8 lg:px-10">
            <div className="pointer-events-none absolute -right-10 -top-20 h-56 w-56 rounded-full border-[28px] border-white/10" />
            <div className="pointer-events-none absolute -bottom-24 right-1/3 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white sm:text-xs">
                  <Package size={14} /> Rashid Mega Mart · Kit Offers
                </span>
                <h2 className="mt-3 text-2xl font-black leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                  Ghar ki zaroorat, ek hi kit mein!
                </h2>
                <p className="mt-2 max-w-lg text-xs leading-5 text-white/85 sm:text-sm sm:leading-6">
                  Apni pasand ki grocery kit chunein — everyday essentials ek convenient combo mein.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-xl bg-white px-3.5 py-2 text-sm font-black text-[#9B1738] shadow-sm sm:text-base">
                    Kits {formatPrice(startingPrice)} se shuru
                  </span>
                  <span className="text-[10px] font-semibold text-white/80 sm:text-xs">
                    {availableKits.length} kits available
                  </span>
                </div>
              </div>
              <Link
                href="/kits"
                className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-extrabold text-[#9B1738] shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFF1F3] active:translate-y-0 sm:w-auto"
              >
                Explore All Kits <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto w-full max-w-7xl px-3 pb-10 pt-7 min-[480px]:px-5 sm:pb-14 sm:pt-10 md:px-6 lg:px-8">
        <div className="mb-5 flex items-end justify-between gap-3 sm:mb-6">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#A47A2C] sm:text-xs">Smart shopping combos</p>
            <h2 className="mt-1 text-xl font-extrabold text-[#A83250] sm:text-2xl">Our Grocery Kits</h2>
          </div>
          <Link href="/kits" className="inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-[#A83250] transition hover:text-[#87263F] sm:text-xs">View All <ArrowRight size={15} /></Link>
        </div>
        {displayKits.length ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {displayKits.map((kit, index) => <KitCard key={kit.id} kit={kit} eagerImage={index === 0} />)}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 text-center sm:p-8">
            <Package className="mx-auto text-[#D4A84F]" size={30} />
            <p className="mt-2 text-sm font-semibold text-[#6A7282]">Grocery kits will be available soon.</p>
          </div>
        )}
      </section>

      <section className="mx-auto w-full max-w-7xl px-3 py-8 min-[480px]:px-5 sm:py-12 md:px-6 lg:px-8">
        <div className="mb-5 text-center sm:mb-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#A47A2C] sm:text-xs">Shopping Made Simple</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-[#A83250] sm:text-3xl">Why Choose Us?</h2>
          <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-[#6A7282] sm:text-sm">Convenient grocery kits and easy ordering, all in one place.</p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {[
            { icon: Package, title: "Ready-made Kits", description: "Useful grocery combos for everyday needs.", color: "bg-[#FFF4D6]", iconColor: "text-[#A47A2C]" },
            { icon: MessageCircle, title: "Easy WhatsApp Ordering", description: "Place your kit enquiry directly with our store.", color: "bg-[#E8F5EC]", iconColor: "text-[#138047]" },
            { icon: HeartHandshake, title: "Customer Support", description: "Our team is here to help with your queries.", color: "bg-[#EAF1FF]", iconColor: "text-[#1877F2]" },
          ].map((item) => {
            const Icon = item.icon;
            return <div key={item.title} className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:rounded-3xl sm:p-5">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color} sm:h-12 sm:w-12`}><Icon size={21} className={item.iconColor} /></div>
              <h3 className="mt-3 text-sm font-extrabold text-[#30251F] sm:mt-4">{item.title}</h3>
              <p className="mt-1.5 text-xs leading-5 text-[#6A7282]">{item.description}</p>
            </div>;
          })}
        </div>
      </section>
      <Footer />
    </main>
  );
}
