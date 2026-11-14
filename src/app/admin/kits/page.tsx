import Link from "next/link";
import { Layers3, Plus } from "lucide-react";
import { kits } from "@/data/kits";

export default function AdminKitsPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A47A2C]">Catalogue</p>
          <h1 className="mt-1 text-2xl font-black text-[#800020] sm:text-3xl">Grocery Kits</h1>
          <p className="mt-1 text-sm text-[#766D72]">Manage your store&apos;s grocery combo kits.</p>
        </div>
        <button type="button" disabled className="inline-flex min-h-10 cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-[#800020] px-4 text-xs font-bold text-white opacity-60">
          <Plus size={15} /> Add kit <span className="text-[9px]">(database required)</span>
        </button>
      </div>
      <div className="overflow-hidden rounded-2xl border border-[#F0E4E5] bg-white">
        <div className="flex items-center justify-between border-b border-[#F5ECEE] px-4 py-4">
          <h2 className="text-sm font-extrabold text-[#33232A]">Grocery kits</h2>
          <span className="rounded-full bg-[#FFF1F3] px-2.5 py-1 text-[10px] font-bold text-[#800020]">{kits.length} kits</span>
        </div>
        {kits.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
            <Layers3 size={28} className="text-[#A47A2C]" />
            <p className="text-sm font-bold text-[#33232A]">No grocery kits yet</p>
            <p className="max-w-sm text-xs leading-5 text-[#9A858B]">Real kits will appear here after the database is connected. No sample kits are being shown.</p>
          </div>
        ) : null}
      </div>
      <p className="text-[11px] leading-5 text-[#9A858B]">Kit creation and editing will be enabled after database integration.</p>
      <Link href="/kits" className="inline-block text-xs font-bold text-[#800020] underline underline-offset-4">Open customer kits</Link>
    </div>
  );
}
