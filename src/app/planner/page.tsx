"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ClipboardList,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import { products as initialProducts, type Product } from "@/data/products";
import { categories } from "@/data/categories";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type KitLine = { productId: string; quantity: number };
type SavedKit = {
  id: string;
  name: string;
  items: KitLine[];
  updatedAt: string;
};

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function PlannerPage() {
  const { addCustomKitToCart } = useCart();
  const [kitName, setKitName] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [catalogProducts, setCatalogProducts] = useState<Product[]>(initialProducts);
  const [catalogCategories, setCatalogCategories] = useState<string[]>(categories.map((item) => item.name));
  const [savedKits, setSavedKits] = useState<SavedKit[]>([]);
  const [activeTab, setActiveTab] = useState<"create" | "saved">("create");
  const [notice, setNotice] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [editingKitId, setEditingKitId] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authBusy, setAuthBusy] = useState(false);

  useEffect(() => {
    let active = true;
    try {
      const supabase = getSupabaseBrowserClient();
      supabase.auth.getSession().then(async ({ data, error }) => {
        if (!active) return;
        let resolvedProducts: Product[] = initialProducts;
        const [{ data: productRows, error: productError }, { data: categoryRows }] = await Promise.all([
          supabase.from("products").select("id,name,brand,category_id,pack_size,price,old_price,image,description,is_featured,is_best_seller,is_available,stock").eq("is_available", true).order("name"),
          supabase.from("categories").select("id,name").eq("is_active", true).order("sort_order"),
        ]);
        if (!productError && productRows) {
          const categoryNames = new Map((categoryRows ?? []).map((row) => [row.id, row.name]));
          resolvedProducts = productRows.map((row) => ({
            id: row.id, name: row.name, brand: row.brand ?? "", category: categoryNames.get(row.category_id ?? "") ?? "Other",
            categoryId: row.category_id ?? "", packSize: row.pack_size ?? "", price: Number(row.price),
            oldPrice: row.old_price == null ? undefined : Number(row.old_price), image: row.image ?? "",
            description: row.description ?? "", isFeatured: row.is_featured, isBestSeller: row.is_best_seller,
            isAvailable: row.is_available, stock: row.stock ?? undefined,
          }));
          setCatalogProducts(resolvedProducts);
        } else if (productError) {
          setNotice("Live catalogue could not load. Showing the saved catalogue copy. " + productError.message);
        }
        if (categoryRows?.length) setCatalogCategories(categoryRows.map((row) => row.name));
        if (error) setNotice(error.message);
        const user = data.session?.user;
        setCurrentUserId(user?.id ?? null);
        if (user) {
          const { data: rows, error: queryError } = await supabase
            .from("customer_saved_kits")
            .select("id,name,items,updated_at")
            .eq("user_id", user.id)
            .order("updated_at", { ascending: false });
          if (queryError) setNotice(queryError.message);
          else if (active) {
            const saved = (rows ?? []).map((row) => ({
              id: row.id, name: row.name, items: row.items as KitLine[], updatedAt: row.updated_at,
            }));
            setSavedKits(saved);
            const requestedKitId = new URLSearchParams(window.location.search).get("kit");
            const requestedKit = saved.find((kit) => kit.id === requestedKitId);
            if (requestedKit) {
              const next: Record<string, number> = {};
              for (const line of requestedKit.items) {
                const product = resolvedProducts.find((item) => item.id === line.productId);
                if (product?.isAvailable) next[product.id] = line.quantity;
              }
              setSelected(next);
              setKitName(requestedKit.name);
              setEditingKitId(requestedKit.id);
              setActiveTab("create");
            }
          }
        }
        if (active) setIsLoaded(true);
      });
      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (active) {
          setCurrentUserId(session?.user.id ?? null);
          if (!session) setSavedKits([]);
        }
      });
      return () => { active = false; listener.subscription.unsubscribe(); };
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Supabase configuration is missing.";
      queueMicrotask(() => {
        if (active) {
          setNotice(message);
          setIsLoaded(true);
        }
      });
      return () => { active = false; };
    }
  }, []);

  const selectedProducts = useMemo(
    () =>
      catalogProducts.filter(
        (product) => (selected[product.id] ?? 0) > 0 && product.isAvailable
      ),
    [selected, catalogProducts]
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
    return catalogProducts
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
  }, [search, category, catalogProducts]);

  const changeQuantity = (product: Product, delta: number) => {
    setSelected((current) => {
      const next = Math.max(0, Math.min(99, (current[product.id] ?? 0) + delta));
      const copy = { ...current };
      if (next === 0) delete copy[product.id];
      else copy[product.id] = next;
      return copy;
    });
  };

  const saveKit = async () => {
    const name = kitName.trim();
    if (!name) { setNotice("Please enter a name for your grocery kit."); return; }
    if (selectedProducts.length === 0) { setNotice("Add at least one product before saving your kit."); return; }
    if (!currentUserId) { setShowAuth(true); return; }

    const kitId = editingKitId ?? crypto.randomUUID();
    const kitItems = selectedProducts.map((product) => ({ productId: product.id, quantity: selected[product.id] }));
    try {
      const { data, error } = await getSupabaseBrowserClient()
        .from("customer_saved_kits")
        .upsert({ id: kitId, user_id: currentUserId, name, items: kitItems, updated_at: new Date().toISOString() })
        .select("id,name,items,updated_at")
        .single();
      if (error) throw error;
      const saved: SavedKit = { id: data.id, name: data.name, items: data.items as KitLine[], updatedAt: data.updated_at };
      setSavedKits((current) => [saved, ...current.filter((item) => item.id !== saved.id)]);
      setEditingKitId(saved.id);
      setActiveTab("saved");
      setNotice("Your kit is saved securely in your account.");
    } catch (cause) {
      setNotice(cause instanceof Error ? cause.message : "Unable to save your kit.");
    }
  };

  const loadKit = (kit: SavedKit) => {
    const next: Record<string, number> = {};
    for (const line of kit.items) {
      const product = catalogProducts.find((item) => item.id === line.productId);
      if (product?.isAvailable) next[product.id] = line.quantity;
    }
    setSelected(next);
    setKitName(kit.name);
    setEditingKitId(kit.id);
    setActiveTab("create");
    setNotice(`"${kit.name}" is ready to edit.`);
  };

  const deleteKit = async (id: string) => {
    if (!currentUserId) return;
    const { error } = await getSupabaseBrowserClient().from("customer_saved_kits").delete().eq("id", id).eq("user_id", currentUserId);
    if (error) { setNotice(error.message); return; }
    setSavedKits((current) => current.filter((kit) => kit.id !== id));
    setNotice("Saved kit deleted.");
  };

  const submitPlannerAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setAuthBusy(true); setNotice("");
    try {
      const supabase = getSupabaseBrowserClient();
      const response = authMode === "signup"
        ? await supabase.auth.signUp({ email: authEmail.trim(), password: authPassword, options: { emailRedirectTo: window.location.origin + "/planner" } })
        : await supabase.auth.signInWithPassword({ email: authEmail.trim(), password: authPassword });
      if (response.error) throw response.error;
      if (!response.data.session) {
        setNotice("Account create ho gaya. Email verification link check karein, phir login karke Save My Kit karein.");
        setAuthMode("login");
        return;
      }
      setCurrentUserId(response.data.session.user.id);
      const { data: rows, error: queryError } = await supabase.from("customer_saved_kits").select("id,name,items,updated_at").eq("user_id", response.data.session.user.id).order("updated_at", { ascending: false });
      if (queryError) throw queryError;
      setSavedKits((rows ?? []).map((row) => ({ id: row.id, name: row.name, items: row.items as KitLine[], updatedAt: row.updated_at })));
      setShowAuth(false);
      setNotice("Login successful. Ab Save My Kit dobara press karein.");
    } catch (cause) {
      setNotice(cause instanceof Error ? cause.message : "Login failed. Please try again.");
    } finally { setAuthBusy(false); }
  };

  const addKitToCart = () => {
    if (selectedProducts.length === 0) {
      setNotice("Choose products for your kit first.");
      return;
    }
    addCustomKitToCart({
      id: editingKitId ?? crypto.randomUUID(),
      name: kitName.trim() || "My Grocery Kit",
      items: selectedProducts.map((product) => ({
        product: { id: product.id, name: product.name, price: product.price, image: product.image, brand: product.brand, packSize: product.packSize },
        quantity: selected[product.id] ?? 1,
      })),
    });
    setNotice(`${totalItems} items added to your cart as a kit.`);
  };

  return (
    <main className="min-h-screen bg-[#FAFAF7] pb-28 text-[#292B25]">
      <div className="mx-auto max-w-4xl px-3 pb-8 pt-5 sm:px-6 sm:pt-8">
        <header className="border-b border-[#E9E8DF] pb-5">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#56764D]">Rashid Mega Mart</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Build your grocery list</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#6F7067]">Choose the products you need, set their quantities and add everything to your cart together.</p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {["1. Choose items","2. Set quantity","3. Add to cart"].map((step) => (
              <div key={step} className="rounded-xl bg-[#EEF3E9] px-2 py-3 text-[11px] font-bold text-[#426B43] sm:text-xs">{step}</div>
            ))}
          </div>
        </header>

        <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl bg-[#F0EFE9] p-1">
          <button type="button" onClick={() => setActiveTab("create")} className={`min-h-11 rounded-lg text-sm font-bold transition ${activeTab === "create" ? "bg-white text-[#315F35] shadow-sm" : "text-[#77776E]"}`}>Choose products</button>
          <button type="button" onClick={() => setActiveTab("saved")} className={`min-h-11 rounded-lg text-sm font-bold transition ${activeTab === "saved" ? "bg-white text-[#315F35] shadow-sm" : "text-[#77776E]"}`}>Saved lists ({savedKits.length})</button>
        </div>

        {activeTab === "create" ? (
          <>
            <section className="mt-5">
              <div className="flex items-end justify-between gap-3">
                <div><h2 className="text-lg font-extrabold">Choose your products</h2><p className="mt-1 text-xs text-[#77776E]">Tap + to add an item. You can change quantity anytime.</p></div>
                <span className="shrink-0 text-xs font-semibold text-[#77776E]">{filteredProducts.length} products</span>
              </div>
              <div className="mt-4 flex min-h-11 items-center gap-2 rounded-xl border border-[#E5E3DA] bg-white px-3 focus-within:border-[#56814C]">
                <Search size={17} className="shrink-0 text-[#85867C]" />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search rice, atta, oil..." aria-label="Search products" className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-[#99998F]" />
                {search && <button type="button" onClick={() => setSearch("")} className="text-xs font-bold text-[#315F35]">Clear</button>}
              </div>
              <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-2">
                {["All", ...catalogCategories].map((item) => (
                  <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={`min-h-9 shrink-0 rounded-full border px-3 text-xs font-bold ${category === item ? "border-[#315F35] bg-[#315F35] text-white" : "border-[#E5E3DA] bg-white text-[#65665D]"}`}>{item}</button>
                ))}
              </div>
              <div className="mt-2 space-y-2">
                {filteredProducts.map((product) => {
                  const quantity = selected[product.id] ?? 0;
                  return (
                    <article key={product.id} className="flex items-center gap-3 rounded-xl border border-[#EAE9E1] bg-white p-3">
                      <div className="relative size-[62px] shrink-0 overflow-hidden rounded-lg bg-[#F7F6F0]">
                        <Image src={product.image || "/hero.png"} alt={product.name} fill sizes="62px" className="object-contain p-1" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-bold">{product.name}</h3>
                        <p className="mt-0.5 truncate text-xs text-[#85867C]">{product.brand}{product.packSize ? ` · ${product.packSize}` : ""}</p>
                        <p className="mt-1 text-sm font-extrabold text-[#315F35]">{money(product.price)}</p>
                      </div>
                      {quantity === 0 ? (
                        <button type="button" onClick={() => changeQuantity(product, 1)} aria-label={`Add ${product.name}`} className="flex min-h-9 min-w-9 items-center justify-center rounded-lg bg-[#315F35] text-white"><Plus size={18}/></button>
                      ) : (
                        <div className="flex items-center gap-2 rounded-lg bg-[#EEF3E9] p-1">
                          <button type="button" onClick={() => changeQuantity(product, -1)} aria-label={`Remove one ${product.name}`} className="flex size-7 items-center justify-center rounded-md bg-white text-[#315F35]"><Minus size={14}/></button>
                          <span className="min-w-4 text-center text-sm font-bold">{quantity}</span>
                          <button type="button" onClick={() => changeQuantity(product, 1)} aria-label={`Add one ${product.name}`} className="flex size-7 items-center justify-center rounded-md bg-[#315F35] text-white"><Plus size={14}/></button>
                        </div>
                      )}
                    </article>
                  );
                })}
                {filteredProducts.length === 0 && <p className="rounded-xl bg-white px-4 py-8 text-center text-sm text-[#77776E]">No products found. Try another search.</p>}
              </div>
            </section>

            <section className="mt-5 rounded-xl border border-[#E5E7DC] bg-white p-4">
              <label htmlFor="kit-name" className="block text-sm font-bold">Save this list for later <span className="font-normal text-[#85867C]">(optional)</span></label>
              <input id="kit-name" value={kitName} onChange={(event) => setKitName(event.target.value)} maxLength={48} placeholder="e.g. Monthly groceries, Home essentials" className="mt-2 min-h-11 w-full rounded-lg border border-[#E5E3DA] px-3 text-sm outline-none focus:border-[#56814C]" />
              <p className="mt-1.5 text-[11px] leading-4 text-[#85867C]">To save and reuse this list, sign in to your account.</p>
              <button type="button" onClick={() => void saveKit()} disabled={!isLoaded || selectedProducts.length === 0} className="mt-3 min-h-10 w-full rounded-lg border border-[#315F35] text-sm font-bold text-[#315F35] disabled:opacity-40">Save list to my account</button>
            </section>

            <section className="sticky bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-20 mt-4 rounded-xl border border-[#DDE6D6] bg-white p-4 shadow-[0_5px_24px_rgba(30,55,30,0.12)] lg:bottom-4">
              <div className="flex items-center justify-between gap-3">
                <div><p className="text-xs font-semibold text-[#77776E]">{totalItems} items selected</p><p className="mt-0.5 text-2xl font-black text-[#315F35]">{money(totalPrice)}</p></div>
                <button type="button" onClick={addKitToCart} disabled={selectedProducts.length === 0} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#315F35] px-4 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"><ShoppingCart size={17}/> Add to cart</button>
              </div>
            </section>
          </>
        ) : (
          <section className="mt-5 space-y-3">
            <div><h2 className="text-lg font-extrabold">Your saved lists</h2><p className="mt-1 text-xs text-[#77776E]">Open a list to change quantities or add it to your cart.</p></div>
            {savedKits.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#D8D8CC] bg-white px-5 py-10 text-center">
                <ClipboardList size={30} className="mx-auto text-[#56764D]"/>
                <h3 className="mt-3 text-sm font-bold">No saved lists yet</h3>
                <p className="mt-1 text-xs text-[#77776E]">Your saved grocery lists will appear here.</p>
                <button type="button" onClick={() => setActiveTab("create")} className="mt-4 min-h-10 rounded-lg bg-[#315F35] px-4 text-sm font-bold text-white">Create a list</button>
              </div>
            ) : savedKits.map((kit) => {
              const count = kit.items.reduce((sum, line) => sum + line.quantity, 0);
              const total = kit.items.reduce((sum, line) => { const product = catalogProducts.find((item) => item.id === line.productId); return sum + (product?.price ?? 0) * line.quantity; }, 0);
              return (
                <article key={kit.id} className="rounded-xl border border-[#EAE9E1] bg-white p-4">
                  <div className="flex items-start justify-between gap-3"><div className="min-w-0"><h3 className="truncate text-sm font-extrabold">{kit.name}</h3><p className="mt-1 text-xs text-[#77776E]">{count} items · {money(total)}</p></div><button type="button" onClick={() => deleteKit(kit.id)} aria-label={`Delete ${kit.name}`} className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#F8F1EF] text-[#8A554B]"><Trash2 size={16}/></button></div>
                  <div className="mt-3 flex flex-wrap gap-1.5">{kit.items.slice(0,5).map((line) => { const product = catalogProducts.find((item) => item.id === line.productId); return product ? <span key={line.productId} className="rounded-full bg-[#F4F3ED] px-2.5 py-1 text-[10px] text-[#62635A]">{product.name} × {line.quantity}</span> : null; })}{kit.items.length > 5 && <span className="rounded-full bg-[#F4F3ED] px-2.5 py-1 text-[10px] text-[#62635A]">+{kit.items.length - 5} more</span>}</div>
                  <button type="button" onClick={() => loadKit(kit)} className="mt-4 min-h-10 w-full rounded-lg border border-[#315F35] text-sm font-bold text-[#315F35]">Open this list</button>
                </article>
              );
            })}
          </section>
        )}

        {showAuth && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 px-4 py-8" role="dialog" aria-modal="true" aria-labelledby="planner-auth-title">
            <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl">
              <div className="flex items-start justify-between gap-3"><div><h2 id="planner-auth-title" className="text-lg font-black">Sign in to save your list</h2><p className="mt-1 text-xs text-[#77776E]">Your grocery list will be saved to your account.</p></div><button type="button" onClick={() => setShowAuth(false)} aria-label="Close login" className="text-xl text-[#77776E]">×</button></div>
              <form onSubmit={submitPlannerAuth} className="mt-4 space-y-3">
                <input required type="email" value={authEmail} onChange={(event) => setAuthEmail(event.target.value)} placeholder="Email address" className="min-h-11 w-full rounded-lg border border-[#E5E3DA] px-3 text-sm outline-none focus:border-[#56814C]"/>
                <input required minLength={8} type="password" value={authPassword} onChange={(event) => setAuthPassword(event.target.value)} placeholder="Password (minimum 8 characters)" className="min-h-11 w-full rounded-lg border border-[#E5E3DA] px-3 text-sm outline-none focus:border-[#56814C]"/>
                <button disabled={authBusy} type="submit" className="min-h-11 w-full rounded-lg bg-[#315F35] text-sm font-bold text-white disabled:opacity-50">{authBusy ? "Please wait..." : authMode === "login" ? "Login" : "Create account"}</button>
              </form>
              <button type="button" onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")} className="mt-3 text-xs font-bold text-[#315F35]">{authMode === "login" ? "New customer? Create account" : "Already registered? Login"}</button>
            </div>
          </div>
        )}
        {notice && <div role="status" aria-live="polite" className="mt-4 flex items-start justify-between gap-3 rounded-lg border border-[#E5E7DC] bg-[#F2F6EC] px-4 py-3 text-xs font-semibold text-[#426B43]"><span>{notice}</span><button type="button" onClick={() => setNotice("")} aria-label="Dismiss message" className="font-black">×</button></div>}
      </div>
    </main>
  );
}
