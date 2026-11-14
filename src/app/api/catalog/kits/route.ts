import { NextResponse } from "next/server";
import { catalogRequest, publicImageUrl } from "@/lib/catalog-admin";
export const runtime = "nodejs";
export async function GET() {
  try {
    const rows = await catalogRequest<Record<string, unknown>[]>( "kits?select=id,name,subtitle,category_id,image,price,old_price,discount,description,is_featured,is_available,category:categories(name),items:kit_items(item_name,quantity,sort_order)&is_available=eq.true&order=created_at.desc");
    const data = rows.map((row) => ({ id: row.id, name: row.name, subtitle: row.subtitle, category: (row.category as {name?:string} | null)?.name ?? "", categoryId: row.category_id, image: typeof row.image === "string" ? publicImageUrl(row.image) : "", price: Number(row.price), oldPrice: row.old_price === null ? undefined : Number(row.old_price), discount: row.discount ?? undefined, description: row.description, isFeatured: row.is_featured, isAvailable: row.is_available, items: ((row.items as {item_name:string;quantity:string|null;sort_order:number}[]) ?? []).sort((a,b)=>a.sort_order-b.sort_order).map((item)=>item.quantity ? `${item.item_name} - ${item.quantity}` : item.item_name) }));
    return NextResponse.json({ data }, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } });
  } catch {
    return NextResponse.json({ data: [], message: "Kits temporarily unavailable." }, { status: 503 });
  }
}
