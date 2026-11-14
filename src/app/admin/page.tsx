import Link from "next/link";
import { ArrowRight, Boxes, Layers3, Package, ShoppingCart, TrendingUp } from "lucide-react";

const metrics = [
  { label: "Orders", icon: ShoppingCart, href: "/admin/orders" },
  { label: "Products", icon: Package, href: "/admin/products" },
  { label: "Grocery kits", icon: Layers3, href: "/admin/kits" },
  { label: "Stock records", icon: Boxes, href: "/admin/products" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-5 sm:space-y-6">
      <section>
        <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#A47A2C]">Owner workspace</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight text-[#741D36] sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-[#81747A]">Yahan se apni dukaan ka kaam manage karein.</p>
      </section>

      <div className="flex items-start gap-3 rounded-2xl border border-[#F0DCA9] bg-[#FFF8E9] p-3.5 text-xs leading-5 text-[#705626] sm:p-4">
        <TrendingUp size={17} className="mt-0.5 shrink-0" />
        <p><strong>Live data abhi connected nahi hai.</strong> Isliye sales, orders aur stock ke fake numbers hata diye gaye hain. Database connect hone par yahan real figures dikhenge.</p>
      </div>

      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {metrics.map(({ label, icon: Icon, href }) => (
          <Link key={label} href={href} className="rounded-2xl border border-[#EFE5E7] bg-white p-4 shadow-[0_5px_20px_rgba(80,20,35,0.035)] transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#FCE8ED] text-[#922443]"><Icon size={17} /></span>
            <p className="mt-3 text-sm font-bold text-[#33232A]">{label}</p>
            <p className="mt-1 text-2xl font-black tabular-nums text-[#800020]">0</p>
            <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-[#8A2441]">Open section <ArrowRight size={12} /></span>
          </Link>
        ))}
      </section>

      <div className="rounded-2xl border border-[#F0E4E5] bg-white p-5 sm:p-6">
        <h2 className="text-sm font-extrabold text-[#33232A]">Next setup required</h2>
        <p className="mt-2 max-w-2xl text-xs leading-6 text-[#766D72]">Products, grocery kits, orders, stock and sales are currently empty. Connect the database and real checkout flow before using this dashboard for daily shop operations.</p>
      </div>
    </div>
  );
}
