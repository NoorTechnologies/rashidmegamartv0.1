
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X, ShoppingCart, Check, Package } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
}: ProductModalProps) {
  const { addToCart, items } = useCart();
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const cartItem = items.find((item) => item.id === product?.id);
  const imageError = Boolean(product?.image && failedImage === product.image);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.getAttribute("aria-hidden") !== "true");

      if (focusable.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
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
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/55 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        aria-describedby="product-modal-description"
        tabIndex={-1}
        className="relative flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl outline-none sm:max-h-[88dvh] sm:rounded-3xl"
      >
        <div className="flex shrink-0 justify-center pt-2 sm:hidden" aria-hidden="true">
          <span className="h-1 w-10 rounded-full bg-gray-300" />
        </div>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-3 top-4 z-20 flex size-9 items-center justify-center rounded-full bg-white/95 text-[#202B24] shadow-md transition hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A83250] active:scale-95 sm:right-4 sm:top-4 sm:size-10"
        >
          <X size={19} />
        </button>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="relative mx-auto flex aspect-square w-full max-h-[260px] items-center justify-center overflow-hidden bg-[#F4F8F3] min-[375px]:max-h-[290px] sm:max-h-[320px]">
            {discount > 0 && (
              <span className="absolute left-3 top-3 z-10 rounded-full bg-[#F7C928] px-3 py-1.5 text-[10px] font-extrabold text-[#202B24] sm:left-4 sm:top-4 sm:text-xs">
                {discount}% OFF
              </span>
            )}

            {!imageError ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, 512px"
                onError={() => setFailedImage(product.image)}
                className="object-contain p-6 sm:p-8"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-[#168447]">
                <Package size={42} strokeWidth={1.4} />
                <span className="text-xs text-gray-400">Image unavailable</span>
              </div>
            )}
          </div>

          <div className="p-4 sm:p-6">
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#168447] sm:mb-2 sm:text-xs">
              {product.brand}
            </p>

            <h2
              id="product-modal-title"
              className="pr-8 text-lg font-extrabold leading-snug text-[#202B24] sm:text-xl"
            >
              {product.name}
            </h2>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Pack Size: {product.packSize}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2.5 sm:mt-4 sm:gap-3">
              <span className="text-xl font-extrabold text-[#075C2B] sm:text-2xl">
                {formatPrice(product.price)}
              </span>

              {product.oldPrice && product.oldPrice > product.price && (
                <span className="text-xs text-gray-400 line-through sm:text-sm">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            <div className="mt-4 border-t border-gray-100 pt-3 sm:mt-5 sm:pt-4">
              <h3 className="text-sm font-bold text-[#202B24]">Product Details</h3>
              <p
                id="product-modal-description"
                className="mt-2 whitespace-pre-line break-words text-xs leading-6 text-gray-500 sm:text-sm"
              >
                {product.description}
              </p>
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-gray-100 bg-white px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 sm:px-6 sm:pb-5">
          {product.isAvailable ? (
            <button
              type="button"
              onClick={handleAddToCart}
              className="rmm-button-primary min-h-12 w-full rounded-xl px-5 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A83250]"
            >
              {cartItem ? <Check size={19} /> : <ShoppingCart size={19} />}
              {cartItem ? `Added (${cartItem.quantity})` : "Add to Cart"}
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="min-h-12 w-full cursor-not-allowed rounded-xl bg-gray-200 px-5 py-3 text-sm font-bold text-gray-500"
            >
              Currently Unavailable
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
