"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Pencil,
  Package,
  Trash2,
  X,
  Save,
  ShoppingBag,
} from "lucide-react";
import { products as initialProducts, type Product } from "@/data/products";

const STORAGE_KEY = "rmm-admin-products-v1";

type ProductForm = {
  name: string;
  brand: string;
  category: string;
  packSize: string;
  price: string;
  oldPrice: string;
  description: string;
  image: string;
  isAvailable: boolean;
};

const emptyForm: ProductForm = {
  name: "",
  brand: "",
  category: "",
  packSize: "",
  price: "",
  oldPrice: "",
  description: "",
  image: "",
  isAvailable: true,
};

const inputClass =
  "mt-1.5 min-h-11 w-full rounded-xl border border-[#EADDE0] bg-white px-3 text-sm text-[#33232A] outline-none transition placeholder:text-[#B5A5AA] focus:border-[#A47A2C] focus:ring-2 focus:ring-[#A47A2C]/10";

export default function AdminProductsPage() {
  const [items, setItems] = useState<Product[]>(initialProducts);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) setItems(parsed as Product[]);
      }
    } catch {
      setError("Saved product data could not be read. Default catalogue is shown.");
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      setError("Browser storage is full. Product changes may not be saved.");
    }
  }, [items, loaded]);

  const filteredProducts = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return items;
    return items.filter((product) =>
      [product.name, product.brand, product.category, product.packSize]
        .some((value) => value.toLowerCase().includes(term))
    );
  }, [items, query]);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setIsModalOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      brand: product.brand,
      category: product.category,
      packSize: product.packSize,
      price: String(product.price),
      oldPrice: product.oldPrice === undefined ? "" : String(product.oldPrice),
      description: product.description,
      image: product.image,
      isAvailable: product.isAvailable,
    });
    setError("");
    setIsModalOpen(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const price = Number(form.price);
    const oldPrice = form.oldPrice.trim() ? Number(form.oldPrice) : undefined;

    if (!form.name.trim() || !form.category.trim() || !form.packSize.trim()) {
      setError("Product name, category aur pack size required hain.");
      return;
    }
    if (!Number.isFinite(price) || price <= 0) {
      setError("Valid selling price enter karein.");
      return;
    }
    if (oldPrice !== undefined && (!Number.isFinite(oldPrice) || oldPrice <= price)) {
      setError("MRP selling price se zyada hona chahiye.");
      return;
    }

    const product: Product = {
      id: editingId ?? `product-${Date.now()}`,
      name: form.name.trim(),
      brand: form.brand.trim() || "Rashid Mega Mart",
      category: form.category.trim(),
      packSize: form.packSize.trim(),
      price,
      ...(oldPrice === undefined ? {} : { oldPrice }),
      image: form.image.trim() || "/images/products/product-placeholder.png",
      description: form.description.trim(),
      isAvailable: form.isAvailable,
      ...(editingId
        ? {
            isFeatured: items.find((item) => item.id === editingId)?.isFeatured,
            isBestSeller: items.find((item) => item.id === editingId)?.isBestSeller,
          }
        : {}),
    };

    setItems((current) =>
      editingId
        ? current.map((item) => (item.id === editingId ? product : item))
        : [product, ...current]
    );
    setIsModalOpen(false);
    setForm(emptyForm);
    setError("");
  };

  const deleteProduct = (product: Product) => {
    const confirmed = window.confirm(`Delete "${product.name}" from this admin catalogue?`);
    if (!confirmed) return;
    setItems((current) => current.filter((item) => item.id !== product.id));
  };

  const toggleAvailability = (product: Product) => {
    setItems((current) =>
      current.map((item) =>
        item.id === product.id ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A47A2C]">Catalogue management</p>
          <h1 className="mt-1 text-2xl font-black text-[#800020] sm:text-3xl">Products</h1>
          <p className="mt-1 text-sm text-[#766D72]">Add products and manage catalogue details.</p>
        </div>
        <button type="button" onClick={openAdd} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#800020] px-4 text-xs font-bold text-white transition hover:bg-[#650019]">
          <Plus size={15} /> Add product
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex min-h-11 flex-1 items-center gap-2 rounded-xl border border-[#F0E4E5] bg-white px-3 text-[#9A858B] sm:max-w-md">
          <Search size={16} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, brand or category..." className="w-full bg-transparent text-sm text-[#33232A] outline-none placeholder:text-[#B5A5AA]" />
        </label>
        <span className="text-xs font-semibold text-[#766D72]">{filteredProducts.length} of {items.length} products</span>
      </div>

      {error && !isModalOpen && (
        <p role="status" className="rounded-xl border border-[#F0D5D9] bg-[#FFF5F6] px-3 py-2 text-xs text-[#800020]">{error}</p>
      )}

      <div className="overflow-hidden rounded-2xl border border-[#F0E4E5] bg-white">
        <div className="flex items-center justify-between border-b border-[#F5ECEE] px-4 py-4">
          <h2 className="text-sm font-extrabold text-[#33232A]">Product catalogue</h2>
          <span className="rounded-full bg-[#FFF1F3] px-2.5 py-1 text-[10px] font-bold text-[#800020]">{items.length} products</span>
        </div>
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
            <Package size={28} className="text-[#A47A2C]" />
            <p className="text-sm font-bold text-[#33232A]">No products found</p>
            <p className="text-xs text-[#9A858B]">Search term change karein ya new product add karein.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#F5ECEE]">
            {filteredProducts.map((product) => (
              <div key={product.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 sm:grid-cols-[minmax(0,1fr)_90px_105px_auto]">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF7E8] text-[#A47A2C]"><Package size={18} /></span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-[#33232A]">{product.name}</p>
                    <p className="mt-1 truncate text-[10px] text-[#9A858B]">{product.brand} · {product.category} · {product.packSize}</p>
                    <button type="button" onClick={() => toggleAvailability(product)} className={`mt-1 rounded-full px-2 py-0.5 text-[9px] font-bold sm:hidden ${product.isAvailable ? "bg-[#EAF7EF] text-[#167344]" : "bg-[#FFF1F3] text-[#800020]"}`}>
                      {product.isAvailable ? "Available" : "Unavailable"} · tap to change
                    </button>
                  </div>
                </div>
                <span className="hidden text-xs font-bold text-[#33232A] sm:block">₹{product.price}</span>
                <button type="button" onClick={() => toggleAvailability(product)} className={`hidden rounded-full px-2.5 py-1.5 text-[10px] font-bold sm:block ${product.isAvailable ? "bg-[#EAF7EF] text-[#167344]" : "bg-[#FFF1F3] text-[#800020]"}`}>
                  {product.isAvailable ? "Available" : "Unavailable"}
                </button>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => openEdit(product)} aria-label={`Edit ${product.name}`} className="inline-flex min-h-9 items-center gap-1 rounded-lg border border-[#F0E4E5] px-2.5 text-[10px] font-bold text-[#800020] transition hover:bg-[#FFF7F8]">
                    <Pencil size={12} /> Edit
                  </button>
                  <button type="button" onClick={() => deleteProduct(product)} aria-label={`Delete ${product.name}`} className="inline-flex size-9 items-center justify-center rounded-lg border border-[#F0E4E5] text-[#9A858B] transition hover:border-red-200 hover:bg-red-50 hover:text-red-600">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-xl border border-[#F0E4E5] bg-[#FFFBF6] p-3 text-[11px] leading-5 text-[#766D72]">
        <p className="font-bold text-[#800020]">Frontend preview storage</p>
        Changes are saved in this browser only. They are not synced to the customer shop, another device, or a database. Secure owner login and backend integration are still pending.
      </div>

      <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-bold text-[#800020] underline underline-offset-4">
        <ShoppingBag size={14} /> Open customer shop
      </Link>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#24151B]/55 p-0 backdrop-blur-sm sm:items-center sm:p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsModalOpen(false); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="product-form-title" className="max-h-[92dvh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-[#FFFCFA] p-5 shadow-2xl sm:rounded-3xl sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A47A2C]">Catalogue</p>
                <h2 id="product-form-title" className="mt-1 text-xl font-black text-[#800020]">{editingId ? "Edit product" : "Add new product"}</h2>
              </div>
              <button type="button" onClick={() => setIsModalOpen(false)} aria-label="Close form" className="flex size-9 items-center justify-center rounded-full border border-[#F0E4E5] text-[#766D72]"><X size={17} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-xs font-bold text-[#59464D]">Product name *<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className={inputClass} placeholder="e.g. Premium Basmati Rice" /></label>
                <label className="text-xs font-bold text-[#59464D]">Brand<input value={form.brand} onChange={(event) => setForm({ ...form, brand: event.target.value })} className={inputClass} placeholder="Brand name" /></label>
                <label className="text-xs font-bold text-[#59464D]">Category *<input required value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className={inputClass} placeholder="e.g. Rice & Grains" /></label>
                <label className="text-xs font-bold text-[#59464D]">Pack size *<input required value={form.packSize} onChange={(event) => setForm({ ...form, packSize: event.target.value })} className={inputClass} placeholder="e.g. 1 kg" /></label>
                <label className="text-xs font-bold text-[#59464D]">Selling price (₹) *<input required min="0.01" step="0.01" type="number" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} className={inputClass} placeholder="0" /></label>
                <label className="text-xs font-bold text-[#59464D]">MRP / old price (₹)<input min="0.01" step="0.01" type="number" value={form.oldPrice} onChange={(event) => setForm({ ...form, oldPrice: event.target.value })} className={inputClass} placeholder="Optional" /></label>
              </div>
              <label className="block text-xs font-bold text-[#59464D]">Image path / URL<input value={form.image} onChange={(event) => setForm({ ...form, image: event.target.value })} className={inputClass} placeholder="/images/products/your-image.png" /></label>
              <label className="block text-xs font-bold text-[#59464D]">Description<textarea rows={3} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className={inputClass} placeholder="Short product description" /></label>
              <label className="flex items-center gap-2 text-xs font-semibold text-[#59464D]">
                <input type="checkbox" checked={form.isAvailable} onChange={(event) => setForm({ ...form, isAvailable: event.target.checked })} className="size-4 accent-[#800020]" />
                Product available for sale
              </label>
              {error && <p role="alert" className="rounded-lg bg-[#FFF1F3] px-3 py-2 text-xs text-[#800020]">{error}</p>}
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="min-h-11 flex-1 rounded-xl border border-[#EADDE0] text-xs font-bold text-[#766D72]">Cancel</button>
                <button type="submit" className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#800020] text-xs font-bold text-white transition hover:bg-[#650019]"><Save size={15} /> {editingId ? "Save changes" : "Add product"}</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
