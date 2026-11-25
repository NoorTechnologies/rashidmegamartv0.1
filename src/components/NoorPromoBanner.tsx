"use client";

import Link from "next/link";
import { ArrowUpRight, Globe2 } from "lucide-react";

const NOOR_URL = "https://noor-technologies.vercel.app/";

export default function NoorPromoBanner() {
  return (
    <section
      aria-label="Website designed and developed by Noor Technologies"
      className="relative isolate mx-auto w-full max-w-[1600px] overflow-hidden rounded-[22px] border border-[#168447]/15 bg-gradient-to-br from-white via-[#FAF7EF] to-[#EAF3E9] px-4 py-6 shadow-[0_14px_38px_rgba(22,132,71,0.10)] sm:px-7 sm:py-8 lg:rounded-[28px] lg:px-9 lg:py-9"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 -top-28 h-64 w-80 rounded-full bg-[#168447]/10 blur-3xl" />
        <div className="absolute -right-16 -top-28 h-64 w-80 rounded-full bg-[#F7C928]/15 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-56 w-72 rounded-full bg-[#800020]/[0.06] blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-[5px] bg-gradient-to-r from-[#087F68] via-[#168447] to-[#F7C928]" />
        <div className="absolute inset-x-0 bottom-0 h-[5px] bg-gradient-to-r from-[#087F68] via-[#168447] to-[#F7C928]" />
        <div className="absolute -right-20 top-1/2 hidden h-56 w-56 -translate-y-1/2 rounded-full border border-[#168447]/10 lg:block" />
        <div className="absolute -right-12 top-1/2 hidden h-40 w-40 -translate-y-1/2 rounded-full border border-[#F7C928]/30 lg:block" />
      </div>

      <div className="relative grid items-center gap-6 lg:grid-cols-[190px_minmax(0,1fr)_290px] lg:gap-7 xl:grid-cols-[220px_minmax(0,1fr)_320px]">
        <Link
          href={NOOR_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Noor Technologies"
          className="group mx-auto flex w-full max-w-[180px] flex-col items-center rounded-full border border-[#168447]/20 bg-white/90 p-4 shadow-[0_8px_26px_rgba(22,132,71,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(22,132,71,0.18)] sm:max-w-[195px] lg:max-w-[205px]"
        >
          <span className="relative flex size-[76px] items-center justify-center sm:size-[88px]">
            <svg viewBox="0 0 100 100" role="img" aria-label="Noor Technologies logo mark" className="h-full w-full">
              <defs>
                <linearGradient id="noor-mark-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#08B9AD" />
                  <stop offset="52%" stopColor="#35BDAE" />
                  <stop offset="100%" stopColor="#FF765D" />
                </linearGradient>
              </defs>
              <path d="M17 15h17v69H17z" fill="#172321" />
              <path d="M66 15h17v69H66z" fill="#172321" />
              <path d="M25 15h17c8 0 13 3 18 10l27 37c5 7 7 13 7 22H77c-8 0-13-3-18-10L32 37c-5-7-7-13-7-22Z" fill="url(#noor-mark-gradient)" />
            </svg>
          </span>
          <span className="mt-1 text-[24px] font-black leading-none tracking-[-0.08em] text-[#172321] sm:text-[27px]">
            NOOR
          </span>
          <span className="mt-1 text-[9px] font-extrabold tracking-[0.32em] text-[#172321] sm:text-[10px]">
            TECHNOLOGIES
          </span>
          <span className="mt-2 h-[2px] w-full rounded-full bg-gradient-to-r from-[#08B9AD] via-[#168447] to-[#FF765D]" />
          <span className="mt-2 text-center text-[8px] font-semibold leading-[1.4] text-[#59635F] sm:text-[9px]">
            Digital Solutions. Software.
            <br />
            Technology. Education.
          </span>
        </Link>

        <div className="min-w-0 text-center lg:border-l-2 lg:border-[#168447]/35 lg:pl-7 lg:text-left">
          <span className="inline-flex items-center rounded-full border border-[#168447]/20 bg-[#EAF3E9] px-4 py-2 text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#106B38] sm:text-[10px]">
            A Digital Experience By
          </span>
          <p className="mt-3 text-xl font-black tracking-[-0.045em] text-[#172321] sm:text-2xl lg:text-[28px]">
            NOOR <span className="text-[#168447]">TECHNOLOGIES</span>
          </p>
          <h2 className="mt-2 text-[28px] font-black leading-[1.08] tracking-[-0.055em] text-[#202124] sm:text-4xl xl:text-[43px]">
            Want to take your{" "}
            <span className="bg-gradient-to-r from-[#106B38] to-[#168447] bg-clip-text text-transparent">
              business online?
            </span>
          </h2>
          <p className="mt-4 text-xs font-bold text-[#555] sm:text-sm">
            Websites <span className="mx-1 text-[#168447]">•</span>
            E-commerce <span className="mx-1 text-[#168447]">•</span>
            Custom Software
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 lg:items-stretch">
          <Link
            href={NOOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full border border-[#F7C928]/70 bg-gradient-to-r from-[#087F68] to-[#075C2B] px-5 py-4 text-center text-sm font-extrabold text-white shadow-[0_9px_24px_rgba(7,92,43,0.22)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(7,92,43,0.30)] active:scale-[0.98] sm:text-base"
          >
            Build Your Business Online
            <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
          <Link
            href={NOOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-[11px] font-bold text-[#303538] transition-colors hover:text-[#168447] sm:text-xs"
          >
            <Globe2 className="h-4 w-4 text-[#168447]" />
            noor-technologies.vercel.app
          </Link>
        </div>
      </div>
    </section>
  );
}
