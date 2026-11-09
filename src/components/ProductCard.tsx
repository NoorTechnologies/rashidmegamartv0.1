
"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Plus, ShoppingCart } from "lucide-react";
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
  const { addToCart, items } = useCart();
  const [imageError, setImageError] = useState(false);

  const cartItem = items.find((item) => item.id === product.id);

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : 0;

  const handleAddToCart = () => {
    if (!product.isAvailable) return;

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
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#E5EDE5] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:rounded-2xl">
      <div className="relative aspect-square w-full overflow-hidden bg-[#F7F9F5]">
        {discount > 0 && (
          <span className="absolute left-1.5 top-1.5 z-10 rounded-md bg-[#F7C928] px-2 py-1 text-[9px] font-extrabold text-[#202B24] sm:left-2 sm:top-2 sm:text-[10px]">
            {discount}% OFF
          </span>
        )}

        {!imageError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 374px) 46vw, (max-width: 639px) 45vw, (max-width: 1023px) 30vw, 220px"
            onError={() => setImageError(true)}
            className="object-contain p-2 transition duration-500 group-hover:scale-105 sm:p-3"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#9AA79C]">
            <ShoppingCart size={30} strokeWidth={1.5} />
            <span className="text-[10px] font-medium">Image unavailable</span>
          </div>
        )}

        {!product.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/75">
            <span className="rounded-full bg-gray-800 px-3 py-1.5 text-[10px] font-bold text-white sm:text-xs">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-2.5 sm:p-4">
        <p className="mb-1 truncate text-[9px] font-semibold uppercase tracking-wide text-gray-400 sm:text-[10px]">
          {product.brand}
        </p>

        <h3 className="line-clamp-2 min-h-9 text-xs font-bold leading-[18px] text-[#202B24] sm:min-h-10 sm:text-sm sm:leading-5">
          {product.name}
        </h3>

        <p className="mt-1 truncate text-[10px] text-gray-400 sm:text-xs">
          {product.packSize}
        </p>

        <div className="mt-2 flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 sm:mt-3 sm:gap-2">
          <span className="text-sm font-extrabold text-[#168447] sm:text-base">
            {formatPrice(product.price)}
          </span>

          {product.oldPrice && product.oldPrice > product.price && (
            <span className="text-[10px] text-gray-400 line-through sm:text-xs">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <div className="mt-auto pt-3">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.isAvailable}
            aria-label={
              !product.isAvailable
                ? `${product.name} unavailable`
                : cartItem
                  ? `${product.name}, ${cartItem.quantity} in cart`
                  : `Add ${product.name} to cart`
            }
            className={`flex min-h-10 w-full items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-[10px] font-bold transition active:scale-[0.97] sm:gap-2 sm:rounded-xl sm:text-xs ${
              !product.isAvailable
                ? "cursor-not-allowed bg-gray-100 text-gray-400"
                : cartItem
                  ? "border border-green-200 bg-green-50 text-[#168447] hover:bg-green-100"
                  : "bg-[#168447] text-white hover:bg-[#075C2B]"
            }`}
          >
            {!product.isAvailable ? (
              "Unavailable"
            ) : cartItem ? (
              <>
                <Check size={14} />
                <span>Added ({cartItem.quantity})</span>
              </>
            ) : (
              <>
                <Plus size={15} />
                <ShoppingCart size={14} />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
