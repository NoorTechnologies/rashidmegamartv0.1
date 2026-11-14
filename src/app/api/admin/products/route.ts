import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { catalogRequest } from "@/lib/catalog-admin";
import { validateProduct } from "@/lib/catalog-validation";

export const runtime = "nodejs";
const select = "id,name,brand,category_id,pack_size,price,old_price,image,description,is_featured,is_best_seller,is_available,stock,created_at,updated_at,category:categories(name)";

export async function GET() {
  try {
    const rows = await catalogRequest<unknown[]>(`products?select=${select}&order=created_at.desc`);
    return NextResponse.json({ data: rows }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ message: "Products load nahi ho paaye." }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ message: "Invalid JSON." }, { status: 400 }); }
  const input = validateProduct(body);
  if (!input) return NextResponse.json({ message: "Product details invalid hain. Price, category, image aur stock check karein." }, { status: 422 });
  try {
    const category = await catalogRequest<{id:string}[]>(`categories?id=eq.${encodeURIComponent(input.categoryId)}&is_active=eq.true&select=id`);
    if (!category.length) return NextResponse.json({ message: "Selected category active nahi hai." }, { status: 422 });
    const [row] = await catalogRequest<unknown[]>(`products?select=${select}`, {
      method: "POST", headers: { Prefer: "return=representation" },
      body: JSON.stringify({ id: `prd-${randomUUID()}`, name: input.name, brand: input.brand, category_id: input.categoryId, pack_size: input.packSize, price: input.price, old_price: input.oldPrice, image: input.image, description: input.description, is_featured: input.isFeatured, is_best_seller: input.isBestSeller, is_available: input.isAvailable, stock: input.stock }),
    });
    return NextResponse.json({ data: row }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Product save nahi hua. Database fields verify karein." }, { status: 503 });
  }
}

export async function PATCH(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id || !/^prd-[a-f0-9-]{36}$/.test(id)) return NextResponse.json({ message: "Invalid product ID." }, { status: 400 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ message: "Invalid JSON." }, { status: 400 }); }
  const input = validateProduct(body);
  if (!input) return NextResponse.json({ message: "Product details invalid hain." }, { status: 422 });
  try {
    const category = await catalogRequest<{id:string}[]>(`categories?id=eq.${encodeURIComponent(input.categoryId)}&is_active=eq.true&select=id`);
    if (!category.length) return NextResponse.json({ message: "Selected category active nahi hai." }, { status: 422 });
    const rows = await catalogRequest<unknown[]>(`products?id=eq.${encodeURIComponent(id)}&select=${select}`, {
      method: "PATCH", headers: { Prefer: "return=representation" },
      body: JSON.stringify({ name: input.name, brand: input.brand, category_id: input.categoryId, pack_size: input.packSize, price: input.price, old_price: input.oldPrice, image: input.image, description: input.description, is_featured: input.isFeatured, is_best_seller: input.isBestSeller, is_available: input.isAvailable, stock: input.stock, updated_at: new Date().toISOString() }),
    });
    if (!rows.length) return NextResponse.json({ message: "Product nahi mila." }, { status: 404 });
    return NextResponse.json({ data: rows[0] });
  } catch {
    return NextResponse.json({ message: "Product update nahi hua." }, { status: 503 });
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id || !/^prd-[a-f0-9-]{36}$/.test(id)) return NextResponse.json({ message: "Invalid product ID." }, { status: 400 });
  try {
    const rows = await catalogRequest<unknown[]>(`products?id=eq.${encodeURIComponent(id)}&select=id`, { method: "DELETE", headers: { Prefer: "return=representation" } });
    if (!rows.length) return NextResponse.json({ message: "Product nahi mila." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: "Product delete nahi hua." }, { status: 503 });
  }
}
