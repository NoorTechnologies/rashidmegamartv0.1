
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
      className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[680px] px-2 pb-[calc(8px+env(safe-area-inset-bottom))] lg:hidden"
    >
      <div className="grid h-[72px] grid-cols-5 items-center rounded-full border border-[#E8E8E8] bg-white p-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
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
              className={`relative flex h-full min-w-0 flex-col items-center justify-center gap-1 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#168447] ${
                isActive
                  ? "bg-[#F0F0F2] text-[#168447]"
                  : "text-[#555555] hover:bg-[#F7F7F7]"
              }`}
            >
              <span className="relative">
                <Icon
                  size={23}
                  strokeWidth={isActive ? 2.8 : 2}
                  fill={
                    isActive && item.href === "/"
                      ? "currentColor"
                      : "none"
                  }
                />

                {item.href === "/cart" && totalItems > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#168447] px-1 text-[9px] font-bold text-white shadow-sm">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </span>

              <span
                className={`max-w-full truncate px-0.5 text-[9px] leading-none sm:text-[10px] ${
                  isActive ? "font-extrabold" : "font-medium"
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
          className="flex h-full min-w-0 flex-col items-center justify-center gap-1 rounded-full text-[#555555] transition hover:bg-[#F7F7F7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#168447]"
        >
          <Image
            src="/Whatsapp-3d.svg"
            alt=""
            width={25}
            height={25}
            unoptimized
            className="size-[25px] shrink-0 object-contain"
          />

          <span className="max-w-full truncate px-0.5 text-[9px] font-medium leading-none sm:text-[10px]">
            WhatsApp
          </span>
        </a>
      </div>
    </nav>
  );
}
