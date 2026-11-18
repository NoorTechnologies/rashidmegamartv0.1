"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, ShoppingCart, Trash2, PlusCircle, BadgeCheck, Package } from "lucide-react";
import type { GroceryKit } from "@/data/kits";
import { kits } from "@/data/kits";
import { estimateGroceryLines, isValidGroceryQuantity } from "@/data/grocery-rates";
import { useCart } from "@/context/CartContext";
import { useSiteLanguage, toEnglishCatalogue, toHinglishCatalogue } from "@/components/LanguageProvider";

type KitLine = { name: string; quantity: string };

function splitKitLine(value: string): KitLine {
  const match = value.match(/^(.+?)\s*[-–]\s*(.+)$/);
  return match ? { name: match[1].trim(), quantity: match[2].trim() } : { name: value.trim(), quantity: "1" };
}

function adjustQuantity(value: string, delta: number) {
  // Only adjust quantities supported by the calculator. This keeps mixed or
  // descriptive catalogue values such as "2 फुल / 5 लीटर" unchanged.
  if (!isValidGroceryQuantity(value)) return value;
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return value;
  const next = Math.max(1, Number(match[1]) + delta);
  return String(next) + match[2];
}

export default function KitCustomizer({ kit }: { kit: GroceryKit }) {
  const { addToCart, updateKitCustomization, items, isLoaded } = useCart();
  const language = useSiteLanguage();
  const displayCatalogue = (value: string) => language === "en" ? toEnglishCatalogue(value) : language === "hinglish" ? toHinglishCatalogue(value) : value;
  const existingCartItem = items.find((item) => item.id === kit.id);
  const [contents, setContents] = useState<KitLine[]>(() => existingCartItem?.kitContents ?? kit.items.map(splitKitLine));
  const [additions, setAdditions] = useState<KitLine[]>(() => existingCartItem?.requestedItems ?? []);
  const [previousCartItem, setPreviousCartItem] = useState(existingCartItem);

  if (isLoaded && existingCartItem !== previousCartItem) {
    setPreviousCartItem(existingCartItem);
    setContents(existingCartItem?.kitContents ?? kit.items.map(splitKitLine));
    setAdditions(existingCartItem?.requestedItems ?? []);
  }
  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState("1");
  const [error, setError] = useState("");

  const catalog = useMemo(
    () => Array.from(new Set(kits.flatMap((entry) => entry.items.map((line) => splitKitLine(line).name)))).sort((a, b) => a.localeCompare(b)),
    []
  );
  const groceryEstimate = useMemo(
    () => estimateGroceryLines([...contents, ...additions]),
    [contents, additions],
  );
  const formatEstimate = (amount: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(amount);

  const saveContents = (next: KitLine[], nextAdditions = additions) => {
    setContents(next);
    setAdditions(nextAdditions);

    const allLines = [...next, ...nextAdditions];
    const validLines = allLines.every((line) =>
      line.name.trim().length > 0 &&
      line.name.length <= 70 &&
      line.quantity.trim().length > 0 &&
      line.quantity.length <= 24
    );

    if (allLines.length > 50 || nextAdditions.length > 25 || !validLines) {
      setError("Aap ek kit mein maximum 50 items (25 extra items) add kar sakte hain. Naam/quantity ki limit ka dhyan rakhein.");
      return;
    }

    updateKitCustomization(kit.id, next, nextAdditions);
    setError("");
  };

  const handleAdd = () => {
    const name = newItem.trim();
    if (!name) return setError("Item ka naam likhein.");
    if (name.length > 70 || newQuantity.trim().length > 24) return setError("Item ya quantity bahut lambi hai.");
    if (contents.length + additions.length >= 50 || additions.length >= 25) return setError("Ek kit mein maximum 50 items aur 25 extra items add kar sakte hain.");
    if (!isValidGroceryQuantity(newQuantity.trim())) return setError("Quantity sahi likhein, jaise 500g, 1kg, 2 litre ya 1 piece.");
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
    <section data-reveal className="rmm-customizer mt-4 overflow-hidden rounded-2xl border border-[#D8CBB8] bg-white shadow-[0_5px_18px_rgba(32,33,36,0.06)] sm:mt-5" aria-labelledby="customize-kit-title">
      <div className="flex items-center justify-between gap-3 bg-[#168447] px-3 py-3 text-white sm:px-4">
        <div className="min-w-0">
          <h2 id="customize-kit-title" className="text-base font-black leading-tight sm:text-lg">Customize your kit</h2>
          <p className="mt-0.5 text-[10px] font-medium text-white/85 sm:text-xs">Edit quantities, remove or add groceries.</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1.5 text-[10px] font-extrabold text-white">
          <Package size={13} /> {contents.length + additions.length} items
        </span>
      </div>

      <div className="p-3 sm:p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-black text-[#202124] sm:text-base">Your kit items</h3>
            <p className="mt-0.5 text-[10px] font-medium text-[#686868] sm:text-xs">Your changes are saved as a custom request for the store.</p>
          </div>
          <span className="rounded-full bg-[#FAF0C8] px-2.5 py-1 text-[10px] font-black text-[#806000]">{contents.length} included</span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {contents.map((line, index) => (
            <div key={`${kit.id}-${index}-${displayCatalogue(line.name)}`} className="rounded-xl border border-[#E8DFD1] bg-white p-2 sm:flex sm:items-center sm:gap-3">
              <div className="flex min-w-0 items-center gap-2 sm:flex-1">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF3E9] text-[#168447]"><Package size={16} /></span>
                <div className="min-w-0 flex-1">
                  <p className="break-words text-xs font-extrabold leading-4 text-[#202124]">{displayCatalogue(line.name)}</p>
                  <p className="mt-0.5 text-[9px] font-semibold text-[#8A8178]">Included in kit</p>
                </div>
                <button type="button" aria-label={`Remove ${line.name}`} onClick={() => saveContents(contents.filter((_, i) => i !== index))} className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[#8A8178] transition hover:bg-red-50 hover:text-red-600"><Trash2 size={14} /></button>
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 rounded-lg bg-[#FAF7EF] p-1 sm:mt-0 sm:w-[210px] sm:shrink-0">
                <span className="pl-2 text-[10px] font-bold text-[#686868]">Quantity</span>
                <div className="flex items-center gap-1">
                  <button type="button" aria-label={`Decrease ${line.name}`} disabled={!isValidGroceryQuantity(line.quantity)} onClick={() => saveContents(contents.map((entry, i) => i === index ? { ...entry, quantity: adjustQuantity(entry.quantity, -1) } : entry))} className="flex size-9 items-center justify-center rounded-lg bg-white text-[#800020] shadow-sm hover:bg-[#F1EBDD] disabled:opacity-35"><Minus size={13} /></button>
                  <input aria-label={`${line.name} quantity`} value={displayCatalogue(line.quantity)} onChange={(event) => saveContents(contents.map((entry, i) => i === index ? { ...entry, quantity: event.target.value.slice(0, 24) } : entry))} className="min-h-10 w-[76px] rounded-lg border border-[#E8DFD1] bg-white px-1 py-2 text-center text-[12px] font-extrabold text-[#202124] outline-none focus:border-[#168447]" />
                  <button type="button" aria-label={`Increase ${line.name}`} disabled={!isValidGroceryQuantity(line.quantity)} onClick={() => saveContents(contents.map((entry, i) => i === index ? { ...entry, quantity: adjustQuantity(entry.quantity, 1) } : entry))} className="flex size-9 items-center justify-center rounded-lg bg-white text-[#168447] shadow-sm hover:bg-[#EAF3E9] disabled:opacity-35"><Plus size={13} /></button>
                </div>
              </div>
            </div>
          ))}
          {contents.length === 0 && <p className="rounded-2xl border border-dashed border-[#D8CBB8] bg-[#FAF7EF] px-4 py-6 text-center text-xs font-semibold text-[#686868] sm:col-span-2">No original items left. Add the groceries you want below.</p>}
        </div>

        <div className="mt-3 rounded-xl border border-[#E8DFD1] bg-[#FAF7EF] p-3">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#168447] text-white shadow-sm"><PlusCircle size={18} /></span>
            <div>
              <h3 className="text-xs font-black text-[#202124] sm:text-sm">Add more groceries</h3>
              <p className="text-[10px] font-medium text-[#686868]">Search a suggested item or type your own name and quantity.</p>
            </div>
          </div>
          <input list={`grocery-options-${kit.id}`} value={newItem} onChange={(event) => { setNewItem(event.target.value); setError(""); }} placeholder="Try: Aata, Chini, Detergent..." aria-label="Add grocery item" maxLength={70} className="mt-3 min-h-11 w-full rounded-xl border border-[#D8CBB8] bg-white px-3 text-xs font-semibold text-[#202124] outline-none transition placeholder:font-medium placeholder:text-[#686868] focus:border-[#800020] focus:ring-3 focus:ring-[#800020]/10" />
          <datalist id={`grocery-options-${kit.id}`}>{catalog.map((name) => <option key={name} value={name} />)}</datalist>
          <div className="mt-2 flex gap-2">
            <input aria-label="New item quantity" value={newQuantity} onChange={(event) => setNewQuantity(event.target.value.slice(0, 24))} placeholder="Qty" className="min-h-12 w-24 rounded-xl border border-[#D8CBB8] bg-white px-3 text-center text-sm font-extrabold outline-none focus:border-[#800020]" />
            <button type="button" onClick={handleAdd} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#168447] px-3 text-xs font-black text-white shadow-[0_5px_14px_rgba(22,132,71,0.18)] transition hover:-translate-y-0.5 hover:bg-[#106B38] active:scale-[0.98]"><Plus size={15} /> Add item</button>
          </div>
          {error && <p role="alert" className="mt-2 text-[10px] font-bold text-[#800020]">{error}</p>}
          {additions.length > 0 && (
            <div className="mt-3 rounded-xl border border-[#F7C928] bg-[#FAF0C8] p-3">
              <p className="text-[10px] font-black uppercase tracking-wide text-[#806000]">Your extra items · price to be confirmed</p>
              <div className="mt-2 space-y-2">
                {additions.map((item, index) => (
                  <div key={`${displayCatalogue(item.name)}-${index}`} className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="min-w-0 flex-1 font-bold text-[#202124]">{displayCatalogue(item.name)} <span className="font-semibold text-[#686868]">· {displayCatalogue(item.quantity)}</span></span>
                    <button type="button" onClick={() => saveContents(contents, additions.filter((_, i) => i !== index))} className="rounded-lg px-2 py-1 font-extrabold text-[#800020] hover:bg-white">Remove</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-3 overflow-hidden rounded-xl border border-[#BBDCC5] bg-[#F0F8F1]">
          <div className="flex items-center justify-between gap-3 border-b border-[#CDE5D2] px-3 py-2.5">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#106B38]"><BadgeCheck size={14} /> Smart Kit Deal</span>
            <span className="rounded-full bg-[#168447] px-2.5 py-1 text-[9px] font-black text-white">STORE PRICE</span>
          </div>
          <div className="grid grid-cols-[1fr_auto] items-center gap-3 p-3">
            <div className="min-w-0">
              <p className="text-xs font-black text-[#174D2B]">Compare the full basket before you buy.</p>
              <p className="mt-1 text-[10px] leading-4 text-[#42664B]">Ready-made kit pricing keeps everyday essentials together. Ask us on WhatsApp for your best customized final quote.</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-bold uppercase tracking-wide text-[#42664B]">Kit base price</p>
              <p className="text-xl font-black leading-tight text-[#106B38]">₹{kit.price.toLocaleString("en-IN")}</p>
              <p className="text-[8px] font-semibold text-[#42664B]">per kit</p>
            </div>
          </div>
          <p className="border-t border-[#CDE5D2] bg-white/55 px-3 py-2 text-[9px] leading-4 text-[#42664B]">Changing quantities inside the kit updates your request. The base kit price stays fixed; extra-item rates and final amount are confirmed by the owner on WhatsApp.</p>
        </div>


        <div data-reveal className="mt-3 overflow-hidden rounded-xl border border-[#D8CBB8] bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-[#E8DFD1] bg-[#FAF7EF] px-3 py-3">
            <div>
              <h3 className="text-xs font-black text-[#202124] sm:text-sm">Grocery Quantity Calculator</h3>
              <p className="mt-0.5 text-[9px] font-medium text-[#686868]">Item rates will be added after owner confirmation.</p>
            </div>
            <span className="rounded-full bg-[#FAF0C8] px-2.5 py-1 text-[9px] font-black text-[#806000]">{groceryEstimate.pendingCount} rates pending</span>
          </div>
          <div className="space-y-0 px-3">
            {groceryEstimate.lines.map((line, index) => (
              <div key={`${line.name}-${index}`} className="flex items-center justify-between gap-3 border-b border-[#F1EBDD] py-2 last:border-0">
                <div className="min-w-0">
                  <p className="truncate text-[10px] font-bold text-[#202124]">{displayCatalogue(line.name)}</p>
                  <p className="text-[9px] font-medium text-[#686868]">{displayCatalogue(line.quantity)}</p>
                </div>
                <span className="shrink-0 text-[10px] font-extrabold tabular-nums text-[#806000]">{line.amount === null ? "Rate pending" : formatEstimate(line.amount)}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-[#E8DFD1] bg-[#F0F8F1] px-3 py-3">
            <div>
              <p className="text-xs font-black text-[#174D2B]">Customized item total</p>
              <p className="text-[9px] text-[#42664B]">{groceryEstimate.pendingCount ? "Final calculation appears when all item rates are set." : "Calculated from confirmed store rates."}</p>
            </div>
            <p className="text-base font-black tabular-nums text-[#106B38]">{groceryEstimate.total === null ? "Pending" : formatEstimate(groceryEstimate.total)}</p>
          </div>
        </div>

        <button type="button" onClick={handleAddToCart} disabled={!isLoaded || !kit.isAvailable} className="sticky bottom-[76px] z-30 mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/70 bg-[#168447] px-4 py-3 text-xs font-black text-white shadow-[0_8px_24px_rgba(22,132,71,0.28)] transition active:scale-[0.99] disabled:opacity-50 sm:static sm:min-h-11 sm:text-sm">
          <ShoppingCart size={17} /> {cartItem ? "Update My Customized Kit" : "Add Customized Kit to Cart"}
        </button>
      </div>
    </section>
  );
}
