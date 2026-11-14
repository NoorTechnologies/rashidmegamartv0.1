import { Clock3, ShoppingBag } from "lucide-react";

export default function AdminOrdersPage() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A47A2C]">Store operations</p>
        <h1 className="mt-1 text-2xl font-black text-[#800020] sm:text-3xl">Orders</h1>
        <p className="mt-1 text-sm text-[#766D72]">View and manage customer orders.</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {["All orders", "New", "Preparing", "Delivered"].map((label) => (
          <div key={label} className="rounded-2xl border border-[#F0E4E5] bg-white p-4">
            <p className="text-[10px] font-semibold text-[#766D72]">{label}</p>
            <p className="mt-2 text-2xl font-black text-[#800020]">0</p>
          </div>
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl border border-[#F0E4E5] bg-white">
        <div className="border-b border-[#F5ECEE] px-4 py-4"><h2 className="text-sm font-extrabold text-[#33232A]">Recent orders</h2></div>
        <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
          <ShoppingBag size={28} className="text-[#A47A2C]" />
          <p className="text-sm font-bold text-[#33232A]">No orders yet</p>
          <p className="max-w-sm text-xs leading-5 text-[#9A858B]">Customer orders will appear here after checkout is connected to the database.</p>
          <span className="mt-2 inline-flex items-center gap-1 text-[10px] text-[#9A858B]"><Clock3 size={12} /> Waiting for real orders</span>
        </div>
      </div>
    </div>
  );
}
