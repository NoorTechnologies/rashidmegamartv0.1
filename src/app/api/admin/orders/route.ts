import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-auth";
import { catalogRequest } from "@/lib/catalog-admin";

export const runtime = "nodejs";
const STATUSES = ["new", "confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"] as const;
async function authorized() {
  const store = await cookies();
  return verifyAdminSession(store.get(ADMIN_SESSION_COOKIE)?.value);
}
const fail = (message: string, status: number) => NextResponse.json({ message }, { status, headers: { "Cache-Control": "no-store" } });

export async function GET() {
  if (!(await authorized())) return fail("Unauthorized.", 401);
  try {
    const orders = await catalogRequest("orders?select=*,order_items(*)&order=created_at.desc&limit=100");
    return NextResponse.json({ orders }, { headers: { "Cache-Control": "no-store" } });
  } catch { return fail("Unable to load orders.", 500); }
}

export async function PATCH(request: NextRequest) {
  if (!(await authorized())) return fail("Unauthorized.", 401);
  const origin = request.headers.get("origin");
  if (!origin || origin !== request.nextUrl.origin) return fail("Request origin is not allowed.", 403);
  let body: unknown;
  try { body = await request.json(); } catch { return fail("Invalid request.", 400); }
  if (!body || typeof body !== "object") return fail("Invalid request.", 400);
  const { id, status } = body as Record<string, unknown>;
  if (typeof id !== "string" || !/^[0-9a-f-]{36}$/i.test(id) || typeof status !== "string" || !STATUSES.includes(status as (typeof STATUSES)[number])) return fail("Invalid order update.", 400);
  try {
    const updated = await catalogRequest("orders?id=eq." + encodeURIComponent(id) + "&select=id,order_number,status,updated_at", {
      method: "PATCH", headers: { Prefer: "return=representation" },
      body: JSON.stringify({ status, updated_at: new Date().toISOString() }),
    });
    return NextResponse.json({ order: Array.isArray(updated) ? updated[0] : null }, { headers: { "Cache-Control": "no-store" } });
  } catch { return fail("Unable to update order.", 500); }
}
