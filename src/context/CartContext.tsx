
"use client";

import { kits } from "@/data/kits";

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
  kitContents?: { name: string; quantity: string }[];
  requestedItems?: { name: string; quantity: string }[];
  isCustomized?: boolean;
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
  updateKitCustomization: (id: string, kitContents: { name: string; quantity: string }[], requestedItems: { name: string; quantity: string }[]) => void;
}

const STORAGE_KEY = "rashid-mega-mart-cart";
const MAX_CART_QUANTITY = 99;
const CART_CHANGE_EVENT = "rashid-mega-mart-cart-change";

const EMPTY_CART: CartItem[] = [];

const CartContext = createContext<CartContextType | undefined>(undefined);

let cachedRaw: string | null | undefined;
let cachedItems: CartItem[] = EMPTY_CART;
let storageFailed = false;

const MAX_CART_ITEMS = 30;
const MAX_CUSTOMIZED_LINES = 50;
const MAX_EXTRA_LINES = 25;
const MAX_CUSTOMIZED_NAME_LENGTH = 70;
const MAX_CUSTOMIZED_QUANTITY_LENGTH = 24;

type KitLine = { name: string; quantity: string };

function isValidKitLines(value: unknown, maxItems = MAX_CUSTOMIZED_LINES): value is KitLine[] {
  return Array.isArray(value) &&
    value.length <= maxItems &&
    value.every((entry) =>
      !!entry &&
      typeof entry === "object" &&
      typeof entry.name === "string" &&
      entry.name.trim().length > 0 &&
      entry.name.length <= MAX_CUSTOMIZED_NAME_LENGTH &&
      typeof entry.quantity === "string" &&
      entry.quantity.trim().length > 0 &&
      entry.quantity.length <= MAX_CUSTOMIZED_QUANTITY_LENGTH
    );
}

function isValidCartItem(item: unknown): item is CartItem {
  if (!item || typeof item !== "object") return false;
  const value = item as Record<string, unknown>;

  return (
    typeof value.id === "string" &&
    value.id.trim().length > 0 &&
    typeof value.name === "string" &&
    typeof value.price === "number" &&
    Number.isFinite(value.price) &&
    typeof value.image === "string" &&
    Number.isSafeInteger(value.quantity) &&
    (value.quantity as number) > 0 &&
    (value.quantity as number) <= MAX_CART_QUANTITY &&
    (value.kitContents === undefined || isValidKitLines(value.kitContents)) &&
    (value.requestedItems === undefined || isValidKitLines(value.requestedItems, MAX_EXTRA_LINES)) &&
    ((value.kitContents === undefined ? 0 : (value.kitContents as KitLine[]).length) +
      (value.requestedItems === undefined ? 0 : (value.requestedItems as KitLine[]).length) <= MAX_CUSTOMIZED_LINES)
  );
}

function normalizeCartItem(item: CartItem): CartItem | null {
  const kit = kits.find((entry) => entry.id === item.id && entry.isAvailable);
  if (!kit) return null;

  return {
    id: kit.id,
    name: kit.name,
    price: kit.price,
    image: kit.image,
    quantity: item.quantity,
    brand: "Rashid Mega Mart",
    packSize: "Grocery Kit",
    ...(item.kitContents ? { kitContents: item.kitContents } : {}),
    ...(item.requestedItems ? { requestedItems: item.requestedItems } : {}),
    ...(item.isCustomized === true ? { isCustomized: true } : {}),
  };
}

function parseCart(raw: string | null): CartItem[] {
  if (!raw) return EMPTY_CART;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY_CART;

    const normalized = parsed
      .filter(isValidCartItem)
      .map(normalizeCartItem)
      .filter((item): item is CartItem => item !== null);
    const unique = new Map(normalized.map((item) => [item.id, item]));
    return Array.from(unique.values()).slice(0, MAX_CART_ITEMS);
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
      const kit = kits.find((entry) => entry.id === product.id && entry.isAvailable);
      if (!kit) return;

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

        return currentItems.length >= MAX_CART_ITEMS
          ? currentItems
          : [...currentItems, { id: kit.id, name: kit.name, price: kit.price, image: kit.image, brand: "Rashid Mega Mart", packSize: "Grocery Kit", quantity: 1 }];
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

  const updateKitCustomization = useCallback((id: string, kitContents: { name: string; quantity: string }[], requestedItems: { name: string; quantity: string }[]) => {
    const kitExists = kits.some((kit) => kit.id === id && kit.isAvailable);
    if (!kitExists || !isValidKitLines(kitContents) || !isValidKitLines(requestedItems, MAX_EXTRA_LINES) || kitContents.length + requestedItems.length > MAX_CUSTOMIZED_LINES) return;

    updateCart((currentItems) => currentItems.map((item) =>
      item.id === id ? { ...item, kitContents, requestedItems, isCustomized: true } : item
    ));
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
      updateKitCustomization,
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
      updateKitCustomization,
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
