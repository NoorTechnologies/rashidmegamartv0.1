"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  FileText,
  House,
  LifeBuoy,
  Globe2,
  Package,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  X,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useSiteLanguage, useSetSiteLanguage } from "@/components/LanguageProvider";

const WHATSAPP_NUMBER = "918962531603";
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Rashid Mega Mart! I need help with grocery kits and store information.")}`;

const navItems = [
  { label: "Home", href: "/", icon: House },
  { label: "Kits", href: "/kits", icon: Package },
];

const helpItems = [
  { label: "Contact on WhatsApp", href: whatsappHref, external: true, whatsapp: true },
  { label: "Returns & Refunds", href: "/returns-refunds", icon: RotateCcw },
  { label: "Privacy Policy", href: "/privacy-policy", icon: ShieldCheck },
  { label: "Terms & Conditions", href: "/terms-and-conditions", icon: FileText },
];

function HelpCentreMenu({
  onClose,
  mobile = false,
}: {
  onClose: () => void;
  mobile?: boolean;
}) {
  const placement = mobile
    ? "bottom-[calc(100%+10px)] right-0"
    : "right-0 top-[calc(100%+10px)]";

  return (
    <div
      role="menu"
      aria-label="Help Centre"
      className={`absolute z-[70] max-h-[min(65dvh,360px)] w-[min(270px,calc(100vw-24px))] overflow-y-auto overscroll-contain rounded-2xl border border-[#E8DFD1] bg-[#FFFEFA] p-2 shadow-[0_18px_55px_rgba(39,31,22,0.22)] ${placement}`}
    >
      <div className="px-2 pb-2 pt-1">
        <p className="text-xs font-extrabold text-[#30251F]">How can we help?</p>
        <p className="mt-0.5 text-[10px] text-[#81796F]">Support and store policies</p>
      </div>
      <div className="h-px bg-[#EEE8E1]" />
      {helpItems.map(({ label, href, icon: Icon, external, whatsapp }) => {
        const content = (
          <>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF3E6] text-[#315F35]">
              {whatsapp ? (
                <Image src="/Whatsapp-3d.svg" alt="" width={23} height={23} unoptimized />
              ) : Icon ? (
                <Icon size={17} />
              ) : null}
            </span>
            <span className="min-w-0 flex-1 text-left text-[12px] font-bold text-[#30251F]">
              {label}
            </span>
          </>
        );

        return external ? (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            onClick={onClose}
            className="flex min-h-11 items-center gap-3 rounded-xl px-2 transition-colors hover:bg-[#F2F5EE]"
          >
            {content}
          </a>
        ) : (
          <Link
            key={href}
            href={href}
            role="menuitem"
            onClick={onClose}
            className="flex min-h-11 items-center gap-3 rounded-xl px-2 transition-colors hover:bg-[#F2F5EE]"
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
}

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
    ? "bottom-[calc(100%+12px)] right-0"
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
        "rmm-language-menu absolute z-[70] max-h-[min(68dvh,390px)] w-[min(278px,calc(100vw-24px))] overflow-y-auto overscroll-contain rounded-[22px] border border-[#E8DFD1] bg-[#FFFEFA] p-2.5 shadow-[0_22px_65px_rgba(45,20,26,0.22)] " +
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
                "rmm-language-option group flex min-h-[58px] w-full items-center gap-3 rounded-[16px] border px-2.5 py-2 text-left transition-[background-color,border-color,transform,box-shadow] duration-300 ease-out active:scale-[0.985] " +
                (selected
                  ? "border-[#800020]/15 bg-[#800020]/[0.055] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                  : "border-transparent hover:border-[#800020]/[0.08] hover:bg-[#F7F3EF]")
              }
            >
              <span
                className={
                  "flex size-10 shrink-0 items-center justify-center rounded-[13px] text-[10px] font-black tracking-wide transition-[background-color,color,transform] duration-300 " +
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
                  "flex size-[22px] shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color,transform] duration-300 " +
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
  const [helpOpen, setHelpOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const desktopHelpRef = useRef<HTMLDivElement>(null);
  const mobileHelpRef = useRef<HTMLDivElement>(null);
  const desktopLanguageRef = useRef<HTMLDivElement>(null);
  const mobileLanguageRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);


  useEffect(() => {
    if (!helpOpen && !languageOpen) return;

    const close = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !desktopHelpRef.current?.contains(target) &&
        !mobileHelpRef.current?.contains(target)
      ) {
        setHelpOpen(false);
      }
      if (!desktopLanguageRef.current?.contains(target) && !mobileLanguageRef.current?.contains(target)) setLanguageOpen(false);
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setHelpOpen(false); setLanguageOpen(false); }
    };

    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [helpOpen, languageOpen]);

  return (
    <>
      {/* Desktop navigation */}
      <header className="pointer-events-none fixed inset-x-0 top-3 z-50 hidden px-4 lg:block">
        <nav
          aria-label="Main navigation"
          className="pointer-events-auto mx-auto flex h-[62px] max-w-6xl items-center justify-between gap-2 rounded-full border border-white/75 bg-[#FFFEFA]/82 px-4 shadow-[0_12px_36px_rgba(64,24,32,0.12),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-2xl backdrop-saturate-150 xl:px-6"
        >
          <Link href="/" aria-label="Rashid Mega Mart home" className="flex shrink-0 items-center gap-2.5">
            <Image src="/images/logo2.png" alt="" width={42} height={42} priority className="size-9 object-contain" />
            <span className="text-base font-black tracking-tight text-[#30251F]">Rashid Mega Mart</span>
          </Link>

          <div className="flex items-center gap-0.5">
            {navItems.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={
                  "inline-flex h-10 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-bold transition-colors " +
                  (isActive(href)
                    ? "bg-[#EAF3E6] text-[#315F35]"
                    : "text-[#625F56] hover:bg-white/70 hover:text-[#315F35]")
                }
              >
                <Icon size={15} strokeWidth={2.2} className="text-[#800020]" />
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <div ref={desktopHelpRef} className="relative">
              <button
                type="button"
                aria-expanded={helpOpen}
                aria-haspopup="menu"
                onClick={() => setHelpOpen((value) => !value)}
                className={
                  "inline-flex min-h-9 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-bold transition-colors " +
                  (helpOpen ? "bg-[#EAF3E6] text-[#315F35]" : "text-[#625F56] hover:bg-white/70")
                }
              >
                <LifeBuoy size={16} strokeWidth={2.2} className="text-[#800020]" />
                Help Centre
              </button>
              {helpOpen && <HelpCentreMenu onClose={() => setHelpOpen(false)} />}
            </div>

            <div ref={desktopLanguageRef} className="relative">
              <button type="button" aria-expanded={languageOpen} aria-haspopup="menu" onClick={() => setLanguageOpen((value) => !value)} className={"inline-flex min-h-9 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-bold transition-colors " + (languageOpen ? "bg-[#EAF3E6] text-[#315F35]" : "text-[#625F56] hover:bg-white/70")}>
                <Globe2 size={16} strokeWidth={2.2} className="text-[#800020]" />\n                Language\n                <span className="rounded-full bg-[#800020]/[0.07] px-1.5 py-0.5 text-[9px] font-black tracking-wide text-[#800020]">{language === "en" ? "EN" : language === "hinglish" ? "HI·EN" : "हिंदी"}</span>\n                <ChevronDown size={13} strokeWidth={2.2} className={"text-[#8C7772] transition-transform " + (languageOpen ? "rotate-180" : "")} />
              </button>
              {languageOpen && <LanguageMenu language={language} setLanguage={setLanguage} onClose={() => setLanguageOpen(false)} />}
            </div>

            <Link
              href="/cart"
              aria-label={`Open cart, ${totalItems} items`}
              className="relative inline-flex min-h-9 items-center gap-1.5 rounded-full bg-[#315F35] px-3 text-[12px] font-extrabold text-white shadow-sm transition hover:bg-[#254B29]"
            >
              <ShoppingCart size={16} strokeWidth={2.2} className="text-white" />
              Cart
              {totalItems > 0 && (
                <span className="flex min-w-5 items-center justify-center rounded-full bg-[#F2D27B] px-1.5 py-0.5 text-[10px] font-black text-[#443719]">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile navigation */}
      <nav
        aria-label="Main navigation"
        className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[560px] px-2 pb-[calc(6px+env(safe-area-inset-bottom))] lg:hidden"
      >
        <div className="relative grid h-[66px] grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_88px_minmax(0,1fr)] items-center rounded-[24px] border border-white/80 bg-[#FFFEFA]/78 px-1.5 shadow-[0_12px_34px_rgba(64,24,32,0.14),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-2xl backdrop-saturate-150">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={
                "mx-auto flex h-12 w-full min-w-0 flex-col items-center justify-center gap-0.5 rounded-2xl transition active:scale-95 " +
                (isActive(href) ? "text-[#315F35]" : "text-[#625F56]")
              }
            >
              <span className={"flex size-6 items-center justify-center rounded-full " + (isActive(href) ? "bg-[#E7F0E2]" : "")}>
                <Icon size={16} strokeWidth={2.2} className="text-[#800020]" />
              </span>
              <span className={"text-[8px] leading-none " + (isActive(href) ? "font-extrabold" : "font-medium")}>
                {label}
              </span>
            </Link>
          ))}

          <Link
            href="/cart"
            aria-label={`Open cart, ${totalItems} items`}
            aria-current={isActive("/cart") ? "page" : undefined}
            className={
              "mx-auto flex h-12 w-full min-w-0 flex-col items-center justify-center gap-1 rounded-2xl transition-all duration-200 active:scale-95 " +
              (isActive("/cart") ? "text-[#168447]" : "text-[#625F56]")
            }
          >
            <span
              className="relative flex size-9 items-center justify-center rounded-full bg-[#315F35] text-white shadow-md shadow-[#315F35]/20"
            >
              <ShoppingCart size={20} strokeWidth={2.2} />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full border-2 border-[#FFFEFA] bg-[#E4BD59] px-1 text-[8px] font-black text-[#493B1C]">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </span>
            <span className="text-[9px] leading-none font-bold">Cart</span>
          </Link>

          <div ref={mobileLanguageRef} data-no-translate className="relative mx-auto flex h-12 w-full min-w-0 items-center justify-center">
            <button type="button" aria-label="Choose language" aria-expanded={languageOpen} aria-haspopup="menu" onClick={() => setLanguageOpen((value) => !value)} className={"flex h-12 w-full min-w-0 flex-col items-center justify-center gap-0.5 rounded-2xl transition active:scale-95 " + (languageOpen ? "text-[#315F35]" : "text-[#625F56]")}>
              <span className={"flex size-6 items-center justify-center rounded-full " + (languageOpen ? "bg-[#E7F0E2]" : "")}><Globe2 size={17} strokeWidth={2.2} className={"text-[#800020] transition-transform duration-300 " + (languageOpen ? "rotate-12 scale-110" : "")} /></span>
              <span className="text-[8px] font-bold leading-none">{language === "en" ? "English" : language === "hinglish" ? "Hinglish" : "हिन्दी"}</span>
            </button>
            {languageOpen && <LanguageMenu mobile language={language} setLanguage={setLanguage} onClose={() => setLanguageOpen(false)} />}
          </div>

          <div ref={mobileHelpRef} className="relative mx-auto flex h-12 w-full min-w-0 items-center justify-center">
            <button
              type="button"
              aria-label="Open Help Centre"
              aria-expanded={helpOpen}
              aria-haspopup="menu"
              onClick={() => setHelpOpen((value) => !value)}
              className={
                "flex h-12 w-full min-w-0 flex-col items-center justify-center gap-0.5 rounded-2xl transition active:scale-95 " +
                (helpOpen ? "text-[#315F35]" : "text-[#625F56]")
              }
            >
              <span className={"flex size-6 items-center justify-center rounded-full " + (helpOpen ? "bg-[#E7F0E2]" : "")}>
                {helpOpen ? <X size={17} strokeWidth={2.2} className="text-[#800020]" /> : <LifeBuoy size={17} strokeWidth={2.2} className="text-[#800020]" />}
              </span>
              <span className="text-[8px] font-semibold leading-none">Help</span>
            </button>
            {helpOpen && <HelpCentreMenu mobile onClose={() => setHelpOpen(false)} />}
          </div>

        </div>
      </nav>
    </>
  );
}
