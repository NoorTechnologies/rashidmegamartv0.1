import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function PromoBanner() {
  return (
    <section
      data-reveal
      aria-label="Grocery planner promotion"
      className="mx-auto w-full max-w-7xl px-3 pt-4 min-[480px]:px-5 sm:pt-5 md:px-6 lg:px-8"
    >
      <div className="relative isolate overflow-hidden rounded-2xl border border-[#2C7546] bg-[#155F36] px-4 py-4 text-white shadow-[0_12px_30px_rgba(21,95,54,0.14)] sm:rounded-[24px] sm:px-6 sm:py-5">
        <div className="pointer-events-none absolute -right-8 -top-20 -z-10 size-52 rounded-full bg-[#73B77A]/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-[38%] -z-10 size-48 rounded-full bg-[#F7C928]/15 blur-3xl" />

        <div className="relative flex flex-col gap-4 min-[520px]:flex-row min-[520px]:items-center min-[520px]:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-[#F7D66E]">
              <Sparkles size={17} />
            </span>
            <div className="min-w-0">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#F7D66E] sm:text-[10px]">
                Your list, your way
              </p>
              <h2 className="mt-1 text-sm font-extrabold leading-snug text-white sm:text-base">
                Build a grocery kit that fits your home.
              </h2>
              <p className="mt-1 max-w-xl text-[11px] leading-5 text-white/75 sm:text-xs">
                Choose essentials, adjust quantities and organise your monthly
                grocery needs in one place.
              </p>
            </div>
          </div>

          <Link
            href="/planner"
            className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 text-xs font-extrabold text-[#155F36] shadow-sm transition hover:bg-[#F5F8F1] active:scale-[0.98]"
          >
            Open Grocery Planner
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
