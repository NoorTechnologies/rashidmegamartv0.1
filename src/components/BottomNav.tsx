"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { House, Package, ShoppingCart, CalendarDays, UserRound, MoreHorizontal, X, Languages, ShieldCheck, FileText, MessageCircle, RotateCcw } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useSiteLanguage, useToggleSiteLanguage } from "@/components/LanguageProvider";

const WHATSAPP_NUMBER = "918962531603";
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Rashid Mega Mart! I want to know more about your grocery kits and best offers.")}`;

const navItems = [
  { label: "Home", href: "/", icon: House },
  { label: "Kits", href: "/kits", icon: Package },
  { label: "Planner", href: "/planner", icon: CalendarDays },
];

const moreItems = [
  { label: "Contact on WhatsApp", href: whatsappHref, icon: MessageCircle, external: true },
  { label: "Returns & Refunds", href: "/returns-refunds", icon: RotateCcw },
  { label: "Privacy Policy", href: "/privacy-policy", icon: ShieldCheck },
  { label: "Terms & Conditions", href: "/terms-and-conditions", icon: FileText },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const language = useSiteLanguage();
  const toggleLanguage = useToggleSiteLanguage();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  const languageLabel = language === "en" ? "English" : language === "hinglish" ? "Hinglish" : "हिंदी";

  useEffect(() => {
    if (!moreOpen) return;
    const close = (event: PointerEvent) => {
      if (!moreRef.current?.contains(event.target as Node)) setMoreOpen(false);
    };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setMoreOpen(false); };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", escape);
    };
  }, [moreOpen]);

  const MoreMenu = ({ mobile = false }: { mobile?: boolean }) => (
    <div role="menu" aria-label="More links" className={`absolute z-[70] w-[min(260px,calc(100vw-28px))] rounded-2xl border border-white/80 bg-[#FFFEFA]/95 p-2 shadow-[0_18px_55px_rgba(39,31,22,0.18)] backdrop-blur-2xl ${mobile ? "bottom-[calc(100%+10px)] right-0" : "right-0 top-[calc(100%+10px)]"}`}>
      {moreItems.map(({ label, href, icon: Icon, external }) => {
        const content = <><span className="flex size-9 items-center justify-center rounded-xl bg-[#EAF3E6] text-[#315F35]"><Icon size={17} /></span><span className="text-[13px] font-bold text-[#30251F]">{label}</span></>;
        return external ? <a key={label} href={href} target="_blank" rel="noopener noreferrer" role="menuitem" onClick={() => setMoreOpen(false)} className="flex min-h-11 items-center gap-3 rounded-xl px-2 hover:bg-[#F2F5EE]">{content}</a> : <Link key={href} href={href} role="menuitem" onClick={() => setMoreOpen(false)} className="flex min-h-11 items-center gap-3 rounded-xl px-2 hover:bg-[#F2F5EE]">{content}</Link>;
      })}
    </div>
  );

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-2 z-50 px-3 lg:hidden">
        <div className="pointer-events-auto mx-auto flex h-14 max-w-[560px] items-center justify-between rounded-full border border-white/85 bg-[#FFFEFA]/90 px-3 shadow-[0_8px_28px_rgba(32,20,18,0.10)] backdrop-blur-2xl">
          <Link href="/" aria-label="Rashid Mega Mart home" className="flex min-w-0 items-center gap-2">
            <Image src="/images/logo2.png" alt="" width={36} height={36} priority className="size-8 shrink-0 object-contain" />
            <span className="truncate text-sm font-black tracking-tight text-[#30251F]">Rashid Mega Mart</span>
          </Link>
          <button type="button" data-no-translate onClick={toggleLanguage} aria-label={`Current language: ${languageLabel}. Switch language`} className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full border border-[#E8E4DA] bg-white/80 px-3 text-xs font-bold text-[#315F35] transition hover:bg-[#EAF3E6] active:scale-95">
            <Languages size={16} />{languageLabel}
          </button>
        </div>
      </header>

      <header className="pointer-events-none fixed inset-x-0 top-3 z-50 hidden px-4 lg:block">
        <nav aria-label="Main navigation" className="pointer-events-auto mx-auto flex h-[64px] max-w-6xl items-center justify-between gap-3 rounded-full border border-white/80 bg-[#FFFEFA]/90 px-4 shadow-[0_12px_34px_rgba(32,20,18,0.12)] backdrop-blur-2xl backdrop-saturate-150 xl:px-6">
          <Link href="/" aria-label="Rashid Mega Mart home" className="flex shrink-0 items-center gap-2.5">
            <Image src="/images/logo2.png" alt="" width={42} height={42} priority className="size-9 object-contain" />
            <span className="text-base font-black tracking-tight text-[#30251F]">Rashid Mega Mart</span>
          </Link>
          <div className="flex items-center gap-1">
            {navItems.map(({ label, href, icon: Icon }) => <Link key={href} href={href} aria-current={isActive(href) ? "page" : undefined} className={`inline-flex h-10 items-center gap-2 rounded-full px-3.5 text-[13px] font-bold transition-colors ${isActive(href) ? "bg-[#EAF3E6] text-[#315F35]" : "text-[#625F56] hover:bg-white/70 hover:text-[#315F35]"}`}><Icon size={16} />{label}</Link>)}
          </div>
          <div className="flex items-center gap-1.5">
            <button type="button" data-no-translate onClick={toggleLanguage} aria-label={`Current language: ${languageLabel}. Switch language`} className="inline-flex min-h-9 items-center gap-1.5 rounded-full px-2.5 text-xs font-bold text-[#625F56] hover:bg-white/70"><Languages size={16} />{languageLabel}</button>
            <Link href="/profile" className={`inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-[13px] font-bold ${isActive("/profile") ? "bg-[#EAF3E6] text-[#315F35]" : "text-[#625F56] hover:bg-white/70"}`}><UserRound size={17} />Profile</Link>
            <div ref={moreRef} className="relative"><button type="button" aria-expanded={moreOpen} aria-haspopup="menu" onClick={() => setMoreOpen((v) => !v)} className="inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-[13px] font-bold text-[#625F56] hover:bg-white/70">{moreOpen ? <X size={17} /> : <MoreHorizontal size={17} />}</button>{moreOpen && <MoreMenu />}</div>
            <Link href="/cart" aria-label={`Open cart, ${totalItems} items`} className="relative inline-flex min-h-10 items-center gap-2 rounded-full bg-[#315F35] px-4 text-[13px] font-extrabold text-white shadow-sm transition hover:bg-[#254B29]"><ShoppingCart size={17} />Cart{totalItems > 0 && <span className="flex min-w-5 items-center justify-center rounded-full bg-[#F2D27B] px-1.5 py-0.5 text-[10px] font-black text-[#443719]">{totalItems > 99 ? "99+" : totalItems}</span>}</Link>
          </div>
        </nav>
      </header>

      <nav aria-label="Main navigation" className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[560px] px-2 pb-[calc(7px+env(safe-area-inset-bottom))] lg:hidden">
        <div className="relative grid h-[62px] grid-cols-6 items-center rounded-full border border-white/90 bg-[#FFFEFA]/82 px-1 shadow-[0_10px_36px_rgba(40,36,28,0.13),inset_0_1px_0_rgba(255,255,255,0.98)] backdrop-blur-2xl backdrop-saturate-150">
          {navItems.map(({ label, href, icon: Icon }) => <Link key={href} href={href} aria-current={isActive(href) ? "page" : undefined} className={`mx-auto flex h-[52px] w-full max-w-[48px] flex-col items-center justify-center gap-1 rounded-2xl transition active:scale-95 ${isActive(href) ? "text-[#315F35]" : "text-[#625F56]"}`}><span className={`flex size-7 items-center justify-center rounded-full ${isActive(href) ? "bg-[#E7F0E2]" : ""}`}><Icon size={18} /></span><span className={`text-[8.5px] leading-none ${isActive(href) ? "font-extrabold" : "font-medium"}`}>{label}</span></Link>)}
          <Link href="/cart" aria-label={`Open cart, ${totalItems} items`} className={`mx-auto flex h-[52px] w-full max-w-[48px] flex-col items-center justify-center gap-1 rounded-2xl transition active:scale-95 ${isActive("/cart") ? "text-[#315F35]" : "text-[#625F56]"}`}><span className={`relative flex size-7 items-center justify-center rounded-full ${isActive("/cart") ? "bg-[#E7F0E2]" : ""}`}><ShoppingCart size={18} />{totalItems > 0 && <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E4BD59] px-1 text-[8px] font-black text-[#493B1C]">{totalItems > 99 ? "99+" : totalItems}</span>}</span><span className="text-[8.5px] leading-none">Cart</span></Link>
          <Link href="/profile" aria-label="Open profile" className={`mx-auto flex h-[52px] w-full max-w-[48px] flex-col items-center justify-center gap-1 rounded-2xl transition active:scale-95 ${isActive("/profile") ? "text-[#315F35]" : "text-[#625F56]"}`}><span className={`flex size-7 items-center justify-center rounded-full ${isActive("/profile") ? "bg-[#E7F0E2]" : ""}`}><UserRound size={18} /></span><span className="text-[8.5px] leading-none">Profile</span></Link>
          <div ref={moreRef} className="relative mx-auto flex h-[52px] w-full max-w-[48px] items-center justify-center"><button type="button" aria-expanded={moreOpen} aria-haspopup="menu" onClick={() => setMoreOpen((v) => !v)} className={`flex h-[52px] w-full flex-col items-center justify-center gap-1 rounded-2xl transition active:scale-95 ${moreOpen ? "text-[#315F35]" : "text-[#625F56]"}`}><span className={`flex size-7 items-center justify-center rounded-full ${moreOpen ? "bg-[#E7F0E2]" : ""}`}>{moreOpen ? <X size={18} /> : <MoreHorizontal size={18} />}</span></button>{moreOpen && <MoreMenu mobile />}</div>
        </div>
      </nav>

      <a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Chat with Rashid Mega Mart on WhatsApp" className="fixed bottom-[calc(82px+env(safe-area-inset-bottom))] right-4 z-40 flex size-[50px] items-center justify-center rounded-full border border-white/80 bg-white shadow-[0_8px_24px_rgba(25,65,39,0.2)] transition-transform hover:-translate-y-1 active:scale-95 lg:bottom-6 lg:right-6">
        <Image src="/Whatsapp-3d.svg" alt="" width={34} height={34} unoptimized className="size-8 object-contain" />
      </a>
      <Link href="/" aria-label="Rashid Mega Mart home" className="fixed bottom-[calc(84px+env(safe-area-inset-bottom))] left-4 z-40 flex size-11 items-center justify-center rounded-full border border-white/90 bg-white shadow-[0_8px_24px_rgba(39,31,22,0.16)] transition-transform hover:-translate-y-1 active:scale-95 lg:hidden">
        <Image src="/images/logo2.png" alt="" width={38} height={38} priority className="size-9 object-contain" />
      </Link>
    </>
  );
}
