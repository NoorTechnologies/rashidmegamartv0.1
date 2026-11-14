import Link from "next/link";
import { ArrowUpRight, IndianRupee, Package, ShoppingCart, Users, Clock3 } from "lucide-react";

const stats = [
  { label: "Today's orders", value: "12", note: "Demo preview data", icon: ShoppingCart },
  { label: "Products listed", value: "48", note: "Sample count", icon: Package },
  { label: "Customers", value: "36", note: "Sample count", icon: Users },
  { label: "Today's sales", value: "₹8,450", note: "Not connected to payments", icon: IndianRupee },
];

const orders = [
  { id: "RMM-1008", customer: "Aman Khan", items: "3 items", amount: "₹540", status: "New" },
  { id: "RMM-1007", customer: "Sana Patel", items: "1 kit", amount: "₹799", status: "Preparing" },
  { id: "RMM-1006", customer: "Rahul Verma", items: "5 items", amount: "₹1,240", status: "Ready" },
];

const topProducts = [
  { name: "Premium Basmati Rice", category: "Rice & Grains", sold: "18 sold" },
  { name: "Whole Wheat Atta", category: "Atta & Flour", sold: "14 sold" },
  { name: "Basic Kitchen Kit", category: "Grocery Kit", sold: "9 sold" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A47A2C]">Overview</p><h1 className="mt-1 text-2xl font-black tracking-tight text-[#800020] sm:text-3xl">Dashboard</h1><p className="mt-1 text-sm text-[#766D72]">A quick look at your store activity.</p></div>
        <Link href="/" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#EAD9DD] bg-white px-4 text-xs font-bold text-[#800020] hover:bg-[#FFF1F3]">View storefront <ArrowUpRight size={15} /></Link>
      </section>
      <div className="rounded-2xl border border-[#F0DCA9] bg-[#FFF8E9] px-4 py-3 text-xs leading-5 text-[#705626]"><strong>Preview mode:</strong> These figures are sample data for frontend development. Live orders, sales and customer counts will appear after the owner’s database is connected.</div>
      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {stats.map(({ label, value, note, icon: Icon }) => <article key={label} className="rounded-2xl border border-[#F0E4E5] bg-white p-4 shadow-[0_5px_20px_rgba(80,20,35,0.035)] sm:p-5"><div className="flex items-center justify-between gap-2"><span className="text-[11px] font-semibold text-[#766D72] sm:text-xs">{label}</span><span className="flex size-9 items-center justify-center rounded-xl bg-[#FFF1F3] text-[#800020]"><Icon size={17} /></span></div><p className="mt-3 text-2xl font-black tabular-nums text-[#24151A] sm:text-3xl">{value}</p><p className="mt-1 text-[10px] text-[#9A858B]">{note}</p></article>)}
      </section>
      <section className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <article className="overflow-hidden rounded-2xl border border-[#F0E4E5] bg-white">
          <div className="flex items-center justify-between border-b border-[#F5ECEE] px-4 py-4 sm:px-5"><div><h2 className="font-extrabold text-[#800020]">Recent orders</h2><p className="mt-1 text-[11px] text-[#9A858B]">Sample orders for layout preview</p></div><Link href="/admin/orders" className="text-xs font-bold text-[#800020]">View all</Link></div>
          <div className="divide-y divide-[#F5ECEE]">{orders.map((order) => <div key={order.id} className="grid grid-cols-[1fr_auto] gap-2 px-4 py-4 sm:grid-cols-[1fr_90px_90px_100px] sm:items-center sm:px-5"><div><p className="text-xs font-extrabold text-[#33232A]">{order.id}</p><p className="mt-1 text-[11px] text-[#766D72]">{order.customer} · {order.items}</p></div><span className="hidden text-xs font-semibold text-[#33232A] sm:block">{order.amount}</span><span className="hidden text-[11px] text-[#766D72] sm:block">Today</span><span className="justify-self-end rounded-full bg-[#FFF1F3] px-2.5 py-1 text-[10px] font-bold text-[#800020]">{order.status}</span></div>)}</div>
        </article>
        <article className="rounded-2xl border border-[#F0E4E5] bg-white p-4 sm:p-5"><div className="flex items-center gap-2"><Clock3 size={17} className="text-[#A47A2C]" /><h2 className="font-extrabold text-[#800020]">Popular items</h2></div><div className="mt-4 space-y-4">{topProducts.map((product, index) => <div key={product.name} className="flex items-center gap-3"><span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#FFF7E8] text-xs font-black text-[#A47A2C]">{index + 1}</span><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-[#33232A]">{product.name}</p><p className="mt-1 text-[10px] text-[#9A858B]">{product.category}</p></div><span className="shrink-0 text-[10px] font-bold text-[#800020]">{product.sold}</span></div>)}</div></article>
      </section>
    </div>
  );
}