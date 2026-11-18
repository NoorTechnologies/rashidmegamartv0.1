"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  House, LayoutGrid, Package, ShoppingCart, UserRound, MoreHorizontal,
  CalendarDays, ShieldCheck, FileText, X, MessageCircle,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

const WHATSAPP_NUMBER = "918962531603";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const primaryItems = [
  { label: "Home", href: "/", icon: House },
  { label: "Shop", href: "/shop", icon: LayoutGrid },
  { label: "Kits", href: "/kits", icon: Package },
  { label: "Planner", href: "/planner", icon: CalendarDays },
];

const moreItems = [
  { label: "Contact on WhatsApp", description: "Chat with our store team", href: WHATSAPP_URL, icon: MessageCircle, external: true },
  { label: "Privacy Policy", description: "How customer information is handled", href: "/privacy-policy", icon: ShieldCheck },
  { label: "Terms & Conditions", description: "Store policies and customer terms", href: "/terms", icon: FileText },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [moreOpen, setMoreOpen] = useState(false);
  const desktopMoreRef = useRef<HTMLDivElement>(null);
  const mobileMoreRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    if (!moreOpen) return;
    const closeOnOutside = (event: PointerEvent) => {
      if (!desktopMoreRef.current?.contains(event.target as Node) && !mobileMoreRef.current?.contains(event.target as Node)) setMoreOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [moreOpen]);

  const MoreMenu = ({ mobile = false }: { mobile?: boolean }) => (
    <div
      className={`rmm-more-popover absolute z-[70] w-[min(310px,calc(100vw-28px))] rounded-2xl border border-white/80 bg-[#FFFEFA]/95 p-2 shadow-[0_18px_55px_rgba(39,31,22,0.18)] backdrop-blur-2xl ${mobile ? "bottom-[calc(100%+12px)] right-0" : "right-0 top-[calc(100%+10px)]"}`}
      role="menu"
      aria-label="More links"
    >
      {moreItems.map(({ label, description, href, icon: Icon, external }) => {
        const item = (
          <>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#F4F1E9] text-[#4F6B45]"><Icon size={18} /></span>
            <span className="min-w-0 flex-1 text-left">
              <span className="block text-[13px] font-extrabold text-[#292A24]">{label}</span>
              <span className="mt-0.5 block text-[10px] text-[#77766D]">{description}</span>
            </span>
          </>
        );
        const className = "flex min-h-12 items-center gap-3 rounded-xl px-2.5 py-2 transition-colors duration-200 hover:bg-[#F4F3ED] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#168447]";
        return external ? (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer" role="menuitem" onClick={() => setMoreOpen(false)} className={className}>{item}</a>
        ) : (
          <Link key={href} href={href} role="menuitem" onClick={() => setMoreOpen(false)} className={className}>{item}</Link>
        );
      })}
    </div>
  );

  return (
    <>
      <header className="rmm-desktop-nav fixed inset-x-0 top-0 z-50 hidden lg:block">
        <nav aria-label="Main navigation" className="mx-auto flex h-[66px] max-w-7xl items-center justify-between gap-6 px-6 xl:px-8">
          <Link href="/" aria-label="Rashid Mega Mart home" className="rmm-nav-brand flex shrink-0 items-center gap-2.5 rounded-xl">
            <Image src="/images/logo2.png" alt="" width={48} height={48} priority className="size-11 object-contain" />
            <span className="text-base font-black tracking-tight text-[#30251F]">Rashid Mega Mart</span>
          </Link>
          <div className="flex h-full items-center gap-1.5">
            {primaryItems.map(({ label, href, icon: Icon }) => (
              <Link key={href} href={href} aria-current={isActive(href) ? "page" : undefined} className={`rmm-nav-link inline-flex h-9 items-center gap-2 rounded-full px-3.5 text-[13px] font-bold transition-all duration-300 ${isActive(href) ? "bg-[#EAF3E6] text-[#315F35]" : "text-[#625F56] hover:bg-white/70 hover:text-[#315F35]"}`}>
                <Icon size={16} />{label}
              </Link>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-2 rounded-full px-3 text-[13px] font-bold text-[#168447] transition hover:bg-[#EAF6EE]">
              <Image src="/Whatsapp-3d.svg" alt="" width={21} height={21} unoptimized className="size-5 object-contain" />Contact
            </a>
            <Link href="/profile" className={`inline-flex min-h-9 items-center gap-2 rounded-full px-3 text-[13px] font-bold transition hover:bg-white/70 ${isActive("/profile") ? "bg-[#EAF3E6] text-[#315F35]" : "text-[#625F56]"}`}><UserRound size={17} />Profile</Link>
            <div ref={desktopMoreRef} className="relative">
              <button type="button" aria-expanded={moreOpen} aria-haspopup="menu" onClick={() => setMoreOpen((open) => !open)} className="inline-flex min-h-9 items-center gap-2 rounded-full px-3 text-[13px] font-bold text-[#625F56] transition hover:bg-white/70 hover:text-[#315F35]">
                {moreOpen ? <X size={17} /> : <MoreHorizontal size={17} />}More
              </button>
              {moreOpen && <MoreMenu />}
            </div>
            <Link href="/cart" aria-label={`Open cart, ${totalItems} items`} className="relative inline-flex min-h-10 items-center gap-2 rounded-full bg-[#315F35] px-4 text-[13px] font-extrabold text-white shadow-[0_5px_16px_rgba(49,95,53,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#254B29] active:scale-[0.98]">
              <ShoppingCart size={17} />Cart
              {totalItems > 0 && <span className="flex min-w-5 items-center justify-center rounded-full bg-[#F2D27B] px-1.5 py-0.5 text-[10px] font-black text-[#443719]">{totalItems > 99 ? "99+" : totalItems}</span>}
            </Link>
          </div>
        </nav>
      </header>

      <nav aria-label="Main navigation" className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[560px] px-3 pb-[calc(7px+env(safe-area-inset-bottom))] lg:hidden">
        <div className="relative grid h-[60px] grid-cols-7 items-center rounded-full border border-white/90 bg-[#FFFEFA]/78 px-1.5 shadow-[0_10px_36px_rgba(40,36,28,0.13),inset_0_1px_0_rgba(255,255,255,0.98)] backdrop-blur-2xl backdrop-saturate-150">
          <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
          {primaryItems.map(({ label, href, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`relative mx-auto flex h-[50px] w-full max-w-[48px] flex-col items-center justify-center gap-1 rounded-2xl transition-all duration-300 ease-out active:scale-95 ${active ? "text-[#315F35]" : "text-[#625F56] hover:text-[#315F35]"}`}>
                <span className={`flex size-[29px] items-center justify-center rounded-full transition-all duration-300 ${active ? "bg-[#E7F0E2] text-[#315F35]" : ""}`}><Icon size={18} strokeWidth={active ? 2.3 : 1.8} /></span>
                <span className={`text-[8.5px] leading-none ${active ? "font-extrabold" : "font-medium"}`}>{label}</span>
                {active && <span className="absolute bottom-0.5 size-1 rounded-full bg-[#168447]" />}
              </Link>
            );
          })}
          <Link href="/cart" aria-label={`Open cart, ${totalItems} items`} className={`rmm-mobile-cart relative mx-auto flex h-[50px] w-full max-w-[48px] flex-col items-center justify-center gap-1 rounded-2xl transition-all duration-300 active:scale-95 ${isActive("/cart") ? "text-[#315F35]" : "text-[#625F56]"}`}>
            <span className={`flex size-[29px] items-center justify-center rounded-full ${isActive("/cart") ? "bg-[#E7F0E2] text-[#315F35]" : ""}`}><ShoppingCart size={18} strokeWidth={isActive("/cart") ? 2.3 : 1.8} /></span>
            <span className="text-[8.5px] leading-none">Cart</span>
            {totalItems > 0 && <span className="absolute right-[1px] top-[1px] flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#E4BD59] px-1 text-[8px] font-black text-[#493B1C] ring-2 ring-[#FFFEFA]">{totalItems > 99 ? "99+" : totalItems}</span>}
          </Link>
          <Link href="/profile" aria-label="Open profile" className={`mx-auto flex h-[50px] w-full max-w-[48px] flex-col items-center justify-center gap-1 rounded-2xl transition-all duration-300 active:scale-95 ${isActive("/profile") ? "text-[#315F35]" : "text-[#625F56]"}`}>
            <span className={`flex size-[29px] items-center justify-center rounded-full ${isActive("/profile") ? "bg-[#E7F0E2] text-[#315F35]" : ""}`}><UserRound size={18} /></span>
            <span className="text-[8.5px] leading-none">Profile</span>
          </Link>
          <div ref={mobileMoreRef} className="relative mx-auto flex h-[50px] w-full max-w-[48px] items-center justify-center">
            <button type="button" aria-expanded={moreOpen} aria-haspopup="menu" onClick={() => setMoreOpen((open) => !open)} className={`flex h-[50px] w-full flex-col items-center justify-center gap-1 rounded-2xl text-[#625F56] transition-all duration-300 active:scale-95 ${moreOpen ? "text-[#315F35]" : ""}`}>
              <span className={`flex size-[29px] items-center justify-center rounded-full ${moreOpen ? "bg-[#E7F0E2] text-[#315F35]" : ""}`}>{moreOpen ? <X size={18} /> : <MoreHorizontal size={18} />}</span>
              <span className="text-[8.5px] leading-none">More</span>
            </button>
            {moreOpen && <MoreMenu mobile />}
          </div>
        </div>
      </nav>

      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat with Rashid Mega Mart on WhatsApp" className="rmm-floating-whatsapp fixed bottom-[calc(82px+env(safe-area-inset-bottom))] right-4 z-40 flex size-[50px] items-center justify-center rounded-full border border-white/80 bg-white shadow-[0_8px_24px_rgba(25,65,39,0.2)] transition-transform duration-300 hover:-translate-y-1 active:scale-95 lg:bottom-6 lg:right-6">
        <Image src="/Whatsapp-3d.svg" alt="" width={32} height={32} unoptimized className="size-8 object-contain" />
      </a>
    </>
  );
}
