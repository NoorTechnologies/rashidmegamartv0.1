const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SECRET = process.env.SUPABASE_SECRET_KEY;

export function catalogConfig() {
  if (!SUPABASE_URL || !SUPABASE_SECRET) {
    throw new Error("Supabase server configuration is missing.");
  }
  return { url: SUPABASE_URL.replace(/\/$/, ""), key: SUPABASE_SECRET };
}

export async function catalogRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const { url, key } = catalogConfig();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Catalog database request failed (${response.status}): ${detail.slice(0, 300)}`);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export function publicImageUrl(path: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) throw new Error("Supabase public URL is missing.");
  return `${url.replace(/\\/$/, "")}/storage/v1/object/public/catalog-media/${path.split("/").map(encodeURIComponent).join("/")}`;
}

export async function catalogPublicRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Supabase public configuration is missing.");
  const response = await fetch(`${url.replace(/\\/$/, "")}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Public catalog request failed (${response.status}): ${detail.slice(0, 300)}`);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
