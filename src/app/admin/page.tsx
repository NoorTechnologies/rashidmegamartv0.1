"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  CircleHelp,
  ClipboardList,
  Layers3,
  Package,
  Plus,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const salesData = [
  { day: "Mon", sales: 3200, orders: 8 },
  { day: "Tue", sales: 4100, orders: 11 },
  { day: "Wed", sales: 3600, orders: 9 },
  { day: "Thu", sales: 5200, orders: 14 },
  { day: "Fri", sales: 4700, orders: 12 },
  { day: "Sat", sales: 6800, orders: 18 },
  { day: "Sun", sales: 5450, orders: 15 },
];

const orderMix = [
  { name: "New", value: 8, color: "#A83250" },
  { name: "Preparing", value: 5, color: "#D4A84F" },
  { name: "Ready", value: 4, color: "#138047" },
  { name: "Delivered", value: 12, color: "#8B9AAB" },
];

const recentOrders = [
  { id: "RMM-1008", customer: "Aman Khan", items: "3 products", amount: 540, status: "New", tone: "bg-[#FCE8ED] text-[#922443]" },
  { id: "RMM-1007", customer: "Sana Patel", items: "1 grocery kit", amount: 799, status: "Preparing", tone: "bg-[#FFF5DE] text-[#8B651E]" },
  { id: "RMM-1006", customer: "Rahul Verma", items: "5 products", amount: 1240, status: "Ready", tone: "bg-[#E7F5EC] text-[#176A3B]" },
];

const lowStock = [
  { name: "Premium Basmati Rice", stock: "3 packs left" },
  { name: "Whole Wheat Atta", stock: "4 packs left" },
  { name: "Premium Tea", stock: "2 packs left" },
];

const formatRupees = (value: number) => `₹${value.toLocaleString("en-IN")}`;

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div>
      <p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#A47A2C]">{eyebrow}</p>
      <h2 className="mt-1 text-base font-black tracking-tight text-[#462332] sm:text-lg">{title}</h2>
      <p className="mt-1 text-xs leading-5 text-[#81747A]">{description}</p>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-5 sm:space-y-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#A47A2C]">Owner workspace</p>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-[#741D36] sm:text-3xl">Good morning, Owner 👋</h1>
          <p className="mt-1 text-sm text-[#81747A]">Yahan se apni dukaan ka poora kaam manage karein.</p>
        </div>
        <Link href="/admin/orders" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#8A2441] px-4 text-xs font-extrabold text-white shadow-sm transition hover:bg-[#701B34]">
          <ClipboardList size={15} /> Orders dekhein <ArrowUpRight size={14} />
        </Link>
      </section>

      <div className="flex items-start gap-3 rounded-2xl border border-[#F0DCA9] bg-[#FFF8E9] p-3.5 text-xs leading-5 text-[#705626] sm:p-4">
        <CircleHelp size={17} className="mt-0.5 shrink-0" />
        <p><strong>Demo preview:</strong> Dashboard ke numbers aur charts sample hain. Abhi real customer orders, sales ya stock database se connect nahi hain.</p>
      </div>

      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {[
          { label: "Aaj ke orders", value: "12", note: "Aaj aaye sample orders", icon: ShoppingCart, tint: "bg-[#FCE8ED] text-[#922443]" },
          { label: "Total products", value: "48", note: "Catalogue sample count", icon: Package, tint: "bg-[#F0EBFF] text-[#6650A4]" },
          { label: "Grocery kits", value: "15", note: "Ready-made kits", icon: Layers3, tint: "bg-[#FFF4DC] text-[#926B20]" },
          { label: "Aaj ki sale", value: "₹8,450", note: "Payment se connected nahi", icon: TrendingUp, tint: "bg-[#E7F5EC] text-[#176A3B]" },
        ].map(({ label, value, note, icon: Icon, tint }) => (
          <article key={label} className="rounded-2xl border border-[#EFE5E7] bg-white p-4 shadow-[0_5px_20px_rgba(80,20,35,0.035)] sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-[#81747A] sm:text-xs">{label}</span>
              <span className={`flex size-9 items-center justify-center rounded-xl ${tint}`}><Icon size={17} /></span>
            </div>
            <p className="mt-3 text-2xl font-black tabular-nums text-[#33232A] sm:text-3xl">{value}</p>
            <p className="mt-1 text-[10px] leading-4 text-[#A09297]">{note}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,1fr)]">
        <article className="min-w-0 rounded-2xl border border-[#EFE5E7] bg-white p-4 shadow-[0_5px_20px_rgba(80,20,35,0.025)] sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <SectionHeading eyebrow="Sales overview · 7 days" title="Sale ka haal" description="Pichhle 7 din ki sample sales activity." />
            <span className="rounded-full bg-[#FCE8ED] px-2.5 py-1 text-[10px] font-extrabold text-[#922443]">Demo chart</span>
          </div>
          <div className="mt-4 h-[230px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <defs><linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#A83250" stopOpacity={0.22} /><stop offset="95%" stopColor="#A83250" stopOpacity={0.01} /></linearGradient></defs>
                <CartesianGrid stroke="#F1E9EA" strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#998B90", fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#998B90", fontSize: 10 }} tickFormatter={(value) => `₹${value / 1000}k`} />
                <Tooltip formatter={(value) => [formatRupees(Number(value)), "Sample sale"]} contentStyle={{ borderRadius: 12, border: "1px solid #F0E4E5", fontSize: 12 }} />
                <Area type="monotone" dataKey="sales" stroke="#A83250" strokeWidth={2.5} fill="url(#salesFill)" activeDot={{ r: 5, strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-2xl border border-[#EFE5E7] bg-white p-4 shadow-[0_5px_20px_rgba(80,20,35,0.025)] sm:p-5">
          <SectionHeading eyebrow="Order status" title="Orders kis stage par hain?" description="Sample orders ka status breakdown." />
          <div className="relative mt-2 h-[190px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={orderMix} dataKey="value" nameKey="name" innerRadius={55} outerRadius={78} paddingAngle={4} stroke="none">
                  {orderMix.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #F0E4E5", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-[#462332]">29</span>
              <span className="text-[10px] text-[#998B90]">Demo orders</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-2">
            {orderMix.map((item) => <div key={item.name} className="flex items-center gap-2 text-[11px] text-[#71666B]"><span className="size-2 rounded-full" style={{ backgroundColor: item.color }} />{item.name}<strong className="ml-auto text-[#462332]">{item.value}</strong></div>)}
          </div>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]">
        <article className="overflow-hidden rounded-2xl border border-[#EFE5E7] bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-[#F4ECEE] px-4 py-4 sm:px-5">
            <SectionHeading eyebrow="Latest activity" title="Naye orders" description="Aaye hue orders ko yahan dekhein." />
            <Link href="/admin/orders" className="inline-flex shrink-0 items-center gap-1 text-[11px] font-extrabold text-[#8A2441]">Sab dekhein <ArrowRight size={13} /></Link>
          </div>
          <div className="divide-y divide-[#F5ECEE]">
            {recentOrders.map((order) => <div key={order.id} className="grid grid-cols-[1fr_auto] items-center gap-2 px-4 py-3.5 sm:grid-cols-[1fr_100px_105px] sm:px-5">
              <div className="min-w-0"><p className="text-xs font-extrabold text-[#33232A]">{order.id} · {order.customer}</p><p className="mt-1 truncate text-[10px] text-[#998B90]">{order.items}</p></div>
              <strong className="text-xs text-[#33232A]">₹{order.amount.toLocaleString("en-IN")}</strong>
              <span className={`col-start-2 row-start-2 w-fit rounded-full px-2.5 py-1 text-[10px] font-extrabold sm:col-auto sm:row-auto ${order.tone}`}>{order.status}</span>
            </div>)}
          </div>
        </article>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <article className="rounded-2xl border border-[#EFE5E7] bg-white p-4 sm:p-5">
            <SectionHeading eyebrow="Stock reminder" title="Stock kam hai" description="In products ka stock check karein." />
            <div className="mt-4 space-y-3">
              {lowStock.map((item) => <div key={item.name} className="flex items-center gap-3"><span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#FFF4DC] text-[#926B20]"><Boxes size={15} /></span><div className="min-w-0 flex-1"><p className="truncate text-[11px] font-bold text-[#4A3940]">{item.name}</p><p className="mt-0.5 text-[10px] text-[#A09297]">{item.stock}</p></div></div>)}
            </div>
            <p className="mt-3 text-[10px] text-[#A09297]">Sample reminder · Live stock abhi connected nahi.</p>
          </article>

          <article className="rounded-2xl border border-[#EFE5E7] bg-white p-4 sm:p-5">
            <SectionHeading eyebrow="Quick actions" title="Kaam shuru karein" description="Roz ke common kaam ek click mein." />
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link href="/admin/products" className="flex min-h-[76px] flex-col justify-between rounded-xl border border-[#F0E4E5] bg-[#FFFAFB] p-3 transition hover:border-[#D9A8B6] hover:bg-[#FCEEF1]"><Plus size={17} className="text-[#A83250]" /><span className="text-[11px] font-extrabold text-[#5C293A]">Product add karein</span></Link>
              <Link href="/admin/kits" className="flex min-h-[76px] flex-col justify-between rounded-xl border border-[#F0E4E5] bg-[#FFFAFB] p-3 transition hover:border-[#D9A8B6] hover:bg-[#FCEEF1]"><ShoppingBag size={17} className="text-[#A83250]" /><span className="text-[11px] font-extrabold text-[#5C293A]">Kit manage karein</span></Link>
            </div>
          </article>
        </div>
      </section>

      <section className="rounded-2xl bg-[#F7EDF0] p-4 sm:flex sm:items-center sm:justify-between sm:gap-4 sm:p-5">
        <div><p className="text-sm font-black text-[#74213B]">Admin panel kaise use karein?</p><p className="mt-1 text-xs leading-5 text-[#806C74]">Products mein samaan, Kits mein combo aur Orders mein customer ke orders manage hote hain.</p></div>
        <div className="mt-3 flex flex-wrap gap-2 sm:mt-0">
          <Link href="/admin/products" className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-white px-3 text-[10px] font-extrabold text-[#842541]"><Package size={13} /> Products</Link>
          <Link href="/admin/kits" className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-white px-3 text-[10px] font-extrabold text-[#842541]"><Layers3 size={13} /> Kits</Link>
          <Link href="/admin/orders" className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-white px-3 text-[10px] font-extrabold text-[#842541]"><ShoppingCart size={13} /> Orders</Link>
        </div>
      </section>
    </div>
  );
}
