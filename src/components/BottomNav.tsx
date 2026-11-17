"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Package,
  ShoppingCart,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

const WHATSAPP_NUMBER = "918962531603";

const navigationItems = [
  { label: "Home", href: "/", icon: House, external: false },
  { label: "Kits", href: "/kits", icon: Package, external: false },
];

const mobileNavigationItems = [
  ...navigationItems,
  { label: "Cart", href: "/cart", icon: ShoppingCart, external: false },
  { label: "WhatsApp", href: `https://wa.me/${WHATSAPP_NUMBER}`, icon: Package, external: true },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 hidden border-b border-[#EDE4DC]/80 bg-[#FFFDF8]/90 shadow-[0_4px_24px_rgba(48,30,36,0.04)] backdrop-blur-2xl lg:block">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-8 px-6 xl:px-8"
        >
          <Link
            href="/"
            aria-label="Rashid Mega Mart home"
            className="flex shrink-0 items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A83250]"
          >
            <Image
              src="/images/logo2.png"
              alt=""
              width={48}
              height={48}
              priority
              className="size-11 object-contain"
            />
            <span className="text-base font-black tracking-tight text-[#30251F]">
              Rashid <span className="text-[#A83250]">Mega Mart</span>
            </span>
          </Link>

          <div className="flex h-full items-center gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`inline-flex h-10 items-center rounded-full px-5 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A83250] ${
                  isActive(item.href)
                    ? "bg-[#F8E8ED] text-[#A83250]"
                    : "text-[#76665C] hover:bg-[#F8E8ED]/70 hover:text-[#87263F]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-bold text-[#138047] transition hover:bg-[#EAF6EE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#138047]"
            >
              <Image
                src="/Whatsapp-3d.svg"
                alt=""
                width={21}
                height={21}
                unoptimized
                className="size-5 object-contain"
              />
              Contact
            </a>
            <Link
              href="/cart"
              aria-label={`Open cart, ${totalItems} items`}
              className="relative inline-flex min-h-11 items-center gap-2 rounded-full bg-[#A83250] px-5 text-sm font-extrabold text-white shadow-[0_5px_16px_rgba(168,50,80,0.18)] transition hover:-translate-y-0.5 hover:bg-[#87263F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A83250]"
            >
              <ShoppingCart size={17} />
              Cart
              {totalItems > 0 && (
                <span className="flex min-w-5 items-center justify-center rounded-full bg-white px-1.5 py-0.5 text-[10px] font-black text-[#A83250]">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </header>

      <nav
        aria-label="Main navigation"
        className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[440px] px-4 pb-[calc(12px+env(safe-area-inset-bottom))] lg:hidden"
      >
        <div className="relative grid h-[72px] grid-cols-4 items-center rounded-[28px] border border-white/80 bg-[rgba(250,250,252,0.76)] px-2 shadow-[0_12px_42px_rgba(30,30,38,0.16),0_2px_8px_rgba(30,30,38,0.06),inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-1px_0_rgba(255,255,255,0.38)] backdrop-blur-[28px] backdrop-saturate-[190%]">
          <span className="pointer-events-none absolute inset-x-10 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-white to-transparent" />
          <span className="pointer-events-none absolute inset-x-1/3 -top-3 h-5 rounded-full bg-white/40 blur-xl" />

          {mobileNavigationItems.map((item) => {
            const Icon = item.icon;
            const active = item.external ? false : isActive(item.href);
            const className = `relative mx-auto flex h-[58px] w-[min(100%,82px)] flex-col items-center justify-center gap-1 rounded-[21px] transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] active:scale-[0.93] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#A83250] ${
              active
                ? "bg-white/90 text-[#A83250] shadow-[0_3px_12px_rgba(40,30,35,0.10),inset_0_1px_0_rgba(255,255,255,1)] ring-1 ring-black/[0.035]"
                : "text-[#766D72] hover:bg-white/45 hover:text-[#87263F]"
            }`;
            const content = (
              <>
                <span className={`relative flex size-[34px] items-center justify-center rounded-[13px] transition-all duration-300 ${active ? "text-[#A83250]" : "text-[#77777F]"}`}>
                  {item.external ? (
                    <Image src="/Whatsapp-3d.svg" alt="" width={21} height={21} unoptimized className="size-5 object-contain" />
                  ) : (
                    <Icon size={18} strokeWidth={active ? 2.25 : 1.75} className={active ? "scale-105" : ""} />
                  )}
                </span>
                {item.href === "/cart" && totalItems > 0 && (
                  <span className="absolute right-[10px] top-[2px] flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#D4A84F] px-1 text-[8px] font-black leading-none text-[#5C1D30] ring-2 ring-white">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
                <span className={`text-[10px] tracking-[-0.015em] leading-none ${active ? "font-extrabold text-[#A83250]" : "font-semibold text-[#77777F]"}`}>
                  {item.label}
                </span>
                {active && <span className="absolute bottom-[3px] h-[3px] w-[3px] rounded-full bg-[#A83250]/70" />}
              </>
            );

            return item.external ? (
              <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" aria-label="Contact us on WhatsApp" className={className}>
                {content}
              </a>
            ) : (
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={className}>
                {content}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
