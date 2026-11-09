
"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, ShoppingCart, Package } from "lucide-react";
import type { GroceryKit } from "@/data/kits";
import { useCart } from "@/context/CartContext";

interface KitCardProps {
  kit: GroceryKit;
}

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
      packSize: "Grocery Combo Kit",
    });
  };

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#DFEEE3] bg-white shadow-[0_3px_14px_rgba(7,92,43,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#B7E4C7] hover:shadow-[0_12px_28px_rgba(7,92,43,0.10)]">
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-gradient-to-br from-[#F1FAF3] to-[#E8F5E9]">
        {discount > 0 && (
          <span className="absolute left-3 top-3 z-10 rounded-full border border-red-600 bg-red-600 px-3 py-1.5 text-[10px] font-extrabold text-white shadow-md sm:text-xs">
            {discount}% OFF
          </span>
        )}

        {!kit.isAvailable && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-[#68756B] px-3 py-1.5 text-[10px] font-bold text-white">
            Out of Stock
          </span>
        )}

        {!imageError && kit.image ? (
          <Image
            src={kit.image}
            alt={kit.name}
            fill
            sizes="(max-width: 559px) 100vw, (max-width: 1023px) 50vw, 25vw"
            onError={() => setImageError(true)}
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-[#168447]">
            <Package size={42} strokeWidth={1.4} />
            <span className="max-w-[85%] text-center text-xs font-semibold text-[#68756B]">
              {kit.name}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div className="mb-2 flex items-center gap-1.5 text-[#168447]">
          <Package size={14} />
          <span className="truncate text-[10px] font-extrabold uppercase tracking-wider">
            {kit.category || "Grocery Combo"}
          </span>
        </div>

        <h3 className="line-clamp-2 min-h-10 text-sm font-extrabold leading-5 text-[#202B24] sm:text-base">
          {kit.name}
        </h3>

        <p className="mt-1 line-clamp-2 min-h-9 text-[11px] leading-[18px] text-[#68756B] sm:text-xs">
          {kit.subtitle}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-lg font-extrabold text-[#075C2B] sm:text-xl">
            ₹{kit.price.toLocaleString("en-IN")}
          </span>

          {kit.oldPrice && kit.oldPrice > kit.price && (
            <span className="text-xs text-[#98A69C] line-through">
              ₹{kit.oldPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {kit.items.length > 0 && (
          <p className="mt-2 line-clamp-2 min-h-8 text-[10px] leading-4 text-[#68756B] sm:text-[11px]">
            <span className="font-semibold text-[#53665A]">
              Includes:
            </span>{" "}
            {kit.items.join(", ")}
          </p>
        )}

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!kit.isAvailable}
          aria-label={
            !kit.isAvailable
              ? `${kit.name} currently unavailable`
              : `Add ${kit.name} to cart`
          }
          className="mt-auto flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#168447] px-2 py-3 text-xs font-extrabold text-white shadow-sm transition hover:bg-[#075C2B] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#AAB8AD] sm:mt-4 sm:min-h-12 sm:text-sm"
        >
          {!kit.isAvailable ? (
            "Currently Unavailable"
          ) : cartItem ? (
            <>
              <Check size={16} />
              Added ({cartItem.quantity})
            </>
          ) : (
            <>
              <ShoppingCart size={16} />
              Add Kit to Cart
            </>
          )}
        </button>
      </div>
    </article>
  );
}
