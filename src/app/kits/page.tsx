
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Search,
  Package,
  X,
  SlidersHorizontal,
  RotateCcw,
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
    <main className="min-h-screen w-full overflow-x-clip bg-[#F8FAF7]">
      <section data-reveal className="relative isolate overflow-hidden border-b border-[#DDEBE0] bg-[#EAF5ED] px-4 pb-5 pt-5 sm:px-6 sm:pb-8 sm:pt-8 lg:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-white/60 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-4 sm:grid-cols-[1fr_220px] sm:gap-8 lg:grid-cols-[1fr_300px]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[.16em] text-[#52775D] hover:text-[#168447]">
              <ArrowLeft size={13} /> Back to home
            </Link>
            <p className="mt-4 text-[9px] font-extrabold uppercase tracking-[.18em] text-[#A27A2A] sm:text-[10px]">Thoughtfully packed for everyday homes</p>
            <h1 className="mt-1.5 text-2xl font-black leading-[1.05] tracking-[-.055em] text-[#1C3425] sm:text-4xl">Find your everyday <span className="text-[#168447]">grocery kit.</span></h1>
            <p className="mt-2 max-w-lg text-[11px] leading-5 text-[#607067] sm:text-sm sm:leading-6">Compare useful grocery combinations, check what’s inside and customise a kit before confirming your order.</p>
          </div>
          <div className="relative hidden aspect-[1.5/1] overflow-hidden rounded-[24px] border border-white/90 bg-white/70 p-2 shadow-[0_12px_34px_rgba(36,83,48,.08)] sm:block">
            <Image src="/hero.png" alt="Rashid Mega Mart grocery kits" fill priority sizes="300px" className="object-contain p-2" />
          </div>
        </div>
        <div className="relative mx-auto mt-4 flex h-11 max-w-7xl items-center gap-2.5 rounded-xl border border-white/90 bg-white px-3 shadow-[0_5px_18px_rgba(36,83,48,.06)] transition focus-within:border-[#168447] sm:mt-6 sm:h-12 sm:max-w-2xl sm:ml-[max(0px,calc((100vw-80rem)/2))]">
          <Search size={17} className="shrink-0 text-[#168447]" />
          <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search kits, rice, atta, dal..." aria-label="Search grocery kits" className="min-w-0 flex-1 bg-transparent text-xs text-[#203629] outline-none placeholder:text-[#8B978E] sm:text-sm" />
          {search && <button type="button" onClick={() => setSearch("")} aria-label="Clear search" className="rounded-full p-1.5 text-[#7A887D] hover:bg-[#EAF5ED]"><X size={15} /></button>}
        </div>
      </section>

      {/* KITS SECTION */}
      <section className="mx-auto w-full max-w-7xl px-3 pb-10 pt-5 sm:px-6 sm:pb-14 sm:pt-8 lg:px-8">
        {/* HEADING */}
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-lg font-black text-[#203629] sm:text-2xl">
              Shop Best-Value Kits
            </h2>

            <p className="mt-1 text-[10px] text-[#748278] sm:text-xs">
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
          <p className="mb-2 text-[10px] font-extrabold uppercase tracking-wider text-[#748278] sm:text-xs">
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
                className={`min-h-10 shrink-0 rounded-full border px-4 py-2 text-[11px] font-extrabold transition active:scale-95 sm:px-4 sm:text-xs ${
                  filter === option.value
                    ? "border-[#168447] bg-[#168447] text-white shadow-[0_5px_14px_rgba(22,132,71,.16)]"
                    : "border-[#E2EDE4] bg-white text-[#748278] hover:border-[#168447] hover:bg-[#F0F7F1]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* SORT AND RESULT COUNT */}
        <div className="mt-4 flex items-center justify-between gap-2 border-y border-[#E2EDE4] py-3 sm:mt-5">
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-[#748278] sm:text-xs">
              {filteredKits.length} Kits Found
            </p>
            <p className="mt-0.5 text-[9px] text-[#748278] sm:text-[10px]">
              Choose a kit that fits your family
            </p>
          </div>

          <label className="flex min-h-9 max-w-[190px] shrink-0 items-center gap-1.5 rounded-lg border border-[#E2EDE4] bg-white px-2.5 py-2 text-[10px] font-semibold text-[#748278] focus-within:border-[#168447] sm:max-w-none sm:gap-2 sm:rounded-xl sm:px-3 sm:text-xs">
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
          <div data-reveal-group className="mt-3 grid grid-cols-1 gap-2.5 min-[360px]:grid-cols-2 sm:mt-5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-3 2xl:grid-cols-4">
            {filteredKits.map((kit, index) => (
              <div key={kit.id} data-reveal-item><KitCard kit={kit} eagerImage={index === 0} /></div>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-[#E2EDE4] bg-white px-4 py-10 text-center shadow-sm sm:px-6 sm:py-12">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#EAF5ED] text-[#168447]">
              <Package size={28} />
            </div>

            <h3 className="mt-4 text-base font-extrabold text-[#203629] sm:text-lg">
              No kits found
            </h3>

            <p className="mt-2 text-xs text-[#748278] sm:text-sm">
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

      <section data-reveal className="mx-auto w-full max-w-7xl px-3 pb-28 sm:px-6 sm:pb-16 lg:px-8" aria-labelledby="kit-suggestion-title">
        <div className="overflow-hidden rounded-2xl border border-white/80 bg-white/85 p-4 shadow-[0_12px_34px_rgba(36,83,48,.07)] backdrop-blur-xl sm:rounded-3xl sm:p-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex rounded-full border border-[#168447]/15 bg-white/70 px-3 py-1 text-[10px] font-bold text-[#168447]">Your suggestion matters</span>
            <h2 id="kit-suggestion-title" className="mt-2 text-lg font-black text-[#203629] sm:text-2xl">Apni Grocery Kit Suggest Karein</h2>
            <p className="mt-1 text-xs leading-5 text-[#748278] sm:text-sm">Koi item ya kit chahiye jo yahan nahi mili? Humein batayein — hum aapki suggestion dekhenge.</p>
            <div className="mt-4 grid gap-2 text-left sm:grid-cols-[1fr_1.4fr]">
              <input value={suggestionName} onChange={(event) => setSuggestionName(event.target.value.slice(0, 60))} placeholder="Aapka naam (optional)" aria-label="Your name" className="min-h-10 rounded-xl border border-[#E2EDE4] bg-white/85 px-3 text-xs outline-none focus:border-[#168447]" />
              <textarea value={suggestion} onChange={(event) => setSuggestion(event.target.value.slice(0, 500))} placeholder="Kaun si kit ya grocery items chahiye? Quantity bhi likh sakte hain..." aria-label="Kit suggestion" rows={3} className="min-h-20 rounded-xl border border-[#E2EDE4] bg-white/85 px-3 py-2.5 text-xs outline-none focus:border-[#168447] sm:row-span-2" />
              <button type="button" disabled={!suggestion.trim()} onClick={() => { const message = ["Namaste Rashid Mega Mart, meri grocery kit suggestion:", suggestion.trim(), suggestionName.trim() ? "Name: " + suggestionName.trim() : ""].filter(Boolean).join("\n"); window.location.assign("https://wa.me/918962531603?text=" + encodeURIComponent(message)); }} className="min-h-10 rounded-xl bg-[#168447] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#106B38] disabled:cursor-not-allowed disabled:opacity-45">WhatsApp Par Suggest Karein</button>
            </div>
            <p className="mt-2 text-[10px] text-[#748278]">Suggestion WhatsApp par store ko bheji jayegi. Order ya price confirmation nahi hai.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
