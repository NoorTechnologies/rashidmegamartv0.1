export type ProductInput = {
  name: string; brand: string; categoryId: string; packSize: string;
  price: number; oldPrice: number | null; image: string; description: string;
  isFeatured: boolean; isBestSeller: boolean; isAvailable: boolean; stock: number | null;
};
export type KitInput = {
  name: string; subtitle: string; categoryId: string | null; image: string;
  price: number; oldPrice: number | null; discount: string | null;
  description: string; isFeatured: boolean; isAvailable: boolean;
  items: { name: string; quantity: string | null }[];
};

const text = (v: unknown, max: number, required = true): v is string =>
  typeof v === "string" && v.trim().length <= max && (!required || v.trim().length > 0);
const money = (v: unknown): v is number =>
  typeof v === "number" && Number.isFinite(v) && v > 0 && v <= 10_000_000;
const optionalMoney = (v: unknown): v is number | null =>
  v === null || (typeof v === "number" && Number.isFinite(v) && v > 0 && v <= 10_000_000);
const bool = (v: unknown): v is boolean => typeof v === "boolean";
const slug = (v: unknown): v is string => typeof v === "string" && /^[a-z0-9][a-z0-9-]{1,79}$/.test(v);
const storagePath = (v: unknown): v is string =>
  typeof v === "string" && /^products\/[a-zA-Z0-9_-]+\.(?:jpg|jpeg|png|webp|avif)$/.test(v) ||
  typeof v === "string" && /^kits\/[a-zA-Z0-9_-]+\.(?:jpg|jpeg|png|webp|avif)$/.test(v);

export function validateProduct(value: unknown): ProductInput | null {
  if (!value || typeof value !== "object") return null;
  const v = value as Record<string, unknown>;
  if (
    !text(v.name, 120) || !text(v.brand, 80) || !slug(v.categoryId) ||
    !text(v.packSize, 60) || !money(v.price) || !optionalMoney(v.oldPrice) ||
    !storagePath(v.image) || !text(v.description, 2000, false) ||
    !bool(v.isFeatured) || !bool(v.isBestSeller) || !bool(v.isAvailable) ||
    !(v.stock === null || (Number.isInteger(v.stock) && Number(v.stock) >= 0 && Number(v.stock) <= 1_000_000))
  ) return null;
  if (v.oldPrice !== null && v.oldPrice <= v.price) return null;
  return {
    name: v.name.trim(), brand: v.brand.trim(), categoryId: v.categoryId,
    packSize: v.packSize.trim(), price: v.price, oldPrice: v.oldPrice,
    image: v.image, description: v.description.trim(), isFeatured: v.isFeatured,
    isBestSeller: v.isBestSeller, isAvailable: v.isAvailable, stock: v.stock as number | null,
  };
}

export function validateKit(value: unknown): KitInput | null {
  if (!value || typeof value !== "object") return null;
  const v = value as Record<string, unknown>;
  if (
    !text(v.name, 120) || !text(v.subtitle, 160) ||
    !(v.categoryId === null || slug(v.categoryId)) ||
    !storagePath(v.image) || !money(v.price) || !optionalMoney(v.oldPrice) ||
    !(v.discount === null || text(v.discount, 40, false)) ||
    !text(v.description, 3000, false) || !bool(v.isFeatured) || !bool(v.isAvailable) ||
    !Array.isArray(v.items) || v.items.length < 1 || v.items.length > 60
  ) return null;
  if (v.oldPrice !== null && v.oldPrice <= v.price) return null;
  const items: KitInput["items"] = [];
  for (const item of v.items) {
    if (!item || typeof item !== "object") return null;
    const row = item as Record<string, unknown>;
    if (!text(row.name, 120) || !(row.quantity === null || text(row.quantity, 40, false))) return null;
    items.push({ name: row.name.trim(), quantity: row.quantity as string | null });
  }
  return {
    name: v.name.trim(), subtitle: v.subtitle.trim(), categoryId: v.categoryId as string | null,
    image: v.image, price: v.price, oldPrice: v.oldPrice, discount: v.discount as string | null,
    description: v.description.trim(), isFeatured: v.isFeatured, isAvailable: v.isAvailable, items,
  };
}
