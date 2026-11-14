import { createHmac } from "node:crypto";
import type { NextRequest } from "next/server";

type RateLimitResult = {
  allowed: boolean;
  retry_after_seconds: number;
};

function hashRateLimitKey(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("hex");
}

async function consumeLimit(
  key: string,
  maxRequests: number,
  windowSeconds: number,
  secret: string,
  supabaseUrl: string,
): Promise<RateLimitResult> {
  const response = await fetch(
    `${supabaseUrl.replace(/\/$/, "")}/rest/v1/rpc/admin_rate_limit`,
    {
      method: "POST",
      headers: {
        apikey: secret,
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_key_hash: hashRateLimitKey(key, secret),
        p_window_seconds: windowSeconds,
        p_max_requests: maxRequests,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    },
  );

  if (!response.ok) throw new Error("Rate limit service unavailable.");

  const result: unknown = await response.json();
  if (
    !Array.isArray(result) ||
    typeof result[0]?.allowed !== "boolean" ||
    typeof result[0]?.retry_after_seconds !== "number"
  ) {
    throw new Error("Invalid rate limit response.");
  }

  return result[0] as RateLimitResult;
}

function getRateLimitConfig() {
  const secret = process.env.SUPABASE_SECRET_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!secret || !supabaseUrl) {
    throw new Error("Admin rate limiting is not configured.");
  }
  return { secret, supabaseUrl };
}

function getClientIp(request: NextRequest) {
  // x-real-ip is supplied by Vercel. Do not trust arbitrary forwarded-for values.
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function checkAdminLoginRateLimit(
  request: NextRequest,
  username: string,
): Promise<RateLimitResult> {
  const { secret, supabaseUrl } = getRateLimitConfig();
  const ipLimit = await consumeLimit(
    `admin-login:ip:${getClientIp(request)}`,
    5,
    900,
    secret,
    supabaseUrl,
  );
  if (!ipLimit.allowed) return ipLimit;

  return consumeLimit(
    `admin-login:account:${username.toLowerCase()}`,
    10,
    900,
    secret,
    supabaseUrl,
  );
}

export async function checkAdminApiRateLimit(
  request: NextRequest,
): Promise<RateLimitResult> {
  const { secret, supabaseUrl } = getRateLimitConfig();
  const ip = getClientIp(request);

  const generalLimit = await consumeLimit(
    `admin-api:ip:${ip}`,
    120,
    60,
    secret,
    supabaseUrl,
  );
  if (!generalLimit.allowed) return generalLimit;

  if (["POST", "PUT", "PATCH", "DELETE"].includes(request.method)) {
    return consumeLimit(
      `admin-api-write:ip:${ip}`,
      30,
      60,
      secret,
      supabaseUrl,
    );
  }

  return generalLimit;
}
