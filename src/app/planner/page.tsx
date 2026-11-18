"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronDown,
  CirclePlus,
  ClipboardList,
  Heart,
  Minus,
  PackagePlus,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import { products, type Product } from "@/data/products";
import { categories } from "@/data/categories";

type KitLine = { productId: string; quantity: number };
type SavedKit = {
  id: string;
  name: string;
  items: KitLine[];
  updatedAt: string;
};

const STORAGE_KEY = "rashid-mega-mart-planner-kits";
const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function PlannerPage() {
  const { addToCart, increaseQuantity } = useCart();
  const [kitName, setKitName] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [savedKits, setSavedKits] = useState<SavedKit[]>([]);
  const [activeTab, setActiveTab] = useState<"create" | "saved">("create");
  const [notice, setNotice] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setSavedKits(
            parsed.filter(
              (kit): kit is SavedKit =>
                !!kit &&
                typeof kit.id === "string" &&
                typeof kit.name === "string" &&
                Array.isArray(kit.items)
            )
          );
        }
      }
    } catch {
      setNotice("Saved kits could not be loaded from this browser.");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const selectedProducts = useMemo(
    () =>
      products.filter(
        (product) => (selected[product.id] ?? 0) > 0 && product.isAvailable
      ),
    [selected]
  );

  const totalItems = selectedProducts.reduce(
    (total, product) => total + (selected[product.id] ?? 0),
    0
  );
  const totalPrice = selectedProducts.reduce(
    (total, product) => total + product.price * (selected[product.id] ?? 0),
    0
  );

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products
      .filter((product) => product.isAvailable)
      .filter((product) => category === "All" || product.category === category)
      .filter(
        (product) =>
          !term ||
          product.name.toLowerCase().includes(term) ||
          product.brand.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term) ||
          product.packSize.toLowerCase().includes(term)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [search, category]);

  const changeQuantity = (product: Product, delta: number) => {
    setSelected((current) => {
      const next = Math.max(0, Math.min(99, (current[product.id] ?? 0) + delta));
      const copy = { ...current };
      if (next === 0) delete copy[product.id];
      else copy[product.id] = next;
      return copy;
    });
  };

  const persistKits = (next: SavedKit[]) => {
    setSavedKits(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setNotice("Your kit has been saved on this device.");
    } catch {
      setNotice("Unable to save. Please check your browser storage.");
    }
  };

  const saveKit = () => {
    const name = kitName.trim();
    if (!name) {
      setNotice("Please enter a name for your grocery kit.");
      return;
    }
    if (selectedProducts.length === 0) {
      setNotice("Add at least one product before saving your kit.");
      return;
    }

    const kit: SavedKit = {
      id: crypto.randomUUID(),
      name,
      items: selectedProducts.map((product) => ({
        productId: product.id,
        quantity: selected[product.id],
      })),
      updatedAt: new Date().toISOString(),
    };
    persistKits([kit, ...savedKits]);
    setActiveTab("saved");
  };

  const loadKit = (kit: SavedKit) => {
    const next: Record<string, number> = {};
    for (const line of kit.items) {
      const product = products.find((item) => item.id === line.productId);
      if (product?.isAvailable) next[product.id] = line.quantity;
    }
    setSelected(next);
    setKitName(kit.name);
    setActiveTab("create");
    setNotice(`"${kit.name}" is ready to edit.`);
  };

  const deleteKit = (id: string) => {
    persistKits(savedKits.filter((kit) => kit.id !== id));
  };

  const addKitToCart = () => {
    if (selectedProducts.length === 0) {
      setNotice("Choose products for your kit first.");
      return;
    }
    for (const product of selectedProducts) {
      const quantity = selected[product.id] ?? 0;
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        packSize: product.packSize,
      });
      for (let index = 1; index < quantity; index += 1) {
        increaseQuantity(product.id);
      }
    }
    setNotice(`${totalItems} items added to your cart.`);
  };

  return (
    <main className="min-h-screen overflow-x-clip bg-[#FFFCF6] text-[#30251F]">
      <div className="mx-auto w-full max-w-5xl px-3 pb-8 pt-4 sm:px-6 sm:pt-8">
        <section className="relative overflow-hidden rounded-[26px] border border-[#E8E0D2] bg-gradient-to-br from-[#F4F8DF] via-[#FFFDF7] to-[#F8EDE7] p-5 sm:p-8">
          <div className="pointer-events-none absolute -right-12 -top-12 size-44 rounded-full bg-[#168447]/10 blur-2xl" />
          <p className="relative inline-flex rounded-full bg-[#168447] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white sm:text-xs">
            Plan smart · Shop better
          </p>
          <h1 className="relative mt-3 max-w-xl text-[clamp(2rem,7vw,3.4rem)] font-black leading-[1.02] tracking-tight text-[#800020]">
            Monthly Grocery <span className="text-[#168447]">Planner</span>
          </h1>
          <p className="relative mt-3 max-w-lg text-sm font-medium leading-6 text-[#62574E] sm:text-base">
            Create your own grocery kits with products from our store. Give each kit a name and save it for later.
          </p>
          <div className="relative mt-5 flex flex-wrap gap-2 text-xs font-bold text-[#168447]">
            <span className="rounded-full bg-white/80 px-3 py-2">✓ Pick store products</span>
            <span className="rounded-full bg-white/80 px-3 py-2">✓ Set quantities</span>
            <span className="rounded-full bg-white/80 px-3 py-2">✓ Save your kit</span>
          </div>
        </section>

        <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-[#F5EFE6] p-1.5">
          <button
            type="button"
            onClick={() => setActiveTab("create")}
            className={`min-h-11 rounded-xl px-3 text-sm font-extrabold transition ${activeTab === "create" ? "bg-[#800020] text-white shadow-sm" : "text-[#62574E]"}`}
          >
            <span className="inline-flex items-center gap-2"><CirclePlus size={17} /> Create a Kit</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`min-h-11 rounded-xl px-3 text-sm font-extrabold transition ${activeTab === "saved" ? "bg-[#800020] text-white shadow-sm" : "text-[#62574E]"}`}
          >
            <span className="inline-flex items-center gap-2"><Heart size={16} /> My Saved Kits ({savedKits.length})</span>
          </button>
        </div>

        {activeTab === "create" ? (
          <>
            <section className="mt-5 rounded-2xl border border-[#EDE4D8] bg-white p-4 shadow-[0_5px_22px_rgba(75,48,35,0.045)] sm:p-5">
              <label htmlFor="kit-name" className="mb-2 block text-sm font-extrabold">
                Give your grocery kit a name
              </label>
              <input
                id="kit-name"
                value={kitName}
                onChange={(event) => setKitName(event.target.value)}
                maxLength={48}
                placeholder="e.g. My Monthly Grocery, Family Essentials"
                className="min-h-12 w-full rounded-xl border border-[#E7DED2] bg-[#FFFCF7] px-4 text-sm font-semibold outline-none transition placeholder:font-normal placeholder:text-[#9A8D81] focus:border-[#168447] focus:ring-4 focus:ring-[#168447]/10"
              />
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-base font-black">Add products</h2>
                  <p className="mt-0.5 text-xs text-[#776B61]">Choose from the existing Rashid Mega Mart catalogue.</p>
                </div>
                <span className="rounded-full bg-[#EEF7E9] px-3 py-1.5 text-xs font-bold text-[#168447]">{products.length} catalogue products</span>
              </div>
              <div className="mt-4 flex min-h-11 items-center gap-2 rounded-xl border border-[#E7DED2] bg-white px-3 focus-within:border-[#168447]">
                <Search size={17} className="shrink-0 text-[#8B7B70]" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search atta, rice, oil..."
                  aria-label="Search products"
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-[#9A8D81]"
                />
                {search && <button type="button" onClick={() => setSearch("")} className="text-xs font-bold text-[#800020]">Clear</button>}
              </div>
              <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-2">
                {["All", ...categories.map((item) => item.name)].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    aria-pressed={category === item}
                    className={`min-h-8 shrink-0 rounded-full border px-3 text-xs font-bold transition ${category === item ? "border-[#800020] bg-[#800020] text-white" : "border-[#E7DED2] bg-white text-[#675B52]"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {filteredProducts.map((product) => {
                  const quantity = selected[product.id] ?? 0;
                  return (
                    <article key={product.id} className="flex min-w-0 items-center gap-3 rounded-xl border border-[#F0E9DF] bg-[#FFFEFB] p-2.5">
                      <div className="relative size-[58px] shrink-0 overflow-hidden rounded-lg bg-[#F7F1E8]">
                        <Image src={product.image || "/hero.png"} alt={product.name} fill sizes="58px" className="object-contain p-1" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-extrabold">{product.name}</h3>
                        <p className="mt-0.5 truncate text-[11px] text-[#85786D]">{product.brand} · {product.packSize}</p>
                        <p className="mt-1 text-sm font-black text-[#800020]">{money(product.price)}</p>
                      </div>
                      {quantity === 0 ? (
                        <button type="button" onClick={() => changeQuantity(product, 1)} aria-label={`Add ${product.name}`} className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#168447] text-white shadow-sm transition hover:bg-[#116B39] active:scale-95">
                          <Plus size={18} />
                        </button>
                      ) : (
                        <div className="flex shrink-0 items-center gap-2 rounded-full bg-[#EEF7E9] p-1">
                          <button type="button" onClick={() => changeQuantity(product, -1)} aria-label={`Remove one ${product.name}`} className="flex size-7 items-center justify-center rounded-full bg-white text-[#168447]"><Minus size={14} /></button>
                          <span className="min-w-4 text-center text-xs font-black text-[#176C3D]">{quantity}</span>
                          <button type="button" onClick={() => changeQuantity(product, 1)} aria-label={`Add one ${product.name}`} className="flex size-7 items-center justify-center rounded-full bg-[#168447] text-white"><Plus size={14} /></button>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
              {filteredProducts.length === 0 && <p className="py-8 text-center text-sm text-[#85786D]">No matching products found.</p>}
            </section>

            <section className="sticky bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-20 mt-4 rounded-2xl border border-[#DDE9D1] bg-[#F2F8E9]/95 p-4 shadow-[0_8px_28px_rgba(35,74,40,0.12)] backdrop-blur-xl lg:bottom-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-[#56704F]">Your kit · {totalItems} items</p>
                  <p className="mt-0.5 text-2xl font-black text-[#800020]">{money(totalPrice)}</p>
                </div>
                <button type="button" onClick={saveKit} disabled={!isLoaded || selectedProducts.length === 0} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#800020] px-4 text-sm font-extrabold text-white shadow-md transition hover:bg-[#650019] disabled:cursor-not-allowed disabled:opacity-45">
                  <Check size={17} /> Save My Kit
                </button>
              </div>
              <button type="button" onClick={addKitToCart} disabled={selectedProducts.length === 0} className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#168447] bg-white text-sm font-extrabold text-[#168447] transition hover:bg-[#EAF5E6] disabled:cursor-not-allowed disabled:opacity-45">
                <ShoppingCart size={17} /> Add All to Cart
              </button>
            </section>
          </>
        ) : (
          <section className="mt-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black">Your saved grocery kits</h2>
                <p className="text-xs text-[#776B61]">Saved on this device for quick reuse.</p>
              </div>
              <button type="button" onClick={() => setActiveTab("create")} className="inline-flex min-h-9 items-center gap-1 rounded-full bg-[#800020] px-3 text-xs font-bold text-white"><Plus size={15} /> New kit</button>
            </div>
            {savedKits.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#DCCFC0] bg-white px-5 py-12 text-center">
                <ClipboardList size={34} className="mx-auto text-[#A83250]" />
                <h3 className="mt-3 font-extrabold">No saved kits yet</h3>
                <p className="mt-1 text-sm text-[#776B61]">Create your first kit with your favourite store products.</p>
                <button type="button" onClick={() => setActiveTab("create")} className="mt-4 rounded-xl bg-[#800020] px-5 py-2.5 text-sm font-bold text-white">Create my first kit</button>
              </div>
            ) : (
              savedKits.map((kit) => {
                const count = kit.items.reduce((sum, line) => sum + line.quantity, 0);
                const total = kit.items.reduce((sum, line) => {
                  const product = products.find((item) => item.id === line.productId);
                  return sum + (product?.price ?? 0) * line.quantity;
                }, 0);
                return (
                  <article key={kit.id} className="rounded-2xl border border-[#EDE4D8] bg-white p-4 shadow-[0_5px_22px_rgba(75,48,35,0.04)]">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-base font-black text-[#800020]">{kit.name}</h3>
                        <p className="mt-1 text-xs text-[#776B61]">{count} items · {money(total)}</p>
                      </div>
                      <button type="button" onClick={() => deleteKit(kit.id)} aria-label={`Delete ${kit.name}`} className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#FFF1F1] text-[#A83250]"><Trash2 size={16} /></button>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {kit.items.slice(0, 5).map((line) => {
                        const product = products.find((item) => item.id === line.productId);
                        return product ? <span key={line.productId} className="rounded-full bg-[#F5F0E9] px-2.5 py-1 text-[10px] font-semibold text-[#62574E]">{product.name} × {line.quantity}</span> : null;
                      })}
                      {kit.items.length > 5 && <span className="rounded-full bg-[#F5F0E9] px-2.5 py-1 text-[10px] font-semibold text-[#62574E]">+{kit.items.length - 5} more</span>}
                    </div>
                    <button type="button" onClick={() => loadKit(kit)} className="mt-4 flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#800020]/20 bg-[#FFF8F5] text-sm font-extrabold text-[#800020]"><PackagePlus size={16} /> Edit this kit</button>
                  </article>
                );
              })
            )}
          </section>
        )}

        {notice && (
          <div role="status" aria-live="polite" className="mt-4 flex items-start justify-between gap-3 rounded-xl border border-[#DDE9D1] bg-[#F2F8E9] px-4 py-3 text-xs font-semibold text-[#28643B]">
            <span>{notice}</span>
            <button type="button" onClick={() => setNotice("")} aria-label="Dismiss message" className="font-black">×</button>
          </div>
        )}
        <p className="mt-6 flex items-center justify-center gap-2 text-center text-[11px] text-[#8B7B70]"><CalendarDays size={14} /> Your saved kits stay in this browser on this device.</p>
      </div>
    </main>
  );
}
