"use client";

import { useMemo, useState } from "react";
import { Plus, ShoppingCart, Trash2 } from "lucide-react";
import type { GroceryKit } from "@/data/kits";
import { kits } from "@/data/kits";
import { estimateGroceryLine, isValidGroceryQuantity } from "@/data/grocery-rates";
import { useCart } from "@/context/CartContext";
import { useSiteLanguage, toEnglishCatalogue, toHinglishCatalogue } from "@/components/LanguageProvider";

type KitLine = { name: string; quantity: string };

function splitKitLine(value: string): KitLine {
  const match = value.match(/^(.+?)\\s*[-–]\\s*(.+)$/);
  return match ? { name: match[1].trim(), quantity: match[2].trim() } : { name: value.trim(), quantity: "1" };
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
  const [newQuantity, setNewQuantity] = useState("1 kg");
  const [error, setError] = useState("");
  const catalog = useMemo(() => Array.from(new Set(kits.flatMap((entry) => entry.items.map((line) => splitKitLine(line).name)))).sort((a, b) => a.localeCompare(b)), []);
  const allLines = [...contents, ...additions];
  const estimates = allLines.map((line) => estimateGroceryLine(line.name, line.quantity));
  const formatRate = (amount: number | null) => amount === null ? "Pending" : "₹" + amount.toLocaleString("en-IN", { maximumFractionDigits: 2 });

  const saveContents = (next: KitLine[], nextAdditions = additions) => {
    const all = [...next, ...nextAdditions];
    if (all.length > 50 || nextAdditions.length > 25 || all.some((line) => !line.name.trim() || line.name.length > 70 || !line.quantity.trim() || line.quantity.length > 24)) {
      setError("Maximum 50 items allowed. Please check item name and quantity.");
      return;
    }
    setContents(next);
    setAdditions(nextAdditions);
    updateKitCustomization(kit.id, next, nextAdditions);
    setError("");
  };

  const handleAdd = () => {
    const cleanName = newItem.trim();
    const cleanQuantity = newQuantity.trim();
    if (!cleanName) return setError("Item ka naam likhein.");
    if (!isValidGroceryQuantity(cleanQuantity)) return setError("Quantity likhein, jaise 500g, 1kg, 2 litre ya 1 piece.");
    if (allLines.some((line) => line.name.toLowerCase() === cleanName.toLowerCase())) return setError("Ye item pehle se list mein hai.");
    if (allLines.length >= 50 || additions.length >= 25) return setError("Maximum item limit reached.");
    saveContents(contents, [...additions, { name: cleanName, quantity: cleanQuantity }]);
    setNewItem("");
    setNewQuantity("1 kg");
  };

  const handleAddToCart = () => {
    if (!isLoaded || !kit.isAvailable) return;
    if (!existingCartItem) addToCart({ id: kit.id, name: kit.name, price: kit.price, image: kit.image, brand: "Rashid Mega Mart", packSize: "Customized Grocery Kit" });
    updateKitCustomization(kit.id, contents, additions);
  };

  return (
    <section data-reveal className="rmm-customizer mt-4 overflow-hidden rounded-2xl border border-[#D8CBB8] bg-white shadow-[0_5px_18px_rgba(32,33,36,0.06)] sm:mt-5" aria-labelledby="customize-kit-title">
      <div className="bg-[#168447] px-3 py-3 text-white sm:px-4">
        <h2 id="customize-kit-title" className="text-base font-black leading-tight sm:text-lg">Grocery Items</h2>
        <p className="mt-0.5 text-[10px] font-medium text-white/85 sm:text-xs">Samaan, quantity aur rate — bas zaroori details.</p>
      </div>

      <div className="p-3 sm:p-4">
        <div className="overflow-hidden rounded-xl border border-[#E8DFD1]">
          <div className="grid grid-cols-[minmax(0,1fr)_88px_82px] gap-2 bg-[#F1EBDD] px-3 py-2.5 text-[10px] font-black uppercase tracking-wide text-[#625F56] sm:grid-cols-[minmax(0,1fr)_120px_110px] sm:text-xs">
            <span>Samaan</span><span className="text-center">Quantity</span><span className="text-right">Rate</span>
          </div>
          {allLines.map((line, index) => (
            <div key={`${line.name}-${index}`} className="grid grid-cols-[minmax(0,1fr)_88px_82px] items-center gap-2 border-t border-[#EEE8E1] px-3 py-2.5 sm:grid-cols-[minmax(0,1fr)_120px_110px]">
              <div className="flex min-w-0 items-center gap-1.5">
                <span className="min-w-0 break-words text-[11px] font-bold text-[#30251F] sm:text-sm">{displayCatalogue(line.name)}</span>
                {index < contents.length && <button type="button" aria-label={`Remove ${line.name}`} onClick={() => saveContents(contents.filter((_, i) => i !== index))} className="shrink-0 rounded p-1 text-[#9B3B42] hover:bg-red-50"><Trash2 size={12} /></button>}
                {index >= contents.length && <button type="button" aria-label={`Remove ${line.name}`} onClick={() => saveContents(contents, additions.filter((_, i) => i !== index - contents.length))} className="shrink-0 rounded p-1 text-[#9B3B42] hover:bg-red-50"><Trash2 size={12} /></button>}
              </div>
              <input aria-label={`${line.name} quantity`} value={line.quantity} onChange={(event) => {
                const value = event.target.value.slice(0, 24);
                if (index < contents.length) saveContents(contents.map((entry, i) => i === index ? { ...entry, quantity: value } : entry));
                else saveContents(contents, additions.map((entry, i) => i === index - contents.length ? { ...entry, quantity: value } : entry));
              }} className="h-9 w-full rounded-lg border border-[#E8DFD1] bg-[#FFFEFA] px-1 text-center text-[10px] font-bold text-[#30251F] outline-none focus:border-[#168447] sm:text-xs" />
              <span className="text-right text-[10px] font-extrabold tabular-nums text-[#806000] sm:text-xs">{formatRate(estimates[index]?.amount ?? null)}</span>
            </div>
          ))}
          {allLines.length === 0 && <p className="px-3 py-6 text-center text-xs text-[#81796F]">Abhi koi item nahi hai.</p>}
        </div>

        <div className="mt-3 rounded-xl border border-[#E8DFD1] bg-[#FAF7EF] p-3">
          <p className="text-xs font-black text-[#30251F]">Naya samaan add karein</p>
          <input list={`grocery-options-${kit.id}`} value={newItem} onChange={(event) => setNewItem(event.target.value.slice(0, 70))} placeholder="Item ka naam" aria-label="Add grocery item" className="mt-2 min-h-10 w-full rounded-lg border border-[#D8CBB8] bg-white px-3 text-xs outline-none focus:border-[#168447]" />
          <datalist id={`grocery-options-${kit.id}`}>{catalog.map((name) => <option key={name} value={name} />)}</datalist>
          <div className="mt-2 flex gap-2">
            <input aria-label="New item quantity" value={newQuantity} onChange={(event) => setNewQuantity(event.target.value.slice(0, 24))} placeholder="Quantity" className="min-h-10 w-28 rounded-lg border border-[#D8CBB8] bg-white px-2 text-center text-xs outline-none focus:border-[#168447]" />
            <button type="button" onClick={handleAdd} className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#168447] px-3 text-xs font-bold text-white hover:bg-[#106B38]"><Plus size={14} /> Add item</button>
          </div>
          {error && <p role="alert" className="mt-2 text-[10px] font-bold text-[#9B3B42]">{error}</p>}
        </div>

        <p className="mt-2 text-[10px] leading-4 text-[#81796F]">Jin items ke rates confirm nahi hue hain, unke saamne “Pending” dikhega. Final rate store confirm karega.</p>
        <button type="button" onClick={handleAddToCart} disabled={!isLoaded || !kit.isAvailable} className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#168447] px-4 py-3 text-xs font-black text-white shadow-sm transition active:scale-[.99] disabled:opacity-50 sm:text-sm">
          <ShoppingCart size={17} /> {existingCartItem ? "Update My Customized Kit" : "Add Customized Kit to Cart"}
        </button>
      </div>
    </section>
  );
}
