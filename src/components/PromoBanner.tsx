import Link from "next/link";
import { ArrowUpRight, Check, ShoppingBasket, Sparkles } from "lucide-react";

export default function PromoBanner() {
  return (
    <section
      data-reveal
      aria-label="Grocery planner promotion"
      className="mx-auto w-full max-w-7xl px-3 py-5 min-[480px]:px-5 sm:py-7 md:px-6 lg:px-8"
    >
      <div className="relative isolate overflow-hidden rounded-[26px] border border-[#E9E1D9] bg-[#FFFEFC] shadow-[0_14px_42px_rgba(69,28,35,0.07)] sm:rounded-[32px]">
        <div className="pointer-events-none absolute -right-16 -top-24 -z-10 size-64 rounded-full bg-[#F7D85B]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 right-[28%] -z-10 size-64 rounded-full bg-[#DCEBDD]/70 blur-3xl" />

        <div className="grid items-center gap-6 px-5 py-6 sm:px-8 sm:py-8 md:grid-cols-[1.2fr_0.8fr] md:gap-8 md:px-10 lg:px-12">
          <div className="min-w-0">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#F0E4B8] bg-[#FFF9DF] px-3 py-1.5">
              <Sparkles size={13} className="text-[#9A7410]" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#765B12]">
                Your list, your way
              </span>
            </div>

            <h2 className="max-w-xl text-[25px] font-black leading-[1.12] tracking-[-0.045em] text-[#642D38] sm:text-[32px] md:text-[36px]">
              Build a grocery kit that fits <span className="text-[#287346]">your home.</span>
            </h2>
            <p className="mt-3 max-w-lg text-[13px] leading-6 text-[#71666A] sm:text-sm">
              Choose your essentials, set the quantities and plan your monthly groceries — all in one simple place.
            </p>

            <Link
              href="/planner"
              className="group mt-5 inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-[#287346] px-5 text-[12px] font-extrabold text-white shadow-[0_7px_18px_rgba(40,115,70,0.2)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#1F6039] active:translate-y-0"
            >
              Open Grocery Planner
              <span className="flex size-6 items-center justify-center rounded-full bg-[#F7D85B] text-[#542B32] transition-transform group-hover:translate-x-0.5">
                <ArrowUpRight size={14} />
              </span>
            </Link>
          </div>

          <div aria-hidden="true" className="relative mx-auto flex min-h-[172px] w-full max-w-[330px] items-center justify-center md:min-h-[210px]">
            <div className="absolute inset-x-5 bottom-3 top-5 rotate-[-5deg] rounded-[26px] border border-[#E5EBDD] bg-[#F1F6EE]" />
            <div className="relative w-full max-w-[270px] rotate-[2deg] rounded-[24px] border border-[#EFE6D7] bg-white p-4 shadow-[0_16px_35px_rgba(72,48,36,0.11)]">
              <div className="flex items-center justify-between border-b border-[#F0ECE5] pb-3">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#8C8179]">Monthly basket</p>
                  <p className="mt-0.5 text-sm font-black text-[#642D38]">Home essentials</p>
                </div>
                <span className="flex size-9 items-center justify-center rounded-xl bg-[#FFF4C9] text-[#8A6810]">
                  <ShoppingBasket size={19} />
                </span>
              </div>
              <div className="space-y-2.5 pt-3">
                {["Atta & rice", "Pulses & groceries", "Oil & daily needs"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <span className="flex size-5 items-center justify-center rounded-full bg-[#E8F2E7] text-[#287346]">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="text-[11px] font-semibold text-[#62575A]">{item}</span>
                    <span className="ml-auto h-1.5 w-10 rounded-full bg-[#F4E7B5]" />
                  </div>
                ))}
              </div>
            </div>
            <span className="absolute -right-1 top-1 flex size-10 items-center justify-center rounded-2xl bg-[#F7D85B] text-[#642D38] shadow-md">
              <Sparkles size={18} />
            </span>
            <span className="absolute -bottom-1 left-1 rounded-full border border-[#DDE9DA] bg-white px-3 py-1.5 text-[9px] font-extrabold text-[#287346] shadow-sm">
              Made around your needs
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
