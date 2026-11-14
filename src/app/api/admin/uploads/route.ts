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

function readUint32BE(bytes: Uint8Array, offset: number) {
  return (((bytes[offset] << 24) | (bytes[offset + 1] << 16) | (bytes[offset + 2] << 8) | bytes[offset + 3]) >>> 0);
}

function imageDimensions(bytes: Uint8Array, ext: string): { width: number; height: number } | null {
  if (ext === "png" && bytes.length >= 24) {
    return { width: readUint32BE(bytes, 16), height: readUint32BE(bytes, 20) };
  }
  if (ext === "webp" && bytes.length >= 30 && String.fromCharCode(...bytes.slice(12, 16)) === "VP8X") {
    const width = 1 + bytes[24] + (bytes[25] << 8) + (bytes[26] << 16);
    const height = 1 + bytes[27] + (bytes[28] << 8) + (bytes[29] << 16);
    return { width, height };
  }
  if (ext === "jpg") {
    let offset = 2;
    while (offset + 9 < bytes.length) {
      if (bytes[offset] !== 0xff) { offset += 1; continue; }
      const marker = bytes[offset + 1];
      offset += 2;
      if (marker === 0xd8 || marker === 0xd9 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
      if (offset + 4 > bytes.length) break;
      const segmentLength = (bytes[offset] << 8) | bytes[offset + 1];
      if (segmentLength < 2 || offset + segmentLength > bytes.length) break;
      const isFrame = [0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker);
      if (isFrame && segmentLength >= 7) {
        return {
          height: (bytes[offset + 3] << 8) | bytes[offset + 4],
          width: (bytes[offset + 5] << 8) | bytes[offset + 6],
        };
      }
      offset += segmentLength;
    }
  }
  if (ext === "avif") {
    for (let i = 4; i + 16 <= bytes.length; i += 1) {
      if (bytes[i] === 0x69 && bytes[i + 1] === 0x73 && bytes[i + 2] === 0x70 && bytes[i + 3] === 0x65) {
        return { width: readUint32BE(bytes, i + 8), height: readUint32BE(bytes, i + 12) };
      }
    }
  }
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
  if (file.size < 1 || file.size > MAX_BYTES) return NextResponse.json({ message: "Image maximum 4 MB honi chahiye." }, { status: 413 });
  const bytes = new Uint8Array(await file.arrayBuffer());
  const detected = detectImage(bytes);
  if (!detected || file.type !== detected.mime) return NextResponse.json({ message: "Only valid JPEG, PNG, WEBP or AVIF images allowed hain." }, { status: 415 });
  const dimensions = imageDimensions(bytes, detected.ext);
  if (!dimensions || dimensions.width < 1 || dimensions.height < 1 || dimensions.width > 6000 || dimensions.height > 6000 || dimensions.width * dimensions.height > 24_000_000) {
    return NextResponse.json({ message: "Image dimensions invalid hain. Maximum 6000 × 6000 pixels allowed hain." }, { status: 422 });
  }
  const path = `${kind}/${randomUUID()}.${detected.ext}`;
  try {
    const { url, key } = catalogConfig();
    const response = await fetch(`${url}/storage/v1/object/catalog-media/${path.split("/").map(encodeURIComponent).join("/")}`, {
      method: "POST",
      headers: { apikey: key, "Content-Type": detected.mime, "x-upsert": "false" },
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
