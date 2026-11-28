import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  PackageCheck,
  Truck,
  Wallet,
} from "lucide-react";
import Footer from "@/components/Footer";
import FeaturedKitsCarousel from "@/components/FeaturedKitsCarousel";
import { kits } from "@/data/kits";

const assurances = [
  { icon: Truck, title: "Free delivery", detail: "Up to 5 KM, subject to confirmation" },
  { icon: Wallet, title: "Pay on delivery", detail: "Cash or UPI when confirmed" },
  { icon: MessageCircle, title: "Personal support", detail: "Talk directly to the store" },
];

export default function HomePage() {
  const availableKits = kits.filter((kit) => kit.isAvailable);
  const featuredKits = availableKits.filter((kit) => kit.isFeatured).slice(0, 4);
  const displayKits = featuredKits.length ? featuredKits : availableKits.slice(0, 4);
  const startingPrice = availableKits.length
    ? Math.min(...availableKits.map((kit) => kit.price))
    : null;

  return (
    <main className="min-h-screen w-full overflow-x-clip bg-[#F8FAF7] text-[#17251D]">
      <div className="border-b border-[#DDEBE0] bg-[#EAF5ED] px-3 py-2 text-center text-[10px] font-semibold tracking-wide text-[#24623C] sm:text-xs">
        Fresh essentials for your home <span className="mx-1.5 text-[#91B49A]">·</span> Serving Rewa
      </div>

      <section className="relative isolate overflow-hidden px-4 pb-8 pt-5 sm:px-6 sm:pb-14 sm:pt-9 lg:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 -z-10 size-[420px] rounded-full bg-[#D8EFDE]/75 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 -z-10 size-[340px] rounded-full bg-[#F7EFCF]/65 blur-3xl" />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-5 sm:gap-8 lg:grid-cols-[1.02fr_.98fr] lg:gap-12">
          <div className="relative z-10 flex flex-col items-start">
            <Link href="/" aria-label="Rashid Mega Mart home" className="mb-5 inline-flex items-center gap-2.5 sm:mb-7">
              <Image src="/images/logo.png" alt="" width={52} height={52} priority className="size-10 object-contain sm:size-12" />
              <span className="text-sm font-black tracking-[-0.04em] text-[#174C30] sm:text-base">RASHID MEGA MART</span>
            </Link>

            <span className="inline-flex items-center gap-2 rounded-full border border-[#CFE4D4] bg-white/85 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[.14em] text-[#287347] shadow-sm sm:text-[10px]">
              <span className="size-1.5 rounded-full bg-[#168447]" />
              Everyday groceries, made simpler
            </span>

            <h1 className="mt-4 max-w-[620px] text-[clamp(2.15rem,8vw,4.65rem)] font-black leading-[.98] tracking-[-.075em] text-[#17251D] sm:mt-5">
              Stock your home.
              <span className="mt-1 block text-[#168447]">Save your time.</span>
            </h1>
            <p className="mt-4 max-w-[470px] text-[13px] leading-6 text-[#607067] sm:mt-5 sm:text-base sm:leading-7">
              Explore thoughtfully packed grocery kits for everyday kitchens. Choose a ready combo or customise it around your family’s needs.
            </p>

            <div className="mt-5 flex w-full flex-col gap-2.5 min-[420px]:w-auto min-[420px]:flex-row sm:mt-7">
              <Link href="/kits" className="rmm-button-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#168447] px-6 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(22,132,71,.18)] transition hover:-translate-y-0.5 hover:bg-[#106B38]">
                Explore grocery kits <ArrowRight size={17} />
              </Link>
              <a href="https://wa.me/918962531603?text=Namaste%2C%20mujhe%20Rashid%20Mega%20Mart%20ke%20grocery%20kits%20ke%20baare%20mein%20jaankari%20chahiye." target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#CFE0D2] bg-white/90 px-5 text-sm font-bold text-[#24623C] transition hover:border-[#168447] hover:bg-white">
                <MessageCircle size={17} /> Talk to our store
              </a>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-semibold text-[#607067] sm:mt-7 sm:text-xs">
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#168447]" /> Customisable kits</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#168447]" /> Store-confirmed orders</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[620px] lg:max-w-none">
            <div className="absolute inset-x-8 bottom-2 h-8 rounded-full bg-[#A7D8B3]/45 blur-2xl" />
            <div className="relative overflow-hidden rounded-[26px] border border-white/90 bg-white/70 p-2 shadow-[0_22px_70px_rgba(37,91,54,.12)] sm:rounded-[34px] sm:p-3">
              <div className="relative aspect-[1.3/1] overflow-hidden rounded-[20px] bg-[#EAF5ED] sm:rounded-[27px]">
                <Image src="/hero.png" alt="Grocery kits and everyday essentials from Rashid Mega Mart" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-2 sm:p-5" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 rounded-2xl border border-white/80 bg-white/90 px-3 py-2.5 shadow-lg backdrop-blur-xl sm:bottom-5 sm:left-5 sm:right-5 sm:px-4 sm:py-3">
                  <div className="min-w-0">
                    <p className="text-[8px] font-extrabold uppercase tracking-[.16em] text-[#7A8D7F] sm:text-[9px]">Made for everyday kitchens</p>
                    <p className="mt-0.5 truncate text-xs font-black text-[#1E5635] sm:text-sm">Your grocery list, a little easier.</p>
                  </div>
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#EAF5ED] text-[#168447] sm:size-10"><PackageCheck size={20} /></span>
                </div>
              </div>
            </div>
            {startingPrice !== null && (
              <div className="absolute -left-1 top-4 rounded-2xl border border-white bg-white px-3 py-2.5 shadow-[0_12px_30px_rgba(32,71,42,.14)] sm:-left-5 sm:top-10 sm:px-4 sm:py-3">
                <p className="text-[8px] font-extrabold uppercase tracking-[.13em] text-[#809086] sm:text-[9px]">Kits starting at</p>
                <p className="mt-0.5 text-lg font-black tracking-tight text-[#168447] sm:text-2xl">₹{startingPrice.toLocaleString("en-IN")}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section aria-label="Store benefits" className="mx-auto grid max-w-7xl grid-cols-1 gap-2.5 px-4 pb-8 sm:grid-cols-3 sm:gap-3 sm:px-6 sm:pb-12 lg:px-8">
        {assurances.map(({ icon: Icon, title, detail }) => (
          <div key={title} className="flex items-center gap-3 rounded-2xl border border-[#E2ECE4] bg-white px-3.5 py-3 shadow-[0_4px_18px_rgba(29,72,42,.035)] sm:px-4 sm:py-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#EAF5ED] text-[#168447]"><Icon size={19} /></span>
            <span className="min-w-0"><span className="block text-xs font-extrabold text-[#20382A] sm:text-sm">{title}</span><span className="mt-0.5 block text-[10px] leading-4 text-[#77847A] sm:text-[11px]">{detail}</span></span>
          </div>
        ))}
      </section>

      <section data-reveal className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8">
        <div className="mb-4 flex items-end justify-between gap-3 sm:mb-6">
          <div>
            <p className="text-[9px] font-extrabold uppercase tracking-[.18em] text-[#A27A2A] sm:text-[10px]">Picked for your pantry</p>
            <h2 className="mt-1 text-xl font-black tracking-[-.045em] text-[#1C3425] sm:text-3xl">Explore grocery kits</h2>
            <p className="mt-1 text-[11px] text-[#718076] sm:text-sm">Useful combinations for everyday shopping.</p>
          </div>
          <Link href="/kits" className="inline-flex shrink-0 items-center gap-1 text-[10px] font-extrabold text-[#168447] sm:text-xs">View all <ArrowRight size={14} /></Link>
        </div>
        {displayKits.length ? <FeaturedKitsCarousel kits={displayKits} /> : (
          <div className="rounded-2xl border border-[#E2ECE4] bg-white p-7 text-center text-sm text-[#718076]">Grocery kits will be available soon.</div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8">
        <div className="overflow-hidden rounded-[26px] bg-[#EAF5ED] p-4 sm:rounded-[32px] sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-[.18em] text-[#A27A2A] sm:text-[10px]">Simple from start to finish</p>
              <h2 className="mt-2 max-w-md text-2xl font-black leading-[1.05] tracking-[-.055em] text-[#1C3425] sm:text-4xl">A smoother way to stock your kitchen.</h2>
              <p className="mt-3 max-w-md text-xs leading-5 text-[#607067] sm:text-sm sm:leading-6">Choose a kit, make it yours, then confirm the details directly with our store.</p>
              <Link href="/kits" className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#168447] px-5 text-xs font-extrabold text-white transition hover:bg-[#106B38] sm:text-sm">Find your kit <ArrowRight size={16} /></Link>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-3">
              {[
                { number: "01", title: "Choose", text: "Pick a ready-made grocery kit." },
                { number: "02", title: "Customise", text: "Adjust products and quantities." },
                { number: "03", title: "Confirm", text: "Send your enquiry on WhatsApp." },
              ].map((step) => (
                <article key={step.number} className="rounded-2xl border border-white/90 bg-white/85 p-4 shadow-sm">
                  <span className="text-[10px] font-black tracking-[.16em] text-[#168447]">{step.number}</span>
                  <h3 className="mt-4 text-base font-black text-[#1C3425]">{step.title}</h3>
                  <p className="mt-1 text-[11px] leading-5 text-[#718076]">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8">
        <div className="flex flex-col gap-4 rounded-[24px] border border-[#DDEBE0] bg-white p-4 shadow-[0_8px_28px_rgba(29,72,42,.045)] sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="text-[9px] font-extrabold uppercase tracking-[.16em] text-[#A27A2A]">Need something different?</p>
            <h2 className="mt-1 text-lg font-black tracking-tight text-[#1C3425] sm:text-2xl">Build a grocery kit around your needs.</h2>
            <p className="mt-1 text-[11px] text-[#718076] sm:text-sm">Tell us what your home needs. We’ll help confirm the options.</p>
          </div>
          <a href="https://wa.me/918962531603?text=Namaste%2C%20mujhe%20apni%20grocery%20kit%20customise%20karni%20hai." target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#168447] px-5 text-xs font-extrabold text-white transition hover:bg-[#106B38] sm:text-sm">
            <MessageCircle size={16} /> Customise on WhatsApp
          </a>
        </div>
      </section>
      <Footer />
    </main>
  );
}
