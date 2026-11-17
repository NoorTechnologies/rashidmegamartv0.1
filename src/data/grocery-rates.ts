/**
 * Owner-maintained grocery rates.
 * price is the amount for baseQuantity of baseUnit. Add only store-confirmed rates.
 */
export type GroceryUnit = "kg" | "g" | "l" | "ml" | "pcs";
export interface GroceryRate { price: number; baseQuantity: number; baseUnit: GroceryUnit }
export interface GroceryLineEstimate { name: string; quantity: string; amount: number | null; reason?: "rate-missing" | "quantity-unsupported" }

/** Intentionally empty until Rashid Mega Mart confirms actual item rates. */
export const groceryRates: Record<string, GroceryRate> = {};

const UNIT_ALIASES: Record<string, GroceryUnit> = {
  kg: "kg", kilo: "kg", kilos: "kg", kilogram: "kg", kilograms: "kg", किलो: "kg",
  g: "g", gm: "g", gram: "g", grams: "g", ग्राम: "g",
  l: "l", litre: "l", litres: "l", liter: "l", liters: "l", लीटर: "l",
  ml: "ml", millilitre: "ml", millilitres: "ml", milliliter: "ml", milliliters: "ml", मिलीलीटर: "ml",
  pc: "pcs", pcs: "pcs", piece: "pcs", pieces: "pcs", नग: "pcs", पीस: "pcs", pack: "pcs", packs: "pcs", packet: "pcs", packets: "pcs", set: "pcs", sets: "pcs", sack: "pcs", बोरी: "pcs", पैकेट: "pcs", सेट: "pcs", पत्ता: "pcs",
};
const UNIT_TO_BASE: Record<GroceryUnit, { family: "mass" | "volume" | "count"; factor: number }> = {
  kg: { family: "mass", factor: 1000 }, g: { family: "mass", factor: 1 },
  l: { family: "volume", factor: 1000 }, ml: { family: "volume", factor: 1 },
  pcs: { family: "count", factor: 1 },
};

function parseQuantity(value: string) {
  const match = value.trim().toLowerCase().match(/^(\d+(?:\.\d+)?)\s*([a-zA-Z]+|किलो|ग्राम|लीटर|मिलीलीटर|नग|पीस|बोरी|पैकेट|सेट|पत्ता)?$/);
  if (!match) return null;
  const amount = Number(match[1]);
  const unit = UNIT_ALIASES[match[2] ?? "pcs"];
  return Number.isFinite(amount) && amount >= 0 && unit ? { amount, unit } : null;
}

export function estimateGroceryLine(name: string, quantity: string): GroceryLineEstimate {
  const rate = groceryRates[name.trim().toLocaleLowerCase()];
  if (!rate || !Number.isFinite(rate.price) || rate.price < 0 || !Number.isFinite(rate.baseQuantity) || rate.baseQuantity <= 0) {
    return { name, quantity, amount: null, reason: "rate-missing" };
  }
  const requested = parseQuantity(quantity);
  if (!requested) return { name, quantity, amount: null, reason: "quantity-unsupported" };
  const requestedUnit = UNIT_TO_BASE[requested.unit];
  const rateUnit = UNIT_TO_BASE[rate.baseUnit];
  if (requestedUnit.family !== rateUnit.family) return { name, quantity, amount: null, reason: "quantity-unsupported" };
  const amount = (requested.amount * requestedUnit.factor / (rate.baseQuantity * rateUnit.factor)) * rate.price;
  return { name, quantity, amount: Number.isFinite(amount) ? Math.round((amount + Number.EPSILON) * 100) / 100 : null };
}

export function estimateGroceryLines(lines: { name: string; quantity: string }[]) {
  const estimates = lines.map((line) => estimateGroceryLine(line.name, line.quantity));
  const pendingCount = estimates.filter((line) => line.amount === null).length;
  return { lines: estimates, total: pendingCount ? null : estimates.reduce((sum, line) => sum + (line.amount ?? 0), 0), pendingCount };
}
