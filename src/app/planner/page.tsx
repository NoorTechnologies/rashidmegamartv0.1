"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  CalendarDays,
  Check,
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
      setNotice(cause instanceof Error ? cause.message : "Supabase configuration is missing.");
      setIsLoaded(true);
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
                <span className="rounded-full bg-[#EEF7E9] px-3 py-1.5 text-xs font-bold text-[#168447]">{catalogProducts.length} catalogue products</span>
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
                {["All", ...catalogCategories].map((item) => (
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
                <button type="button" onClick={() => void saveKit()} disabled={!isLoaded || selectedProducts.length === 0} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#800020] px-4 text-sm font-extrabold text-white shadow-md transition hover:bg-[#650019] disabled:cursor-not-allowed disabled:opacity-45">
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
                <p className="text-xs text-[#776B61]">Saved privately in your account.</p>
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
                  const product = catalogProducts.find((item) => item.id === line.productId);
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

        {showAuth && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#21171A]/45 px-4 py-8" role="dialog" aria-modal="true" aria-labelledby="planner-auth-title">
            <div className="w-full max-w-sm rounded-2xl border border-[#EDE4D8] bg-white p-5 shadow-2xl">
              <div className="flex items-start justify-between gap-3">
                <div><h2 id="planner-auth-title" className="text-lg font-black text-[#30251F]">Login to save your kit</h2><p className="mt-1 text-xs text-[#776B61]">Your custom kits will stay private in your account.</p></div>
                <button type="button" onClick={() => setShowAuth(false)} aria-label="Close login" className="text-xl text-[#85786D]">×</button>
              </div>
              <form onSubmit={submitPlannerAuth} className="mt-4 space-y-3">
                <input required type="email" value={authEmail} onChange={(event) => setAuthEmail(event.target.value)} placeholder="Email address" className="min-h-11 w-full rounded-xl border border-[#E7DED2] px-3 text-sm outline-none focus:border-[#168447]" />
                <input required minLength={8} type="password" value={authPassword} onChange={(event) => setAuthPassword(event.target.value)} placeholder="Password (minimum 8 characters)" className="min-h-11 w-full rounded-xl border border-[#E7DED2] px-3 text-sm outline-none focus:border-[#168447]" />
                <button disabled={authBusy} type="submit" className="min-h-11 w-full rounded-xl bg-[#800020] text-sm font-extrabold text-white disabled:opacity-50">{authBusy ? "Please wait..." : authMode === "login" ? "Login" : "Create Account"}</button>
              </form>
              <button type="button" onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")} className="mt-3 text-xs font-bold text-[#800020]">{authMode === "login" ? "New customer? Create account" : "Already registered? Login"}</button>
            </div>
          </div>
        )}
        {notice && (
          <div role="status" aria-live="polite" className="mt-4 flex items-start justify-between gap-3 rounded-xl border border-[#DDE9D1] bg-[#F2F8E9] px-4 py-3 text-xs font-semibold text-[#28643B]">
            <span>{notice}</span>
            <button type="button" onClick={() => setNotice("")} aria-label="Dismiss message" className="font-black">×</button>
          </div>
        )}
        <p className="mt-6 flex items-center justify-center gap-2 text-center text-[11px] text-[#8B7B70]"><CalendarDays size={14} /> Your saved kits are linked to your account.</p>
      </div>
    </main>
  );
}
