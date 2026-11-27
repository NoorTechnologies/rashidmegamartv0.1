"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Package, ArrowUpRight, Tag, ShoppingCart, Check, CheckCircle2, Settings2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { GroceryKit } from "@/data/kits";
import { useSiteLanguage, toEnglishCatalogue, toHinglishCatalogue } from "@/components/LanguageProvider";

interface KitCardProps {
  kit: GroceryKit;
  eagerImage?: boolean;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

export default function KitCard({ kit, eagerImage = false }: KitCardProps) {
  const [imageError, setImageError] = useState(false);
  const { addToCart, items } = useCart();
  const isInCart = items.some((item) => item.id === kit.id);
  const language = useSiteLanguage();
  const displayCatalogue = (value: string) => language === "en" ? toEnglishCatalogue(value) : language === "hinglish" ? toHinglishCatalogue(value) : value;
  const savings = kit.oldPrice && kit.oldPrice > kit.price ? kit.oldPrice - kit.price : 0;
  const discountPercent = kit.oldPrice && kit.oldPrice > kit.price ? Math.round((savings / kit.oldPrice) * 100) : 0;
  const visibleItems = kit.items.slice(0, 4);
  const remainingItems = Math.max(0, kit.items.length - visibleItems.length);

  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[24px] border border-[#E8DEC9] bg-white shadow-[0_10px_30px_rgba(53,43,25,.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D9C58E] hover:shadow-[0_18px_42px_rgba(53,43,25,.13)] sm:rounded-[30px]">
      <Link href={`/kits/${kit.id}`} aria-label={`View ${kit.name} details`} className="block shrink-0">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[linear-gradient(135deg,#FFF9E9,#F1E9D7)]">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_85%,rgba(49,95,53,.13),transparent_55%)]" />
          <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-[#08703A] px-3 py-1.5 text-[9px] font-black text-white shadow-md sm:left-4 sm:top-4 sm:text-[10px]">
            <Tag size={12} /> {savings > 0 ? `SAVE ${formatPrice(savings)}` : "SPECIAL KIT"}
          </span>
          <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-[#E8D6A9] bg-[#FFF9E9]/95 px-3 py-1.5 text-[9px] font-extrabold text-[#5B4B2B] shadow-sm sm:right-4 sm:top-4 sm:text-[10px]">
            <Package size={12} /> {kit.items.length} ITEMS
          </span>
          {!imageError ? (
            <Image
              src={kit.image}
              alt={kit.name}
              fill
              priority={eagerImage}
              loading={eagerImage ? undefined : "lazy"}
              sizes="(max-width: 767px) calc(100vw - 24px), 760px"
              onError={() => setImageError(true)}
              className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.025] sm:p-5"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-[#168447]">
              <Package size={42} strokeWidth={1.35} />
              <span className="text-[11px] font-bold">Grocery Kit</span>
            </div>
          )}
          {!kit.isAvailable && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/75 backdrop-blur-[2px]">
              <span className="rounded-full bg-[#24231F] px-4 py-2 text-[11px] font-bold text-white">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      <div className="flex min-w-0 flex-1 flex-col p-3.5 sm:p-5 md:p-6">
        <Link href={`/kits/${kit.id}`} className="w-fit max-w-full">
          <h3 className="line-clamp-2 text-[clamp(1rem,3.8vw,1.35rem)] font-black leading-tight tracking-[-0.035em] text-[#211F1B] transition-colors group-hover:text-[#800020]">
            {kit.name}
          </h3>
        </Link>
        <p className="mt-1.5 line-clamp-2 text-[11px] leading-[1.55] text-[#756E63] sm:text-sm">
          {displayCatalogue(kit.subtitle)}
        </p>

        <div className="mt-4 rounded-2xl border border-[#EDE5D7] bg-[#FFFEFA] p-3 sm:mt-5 sm:p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-[10px] font-black text-[#33332D] sm:text-xs">Products inside</span>
            <span className="rounded-full bg-[#EAF3E9] px-2.5 py-1 text-[9px] font-extrabold text-[#168447]">{kit.items.length} Products</span>
          </div>
          <div className="grid grid-cols-1 gap-x-5 gap-y-2.5 min-[520px]:grid-cols-2 sm:gap-y-3">
            {visibleItems.map((item, index) => {
              const parts = item.match(/^(.+?)\s*[-–]\s*(.+)$/);
              const name = parts ? parts[1].trim() : item;
              const quantity = parts ? parts[2].trim() : null;
              return (
                <div key={`${kit.id}-${index}`} className="flex min-w-0 items-center gap-2">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-[#E2EBDD] bg-white text-[#168447] shadow-sm">
                    <CheckCircle2 size={16} />
                  </span>
                  <span className="min-w-0 text-[11px] leading-tight text-[#4B4942] sm:text-xs">
                    <span className="font-semibold">{displayCatalogue(name)}</span>
                    {quantity && <span className="ml-1 font-extrabold text-[#806000]">{displayCatalogue(quantity)}</span>}
                  </span>
                </div>
              );
            })}
          </div>
          {remainingItems > 0 && (
            <Link href={`/kits/${kit.id}`} className="mt-3 inline-flex min-h-8 items-center gap-1.5 text-[10px] font-extrabold text-[#800020] transition hover:text-[#A31A3D]">
              + {remainingItems} more items <ArrowUpRight size={12} />
            </Link>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-3 rounded-2xl border border-[#E8D9B6] bg-[linear-gradient(110deg,#FFF8E7,#F3EBD8)] p-3.5 sm:mt-5 sm:p-4">
          <div className="min-w-0">
            <p className="text-[8px] font-black uppercase tracking-[0.17em] text-[#806000] sm:text-[9px]">BEST OFFER PRICE</p>
            <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-[clamp(1.65rem,7vw,2.25rem)] font-black leading-none tracking-[-0.055em] text-[#800020]">{formatPrice(kit.price)}</span>
              {kit.oldPrice && kit.oldPrice > kit.price && <span className="text-[11px] font-bold text-[#8A8379] line-through sm:text-sm">{formatPrice(kit.oldPrice)}</span>}
            </div>
          </div>
          {savings > 0 && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#08703A] px-3 py-2 text-[9px] font-black text-white shadow-sm sm:text-[10px]">
              <Tag size={12} /> {discountPercent}% OFF
            </span>
          )}
        </div>

        <div className="mt-auto grid grid-cols-1 gap-2.5 pt-4 sm:pt-5">
          {kit.isAvailable ? (
            <>
              {isInCart ? (
                <Link href="/cart" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#800020] px-4 text-xs font-extrabold text-white shadow-[0_7px_18px_rgba(128,0,32,.16)] transition hover:bg-[#650019] active:scale-[.99] sm:min-h-14 sm:text-sm">
                  <Check size={17} /> Added to Cart · View Cart
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => addToCart({ id: kit.id, name: kit.name, price: kit.price, image: kit.image, brand: "Rashid Mega Mart", packSize: "Grocery Kit" })}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#168447] to-[#08703A] px-4 text-xs font-extrabold text-white shadow-[0_8px_20px_rgba(8,112,58,.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(8,112,58,.25)] active:scale-[.99] sm:min-h-14 sm:text-sm"
                >
                  <ShoppingCart size={17} /> Add to Cart
                </button>
              )}
              <Link href={`/kits/${kit.id}`} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl border border-[#168447] bg-white px-4 text-xs font-extrabold text-[#17683A] transition-all duration-200 hover:bg-[#F0F7ED] active:scale-[.99] sm:min-h-12 sm:text-sm">
                <Settings2 size={16} /> Customize Kit <ArrowUpRight size={14} />
              </Link>
            </>
          ) : (
            <span className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#F1EEE8] text-xs font-extrabold text-[#777168]">Currently Out of Stock</span>
          )}
        </div>
      </div>
    </article>
  );
}
