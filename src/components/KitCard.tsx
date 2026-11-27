
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Package,
  ArrowUpRight,
  Tag,
  ShoppingCart,
  Check,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

import type { GroceryKit } from "@/data/kits";
import { useSiteLanguage, toEnglishCatalogue, toHinglishCatalogue } from "@/components/LanguageProvider";

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


export default function KitCard({ kit, eagerImage = false }: KitCardProps) {
  const [imageError, setImageError] = useState(false);
  const { addToCart, items } = useCart();
  const isInCart = items.some((item) => item.id === kit.id);
  const language = useSiteLanguage();
  const displayCatalogue = (value: string) => language === "en" ? toEnglishCatalogue(value) : language === "hinglish" ? toHinglishCatalogue(value) : value;
  const kitImage = kit.image;

  const savings =
    kit.oldPrice && kit.oldPrice > kit.price
      ? kit.oldPrice - kit.price
      : 0;

  const visibleItems = kit.items.slice(0, 4);
  const remainingItems = Math.max(0, kit.items.length - visibleItems.length);



  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[20px] border border-[#E8DFD1] bg-white shadow-[0_4px_18px_rgba(74,34,22,0.06)] transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-[#D8CBB8] hover:shadow-[0_12px_30px_rgba(74,34,22,0.10)] sm:rounded-[24px]">

      {/* KIT IMAGE */}
      <Link
        href={`/kits/${kit.id}`}
        aria-label={`View ${kit.name} details`}
        className="block shrink-0"
      >
        <div className="relative aspect-[16/9] min-[400px]:aspect-[4/3] w-full overflow-hidden bg-[radial-gradient(ellipse_at_50%_42%,rgba(255,255,255,0.98)_0%,rgba(255,248,231,0.82)_48%,rgba(242,229,211,0.72)_100%)] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.72),transparent_48%,rgba(212,168,79,0.10))]">
          <span className="absolute left-2 top-2 z-10 inline-flex max-w-[58%] items-center gap-1 rounded-full border border-white/40 bg-[#168447] px-2 py-1 text-[8px] font-black tracking-[0.02em] text-white shadow-md shadow-[#800020]/20 sm:left-3 sm:top-3 sm:max-w-none sm:px-2.5 sm:text-[10px]">
            <Tag size={11} />
            {savings > 0 ? `SAVE ${formatPrice(savings)}` : "KIT DEAL"}
          </span>

          <span className="absolute right-2 top-2 z-10 inline-flex shrink-0 items-center gap-1 rounded-full border border-white/80 bg-white/80 px-2 py-1 text-[8px] font-bold text-[#202124] shadow-md backdrop-blur-xl sm:right-3 sm:top-3 sm:px-2.5 sm:text-[10px]">
            <Package size={12} />
            {kit.items.length} Items
          </span>

          {!imageError ? (
            <Image
              src={kitImage}
              alt={kit.name}
              fill
              loading={eagerImage ? "eager" : "lazy"}
              sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 240px"
              onError={() => setImageError(true)}
              className="object-contain p-3 min-[400px]:p-2.5 sm:p-5 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-[#168447]">
              <Package size={38} strokeWidth={1.4} />
              <span className="text-[10px] font-semibold">
                Grocery Kit
              </span>
            </div>
          )}

          <span className="absolute bottom-2 left-2 inline-flex max-w-[calc(100%-16px)] items-center gap-1 rounded-lg border border-white/30 bg-[#800020]/90 px-2 py-1.5 text-[8px] font-extrabold tracking-[0.04em] text-white shadow-md backdrop-blur-md sm:bottom-2.5 sm:left-2.5 sm:px-2.5 sm:text-[9px]">
            <Tag size={11} className="text-[#F7C928]" />
            SPECIAL KIT OFFER
          </span>

          {!kit.isAvailable && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/75 backdrop-blur-[2px]">
              <span className="rounded-full bg-[#202124] px-4 py-2 text-[10px] font-bold text-white">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* KIT DETAILS */}
      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col p-3 sm:p-4">
        <Link href={`/kits/${kit.id}`}>
          <h3 className="line-clamp-2 min-h-[2.5rem] text-[13px] font-extrabold leading-[1.25rem] text-[#202124] transition-colors group-hover:text-[#800020] sm:min-h-11 sm:text-[15px] sm:leading-5">
            {kit.name}
          </h3>
        </Link>

        <p className="mt-1 min-h-8 line-clamp-2 text-[10px] leading-4 text-[#686868] sm:text-xs">
          {displayCatalogue(kit.subtitle)}
        </p>

        {/* INCLUDED ITEMS */}
        <div className="mt-3 flex-1 rounded-xl border border-[#E8DFD1] bg-[#FFFEFC] p-2.5 sm:mt-4 sm:rounded-2xl sm:p-3">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
            <span className="text-[10px] font-extrabold text-[#202124] sm:text-xs">
              Products inside
            </span>

            <span className="shrink-0 rounded-full border border-[#800020]/10 bg-[#800020]/[0.07] px-2 py-0.5 text-[9px] font-bold text-[#168447]">
              {kit.items.length} Products
            </span>
          </div>

          <div className="grid grid-cols-1 gap-y-1.5 min-[640px]:grid-cols-2 min-[640px]:gap-x-2 min-[640px]:gap-y-2">
            {visibleItems.map((item, index) => {
              const parts = item.match(/^(.+?)\s*[-–]\s*(.+)$/);
              const name = parts ? parts[1].trim() : item;
              const quantity = parts ? parts[2].trim() : null;

              return (
                <div
                  key={`${kit.id}-${index}`}
                  className="flex min-h-7 min-w-0 items-center gap-1.5 min-[640px]:items-start"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-white/90 bg-white/80 text-[#168447] shadow-sm min-[640px]:h-7 min-[640px]:w-7 sm:rounded-xl">
                    <Package size={14} strokeWidth={1.5} />
                  </div>
                  <span className="min-w-0 break-words text-[10px] leading-[1.25] text-[#202124] sm:text-[10px]">
                    <span className="block line-clamp-2 font-semibold">{displayCatalogue(name)}</span>
                    {quantity && (
                      <span className="mt-0.5 block font-bold text-[#806000]">
                        {quantity ? displayCatalogue(quantity) : quantity}
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          {remainingItems > 0 && (
            <Link
              href={`/kits/${kit.id}`}
              className="mt-2 inline-flex min-h-8 items-center gap-1 text-[10px] font-extrabold text-[#800020] transition hover:text-[#800020] sm:text-[10px]"
            >
              + {remainingItems} more items
              <ArrowUpRight size={11} />
            </Link>
          )}
        </div>

        {/* PRICE AND SAVINGS */}
        <div className="mt-3 overflow-hidden rounded-xl border border-[#D8CBB8] bg-[linear-gradient(135deg,#F1EBDD_0%,#FAF0C8_100%)] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,.9)] sm:mt-4 sm:rounded-2xl sm:p-3">
          <div className="flex min-w-0 flex-wrap items-end justify-between gap-x-2 gap-y-1.5">
            <div className="min-w-0">
              <p className="text-[8px] font-black uppercase tracking-[0.16em] text-[#800020] sm:text-[9px]">BEST OFFER PRICE</p>
              <div className="mt-0.5 flex flex-wrap items-baseline gap-x-1.5">
                <span className="text-[clamp(1.1rem,4.8vw,1.35rem)] font-black tracking-tight text-[#800020] sm:text-2xl lg:text-3xl">{formatPrice(kit.price)}</span>
                {kit.oldPrice && kit.oldPrice > kit.price && (
                  <span className="text-[10px] font-bold text-[#686868] line-through sm:text-xs">{formatPrice(kit.oldPrice)}</span>
                )}
              </div>
            </div>
            {savings > 0 && (
              <span className="inline-flex shrink-0 items-center rounded-lg bg-[#800020] px-2 py-1.5 text-[8px] font-black text-white shadow-sm sm:px-2.5 sm:text-[10px]">SAVE {formatPrice(savings)}</span>
            )}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-auto grid grid-cols-2 gap-2 pt-3 sm:gap-2 sm:pt-4">
          {kit.isAvailable ? (
            <>
              <Link
                href={`/kits/${kit.id}`}
                aria-label={`Customize ${kit.name}`}
                className="inline-flex min-h-10 min-w-0 items-center justify-center gap-1 rounded-xl border border-[#168447] bg-white px-1.5 text-[10px] font-extrabold text-[#168447] transition hover:bg-[#EAF3E9] active:scale-[.98] min-[400px]:px-1 min-[640px]:min-h-11 min-[640px]:px-2 min-[640px]:text-xs"
              >
                <span className="truncate">Customize</span>
                <ArrowUpRight size={12} className="shrink-0" />
              </Link>
              {isInCart ? (
                <Link
                  href="/cart"
                  className="inline-flex min-h-10 min-w-0 items-center justify-center gap-1 rounded-xl bg-[#800020] px-1.5 text-[10px] font-extrabold text-white transition hover:bg-[#650019] active:scale-[.98] min-[400px]:px-1 min-[640px]:min-h-11 min-[640px]:px-2 min-[640px]:text-xs"
                >
                  <Check size={13} className="shrink-0" /> <span className="truncate">In Cart</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => addToCart({ id: kit.id, name: kit.name, price: kit.price, image: kit.image, brand: "Rashid Mega Mart", packSize: "Grocery Kit" })}
                  className="inline-flex min-h-11 min-w-0 flex-1 items-center justify-center gap-1 rounded-xl bg-[#800020] px-2 text-[11px] font-extrabold text-white transition hover:bg-[#650019] active:scale-[.99] sm:text-xs"
                >
                  <ShoppingCart size={13} className="shrink-0" /><span className="min-[400px]:hidden">Add to Cart</span><span className="hidden min-[400px]:inline min-[640px]:hidden">Add</span><span className="hidden min-[640px]:inline">Add to Cart</span>
                </button>
              )}
            </>
          ) : (
            <span className="inline-flex min-h-8 flex-1 items-center justify-center rounded-lg bg-[#FAF7EF] px-1.5 text-[10px] font-bold text-[#686868] sm:min-h-10 sm:rounded-xl sm:text-xs">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
