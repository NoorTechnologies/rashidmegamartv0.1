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
  { label: "Shop", href: "/shop", icon: LayoutGrid },
  { label: "Kits", href: "/kits", icon: Package, featured: true },
  { label: "Cart", href: "/cart", icon: ShoppingBasket },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[560px] px-3 pb-[calc(9px+env(safe-area-inset-bottom))] lg:hidden"
    >
      <div className="grid h-[72px] grid-cols-5 items-center rounded-[26px] border border-white/80 bg-white/90 px-1.5 shadow-[0_10px_35px_rgba(56,24,32,0.16),0_2px_8px_rgba(56,24,32,0.06)] backdrop-blur-2xl">
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
              aria-label={
                item.href === "/cart"
                  ? `Cart, ${totalItems} items`
                  : item.label
              }
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

                {item.href === "/cart" && totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-white bg-[#A83250] px-1 text-[9px] font-extrabold leading-none text-white shadow-sm">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
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

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact Rashid Mega Mart on WhatsApp"
          className="group flex h-full min-w-0 flex-col items-center justify-center gap-1 rounded-[20px] text-[#777078] transition-all duration-300 hover:bg-[#EAF8EF] hover:text-[#138047] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#138047]"
        >
          <span className="flex size-10 items-center justify-center transition-transform duration-300 group-hover:-translate-y-0.5">
            <Image
              src="/Whatsapp-3d.svg"
              alt=""
              width={27}
              height={27}
              unoptimized
              className="size-[27px] shrink-0 object-contain"
            />
          </span>
          <span className="max-w-full truncate px-0.5 text-[10px] font-semibold leading-none">
            WhatsApp
          </span>
        </a>
      </div>
    </nav>
  );
}
