
"use client";

import {
  Check,
  ShoppingCart,
  Plus,
  Minus,
} from "lucide-react";

import type { GroceryKit } from "@/data/kits";
import { useCart } from "@/context/CartContext";

interface Props {
  kit: GroceryKit;
}

export default function KitDetailClient({ kit }: Props) {
  const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    items,
    isLoaded,
  } = useCart();

  const cartItem = items.find((item) => item.id === kit.id);

  const handleAddToCart = () => {
    if (!isLoaded || !kit.isAvailable || cartItem) return;

    addToCart({
      id: kit.id,
      name: kit.name,
      price: kit.price,
      image: kit.image,
      brand: "Rashid Mega Mart",
      packSize: "Grocery Combo Kit",
    });
  };

  const handleIncrease = () => {
    if (!isLoaded || !kit.isAvailable || !cartItem) return;
    increaseQuantity(kit.id);
  };

  const handleDecrease = () => {
    if (!isLoaded || !cartItem) return;
    decreaseQuantity(kit.id);
  };

  if (!isLoaded) {
    return (
      <div
        className="flex min-h-14 w-full animate-pulse items-center justify-center rounded-xl bg-[#E8DFD1] px-5 py-4"
        aria-label="Loading cart"
      >
        <span className="text-sm font-bold text-[#686868]">
          Loading cart...
        </span>
      </div>
    );
  }

  if (!kit.isAvailable) {
    return (
      <button
        type="button"
        disabled
        className="flex min-h-14 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-[#D8CBB8] px-5 py-4 text-sm font-extrabold text-white"
      >
        Currently Unavailable
      </button>
    );
  }

  if (cartItem) {
    return (
      <div className="flex min-h-14 w-full items-center justify-between gap-3 rounded-xl border border-[#D5E8D6] bg-[#EAF3E9] p-2">
        <div className="flex min-w-0 items-center gap-2 pl-2">
          <Check
            size={19}
            className="shrink-0 text-[#168447]"
          />

          <div className="min-w-0">
            <p className="text-xs font-extrabold text-[#168447] sm:text-sm">
              Added to Cart
            </p>
            <p className="text-[10px] text-[#202124]">
              Quantity: {cartItem.quantity}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3 rounded-lg bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={handleDecrease}
            aria-label={`Decrease ${kit.name} quantity`}
            className="flex size-9 items-center justify-center rounded-md bg-[#FAF7EF] text-[#168447] transition hover:bg-[#EAF3E9] active:scale-95"
          >
            <Minus size={17} />
          </button>

          <span
            className="min-w-5 text-center text-sm font-black tabular-nums text-[#202124]"
            aria-live="polite"
          >
            {cartItem.quantity}
          </span>

          <button
            type="button"
            onClick={handleIncrease}
            aria-label={`Increase ${kit.name} quantity`}
            className="flex size-9 items-center justify-center rounded-md bg-[#168447] text-white transition hover:bg-[#106B38] active:scale-95"
          >
            <Plus size={17} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#168447] px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-[#168447]/15 transition hover:bg-[#106B38] active:scale-[0.99]"
    >
      <ShoppingCart size={19} />
      Add Kit to Cart
    </button>
  );
}
