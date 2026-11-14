
"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Check,
  Plus,
  Minus,
  ShoppingCart,
  Package,
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

export default function ProductCard({ product }: ProductCardProps) {
  const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    items,
    isLoaded,
  } = useCart();

  const [imageError, setImageError] = useState(false);

  const cartItem = items.find((item) => item.id === product.id);

  const hasDiscount =
    typeof product.oldPrice === "number" &&
    product.oldPrice > product.price;

  const discount = hasDiscount
    ? Math.round(
        ((product.oldPrice! - product.price) / product.oldPrice!) * 100
      )
    : 0;

  const savings = hasDiscount
    ? product.oldPrice! - product.price
    : 0;

  const handleAddToCart = () => {
    if (!product.isAvailable || !isLoaded) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
      packSize: product.packSize,
    });
  };

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#EDE5DC] bg-white shadow-[0_3px_14px_rgba(53,18,13,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A84F]/60 hover:shadow-[0_12px_28px_rgba(53,18,13,0.10)] sm:rounded-3xl">

      {/* PRODUCT IMAGE */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#FFF9F0]">

        {discount > 0 && (
          <span className="absolute left-2 top-2 z-10 rounded-lg bg-[#A83250] px-2 py-1 text-[9px] font-extrabold text-white shadow-sm sm:left-3 sm:top-3 sm:text-[10px]">
            {discount}% OFF
          </span>
        )}

        {isLoaded && cartItem && product.isAvailable && (
          <span className="absolute right-2 top-2 z-10 flex size-7 items-center justify-center rounded-full bg-[#138047] text-white shadow-md sm:right-3 sm:top-3">
            <Check size={14} strokeWidth={3} />
          </span>
        )}

        {!imageError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 639px) 46vw, (max-width: 1023px) 30vw, 220px"
            onError={() => setImageError(true)}
            className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-110 sm:p-5"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-[#A83250]">
            <Package size={34} strokeWidth={1.4} />
            <span className="text-[9px] font-medium text-[#76665C]">
              Image unavailable
            </span>
          </div>
        )}

        {!product.isAvailable && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/75 backdrop-blur-[2px]">
            <span className="rounded-full bg-[#30251F] px-3 py-2 text-[9px] font-bold tracking-wide text-white">
              OUT OF STOCK
            </span>
          </div>
        )}
      </div>

      {/* PRODUCT DETAILS */}
      <div className="flex min-w-0 flex-1 flex-col p-2.5 sm:p-4">

        <p className="truncate text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#A47A2C] sm:text-[10px]">
          {product.brand}
        </p>

        <h3 className="mt-1 line-clamp-2 min-h-9 text-[12px] font-extrabold leading-[18px] text-[#30251F] transition-colors group-hover:text-[#A83250] sm:min-h-11 sm:text-[15px] sm:leading-5">
          {product.name}
        </h3>

        <p className="mt-1 truncate text-[10px] leading-4 text-[#76665C] sm:text-xs">
          {product.packSize}
        </p>

        {/* PRICE */}
        <div className="mt-2 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-[15px] font-black tracking-tight text-[#A83250] sm:text-lg">
            {formatPrice(product.price)}
          </span>

          {hasDiscount && (
            <span className="text-[10px] font-medium text-[#99A1AF] line-through sm:text-xs">
              {formatPrice(product.oldPrice!)}
            </span>
          )}
        </div>

        {savings > 0 && (
          <p className="mt-1 text-[9px] font-bold text-[#138047] sm:text-[10px]">
            You save {formatPrice(savings)}
          </p>
        )}

        {/* CART CONTROLS */}
        <div className="mt-auto pt-3 sm:pt-4">

          {!product.isAvailable ? (
            <button
              type="button"
              disabled
              className="min-h-9 w-full cursor-not-allowed rounded-xl bg-[#F1F1EF] px-2 text-[10px] font-bold text-[#99A1AF] sm:min-h-10 sm:text-xs"
            >
              Currently Unavailable
            </button>
          ) : !isLoaded ? (
            <div className="h-9 w-full animate-pulse rounded-xl bg-[#F8E8ED] sm:h-10" />
          ) : cartItem ? (
            <div className="flex h-9 w-full items-center justify-between overflow-hidden rounded-xl border border-[#138047]/20 bg-[#EDF8F0] sm:h-10">

              <button
                type="button"
                onClick={() => decreaseQuantity(product.id)}
                aria-label={`Remove one ${product.name}`}
                className="flex h-full w-10 shrink-0 items-center justify-center text-[#138047] transition hover:bg-[#138047]/10 active:scale-90"
              >
                <Minus size={15} strokeWidth={2.5} />
              </button>

              <span
                className="text-sm font-extrabold text-[#138047]"
                aria-live="polite"
              >
                {cartItem.quantity}
              </span>

              <button
                type="button"
                onClick={() => increaseQuantity(product.id)}
                aria-label={`Add one more ${product.name}`}
                className="flex h-full w-10 shrink-0 items-center justify-center bg-[#138047] text-white transition hover:bg-[#0F6B3B] active:scale-90"
              >
                <Plus size={16} strokeWidth={2.5} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAddToCart}
              aria-label={`Add ${product.name} to cart`}
              className="rmm-btn-primary flex min-h-9 w-full items-center justify-center gap-1.5 rounded-xl px-2 text-[10px] font-extrabold sm:min-h-10 sm:text-xs"
            >
              <ShoppingCart size={14} />
              ADD TO CART
              <Plus size={14} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>

      {/* GOLD ACCENT */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4A84F]/70 to-transparent" />
    </article>
  );
}
