
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  LayoutGrid,
  Package,
  ShoppingBasket,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

const WHATSAPP_NUMBER = "918962531603";

const navigationItems = [
  { label: "Home", href: "/", icon: House },
  { label: "Categories", href: "/shop", icon: LayoutGrid },
  { label: "Kits", href: "/kits", icon: Package },
  { label: "Basket", href: "/cart", icon: ShoppingBasket },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[680px] px-3 pb-[calc(10px+env(safe-area-inset-bottom))] lg:hidden"
    >
      <div className="relative grid h-[70px] grid-cols-5 items-center rounded-[25px] border border-white/80 bg-white/95 p-1.5 shadow-[0_8px_35px_rgba(23,23,23,0.13),0_2px_8px_rgba(23,23,23,0.05)] backdrop-blur-xl">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              aria-label={
                item.href === "/cart"
                  ? `Basket, ${totalItems} items`
                  : item.label
              }
              className={`group relative flex h-full min-w-0 flex-col items-center justify-center gap-1 rounded-[20px] transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#A83250] ${
                isActive
                  ? "bg-[#F8E8ED] text-[#A83250]"
                  : "text-[#737373] hover:bg-[#FAF7F5] hover:text-[#A83250]"
              }`}
            >
              <span
                className={`relative flex size-9 items-center justify-center rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "scale-105"
                    : "group-hover:-translate-y-0.5"
                }`}
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 1.9}
                  fill={
                    isActive && item.href === "/"
                      ? "currentColor"
                      : "none"
                  }
                />

                {item.href === "/cart" && totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full border-2 border-white bg-[#A83250] px-1 text-[9px] font-extrabold leading-none text-white shadow-sm">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </span>

              <span
                className={`max-w-full truncate px-0.5 text-[9px] leading-none transition-all duration-200 sm:text-[10px] ${
                  isActive
                    ? "font-extrabold"
                    : "font-medium"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact Rashid Mega Mart on WhatsApp"
          className="group flex h-full min-w-0 flex-col items-center justify-center gap-1 rounded-[20px] text-[#737373] transition-all duration-300 hover:bg-[#EAF8EF] hover:text-[#138047] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#138047]"
        >
          <span className="flex size-9 items-center justify-center transition-transform duration-300 group-hover:-translate-y-0.5">
            <Image
              src="/Whatsapp-3d.svg"
              alt=""
              width={26}
              height={26}
              unoptimized
              className="size-[26px] shrink-0 object-contain"
            />
          </span>

          <span className="max-w-full truncate px-0.5 text-[9px] font-medium leading-none sm:text-[10px]">
            WhatsApp
          </span>
        </a>
      </div>
    </nav>
  );
}
