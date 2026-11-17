import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, MessageCircle, Package, Wallet, ClipboardList } from "lucide-react";
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
        <section className="mx-auto w-full max-w-7xl px-3 pt-3 min-[480px]:px-5 sm:pt-4 md:px-6 lg:px-8" aria-label="Grocery kit starting price">
          <Link
            href="/kits"
            className="group flex min-h-12 items-center justify-between gap-3 rounded-xl border border-[#F0D8DC] bg-white px-3.5 py-2.5 shadow-sm transition hover:border-[#D98A99] hover:shadow-md sm:px-4"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#FFF0F2] text-[#B51232]">
                <Package size={16} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-xs font-bold text-[#30251F] sm:text-sm">Grocery kits starting at ₹{startingPrice.toLocaleString("en-IN")}</span>
                <span className="block text-[10px] text-[#8A7778] sm:text-xs">{availableKits.length} kits to explore</span>
              </span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 text-[10px] font-bold text-[#A83250] sm:text-xs">
              View kits <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
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
        <div className="mx-auto mb-6 max-w-2xl text-center sm:mb-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#A47A2C] sm:text-xs">Grocery Shopping, Made Easier</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-[#A83250] sm:text-3xl">Why Choose Us?</h2>
          <p className="mx-auto mt-2 max-w-lg text-xs leading-5 text-[#6A7282] sm:text-sm">Market ke chakkar aur fixed grocery combos ki tension chhodiye. Apni zaroorat batayein, humse ghar baithe baat karein.</p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {[
            { icon: Truck, problem: "Market Jaane Ka Time Nahi?", solution: "Ghar baithe WhatsApp par apni grocery list bhej dijiye.", tint: "bg-[#FFF4D6]", ink: "text-[#A47A2C]" },
            { icon: Package, problem: "Ready Kit Ke Baare Mein Jankari Chahiye?", solution: "Available grocery kits ke products aur details WhatsApp par poochhein.", tint: "bg-[#FCECEF]", ink: "text-[#A83250]" },
            { icon: Wallet, problem: "Budget Ka Rakhna Hai Dhyan?", solution: "Apne budget ke hisaab se available ready-made kits dekhein.", tint: "bg-[#E8F5EC]", ink: "text-[#138047]" },
            { icon: ClipboardList, problem: "Monthly Grocery Manage Karna Mushkil?", solution: "Monthly needs ke liye available kits dekhein aur order details confirm karein.", tint: "bg-[#EAF1FF]", ink: "text-[#1877F2]" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.problem} className="flex gap-3 rounded-2xl border border-[#F0E5D8] bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:gap-4 sm:p-5">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.tint} sm:h-12 sm:w-12`}>
                  <Icon size={21} className={item.ink} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-extrabold text-[#30251F] sm:text-base">{item.problem}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-[#6A7282] sm:text-sm">{item.solution}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-4 rounded-xl border border-[#E9E1DA] bg-white px-3 py-3 text-center sm:mt-7 sm:rounded-2xl sm:px-6 sm:py-6">
          <p className="text-base font-black text-[#30251F] sm:text-lg">Apni Zaroorat Ki Kit Khud Banayein</p>
          <p className="mx-auto mt-1.5 max-w-lg text-xs leading-5 text-[#6A7282] sm:text-sm">Ready-made kit ke items badlein, quantity set karein aur apni pasand ke grocery items add karein.</p>
          <div className="mt-4 flex flex-col justify-center gap-2 min-[420px]:flex-row">
            <a href="https://wa.me/918962531603?text=Namaste%2C%20mujhe%20apni%20grocery%20kit%20customize%20karni%20hai." target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#A83250] px-5 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#87263F] sm:text-sm">
              <Image src="/Whatsapp-3d.svg" alt="" width={20} height={20} className="h-5 w-5 object-contain" /> Kit Customize Karein
            </a>
            <Link href="/kits" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#D9C6B2] bg-white px-5 py-3 text-xs font-bold text-[#A83250] transition hover:border-[#A83250] sm:text-sm">
              Ready Kits Dekhein <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
