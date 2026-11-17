
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
import { kits as allKits } from "@/data/kits";

type SortOption = "featured" | "price-low" | "price-high" | "name";

export default function KitsPage() {
  const kits = allKits;
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "available" | "unavailable">("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [suggestion, setSuggestion] = useState("");
  const [suggestionName, setSuggestionName] = useState("");

  const filteredKits = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = kits.filter((kit) => {
      const searchableContent = [
        kit.name,
        kit.subtitle,
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

      return matchesSearch && matchesAvailability;
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
  }, [kits, search, filter, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setFilter("all");
    setSortBy("featured");
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    filter !== "all" ||
    sortBy !== "featured";

  return (
    <main className="min-h-screen w-full overflow-x-clip bg-[radial-gradient(ellipse_at_8%_8%,rgba(181,18,50,0.08),transparent_30%),radial-gradient(ellipse_at_92%_24%,rgba(212,168,79,0.14),transparent_28%),linear-gradient(180deg,#FAF7EF_0%,#FAF7EF_48%,#FAF7EF_100%)]">
      {/* COMPACT HOME STYLE BANNER */}
      <section className="relative isolate overflow-hidden border-b border-[#F1EBDD] bg-[linear-gradient(125deg,#106B38_0%,#168447_58%,#800020_100%)] px-3 pb-5 pt-4 text-white shadow-[0_16px_45px_rgba(143,18,53,0.18)] sm:px-5 sm:pb-8 sm:pt-7">
        <div className="pointer-events-none absolute -left-16 top-5 h-40 w-40 rounded-full bg-white/10 blur-[65px]" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-40 w-40 rounded-full bg-[#FFD8A0]/20 blur-[65px]" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[9px] font-extrabold tracking-wide text-white shadow-lg backdrop-blur-xl sm:text-xs">
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
                Grocery <span className="text-[#F1EBDD]">Kits</span>
              </h1>
              <p className="text-[9px] font-medium text-white/80 sm:text-xs">
                Smart combos for every home
              </p>
            </div>
          </div>

          <p className="mt-2 max-w-md text-[10px] leading-5 text-white/80 sm:mt-3 sm:text-sm sm:leading-6">
            Special grocery combos. More essentials, one simple price.
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
          <div className="relative mt-3 flex h-11 w-full max-w-[520px] items-center gap-2.5 rounded-xl border border-white/70 bg-white px-3 shadow-[0_5px_20px_rgba(60,0,15,0.12)] transition focus-within:border-[#168447] sm:mt-5 sm:h-14 sm:rounded-2xl sm:px-4">
            <Search size={18} className="shrink-0 text-[#168447]" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search grocery kits..."
              aria-label="Search grocery kits"
              className="min-w-0 flex-1 bg-transparent text-xs text-[#202124] outline-none placeholder:text-[#686868] sm:text-sm"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="shrink-0 rounded-full p-1.5 transition hover:bg-[#E8F5E9]"
              >
                <X size={16} className="text-[#686868]" />
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
            <h2 className="text-lg font-black text-[#202124] sm:text-2xl">
              Shop Best-Value Kits
            </h2>

            <p className="mt-1 text-[10px] text-[#686868] sm:text-xs">
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
                    ? "border-[#106B38] bg-gradient-to-r from-[#168447] to-[#106B38] text-white shadow-[0_4px_14px_rgba(143,18,53,0.22)]"
                    : "border-[#F1EBDD] bg-white text-[#686868] hover:border-[#800020] hover:bg-[#F1EBDD]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* SORT AND RESULT COUNT */}
        <div className="mt-4 flex items-center justify-between gap-2 border-y border-[#F1EBDD] py-3 sm:mt-5">
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-[#686868] sm:text-xs">
              {filteredKits.length} Kits Found
            </p>
            <p className="mt-0.5 text-[9px] text-[#686868] sm:text-[10px]">
              Choose a kit that fits your family
            </p>
          </div>

          <label className="flex min-h-9 max-w-[190px] shrink-0 items-center gap-1.5 rounded-lg border border-[#F1EBDD] bg-white px-2.5 py-2 text-[10px] font-semibold text-[#686868] focus-within:border-[#168447] sm:max-w-none sm:gap-2 sm:rounded-xl sm:px-3 sm:text-xs">
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
          <div className="mt-6 rounded-2xl border border-[#F1EBDD] bg-white px-4 py-10 text-center shadow-sm sm:px-6 sm:py-12">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#EAF3E9] text-[#168447]">
              <Package size={28} />
            </div>

            <h3 className="mt-4 text-base font-extrabold text-[#202124] sm:text-lg">
              No kits found
            </h3>

            <p className="mt-2 text-xs text-[#686868] sm:text-sm">
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

      <section className="mx-auto w-full max-w-7xl px-3 pb-28 sm:px-6 sm:pb-16 lg:px-8" aria-labelledby="kit-suggestion-title">
        <div className="overflow-hidden rounded-2xl border border-white/80 bg-white/55 p-4 shadow-[0_12px_34px_rgba(70,40,30,0.08)] backdrop-blur-xl sm:rounded-3xl sm:p-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex rounded-full border border-[#168447]/15 bg-white/70 px-3 py-1 text-[10px] font-bold text-[#168447]">Your suggestion matters</span>
            <h2 id="kit-suggestion-title" className="mt-2 text-lg font-black text-[#202124] sm:text-2xl">Apni Grocery Kit Suggest Karein</h2>
            <p className="mt-1 text-xs leading-5 text-[#766B63] sm:text-sm">Koi item ya kit chahiye jo yahan nahi mili? Humein batayein — hum aapki suggestion dekhenge.</p>
            <div className="mt-4 grid gap-2 text-left sm:grid-cols-[1fr_1.4fr]">
              <input value={suggestionName} onChange={(event) => setSuggestionName(event.target.value.slice(0, 60))} placeholder="Aapka naam (optional)" aria-label="Your name" className="min-h-10 rounded-xl border border-[#E8DFD1] bg-white/85 px-3 text-xs outline-none focus:border-[#168447]" />
              <textarea value={suggestion} onChange={(event) => setSuggestion(event.target.value.slice(0, 500))} placeholder="Kaun si kit ya grocery items chahiye? Quantity bhi likh sakte hain..." aria-label="Kit suggestion" rows={3} className="min-h-20 rounded-xl border border-[#E8DFD1] bg-white/85 px-3 py-2.5 text-xs outline-none focus:border-[#168447] sm:row-span-2" />
              <button type="button" disabled={!suggestion.trim()} onClick={() => { const message = ["Namaste Rashid Mega Mart, meri grocery kit suggestion:", suggestion.trim(), suggestionName.trim() ? "Name: " + suggestionName.trim() : ""].filter(Boolean).join("\n"); window.location.assign("https://wa.me/918962531603?text=" + encodeURIComponent(message)); }} className="min-h-10 rounded-xl bg-[#168447] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#106B38] disabled:cursor-not-allowed disabled:opacity-45">WhatsApp Par Suggest Karein</button>
            </div>
            <p className="mt-2 text-[10px] text-[#8B8078]">Suggestion WhatsApp par store ko bheji jayegi. Order ya price confirmation nahi hai.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
