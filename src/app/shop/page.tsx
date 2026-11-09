
"use client";

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
    <div className="min-h-screen min-w-0 overflow-x-clip bg-[#F5FAF5]">
      {/* SHOP HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#E8F5E9] via-[#D5F0DF] to-[#B7E4C7] px-3 py-8 sm:px-6 sm:py-14">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border-[28px] border-white/30" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#168447] sm:text-xs">
            Rashid Mega Mart
          </p>

          <h1 className="text-2xl font-extrabold leading-tight text-[#075C2B] min-[375px]:text-3xl sm:text-4xl">
            Freshness Starts Here
          </h1>

          <p className="mt-2 max-w-lg text-xs leading-5 text-[#53665A] sm:text-sm sm:leading-6">
            Explore everyday grocery essentials at great prices.
          </p>

          <div className="mt-5 flex min-h-12 w-full max-w-xl items-center gap-2.5 rounded-xl border border-white/80 bg-white px-3 py-2.5 text-[#202B24] shadow-[0_8px_24px_rgba(7,92,43,0.10)] sm:mt-6 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3">
            <Search size={19} className="shrink-0 text-[#168447]" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search groceries..."
              aria-label="Search groceries"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#98A69C]"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="flex size-8 shrink-0 items-center justify-center rounded-full transition hover:bg-[#E8F5E9]"
              >
                <X size={18} className="text-[#68756B]" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* SHOP CONTENT */}
      <section className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-4 sm:mb-5">
          <h2 className="text-lg font-extrabold text-[#202B24] sm:text-xl">
            Shop by Category
          </h2>
          <p className="mt-1 text-[11px] text-[#68756B] sm:text-xs">
            Find your everyday essentials easily.
          </p>
        </div>

        {/* CATEGORY FILTERS */}
        <div
          className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
          aria-label="Filter products by category"
        >
          {["All", ...categories.map((category) => category.name)].map(
            (category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
                className={`min-h-9 shrink-0 rounded-full px-3.5 py-2 text-[11px] font-bold transition active:scale-95 sm:px-4 sm:text-xs ${
                  selectedCategory === category
                    ? "border border-[#168447] bg-[#168447] text-white shadow-[0_3px_10px_rgba(22,132,71,0.18)]"
                    : "border border-[#DFEEE3] bg-white text-[#53665A] hover:border-[#95D5B2] hover:bg-[#E8F5E9] hover:text-[#075C2B]"
                }`}
              >
                {category}
              </button>
            )
          )}
        </div>

        {/* PRODUCTS HEADER */}
        <div className="mt-5 flex min-w-0 flex-col gap-3 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between sm:mt-6">
          <div className="min-w-0">
            <h2 className="text-lg font-extrabold text-[#202B24] sm:text-xl">
              All Groceries
            </h2>
            <p className="mt-1 text-[11px] text-[#68756B] sm:text-xs">
              {filteredProducts.length} products found
            </p>
          </div>

          <label className="flex min-h-10 w-full min-w-0 items-center gap-2 rounded-xl border border-[#DFEEE3] bg-white px-3 py-2 text-xs font-semibold text-[#53665A] transition focus-within:border-[#168447] min-[480px]:w-auto">
            <SlidersHorizontal size={15} className="shrink-0 text-[#168447]" />
            <span className="shrink-0">Sort:</span>

            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as SortOption)
              }
              className="min-w-0 flex-1 bg-transparent text-xs outline-none min-[480px]:max-w-40"
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
          <div className="mt-4 grid min-w-0 grid-cols-2 items-stretch gap-2.5 min-[480px]:gap-3 sm:mt-5 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="flex min-w-0 flex-col">
                <ProductCard product={product} />

                <button
                  type="button"
                  onClick={() => setSelectedProduct(product)}
                  className="mt-2 min-h-9 w-full rounded-lg border border-[#B7E4C7] bg-[#E8F5E9] px-2 py-2 text-[10px] font-bold text-[#075C2B] transition hover:border-[#168447] hover:bg-[#168447] hover:text-white active:scale-[0.98] sm:text-xs"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-7 rounded-2xl border border-[#DFEEE3] bg-white px-4 py-10 text-center shadow-sm sm:px-5 sm:py-12">
            <ShoppingBag
              size={36}
              className="mx-auto text-[#95D5B2]"
            />

            <h3 className="mt-4 text-base font-extrabold text-[#202B24] sm:text-lg">
              No products found
            </h3>

            <p className="mt-2 text-xs text-[#68756B] sm:text-sm">
              Try another search or category.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 min-h-10 rounded-xl bg-[#168447] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#075C2B] active:scale-95"
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
    </div>
  );
}
