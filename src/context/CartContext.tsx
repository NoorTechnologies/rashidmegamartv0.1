
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
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
const MAX_CART_QUANTITY = 99;
const CART_CHANGE_EVENT = "rashid-mega-mart-cart-change";

const EMPTY_CART: CartItem[] = [];

const CartContext = createContext<CartContextType | undefined>(undefined);

let cachedRaw: string | null | undefined;
let cachedItems: CartItem[] = EMPTY_CART;
let storageFailed = false;

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
    (value.quantity as number) <= MAX_CART_QUANTITY &&
    (value.brand === undefined || typeof value.brand === "string") &&
    (value.packSize === undefined || typeof value.packSize === "string")
  );
}

function parseCart(raw: string | null): CartItem[] {
  if (!raw) return EMPTY_CART;

  try {
    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) return EMPTY_CART;

    return parsed.filter(isValidCartItem);
  } catch {
    return EMPTY_CART;
  }
}

function getCartSnapshot(): CartItem[] {
  if (typeof window === "undefined") return EMPTY_CART;
  if (storageFailed) return cachedItems;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedItems = parseCart(raw);
    }

    return cachedItems;
  } catch {
    storageFailed = true;
    return cachedItems;
  }
}

function notifyCartChange() {
  window.dispatchEvent(new Event(CART_CHANGE_EVENT));
}

function saveCart(items: CartItem[]) {
  cachedItems = items;

  try {
    const raw = JSON.stringify(items);

    window.localStorage.setItem(STORAGE_KEY, raw);
    cachedRaw = raw;
  } catch {
    storageFailed = true;
    console.error(
      "Unable to save cart. Browser storage may be unavailable."
    );
  }

  notifyCartChange();
}

function subscribeCart(callback: () => void) {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY && event.key !== null) return;

    cachedRaw = undefined;
    storageFailed = false;
    callback();
  };

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener(CART_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener(CART_CHANGE_EVENT, callback);
  };
}

function getLoadedSnapshot() {
  return typeof window !== "undefined";
}

function getServerLoadedSnapshot() {
  return false;
}

function updateCart(updater: (currentItems: CartItem[]) => CartItem[]) {
  const currentItems = getCartSnapshot();
  const nextItems = updater(currentItems);

  if (nextItems !== currentItems) {
    saveCart(nextItems);
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(
    subscribeCart,
    getCartSnapshot,
    () => EMPTY_CART
  );

  const isLoaded = useSyncExternalStore(
    subscribeCart,
    getLoadedSnapshot,
    getServerLoadedSnapshot
  );

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

      updateCart((currentItems) => {
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
                    MAX_CART_QUANTITY
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
    updateCart((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(
                item.quantity + 1,
                MAX_CART_QUANTITY
              ),
            }
          : item
      )
    );
  }, []);

  const decreaseQuantity = useCallback((id: string) => {
    updateCart((currentItems) =>
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
    updateCart((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  }, []);

  const clearCart = useCallback(() => {
    updateCart(() => EMPTY_CART);
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
