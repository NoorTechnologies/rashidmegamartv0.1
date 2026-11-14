import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, Package, Layers3, ShoppingCart, Store } from "lucide-react";
import type { ReactNode } from "react";

const navigation = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/kits", label: "Grocery Kits", icon: Layers3 },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#24151A] md:grid md:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="hidden border-r border-[#F0E4E5] bg-white md:flex md:flex-col">
        <Link href="/" className="flex items-center gap-3 border-b border-[#F0E4E5] px-5 py-5">
          <Image src="/images/logo2.png" alt="Rashid Mega Mart" width={42} height={42} className="size-10 object-contain" />
          <span className="text-sm font-black leading-tight text-[#800020]">Rashid Mega Mart<span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A47A2C]">Store Admin</span></span>
        </Link>
        <nav className="flex-1 space-y-1 px-3 py-5">
          {navigation.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#66565B] transition hover:bg-[#FFF1F3] hover:text-[#800020]">
              <Icon size={18} />{label}
            </Link>
          ))}
        </nav>
        <div className="m-3 rounded-2xl bg-[#FFF7E8] p-4">
          <p className="text-xs font-bold text-[#800020]">Storefront</p>
          <p className="mt-1 text-xs leading-5 text-[#77656A]">Open the customer-facing website.</p>
          <Link href="/" className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-[#800020]"><Store size={14} /> View website</Link>
        </div>
      </aside>
      <div className="min-w-0">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#F0E4E5] bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex items-center gap-2 md:hidden">
            <Image src="/images/logo2.png" alt="" width={34} height={34} className="size-8 object-contain" />
            <span className="text-sm font-black text-[#800020]">Rashid Mega Mart</span>
          </div>
          <p className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-[#A47A2C] md:block">Store management</p>
          <span className="rounded-full border border-[#F0E4E5] bg-[#FFF9FA] px-3 py-1.5 text-[11px] font-bold text-[#800020]">Frontend preview</span>
        </header>
        <main className="mx-auto w-full max-w-[1440px] px-4 py-5 pb-24 sm:px-6 sm:py-7 md:pb-8">{children}</main>
        <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-[#F0E4E5] bg-white/95 px-1 py-2 backdrop-blur md:hidden">
          {navigation.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="flex flex-col items-center gap-1 rounded-lg py-1 text-[10px] font-semibold text-[#766D72]">
              <Icon size={18} />{label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}