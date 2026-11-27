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
  CheckCircle2,
  CircleMinus,
  ArrowRight,
  Sparkles,
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
      const searchableContent = [kit.name, kit.subtitle, kit.description, ...kit.items]
        .filter(Boolean).join(" ").toLowerCase();
      const matchesSearch = !query || searchableContent.includes(query);
      const matchesAvailability =
        filter === "all" ||
        (filter === "available" && kit.isAvailable) ||
        (filter === "unavailable" && !kit.isAvailable);
      return matchesSearch && matchesAvailability;
    });

    return [...result].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      const availabilityPriority = Number(Boolean(b.isAvailable)) - Number(Boolean(a.isAvailable));
      if (availabilityPriority !== 0) return availabilityPriority;
      return Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured));
    });
  }, [kits, search, filter, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setFilter("all");
    setSortBy("featured");
  };

  const hasActiveFilters = search.trim() !== "" || filter !== "all" || sortBy !== "featured";
  const availableCount = kits.filter((kit) => kit.isAvailable).length;

  return (
    <main className="min-h-screen w-full overflow-x-clip bg-[#FFF9ED] text-[#24231F]">
      {/* Premium grocery hero */}
      <section className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_50%_42%,#168447_0%,#08703A_55%,#064E2B_100%)] px-4 pb-8 pt-5 text-white sm:px-6 sm:pb-11 sm:pt-8 lg:pb-14">
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-16 size-64 rounded-full bg-[#B8D96B]/20 blur-3xl sm:size-96" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-20 size-72 rounded-full bg-[#F7C928]/10 blur-3xl sm:size-[28rem]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#064E2B]/45 to-transparent" />

        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          <div className="flex w-full items-center justify-center gap-3 sm:gap-5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#E9C85E]/70 bg-[#073F27]/75 text-xl font-serif text-white shadow-lg sm:size-14 sm:text-2xl">N</div>
            <span className="inline-flex min-h-9 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3.5 py-2 text-[8px] font-black tracking-[0.08em] text-white shadow-[0_8px_24px_rgba(0,0,0,.12)] backdrop-blur-md sm:min-h-11 sm:px-5 sm:text-[10px]">
              <ShoppingBag size={13} className="text-[#F7D66D]" />
              YOUR NEIGHBOURHOOD GROCERY STORE
            </span>
          </div>

          <div className="mt-5 sm:mt-7">
            <p className="mb-1 inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#F7D66D] sm:text-[11px]">
              <Sparkles size={13} /> Good food. Better value.
            </p>
            <h1 className="text-[clamp(2.15rem,9vw,4.8rem)] font-black leading-[0.98] tracking-[-0.065em] text-white">
              Grocery <span className="text-[#FFD64D]">Kits</span>
            </h1>
            <p className="mt-2 text-[13px] font-semibold text-white/90 sm:text-lg">Smart combos for every home</p>
            <p className="mx-auto mt-2 max-w-xl text-[11px] leading-5 text-white/75 sm:text-sm sm:leading-6">
              More essentials. Better value. One simple price.
            </p>
          </div>

          <div className="relative mt-4 flex h-[clamp(132px,42vw,245px)] w-full max-w-[620px] items-center justify-center sm:mt-5">
            <div aria-hidden="true" className="absolute bottom-3 left-1/2 h-5 w-[55%] -translate-x-1/2 rounded-full bg-black/25 blur-xl" />
            <Image
              src="/hero.png"
              alt="Rashid Mega Mart grocery storefront"
              fill
              priority
              sizes="(max-width: 640px) 100vw, 620px"
              className="object-contain drop-shadow-[0_18px_20px_rgba(0,0,0,.24)]"
            />
          </div>

          <label className="relative z-10 mt-3 flex min-h-[50px] w-full max-w-[760px] items-center gap-3 rounded-2xl border border-[#E6D7B6] bg-white px-4 text-[#17683A] shadow-[0_12px_35px_rgba(0,0,0,.2)] transition focus-within:border-[#F7C928] focus-within:ring-4 focus-within:ring-[#F7C928]/20 sm:mt-4 sm:min-h-[64px] sm:rounded-[20px] sm:px-6">
            <Search size={21} className="shrink-0 sm:size-6" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search grocery kits..."
              aria-label="Search grocery kits"
              className="min-w-0 flex-1 bg-transparent text-[14px] font-medium text-[#24231F] outline-none placeholder:text-[#8A8984] sm:text-base"
            />
            {search && (
              <button type="button" onClick={() => setSearch("")} aria-label="Clear search" className="rounded-full p-2 text-[#777] transition hover:bg-[#F2F4EC]">
                <X size={17} />
              </button>
            )}
          </label>
        </div>
      </section>

      {/* Discovery, filters and kits */}
      <section className="mx-auto w-full max-w-6xl px-3 pb-24 pt-7 sm:px-6 sm:pb-16 sm:pt-10 lg:px-8">
        <header className="text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-5">
            <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-transparent to-[#168447] sm:w-16" />
            <h2 className="text-[clamp(1.3rem,5.6vw,2.35rem)] font-black leading-tight tracking-[-0.045em] text-[#124D30]">
              Shop <span className="text-[#800020]">Best-Value</span> Kits
            </h2>
            <span aria-hidden="true" className="h-px w-8 bg-gradient-to-l from-transparent to-[#168447] sm:w-16" />
          </div>
          <p className="mt-1 text-[11px] font-bold text-[#766D60] sm:text-sm">{kits.length} curated kits</p>
          <p className="mt-1 text-[11px] text-[#756F65] sm:text-sm">Find the right essentials for your home</p>
        </header>

        <div className="mt-5 flex flex-col gap-4 sm:mt-7 sm:gap-5">
          <div>
            <p className="mb-2 px-1 text-[9px] font-black uppercase tracking-[0.16em] text-[#7C756B] sm:text-[10px]">Availability</p>
            <div className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:justify-center sm:gap-3 sm:px-0">
              {([
                { value: "all", label: "All Kits", count: kits.length, Icon: Package },
                { value: "available", label: "In Stock", count: availableCount, Icon: CheckCircle2 },
                { value: "unavailable", label: "Out of Stock", count: kits.length - availableCount, Icon: CircleMinus },
              ] as const).map(({ value, label, count, Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFilter(value)}
                  aria-pressed={filter === value}
                  className={`inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border px-4 text-[11px] font-extrabold transition-all duration-200 active:scale-[.97] sm:min-h-12 sm:px-5 sm:text-xs ${
                    filter === value
                      ? "border-[#08703A] bg-gradient-to-r from-[#168447] to-[#08703A] text-white shadow-[0_7px_18px_rgba(8,112,58,.22)]"
                      : "border-[#E9E0D0] bg-white text-[#5F5A52] shadow-[0_3px_10px_rgba(64,47,24,.04)] hover:border-[#A9C9A7]"
                  }`}
                >
                  <Icon size={14} />
                  {label}
                  <span className={`rounded-full px-2 py-0.5 text-[9px] ${filter === value ? "bg-white/20 text-white" : "bg-[#F3EFE6] text-[#70695E]"}`}>{count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 items-center justify-between gap-2 rounded-2xl border border-[#E8DEC9] bg-white/75 px-3 py-2.5 shadow-[0_4px_16px_rgba(64,47,24,.04)] sm:px-4 sm:py-3">
            <div className="min-w-0">
              <p className="text-[10px] font-extrabold text-[#3C493B] sm:text-xs">{filteredKits.length} Kits Found</p>
              <p className="mt-0.5 text-[9px] text-[#81796D] sm:text-[10px]">Choose a kit that fits your family</p>
            </div>
            <label className="flex min-h-9 max-w-[58%] shrink-0 items-center gap-2 rounded-xl border border-[#D9E4D5] bg-[#F8FBF5] px-2.5 text-[10px] font-bold text-[#315F35] sm:min-h-10 sm:px-3 sm:text-xs">
              <SlidersHorizontal size={14} className="shrink-0" />
              <span className="hidden min-[380px]:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortOption)}
                aria-label="Sort grocery kits"
                className="min-w-0 max-w-full bg-transparent text-[10px] font-extrabold text-[#343A32] outline-none sm:text-xs"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </label>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mt-3 flex justify-end">
            <button type="button" onClick={clearFilters} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold text-[#800020] transition hover:bg-[#800020]/[0.06]">
              <RotateCcw size={12} /> Reset filters
            </button>
          </div>
        )}

        {filteredKits.length > 0 ? (
          <div data-reveal-group className="mx-auto mt-4 grid w-full max-w-[760px] grid-cols-1 gap-5 sm:mt-6 sm:gap-7">
            {filteredKits.map((kit, index) => (
              <div key={kit.id} data-reveal-item className="min-w-0">
                <KitCard kit={kit} eagerImage={index === 0} />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-[#E8DEC9] bg-white px-5 py-12 text-center shadow-sm">
            <Package size={34} className="mx-auto text-[#168447]" />
            <h3 className="mt-3 text-lg font-black text-[#253126]">No kits found</h3>
            <p className="mt-1 text-xs text-[#777168]">Try another search or change the filters.</p>
            <button type="button" onClick={clearFilters} className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#168447] px-4 text-xs font-bold text-white">
              <RotateCcw size={13} /> Reset Filters
            </button>
          </div>
        )}
      </section>

      <section className="mx-auto w-full max-w-6xl px-3 pb-28 sm:px-6 sm:pb-16 lg:px-8">
        <div className="overflow-hidden rounded-[24px] border border-[#E8DEC9] bg-[linear-gradient(120deg,#FFFFFF_0%,#F5F1E5_100%)] p-4 shadow-[0_12px_34px_rgba(70,40,30,0.07)] sm:rounded-[28px] sm:p-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#168447]/15 bg-[#EAF3E9] px-3 py-1 text-[9px] font-extrabold text-[#168447]"><Sparkles size={12} /> YOUR SUGGESTION MATTERS</span>
            <h2 className="mt-2 text-lg font-black text-[#202124] sm:text-2xl">Apni Grocery Kit Suggest Karein</h2>
            <p className="mt-1 text-xs leading-5 text-[#686868] sm:text-sm">Koi item ya kit chahiye jo yahan nahi mili? Humein batayein.</p>
            <div className="mt-4 grid gap-2 text-left sm:grid-cols-[1fr_1.4fr]">
              <input value={suggestionName} onChange={(event) => setSuggestionName(event.target.value.slice(0, 60))} placeholder="Aapka naam (optional)" aria-label="Your name" className="min-h-11 rounded-xl border border-[#E8DFD1] bg-white px-3 text-xs outline-none focus:border-[#168447]" />
              <textarea value={suggestion} onChange={(event) => setSuggestion(event.target.value.slice(0, 500))} placeholder="Kaun si kit ya grocery items chahiye? Quantity bhi likh sakte hain..." aria-label="Kit suggestion" rows={3} className="min-h-20 rounded-xl border border-[#E8DFD1] bg-white px-3 py-2.5 text-xs outline-none focus:border-[#168447] sm:row-span-2" />
              <button type="button" disabled={!suggestion.trim()} onClick={() => { const message = ["Namaste Rashid Mega Mart, meri grocery kit suggestion:", suggestion.trim(), suggestionName.trim() ? "Name: " + suggestionName.trim() : ""].filter(Boolean).join("\n"); window.location.assign("https://wa.me/918962531603?text=" + encodeURIComponent(message)); }} className="min-h-11 rounded-xl bg-[#168447] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#106B38] disabled:cursor-not-allowed disabled:opacity-45">WhatsApp Par Suggest Karein</button>
            </div>
            <p className="mt-2 text-[10px] text-[#686868]">Suggestion WhatsApp par store ko bheji jayegi. Order ya price confirmation nahi hai.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
