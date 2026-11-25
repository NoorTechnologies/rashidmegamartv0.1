"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function PromoBanner() {
  return (
    <section
      data-reveal
      aria-label="Grocery planner"
      className="mx-auto w-full max-w-7xl px-3 py-4 min-[480px]:px-5 sm:py-6 md:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-[24px] border border-[#EEE8E3] bg-[#FFFEFC] px-5 py-6 shadow-[0_8px_28px_rgba(38,29,26,0.045)] sm:rounded-[28px] sm:px-8 sm:py-8 md:px-10 md:py-9">
        <div className="pointer-events-none absolute -right-16 -top-24 size-64 rounded-full bg-[#F7D85B]/10 blur-3xl" />

        <div className="relative max-w-[620px]">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-[#287346]">
            GROCERY PLANNER
          </p>

          <h2 className="mt-3 max-w-[560px] text-[27px] font-semibold leading-[1.12] tracking-[-0.045em] text-[#642D38] sm:text-[34px] md:text-[40px]">
            Get your monthly grocery list in order.
          </h2>

          <p className="mt-3 max-w-[440px] text-[14px] leading-[1.7] text-[#756D6B] sm:text-[15px]">
            Add the things you need, choose quantities and keep your list ready for next time.
          </p>

          <Link
            href="/planner"
            className="group mt-5 inline-flex min-h-11 items-center gap-3 rounded-full bg-[#287346] px-5 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-[#205F3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#287346] focus-visible:ring-offset-2"
          >
            Open planner
            <span className="flex size-6 items-center justify-center rounded-full bg-[#F7D85B] text-[#642D38] transition-transform duration-200 group-hover:translate-x-0.5">
              <ArrowUpRight size={14} strokeWidth={2.2} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
