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
  ShoppingBasket,
  X,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

const WHATSAPP_NUMBER = "918962531603";

const navigationItems = [
  { label: "Home", href: "/", icon: House },
  { label: "Shop", href: "/shop", icon: LayoutGrid },
  { label: "Kits", href: "/kits", icon: Package, featured: true },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  return (
    <>
      {/* Floating cart shortcut — independent from the bottom navigation */}
      <Link
        href="/cart"
        aria-label={`Open cart, ${totalItems} items`}
        className="fixed bottom-[calc(98px+env(safe-area-inset-bottom))] right-4 z-50 flex h-14 items-center gap-2.5 rounded-full border border-white/80 bg-gradient-to-br from-[#B94360] to-[#87263F] px-4 text-white shadow-[0_9px_25px_rgba(135,38,63,0.32)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_13px_30px_rgba(135,38,63,0.38)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A83250] lg:hidden"
      >
        <span className="relative flex size-7 items-center justify-center">
          <ShoppingBasket size={22} strokeWidth={2.2} />
          {totalItems > 0 && (
            <span className="absolute -right-2 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full border-2 border-[#A83250] bg-white px-1 text-[9px] font-extrabold leading-none text-[#A83250]">
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </span>
        <span className="text-xs font-extrabold tracking-wide">Cart</span>
      </Link>

      <nav
        aria-label="Main navigation"
        className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[560px] px-3 pb-[calc(9px+env(safe-area-inset-bottom))] lg:hidden"
      >
        {isMoreOpen && (
          <div className="absolute bottom-[calc(100%+12px)] right-4 w-[min(260px,calc(100vw-32px))] overflow-hidden rounded-[22px] border border-white/80 bg-white/95 p-2 shadow-[0_12px_40px_rgba(56,24,32,0.2)] backdrop-blur-2xl">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMoreOpen(false)}
              className="flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-[#EAF8EF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#138047]"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF8EF]">
                <Image
                  src="/Whatsapp-3d.svg"
                  alt=""
                  width={29}
                  height={29}
                  unoptimized
                  className="size-[29px] object-contain"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-extrabold text-[#292329]">
                  Contact on WhatsApp
                </span>
                <span className="mt-0.5 block text-xs text-[#777078]">
                  Chat with Rashid Mega Mart
                </span>
              </span>
              <ChevronRight size={18} className="shrink-0 text-[#138047]" />
            </a>
          </div>
        )}

        <div className="grid h-[72px] grid-cols-4 items-center rounded-[26px] border border-white/80 bg-white/90 px-2 shadow-[0_10px_35px_rgba(56,24,32,0.16),0_2px_8px_rgba(56,24,32,0.06)] backdrop-blur-2xl">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`group relative flex h-full min-w-0 flex-col items-center justify-center gap-1 rounded-[20px] transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#A83250] ${
                  item.featured ? "-translate-y-2" : ""
                }`}
              >
                <span
                  className={`relative flex size-10 items-center justify-center rounded-2xl transition-all duration-300 ${
                    item.featured
                      ? "size-[50px] rounded-[19px] bg-gradient-to-br from-[#B94360] to-[#87263F] text-white shadow-[0_7px_16px_rgba(168,50,80,0.32)] ring-[5px] ring-white"
                      : isActive
                        ? "bg-[#F8E8ED] text-[#A83250] shadow-[inset_0_0_0_1px_rgba(168,50,80,0.06)]"
                        : "text-[#777078] group-hover:-translate-y-0.5 group-hover:bg-[#FAF3F5] group-hover:text-[#A83250]"
                  }`}
                >
                  <Icon
                    size={item.featured ? 23 : 21}
                    strokeWidth={isActive || item.featured ? 2.5 : 1.9}
                  />
                </span>
                <span
                  className={`max-w-full truncate px-0.5 text-[10px] leading-none transition-colors duration-200 ${
                    isActive
                      ? "font-extrabold text-[#A83250]"
                      : item.featured
                        ? "font-extrabold text-[#87263F]"
                        : "font-semibold text-[#777078] group-hover:text-[#A83250]"
                  }`}
                >
                  {item.label}
                </span>
                {isActive && !item.featured && (
                  <span className="absolute bottom-1 h-1 w-1 rounded-full bg-[#A83250]" />
                )}
              </Link>
            );
          })}

          <button
            type="button"
            aria-label={isMoreOpen ? "Close more menu" : "Open more menu"}
            aria-expanded={isMoreOpen}
            onClick={() => setIsMoreOpen((open) => !open)}
            className={`group flex h-full min-w-0 flex-col items-center justify-center gap-1 rounded-[20px] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#A83250] ${
              isMoreOpen
                ? "bg-[#F8E8ED] text-[#A83250]"
                : "text-[#777078] hover:bg-[#FAF3F5] hover:text-[#A83250]"
            }`}
          >
            <span className="flex size-10 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:-translate-y-0.5">
              {isMoreOpen ? <X size={21} /> : <MoreHorizontal size={23} />}
            </span>
            <span className="text-[10px] font-semibold leading-none">
              More
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
