"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertCircle, LoaderCircle, PackageCheck, RefreshCw, ShoppingBag } from "lucide-react";

type OrderItem = {
  id: string; item_name: string; item_type: "product" | "kit"; brand: string;
  pack_size: string; unit_price: number; quantity: number; line_total: number;
};
type Order = {
  id: string; order_number: string; customer_name: string; customer_phone: string;
  delivery_address: string; customer_note: string; payment_preference: "COD" | "UPI";
  subtotal: number; total_amount: number; status: string; created_at: string; order_items: OrderItem[];
};
const statuses = [
  ["new", "New"], ["confirmed", "Confirmed"], ["preparing", "Preparing"],
  ["out_for_delivery", "Out for delivery"], ["delivered", "Delivered"], ["cancelled", "Cancelled"],
] as const;
const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(value) || 0);

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);
  const loadOrders = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/admin/orders", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to load orders.");
      setOrders(Array.isArray(result.orders) ? result.orders : []);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to load orders.");
    } finally { setLoading(false); }
  }, []);
  useEffect(() => { void Promise.resolve().then(loadOrders); }, [loadOrders]);

  const counts = useMemo(() => ({
    all: orders.length,
    new: orders.filter((order) => order.status === "new").length,
    preparing: orders.filter((order) => ["confirmed", "preparing"].includes(order.status)).length,
    delivered: orders.filter((order) => order.status === "delivered").length,
  }), [orders]);

  async function updateStatus(id: string, status: string) {
    setUpdating(id); setError("");
    try {
      const response = await fetch("/api/admin/orders", {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to update order.");
      await loadOrders();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to update order.");
    } finally { setUpdating(null); }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A47A2C]">Store operations</p>
          <h1 className="mt-1 text-2xl font-black text-[#800020] sm:text-3xl">Orders</h1>
          <p className="mt-1 text-sm text-[#766D72]">Customer orders saved from checkout.</p>
        </div>
        <button onClick={() => void loadOrders()} disabled={loading} className="inline-flex items-center gap-2 rounded-xl border border-[#EADBDD] bg-white px-4 py-2.5 text-sm font-bold text-[#800020] disabled:opacity-60">
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["All orders", counts.all], ["New", counts.new], ["In progress", counts.preparing], ["Delivered", counts.delivered],
        ].map(([label, count]) => (
          <div key={label} className="rounded-2xl border border-[#F0E4E5] bg-white p-4">
            <p className="text-[10px] font-semibold text-[#766D72]">{label}</p>
            <p className="mt-2 text-2xl font-black text-[#800020]">{count}</p>
          </div>
        ))}
      </div>

      {error && <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"><AlertCircle size={17} className="mt-0.5 shrink-0" />{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#F0E4E5] bg-white py-16 text-sm text-[#766D72]"><LoaderCircle size={18} className="animate-spin" /> Loading orders…</div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-[#F0E4E5] bg-white px-4 py-14 text-center">
          <ShoppingBag size={30} className="text-[#A47A2C]" />
          <p className="text-sm font-bold text-[#33232A]">No orders yet</p>
          <p className="max-w-sm text-xs leading-5 text-[#9A858B]">New customer checkouts will appear here after the first order is placed.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <article key={order.id} className="overflow-hidden rounded-2xl border border-[#F0E4E5] bg-white">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#F5ECEE] p-4">
                <div>
                  <p className="text-sm font-black text-[#800020]">{order.order_number}</p>
                  <p className="mt-1 text-xs text-[#766D72]">{new Date(order.created_at).toLocaleString("en-IN")}</p>
                  <p className="mt-2 text-sm font-bold text-[#33232A]">{order.customer_name} · {order.customer_phone}</p>
                  <p className="mt-1 max-w-2xl text-xs leading-5 text-[#766D72]">{order.delivery_address}</p>
                </div>
                <div className="min-w-40">
                  <p className="text-lg font-black text-[#800020]">{money(order.total_amount)}</p>
                  <p className="text-[11px] text-[#766D72]">{order.payment_preference} · {order.order_items?.length || 0} lines</p>
                  <label className="mt-2 block text-[10px] font-bold uppercase tracking-wide text-[#766D72]" htmlFor={"status-" + order.id}>Order status</label>
                  <select id={"status-" + order.id} value={order.status} disabled={updating === order.id} onChange={(event) => void updateStatus(order.id, event.target.value)} className="mt-1 w-full rounded-lg border border-[#EADBDD] bg-[#FFFCFC] px-2 py-2 text-xs font-semibold text-[#33232A]">
                    {statuses.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-2 p-4">
                {(order.order_items || []).map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                    <div><p className="font-semibold text-[#33232A]">{item.item_name}</p><p className="text-[#8B7C80]">{item.brand} {item.pack_size} · Qty {item.quantity}</p></div>
                    <p className="shrink-0 font-bold text-[#33232A]">{money(item.line_total)}</p>
                  </div>
                ))}
                {order.customer_note && <p className="rounded-lg bg-[#FAF6F4] p-2 text-xs text-[#766D72]">Note: {order.customer_note}</p>}
                <a href={"https://wa.me/91" + order.customer_phone} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 pt-1 text-xs font-bold text-[#12834B]"><PackageCheck size={14} /> Contact customer</a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
