"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, ClipboardList, Plus, Send, Trash2 } from "lucide-react";

type GroceryLine = { id: string; name: string; quantity: string };
const STORAGE_KEY = "rashid-mega-mart-my-grocery-list";
const WHATSAPP_NUMBER = "918962531603";

function isGroceryLine(value: unknown): value is GroceryLine {
  if (!value || typeof value !== "object") return false;
  const line = value as Record<string, unknown>;
  return typeof line.id === "string" && typeof line.name === "string" && typeof line.quantity === "string";
}

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function MyGroceryListPage() {
  const [lines, setLines] = useState<GroceryLine[]>([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1 kg");
  const [loaded, setLoaded] = useState(false);
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setLines(parsed.filter(isGroceryLine).slice(0, 100));
        }
      }
    } catch {
      setSaveError(true);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
      setSaveError(false);
    } catch {
      setSaveError(true);
    }
  }, [lines, loaded]);

  const itemCount = lines.length;
  const message = useMemo(() => [
    "Namaste Rashid Mega Mart! Ye meri saved monthly grocery list hai:",
    "",
    ...lines.map((line, index) => `${index + 1}. ${line.name} — ${line.quantity}`),
    "",
    "Kripya current availability aur final prices confirm kar dein. Order store approval ke baad hi final hoga."
  ].join("\n"), [lines]);

  const addLine = () => {
    const cleanName = name.trim();
    if (!cleanName || !quantity.trim() || lines.length >= 100) return;
    setLines((current) => [...current, { id: makeId(), name: cleanName, quantity: quantity.trim() }]);
    setName("");
    setQuantity("1 kg");
  };

  const updateLine = (id: string, field: "name" | "quantity", value: string) => {
    setLines((current) => current.map((line) => line.id === id ? { ...line, [field]: value } : line));
  };

  const sendList = () => {
    if (!lines.length) return;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen bg-[#FAF7EF] px-3 pb-28 pt-4 sm:px-6 sm:pb-12 sm:pt-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/kits" className="inline-flex min-h-9 items-center gap-2 text-xs font-bold text-[#686868] transition hover:text-[#168447]">
          <ArrowLeft size={16} /> Back to grocery kits
        </Link>

        <section className="mt-3 overflow-hidden rounded-3xl border border-[#E8DFD1] bg-white shadow-[0_12px_40px_rgba(70,40,30,0.06)]">
          <div className="bg-[linear-gradient(120deg,#106B38,#168447)] px-5 py-6 text-white sm:px-7 sm:py-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-bold tracking-wide">
              <ClipboardList size={14} /> YOUR SAVED SHOPPING LIST
            </span>
            <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">My Grocery List</h1>
            <p className="mt-1 max-w-lg text-xs leading-5 text-white/85 sm:text-sm">
              Apne ghar ka monthly ration ek baar save karein. Agli baar isi list ko kholkar store ko bhej dein.
            </p>
          </div>

          <div className="p-4 sm:p-6">
            <div className="rounded-2xl border border-[#E8DFD1] bg-[#FAF7EF] p-3 sm:p-4">
              <label htmlFor="grocery-name" className="text-[11px] font-extrabold text-[#30251F]">Add grocery item</label>
              <div className="mt-2 grid grid-cols-[minmax(0,1fr)_100px] gap-2">
                <input id="grocery-name" value={name} onChange={(event) => setName(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") addLine(); }} placeholder="e.g. Atta, Rice, Toor Dal" maxLength={70} className="h-11 min-w-0 rounded-xl border border-[#D8CBB8] bg-white px-3 text-xs text-[#202124] outline-none transition focus:border-[#168447] focus:ring-2 focus:ring-[#168447]/10" />
                <input aria-label="Quantity" value={quantity} onChange={(event) => setQuantity(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") addLine(); }} maxLength={24} className="h-11 min-w-0 rounded-xl border border-[#D8CBB8] bg-white px-3 text-xs text-[#202124] outline-none focus:border-[#168447] focus:ring-2 focus:ring-[#168447]/10" />
              </div>
              <button type="button" onClick={addLine} disabled={!name.trim() || !quantity.trim() || lines.length >= 100} className="mt-2 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#168447] px-4 text-xs font-extrabold text-white transition hover:bg-[#106B38] active:scale-[.99] disabled:cursor-not-allowed disabled:opacity-45">
                <Plus size={15} /> Add to my list
              </button>
              <p className="mt-2 text-[10px] leading-4 text-[#81796F]">Quantity example: 5 kg, 2 L, 1 pack, 500 g.</p>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-black text-[#202124]">Your monthly essentials</h2>
                <p className="mt-0.5 text-[10px] text-[#81796F]">{itemCount} {itemCount === 1 ? "item" : "items"} saved on this device</p>
              </div>
              {lines.length > 0 && <button type="button" onClick={() => setLines([])} className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2 text-[10px] font-bold text-[#9B3B42] transition hover:bg-red-50"><Trash2 size={13} /> Clear list</button>}
            </div>

            {lines.length === 0 ? (
              <div className="mt-3 rounded-2xl border border-dashed border-[#D8CBB8] px-4 py-10 text-center">
                <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#EAF3E9] text-[#168447]"><ClipboardList size={23} /></span>
                <p className="mt-3 text-sm font-extrabold text-[#30251F]">Your list is empty</p>
                <p className="mt-1 text-xs text-[#81796F]">Start by adding the groceries your home needs every month.</p>
              </div>
            ) : (
              <ul className="mt-3 divide-y divide-[#EEE8E1] rounded-2xl border border-[#E8DFD1] bg-white">
                {lines.map((line, index) => (
                  <li key={line.id} className="flex items-center gap-2.5 px-3 py-3 sm:px-4">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#F1EBDD] text-[10px] font-black text-[#806000]">{index + 1}</span>
                    <input aria-label={`Item ${index + 1} name`} value={line.name} maxLength={70} onChange={(event) => updateLine(line.id, "name", event.target.value)} className="min-w-0 flex-1 bg-transparent text-xs font-bold text-[#30251F] outline-none focus:text-[#168447]" />
                    <input aria-label={`Item ${index + 1} quantity`} value={line.quantity} maxLength={24} onChange={(event) => updateLine(line.id, "quantity", event.target.value)} className="w-[82px] rounded-lg border border-[#E8DFD1] bg-[#FAF7EF] px-2 py-2 text-center text-[10px] font-bold text-[#625F56] outline-none focus:border-[#168447]" />
                    <button type="button" onClick={() => setLines((current) => current.filter((entry) => entry.id !== line.id))} aria-label={`Remove ${line.name}`} className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[#9B3B42] transition hover:bg-red-50"><Trash2 size={15} /></button>
                  </li>
                ))}
              </ul>
            )}

            {saveError && <p role="status" className="mt-3 text-[11px] font-semibold text-[#9B3B42]">Browser storage is unavailable. Your list may not stay saved after closing this page.</p>}
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#FAF0C8]/60 px-3 py-3 text-[10px] leading-4 text-[#66521B]">
              <Check size={14} className="mt-0.5 shrink-0" />
              List automatically saves on this device. Prices and stock are not assumed; the store confirms them before an order is approved.
            </div>
            <button type="button" onClick={sendList} disabled={!lines.length} className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#168447] px-5 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#106B38] active:scale-[.99] disabled:cursor-not-allowed disabled:opacity-45">
              <Send size={17} /> Send full list to Rashid Mega Mart
            </button>
            <p className="mt-2 text-center text-[10px] leading-4 text-[#81796F]">WhatsApp par list bhejein, store se price aur availability confirm karayein.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
