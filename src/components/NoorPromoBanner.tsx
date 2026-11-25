import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const NOOR_URL = "https://noor-technologies.vercel.app/";

export default function NoorPromoBanner() {
  return (
    <section
      aria-label="A digital experience by Noor Technologies"
      className="relative isolate mx-auto w-full max-w-[1600px] overflow-hidden rounded-2xl border border-[#168447]/15 bg-[#fffefa] shadow-[0_8px_30px_rgba(22,132,71,0.07)] sm:rounded-[24px]"
    >
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#168447] via-[#08B9AD] to-[#FF765D]" />

      <div className="grid items-center gap-5 px-4 py-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-7 sm:px-7 sm:py-7 lg:grid-cols-[190px_minmax(0,1fr)_auto] lg:gap-8 lg:px-9 lg:py-8">
        <Link
          href={NOOR_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Noor Technologies"
          className="mx-auto block w-[112px] shrink-0 transition-transform duration-300 hover:scale-[1.03] sm:w-[126px] lg:w-[164px]"
        >
          <Image
            src="/noor.png"
            alt="Noor Technologies"
            width={500}
            height={500}
            sizes="(max-width: 639px) 112px, (max-width: 1023px) 126px, 164px"
            className="h-auto w-full object-contain"
            priority={false}
          />
        </Link>

        <div className="min-w-0 text-center sm:text-left lg:border-l lg:border-[#168447]/20 lg:pl-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#168447] sm:text-[11px]">
            A digital experience by
          </p>
          <h2 className="mt-2 text-[clamp(1.65rem,5vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.055em] text-[#202124]">
            Take your business
            <span className="block text-[#168447]">online with confidence.</span>
          </h2>
          <p className="mt-3 text-xs font-medium text-[#686868] sm:text-sm">
            Websites <span className="px-1 text-[#08A99B]">·</span>
            E-commerce <span className="px-1 text-[#08A99B]">·</span>
            Custom Software
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-2 sm:col-span-2 lg:col-span-1 lg:w-[245px]">
          <Link
            href={NOOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#087F5B] px-5 py-3 text-sm font-bold text-white shadow-[0_5px_14px_rgba(8,127,91,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#066C4D] hover:shadow-[0_9px_20px_rgba(8,127,91,0.22)] active:scale-[0.98]"
          >
            <span>Build Your Business Online</span>
            <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href={NOOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold text-[#686868] transition-colors hover:text-[#087F5B]"
          >
            noor-technologies.vercel.app
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#168447] via-[#08B9AD] to-[#FF765D]" />
    </section>
  );
}
