import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Package, Wallet, ClipboardList } from "lucide-react";
import Footer from "@/components/Footer";
import FeaturedKitsCarousel from "@/components/FeaturedKitsCarousel";
import { kits } from "@/data/kits";

export default function HomePage() {
  const availableKits = kits.filter((kit) => kit.isAvailable);
  const featuredKits = availableKits.filter((kit) => kit.isFeatured).slice(0, 4);
  const displayKits = featuredKits.length ? featuredKits : availableKits.slice(0, 4);
  const startingPrice = availableKits.length
    ? Math.min(...availableKits.map((kit) => kit.price))
    : null;

  return (
    <main className="min-h-screen w-full overflow-x-clip bg-[#FAF7EF]">
      <section data-reveal-group className="rmm-home-hero relative isolate overflow-hidden px-3 pb-6 pt-4 text-[#202124] sm:px-6 sm:pb-10 sm:pt-8 lg:px-8 lg:pb-14 lg:pt-10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(145deg,#F3EBDD_0%,#FFFEFA_48%,#EDF4EA_100%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-0 -z-10 size-72 rounded-full bg-[#F7C928]/20 blur-3xl sm:size-[26rem]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-0 -z-10 size-80 rounded-full bg-[#168447]/[0.12] blur-3xl sm:size-[30rem]" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-4 sm:gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div className="min-w-0 text-center lg:col-start-1 lg:row-start-1 lg:text-left">
            <span data-reveal-item className="inline-flex items-center gap-2 rounded-full border border-[#DCCB9E] bg-white/90 px-3.5 py-2 text-[9px] font-extrabold tracking-[0.12em] text-[#315F35] shadow-[0_7px_22px_rgba(71,55,24,0.07)] sm:text-[10px]">
              <Package size={14} /> GROCERY KITS FOR EVERYDAY NEEDS
            </span>
            <div className="mt-3 flex flex-col items-center lg:mt-5 lg:items-start">
              <div data-reveal-item className="flex size-12 items-center justify-center rounded-[17px] border border-white bg-white/85 shadow-[0_8px_24px_rgba(52,43,25,0.10)] sm:size-14">
                <Image src="/images/logo2.png" alt="Rashid Mega Mart" width={48} height={48} priority className="size-10 object-contain sm:size-12" />
              </div>
              <h1 data-reveal-item className="mt-3 max-w-[620px] text-[clamp(2rem,8vw,3.8rem)] font-black leading-[0.99] tracking-[-0.065em] text-[#25221E] sm:mt-4">
                Grocery shopping,
                <span className="mt-1.5 block bg-gradient-to-r from-[#168447] via-[#267A3D] to-[#800020] bg-clip-text text-transparent">made wonderfully easy.</span>
              </h1>
              <p data-reveal-item className="mt-3 max-w-[430px] text-[12px] leading-[1.7] text-[#71685E] sm:mt-4 sm:text-sm">
                Everyday essentials, thoughtfully packed into value-filled kits for your home.
              </p>
            </div>
          </div>

          <div data-reveal-item className="relative mx-auto w-full max-w-[560px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-none">
            <div aria-hidden="true" className="absolute inset-[9%] rounded-full bg-[#D7C18A]/40 blur-3xl" />
            <div className="relative flex h-[clamp(190px,58vw,270px)] items-center justify-center overflow-hidden rounded-[26px] border border-white/90 bg-[radial-gradient(ellipse_at_50%_35%,#FFFDF7_0%,#F7EFD9_65%,#EAF1E7_100%)] shadow-[0_18px_48px_rgba(72,55,28,0.12),inset_0_1px_0_rgba(255,255,255,0.95)] sm:h-[340px] sm:rounded-[34px] lg:h-[440px]">
              <div aria-hidden="true" className="absolute left-1/2 top-1/2 aspect-square w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D9C99F]/65 bg-[radial-gradient(circle,rgba(247,201,40,0.20),rgba(247,201,40,0.04)_58%,transparent_70%)]" />
              <div aria-hidden="true" className="absolute bottom-7 left-1/2 h-7 w-[58%] -translate-x-1/2 rounded-[50%] bg-[#315F35]/20 blur-xl" />
              <Image src="/hero.png" alt="Rashid Mega Mart grocery storefront" fill priority sizes="(max-width: 1023px) 100vw, 55vw" className="relative z-10 object-contain p-2 drop-shadow-[0_18px_24px_rgba(40,30,12,0.18)] sm:p-4" />
              <span className="absolute left-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/90 bg-white/90 px-3 py-2 text-[9px] font-extrabold text-[#315F35] shadow-md sm:left-5 sm:top-5 sm:text-[10px]">
                <span className="size-1.5 rounded-full bg-[#168447]" /> Fresh value, every day
              </span>
              <span className="absolute bottom-3 right-3 z-20 rounded-full border border-white/90 bg-[#800020] px-3 py-2 text-[9px] font-extrabold tracking-wide text-white shadow-lg sm:bottom-5 sm:right-5 sm:px-4 sm:text-[10px]">
                VALUE · QUALITY · CARE
              </span>
            </div>
          </div>

          <div className="flex min-w-0 flex-col items-center lg:col-start-1 lg:row-start-2 lg:items-start">
            <Link data-reveal-item href="/kits" className="rmm-button-primary group inline-flex min-h-12 w-full max-w-[340px] items-center justify-center gap-2 rounded-2xl px-7 py-3.5 text-[13px] font-extrabold shadow-[0_12px_26px_rgba(22,132,71,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(22,132,71,0.28)] active:scale-[0.98] sm:w-auto sm:min-w-[240px]">
              Explore Grocery Kits <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <div data-reveal-item className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] font-bold text-[#625F56] lg:justify-start sm:text-[11px]">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck size={15} className="text-[#168447]" /> Value-packed combos</span>
              <span className="inline-flex items-center gap-1.5"><Truck size={15} className="text-[#168447]" /> Delivery on confirmation</span>
            </div>
          </div>
        </div>
      </section>


      {startingPrice !== null && (
        <section data-reveal className="mx-auto w-full max-w-7xl px-3 pt-1 min-[480px]:px-5 sm:pt-3 md:px-6 lg:px-8" aria-label="Grocery kit starting price">
          <Link
            href="/kits"
            className="rmm-kit-discovery group relative isolate flex min-h-[82px] items-center justify-between gap-3 overflow-hidden rounded-[20px] border border-[#E1D4B8] bg-[linear-gradient(110deg,#FFFDF8_0%,#F8F1E2_52%,#F0F5EC_100%)] px-3.5 py-3 shadow-[0_8px_24px_rgba(62,47,22,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] transition duration-300 hover:-translate-y-0.5 hover:border-[#C8B27F] hover:shadow-[0_14px_30px_rgba(62,47,22,0.13)] sm:min-h-[98px] sm:rounded-[24px] sm:px-5 sm:py-4"
          >
            <span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-12 -z-10 size-36 rounded-full bg-[#168447]/[0.08] blur-2xl transition-transform duration-500 group-hover:scale-125" />
            <span className="flex min-w-0 items-center gap-3 sm:gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-[15px] border border-[#E5D8BB] bg-white text-[#168447] shadow-[0_4px_12px_rgba(67,50,22,0.07)] sm:size-14 sm:rounded-[18px]">
                <Package size={21} strokeWidth={2.1} />
              </span>
              <span className="min-w-0">
                <span className="block text-[9px] font-black uppercase tracking-[0.13em] text-[#806000] sm:text-[10px]">Find your everyday essentials</span>
                <span className="mt-0.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="text-[clamp(1.35rem,5vw,1.8rem)] font-black leading-none tracking-[-0.055em] text-[#800020]">Kits from ₹{startingPrice.toLocaleString("en-IN")}</span>
                  <span className="text-[9px] font-semibold text-[#756D62] sm:text-[10px]">{availableKits.length} curated kits</span>
                </span>
              </span>
            </span>
            <span className="inline-flex min-h-9 shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#315F35] px-3 text-[9px] font-extrabold text-white shadow-[0_5px_12px_rgba(49,95,53,0.18)] transition duration-300 group-hover:bg-[#244A29] group-hover:shadow-[0_7px_16px_rgba(49,95,53,0.24)] sm:min-h-11 sm:px-5 sm:text-[11px]">
              Explore <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </section>
      )}

      <section data-reveal className="mx-auto w-full max-w-7xl px-3 pb-10 pt-7 min-[480px]:px-5 sm:pb-14 sm:pt-10 md:px-6 lg:px-8">
        <div className="mb-5 flex items-end justify-between gap-3 sm:mb-6">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#806000] sm:text-xs">Smart shopping combos</p>
            <h2 className="mt-1 text-xl font-extrabold text-[#168447] sm:text-2xl">Our Grocery Kits</h2>
          </div>
          <Link href="/kits" className="inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-[#168447] transition hover:text-[#106B38] sm:text-xs">View All <ArrowRight size={15} /></Link>
        </div>
        {displayKits.length ? (
          <FeaturedKitsCarousel kits={displayKits} />
        ) : (
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 text-center sm:p-8">
            <Package className="mx-auto text-[#F7C928]" size={30} />
            <p className="mt-2 text-sm font-semibold text-[#686868]">Grocery kits will be available soon.</p>
          </div>
        )}
      </section>

      <section data-reveal className="mx-auto w-full max-w-7xl px-3 py-8 min-[480px]:px-5 sm:py-12 md:px-6 lg:px-8">
        <div className="mx-auto mb-6 max-w-2xl text-center sm:mb-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#806000] sm:text-xs">Grocery Shopping, Made Easier</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-[#168447] sm:text-3xl">Why Choose Us?</h2>
          <p className="mx-auto mt-2 max-w-lg text-xs leading-5 text-[#686868] sm:text-sm">Market ke chakkar aur fixed grocery combos ki tension chhodiye. Apni zaroorat batayein, humse ghar baithe baat karein.</p>
        </div>

        <div data-reveal-group className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {[
            { icon: Truck, problem: "Market Jaane Ka Time Nahi?", solution: "Ghar baithe WhatsApp par apni grocery list bhej dijiye.", tint: "bg-[#FAF0C8]", ink: "text-[#806000]" },
            { icon: Package, problem: "Ready Kit Ke Baare Mein Jankari Chahiye?", solution: "Available grocery kits ke products aur details WhatsApp par poochhein.", tint: "bg-[#F1EBDD]", ink: "text-[#168447]" },
            { icon: Wallet, problem: "Budget Ka Rakhna Hai Dhyan?", solution: "Apne budget ke hisaab se available ready-made kits dekhein.", tint: "bg-[#EAF3E9]", ink: "text-[#168447]" },
            { icon: ClipboardList, problem: "Monthly Grocery Manage Karna Mushkil?", solution: "Monthly needs ke liye available kits dekhein aur order details confirm karein.", tint: "bg-[#F1EBDD]", ink: "text-[#202124]" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <article data-reveal-item key={item.problem} className="flex gap-3 rounded-2xl border border-[#E8DFD1] bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:gap-4 sm:p-5">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.tint} sm:h-12 sm:w-12`}>
                  <Icon size={21} className={item.ink} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-extrabold text-[#202124] sm:text-base">{item.problem}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-[#686868] sm:text-sm">{item.solution}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-4 rounded-xl border border-[#E8DFD1] bg-white px-3 py-3 text-center sm:mt-7 sm:rounded-2xl sm:px-6 sm:py-6">
          <p className="text-base font-black text-[#202124] sm:text-lg">Apni Zaroorat Ki Kit Khud Banayein</p>
          <p className="mx-auto mt-1.5 max-w-lg text-xs leading-5 text-[#686868] sm:text-sm">Ready-made kit ke items badlein, quantity set karein aur apni pasand ke grocery items add karein.</p>
          <div className="mt-4 flex flex-col justify-center gap-2 min-[420px]:flex-row">
            <a href="https://wa.me/918962531603?text=Namaste%2C%20mujhe%20apni%20grocery%20kit%20customize%20karni%20hai." target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#168447] px-5 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#106B38] sm:text-sm">
              <Image src="/Whatsapp-3d.svg" alt="" width={20} height={20} className="h-5 w-5 object-contain" /> WhatsApp Par Poochhein
            </a>
            <Link href="/kits" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#D8CBB8] bg-white px-5 py-3 text-xs font-bold text-[#168447] transition hover:border-[#168447] sm:text-sm">
              Ready Kits Dekhein <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
