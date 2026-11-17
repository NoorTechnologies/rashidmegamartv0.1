"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, ShoppingCart, Trash2, PlusCircle } from "lucide-react";
import type { GroceryKit } from "@/data/kits";
import { kits } from "@/data/kits";
import { useCart } from "@/context/CartContext";

type KitLine = { name: string; quantity: string };

function splitKitLine(value: string): KitLine {
  const match = value.match(/^(.+?)\s*[-–]\s*(.+)$/);
  return match ? { name: match[1].trim(), quantity: match[2].trim() } : { name: value.trim(), quantity: "1" };
}

function adjustQuantity(value: string, delta: number) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return delta > 0 ? "2" : "1";
  const next = Math.max(1, Number(match[1]) + delta);
  return String(next) + match[2];
}

export default function KitCustomizer({ kit }: { kit: GroceryKit }) {
  const { addToCart, updateKitCustomization, items, isLoaded } = useCart();
  const existingCartItem = items.find((item) => item.id === kit.id);
  const [contents, setContents] = useState<KitLine[]>(() => existingCartItem?.kitContents ?? kit.items.map(splitKitLine));
  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState("1");
  const [error, setError] = useState("");

  const catalog = useMemo(
    () => Array.from(new Set(kits.flatMap((entry) => entry.items.map((line) => splitKitLine(line).name)))).sort((a, b) => a.localeCompare(b)),
    []
  );
  const requestedItems = existingCartItem?.requestedItems ?? [];

  const saveContents = (next: KitLine[], additions = requestedItems) => {
    setContents(next);
    updateKitCustomization(kit.id, next, additions);
  };

  const handleAdd = () => {
    const name = newItem.trim();
    if (!name) {
      setError("Item ka naam likhein.");
      return;
    }
    if (name.length > 70 || newQuantity.trim().length > 24) {
      setError("Item ya quantity bahut lambi hai.");
      return;
    }
    if (requestedItems.some((item) => item.name.toLowerCase() === name.toLowerCase())) {
      setError("Ye item pehle se add hai.");
      return;
    }
    saveContents(contents, [...requestedItems, { name, quantity: newQuantity.trim() || "1" }]);
    setNewItem("");
    setNewQuantity("1");
    setError("");
  };

  const cartItem = existingCartItem;
  const handleAddToCart = () => {
    if (!isLoaded || !kit.isAvailable) return;
    if (!cartItem) {
      addToCart({
        id: kit.id,
        name: kit.name,
        price: kit.price,
        image: kit.image,
        brand: "Rashid Mega Mart",
        packSize: "Customized Grocery Kit",
      });
    }
    updateKitCustomization(kit.id, contents, requestedItems);
  };

  return (
    <section className="mt-5 rounded-2xl border border-[#E9E1DA] bg-white p-3 shadow-sm sm:p-5" aria-labelledby="customize-kit-title">
      <div className="flex items-start justify-between gap-3 border-b border-[#F0EAE5] pb-3">
        <div>
          <h2 id="customize-kit-title" className="text-base font-black text-[#30251F] sm:text-lg">Apni Kit Customize Karein</h2>
          <p className="mt-1 text-[11px] leading-5 text-[#82766D]">Jo chahiye rakhein, quantity badlein ya item hata dein.</p>
        </div>
        <span className="shrink-0 rounded-full bg-[#F8F0F1] px-2.5 py-1 text-[10px] font-bold text-[#A83250]">{contents.length} items</span>
      </div>

      <div className="mt-3 divide-y divide-[#F1ECE7]">
        {contents.map((line, index) => (
          <div key={`${kit.id}-${index}-${line.name}`} className="flex items-center gap-2 py-2.5">
            <div className="min-w-0 flex-1">
              <p className="break-words text-xs font-semibold text-[#30251F]">{line.name}</p>
              <p className="mt-0.5 text-[10px] text-[#93877F]">Kit mein shamil</p>
            </div>
            <div className="flex shrink-0 items-center gap-1 rounded-lg border border-[#EAE3DD] bg-[#FCFAF8] p-1">
              <button type="button" aria-label={`Decrease ${line.name}`} onClick={() => saveContents(contents.map((entry, i) => i === index ? { ...entry, quantity: adjustQuantity(entry.quantity, -1) } : entry))} className="flex size-7 items-center justify-center rounded-md text-[#6F625B] hover:bg-white"><Minus size={13} /></button>
              <input aria-label={`${line.name} quantity`} value={line.quantity} onChange={(event) => saveContents(contents.map((entry, i) => i === index ? { ...entry, quantity: event.target.value.slice(0, 24) } : entry))} className="w-[66px] bg-transparent text-center text-[11px] font-semibold text-[#30251F] outline-none" />
              <button type="button" aria-label={`Increase ${line.name}`} onClick={() => saveContents(contents.map((entry, i) => i === index ? { ...entry, quantity: adjustQuantity(entry.quantity, 1) } : entry))} className="flex size-7 items-center justify-center rounded-md text-[#6F625B] hover:bg-white"><Plus size={13} /></button>
            </div>
            <button type="button" aria-label={`Remove ${line.name}`} onClick={() => saveContents(contents.filter((_, i) => i !== index))} className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[#A69A92] hover:bg-[#FFF1F2] hover:text-[#A83250]"><Trash2 size={14} /></button>
          </div>
        ))}
        {contents.length === 0 && <p className="py-4 text-center text-xs text-[#8C8179]">Kit ke sabhi original items remove ho gaye. Neeche naye items add kar sakte hain.</p>}
      </div>

      <div className="mt-4 rounded-xl border border-[#E9E1DA] bg-[#FCFAF8] p-3">
        <h3 className="text-xs font-extrabold text-[#30251F]">Aur grocery add karein</h3>
        <p className="mt-1 text-[10px] leading-4 text-[#82766D]">Store ke doosre listed items ya apni zaroorat ka koi item likhein.</p>
        <input list={`grocery-options-${kit.id}`} value={newItem} onChange={(event) => { setNewItem(event.target.value); setError(""); }} placeholder="Jaise: Aata, chini, detergent..." maxLength={70} className="mt-2 min-h-10 w-full rounded-lg border border-[#E7DED7] bg-white px-3 text-xs text-[#30251F] outline-none focus:border-[#A83250]" />
        <datalist id={`grocery-options-${kit.id}`}>{catalog.map((name) => <option key={name} value={name} />)}</datalist>
        <div className="mt-2 flex gap-2">
          <input aria-label="New item quantity" value={newQuantity} onChange={(event) => setNewQuantity(event.target.value.slice(0, 24))} placeholder="Qty" className="min-h-10 w-24 rounded-lg border border-[#E7DED7] bg-white px-3 text-xs outline-none focus:border-[#A83250]" />
          <button type="button" onClick={handleAdd} className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#A83250] px-3 text-xs font-bold text-white transition hover:bg-[#87263F]"><PlusCircle size={14} /> Add item</button>
        </div>
        {error && <p role="alert" className="mt-2 text-[10px] text-red-600">{error}</p>}
        {requestedItems.length > 0 && (
          <div className="mt-3 space-y-2 border-t border-[#EAE2DC] pt-3">
            <p className="text-[10px] font-bold text-[#55483F]">Added items — price confirmation pending</p>
            {requestedItems.map((item, index) => <div key={`${item.name}-${index}`} className="flex items-center justify-between gap-2 text-[11px]"><span className="min-w-0 flex-1 text-[#55483F]">{item.name} · {item.quantity}</span><button type="button" onClick={() => saveContents(contents, requestedItems.filter((_, i) => i !== index))} className="text-[#A83250]">Remove</button></div>)}
          </div>
        )}
      </div>

      <div className="mt-3 rounded-lg bg-[#F8F5F1] px-3 py-2 text-[10px] leading-4 text-[#766B63]">
        Kit ka listed price abhi same rahega. Extra/custom items aur final amount store WhatsApp par confirm karega.
      </div>

      <button type="button" onClick={handleAddToCart} disabled={!isLoaded || !kit.isAvailable} className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#A83250] px-4 py-3 text-xs font-extrabold text-white transition hover:bg-[#87263F] disabled:opacity-50">
        <ShoppingCart size={16} /> {cartItem ? "Update Customized Kit in Cart" : "Customized Kit Cart Mein Add Karein"}
      </button>
    </section>
  );
}
