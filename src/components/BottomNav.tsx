"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  House,
  Globe2,
  Package,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useSiteLanguage, useSetSiteLanguage } from "@/components/LanguageProvider";

const navItems = [
  { label: "Home", href: "/", icon: House },
  { label: "Kits", href: "/kits", icon: Package },
  { label: "Account", href: "/account", icon: UserRound },
];

function LanguageMenu({
  language,
  setLanguage,
  onClose,
  mobile = false,
}: {
  language: "en" | "hinglish" | "hi";
  setLanguage: (value: "en" | "hinglish" | "hi") => void;
  onClose: () => void;
  mobile?: boolean;
}) {
  const placement = mobile
    ? "bottom-[calc(100%+14px)] left-1/2 -translate-x-1/2"
    : "right-0 top-[calc(100%+12px)]";
  const options = [
    {
      value: "en",
      label: "English",
      native: "English",
      detail: "EN",
      description: "Simple and familiar",
    },
    {
      value: "hinglish",
      label: "Hinglish",
      native: "हिंग्लिश",
      detail: "HI·EN",
      description: "Hindi in English letters",
    },
    {
      value: "hi",
      label: "Hindi",
      native: "हिन्दी",
      detail: "अ",
      description: "पूरी वेबसाइट हिन्दी में",
    },
  ] as const;

  return (
    <div
      role="menu"
      aria-label="Choose language"
      className={
        "absolute z-[70] w-[min(278px,calc(100vw-24px))] overflow-hidden rounded-[24px] border border-[#800020]/10 bg-[#FFFEFA]/95 p-2.5 shadow-[0_22px_65px_rgba(45,20,26,0.20),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-2xl backdrop-saturate-150 " +
        placement
      }
    >
      <div className="flex items-center gap-3 px-2.5 pb-3 pt-2">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#800020]/[0.07] text-[#800020]">
          <Globe2 size={19} strokeWidth={2} />
        </span>
        <span className="min-w-0">
          <span className="block text-[13px] font-extrabold tracking-[-0.02em] text-[#30251F]">
            Choose your language
          </span>
          <span className="mt-0.5 block text-[10px] font-medium text-[#81796F]">
            Your preference is saved automatically
          </span>
        </span>
      </div>
      <div className="mx-1 h-px bg-gradient-to-r from-transparent via-[#800020]/15 to-transparent" />
      <div className="space-y-1.5 pt-2">
        {options.map((option) => {
          const selected = language === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="menuitemradio"
              aria-checked={selected}
              onClick={() => {
                setLanguage(option.value);
                onClose();
              }}
              className={
                "group flex min-h-[58px] w-full items-center gap-3 rounded-[17px] border px-2.5 py-2 text-left transition-all duration-200 active:scale-[0.985] " +
                (selected
                  ? "border-[#800020]/15 bg-[#800020]/[0.055] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                  : "border-transparent hover:border-[#800020]/[0.08] hover:bg-[#F7F3EF]")
              }
            >
              <span
                className={
                  "flex size-10 shrink-0 items-center justify-center rounded-[13px] text-[10px] font-black tracking-wide transition-colors " +
                  (selected
                    ? "bg-[#800020] text-white shadow-sm shadow-[#800020]/20"
                    : "bg-[#F0ECE7] text-[#675B55] group-hover:bg-white")
                }
              >
                {option.detail}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="text-[12px] font-extrabold text-[#30251F]">
                    {option.label}
                  </span>
                  <span className="text-[10px] font-semibold text-[#91867D]">
                    {option.native}
                  </span>
                </span>
                <span className="mt-0.5 block text-[10px] font-medium text-[#81796F]">
                  {option.description}
                </span>
              </span>
              <span
                className={
                  "flex size-[22px] shrink-0 items-center justify-center rounded-full border transition-all " +
                  (selected
                    ? "border-[#800020] bg-[#800020] text-white"
                    : "border-[#D8D0C8] text-transparent group-hover:border-[#B9A9A0]")
                }
              >
                <Check size={12} strokeWidth={3} />
              </span>
            </button>
          );
        })}
      </div>
      <p className="px-2.5 pb-1 pt-2 text-center text-[9px] font-medium tracking-wide text-[#A0968D]">
        RASHID MEGA MART · LANGUAGE PREFERENCE
      </p>
    </div>
  );
}

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const language = useSiteLanguage();
  const setLanguage = useSetSiteLanguage();
  const [languageOpen, setLanguageOpen] = useState(false);
  const desktopLanguageRef = useRef<HTMLDivElement>(null);
  const mobileLanguageRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);


  useEffect(() => {
    if (!languageOpen) return;
    const close = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!desktopLanguageRef.current?.contains(target) && !mobileLanguageRef.current?.contains(target)) setLanguageOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLanguageOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [languageOpen]);

  return (
    <>
      {/* Desktop navigation */}
      <header className="pointer-events-none fixed inset-x-0 top-3 z-50 hidden px-4 lg:block">
        <nav
          aria-label="Main navigation"
          className="pointer-events-auto relative mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-3 rounded-full border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(255,254,250,0.62))] px-5 shadow-[0_18px_55px_rgba(64,24,32,0.13),inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-1px_0_rgba(255,255,255,0.35)] backdrop-blur-[28px] backdrop-saturate-[180%] xl:px-7"
        >
          <Link href="/" aria-label="Rashid Mega Mart home" className="flex shrink-0 items-center gap-2.5">
            <Image src="/images/logo2.png" alt="" width={42} height={42} priority className="size-9 object-contain" />
            <span className="text-base font-black tracking-tight text-[#30251F]">Rashid Mega Mart</span>
          </Link>

          <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/55 bg-white/35 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            {navItems.slice(0, 2).map(({ label, href, icon: Icon }) => (
              <Link key={href} href={href} aria-current={isActive(href) ? "page" : undefined}
                className={"inline-flex h-10 items-center gap-2 rounded-full px-4 text-[12px] font-bold transition-all duration-200 " + (isActive(href) ? "bg-white/90 text-[#315F35] shadow-[0_3px_12px_rgba(49,95,53,0.12)]" : "text-[#625F56] hover:bg-white/65 hover:text-[#315F35]")}>
                <Icon size={15} strokeWidth={2.2} />{label}
              </Link>
            ))}
            <Link href="/cart" aria-label={`Open cart, ${totalItems} items`} aria-current={isActive("/cart") ? "page" : undefined}
              className={"relative inline-flex h-10 items-center gap-2 rounded-full px-4 text-[12px] font-extrabold transition-all duration-200 " + (isActive("/cart") ? "bg-[#315F35] text-white shadow-lg shadow-[#315F35]/25" : "bg-white/75 text-[#315F35] hover:bg-white")}>
              <ShoppingCart size={16} strokeWidth={2.3}/>Cart
              {totalItems > 0 && <span className="flex min-w-5 items-center justify-center rounded-full bg-[#F2D27B] px-1.5 py-0.5 text-[10px] font-black text-[#443719]">{totalItems > 99 ? "99+" : totalItems}</span>}
            </Link>
            {navItems.slice(2).map(({ label, href, icon: Icon }) => (
              <Link key={href} href={href} aria-current={isActive(href) ? "page" : undefined}
                className={"inline-flex h-10 items-center gap-2 rounded-full px-4 text-[12px] font-bold transition-all duration-200 " + (isActive(href) ? "bg-white/90 text-[#315F35] shadow-[0_3px_12px_rgba(49,95,53,0.12)]" : "text-[#625F56] hover:bg-white/65 hover:text-[#315F35]")}>
                <Icon size={15} strokeWidth={2.2} />{label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <div ref={desktopLanguageRef} className="relative">
              <button type="button" aria-expanded={languageOpen} aria-haspopup="menu" onClick={() => setLanguageOpen((value) => !value)} className={"inline-flex min-h-9 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-bold transition-colors " + (languageOpen ? "bg-[#EAF3E6] text-[#315F35]" : "text-[#625F56] hover:bg-white/70")}>
                <Globe2 size={16} strokeWidth={2.2} className="text-[#800020]" />
                <span>Language</span>
                <span className="rounded-full bg-[#800020]/[0.07] px-1.5 py-0.5 text-[9px] font-black tracking-wide text-[#800020]">{language === "en" ? "EN" : language === "hinglish" ? "HI·EN" : "हिंदी"}</span>
                <ChevronDown size={13} strokeWidth={2.2} className={"text-[#8C7772] transition-transform " + (languageOpen ? "rotate-180" : "")} />
              </button>
              {languageOpen && <LanguageMenu language={language} setLanguage={setLanguage} onClose={() => setLanguageOpen(false)} />}
            </div>


          </div>
        </nav>
      </header>

      {/* Mobile liquid-glass navigation */}
      <nav aria-label="Main navigation" className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[520px] px-3 pb-[calc(9px+env(safe-area-inset-bottom))] lg:hidden">
        <div className="relative grid h-[76px] grid-cols-5 items-center rounded-[27px] border border-white/85 bg-[linear-gradient(145deg,rgba(255,255,255,0.88),rgba(255,254,250,0.64))] px-2 shadow-[0_16px_48px_rgba(48,37,31,0.16),inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-1px_0_rgba(255,255,255,0.4)] backdrop-blur-[30px] backdrop-saturate-[185%]">
          {navItems.slice(0, 2).map(({ label, href, icon: Icon }) => (
            <Link key={href} href={href} aria-current={isActive(href) ? "page" : undefined}
              className={"mx-auto flex h-14 w-full flex-col items-center justify-center gap-1 rounded-2xl transition-all duration-200 active:scale-90 " + (isActive(href) ? "text-[#315F35]" : "text-[#81796F]")}>
              <span className={"flex size-8 items-center justify-center rounded-full transition-colors " + (isActive(href) ? "bg-[#E5F0E1] shadow-inner" : "")}><Icon size={19} strokeWidth={2.05}/></span>
              <span className={"text-[10px] leading-none " + (isActive(href) ? "font-extrabold" : "font-semibold")}>{label}</span>
            </Link>
          ))}

          <Link href="/cart" aria-label={`Open cart, ${totalItems} items`} aria-current={isActive("/cart") ? "page" : undefined}
            className="relative mx-auto -mt-5 flex size-[58px] flex-col items-center justify-center rounded-[21px] border border-white/90 bg-[linear-gradient(145deg,#3E7946,#24542D)] text-white shadow-[0_10px_24px_rgba(36,84,45,0.34),inset_0_1px_0_rgba(255,255,255,0.38)] ring-[5px] ring-[#FFFEFA]/75 transition-all duration-200 active:scale-90">
            <ShoppingCart size={23} strokeWidth={2.15}/>
            <span className="mt-0.5 text-[9px] font-extrabold leading-none">Cart</span>
            {totalItems > 0 && <span className="absolute -right-2 -top-2 flex h-[19px] min-w-[19px] items-center justify-center rounded-full border-2 border-[#FFFEFA] bg-[#E4BD59] px-1 text-[9px] font-black text-[#493B1C] shadow-sm">{totalItems > 99 ? "99+" : totalItems}</span>}
          </Link>

          {navItems.slice(2).map(({ label, href, icon: Icon }) => (
            <Link key={href} href={href} aria-current={isActive(href) ? "page" : undefined}
              className={"mx-auto flex h-14 w-full flex-col items-center justify-center gap-1 rounded-2xl transition-all duration-200 active:scale-90 " + (isActive(href) ? "text-[#315F35]" : "text-[#81796F]")}>
              <span className={"flex size-8 items-center justify-center rounded-full transition-colors " + (isActive(href) ? "bg-[#E5F0E1] shadow-inner" : "")}><Icon size={19} strokeWidth={2.05}/></span>
              <span className={"text-[10px] leading-none " + (isActive(href) ? "font-extrabold" : "font-semibold")}>{label}</span>
            </Link>
          ))}

          <div ref={mobileLanguageRef} data-no-translate className="relative mx-auto flex h-14 w-full items-center justify-center">
            <button type="button" aria-label="Choose language" aria-expanded={languageOpen} aria-haspopup="menu" onClick={() => setLanguageOpen((value) => !value)}
              className={"flex h-14 w-full flex-col items-center justify-center gap-1 rounded-2xl transition-all duration-200 active:scale-90 " + (languageOpen ? "text-[#315F35]" : "text-[#81796F]")}>
              <span className={"flex size-8 items-center justify-center rounded-full " + (languageOpen ? "bg-[#E5F0E1]" : "")}><Globe2 size={18} strokeWidth={2.05}/></span>
              <span className="text-[10px] font-semibold leading-none">{language === "en" ? "English" : language === "hinglish" ? "Hinglish" : "हिन्दी"}</span>
            </button>
            {languageOpen && <LanguageMenu mobile language={language} setLanguage={setLanguage} onClose={() => setLanguageOpen(false)}/>}
          </div>
        </div>
      </nav>
    </>
  );
}
