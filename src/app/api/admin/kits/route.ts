import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { catalogRequest } from "@/lib/catalog-admin";
import { validateKit } from "@/lib/catalog-validation";

export const runtime = "nodejs";
const select = "id,name,subtitle,category_id,image,price,old_price,discount,description,is_featured,is_available,created_at,updated_at,category:categories(name),items:kit_items(item_name,quantity,sort_order)";

async function saveItems(kitId: string, items: {name:string;quantity:string|null}[]) {
  await catalogRequest(`kit_items?kit_id=eq.${encodeURIComponent(kitId)}`, { method: "DELETE" });
  await catalogRequest("kit_items", {
    method: "POST",
    body: JSON.stringify(items.map((item, index) => ({ kit_id: kitId, item_name: item.name, quantity: item.quantity, sort_order: index + 1 }))),
  });
}

export async function GET() {
  try {
    const rows = await catalogRequest<unknown[]>(`kits?select=${select}&order=created_at.desc`);
    return NextResponse.json({ data: rows }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ message: "Kits load nahi ho paaye." }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ message: "Invalid JSON." }, { status: 400 }); }
  const input = validateKit(body);
  if (!input) return NextResponse.json({ message: "Kit details ya included items invalid hain." }, { status: 422 });
  const id = `kit-${randomUUID()}`;
  try {
    if (input.categoryId) {
      const category = await catalogRequest<{id:string}[]>(`categories?id=eq.${encodeURIComponent(input.categoryId)}&is_active=eq.true&select=id`);
      if (!category.length) return NextResponse.json({ message: "Selected category active nahi hai." }, { status: 422 });
    }
    await catalogRequest("kits", { method: "POST", body: JSON.stringify({ id, name: input.name, subtitle: input.subtitle, category_id: input.categoryId, image: input.image, price: input.price, old_price: input.oldPrice, discount: input.discount, description: input.description, is_featured: input.isFeatured, is_available: input.isAvailable }) });
    try { await saveItems(id, input.items); } catch (error) {
      await catalogRequest(`kits?id=eq.${encodeURIComponent(id)}`, { method: "DELETE" }).catch(() => undefined);
      throw error;
    }
    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Kit save nahi hua." }, { status: 503 });
  }
}

export async function PATCH(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id || !/^kit-[a-f0-9-]{36}$/.test(id)) return NextResponse.json({ message: "Invalid kit ID." }, { status: 400 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ message: "Invalid JSON." }, { status: 400 }); }
  const input = validateKit(body);
  if (!input) return NextResponse.json({ message: "Kit details ya included items invalid hain." }, { status: 422 });
  try {
    if (input.categoryId) {
      const category = await catalogRequest<{id:string}[]>(`categories?id=eq.${encodeURIComponent(input.categoryId)}&is_active=eq.true&select=id`);
      if (!category.length) return NextResponse.json({ message: "Selected category active nahi hai." }, { status: 422 });
    }
    const rows = await catalogRequest<unknown[]>(`kits?id=eq.${encodeURIComponent(id)}&select=id`, {
      method: "PATCH", headers: { Prefer: "return=representation" },
      body: JSON.stringify({ name: input.name, subtitle: input.subtitle, category_id: input.categoryId, image: input.image, price: input.price, old_price: input.oldPrice, discount: input.discount, description: input.description, is_featured: input.isFeatured, is_available: input.isAvailable, updated_at: new Date().toISOString() }),
    });
    if (!rows.length) return NextResponse.json({ message: "Kit nahi mila." }, { status: 404 });
    await saveItems(id, input.items);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: "Kit update nahi hua." }, { status: 503 });
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id || !/^kit-[a-f0-9-]{36}$/.test(id)) return NextResponse.json({ message: "Invalid kit ID." }, { status: 400 });
  try {
    await catalogRequest(`kit_items?kit_id=eq.${encodeURIComponent(id)}`, { method: "DELETE" });
    const rows = await catalogRequest<unknown[]>(`kits?id=eq.${encodeURIComponent(id)}&select=id`, { method: "DELETE", headers: { Prefer: "return=representation" } });
    if (!rows.length) return NextResponse.json({ message: "Kit nahi mila." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: "Kit delete nahi hua." }, { status: 503 });
  }
}
