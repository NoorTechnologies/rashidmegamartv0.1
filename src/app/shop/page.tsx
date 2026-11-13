
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  ShoppingBag,
} from "lucide-react";

import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import { products, type Product } from "@/data/products";
import { categories } from "@/data/categories";

type SortOption = "featured" | "price-low" | "price-high" | "name";

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.brand.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    return [...result].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured));
      }
    });
  }, [search, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSortBy("featured");
  };

  return (
    <main className="min-h-screen min-w-0 overflow-x-clip bg-[#FFF9D8]/30">

      {/* COMPACT SHOP HERO */}
      <section className="relative overflow-hidden border-b border-[#D4A84F]/20 bg-gradient-to-br from-[#FEF9C3] via-white to-[#F8F0E8]">
        <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full border-[18px] border-[#D4A84F]/10" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-3 pb-4 pt-3 sm:px-6 sm:pb-6 sm:pt-5">

          {/* Hero image */}
          <div className="relative h-[112px] w-full max-w-[330px] sm:h-[165px] sm:max-w-[470px]">
            <Image
              src="/hero.png"
              alt="Rashid Mega Mart groceries"
              fill
              priority
              sizes="(max-width: 640px) 330px, 470px"
              className="object-contain"
            />
          </div>

          {/* Heading */}
          <div className="mt-1 text-center">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#A47A2C] sm:text-[10px]">
              RASHID MEGA MART
            </p>

            <h1 className="mt-1 text-xl font-black tracking-tight text-[#800020] sm:text-3xl">
              Shop Groceries
            </h1>

            <p className="mt-1 text-[10px] font-medium text-[#6A7282] sm:text-xs">
              Everyday essentials at great prices
            </p>
          </div>

          {/* Search */}
          <div className="mt-3 flex min-h-10 w-full max-w-xl items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-3 shadow-[0_4px_14px_rgba(128,0,32,0.06)] transition focus-within:border-[#D4A84F] sm:mt-4 sm:min-h-12 sm:rounded-2xl">
            <Search size={17} className="shrink-0 text-[#800020]" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search groceries..."
              aria-label="Search groceries"
              className="min-w-0 flex-1 bg-transparent py-2 text-xs text-[#171717] outline-none placeholder:text-[#99A1AF] sm:text-sm"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="flex size-7 shrink-0 items-center justify-center rounded-full hover:bg-[#FFF9D8]"
              >
                <X size={16} className="text-[#6A7282]" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* SHOP CONTENT */}
      <section className="mx-auto w-full max-w-7xl px-3 pb-6 pt-4 sm:px-6 sm:pb-10 sm:pt-6 lg:px-8">

        {/* CATEGORY TITLE */}
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-[#171717] sm:text-base">
            Shop by Category
          </h2>

          <span className="text-[10px] font-semibold text-[#A47A2C]">
            Explore
          </span>
        </div>

        {/* CATEGORY FILTERS */}
        <div
          className="-mx-3 flex gap-1.5 overflow-x-auto px-3 pb-2 sm:-mx-6 sm:gap-2 sm:px-6 lg:mx-0 lg:px-0"
          aria-label="Filter products by category"
        >
          {["All", ...categories.map((category) => category.name)].map(
            (category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
                className={`min-h-8 shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-bold transition active:scale-95 sm:px-4 sm:text-xs ${
                  selectedCategory === category
                    ? "border-[#800020] bg-[#800020] text-white shadow-sm"
                    : "border-[#E5E7EB] bg-white text-[#4A5565] hover:border-[#D4A84F] hover:text-[#800020]"
                }`}
              >
                {category}
              </button>
            )
          )}
        </div>

        {/* PRODUCTS HEADER */}
        <div className="mt-3 flex min-w-0 items-center justify-between gap-2 border-b border-[#E5E7EB] pb-2.5 sm:mt-5">

          <div className="min-w-0">
            <h2 className="text-sm font-extrabold text-[#171717] sm:text-lg">
              All Groceries
            </h2>

            <p className="mt-0.5 text-[10px] text-[#6A7282] sm:text-xs">
              {filteredProducts.length} products found
            </p>
          </div>

          <label className="flex min-h-8 min-w-0 items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-2 sm:min-h-9 sm:gap-2 sm:px-3">
            <SlidersHorizontal
              size={13}
              className="shrink-0 text-[#800020]"
            />

            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as SortOption)
              }
              className="min-w-0 max-w-[118px] bg-transparent text-[10px] font-semibold text-[#364153] outline-none sm:max-w-none sm:text-xs"
              aria-label="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </label>
        </div>

        {/* PRODUCT GRID */}
        {filteredProducts.length > 0 ? (
          <div className="mt-3 grid min-w-0 grid-cols-2 items-stretch gap-2 sm:mt-4 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {filteredProducts.map((product) => (
              <div key={product.id} className="flex min-w-0 flex-col">
                <ProductCard product={product} />

                <button
                  type="button"
                  onClick={() => setSelectedProduct(product)}
                  className="mt-1.5 min-h-8 w-full rounded-lg border border-[#D4A84F]/50 bg-white px-2 py-1.5 text-[10px] font-bold text-[#800020] transition hover:border-[#800020] hover:bg-[#800020] hover:text-white active:scale-[0.98] sm:mt-2 sm:min-h-9 sm:text-xs"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-xl border border-[#E5E7EB] bg-white px-4 py-8 text-center shadow-sm sm:py-10">
            <ShoppingBag
              size={30}
              className="mx-auto text-[#D4A84F]"
            />

            <h3 className="mt-3 text-sm font-extrabold text-[#171717] sm:text-base">
              No products found
            </h3>

            <p className="mt-1 text-[11px] text-[#6A7282] sm:text-xs">
              Try another search or category.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 min-h-9 rounded-lg bg-[#800020] px-5 py-2 text-xs font-bold text-white transition hover:bg-[#35120D] active:scale-95"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      <ProductModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}
