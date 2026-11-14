import { NextResponse } from "next/server";
import { catalogRequest, publicImageUrl } from "@/lib/catalog-admin";
export const runtime = "nodejs";
export async function GET() {
  try {
    const rows = await catalogRequest<Record<string, unknown>[]>( "products?select=id,name,brand,category_id,pack_size,price,old_price,image,description,is_featured,is_best_seller,is_available,stock,category:categories(name)&is_available=eq.true&order=created_at.desc");
    const data = rows.map((row) => ({ id: row.id, name: row.name, brand: row.brand, category: (row.category as {name?:string} | null)?.name ?? "", categoryId: row.category_id, packSize: row.pack_size, price: Number(row.price), oldPrice: row.old_price === null ? undefined : Number(row.old_price), image: typeof row.image === "string" ? publicImageUrl(row.image) : "", description: row.description, isFeatured: row.is_featured, isBestSeller: row.is_best_seller, isAvailable: row.is_available, stock: row.stock }));
    return NextResponse.json({ data }, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } });
  } catch {
    return NextResponse.json({ data: [], message: "Catalogue temporarily unavailable." }, { status: 503 });
  }
}
