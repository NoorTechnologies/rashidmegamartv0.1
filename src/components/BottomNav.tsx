
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  ShoppingBag,
  Package,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

const WHATSAPP_NUMBER = "918962531603";

const navigationItems = [
  { label: "Home", href: "/", icon: House },
  { label: "Shop", href: "/shop", icon: ShoppingBag },
  { label: "Kits", href: "/kits", icon: Package },
  { label: "Cart", href: "/cart", icon: ShoppingCart },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/15 bg-gradient-to-r from-[#087F5B] via-[#168447] to-[#087F5B] shadow-[0_-5px_22px_rgba(7,92,43,0.20)] lg:hidden"
    >
      <div className="mx-auto grid h-16 w-full max-w-xl grid-cols-5 items-stretch px-1 sm:h-[68px]">
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
                  ? `Cart, ${totalItems} items`
                  : item.label
              }
              className="relative flex min-w-0 flex-col items-center justify-center gap-1 text-white transition-colors duration-200 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#FFD52A]"
            >
              <span className="relative">
                <Icon
                  size={23}
                  strokeWidth={isActive ? 2.7 : 2}
                  className="text-white sm:size-[25px]"
                />

                {item.href === "/cart" && totalItems > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white shadow">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </span>

              <span
                className={`max-w-full truncate text-[10px] leading-none sm:text-[11px] ${
                  isActive
                    ? "font-extrabold text-[#FFD52A]"
                    : "font-semibold text-white"
                }`}
              >
                {item.label}
              </span>

              {isActive && (
                <span className="absolute bottom-0 h-[3px] w-3/4 rounded-t-full bg-[#FFD52A]" />
              )}
            </Link>
          );
        })}

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact Rashid Mega Mart on WhatsApp"
          className="flex min-w-0 flex-col items-center justify-center gap-1 text-white transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#FFD52A]"
        >
          <Image
            src="/Whatsapp-3d.svg"
            alt=""
            width={25}
            height={25}
            unoptimized
            className="size-[25px] shrink-0 object-contain sm:size-7"
          />

          <span className="max-w-full truncate text-[10px] font-semibold leading-none text-white sm:text-[11px]">
            Contact
          </span>
        </a>
      </div>

      <div className="h-[env(safe-area-inset-bottom)] bg-[#087F5B]" />
    </nav>
  );
}
