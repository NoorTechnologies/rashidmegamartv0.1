
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Check,
  Plus,
  ShoppingCart,
  Package,
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import type { GroceryKit } from "@/data/kits";

interface KitCardProps {
  kit: GroceryKit;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

export default function KitCard({ kit }: KitCardProps) {
  const { addToCart, items } = useCart();

  const [imageError, setImageError] = useState(false);

  const cartItem = items.find((item) => item.id === kit.id);

  const discount =
    kit.oldPrice && kit.oldPrice > kit.price
      ? Math.round(
          ((kit.oldPrice - kit.price) / kit.oldPrice) * 100
        )
      : 0;

  const handleAddToCart = () => {
    if (!kit.isAvailable) return;

    addToCart({
      id: kit.id,
      name: kit.name,
      price: kit.price,
      image: kit.image,
      brand: "Rashid Mega Mart",
      packSize: `Grocery Kit - ${kit.items.length} Products`,
    });
  };

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#E5EDE5] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:rounded-2xl">
      {/* Kit Image */}
      <Link
        href={`/kits/${kit.id}`}
        aria-label={`View ${kit.name} details`}
        className="block"
      >
        <div className="relative aspect-square w-full overflow-hidden bg-[#F7F9F5]">
          {discount > 0 && (
            <span className="absolute left-1.5 top-1.5 z-10 rounded-md bg-[#F7C928] px-2 py-1 text-[9px] font-extrabold text-[#202B24] sm:left-2 sm:top-2 sm:text-[10px]">
              {discount}% OFF
            </span>
          )}

          <span className="absolute right-1.5 top-1.5 z-10 flex items-center gap-1 rounded-md bg-white/95 px-2 py-1 text-[9px] font-bold text-[#168447] shadow-sm sm:right-2 sm:top-2 sm:text-[10px]">
            <Package size={11} />
            {kit.items.length} Items
          </span>

          {!imageError && kit.image ? (
            <Image
              src={kit.image}
              alt={kit.name}
              fill
              sizes="(max-width: 374px) 46vw, (max-width: 639px) 45vw, (max-width: 1023px) 30vw, 220px"
              onError={() => setImageError(true)}
              className="object-contain p-2 transition duration-500 group-hover:scale-105 sm:p-3"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#9AA79C]">
              <Package size={34} strokeWidth={1.5} />
              <span className="text-[10px] font-medium">
                Image unavailable
              </span>
            </div>
          )}

          {!kit.isAvailable && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/75">
              <span className="rounded-full bg-gray-800 px-3 py-1.5 text-[10px] font-bold text-white sm:text-xs">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Kit Details */}
      <div className="flex min-w-0 flex-1 flex-col p-2.5 sm:p-4">
        <p className="mb-1 truncate text-[9px] font-semibold uppercase tracking-wide text-gray-400 sm:text-[10px]">
          {kit.category}
        </p>

        <Link href={`/kits/${kit.id}`}>
          <h3 className="line-clamp-2 min-h-9 text-xs font-bold leading-[18px] text-[#202B24] sm:min-h-10 sm:text-sm sm:leading-5">
            {kit.name}
          </h3>
        </Link>

        <p className="mt-1 line-clamp-1 text-[10px] text-gray-400 sm:text-xs">
          {kit.subtitle}
        </p>

        <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-[#168447] sm:text-xs">
          <Package size={12} />
          <span>{kit.items.length} Products Included</span>
        </div>

        <div className="mt-2 flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 sm:mt-3 sm:gap-2">
          <span className="text-sm font-extrabold text-[#168447] sm:text-base">
            {formatPrice(kit.price)}
          </span>

          {kit.oldPrice && kit.oldPrice > kit.price && (
            <span className="text-[10px] text-gray-400 line-through sm:text-xs">
              {formatPrice(kit.oldPrice)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto flex gap-1.5 pt-3">
          <Link
            href={`/kits/${kit.id}`}
            className="flex min-h-10 flex-1 items-center justify-center rounded-lg border border-[#168447] px-1.5 py-2 text-[10px] font-bold text-[#168447] transition hover:bg-[#EAF7EE] sm:rounded-xl sm:text-xs"
          >
            View Details
          </Link>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!kit.isAvailable}
            aria-label={
              !kit.isAvailable
                ? `${kit.name} unavailable`
                : cartItem
                  ? `${kit.name}, ${cartItem.quantity} in cart`
                  : `Add ${kit.name} to cart`
            }
            className={`flex min-h-10 flex-1 items-center justify-center gap-1 rounded-lg px-1.5 py-2 text-[10px] font-bold transition active:scale-[0.97] sm:rounded-xl sm:text-xs ${
              !kit.isAvailable
                ? "cursor-not-allowed bg-gray-100 text-gray-400"
                : cartItem
                  ? "border border-green-200 bg-green-50 text-[#168447] hover:bg-green-100"
                  : "bg-[#168447] text-white hover:bg-[#075C2B]"
            }`}
          >
            {!kit.isAvailable ? (
              "Unavailable"
            ) : cartItem ? (
              <>
                <Check size={13} />
                <span>Added ({cartItem.quantity})</span>
              </>
            ) : (
              <>
                <Plus size={14} />
                <ShoppingCart size={13} />
                <span>Add Kit</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
