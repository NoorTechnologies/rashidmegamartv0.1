"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Package, ShoppingCart, Languages } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useSiteLanguage, useToggleSiteLanguage } from "@/components/LanguageProvider";

const WHATSAPP_NUMBER = "918962531603";
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Rashid Mega Mart! I want to know more about your grocery kits and best offers.")}`;

const navigationItems = [
  { label: "Home", href: "/", icon: House },
  { label: "Kits", href: "/kits", icon: Package },
];

const mobileNavigationItems = [
  { label: "Home", href: "/", icon: House },
  { label: "Kits", href: "/kits", icon: Package },
  { label: "Cart", href: "/cart", icon: ShoppingCart },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const language = useSiteLanguage();
  const toggleLanguage = useToggleSiteLanguage();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const languageLabel = language === "en" ? "English" : language === "hinglish" ? "Hinglish" : "हिंदी";

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-3 z-50 hidden px-4 lg:block">
        <nav aria-label="Main navigation" className="pointer-events-auto mx-auto flex h-[64px] max-w-6xl items-center justify-between gap-3 rounded-full bg-[#FAF7EF]/95 px-4 shadow-[0_12px_34px_rgba(32,20,18,0.16)] backdrop-blur-xl xl:px-6">
          <Link href="/" aria-label="Rashid Mega Mart home" className="flex shrink-0 items-center gap-2.5 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#800020]">
            <Image src="/images/logo2.png" alt="" width={42} height={42} priority className="size-9 object-contain" />
            <span className="text-base font-black tracking-tight text-[#202124]">Rashid <span className="text-[#800020]">Mega Mart</span></span>
          </Link>

          <div className="flex h-full items-center gap-1">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}
                className={`inline-flex h-10 items-center rounded-full px-5 text-sm font-extrabold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020] ${isActive(item.href) ? "bg-[#800020] text-white" : "text-[#202124] hover:bg-[#EFE7D8] hover:text-[#800020]"}`}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button type="button" data-no-translate onClick={toggleLanguage} aria-label={`Current language: ${languageLabel}. Switch language`} className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-[#E8DFD1] bg-white px-3 text-xs font-extrabold text-[#800020] transition hover:bg-[#F1EBDD]">
              <Languages size={16} /> {languageLabel}
            </button>
            <Link href="/cart" aria-label={`Open cart, ${totalItems} items`}
              className="relative inline-flex min-h-10 items-center gap-2 rounded-full bg-[#800020] px-4 text-sm font-extrabold text-white transition-colors hover:bg-[#650019] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020]">
              <ShoppingCart size={17} /> Cart
              {totalItems > 0 && <span className="flex min-w-5 items-center justify-center rounded-full bg-[#F7C928] px-1.5 py-0.5 text-[10px] font-black text-[#202124]">{totalItems > 99 ? "99+" : totalItems}</span>}
            </Link>
          </div>
        </nav>
      </header>

      <nav aria-label="Main navigation" className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full px-2 pb-[calc(8px+env(safe-area-inset-bottom))] sm:px-4 lg:hidden">
        <div className="mx-auto grid h-[62px] w-full max-w-[460px] grid-cols-4 items-center rounded-[22px] border border-white/70 bg-[#FAF7EF]/96 px-1 shadow-[0_8px_28px_rgba(32,20,18,0.16)] backdrop-blur-xl">
          {mobileNavigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined}
                aria-label={item.label === "Cart" ? `Open cart, ${totalItems} items` : item.label}
                className={`relative mx-auto flex h-[52px] w-full max-w-[88px] flex-col items-center justify-center gap-0.5 rounded-full transition-colors active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#800020] ${active ? "bg-[#EFE7D8]" : "hover:bg-[#F1EBDD]"}`}>
                <span className={`relative flex size-7 items-center justify-center rounded-full ${active ? "bg-[#800020] text-white" : "text-[#202124]"}`}>
                  <Icon size={19} strokeWidth={active ? 2.6 : 2.1} />
                  {item.href === "/cart" && totalItems > 0 && <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#F7C928] px-1 text-[8px] font-black text-[#202124] ring-1 ring-[#FAF7EF]">{totalItems > 99 ? "99+" : totalItems}</span>}
                </span>
                <span className={`text-[10px] leading-none ${active ? "font-black text-[#800020]" : "font-bold text-[#202124]"}`}>{item.label}</span>
                {active && <span className="absolute bottom-0.5 h-0.5 w-3 rounded-full bg-[#800020]" />}
              </Link>
            );
          })}
          <button type="button" data-no-translate onClick={toggleLanguage} aria-label={`Current language: ${languageLabel}. Switch language`} className="mx-auto flex h-[54px] w-full min-w-0 flex-col items-center justify-center gap-1 rounded-2xl text-[#800020] transition hover:bg-[#F1EBDD] active:scale-[0.97]">
            <span className="flex size-7 items-center justify-center rounded-full bg-[#F1EBDD]"><Languages size={18} /></span>
            <span className="max-w-full truncate px-0.5 text-[9px] font-extrabold leading-none">{languageLabel}</span>
          </button>
        </div>
      </nav>

      <a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Chat with Rashid Mega Mart on WhatsApp"
        className="fixed bottom-[calc(84px+env(safe-area-inset-bottom))] right-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(22,132,71,0.24)] ring-1 ring-[#168447]/15 transition-transform hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#168447] lg:bottom-6 lg:right-6">
        <Image src="/Whatsapp-3d.svg" alt="" width={42} height={42} unoptimized className="size-11 object-contain" />
      </a>
    </>
  );
}
