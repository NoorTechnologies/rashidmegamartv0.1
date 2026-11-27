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
      <section data-reveal-group className="rmm-home-hero relative isolate overflow-hidden px-3 pb-7 pt-5 text-[#202124] sm:px-6 sm:pb-12 sm:pt-10 lg:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_12%_8%,rgba(247,201,40,0.20),transparent_34%),radial-gradient(ellipse_at_88%_72%,rgba(22,132,71,0.12),transparent_38%),linear-gradient(145deg,#F5EEDF_0%,#FFFEFA_48%,#F2F6EE_100%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-8 -z-10 size-72 rounded-full border border-[#168447]/[0.08] sm:size-[26rem]" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-5 sm:gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
          <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
            <span data-reveal-item className="inline-flex items-center gap-2 rounded-full border border-[#DCCB9E] bg-white/85 px-3.5 py-2 text-[9px] font-extrabold tracking-[0.12em] text-[#315F35] shadow-[0_5px_18px_rgba(71,55,24,0.06)] sm:text-[10px]">
              <Package size={14} /> GROCERY KITS FOR EVERYDAY NEEDS
            </span>
            <div className="mt-4 flex flex-col items-center lg:items-start">
              <Image data-reveal-item src="/images/logo2.png" alt="Rashid Mega Mart Logo" width={88} height={88} priority className="h-11 w-11 object-contain sm:h-14 sm:w-14" />
              <h1 data-reveal-item className="mt-2 max-w-[620px] text-[clamp(1.85rem,7vw,3.65rem)] font-black leading-[1.02] tracking-[-0.055em] text-[#25221E] sm:mt-3">
                Your daily needs,
                <span className="mt-1 block bg-gradient-to-r from-[#168447] via-[#267A3D] to-[#800020] bg-clip-text text-transparent">all in one place.</span>
              </h1>
              <p data-reveal-item className="mt-3 max-w-[440px] text-[12px] leading-[1.65] text-[#71685E] sm:mt-4 sm:text-sm">
                Thoughtfully packed grocery kits for your home — quality essentials, great value, and easy ordering.
              </p>
            </div>
            <Link data-reveal-item href="/kits" className="rmm-button-primary group mt-5 inline-flex min-h-12 w-full max-w-[330px] items-center justify-center gap-2 rounded-2xl px-7 py-3.5 text-[13px] font-extrabold shadow-[0_10px_24px_rgba(22,132,71,0.20)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(22,132,71,0.26)] active:scale-[0.98] sm:w-auto sm:min-w-[230px]">
              Explore Grocery Kits <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <div data-reveal-item className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] font-bold text-[#625F56] lg:justify-start sm:text-[11px]">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck size={15} className="text-[#168447]" /> Value-packed combos</span>
              <span className="inline-flex items-center gap-1.5"><Truck size={15} className="text-[#168447]" /> Delivery on confirmation</span>
            </div>
          </div>

          <div data-reveal-item className="relative mx-auto w-full max-w-[620px] lg:max-w-none">
            <div aria-hidden="true" className="absolute inset-[8%] rounded-[34px] bg-[#E8D8AD]/55 blur-2xl" />
            <div className="relative flex h-[220px] items-center justify-center overflow-hidden rounded-[28px] border border-white/90 bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(246,239,220,0.88))] shadow-[0_22px_60px_rgba(72,55,28,0.10),inset_0_1px_0_rgba(255,255,255,0.95)] sm:h-[340px] sm:rounded-[36px] lg:h-[430px]">
              <div aria-hidden="true" className="absolute left-1/2 top-1/2 aspect-square w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D9C99F]/60 bg-[radial-gradient(circle,rgba(247,201,40,0.17),rgba(247,201,40,0.04)_58%,transparent_70%)]" />
              <div aria-hidden="true" className="absolute bottom-8 left-1/2 h-7 w-[58%] -translate-x-1/2 rounded-[50%] bg-[#315F35]/15 blur-xl" />
              <Image src="/hero.png" alt="Rashid Mega Mart grocery storefront" fill priority sizes="(max-width: 1023px) 100vw, 55vw" className="relative z-10 object-contain p-2 drop-shadow-[0_18px_24px_rgba(40,30,12,0.16)] sm:p-4" />
              <span className="absolute left-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/90 bg-white/90 px-3 py-2 text-[9px] font-extrabold text-[#315F35] shadow-md sm:left-5 sm:top-5 sm:text-[10px]">
                <span className="size-1.5 rounded-full bg-[#168447]" /> Everyday essentials
              </span>
              <span className="absolute bottom-3 right-3 z-20 rounded-full border border-white/90 bg-[#800020] px-3 py-2 text-[9px] font-extrabold tracking-wide text-white shadow-lg sm:bottom-5 sm:right-5 sm:px-4 sm:text-[10px]">
                VALUE · QUALITY · CONVENIENCE
              </span>
            </div>
          </div>
        </div>
      </section>


      {startingPrice !== null && (
        <section data-reveal className="mx-auto w-full max-w-7xl px-3 pt-3 min-[480px]:px-5 sm:pt-4 md:px-6 lg:px-8" aria-label="Grocery kit starting price">
          <Link
            href="/kits"
            className="group flex min-h-12 items-center justify-between gap-3 rounded-xl border border-[#D8CBB8] bg-white px-3.5 py-2.5 shadow-sm transition hover:border-[#800020] hover:shadow-md sm:px-4"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#F1EBDD] text-[#168447]">
                <Package size={16} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[10px] font-black uppercase tracking-wide text-[#106B38] sm:text-xs">GROCERY KITS STARTING AT</span>
                <span className="block text-lg font-black leading-tight text-[#800020] sm:text-2xl">₹{startingPrice.toLocaleString("en-IN")} <span className="text-[10px] font-bold text-[#686868] sm:text-xs">· {availableKits.length} kits to explore</span></span>
              </span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 text-[10px] font-bold text-[#168447] sm:text-xs">
              View kits <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
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
