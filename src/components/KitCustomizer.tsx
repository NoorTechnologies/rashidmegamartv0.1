"use client";

import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, ShoppingCart, Trash2, PlusCircle, Sparkles, BadgeCheck, Tag, Package } from "lucide-react";
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
  const [additions, setAdditions] = useState<KitLine[]>(() => existingCartItem?.requestedItems ?? []);
  useEffect(() => {
    if (existingCartItem?.kitContents) setContents(existingCartItem.kitContents);
    if (existingCartItem?.requestedItems) setAdditions(existingCartItem.requestedItems);
  }, [existingCartItem?.kitContents, existingCartItem?.requestedItems]);
  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState("1");
  const [error, setError] = useState("");

  const catalog = useMemo(
    () => Array.from(new Set(kits.flatMap((entry) => entry.items.map((line) => splitKitLine(line).name)))).sort((a, b) => a.localeCompare(b)),
    []
  );
  const saveContents = (next: KitLine[], nextAdditions = additions) => {
    setContents(next);
    setAdditions(nextAdditions);
    updateKitCustomization(kit.id, next, nextAdditions);
  };

  const handleAdd = () => {
    const name = newItem.trim();
    if (!name) return setError("Item ka naam likhein.");
    if (name.length > 70 || newQuantity.trim().length > 24) return setError("Item ya quantity bahut lambi hai.");
    if ([...contents, ...additions].some((item) => item.name.toLowerCase() === name.toLowerCase())) return setError("Ye item pehle se add hai.");
    saveContents(contents, [...additions, { name, quantity: newQuantity.trim() || "1" }]);
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
    updateKitCustomization(kit.id, contents, additions);
  };

  return (
    <section className="rmm-customizer mt-5 overflow-hidden rounded-[24px] border border-[#F4C9C9] bg-white shadow-[0_14px_38px_rgba(150,20,30,0.09)] sm:mt-6" aria-labelledby="customize-kit-title">
      <div className="relative overflow-hidden bg-[linear-gradient(115deg,#B5121B_0%,#E21D2B_58%,#F04438_100%)] px-4 py-4 text-white sm:px-5 sm:py-5">
        <span className="pointer-events-none absolute -right-6 -top-10 size-36 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/15 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[#FFF2B8]">
              <Sparkles size={11} /> Build your own combo
            </span>
            <h2 id="customize-kit-title" className="mt-2 text-lg font-black leading-tight tracking-tight sm:text-2xl">Make This Kit Yours!</h2>
            <p className="mt-1 max-w-md text-[11px] font-semibold leading-5 text-white/90 sm:text-sm">Keep what you need. Change quantities. Add your favourite groceries.</p>
          </div>
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-inner sm:size-14">
            <Package size={25} />
          </div>
        </div>
        <div className="relative mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF0A8] px-2.5 py-1 text-[9px] font-black text-[#744600]"><Tag size={10} /> KIT SPECIAL</span>
          <span className="text-[10px] font-bold text-white/90">{contents.length + additions.length} items selected</span>
        </div>
      </div>

      <div className="p-3 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-black text-[#202124] sm:text-base">Your kit items</h3>
            <p className="mt-0.5 text-[10px] font-medium text-[#6B7280] sm:text-xs">Edit each item before adding the kit to your cart.</p>
          </div>
          <span className="rounded-full bg-[#FFF4D6] px-2.5 py-1 text-[10px] font-black text-[#805500]">{contents.length} included</span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#E9ECEF] bg-white">
          {contents.map((line, index) => (
            <div key={`${kit.id}-${index}-${line.name}`} className="flex items-center gap-2 border-b border-[#F0F1F2] px-2.5 py-2.5 last:border-b-0 sm:gap-3 sm:px-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#FFF0F0] text-[#D71920]"><Package size={15} /></span>
              <div className="min-w-0 flex-1">
                <p className="break-words text-[11px] font-extrabold leading-4 text-[#25282B] sm:text-xs">{line.name}</p>
                <p className="mt-0.5 text-[9px] font-semibold text-[#899098]">Included in this kit</p>
              </div>
              <div className="flex shrink-0 items-center rounded-xl border border-[#E2E5E8] bg-[#F8F9FA] p-0.5">
                <button type="button" aria-label={`Decrease ${line.name}`} onClick={() => saveContents(contents.map((entry, i) => i === index ? { ...entry, quantity: adjustQuantity(entry.quantity, -1) } : entry))} className="rmm-quantity-button size-7 rounded-lg text-[#D71920] hover:bg-[#FFE6E6]"><Minus size={13} /></button>
                <input aria-label={`${line.name} quantity`} value={line.quantity} onChange={(event) => saveContents(contents.map((entry, i) => i === index ? { ...entry, quantity: event.target.value.slice(0, 24) } : entry))} className="w-[58px] bg-transparent text-center text-[10px] font-extrabold text-[#272B2F] outline-none sm:w-[68px]" />
                <button type="button" aria-label={`Increase ${line.name}`} onClick={() => saveContents(contents.map((entry, i) => i === index ? { ...entry, quantity: adjustQuantity(entry.quantity, 1) } : entry))} className="rmm-quantity-button size-7 rounded-lg text-[#D71920] hover:bg-[#FFE6E6]"><Plus size={13} /></button>
              </div>
              <button type="button" aria-label={`Remove ${line.name}`} onClick={() => saveContents(contents.filter((_, i) => i !== index))} className="flex size-8 shrink-0 items-center justify-center rounded-xl text-[#9AA0A6] transition hover:bg-[#FFF0F0] hover:text-[#D71920]"><Trash2 size={14} /></button>
            </div>
          ))}
          {contents.length === 0 && <p className="px-4 py-6 text-center text-xs font-semibold text-[#6B7280]">No original items left. Add the groceries you want below.</p>}
        </div>

        <div className="mt-4 rounded-2xl border border-dashed border-[#E8A0A4] bg-[linear-gradient(135deg,#FFF8F1_0%,#FFF1F1_100%)] p-3 sm:p-4">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#D71920] text-white shadow-sm"><PlusCircle size={18} /></span>
            <div>
              <h3 className="text-xs font-black text-[#292B2D] sm:text-sm">Add more groceries</h3>
              <p className="text-[10px] font-medium text-[#6B7280]">Choose from our kits or type any item you need.</p>
            </div>
          </div>
          <input list={`grocery-options-${kit.id}`} value={newItem} onChange={(event) => { setNewItem(event.target.value); setError(""); }} placeholder="Try: Aata, Chini, Detergent..." aria-label="Add grocery item" maxLength={70} className="mt-3 min-h-11 w-full rounded-xl border border-[#E2D4D4] bg-white px-3 text-xs font-semibold text-[#25282B] outline-none transition placeholder:font-medium placeholder:text-[#9AA0A6] focus:border-[#D71920] focus:ring-3 focus:ring-[#D71920]/10" />
          <datalist id={`grocery-options-${kit.id}`}>{catalog.map((name) => <option key={name} value={name} />)}</datalist>
          <div className="mt-2 flex gap-2">
            <input aria-label="New item quantity" value={newQuantity} onChange={(event) => setNewQuantity(event.target.value.slice(0, 24))} placeholder="Qty" className="min-h-11 w-24 rounded-xl border border-[#E2D4D4] bg-white px-3 text-center text-xs font-extrabold outline-none focus:border-[#D71920]" />
            <button type="button" onClick={handleAdd} className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#D71920] px-3 text-xs font-black text-white shadow-[0_5px_14px_rgba(215,25,32,0.18)] transition hover:-translate-y-0.5 hover:bg-[#B5121B] active:scale-[0.98]"><Plus size={15} /> Add item</button>
          </div>
          {error && <p role="alert" className="mt-2 text-[10px] font-bold text-[#C1121F]">{error}</p>}
          {additions.length > 0 && (
            <div className="mt-3 rounded-xl border border-[#F3D98A] bg-[#FFF9E6] p-3">
              <p className="text-[10px] font-black uppercase tracking-wide text-[#805500]">Your extra items · price to be confirmed</p>
              <div className="mt-2 space-y-2">
                {additions.map((item, index) => (
                  <div key={`${item.name}-${index}`} className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="min-w-0 flex-1 font-bold text-[#37312A]">{item.name} <span className="font-semibold text-[#806C48]">· {item.quantity}</span></span>
                    <button type="button" onClick={() => saveContents(contents, additions.filter((_, i) => i !== index))} className="rounded-lg px-2 py-1 font-extrabold text-[#C1121F] hover:bg-white">Remove</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-3 rounded-2xl border border-[#B9E5C9] bg-[#F0FBF4] p-3">
          <div className="flex min-w-0 items-start gap-2">
            <BadgeCheck size={17} className="mt-0.5 shrink-0 text-[#168447]" />
            <div>
              <p className="text-[11px] font-black text-[#17643A]">Your kit, your choice!</p>
              <p className="mt-0.5 text-[10px] leading-4 text-[#4D6B58]">Extra item prices and final customized total will be confirmed by our store on WhatsApp.</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-bold uppercase tracking-wide text-[#6A826F]">Kit price</p>
            <p className="text-lg font-black leading-tight text-[#D71920]">₹{kit.price.toLocaleString("en-IN")}</p>
            <p className="text-[8px] font-semibold text-[#6A826F]">listed base price</p>
          </div>
        </div>

        <button type="button" onClick={handleAddToCart} disabled={!isLoaded || !kit.isAvailable} className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(100deg,#D71920_0%,#B5121B_100%)] px-4 py-3 text-xs font-black text-white shadow-[0_7px_18px_rgba(215,25,32,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(215,25,32,0.28)] active:scale-[0.99] disabled:opacity-50 sm:text-sm">
          <ShoppingCart size={17} /> {cartItem ? "Update My Customized Kit" : "Add Customized Kit to Cart"}
        </button>
      </div>
    </section>
  );
}
