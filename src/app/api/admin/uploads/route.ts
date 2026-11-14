import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { catalogConfig, publicImageUrl } from "@/lib/catalog-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const MAX_BYTES = 4 * 1024 * 1024;

function detectImage(bytes: Uint8Array): { ext: string; mime: string } | null {
  if (bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 && bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a) return { ext: "png", mime: "image/png" };
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return { ext: "jpg", mime: "image/jpeg" };
  if (bytes.length >= 12 && String.fromCharCode(...bytes.slice(0,4)) === "RIFF" && String.fromCharCode(...bytes.slice(8,12)) === "WEBP") return { ext: "webp", mime: "image/webp" };
  if (bytes.length >= 16 && String.fromCharCode(...bytes.slice(4,8)) === "ftyp" && /^(avif|avis)$/.test(String.fromCharCode(...bytes.slice(8,12)))) return { ext: "avif", mime: "image/avif" };
  return null;
}

export async function POST(request: NextRequest) {
  let form: FormData;
  try { form = await request.formData(); } catch { return NextResponse.json({ message: "Invalid upload form." }, { status: 400 }); }
  const file = form.get("file");
  const kind = form.get("kind");
  if (!(file instanceof File) || (kind !== "products" && kind !== "kits")) {
    return NextResponse.json({ message: "Image file aur valid kind required hain." }, { status: 400 });
  }
  if (file.size < 1 || file.size > MAX_BYTES) return NextResponse.json({ message: "Image maximum 5 MB honi chahiye." }, { status: 413 });
  const bytes = new Uint8Array(await file.arrayBuffer());
  const detected = detectImage(bytes);
  if (!detected || file.type !== detected.mime) return NextResponse.json({ message: "Only valid JPEG, PNG, WEBP or AVIF images allowed hain." }, { status: 415 });
  const path = `${kind}/${randomUUID()}.${detected.ext}`;
  try {
    const { url, key } = catalogConfig();
    const response = await fetch(`${url}/storage/v1/object/catalog-media/${path.split("/").map(encodeURIComponent).join("/")}`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": detected.mime, "x-upsert": "false" },
      body: Buffer.from(bytes),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) {
      await response.text().catch(() => "");
      return NextResponse.json({ message: "Image storage upload failed." }, { status: 502 });
    }
    return NextResponse.json({ path, url: publicImageUrl(path) }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Image upload service unavailable." }, { status: 503 });
  }
}
