"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FileText,
  Globe2,
  House,
  LifeBuoy,
  Package,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useSiteLanguage, useToggleSiteLanguage } from "@/components/LanguageProvider";

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
    ? "bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2"
    : "right-0 top-[calc(100%+10px)]";

  return (
    <div
      role="menu"
      aria-label="Help Centre"
      className={`absolute z-[70] w-[min(270px,calc(100vw-24px))] rounded-2xl border border-white/80 bg-[#FFFEFA]/96 p-2 shadow-[0_18px_55px_rgba(39,31,22,0.18)] backdrop-blur-2xl ${placement}`}
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

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const language = useSiteLanguage();
  const toggleLanguage = useToggleSiteLanguage();
  const [helpOpen, setHelpOpen] = useState(false);
  const desktopHelpRef = useRef<HTMLDivElement>(null);
  const mobileHelpRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const languageLabel =
    language === "en" ? "English" : language === "hinglish" ? "Hinglish" : "Hindi";

  useEffect(() => {
    if (!helpOpen) return;

    const close = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !desktopHelpRef.current?.contains(target) &&
        !mobileHelpRef.current?.contains(target)
      ) {
        setHelpOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setHelpOpen(false);
    };

    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [helpOpen]);

  return (
    <>
      {/* Desktop navigation */}
      <header className="pointer-events-none fixed inset-x-0 top-3 z-50 hidden px-4 lg:block">
        <nav
          aria-label="Main navigation"
          className="pointer-events-auto mx-auto flex h-[62px] max-w-6xl items-center justify-between gap-2 rounded-full border border-white/80 bg-[#FFFEFA]/90 px-4 shadow-[0_12px_34px_rgba(32,20,18,0.12)] backdrop-blur-2xl backdrop-saturate-150 xl:px-6"
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
                <Icon size={15} />
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
                <LifeBuoy size={16} />
                Help Centre
              </button>
              {helpOpen && <HelpCentreMenu onClose={() => setHelpOpen(false)} />}
            </div>

            <button
              type="button"
              data-no-translate
              onClick={toggleLanguage}
              aria-label={`Current language: ${languageLabel}. Switch language`}
              title={`Language: ${languageLabel}`}
              className="inline-flex size-9 items-center justify-center rounded-full text-[#625F56] transition-colors hover:bg-white/70"
            >
              <Globe2 size={17} />
            </button>

            <Link
              href="/profile"
              aria-label="Open account"
              className={
                "inline-flex min-h-9 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-bold " +
                (isActive("/profile")
                  ? "bg-[#EAF3E6] text-[#315F35]"
                  : "text-[#625F56] hover:bg-white/70")
              }
            >
              <UserRound size={16} />
              Account
            </Link>

            <Link
              href="/cart"
              aria-label={`Open cart, ${totalItems} items`}
              className="relative inline-flex min-h-9 items-center gap-1.5 rounded-full bg-[#315F35] px-3 text-[12px] font-extrabold text-white shadow-sm transition hover:bg-[#254B29]"
            >
              <ShoppingCart size={16} />
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

      {/* Mobile language switch: icon only, kept at the top */}
      <button
        type="button"
        data-no-translate
        onClick={toggleLanguage}
        aria-label={`Current language: ${languageLabel}. Switch language`}
        title={`Language: ${languageLabel}`}
        className="fixed right-3 top-[calc(env(safe-area-inset-top)+10px)] z-[65] flex size-9 items-center justify-center rounded-full border border-white/80 bg-[#FFFEFA]/95 text-[#315F35] shadow-[0_4px_14px_rgba(39,31,22,0.12)] backdrop-blur-xl transition active:scale-95 lg:hidden"
      >
        <Globe2 size={17} />
      </button>

      {/* Mobile navigation */}
      <nav
        aria-label="Main navigation"
        className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[560px] px-2 pb-[calc(6px+env(safe-area-inset-bottom))] lg:hidden"
      >
        <div className="relative grid h-[58px] grid-cols-5 items-center rounded-full border border-white/90 bg-[#FFFEFA]/90 px-1 shadow-[0_10px_36px_rgba(40,36,28,0.13),inset_0_1px_0_rgba(255,255,255,0.98)] backdrop-blur-2xl backdrop-saturate-150">
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
                <Icon size={16} />
              </span>
              <span className={"text-[8px] leading-none " + (isActive(href) ? "font-extrabold" : "font-medium")}>
                {label}
              </span>
            </Link>
          ))}

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
                {helpOpen ? <X size={17} /> : <LifeBuoy size={17} />}
              </span>
              <span className="text-[8px] font-semibold leading-none">Help</span>
            </button>
            {helpOpen && <HelpCentreMenu mobile onClose={() => setHelpOpen(false)} />}
          </div>

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
              className={
                "relative flex size-8 items-center justify-center rounded-full transition-all duration-200 " +
                (isActive("/cart") ? "bg-[#E7F0E2] shadow-inner" : "bg-transparent")
              }
            >
              <ShoppingCart size={19} strokeWidth={isActive("/cart") ? 2.5 : 2} />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full border-2 border-[#FFFEFA] bg-[#E4BD59] px-1 text-[8px] font-black text-[#493B1C]">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </span>
            <span className="text-[9px] leading-none font-bold">Cart</span>
          </Link>

          <Link
            href="/profile"
            aria-label="Open account"
            aria-current={isActive("/profile") ? "page" : undefined}
            className={
              "mx-auto flex h-12 w-full min-w-0 flex-col items-center justify-center gap-0.5 rounded-2xl transition active:scale-95 " +
              (isActive("/profile") ? "text-[#315F35]" : "text-[#625F56]")
            }
          >
            <span className={"flex size-6 items-center justify-center rounded-full " + (isActive("/profile") ? "bg-[#E7F0E2]" : "")}>
              <UserRound size={16} />
            </span>
            <span className="text-[8px] leading-none">Account</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
