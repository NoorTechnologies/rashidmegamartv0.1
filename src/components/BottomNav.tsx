"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Package, ShoppingCart, MessageCircle, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";

const WHATSAPP_NUMBER = "918962531603";
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Rashid Mega Mart! I want to know more about your grocery kits and best offers.")}`;

const navigationItems = [
  { label: "Home", href: "/", icon: House, external: false },
  { label: "Kits", href: "/kits", icon: Package, external: false },
];

const mobileNavigationItems = [
  ...navigationItems,
  { label: "Cart", href: "/cart", icon: ShoppingCart, external: false },
  { label: "Hello!", href: whatsappHref, icon: MessageCircle, external: true },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 hidden border-b border-[#F2D9D9] bg-white/90 shadow-[0_5px_26px_rgba(28,35,30,0.07)] backdrop-blur-2xl lg:block">
        <nav aria-label="Main navigation" className="mx-auto flex h-[78px] max-w-7xl items-center justify-between gap-8 px-6 xl:px-8">
          <Link href="/" aria-label="Rashid Mega Mart home" className="flex shrink-0 items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#168447]">
            <Image src="/images/logo2.png" alt="" width={48} height={48} priority className="size-11 object-contain" />
            <span className="text-base font-black tracking-tight text-[#202124]">Rashid <span className="text-[#168447]">Mega Mart</span></span>
          </Link>

          <div className="flex h-full items-center gap-2">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}
                className={`inline-flex h-11 items-center rounded-full px-6 text-sm font-extrabold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#168447] ${isActive(item.href) ? "bg-[#168447] text-white shadow-[0_5px_16px_rgba(22,132,71,0.22)]" : "text-[#3F4541] hover:bg-[#EAF6EE] hover:text-[#106B38]"}`}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#B9E8CB] bg-[#E9F9EF] px-5 text-sm font-extrabold text-[#087A3D] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#D9F5E4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16A34A]">
              <Image src="/Whatsapp-3d.svg" alt="" width={22} height={22} unoptimized className="size-5 object-contain" />
              Hello! Chat on WhatsApp
            </a>
            <Link href="/cart" aria-label={`Open cart, ${totalItems} items`}
              className="relative inline-flex min-h-11 items-center gap-2 rounded-full bg-[#168447] px-5 text-sm font-extrabold text-white shadow-[0_6px_18px_rgba(22,132,71,0.24)] transition hover:-translate-y-0.5 hover:bg-[#106B38] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#168447]">
              <ShoppingCart size={17} /> Cart
              {totalItems > 0 && <span className="flex min-w-5 items-center justify-center rounded-full bg-[#FFD84D] px-1.5 py-0.5 text-[10px] font-black text-[#282014]">{totalItems > 99 ? "99+" : totalItems}</span>}
            </Link>
          </div>
        </nav>
      </header>

      <nav aria-label="Main navigation" className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[460px] px-3 pb-[calc(10px+env(safe-area-inset-bottom))] lg:hidden">
        <div className="relative grid h-[76px] grid-cols-4 items-center rounded-[26px] border border-white/90 bg-[rgba(255,255,255,0.86)] px-1.5 shadow-[0_14px_42px_rgba(22,28,24,0.20),0_3px_10px_rgba(22,28,24,0.08),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-[30px] backdrop-saturate-[190%]">
          <span className="pointer-events-none absolute inset-x-10 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-white to-transparent" />
          {mobileNavigationItems.map((item) => {
            const Icon = item.icon;
            const active = item.external ? false : isActive(item.href);
            const content = (
              <>
                <span className={`relative flex size-9 items-center justify-center rounded-[13px] transition-all duration-200 ${item.external ? "bg-[#E7F8ED] text-[#087A3D]" : active ? "bg-[#168447] text-white shadow-[0_4px_12px_rgba(22,132,71,0.26)]" : "text-[#424A45]"}`}>
                  {item.external ? <Image src="/Whatsapp-3d.svg" alt="" width={23} height={23} unoptimized className="size-[22px] object-contain" /> : <Icon size={19} strokeWidth={active ? 2.7 : 2.2} />}
                  {item.href === "/cart" && totalItems > 0 && <span className="absolute -right-1 -top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#FFD84D] px-1 text-[8px] font-black text-[#292014] ring-2 ring-white">{totalItems > 99 ? "99+" : totalItems}</span>}
                </span>
                <span className={`text-[10px] leading-none tracking-[-0.01em] ${item.external ? "font-black text-[#087A3D]" : active ? "font-black text-[#168447]" : "font-bold text-[#59615C]"}`}>{item.external ? <span className="flex flex-col items-center gap-0.5"><b>Hello!</b><small className="text-[8px] font-extrabold">WhatsApp</small></span> : item.label}</span>
                {active && <span className="absolute bottom-[3px] h-[3px] w-5 rounded-full bg-[#168447]" />}
              </>
            );
            const className = `relative mx-auto flex h-[64px] w-full max-w-[100px] flex-col items-center justify-center gap-1 rounded-[18px] transition-all duration-200 active:scale-[0.94] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#168447] ${active ? "bg-[#EAF6EE]" : "hover:bg-black/[0.035]"}`;
            return item.external
              ? <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" aria-label="Hello! Chat on WhatsApp" className={className}>{content}</a>
              : <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={className}>{content}</Link>;
          })}
          <span className="pointer-events-none absolute -top-2 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-[#F8D77B] bg-[#FFF8DD] px-2 py-0.5 text-[8px] font-black uppercase tracking-wide text-[#875B00] shadow-sm">
            <Sparkles size={9} /> Shop offers
          </span>
        </div>
      </nav>
    </>
  );
}
