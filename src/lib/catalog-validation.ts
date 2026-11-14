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
const storagePath = (value: unknown, folder: "products" | "kits"): value is string =>
  typeof value === "string" &&
  new RegExp(`^${folder}/[a-zA-Z0-9_-]+\\\\.(?:jpg|jpeg|png|webp|avif)$`).test(value);
