
"use client";

import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import type { GroceryKit } from "@/data/kits";
import { useCart } from "@/context/CartContext";

interface Props {
  kit: GroceryKit;
}

export default function KitDetailClient({ kit }: Props) {
  const { addToCart, items } = useCart();
  const [added, setAdded] = useState(false);

  const cartItem = items.find((item) => item.id === kit.id);

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

    setAdded(true);
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={!kit.isAvailable}
      className="mt-6 flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#168447] px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-[#168447]/15 transition hover:bg-[#075C2B] active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-[#AAB8AD]"
    >
      {!kit.isAvailable ? (
        "Currently Unavailable"
      ) : added || cartItem ? (
        <>
          <Check size={19} />
          Added to Cart ({cartItem?.quantity ?? 1})
        </>
      ) : (
        <>
          <ShoppingCart size={19} />
          Add Kit to Cart
        </>
      )}
    </button>
  );
}
