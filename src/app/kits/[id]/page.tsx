import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Package, ShoppingBag, Tag, Sparkles, Truck, ShieldCheck } from "lucide-react";
import { getKitById } from "@/data/kits";
import KitCustomizer from "@/components/KitCustomizer";
import LocalizedKitCopy from "@/components/LocalizedKitCopy";

interface PageProps { params: Promise<{ id: string }> }

export default async function KitDetailPage({ params }: PageProps) {
  const { id } = await params;
  const kit = getKitById(id);
  if (!kit) notFound();

  const discount = kit.oldPrice && kit.oldPrice > kit.price
    ? Math.round(((kit.oldPrice - kit.price) / kit.oldPrice) * 100) : 0;
  const savings = kit.oldPrice && kit.oldPrice > kit.price ? kit.oldPrice - kit.price : 0;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F6F8F4] pb-[calc(112px+env(safe-area-inset-bottom))] text-[#202820] sm:pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_18%_0%,rgba(167,216,177,.42),transparent_52%),radial-gradient(ellipse_at_90%_15%,rgba(255,232,174,.34),transparent_42%)]" />
      <header className="sticky top-0 z-40 border-b border-white/70 bg-white/65 shadow-[0_8px_30px_rgba(32,55,36,.05)] backdrop-blur-2xl">
        <div className="mx-auto flex h-[62px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/kits" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/80 bg-white/65 px-3 text-sm font-bold text-[#315F35] shadow-sm transition hover:bg-white">
            <ArrowLeft size={17} /><span>All kits</span>
          </Link>
          <span className="hidden text-[11px] font-black tracking-[.22em] text-[#315F35] sm:block">RASHID MEGA MART</span>
          <Link href="/cart" aria-label="Open cart" className="flex size-10 items-center justify-center rounded-full border border-white/80 bg-white/70 text-[#315F35] shadow-sm transition hover:-translate-y-0.5 hover:bg-white">
            <ShoppingBag size={18} />
          </Link>
        </div>
      </header>

      <div className="relative mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-7 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 overflow-hidden text-xs font-medium text-[#778278]">
          <Link href="/" className="shrink-0 transition hover:text-[#168447]">Home</Link><span>/</span>
          <Link href="/kits" className="shrink-0 transition hover:text-[#168447]">Grocery Kits</Link><span>/</span>
          <span className="truncate font-bold text-[#315F35]">{kit.name}</span>
        </nav>
      </div>

      <section className="relative mx-auto max-w-7xl px-4 pb-8 pt-4 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8">
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,.95fr)] lg:gap-8">
          <div className="min-w-0">
            <div className="group relative isolate aspect-[1.04/1] overflow-hidden rounded-[28px] border border-white/90 bg-white/60 shadow-[0_22px_70px_rgba(42,75,46,.11)] backdrop-blur-xl sm:rounded-[36px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,.98),rgba(237,246,236,.72)_65%,rgba(222,237,222,.6))]" />
              {kit.image ? (
                <Image src={kit.image} alt={kit.name} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="relative z-10 object-contain p-7 transition-transform duration-700 ease-out group-hover:scale-[1.045] sm:p-12" />
              ) : (
                <div className="relative z-10 flex h-full items-center justify-center"><Package size={82} className="text-[#168447]/25" /></div>
              )}
              <div className="absolute left-4 top-4 z-20 flex items-center gap-2 sm:left-6 sm:top-6">
                {discount > 0 && <span className="rounded-full border border-white/70 bg-[#800020] px-3.5 py-2 text-[11px] font-black tracking-wide text-white shadow-lg">{discount}% OFF</span>}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/75 px-3 py-2 text-[10px] font-extrabold text-[#315F35] shadow-sm backdrop-blur-xl"><Sparkles size={12}/> Curated grocery kit</span>
              </div>
              <div className="absolute bottom-4 right-4 z-20 rounded-full border border-white/80 bg-white/65 px-3 py-2 text-[9px] font-black tracking-[.15em] text-[#315F35] shadow-sm backdrop-blur-xl">RASHID MEGA MART</div>
              {!kit.isAvailable && <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/55 backdrop-blur-md"><span className="rounded-full border border-white bg-white/90 px-5 py-3 text-sm font-bold text-[#4D554D] shadow-xl">Currently unavailable</span></div>}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 rounded-2xl border border-white/90 bg-white/65 p-3 shadow-[0_8px_28px_rgba(42,75,46,.05)] backdrop-blur-xl sm:p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF4E9] text-[#168447]"><Package size={19}/></span>
                <span className="min-w-0"><span className="block text-sm font-extrabold">{kit.items.length} items</span><span className="block text-[10px] leading-4 text-[#7B857B] sm:text-xs">Inside this kit</span></span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/90 bg-white/65 p-3 shadow-[0_8px_28px_rgba(42,75,46,.05)] backdrop-blur-xl sm:p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#F8F1DA] text-[#806000]"><Truck size={19}/></span>
                <span className="min-w-0"><span className="block text-sm font-extrabold">Easy delivery</span><span className="block text-[10px] leading-4 text-[#7B857B] sm:text-xs">Across Rewa</span></span>
              </div>
            </div>
          </div>

          <div className="min-w-0 lg:sticky lg:top-[86px]">
            <div className="rounded-[28px] border border-white/90 bg-white/65 p-5 shadow-[0_18px_55px_rgba(42,75,46,.08)] backdrop-blur-2xl sm:rounded-[32px] sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className={kit.isAvailable ? "inline-flex items-center gap-1.5 rounded-full bg-[#EAF4E9] px-3 py-1.5 text-[11px] font-bold text-[#28713A]" : "rounded-full bg-red-50 px-3 py-1.5 text-[11px] font-bold text-red-600"}>
                  {kit.isAvailable ? <><Check size={13}/> In stock</> : "Out of stock"}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#7B857B]"><ShieldCheck size={14}/> Store-verified kit</span>
              </div>
              <h1 className="mt-4 text-[28px] font-black leading-[1.08] tracking-[-.045em] text-[#1F2B20] sm:text-4xl lg:text-[42px]">{kit.name}</h1>
              {kit.subtitle && <p className="mt-3 text-sm font-bold leading-6 text-[#397447] sm:text-base"><LocalizedKitCopy value={kit.subtitle}/></p>}
              <p className="mt-3 text-sm leading-6 text-[#687469] sm:text-[15px] sm:leading-7"><LocalizedKitCopy value={kit.description}/></p>

              <div className="mt-6 rounded-[22px] border border-[#DCEBDD] bg-[linear-gradient(135deg,rgba(239,248,238,.92),rgba(255,255,255,.82)_58%,rgba(250,244,220,.8))] p-4 sm:p-5">
                <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#718171]">Your special kit price</p>
                <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-[38px] font-black leading-none tracking-[-.05em] text-[#800020] sm:text-[44px]">₹{kit.price.toLocaleString("en-IN")}</span>
                  {kit.oldPrice && kit.oldPrice > kit.price && <span className="text-base font-semibold text-[#899189] line-through">₹{kit.oldPrice.toLocaleString("en-IN")}</span>}
                  {discount > 0 && <span className="rounded-full bg-[#FAF0C8] px-2.5 py-1 text-[10px] font-black text-[#806000]">{discount}% OFF</span>}
                </div>
                {savings > 0 && <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#28713A]"><Tag size={14}/> You save ₹{savings.toLocaleString("en-IN")} on this kit</p>}
              </div>

              <div className="mt-5">
                {kit.isAvailable ? <KitCustomizer kit={kit}/> : <div className="rounded-2xl border border-[#E5E9E3] bg-white/75 px-4 py-5 text-center"><p className="text-sm font-extrabold text-[#485348]">This kit is currently unavailable</p><p className="mt-1 text-xs leading-5 text-[#818B81]">Please check back later or contact our store team.</p></div>}
              </div>
              <p className="mt-4 text-center text-[10px] leading-5 text-[#849084]">{kit.isAvailable ? "Customize your groceries and send your request to the store." : "This kit cannot be added to your cart right now."}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 rounded-[24px] border border-white/90 bg-white/65 px-5 py-6 text-center shadow-[0_12px_40px_rgba(42,75,46,.06)] backdrop-blur-xl sm:flex-row sm:px-7 sm:text-left">
          <div><h2 className="text-lg font-black tracking-tight text-[#243126]">Want to explore more?</h2><p className="mt-1 text-sm text-[#778278]">Find a grocery combo that fits your home.</p></div>
          <Link href="/kits" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#176B3A] px-6 text-sm font-extrabold text-white shadow-[0_8px_22px_rgba(23,107,58,.2)] transition hover:-translate-y-0.5 hover:bg-[#10552D]">Explore all kits <ArrowRight size={16}/></Link>
        </div>
      </section>
    </main>
  );
}
