
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Search,
  Package,
  X,
  SlidersHorizontal,
  RotateCcw,
  ShoppingBag,
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
            .map((kit) => kit.category?.trim())
            .filter((category): category is string => Boolean(category))
        )
      ),
    []
  );

  const filteredKits = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = kits.filter((kit) => {
      const searchableContent = [
        kit.name,
        kit.subtitle,
        kit.category,
        kit.description,
        ...kit.items,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableContent.includes(query);

      const matchesAvailability =
        filter === "all" ||
        (filter === "available" && kit.isAvailable) ||
        (filter === "unavailable" && !kit.isAvailable);

      const matchesCategory =
        selectedCategory === "All" ||
        kit.category === selectedCategory;

      return (
        matchesSearch &&
        matchesAvailability &&
        matchesCategory
      );
    });

    return [...result].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;

        case "price-high":
          return b.price - a.price;

        case "name":
          return a.name.localeCompare(b.name);

        default: {
          const availabilityPriority =
            Number(Boolean(b.isAvailable)) -
            Number(Boolean(a.isAvailable));

          if (availabilityPriority !== 0) {
            return availabilityPriority;
          }

          return (
            Number(Boolean(b.isFeatured)) -
            Number(Boolean(a.isFeatured))
          );
        }
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
    <main className="min-h-screen w-full overflow-x-clip bg-[#F7F9F7]">
      {/* COMPACT HOME STYLE BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EAF5ED] via-white to-[#F7F9F7] px-3 pb-5 pt-4 text-[#202B24] sm:px-5 sm:pb-8 sm:pt-7">
        <div className="pointer-events-none absolute -left-16 top-5 h-40 w-40 rounded-full bg-[#168447]/10 blur-[65px]" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-40 w-40 rounded-full bg-[#F5D9A8]/25 blur-[65px]" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#DDECE0] bg-white/90 px-3 py-1.5 text-[9px] font-extrabold tracking-wide text-[#168447] shadow-sm sm:text-xs">
            <ShoppingBag size={12} />
            YOUR NEIGHBOURHOOD GROCERY STORE
          </span>

          <div className="mt-2 flex items-center gap-2 sm:mt-3">
            <Image
              src="/images/logo.png"
              alt="Rashid Mega Mart Logo"
              width={60}
              height={60}
              priority
              className="h-10 w-10 object-contain sm:h-14 sm:w-14"
            />

            <div className="text-left">
              <h1 className="text-lg font-black leading-tight sm:text-2xl">
                Grocery <span className="text-[#168447]">Kits</span>
              </h1>
              <p className="text-[9px] font-medium text-[#647067] sm:text-xs">
                Smart combos for every home
              </p>
            </div>
          </div>

          <p className="mt-2 max-w-md text-[10px] leading-5 text-[#647067] sm:mt-3 sm:text-sm sm:leading-6">
            Everyday grocery essentials, thoughtfully packed together at great value.
          </p>

          {/* HERO IMAGE */}
          <div className="relative mt-3 w-full max-w-[360px] sm:mt-5 sm:max-w-[480px]">
            <div className="relative mx-auto h-[105px] w-full overflow-hidden rounded-xl sm:h-[190px] sm:rounded-2xl">
              <Image
                src="/hero.png"
                alt="Rashid Mega Mart grocery shopping"
                fill
                priority
                sizes="(max-width: 640px) 100vw, 480px"
                className="object-contain"
              />
            </div>
          </div>

          {/* SEARCH */}
          <div className="relative mt-3 flex h-11 w-full max-w-[520px] items-center gap-2.5 rounded-xl border border-[#DDECE0] bg-white px-3 shadow-[0_5px_20px_rgba(7,92,43,0.07)] transition focus-within:border-[#168447] sm:mt-5 sm:h-14 sm:rounded-2xl sm:px-4">
            <Search size={18} className="shrink-0 text-[#168447]" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search grocery kits..."
              aria-label="Search grocery kits"
              className="min-w-0 flex-1 bg-transparent text-xs text-[#202B24] outline-none placeholder:text-[#98A69C] sm:text-sm"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="shrink-0 rounded-full p-1.5 transition hover:bg-[#E8F5E9]"
              >
                <X size={16} className="text-[#68756B]" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* KITS SECTION */}
      <section className="mx-auto w-full max-w-7xl px-3 pb-8 pt-4 sm:px-6 sm:pb-12 sm:pt-7 lg:px-8">
        {/* HEADING */}
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-lg font-black text-[#202B24] sm:text-2xl">
              Explore Grocery Kits
            </h2>

            <p className="mt-1 text-[10px] text-[#68756B] sm:text-xs">
              {filteredKits.length} of {kits.length} kits found
            </p>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="rmm-button-secondary min-h-9 shrink-0 rounded-lg px-2.5 py-2 text-[10px] sm:rounded-full sm:px-3 sm:text-xs"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          )}
        </div>

        {/* AVAILABILITY FILTERS */}
        <div className="mt-4 sm:mt-6">
          <p className="mb-2 text-[10px] font-extrabold uppercase tracking-wider text-[#819087] sm:text-xs">
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
                className={`min-h-9 rounded-full border px-3.5 py-2 text-[10px] font-extrabold transition active:scale-95 sm:px-4 sm:text-xs ${
                  filter === option.value
                    ? "border-[#168447] bg-gradient-to-r from-[#168447] to-[#087039] text-white shadow-[0_4px_12px_rgba(22,132,71,0.20)]"
                    : "border-[#DFEEE3] bg-white text-[#53665A] hover:border-[#95D5B2] hover:bg-[#E8F5E9]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* CATEGORY FILTERS */}
        {kitCategories.length > 0 && (
          <div className="mt-4 sm:mt-5">
            <p className="mb-2 text-[10px] font-extrabold uppercase tracking-wider text-[#819087] sm:text-xs">
              Browse Categories
            </p>

            <div className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0">
              {["All", ...kitCategories].map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={selectedCategory === category}
                  className={`min-h-9 shrink-0 rounded-full border px-3.5 py-2 text-[10px] font-bold transition active:scale-95 sm:text-xs ${
                    selectedCategory === category
                      ? "border-[#168447] bg-[#E5F5E9] text-[#087039] shadow-sm"
                      : "border-[#DFEEE3] bg-white text-[#53665A] hover:border-[#95D5B2] hover:bg-[#F0F8F1]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SORT AND RESULT COUNT */}
        <div className="mt-4 flex items-center justify-between gap-2 border-y border-[#E5ECE6] py-3 sm:mt-5">
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-[#53665A] sm:text-xs">
              {filteredKits.length} Kits Found
            </p>
            <p className="mt-0.5 text-[9px] text-[#98A69C] sm:text-[10px]">
              Find the right combo for your home
            </p>
          </div>

          <label className="flex min-h-9 max-w-[190px] shrink-0 items-center gap-1.5 rounded-lg border border-[#DFEEE3] bg-white px-2.5 py-2 text-[10px] font-semibold text-[#53665A] focus-within:border-[#168447] sm:max-w-none sm:gap-2 sm:rounded-xl sm:px-3 sm:text-xs">
            <SlidersHorizontal size={14} className="shrink-0 text-[#168447]" />

            <span className="shrink-0">Sort:</span>

            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as SortOption)
              }
              aria-label="Sort grocery kits"
              className="min-w-0 max-w-[115px] bg-transparent text-[10px] font-bold outline-none sm:max-w-44 sm:text-xs"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </label>
        </div>

        {/* KITS GRID */}
        {filteredKits.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-2.5 min-[480px]:gap-3 sm:mt-6 sm:grid-cols-3 sm:gap-5 lg:grid-cols-3 2xl:grid-cols-4">
            {filteredKits.map((kit, index) => (
              <KitCard key={kit.id} kit={kit} eagerImage={index === 0} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-[#DFEEE3] bg-white px-4 py-10 text-center shadow-sm sm:px-6 sm:py-12">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#EAF7EE] text-[#168447]">
              <Package size={28} />
            </div>

            <h3 className="mt-4 text-base font-extrabold text-[#202B24] sm:text-lg">
              No kits found
            </h3>

            <p className="mt-2 text-xs text-[#68756B] sm:text-sm">
              Try another search or change the filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="rmm-button-primary mt-5 min-h-10 rounded-xl px-5 py-2.5 text-xs"
            >
              <RotateCcw size={13} />
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
