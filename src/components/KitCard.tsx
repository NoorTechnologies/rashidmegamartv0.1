"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Coffee,
  CookingPot,
  Droplets,
  Leaf,
  Package,
  ShoppingCart,
  Tag,
  Wheat,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { GroceryKit } from "@/data/kits";
import {
  useSiteLanguage,
  toEnglishCatalogue,
  toHinglishCatalogue,
} from "@/components/LanguageProvider";

interface KitCardProps {
  kit: GroceryKit;
  eagerImage?: boolean;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

const getCategoryVisual = (category: string) => {
  const value = category.toLowerCase();
  if (value.includes("breakfast")) return { Icon: Coffee, tint: "from-[#FFF1D8] to-[#F9E4C0]", ink: "text-[#98601D]", label: "Breakfast picks" };
  if (value.includes("oil") || value.includes("cooking")) return { Icon: Droplets, tint: "from-[#E8F4D9] to-[#D7E9C5]", ink: "text-[#527B32]", label: "Cooking essentials" };
  if (value.includes("spice")) return { Icon: Leaf, tint: "from-[#F8E9D8] to-[#EFD7BD]", ink: "text-[#9B5B2C]", label: "Spices & masala" };
  if (value.includes("monthly") || value.includes("mega")) return { Icon: Package, tint: "from-[#E5ECF8] to-[#D5E1F4]", ink: "text-[#4C6797]", label: "Family stock-up" };
  if (value.includes("family") || value.includes("premium")) return { Icon: CookingPot, tint: "from-[#F3E8F4] to-[#E8D9EC]", ink: "text-[#80518C]", label: "Family essentials" };
  return { Icon: Wheat, tint: "from-[#EAF5ED] to-[#D5EBDD]", ink: "text-[#287347]", label: "Daily essentials" };
};

export default function KitCard({ kit }: KitCardProps) {
  const { addToCart, items } = useCart();
  const isInCart = items.some((item) => item.id === kit.id);
  const language = useSiteLanguage();
  const displayCatalogue = (value: string) =>
    language === "en"
      ? toEnglishCatalogue(value)
      : language === "hinglish"
        ? toHinglishCatalogue(value)
        : value;

  const savings = kit.oldPrice && kit.oldPrice > kit.price
    ? kit.oldPrice - kit.price
    : 0;
  const discount = kit.oldPrice && kit.oldPrice > kit.price
    ? Math.round((savings / kit.oldPrice) * 100)
    : 0;
  const visibleItems = kit.items.slice(0, 4);
  const remainingItems = Math.max(0, kit.items.length - visibleItems.length);
  const visual = getCategoryVisual(kit.category);
  const CategoryIcon = visual.Icon;

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[22px] border border-[#E2EDE4] bg-white shadow-[0_5px_22px_rgba(27,68,39,.055)] transition duration-300 hover:-translate-y-1 hover:border-[#C8E0CD] hover:shadow-[0_16px_34px_rgba(27,68,39,.11)] sm:rounded-[26px]">
      <Link href={`/kits/${kit.id}`} aria-label={`View ${kit.name} details`} className="block">
        <div className={`relative isolate aspect-[1.35/1] overflow-hidden bg-gradient-to-br ${visual.tint}`}>
          <div aria-hidden="true" className="absolute -right-8 -top-10 size-36 rounded-full border-[18px] border-white/25" />
          <div aria-hidden="true" className="absolute -bottom-12 -left-8 size-36 rounded-full bg-white/30 blur-xl" />
          <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full border border-white/80 bg-white/85 px-2.5 py-1 text-[8px] font-black uppercase tracking-[.13em] text-[#365A40] shadow-sm sm:left-4 sm:top-4 sm:text-[9px]">
            <Package size={11} /> {kit.items.length} items
          </span>
          {discount > 0 && (
            <span className="absolute right-3 top-3 z-10 rounded-full bg-[#D94C43] px-2.5 py-1 text-[8px] font-black tracking-wide text-white shadow-sm sm:right-4 sm:top-4 sm:text-[9px]">
              {discount}% OFF
            </span>
          )}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-3">
            <span className={`grid size-[76px] place-items-center rounded-[26px] border border-white/80 bg-white/70 shadow-[0_12px_30px_rgba(50,80,50,.10)] backdrop-blur-sm transition duration-300 group-hover:scale-105 sm:size-[92px] sm:rounded-[30px] ${visual.ink}`}>
              <CategoryIcon size={42} strokeWidth={1.35} className="sm:hidden" />
              <CategoryIcon size={50} strokeWidth={1.35} className="hidden sm:block" />
            </span>
            <span className="mt-3 rounded-full border border-white/80 bg-white/70 px-3 py-1 text-[8px] font-extrabold uppercase tracking-[.16em] text-[#4C6552] backdrop-blur-sm sm:text-[9px]">
              {visual.label}
            </span>
          </div>
          <span className="absolute bottom-3 left-3 text-[9px] font-bold text-[#42614A]/75 sm:bottom-4 sm:left-4">RASHID MEGA MART</span>
        </div>
      </Link>

      <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link href={`/kits/${kit.id}`}>
              <h3 className="line-clamp-2 text-[13px] font-black leading-[1.25] tracking-[-.025em] text-[#203629] transition-colors group-hover:text-[#168447] sm:text-[16px]">{kit.name}</h3>
            </Link>
            <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-[#7A887D] sm:text-[11px]">{displayCatalogue(kit.subtitle)}</p>
          </div>
          {kit.isAvailable ? (
            <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full bg-[#EAF5ED] px-2 py-1 text-[8px] font-extrabold text-[#287347] sm:text-[9px]">
              <span className="size-1.5 rounded-full bg-[#168447]" /> In stock
            </span>
          ) : (
            <span className="mt-0.5 shrink-0 rounded-full bg-[#FCEBE9] px-2 py-1 text-[8px] font-extrabold text-[#B84B42]">Unavailable</span>
          )}
        </div>

        <div className="mt-3 rounded-xl bg-[#F7FAF7] p-2.5 sm:mt-4 sm:p-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-[9px] font-extrabold text-[#415847] sm:text-[10px]">Inside this kit</span>
            <span className="text-[8px] font-bold text-[#849187]">{kit.items.length} essentials</span>
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-2">
            {visibleItems.map((item, index) => {
              const parts = item.match(/^(.+?)\s*[-–]\s*(.+)$/);
              const name = parts ? parts[1].trim() : item;
              const quantity = parts ? parts[2].trim() : null;
              return (
                <div key={`${kit.id}-${index}`} className="flex min-w-0 items-start gap-1.5">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md bg-white text-[#168447] shadow-sm"><Check size={11} strokeWidth={2.5} /></span>
                  <span className="min-w-0 text-[9px] leading-[1.35] text-[#536358] sm:text-[10px]">
                    <span className="block line-clamp-2 font-semibold">{displayCatalogue(name)}</span>
                    {quantity && <span className="mt-0.5 block font-bold text-[#8B7544]">{displayCatalogue(quantity)}</span>}
                  </span>
                </div>
              );
            })}
          </div>
          {remainingItems > 0 && (
            <Link href={`/kits/${kit.id}`} className="mt-2 inline-flex items-center gap-1 text-[9px] font-extrabold text-[#168447] hover:underline">
              + {remainingItems} more items <ArrowUpRight size={11} />
            </Link>
          )}
        </div>

        <div className="mt-3 flex items-end justify-between gap-2 border-t border-[#EDF2ED] pt-3 sm:mt-4">
          <div className="min-w-0">
            <p className="text-[8px] font-extrabold uppercase tracking-[.14em] text-[#849187]">Kit price</p>
            <div className="mt-0.5 flex flex-wrap items-baseline gap-x-1.5">
              <span className="text-xl font-black tracking-[-.045em] text-[#176B3C] sm:text-2xl">{formatPrice(kit.price)}</span>
              {kit.oldPrice && kit.oldPrice > kit.price && <span className="text-[9px] font-semibold text-[#98A198] line-through sm:text-[10px]">{formatPrice(kit.oldPrice)}</span>}
            </div>
          </div>
          {savings > 0 && <span className="mb-1 inline-flex shrink-0 items-center gap-1 rounded-lg bg-[#FFF1EE] px-2 py-1 text-[8px] font-black text-[#C94E43] sm:text-[9px]"><Tag size={10} /> Save {formatPrice(savings)}</span>}
        </div>

        <div className="mt-auto flex gap-2 pt-3">
          {kit.isAvailable ? (
            <>
              <Link href={`/kits/${kit.id}`} className="inline-flex min-h-10 min-w-0 flex-1 items-center justify-center gap-1 rounded-xl border border-[#C9DFCE] bg-white px-2 text-[10px] font-extrabold text-[#287347] transition hover:bg-[#F0F7F1] sm:min-h-11 sm:text-xs">
                Customise <ArrowUpRight size={12} />
              </Link>
              {isInCart ? (
                <Link href="/cart" className="inline-flex min-h-10 min-w-0 flex-1 items-center justify-center gap-1 rounded-xl bg-[#EAF5ED] px-2 text-[10px] font-extrabold text-[#176B3C] sm:min-h-11 sm:text-xs">
                  <Check size={14} /> In cart
                </Link>
              ) : (
                <button type="button" onClick={() => addToCart({ id: kit.id, name: kit.name, price: kit.price, image: kit.image, brand: "Rashid Mega Mart", packSize: "Grocery Kit" })} className="inline-flex min-h-10 min-w-0 flex-1 items-center justify-center gap-1 rounded-xl bg-[#168447] px-2 text-[10px] font-extrabold text-white shadow-[0_5px_14px_rgba(22,132,71,.16)] transition hover:bg-[#106B38] active:scale-[.98] sm:min-h-11 sm:text-xs">
                  <ShoppingCart size={13} /> Add to cart
                </button>
              )}
            </>
          ) : (
            <span className="inline-flex min-h-10 flex-1 items-center justify-center rounded-xl bg-[#F3F5F3] text-[10px] font-bold text-[#89948B]">Currently unavailable</span>
          )}
        </div>
      </div>
    </article>
  );
}
