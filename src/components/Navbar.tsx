
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const WHATSAPP_NUMBER = "918962531603";

const menuLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Kits", href: "/kits" },
  { label: "Cart", href: "/cart" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    if (!menuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#D6EBDD]/70 bg-gradient-to-r from-[#E8F5E9] via-[#D5F0DF] to-[#B7E4C7] px-2 pb-2 pt-2 sm:pt-3">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-white/80 bg-white/95 shadow-[0_8px_28px_rgba(22,132,71,0.10)] backdrop-blur-xl sm:rounded-[32px]">
        <div className="flex min-h-[62px] items-center justify-between gap-2 px-3 py-2 min-[375px]:px-4 sm:min-h-[76px] sm:px-6">
          <Link
            href="/"
            aria-label="Rashid Mega Mart Home"
            className="min-w-0 shrink"
            onClick={closeMenu}
          >
            <Image
              src="/images/logo.png"
              alt="Rashid Mega Mart"
              width={480}
              height={160}
              priority
              sizes="(max-width: 374px) 120px, (max-width: 639px) 145px, 220px"
              className="h-auto w-[120px] object-contain min-[375px]:w-[145px] sm:w-[220px]"
            />
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {menuLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-2 text-sm font-bold text-[#075C2B] transition duration-200 hover:bg-[#E8F5E9] hover:text-[#168447]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 min-[375px]:gap-2 sm:gap-3">
            <Link
              href="/shop"
              aria-label="Search products"
              className="flex size-9 items-center justify-center rounded-full border border-[#DFEEE3] bg-[#F1FAF3] text-[#168447] transition hover:bg-[#DDF2E3] active:scale-95 sm:size-[48px]"
            >
              <Search size={20} strokeWidth={2.5} className="sm:size-6" />
            </Link>

            <Link
              href="/cart"
              aria-label={`Shopping cart, ${totalItems} items`}
              className="relative flex size-9 items-center justify-center rounded-full border border-[#DFEEE3] bg-[#F1FAF3] text-[#168447] transition hover:bg-[#DDF2E3] active:scale-95 sm:size-[48px]"
            >
              <ShoppingCart size={21} strokeWidth={2.4} className="sm:size-6" />

              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow-sm sm:h-[21px] sm:min-w-[21px] sm:text-xs">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="flex size-9 items-center justify-center rounded-full border border-[#DFEEE3] bg-[#F1FAF3] text-[#168447] transition hover:bg-[#DDF2E3] active:scale-95 sm:size-[48px] lg:hidden"
            >
              {menuOpen ? (
                <X size={22} strokeWidth={2.5} />
              ) : (
                <Menu size={23} strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>

        <div
          id="mobile-navigation"
          className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 ease-out lg:hidden ${
            menuOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
          aria-hidden={!menuOpen}
          inert={!menuOpen}
        >
          <nav
            aria-label="Mobile navigation"
            className="min-h-0 overflow-hidden border-t border-[#E1F0E5] px-3 sm:px-5"
          >
            <div className="mx-auto flex max-w-7xl flex-col py-2">
              {menuLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={closeMenu}
                  className="min-h-11 rounded-xl px-4 py-3 text-sm font-bold text-[#075C2B] transition hover:bg-[#E8F5E9] active:bg-[#D5F0DF]"
                >
                  {link.label}
                </Link>
              ))}

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={menuOpen ? 0 : -1}
                onClick={closeMenu}
                className="flex min-h-11 items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-[#075C2B] transition hover:bg-[#E8F5E9] active:bg-[#D5F0DF]"
              >
                <Image
                  src="/Whatsapp-3d.svg"
                  alt=""
                  width={26}
                  height={26}
                  unoptimized
                  className="size-[26px] shrink-0 object-contain"
                />
                Contact on WhatsApp
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
