
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Package,
  X,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";
import KitCard from "@/components/KitCard";
import { kits } from "@/data/kits";

type AvailabilityFilter = "all" | "available" | "unavailable";
type SortOption = "featured" | "price-low" | "price-high" | "name";

export default function KitsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<AvailabilityFilter>("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const kitCategories = useMemo(
    () =>
      Array.from(
        new Set(
          kits
            .map((kit) => {
              const category = (kit as (typeof kit & { category?: string }))
                .category;
              return category?.trim();
            })
            .filter((category): category is string => Boolean(category))
        )
      ),
    []
  );

  const filteredKits = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = kits.filter((kit) => {
      const matchesSearch =
        !query ||
        kit.name.toLowerCase().includes(query) ||
        kit.subtitle.toLowerCase().includes(query) ||
        kit.items.some((item) => item.toLowerCase().includes(query));

      const matchesAvailability =
        filter === "all" ||
        (filter === "available" && kit.isAvailable) ||
        (filter === "unavailable" && !kit.isAvailable);

      const category = (kit as (typeof kit & { category?: string })).category;
      const matchesCategory =
        selectedCategory === "All" || category === selectedCategory;

      return matchesSearch && matchesAvailability && matchesCategory;
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
          return Number(Boolean(b.isAvailable)) - Number(Boolean(a.isAvailable));
      }
    });
  }, [search, filter, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setFilter("all");
    setSelectedCategory("All");
    setSortBy("featured");
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    filter !== "all" ||
    selectedCategory !== "All" ||
    sortBy !== "featured";

  return (
    <main className="min-h-screen w-full overflow-x-clip bg-[#F5FAF5]">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#E8F5E9] via-[#D5F0DF] to-[#B7E4C7] px-4 py-9 sm:px-6 sm:py-14 lg:py-16">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border-[25px] border-white/30 sm:h-64 sm:w-64" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-white/30" />

        <div className="relative mx-auto w-full max-w-7xl">
          <div className="mb-3 flex items-center gap-2 text-[#168447]">
            <Package size={18} />

            <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.2em]">
              Rashid Mega Mart
            </span>
          </div>

          <h1 className="max-w-xl text-[27px] font-extrabold leading-[1.2] text-[#075C2B] sm:text-4xl lg:text-5xl">
            Grocery Kits for Every Home
          </h1>

          <p className="mt-3 max-w-lg text-xs leading-6 text-[#53665A] sm:text-sm">
            Smart grocery combos with everyday essentials in one convenient kit.
          </p>

          {/* Search */}
          <div className="mt-5 flex h-12 w-full max-w-xl items-center gap-3 rounded-xl border border-white/80 bg-white px-3 text-[#202B24] shadow-[0_8px_24px_rgba(7,92,43,0.10)] sm:mt-7 sm:h-14 sm:rounded-2xl sm:px-4">
            <Search size={19} className="shrink-0 text-[#168447]" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search grocery kits..."
              aria-label="Search grocery kits"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#98A69C]"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="shrink-0 rounded-full p-1 transition hover:bg-[#E8F5E9]"
              >
                <X size={18} className="text-[#68756B]" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Kits */}
      <section className="mx-auto w-full max-w-7xl px-3 py-7 sm:px-6 sm:py-10 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col gap-4 min-[480px]:flex-row min-[480px]:items-end min-[480px]:justify-between">
          <div className="min-w-0">
            <h2 className="text-xl font-extrabold text-[#202B24] sm:text-2xl">
              Our Grocery Kits
            </h2>

            <p className="mt-1 text-xs text-[#68756B]">
              {filteredKits.length} of {kits.length} kits found
            </p>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex min-h-9 w-fit items-center gap-1.5 rounded-full border border-[#B7E4C7] bg-white px-3 py-2 text-xs font-bold text-[#168447] transition hover:bg-[#E8F5E9]"
            >
              <RotateCcw size={13} />
              Reset Filters
            </button>
          )}
        </div>

        {/* Availability Filters */}
        <div className="mt-5">
          <p className="mb-2 text-[11px] font-bold text-[#68756B]">
            Availability
          </p>

          <div className="flex flex-wrap gap-2">
            {(
              [
                { value: "all", label: "All Kits" },
                { value: "available", label: "In Stock" },
                { value: "unavailable", label: "Out of Stock" },
              ] as const
            ).map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFilter(option.value)}
                aria-pressed={filter === option.value}
                className={`min-h-9 rounded-full border px-4 py-2 text-xs font-bold transition active:scale-95 ${
                  filter === option.value
                    ? "border-[#168447] bg-[#168447] text-white shadow-sm"
                    : "border-[#DFEEE3] bg-white text-[#53665A] hover:border-[#95D5B2] hover:bg-[#E8F5E9]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        {kitCategories.length > 0 && (
          <div className="mt-5">
            <p className="mb-2 text-[11px] font-bold text-[#68756B]">
              Category
            </p>

            <div className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-2 sm:mx-0 sm:px-0">
              {["All", ...kitCategories].map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={selectedCategory === category}
                  className={`min-h-9 shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition active:scale-95 ${
                    selectedCategory === category
                      ? "border-[#168447] bg-[#168447] text-white"
                      : "border-[#DFEEE3] bg-white text-[#53665A] hover:border-[#95D5B2] hover:bg-[#E8F5E9]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sort */}
        <div className="mt-5 flex flex-col gap-2 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between">
          <p className="text-xs text-[#68756B]">
            Showing {filteredKits.length} kits
          </p>

          <label className="flex min-h-10 w-full items-center gap-2 rounded-xl border border-[#DFEEE3] bg-white px-3 py-2 text-xs font-semibold text-[#53665A] focus-within:border-[#168447] min-[480px]:w-auto">
            <SlidersHorizontal
              size={15}
              className="shrink-0 text-[#168447]"
            />

            <span className="shrink-0">Sort:</span>

            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as SortOption)
              }
              aria-label="Sort grocery kits"
              className="min-w-0 flex-1 bg-transparent text-xs outline-none min-[480px]:max-w-44"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </label>
        </div>

        {/* Kits Grid */}
        {filteredKits.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-4 min-[560px]:grid-cols-2 sm:mt-7 sm:gap-5 lg:grid-cols-3 2xl:grid-cols-4">
            {filteredKits.map((kit) => (
              <KitCard key={kit.id} kit={kit} />
            ))}
          </div>
        ) : (
          <div className="mt-7 rounded-2xl border border-[#DFEEE3] bg-white px-4 py-12 text-center shadow-sm sm:px-6">
            <Package
              size={38}
              className="mx-auto text-[#95D5B2]"
            />

            <h3 className="mt-4 text-lg font-extrabold text-[#202B24]">
              No kits found
            </h3>

            <p className="mt-2 text-sm text-[#68756B]">
              Try another search or change the filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#168447] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#075C2B] active:scale-95"
            >
              <RotateCcw size={14} />
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
