
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Package,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import type { GroceryKit } from "@/data/kits";

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
  const kitImage = kit.image;

  const savings =
    kit.oldPrice && kit.oldPrice > kit.price
      ? kit.oldPrice - kit.price
      : 0;

  const visibleItems = kit.items.slice(0, 4);
  const remainingItems = Math.max(0, kit.items.length - visibleItems.length);



  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#EEE7E1] bg-white shadow-[0_3px_14px_rgba(74,34,22,0.05)] transition-shadow duration-200 hover:shadow-md sm:rounded-[24px]">

      {/* KIT IMAGE */}
      <Link
        href={`/kits/${kit.id}`}
        aria-label={`View ${kit.name} details`}
        className="block"
      >
        <div className="relative aspect-[5/3] w-full overflow-hidden sm:aspect-[4/3] bg-[radial-gradient(ellipse_at_50%_42%,rgba(255,255,255,0.98)_0%,rgba(255,248,231,0.82)_48%,rgba(242,229,211,0.72)_100%)] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.72),transparent_48%,rgba(212,168,79,0.10))]">
          <span className="absolute left-2.5 top-2.5 z-10 inline-flex items-center gap-1 rounded-full border border-white/30 bg-[#D71920] px-2.5 py-1 text-[9px] font-black tracking-wide text-white shadow-lg shadow-[#B5121B]/25 sm:left-3 sm:top-3 sm:text-[10px]">
            <Sparkles size={11} />
            {savings > 0 ? `YOU SAVE ${formatPrice(savings)}` : "KIT DEAL"}
          </span>

          <span className="absolute right-2.5 top-2.5 z-10 inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/65 px-2.5 py-1 text-[9px] font-bold text-[#6F321D] shadow-lg backdrop-blur-xl sm:right-3 sm:top-3 sm:text-[10px]">
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
              className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-105 sm:p-5"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-[#D71920]">
              <Package size={38} strokeWidth={1.4} />
              <span className="text-[10px] font-semibold">
                Grocery Kit
              </span>
            </div>
          )}

          <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/55 px-2.5 py-1 text-[9px] font-bold text-[#6F321D] shadow-lg backdrop-blur-xl">
            <Sparkles size={11} className="text-[#A66B00]" />
            BEST VALUE COMBO
          </span>

          {!kit.isAvailable && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/75 backdrop-blur-[2px]">
              <span className="rounded-full bg-[#30251F] px-4 py-2 text-[10px] font-bold text-white">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* KIT DETAILS */}
      <div className="relative flex min-w-0 flex-1 flex-col p-2 sm:p-4">
        <Link href={`/kits/${kit.id}`}>
          <h3 className="line-clamp-2 min-h-9 text-[12px] font-extrabold leading-[18px] text-[#30251F] transition-colors group-hover:text-[#A83250] sm:min-h-11 sm:text-[15px] sm:leading-5">
            {kit.name}
          </h3>
        </Link>

        <p className="mt-1 line-clamp-1 text-[10px] leading-4 text-[#76665C] sm:text-xs">
          {kit.subtitle}
        </p>

        {/* INCLUDED ITEMS */}
        <div className="mt-2 rounded-2xl border border-white/80 bg-white/45 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl sm:mt-4 sm:p-3">
          <div className="mb-2 flex items-center justify-between gap-1">
            <span className="text-[10px] font-extrabold text-[#30251F] sm:text-xs">
              Products inside
            </span>

            <span className="shrink-0 rounded-full border border-[#A83250]/10 bg-[#D71920]/[0.07] px-2 py-0.5 text-[9px] font-bold text-[#B5121B]">
              {kit.items.length} Products
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-2">
            {visibleItems.map((item, index) => {
              const parts = item.match(/^(.+?)\s*[-–]\s*(.+)$/);
              const name = parts ? parts[1].trim() : item;
              const quantity = parts ? parts[2].trim() : null;

              return (
                <div
                  key={`${kit.id}-${index}`}
                  className="flex min-w-0 items-start gap-1.5"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-white/90 bg-white/80 text-[#A83250] shadow-sm sm:h-8 sm:w-8">
                    <Package size={14} strokeWidth={1.5} />
                  </div>
                  <span className="min-w-0 text-[9px] leading-3 text-[#55483C] sm:text-[10px]">
                    <span className="block line-clamp-2 font-semibold">{name}</span>
                    {quantity && (
                      <span className="mt-0.5 block font-bold text-[#936300]">
                        {quantity}
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
              className="mt-2 inline-flex items-center gap-1 text-[9px] font-extrabold text-[#A83250] transition hover:text-[#B5121B] sm:text-[10px]"
            >
              + {remainingItems} more items
              <ArrowUpRight size={11} />
            </Link>
          )}
        </div>

        {/* PRICE AND SAVINGS */}
        <div className="mt-2 overflow-hidden rounded-xl border border-[#F4C9C9] bg-[linear-gradient(135deg,#FFF1F1_0%,#FFF9E8_100%)] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,.9)] sm:mt-4 sm:rounded-2xl sm:p-3">
          <div className="flex min-w-0 flex-wrap items-center justify-between gap-1.5">
            <div className="min-w-0">
              <p className="text-[8px] font-black uppercase tracking-[0.16em] text-[#B5121B] sm:text-[9px]">BEST OFFER PRICE</p>
              <div className="mt-0.5 flex flex-wrap items-baseline gap-x-1.5">
                <span className="text-xl font-black tracking-tight text-[#D71920] sm:text-3xl">{formatPrice(kit.price)}</span>
                {kit.oldPrice && kit.oldPrice > kit.price && (
                  <span className="text-[10px] font-bold text-[#8D8585] line-through sm:text-xs">{formatPrice(kit.oldPrice)}</span>
                )}
              </div>
            </div>
            {savings > 0 && (
              <span className="inline-flex shrink-0 items-center rounded-lg bg-[#D71920] px-2.5 py-1.5 text-[9px] font-black text-white shadow-sm sm:text-[10px]">SAVE {formatPrice(savings)}</span>
            )}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-auto flex gap-1.5 pt-2 sm:gap-2 sm:pt-4">
          {kit.isAvailable ? (
            <Link
              href={`/kits/${kit.id}`}
              aria-label={`Customize ${kit.name}`}
              className="inline-flex min-h-8 min-w-0 flex-1 items-center justify-center gap-1 rounded-lg bg-[#A83250] px-1.5 text-[10px] font-extrabold text-white transition hover:bg-[#B5121B] sm:min-h-10 sm:rounded-xl sm:text-xs"
            >
              Customize
              <ArrowUpRight size={12} />
            </Link>
          ) : (
            <span className="inline-flex min-h-8 flex-1 items-center justify-center rounded-lg bg-[#F1EFED] px-1.5 text-[10px] font-bold text-[#948A83] sm:min-h-10 sm:rounded-xl sm:text-xs">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
