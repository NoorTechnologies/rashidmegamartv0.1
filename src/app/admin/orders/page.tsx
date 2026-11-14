import { Clock3, ShoppingBag } from "lucide-react";

const demoOrders = [
  { id: "RMM-1008", name: "Aman Khan", phone: "Not connected", items: "3 products", total: 540, status: "New" },
  { id: "RMM-1007", name: "Sana Patel", phone: "Not connected", items: "Breakfast Special Kit", total: 799, status: "Preparing" },
  { id: "RMM-1006", name: "Rahul Verma", phone: "Not connected", items: "5 products", total: 1240, status: "Ready" },
  { id: "RMM-1005", name: "Demo Customer", phone: "Not connected", items: "2 products", total: 325, status: "Delivered" },
];

export default function AdminOrdersPage() {
  return (
    <div className="space-y-5">
      <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A47A2C]">Store operations</p><h1 className="mt-1 text-2xl font-black text-[#800020] sm:text-3xl">Orders</h1><p className="mt-1 text-sm text-[#766D72]">Order-management screen preview.</p></div>
      <div className="rounded-2xl border border-[#F0DCA9] bg-[#FFF8E9] px-4 py-3 text-xs leading-5 text-[#705626]"><strong>Demo data only:</strong> WhatsApp checkout does not currently save orders to a database. Real orders will appear here after backend integration.</div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{[["All orders","4"],["New","1"],["Preparing","1"],["Delivered","1"]].map(([label,value]) => <div key={label} className="rounded-2xl border border-[#F0E4E5] bg-white p-4"><p className="text-[10px] font-semibold text-[#766D72]">{label}</p><p className="mt-2 text-2xl font-black text-[#800020]">{value}</p></div>)}</div>
      <div className="overflow-hidden rounded-2xl border border-[#F0E4E5] bg-white"><div className="border-b border-[#F5ECEE] px-4 py-4"><h2 className="text-sm font-extrabold text-[#33232A]">Recent orders</h2></div><div className="divide-y divide-[#F5ECEE]">{demoOrders.map((order) => <article key={order.id} className="grid gap-3 px-4 py-4 sm:grid-cols-[1fr_1fr_auto] sm:items-center"><div className="flex items-start gap-3"><span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#FFF1F3] text-[#800020]"><ShoppingBag size={16} /></span><div><p className="text-xs font-extrabold text-[#33232A]">{order.id}</p><p className="mt-1 text-[11px] text-[#766D72]">{order.name} · {order.phone}</p><p className="mt-1 text-[10px] text-[#9A858B]">{order.items}</p></div></div><div className="sm:text-right"><p className="text-sm font-black text-[#33232A]">₹{order.total.toLocaleString("en-IN")}</p><p className="mt-1 flex items-center gap-1 text-[10px] text-[#9A858B] sm:justify-end"><Clock3 size={11} /> Demo order</p></div><span className="w-fit rounded-full bg-[#FFF1F3] px-3 py-1.5 text-[10px] font-bold text-[#800020]">{order.status}</span></article>)}</div></div>
      <p className="text-[11px] leading-5 text-[#9A858B]">Order status controls and WhatsApp notifications will be enabled when real order records and admin permissions are connected.</p>
    </div>
  );
}