/**
 * DEMO grocery rates for kit customisation.
 * These are placeholders only; replace them with owner-confirmed rates later.
 * Each rate is for one base unit (kg, litre, piece, pack, etc.).
 */
export type GroceryUnit = "kg" | "g" | "l" | "ml" | "pcs" | "pack" | "pouch" | "sack" | "set";
export interface GroceryRate { price: number; baseQuantity: number; baseUnit: GroceryUnit }
export interface GroceryLineInput { name: string; quantity: string; rate?: number; rateUnit?: GroceryUnit }
export interface GroceryLineEstimate { name: string; quantity: string; rate: number; rateUnit: GroceryUnit; amount: number | null; reason?: "rate-missing" | "quantity-unsupported" }

export const groceryRates: Record<string, GroceryRate> = {
  "rice": { price: 60, baseQuantity: 1, baseUnit: "kg" },
  "atta": { price: 40, baseQuantity: 1, baseUnit: "kg" },
  "toor dal": { price: 150, baseQuantity: 1, baseUnit: "kg" },
  "moong dal": { price: 130, baseQuantity: 1, baseUnit: "kg" },
  "masoor dal": { price: 110, baseQuantity: 1, baseUnit: "kg" },
  "chana dal": { price: 100, baseQuantity: 1, baseUnit: "kg" },
  "sugar": { price: 45, baseQuantity: 1, baseUnit: "kg" },
  "cooking oil": { price: 150, baseQuantity: 1, baseUnit: "l" },
  "salt": { price: 20, baseQuantity: 1, baseUnit: "kg" },
  "tea": { price: 300, baseQuantity: 1, baseUnit: "kg" },
  "poha": { price: 50, baseQuantity: 1, baseUnit: "kg" },
  "suji": { price: 45, baseQuantity: 1, baseUnit: "kg" },
  "besan": { price: 80, baseQuantity: 1, baseUnit: "kg" },
  "peanuts": { price: 120, baseQuantity: 1, baseUnit: "kg" },
  "spices combo": { price: 300, baseQuantity: 1, baseUnit: "kg" },
  "turmeric powder": { price: 180, baseQuantity: 1, baseUnit: "kg" },
  "red chilli powder": { price: 260, baseQuantity: 1, baseUnit: "kg" },
  "coriander powder": { price: 160, baseQuantity: 1, baseUnit: "kg" },
  "garam masala": { price: 500, baseQuantity: 1, baseUnit: "kg" },
  "cumin seeds": { price: 350, baseQuantity: 1, baseUnit: "kg" },
  "mustard seeds": { price: 120, baseQuantity: 1, baseUnit: "kg" },
  "black pepper": { price: 700, baseQuantity: 1, baseUnit: "kg" },
};

const UNIT_ALIASES: Record<string, GroceryUnit> = {
  kg: "kg", kilo: "kg", kilos: "kg", kilogram: "kg", kilograms: "kg", किलो: "kg",
  g: "g", gm: "g", gram: "g", grams: "g", ग्राम: "g",
  l: "l", litre: "l", litres: "l", liter: "l", liters: "l", लीटर: "l",
  ml: "ml", millilitre: "ml", millilitres: "ml", milliliter: "ml", milliliters: "ml", मिलीलीटर: "ml",
  pc: "pcs", pcs: "pcs", piece: "pcs", pieces: "pcs", नग: "pcs", पीस: "pcs", पत्ता: "pcs",
  pack: "pack", packs: "pack", packet: "pack", packets: "pack", पैकेट: "pack",
  pouch: "pouch", pouches: "pouch", पाउच: "pouch",
  sack: "sack", sacks: "sack", बोरी: "sack",
  set: "set", sets: "set", सेट: "set",
};
const UNIT_TO_BASE: Record<GroceryUnit, { family: "mass" | "volume" | "pieces" | "packs" | "pouches" | "sacks" | "sets"; factor: number }> = {
  kg: { family: "mass", factor: 1000 }, g: { family: "mass", factor: 1 },
  l: { family: "volume", factor: 1000 }, ml: { family: "volume", factor: 1 },
  pcs: { family: "pieces", factor: 1 }, pack: { family: "packs", factor: 1 },
  pouch: { family: "pouches", factor: 1 }, sack: { family: "sacks", factor: 1 }, set: { family: "sets", factor: 1 },
};

function parseQuantity(value: string) {
  const match = value.trim().toLowerCase().match(/^(\d+(?:\\.\d+)?)\s*([a-zA-Z]+|किलो|ग्राम|लीटर|मिलीलीटर|नग|पीस|बोरी|पैकेट|पाउच|सेट|पत्ता)?$/);
  if (!match) return null;
  const amount = Number(match[1]);
  const unit = UNIT_ALIASES[match[2] ?? "pcs"];
  return Number.isFinite(amount) && amount > 0 && unit ? { amount, unit } : null;
}

function defaultBaseUnit(unit: GroceryUnit): GroceryUnit {
  if (unit === "g") return "kg";
  if (unit === "ml") return "l";
  return unit;
}

export function getGroceryRate(name: string, quantity = "1"): GroceryRate {
  const saved = groceryRates[name.trim().toLocaleLowerCase()];
  const parsed = parseQuantity(quantity);
  if (saved && (!parsed || UNIT_TO_BASE[saved.baseUnit].family === UNIT_TO_BASE[parsed.unit].family)) return saved;
  const unit = parsed ? defaultBaseUnit(parsed.unit) : "pcs";
  return { price: 25, baseQuantity: 1, baseUnit: unit };
}

export function isValidGroceryQuantity(value: string) {
  return parseQuantity(value) !== null;
}

export function estimateGroceryLine(name: string, quantity: string, override?: { rate?: number; rateUnit?: GroceryUnit }): GroceryLineEstimate {
  const fallback = getGroceryRate(name, quantity);
  const rate = override?.rate ?? fallback.price;
  const rateUnit = override?.rateUnit ?? fallback.baseUnit;
  if (!Number.isFinite(rate) || rate < 0) return { name, quantity, rate, rateUnit, amount: null, reason: "rate-missing" };
  const requested = parseQuantity(quantity);
  if (!requested) return { name, quantity, rate, rateUnit, amount: null, reason: "quantity-unsupported" };
  const requestedUnit = UNIT_TO_BASE[requested.unit];
  const rateBase = UNIT_TO_BASE[rateUnit];
  if (requestedUnit.family !== rateBase.family) return { name, quantity, rate, rateUnit, amount: null, reason: "quantity-unsupported" };
  const amount = (requested.amount * requestedUnit.factor / rateBase.factor) * rate;
  return { name, quantity, rate, rateUnit, amount: Number.isFinite(amount) ? Math.round((amount + Number.EPSILON) * 100) / 100 : null };
}

export function estimateGroceryLines(lines: GroceryLineInput[]) {
  const estimates = lines.map((line) => estimateGroceryLine(line.name, line.quantity, { rate: line.rate, rateUnit: line.rateUnit }));
  const pendingCount = estimates.filter((line) => line.amount === null).length;
  return { lines: estimates, total: pendingCount ? null : estimates.reduce((sum, line) => sum + (line.amount ?? 0), 0), pendingCount };
}
