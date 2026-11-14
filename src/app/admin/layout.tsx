"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers3,
  ShoppingCart,
  Store,
  ChevronRight,
  LogOut,
} from "lucide-react";
import type { ReactNode } from "react";

const navigation = [
  { href: "/admin", label: "Dashboard", shortLabel: "Home", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", shortLabel: "Products", icon: Package },
  { href: "/admin/kits", label: "Grocery Kits", shortLabel: "Kits", icon: Layers3 },
  { href: "/admin/orders", label: "Orders", shortLabel: "Orders", icon: ShoppingCart },
];

function getPageTitle(pathname: string) {
  if (pathname.startsWith("/admin/products")) return "Products";
  if (pathname.startsWith("/admin/kits")) return "Grocery Kits";
  if (pathname.startsWith("/admin/orders")) return "Orders";
  return "Dashboard";
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const pageTitle = getPageTitle(pathname);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  async function handleLogout() {
    try {
      await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
    } finally {
      router.replace("/admin/login");
    }
  }

  return (
    <div className="min-h-dvh bg-[#F7F7F5] text-[#252326] lg:grid lg:grid-cols-[252px_minmax(0,1fr)]">
      <aside className="sticky top-0 hidden h-dvh flex-col border-r border-[#EAE8E5] bg-white lg:flex">
        <Link href="/admin" className="flex h-[82px] shrink-0 items-center gap-3 border-b border-[#F0EEEB] px-6">
          <Image src="/images/logo2.png" alt="Rashid Mega Mart" width={44} height={44} priority className="size-11 object-contain" />
          <span className="min-w-0 text-[14px] font-extrabold leading-tight text-[#741D36]">
            Rashid Mega Mart
            <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#9B8B80]">Store Admin</span>
          </span>
        </Link>

        <div className="px-5 pb-2 pt-7 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#A69B94]">Workspace</div>
        <nav aria-label="Admin navigation" className="space-y-1 px-3">
          {navigation.map(({ href, label, icon: Icon }) => {
            const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`group flex min-h-12 items-center gap-3 rounded-xl px-3.5 text-[13px] font-bold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A83250] ${
                  active
                    ? "bg-[#F8E9ED] text-[#8B2442] shadow-[inset_3px_0_0_#A83250]"
                    : "text-[#716A67] hover:bg-[#F8F6F3] hover:text-[#7C203C]"
                }`}
              >
                <Icon size={19} strokeWidth={active ? 2.4 : 1.9} />
                <span className="flex-1">{label}</span>
                {active && <ChevronRight size={15} className="text-[#A83250]" />}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-4">
          <div className="rounded-2xl border border-[#F0E5D2] bg-[#FFFAF0] p-4">
            <p className="text-xs font-extrabold text-[#6F263B]">Your storefront</p>
            <p className="mt-1 text-[11px] leading-5 text-[#81766C]">Visit the live customer website.</p>
            <Link href="/" className="mt-3 inline-flex min-h-9 w-full items-center justify-center gap-2 rounded-lg bg-white px-3 text-xs font-extrabold text-[#842541] shadow-sm ring-1 ring-[#EDE1D4] transition hover:bg-[#FFF1F3]">
              <Store size={15} /> Open website
            </Link>
          </div>
          <p className="mt-4 px-1 text-[10px] text-[#A69B94]">Rashid Mega Mart · Admin preview</p>
        </div>
      </aside>

      <div className="flex min-h-dvh min-w-0 flex-col">
        <header className="sticky top-0 z-30 border-b border-[#EAE8E5] bg-white/95 shadow-[0_2px_12px_rgba(40,30,25,0.035)] backdrop-blur-xl">
          <div className="mx-auto flex min-h-[66px] w-full max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:min-h-[76px] lg:px-9">
            <div className="flex min-w-0 items-center gap-3 lg:gap-0">
              <Link href="/admin" className="flex shrink-0 items-center gap-2.5 lg:hidden">
                <Image src="/images/logo2.png" alt="" width={36} height={36} priority className="size-9 object-contain" />
              </Link>
              <div className="min-w-0">
                <p className="truncate text-[10px] font-bold uppercase tracking-[0.15em] text-[#A18E83] lg:text-[11px]">Store management</p>
                <h1 className="truncate text-[16px] font-extrabold leading-tight text-[#3B2930] sm:text-lg">{pageTitle}</h1>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <button type="button" onClick={handleLogout} className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-[#F0E4E5] px-3 text-[10px] font-extrabold text-[#8A2441] transition hover:bg-[#FFF1F3] sm:text-xs">
                <LogOut size={14} /> Logout
              </button>
              <span className="hidden items-center gap-1.5 rounded-full border border-[#F0DDAF] bg-[#FFFAEC] px-3 py-1.5 text-[10px] font-extrabold text-[#86652B] sm:inline-flex">
                <span className="size-1.5 rounded-full bg-[#D3A64D]" /> Preview mode
              </span>
              <Link href="/" className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-[#8A2441] px-3 text-[11px] font-extrabold text-white shadow-sm transition hover:bg-[#701B34] sm:px-4 sm:text-xs lg:hidden">
                <Store size={14} /> Store
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1440px] flex-1 px-3 pb-[calc(96px+env(safe-area-inset-bottom))] pt-5 sm:px-6 sm:pt-7 lg:px-9 lg:pb-10 lg:pt-8">
          {children}
        </main>

        <nav aria-label="Admin navigation" className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E9E5E1] bg-white/95 px-2 pb-[calc(8px+env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_28px_rgba(40,30,25,0.07)] backdrop-blur-xl lg:hidden">
          <div className="mx-auto grid max-w-xl grid-cols-4 gap-1">
            {navigation.map(({ href, shortLabel, icon: Icon }) => {
              const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-xl px-1 text-[10px] font-extrabold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#A83250] ${
                    active ? "bg-[#F8E9ED] text-[#8B2442]" : "text-[#817773] hover:bg-[#F8F6F3]"
                  }`}
                >
                  <Icon size={20} strokeWidth={active ? 2.4 : 1.9} />
                  <span>{shortLabel}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
