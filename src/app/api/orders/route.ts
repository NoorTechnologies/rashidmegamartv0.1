import { NextRequest, NextResponse } from "next/server";
import { catalogRequest } from "@/lib/catalog-admin";

export const runtime = "nodejs";
type ItemInput = { id: string; type: "product" | "kit"; quantity: number };
type CatalogRow = { id: string; name: string; brand?: string; pack_size?: string; price: number | string; is_available: boolean; stock?: number | null };
const STORE_WHATSAPP_NUMBER = "918962531603";
const clean = (value: unknown, max: number) => typeof value === "string" ? value.trim().replace(/[\x00-\x1F\x7F]/g, " ").replace(/\s+/g, " ").slice(0, max) : "";
const fail = (message: string, status: number) => NextResponse.json({ message }, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== request.nextUrl.origin) return fail("Request origin is not allowed.", 403);
  if (!(request.headers.get("content-type") || "").toLowerCase().includes("application/json")) return fail("Content-Type must be application/json.", 415);
  let raw: string;
  try { raw = await request.text(); } catch { return fail("Invalid request.", 400); }
  if (Buffer.byteLength(raw, "utf8") > 16384) return fail("Request is too large.", 413);
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return fail("Invalid checkout details.", 400);
    body = parsed as Record<string, unknown>;
  } catch { return fail("Invalid checkout details.", 400); }

  const customerName = clean(body.customerName, 100);
  const customerPhone = clean(body.phone, 10);
  const deliveryAddress = clean(body.address, 1000);
  const customerNote = clean(body.note, 500);
  const paymentPreference = body.paymentMethod === "COD" || body.paymentMethod === "UPI" ? body.paymentMethod : "";
  if (customerName.length < 2 || !/^[6-9]\d{9}$/.test(customerPhone) || deliveryAddress.length < 10) return fail("Please enter a valid name, 10-digit mobile number and complete delivery address.", 400);
  if (!paymentPreference) return fail("Choose a valid payment preference.", 400);
  if (!Array.isArray(body.items) || body.items.length < 1 || body.items.length > 30) return fail("Cart must contain 1 to 30 unique items.", 400);

  const seen = new Set<string>();
  const input: ItemInput[] = [];
  for (const value of body.items) {
    if (!value || typeof value !== "object") return fail("Invalid cart item.", 400);
    const row = value as Record<string, unknown>;
    const id = clean(row.id, 100);
    const type = row.type;
    const quantity = row.quantity;
    const key = String(type) + ":" + id;
    if (!id || (type !== "product" && type !== "kit") || !Number.isSafeInteger(quantity) || Number(quantity) < 1 || Number(quantity) > 99 || seen.has(key)) return fail("Cart contains invalid or duplicate items.", 400);
    seen.add(key);
    input.push({ id, type, quantity: Number(quantity) });
  }

  try {
    const lines = await Promise.all(input.map(async (item) => {
      const table = item.type === "product" ? "products" : "kits";
      const columns = item.type === "product" ? "id,name,brand,pack_size,price,is_available,stock" : "id,name,price,is_available";
      const rows = await catalogRequest<CatalogRow[]>(table + "?select=" + columns + "&id=eq." + encodeURIComponent(item.id) + "&limit=1");
      const product = rows[0];
      if (!product || !product.is_available) throw new Error("An item is no longer available.");
      if (item.type === "product" && product.stock !== null && product.stock !== undefined && product.stock < item.quantity) throw new Error("Insufficient stock for " + product.name + ".");
      const price = Number(product.price);
      if (!Number.isFinite(price) || price < 0) throw new Error("Invalid catalog price.");
      return {
        catalog_item_id: item.id, item_type: item.type, item_name: product.name,
        brand: product.brand || "", pack_size: product.pack_size || (item.type === "kit" ? "Grocery Kit" : ""),
        unit_price: price, quantity: item.quantity, line_total: Number((price * item.quantity).toFixed(2)),
      };
    }));
    const subtotal = Number(lines.reduce((sum, line) => sum + line.line_total, 0).toFixed(2));
    if (!Number.isFinite(subtotal) || subtotal > 10000000) return fail("Order total is outside the allowed range.", 400);
    const suffix = crypto.randomUUID().slice(0, 6).toUpperCase();
    const orderNumber = "RMM-" + new Date().toISOString().slice(0, 10).replace(/-/g, "") + "-" + suffix;
    const created = await catalogRequest<Array<{ id: string; order_number: string }>>("orders?select=id,order_number", {
      method: "POST", headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        order_number: orderNumber, customer_name: customerName, customer_phone: customerPhone,
        delivery_address: deliveryAddress, customer_note: customerNote, payment_preference: paymentPreference,
        subtotal, total_amount: subtotal, status: "new", source: "whatsapp_checkout",
      }),
    });
    const order = created[0];
    if (!order) throw new Error("Order could not be saved.");
    try {
      await catalogRequest("order_items", {
        method: "POST", headers: { Prefer: "return=representation" },
        body: JSON.stringify(lines.map((line) => ({ ...line, order_id: order.id }))),
      });
    } catch (cause) {
      await catalogRequest("orders?id=eq." + encodeURIComponent(order.id), { method: "DELETE" }).catch(() => undefined);
      throw cause;
    }
    const itemText = lines.map((line, index) => (index + 1) + ". " + line.item_name + (line.pack_size ? " (" + line.pack_size + ")" : "") + "\n   Qty: " + line.quantity + " x ₹" + line.unit_price + " = ₹" + line.line_total).join("\n\n");
    const message = [
      "🛒 *Rashid Mega Mart Order: " + order.order_number + "*",
      "Name: " + customerName, "Phone: " + customerPhone, "Address: " + deliveryAddress,
      customerNote ? "Note: " + customerNote : "", "", "*Order Items*", itemText, "",
      "*Subtotal: ₹" + subtotal + "*", "Payment Preference: " + (paymentPreference === "COD" ? "Cash on Delivery" : "UPI"),
      "Please confirm stock, delivery charges and final payable amount.",
    ].filter(Boolean).join("\n");
    const whatsappUrl = "https://wa.me/" + STORE_WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
    return NextResponse.json({ success: true, orderNumber: order.order_number, whatsappUrl }, { headers: { "Cache-Control": "no-store" } });
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : "";
    if (message.startsWith("An item is no longer available") || message.startsWith("Insufficient stock")) return fail(message, 409);
    return fail("Unable to save your order. Please try again.", 500);
  }
}
