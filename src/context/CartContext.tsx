
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  brand?: string;
  packSize?: string;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  isLoaded: boolean;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const STORAGE_KEY = "rashid-mega-mart-cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

function isValidCartItem(item: unknown): item is CartItem {
  if (!item || typeof item !== "object") return false;

  const value = item as Record<string, unknown>;

  return (
    typeof value.id === "string" &&
    value.id.trim().length > 0 &&
    typeof value.name === "string" &&
    value.name.trim().length > 0 &&
    typeof value.price === "number" &&
    Number.isFinite(value.price) &&
    value.price >= 0 &&
    typeof value.image === "string" &&
    Number.isSafeInteger(value.quantity) &&
    (value.quantity as number) > 0 &&
    (value.brand === undefined || typeof value.brand === "string") &&
    (value.packSize === undefined || typeof value.packSize === "string")
  );
}

function readCart(): CartItem[] {
  try {
    const savedCart = window.localStorage.getItem(STORAGE_KEY);

    if (!savedCart) return [];

    const parsed: unknown = JSON.parse(savedCart);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isValidCartItem);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved cart once the component mounts.
  useEffect(() => {
    const savedItems = readCart();

    setItems(savedItems);
    setIsLoaded(true);
  }, []);

  // Save only after the initial cart has loaded.
  useEffect(() => {
    if (!isLoaded) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      console.error("Unable to save cart. Browser storage may be unavailable.");
    }
  }, [items, isLoaded]);

  const addToCart = useCallback(
    (product: Omit<CartItem, "quantity">) => {
      if (
        !product.id.trim() ||
        !product.name.trim() ||
        !Number.isFinite(product.price) ||
        product.price < 0
      ) {
        return;
      }

      setItems((currentItems) => {
        const existing = currentItems.find(
          (item) => item.id === product.id
        );

        if (existing) {
          return currentItems.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: Math.min(
                    item.quantity + 1,
                    Number.MAX_SAFE_INTEGER
                  ),
                }
              : item
          );
        }

        return [...currentItems, { ...product, quantity: 1 }];
      });
    },
    []
  );

  const increaseQuantity = useCallback((id: string) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(
                item.quantity + 1,
                Number.MAX_SAFE_INTEGER
              ),
            }
          : item
      )
    );
  }, []);

  const decreaseQuantity = useCallback((id: string) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      totalItems,
      subtotal,
      isLoaded,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
    }),
    [
      items,
      totalItems,
      subtotal,
      isLoaded,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider.");
  }

  return context;
}
