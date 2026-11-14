export type ProductInput = {
  name: string;
  brand: string;
  categoryId: string;
  packSize: string;
  price: number;
  oldPrice: number | null;
  image: string;
  description: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  isAvailable: boolean;
  stock: number | null;
};

export type KitInput = {
  name: string;
  subtitle: string;
  categoryId: string | null;
  image: string;
  price: number;
  oldPrice: number | null;
  discount: string | null;
  description: string;
  isFeatured: boolean;
  isAvailable: boolean;
  items: { name: string; quantity: string | null }[];
};

const isText = (value: unknown, maxLength: number, required = true): value is string =>
  typeof value === "string" &&
  value.trim().length <= maxLength &&
  (!required || value.trim().length > 0);

const isMoney = (value: unknown): value is number =>
  typeof value === "number" &&
  Number.isFinite(value) &&
  value > 0 &&
  value <= 10_000_000;

const isOptionalMoney = (value: unknown): value is number | null =>
  value === null || isMoney(value);

const isBoolean = (value: unknown): value is boolean =>
  typeof value === "boolean";

const isCategoryId = (value: unknown): value is string =>
  typeof value === "string" &&
  /^[a-z0-9][a-z0-9-]{1,79}$/.test(value);

function isStoragePath(value: unknown, folder: "products" | "kits"): value is string {
  if (typeof value !== "string" || !value.startsWith(folder + "/")) return false;
  return /^[a-zA-Z0-9_-]+\.(?:jpg|jpeg|png|webp|avif)$/.test(value.slice(folder.length + 1));
}

function isProductImagePath(value: unknown): value is string {
  return (
    isStoragePath(value, "products") ||
    (typeof value === "string" &&
      /^\/products\/[a-zA-Z0-9_-]+\.(?:jpg|jpeg|png|webp|avif)$/i.test(value))
  );
}

export function validateProduct(value: unknown): ProductInput | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;

  const { name, brand, categoryId, packSize, price, oldPrice, image, description,
    isFeatured, isBestSeller, isAvailable, stock } = input;

  if (
    !isText(name, 120) ||
    !isText(brand, 80) ||
    !isCategoryId(categoryId) ||
    !isText(packSize, 60) ||
    !isMoney(price) ||
    !isOptionalMoney(oldPrice) ||
    !isProductImagePath(image) ||
    !isText(description, 2000, false) ||
    !isBoolean(isFeatured) ||
    !isBoolean(isBestSeller) ||
    !isBoolean(isAvailable) ||
    !(stock === null || (typeof stock === "number" && Number.isInteger(stock) && stock >= 0 && stock <= 1_000_000))
  ) return null;

  if (oldPrice !== null && oldPrice <= price) return null;

  return {
    name: name.trim(),
    brand: brand.trim(),
    categoryId,
    packSize: packSize.trim(),
    price,
    oldPrice,
    image,
    description: description.trim(),
    isFeatured,
    isBestSeller,
    isAvailable,
    stock,
  };
}

export function validateKit(value: unknown): KitInput | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;

  const { name, subtitle, categoryId, image, price, oldPrice, discount,
    description, isFeatured, isAvailable, items } = input;

  if (
    !isText(name, 120) ||
    !isText(subtitle, 160) ||
    !(categoryId === null || isCategoryId(categoryId)) ||
    !isStoragePath(image, "kits") ||
    !isMoney(price) ||
    !isOptionalMoney(oldPrice) ||
    !(discount === null || isText(discount, 40, false)) ||
    !isText(description, 3000, false) ||
    !isBoolean(isFeatured) ||
    !isBoolean(isAvailable) ||
    !Array.isArray(items) ||
    items.length < 1 ||
    items.length > 60
  ) return null;

  if (oldPrice !== null && oldPrice <= price) return null;

  const validatedItems: KitInput["items"] = [];
  for (const item of items) {
    if (!item || typeof item !== "object" || Array.isArray(item)) return null;
    const row = item as Record<string, unknown>;
    const itemName = row.name;
    const quantity = row.quantity;
    if (!isText(itemName, 120) || !(quantity === null || isText(quantity, 40, false))) return null;
    validatedItems.push({
      name: itemName.trim(),
      quantity: quantity === null ? null : quantity.trim(),
    });
  }

  return {
    name: name.trim(),
    subtitle: subtitle.trim(),
    categoryId,
    image,
    price,
    oldPrice,
    discount: discount === null ? null : discount.trim(),
    description: description.trim(),
    isFeatured,
    isAvailable,
    items: validatedItems,
  };
}
