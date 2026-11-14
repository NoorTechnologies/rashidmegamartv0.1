"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ChevronRight,
  House,
  LayoutGrid,
  MoreHorizontal,
  Package,
  ShoppingCart,
  X,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

const WHATSAPP_NUMBER = "918962531603";

const navigationItems = [
  { label: "Home", href: "/", icon: House },
  { label: "Shop", href: "/shop", icon: LayoutGrid },
  { label: "Kits", href: "/kits", icon: Package },
];

const mobileNavigationItems = [
  ...navigationItems,
  { label: "Cart", href: "/cart", icon: ShoppingCart },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

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

      {/* One dedicated floating Cart shortcut */}
      <Link
        href="/cart"
        aria-label={`Open cart, ${totalItems} items`}
        className="fixed bottom-[calc(78px+env(safe-area-inset-bottom))] right-3 z-50 inline-flex min-h-12 items-center gap-2 rounded-full border border-white/25 bg-gradient-to-br from-[#C64A68] via-[#A83250] to-[#87263F] px-4 py-2 text-white shadow-[0_10px_28px_rgba(135,38,63,0.32),inset_0_1px_0_rgba(255,255,255,0.24)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(135,38,63,0.38)] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A83250] lg:hidden"
      >
        <ShoppingCart size={19} strokeWidth={2.2} />
        <span className="text-sm font-extrabold tracking-tight">Cart</span>
        {totalItems > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex h-[20px] min-w-[20px] items-center justify-center rounded-full border-2 border-[#A83250] bg-[#F7D98B] px-1 text-[9px] font-black leading-none text-[#5C1D30] shadow-sm">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </Link>

      <nav
        aria-label="Main navigation"
        className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[560px] px-3 pb-[calc(7px+env(safe-area-inset-bottom))] lg:hidden"
      >
        {isMoreOpen && (
          <>
            <button
              type="button"
              aria-label="Close More menu"
              onClick={() => setIsMoreOpen(false)}
              className="fixed inset-0 z-[-1] cursor-default"
            />
            <div className="absolute bottom-[calc(100%+14px)] right-4 w-[min(280px,calc(100vw-32px))] overflow-hidden rounded-[26px] border border-white/75 bg-white/75 p-2 shadow-[0_16px_48px_rgba(35,24,28,0.18),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-2xl backdrop-saturate-150">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMoreOpen(false)}
                className="flex items-center gap-3 rounded-[19px] p-3 transition-colors hover:bg-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#138047]"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/80 bg-white/70 shadow-sm">
                  <Image
                    src="/Whatsapp-3d.svg"
                    alt=""
                    width={28}
                    height={28}
                    unoptimized
                    className="size-7 object-contain"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-[#30272B]">
                    Contact us
                  </span>
                  <span className="mt-0.5 block text-xs text-[#82777C]">
                    Chat on WhatsApp
                  </span>
                </span>
                <ChevronRight size={18} className="shrink-0 text-[#138047]" />
              </a>
            </div>
          </>
        )}

        <div className="relative grid h-[58px] grid-cols-5 items-center rounded-full border border-white/75 bg-white/60 px-2 shadow-[0_10px_36px_rgba(40,28,32,0.14),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(255,255,255,0.28)] backdrop-blur-2xl backdrop-saturate-150">
          <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

          {mobileNavigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative mx-auto flex h-12 w-[min(100%,76px)] flex-col items-center justify-center gap-1 rounded-full transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#A83250] ${
                  active
                    ? "bg-[#F8E8ED] text-[#A83250] shadow-[0_4px_14px_rgba(168,50,80,0.16)] ring-1 ring-[#A83250]/10"
                    : "text-[#766D72] hover:bg-white/45 hover:text-[#87263F]"
                }`}
              >
                <span className={`relative flex size-8 items-center justify-center rounded-full transition-all duration-300 ${active ? "bg-[#A83250] text-white shadow-[0_4px_10px_rgba(168,50,80,0.24)]" : ""}`}>
                  <Icon size={18} strokeWidth={active ? 2.4 : 1.8} className={active ? "scale-105" : ""} />
                </span>
                {item.href === "/cart" && totalItems > 0 && (
                  <span className="absolute right-[10px] top-[2px] flex h-[17px] min-w-[17px] animate-[pulse_2s_ease-in-out_infinite] items-center justify-center rounded-full bg-[#D4A84F] px-1 text-[8px] font-black leading-none text-[#5C1D30] ring-2 ring-white">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
                <span className={`text-[10px] leading-none ${active ? "font-bold" : "font-medium"}`}>
                  {item.label}
                </span>
                {active && (
                  <span className="absolute bottom-[5px] h-1 w-1 rounded-full bg-[#A83250]" />
                )}
              </Link>
            );
          })}

          <button
            type="button"
            aria-label={isMoreOpen ? "Close More menu" : "Open More menu"}
            aria-expanded={isMoreOpen}
            onClick={() => setIsMoreOpen((open) => !open)}
            className={`mx-auto flex h-12 w-[min(100%,76px)] flex-col items-center justify-center gap-1 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#A83250] ${
              isMoreOpen
                ? "bg-white/75 text-[#A83250] shadow-[0_2px_10px_rgba(62,36,44,0.08)]"
                : "text-[#766D72] hover:bg-white/45 hover:text-[#87263F]"
            }`}
          >
            {isMoreOpen ? <X size={21} /> : <MoreHorizontal size={21} />}
            <span className="text-[10px] font-medium leading-none">More</span>
          </button>
        </div>
      </nav>
    </>
  );
}
