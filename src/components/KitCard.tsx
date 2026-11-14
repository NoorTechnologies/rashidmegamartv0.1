
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Check,
  Plus,
  ShoppingCart,
  Package,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import type { GroceryKit } from "@/data/kits";
import { products } from "@/data/products";

interface KitCardProps {
  kit: GroceryKit;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

const getProductImage = (item: string) => {
  const value = item.toLowerCase();

  const matches: { keywords: string[]; productId: string }[] = [
    { keywords: ["rice"], productId: "rice-001" },
    { keywords: ["atta"], productId: "atta-001" },
    { keywords: ["cooking oil", "oil"], productId: "oil-001" },
    { keywords: ["sugar"], productId: "sugar-001" },
    { keywords: ["toor dal"], productId: "dal-001" },
    { keywords: ["tea"], productId: "tea-001" },
    { keywords: ["salt"], productId: "salt-001" },
  ];

  const match = matches.find(({ keywords }) =>
    keywords.some((keyword) => value.startsWith(keyword))
  );

  if (!match) return null;

  return (
    products.find((product) => product.id === match.productId)?.image ?? null
  );
};

export default function KitCard({ kit }: KitCardProps) {
  const { addToCart, items, isLoaded } = useCart();
  const [imageError, setImageError] = useState(false);

  const cartItem = items.find((item) => item.id === kit.id);

  const discount =
    kit.oldPrice && kit.oldPrice > kit.price
      ? Math.round(((kit.oldPrice - kit.price) / kit.oldPrice) * 100)
      : 0;

  const savings =
    kit.oldPrice && kit.oldPrice > kit.price
      ? kit.oldPrice - kit.price
      : 0;

  const visibleItems = kit.items.slice(0, 4);
  const remainingItems = Math.max(0, kit.items.length - visibleItems.length);

  const handleAddToCart = () => {
    if (!isLoaded || !kit.isAvailable || cartItem) return;

    addToCart({
      id: kit.id,
      name: kit.name,
      price: kit.price,
      image: kit.image,
      brand: "Rashid Mega Mart",
      packSize: `Grocery Kit - ${kit.items.length} Listed Items`,
    });
  };

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#EDE5DC] bg-white shadow-[0_3px_14px_rgba(53,18,13,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A84F]/60 hover:shadow-[0_12px_28px_rgba(53,18,13,0.10)] sm:rounded-3xl">

      {/* KIT IMAGE */}
      <Link
        href={`/kits/${kit.id}`}
        aria-label={`View ${kit.name} details`}
        className="block"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FFF9F0]">
          {discount > 0 && (
            <span className="absolute left-2.5 top-2.5 z-10 rounded-lg bg-[#A83250] px-2 py-1 text-[9px] font-extrabold text-white shadow-sm sm:left-3 sm:top-3 sm:px-2.5 sm:text-[10px]">
              {discount}% OFF
            </span>
          )}

          <span className="absolute right-2.5 top-2.5 z-10 inline-flex items-center gap-1 rounded-lg border border-[#D4A84F]/30 bg-white/95 px-2 py-1 text-[9px] font-bold text-[#78350F] shadow-sm sm:right-3 sm:top-3 sm:text-[10px]">
            <Package size={12} />
            {kit.items.length} Items
          </span>

          {!imageError && kit.image ? (
            <Image
              src={kit.image}
              alt={kit.name}
              fill
              sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 240px"
              onError={() => setImageError(true)}
              className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-105 sm:p-5"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-[#A83250]">
              <Package size={38} strokeWidth={1.4} />
              <span className="text-[10px] font-semibold">
                Grocery Kit
              </span>
            </div>
          )}

          <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-full border border-white/80 bg-white/90 px-2 py-1 text-[9px] font-bold text-[#78350F] shadow-sm backdrop-blur-sm">
            <Sparkles size={11} className="text-[#CA8A04]" />
            Grocery Combo
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
      <div className="flex min-w-0 flex-1 flex-col p-2 sm:p-4">
        <p className="mb-1.5 truncate text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#A47A2C] sm:text-[10px]">
          {kit.category}
        </p>

        <Link href={`/kits/${kit.id}`}>
          <h3 className="line-clamp-2 min-h-9 text-[12px] font-extrabold leading-[18px] text-[#30251F] transition-colors group-hover:text-[#A83250] sm:min-h-11 sm:text-[15px] sm:leading-5">
            {kit.name}
          </h3>
        </Link>

        <p className="mt-1 line-clamp-1 text-[10px] leading-4 text-[#76665C] sm:text-xs">
          {kit.subtitle}
        </p>

        {/* INCLUDED ITEMS */}
        <div className="mt-2 rounded-xl border border-[#F0E9DF] bg-[#FFFDF8] p-2 sm:mt-4 sm:p-3">
          <div className="mb-2 flex items-center justify-between gap-1">
            <span className="text-[10px] font-extrabold text-[#30251F] sm:text-xs">
              What&apos;s Inside?
            </span>

            <span className="shrink-0 rounded-full bg-[#F8E8ED] px-2 py-0.5 text-[9px] font-bold text-[#A83250]">
              {kit.items.length} Listed Items
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-2">
            {visibleItems.map((item, index) => {
              const productImage = getProductImage(item);

              return (
                <div
                  key={`${kit.id}-${index}`}
                  className="flex min-w-0 items-center gap-1.5"
                >
                  <div className="relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#EEE8DF] bg-white sm:h-8 sm:w-8">
                    {productImage ? (
                      <Image
                        src={productImage}
                        alt=""
                        fill
                        sizes="32px"
                        className="object-contain p-0.5"
                      />
                    ) : (
                      <Package
                        size={14}
                        strokeWidth={1.5}
                        className="text-[#A83250]"
                      />
                    )}
                  </div>

                  <span className="line-clamp-2 min-w-0 text-[9px] font-medium leading-3 text-[#55483C] sm:text-[10px]">
                    {item}
                  </span>
                </div>
              );
            })}
          </div>

          {remainingItems > 0 && (
            <Link
              href={`/kits/${kit.id}`}
              className="mt-2 inline-flex items-center gap-1 text-[9px] font-extrabold text-[#A83250] transition hover:text-[#87263F] sm:text-[10px]"
            >
              + {remainingItems} more items
              <ArrowUpRight size={11} />
            </Link>
          )}
        </div>

        {/* PRICE AND SAVINGS */}
        <div className="mt-2 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 sm:mt-4">
          <span className="text-[15px] font-black tracking-tight text-[#A83250] sm:text-lg">
            {formatPrice(kit.price)}
          </span>

          {kit.oldPrice && kit.oldPrice > kit.price && (
            <span className="text-[10px] font-medium text-[#99A1AF] line-through sm:text-xs">
              {formatPrice(kit.oldPrice)}
            </span>
          )}
        </div>

        {savings > 0 && (
          <p className="mt-1 text-[9px] font-bold text-[#138047] sm:text-[10px]">
            You save {formatPrice(savings)}
          </p>
        )}

        {/* ACTION BUTTONS */}
        <div className="mt-auto flex gap-2 pt-3 sm:pt-4">
          <Link
            href={`/kits/${kit.id}`}
            className="rmm-button-secondary min-h-9 min-w-0 flex-1 rounded-lg px-1.5 text-[10px] sm:min-h-10 sm:rounded-xl sm:text-xs"
          >
            View Kit
            <ArrowUpRight size={12} />
          </Link>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!kit.isAvailable || !isLoaded || Boolean(cartItem)}
            aria-label={
              !kit.isAvailable
                ? `${kit.name} unavailable`
                : !isLoaded
                  ? "Loading cart"
                  : cartItem
                    ? `${kit.name}, ${cartItem.quantity} in cart`
                    : `Add ${kit.name} to cart`
            }
            className={`inline-flex min-h-9 min-w-0 flex-1 items-center justify-center gap-1 rounded-lg px-1.5 text-[10px] font-extrabold transition active:scale-95 disabled:cursor-not-allowed sm:min-h-10 sm:rounded-xl sm:text-xs ${
              !kit.isAvailable || !isLoaded
                ? "bg-gray-100 text-gray-400"
                : cartItem
                  ? "border border-[#138047]/20 bg-[#EDF8F0] text-[#138047]"
                  : "rmm-button-primary"
            }`}
          >
            {!kit.isAvailable ? (
              "Unavailable"
            ) : !isLoaded ? (
              "Loading..."
            ) : cartItem ? (
              <>
                <Check size={13} />
                Added ({cartItem.quantity})
              </>
            ) : (
              <>
                <Plus size={13} />
                <ShoppingCart size={12} />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
