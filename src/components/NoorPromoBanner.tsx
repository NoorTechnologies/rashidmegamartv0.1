import Link from "next/link";
import { ArrowUpRight, Globe2 } from "lucide-react";

const NOOR_URL = "https://noor-technologies.vercel.app/";

function NoorMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="noor-banner-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#08B9AD" />
          <stop offset="55%" stopColor="#20B6A2" />
          <stop offset="100%" stopColor="#FF765D" />
        </linearGradient>
      </defs>
      <path d="M15 13h17v74H15zM68 13h17v74H68z" fill="#172321" />
      <path d="M25 13h15c9 0 14 4 20 12l27 37c5 7 7 14 7 25H78c-8 0-14-4-20-12L32 38c-5-7-7-14-7-25Z" fill="url(#noor-banner-mark)" />
    </svg>
  );
}

export default function NoorPromoBanner() {
  return (
    <section
      aria-label="Website designed and developed by Noor Technologies"
      className="relative isolate mx-auto w-full max-w-[1600px] overflow-hidden rounded-2xl border border-[#168447]/15 bg-gradient-to-br from-white via-[#FAF7EF] to-[#EAF3E9] px-4 py-5 shadow-[0_12px_32px_rgba(22,132,71,0.09)] sm:rounded-[24px] sm:px-7 sm:py-7 lg:px-9 lg:py-8"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 -top-28 h-56 w-72 rounded-full bg-[#168447]/10 blur-3xl" />
        <div className="absolute -right-20 -top-24 h-56 w-72 rounded-full bg-[#F7C928]/15 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#087F68] via-[#168447] to-[#F7C928]" />
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#087F68] via-[#168447] to-[#F7C928]" />
      </div>

      <div className="relative grid items-center gap-5 lg:grid-cols-[170px_minmax(0,1fr)_290px] lg:gap-7 xl:grid-cols-[195px_minmax(0,1fr)_315px]">
        <Link
          href={NOOR_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Noor Technologies"
          className="group mx-auto flex w-full max-w-[245px] items-center gap-3 rounded-2xl border border-[#168447]/15 bg-white/85 p-3 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:max-w-[300px] lg:mx-0 lg:max-w-none lg:flex-col lg:gap-1 lg:rounded-full lg:p-4"
        >
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-[#168447]/20 bg-white p-2 shadow-[0_4px_14px_rgba(22,132,71,0.12)] sm:size-16 lg:size-[100px] lg:p-3">
            <NoorMark className="h-full w-full" />
          </span>
          <span className="min-w-0 text-left lg:text-center">
            <span className="block text-[25px] font-black leading-none tracking-[-0.08em] text-[#172321] sm:text-[27px] lg:mt-1 lg:text-[30px]">NOOR</span>
            <span className="mt-1 block text-[9px] font-extrabold tracking-[0.28em] text-[#172321] sm:text-[10px]">TECHNOLOGIES</span>
            <span className="mt-1.5 hidden text-[8px] font-semibold leading-tight text-[#59635F] lg:block">Digital Solutions. Software.<br />Technology. Education.</span>
          </span>
        </Link>

        <div className="min-w-0 text-center lg:border-l-2 lg:border-[#168447]/30 lg:pl-7 lg:text-left">
          <span className="inline-flex rounded-full border border-[#168447]/20 bg-[#EAF3E9] px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#106B38] sm:px-4 sm:py-2 sm:text-[10px]">
            A Digital Experience By
          </span>
          <p className="mt-2 text-lg font-black tracking-[-0.04em] text-[#172321] sm:mt-3 sm:text-2xl lg:text-[27px]">
            NOOR <span className="text-[#168447]">TECHNOLOGIES</span>
          </p>
          <h2 className="mx-auto mt-1 max-w-[620px] text-[29px] font-black leading-[1.08] tracking-[-0.055em] text-[#202124] min-[420px]:text-[34px] sm:text-4xl lg:mx-0 xl:text-[43px]">
            Want to take your{" "}
            <span className="bg-gradient-to-r from-[#106B38] to-[#168447] bg-clip-text text-transparent">business online?</span>
          </h2>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10px] font-bold text-[#555] sm:mt-4 sm:justify-center sm:text-xs lg:justify-start lg:text-sm">
            <span>Websites</span><span className="text-[#168447]">•</span>
            <span>E-commerce</span><span className="text-[#168447]">•</span>
            <span>Custom Software</span>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-3 lg:items-stretch">
          <Link
            href={NOOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-12 w-full max-w-[340px] items-center justify-center gap-2 rounded-full border border-[#F7C928]/70 bg-gradient-to-r from-[#087F68] to-[#075C2B] px-4 py-3 text-center text-[13px] font-extrabold text-white shadow-[0_8px_22px_rgba(7,92,43,0.2)] transition duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] sm:min-h-14 sm:max-w-[380px] sm:px-6 sm:text-base lg:max-w-none"
          >
            <span>Build Your Business Online</span>
            <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
          <Link
            href={NOOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-[10px] font-bold text-[#303538] transition-colors hover:text-[#168447] sm:text-xs"
          >
            <Globe2 className="h-4 w-4 text-[#168447]" />
            noor-technologies.vercel.app
          </Link>
        </div>
      </div>
    </section>
  );
}
