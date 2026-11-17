"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Package, ShoppingCart, MessageCircle, Languages, Tag, Ticket, MoreHorizontal, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useSiteLanguage, useToggleSiteLanguage } from "@/components/LanguageProvider";

const WHATSAPP_NUMBER = "918962531603";
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Rashid Mega Mart! I want to know more about your grocery kits and best offers.")}`;

const navigationItems = [
  { label: "Home", href: "/", icon: House, external: false },
  { label: "Kits", href: "/kits", icon: Package, external: false },
  { label: "Deals", href: "/deals", icon: Tag, external: false },
  { label: "Coupons", href: "/coupons", icon: Ticket, external: false },
];

const mobileNavigationItems = [
  { label: "Home", href: "/", icon: House, external: false },
  { label: "Kits", href: "/kits", icon: Package, external: false },
  { label: "Cart", href: "/cart", icon: ShoppingCart, external: false },
  { label: "WhatsApp", href: whatsappHref, icon: MessageCircle, external: true },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const language = useSiteLanguage();
  const toggleLanguage = useToggleSiteLanguage();
  const [moreOpen, setMoreOpen] = useState(false);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

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
            <button type="button" data-no-translate onClick={toggleLanguage} aria-label={`Current language: ${language}. Switch to ${language === "en" ? "Hinglish" : language === "hinglish" ? "Hindi" : "English"}`} className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[#D8CBB8] bg-white px-3 text-xs font-extrabold text-[#800020] transition hover:bg-[#F1EBDD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020]">
              <Languages size={15} />
              {language === "en" ? "English" : language === "hinglish" ? "Hinglish" : "हिंदी"}
            </button>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#EAF3E9] px-4 text-sm font-extrabold text-[#126B3A] transition-colors hover:bg-[#DCEBDD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#168447]">
              <Image src="/Whatsapp-3d.svg" alt="" width={22} height={22} unoptimized className="size-5 object-contain" />
              Hello! Chat on WhatsApp
            </a>
            <Link href="/cart" aria-label={`Open cart, ${totalItems} items`}
              className="relative inline-flex min-h-10 items-center gap-2 rounded-full bg-[#800020] px-4 text-sm font-extrabold text-white transition-colors hover:bg-[#650019] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020]">
              <ShoppingCart size={17} /> Cart
              {totalItems > 0 && <span className="flex min-w-5 items-center justify-center rounded-full bg-[#F7C928] px-1.5 py-0.5 text-[10px] font-black text-[#202124]">{totalItems > 99 ? "99+" : totalItems}</span>}
            </Link>
          </div>
        </nav>
      </header>

      <nav aria-label="Main navigation" className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full px-2 pb-[calc(8px+env(safe-area-inset-bottom))] sm:px-4 lg:hidden">
        <div className="mx-auto grid h-[62px] w-full max-w-[460px] grid-cols-5 items-center rounded-[22px] border border-white/70 bg-[#FAF7EF]/96 px-1 shadow-[0_8px_28px_rgba(32,20,18,0.16)] backdrop-blur-xl">
          {mobileNavigationItems.map((item) => {
            const Icon = item.icon;
            const active = item.external ? false : isActive(item.href);
            const label = item.external ? "WhatsApp" : item.label;
            const content = (
              <>
                <span className={`relative flex size-7 items-center justify-center rounded-full ${item.external ? "text-[#168447]" : active ? "bg-[#800020] text-white" : "text-[#202124]"}`}>
                  {item.external
                    ? <Image src="/Whatsapp-3d.svg" alt="" width={23} height={23} unoptimized className="size-[22px] object-contain" />
                    : <Icon size={19} strokeWidth={active ? 2.6 : 2.1} />}
                  {item.href === "/cart" && totalItems > 0 && <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#F7C928] px-1 text-[8px] font-black text-[#202124] ring-1 ring-[#FAF7EF]">{totalItems > 99 ? "99+" : totalItems}</span>}
                </span>
                <span className={`text-[10px] leading-none ${item.external ? "font-extrabold text-[#168447]" : active ? "font-black text-[#800020]" : "font-bold text-[#202124]"}`}>{label}</span>
                {active && <span className="absolute bottom-0.5 h-0.5 w-3 rounded-full bg-[#800020]" />}
              </>
            );
            const className = `relative mx-auto flex h-[52px] w-full max-w-[88px] flex-col items-center justify-center gap-0.5 rounded-full transition-colors active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#800020] ${active ? "bg-[#EFE7D8]" : "hover:bg-[#F1EBDD]"}`;
            return item.external
              ? <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className={className}>{content}</a>
              : <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={className}>{content}</Link>;
          })}
          <button type="button" onClick={() => setMoreOpen((open) => !open)} aria-expanded={moreOpen} aria-label="More navigation options" className="mx-auto flex h-[54px] w-full min-w-0 flex-col items-center justify-center gap-1 rounded-2xl text-[#800020] transition hover:bg-[#F1EBDD] active:scale-[0.97]">
            <span className="flex size-7 items-center justify-center rounded-full bg-[#F1EBDD]">{moreOpen ? <X size={17} /> : <MoreHorizontal size={18} />}</span>
            <span className="text-[9px] font-extrabold leading-none">More</span>
          </button>
        </div>
      </nav>
      {moreOpen && (
        <div className="fixed inset-x-3 bottom-[calc(78px+env(safe-area-inset-bottom))] z-[60] mx-auto grid max-w-[460px] grid-cols-3 gap-2 rounded-2xl border border-[#E8DFD1] bg-[#FAF7EF]/98 p-3 shadow-[0_14px_40px_rgba(32,20,18,0.20)] backdrop-blur-xl lg:hidden">
          <Link href="/deals" onClick={() => setMoreOpen(false)} className={`flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl text-xs font-extrabold ${isActive("/deals") ? "bg-[#800020] text-white" : "bg-white text-[#202124]"}`}><Tag size={19} /> Deals</Link>
          <Link href="/coupons" onClick={() => setMoreOpen(false)} className={`flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl text-xs font-extrabold ${isActive("/coupons") ? "bg-[#800020] text-white" : "bg-white text-[#202124]"}`}><Ticket size={19} /> Coupons</Link>
          <button type="button" data-no-translate onClick={toggleLanguage} className="flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl bg-white text-xs font-extrabold text-[#800020]"><Languages size={19} /> {language === "en" ? "English" : language === "hinglish" ? "Hinglish" : "हिंदी"}</button>
        </div>
      )}
    </>
  );
}
